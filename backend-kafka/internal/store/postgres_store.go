package store

import (
	"database/sql"
	"fmt"
	"log"
	"sync"
	"time"

	"analytics-service/internal/models"

	_ "github.com/lib/pq"
)

type AnalyticsStore interface {
	SaveAnalytics(uniqueUserCount int64, pageViewCount int64) error
	GetAnalytics() (*models.UserAnalytics, error)
}

type MemoryAnalyticsStore struct {
	mu             sync.RWMutex
	uniqueUsers    map[string]bool
	totalPageViews int64
	lastUpdated    time.Time
}

func NewMemoryAnalyticsStore() *MemoryAnalyticsStore {
	return &MemoryAnalyticsStore{
		uniqueUsers: make(map[string]bool),
	}
}

func (m *MemoryAnalyticsStore) ProcessActivity(activity *models.UserActivity) {
	m.mu.Lock()
	defer m.mu.Unlock()

	m.uniqueUsers[activity.UserID] = true
	if activity.ActivityType == "page_view" {
		m.totalPageViews++
	}
	m.lastUpdated = time.Now()
}

func (m *MemoryAnalyticsStore) SaveAnalytics(uniqueUserCount int64, pageViewCount int64) error {
	m.mu.Lock()
	defer m.mu.Unlock()

	m.totalPageViews = pageViewCount
	m.lastUpdated = time.Now()
	return nil
}

func (m *MemoryAnalyticsStore) GetAnalytics() (*models.UserAnalytics, error) {
	m.mu.RLock()
	defer m.mu.RUnlock()

	return &models.UserAnalytics{
		ID:             1,
		TotalUsers:     int64(len(m.uniqueUsers)),
		TotalPageViews: m.totalPageViews,
		LastUpdated:    m.lastUpdated,
	}, nil
}

type PostgresStore struct {
	db *sql.DB
}

func NewPostgresStore(connStr string) (*PostgresStore, error) {
	db, err := sql.Open("postgres", connStr)
	if err != nil {
		return nil, fmt.Errorf("failed to open postgres: %w", err)
	}

	var pingErr error
	backoff := 1 * time.Second
	for attempt := 1; attempt <= 30; attempt++ {
		pingErr = db.Ping()
		if pingErr == nil {
			break
		}
		log.Printf("[PostgresStore] Waiting for PostgreSQL readiness (attempt %d/30): %v...", attempt, pingErr)
		time.Sleep(backoff)
		if backoff < 3*time.Second {
			backoff += 500 * time.Millisecond
		}
	}

	if pingErr != nil {
		db.Close()
		return nil, fmt.Errorf("failed to ping postgres after 30 attempts: %w", pingErr)
	}

	store := &PostgresStore{db: db}
	if err := store.initTable(); err != nil {
		db.Close()
		return nil, err
	}

	return store, nil
}

func (p *PostgresStore) initTable() error {
	query := `
	CREATE TABLE IF NOT EXISTS user_analytics (
		id INT PRIMARY KEY DEFAULT 1,
		total_users BIGINT NOT NULL DEFAULT 0,
		total_page_views BIGINT NOT NULL DEFAULT 0,
		last_updated TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
		CONSTRAINT single_row CHECK (id = 1)
	);

	INSERT INTO user_analytics (id, total_users, total_page_views, last_updated)
	VALUES (1, 0, 0, NOW())
	ON CONFLICT (id) DO NOTHING;
	`
	_, err := p.db.Exec(query)
	return err
}

func (p *PostgresStore) SaveAnalytics(uniqueUserCount int64, pageViewCount int64) error {
	query := `
	UPDATE user_analytics
	SET total_users = $1,
	    total_page_views = $2,
	    last_updated = $3
	WHERE id = 1;
	`
	_, err := p.db.Exec(query, uniqueUserCount, pageViewCount, time.Now())
	return err
}

func (p *PostgresStore) GetAnalytics() (*models.UserAnalytics, error) {
	query := `SELECT id, total_users, total_page_views, last_updated FROM user_analytics WHERE id = 1;`
	row := p.db.QueryRow(query)

	var a models.UserAnalytics
	if err := row.Scan(&a.ID, &a.TotalUsers, &a.TotalPageViews, &a.LastUpdated); err != nil {
		return nil, err
	}
	return &a, nil
}

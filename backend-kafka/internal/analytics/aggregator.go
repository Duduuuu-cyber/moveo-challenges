package analytics

import (
	"context"
	"encoding/json"
	"fmt"
	"log"
	"sync"
	"time"

	"analytics-service/internal/models"
	"analytics-service/internal/store"
)

type AnalyticsEngine struct {
	mu             sync.RWMutex
	store          store.AnalyticsStore
	uniqueUsers    map[string]bool
	totalPageViews int64
}

func NewAnalyticsEngine(store store.AnalyticsStore) *AnalyticsEngine {
	return &AnalyticsEngine{
		store:       store,
		uniqueUsers: make(map[string]bool),
	}
}

// ProcessRawMessage validates JSON and applies transformations
func (e *AnalyticsEngine) ProcessRawMessage(ctx context.Context, messageBytes []byte) (*models.UserActivity, error) {
	var activity models.UserActivity
	if err := json.Unmarshal(messageBytes, &activity); err != nil {
		return nil, fmt.Errorf("failed to unmarshal JSON payload: %w", err)
	}

	if err := activity.Validate(); err != nil {
		return nil, fmt.Errorf("invalid activity schema: %w", err)
	}

	e.mu.Lock()
	e.uniqueUsers[activity.UserID] = true
	if activity.ActivityType == "page_view" {
		e.totalPageViews++
	}
	e.mu.Unlock()

	return &activity, nil
}

// RetryWithBackoff handles task retries with exponential backoff
func (e *AnalyticsEngine) RetryWithBackoff(ctx context.Context, operation func() error, maxRetries int) error {
	var err error
	backoff := 100 * time.Millisecond

	for i := 0; i < maxRetries; i++ {
		select {
		case <-ctx.Done():
			return ctx.Err()
		default:
		}

		err = operation()
		if err == nil {
			return nil
		}

		log.Printf("[RetryWorker] Attempt %d failed: %v. Retrying in %v...", i+1, err, backoff)
		time.Sleep(backoff)
		backoff *= 2
	}

	return fmt.Errorf("operation failed after %d retries: %w", maxRetries, err)
}

func (e *AnalyticsEngine) GetStats() (uniqueUsersCount int64, pageViewsCount int64) {
	e.mu.RLock()
	defer e.mu.RUnlock()
	return int64(len(e.uniqueUsers)), e.totalPageViews
}

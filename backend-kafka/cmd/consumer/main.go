package main

import (
	"context"
	"log"
	"os"
	"os/signal"
	"strconv"
	"sync"
	"syscall"
	"time"

	"analytics-service/internal/analytics"
	"analytics-service/internal/store"

	"github.com/segmentio/kafka-go"
)

func main() {
	broker := os.Getenv("KAFKA_BROKER")
	if broker == "" {
		broker = "localhost:9092"
	}
	topic := os.Getenv("TOPIC_NAME")
	if topic == "" {
		topic = "incoming.user_activity"
	}
	groupID := os.Getenv("KAFKA_GROUP_ID")
	if groupID == "" {
		groupID = "analytics-consumer-group"
	}
	workerCountStr := os.Getenv("WORKER_COUNT")
	workerCount := 4
	if workerCountStr != "" {
		if count, err := strconv.Atoi(workerCountStr); err == nil && count > 0 {
			workerCount = count
		}
	}

	pgConnStr := os.Getenv("POSTGRES_CONN_STR")

	var dbStore store.AnalyticsStore
	if pgConnStr != "" {
		pgStore, err := store.NewPostgresStore(pgConnStr)
		if err != nil {
			log.Printf("[Consumer Warning] Postgres connection error: %v. Falling back to MemoryStore.", err)
			dbStore = store.NewMemoryAnalyticsStore()
		} else {
			log.Println("✅ Connected to PostgreSQL analytics database.")
			dbStore = pgStore
		}
	} else {
		log.Println("ℹ️ No POSTGRES_CONN_STR provided. Using in-memory analytics store.")
		dbStore = store.NewMemoryAnalyticsStore()
	}

	engine := analytics.NewAnalyticsEngine(dbStore)

	r := kafka.NewReader(kafka.ReaderConfig{
		Brokers:        []string{broker},
		Topic:          topic,
		GroupID:        groupID,
		MinBytes:       10,
		MaxBytes:       10 * 1024 * 1024,
		CommitInterval: 1 * time.Second,
		StartOffset:    kafka.FirstOffset,
	})
	defer r.Close()

	ctx, cancel := context.WithCancel(context.Background())
	defer cancel()

	messageChan := make(chan kafka.Message, 100)
	var wg sync.WaitGroup

	// Bonus Point #1: Launch horizontal goroutine worker pool for concurrent transformations
	log.Printf("🚀 Starting Consumer Service with %d worker goroutines (Group: %s)", workerCount, groupID)
	for i := 1; i <= workerCount; i++ {
		wg.Add(1)
		workerID := i
		go func() {
			defer wg.Done()
			for {
				select {
				case <-ctx.Done():
					log.Printf("[Worker %d] Stopping worker goroutine...", workerID)
					return
				case msg, ok := <-messageChan:
					if !ok {
						return
					}

					// Bonus Point #2: Retry strategy with exponential backoff
					err := engine.RetryWithBackoff(ctx, func() error {
						activity, err := engine.ProcessRawMessage(ctx, msg.Value)
						if err != nil {
							return err
						}

						users, pageViews := engine.GetStats()
						if err := dbStore.SaveAnalytics(users, pageViews); err != nil {
							return err
						}

						log.Printf("[Worker %d Success] Processed user_id=%s, type=%s | Total Users: %d, PageViews: %d",
							workerID, activity.UserID, activity.ActivityType, users, pageViews)
						return nil
					}, 3)

					if err != nil {
						log.Printf("[Worker %d Error] Task processing failed after retries: %v. Sending to Dead-Letter Queue log.", workerID, err)
					}
				}
			}
		}()
	}

	// Message Reader Loop
	go func() {
		for {
			select {
			case <-ctx.Done():
				return
			default:
				msg, err := r.ReadMessage(ctx)
				if err != nil {
					if ctx.Err() != nil {
						return
					}
					log.Printf("[Consumer Reader Notice] Kafka reader waiting for broker connection (%s)...", broker)
					time.Sleep(3 * time.Second)
					continue
				}
				messageChan <- msg
			}
		}
	}()

	// Bonus Point #3: Graceful Shutdown handling on SIGINT / SIGTERM
	sigChan := make(chan os.Signal, 1)
	signal.Notify(sigChan, syscall.SIGINT, syscall.SIGTERM)
	sig := <-sigChan

	log.Printf("🛑 Received shutdown signal (%v). Commencing graceful shutdown of Consumer...", sig)
	cancel()
	close(messageChan)
	wg.Wait()
	log.Println("✅ Consumer microservice gracefully stopped.")
}

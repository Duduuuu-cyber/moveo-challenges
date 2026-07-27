package analytics_test

import (
	"context"
	"encoding/json"
	"testing"
	"time"

	"analytics-service/internal/analytics"
	"analytics-service/internal/models"
	"analytics-service/internal/store"

	"github.com/stretchr/testify/assert"
)

func TestAnalyticsEngineTransformations(t *testing.T) {
	memStore := store.NewMemoryAnalyticsStore()
	engine := analytics.NewAnalyticsEngine(memStore)
	ctx := context.Background()

	t.Run("Process Valid Page View Activity", func(t *testing.T) {
		payload := models.UserActivity{
			UserID:       "user-101",
			ActivityType: "page_view",
			Timestamp:    time.Now(),
			Metadata: map[string]interface{}{
				"page_url": "https://example.com/dashboard",
			},
		}
		bytes, _ := json.Marshal(payload)

		activity, err := engine.ProcessRawMessage(ctx, bytes)
		assert.NoError(t, err)
		assert.Equal(t, "user-101", activity.UserID)
		assert.Equal(t, "page_view", activity.ActivityType)

		users, pageViews := engine.GetStats()
		assert.Equal(t, int64(1), users)
		assert.Equal(t, int64(1), pageViews)
	})

	t.Run("Process Duplicate User Page View", func(t *testing.T) {
		payload := models.UserActivity{
			UserID:       "user-101",
			ActivityType: "page_view",
			Timestamp:    time.Now(),
		}
		bytes, _ := json.Marshal(payload)

		_, err := engine.ProcessRawMessage(ctx, bytes)
		assert.NoError(t, err)

		users, pageViews := engine.GetStats()
		assert.Equal(t, int64(1), users)    // Unique user count stays 1
		assert.Equal(t, int64(2), pageViews) // Page views increments to 2
	})

	t.Run("Process Non-Page-View Activity", func(t *testing.T) {
		payload := models.UserActivity{
			UserID:       "user-202",
			ActivityType: "button_click",
			Timestamp:    time.Now(),
		}
		bytes, _ := json.Marshal(payload)

		_, err := engine.ProcessRawMessage(ctx, bytes)
		assert.NoError(t, err)

		users, pageViews := engine.GetStats()
		assert.Equal(t, int64(2), users)    // New user added
		assert.Equal(t, int64(2), pageViews) // Page views untouched
	})

	t.Run("Process Invalid JSON Payload", func(t *testing.T) {
		invalidBytes := []byte("{invalid-json}")
		_, err := engine.ProcessRawMessage(ctx, invalidBytes)
		assert.Error(t, err)
	})
}

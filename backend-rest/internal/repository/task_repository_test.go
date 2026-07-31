package repository

import (
	"fmt"
	"testing"
	"time"

	"task-api/internal/models"

	"github.com/stretchr/testify/assert"
)

func TestMemoryTaskRepository_PaginationDeterministicOrdering(t *testing.T) {
	repo := NewMemoryTaskRepository()

	// Create 26 tasks with exact identical CreatedAt timestamp to test tie-breaking sorting
	now := time.Date(2026, 1, 1, 12, 0, 0, 0, time.UTC)
	for i := 1; i <= 26; i++ {
		input := &models.CreateTaskInput{
			Title:  fmt.Sprintf("Task %02d", i),
			Status: models.StatusPending,
		}
		task, err := repo.Create(input)
		assert.NoError(t, err)
		// Override CreatedAt to force identical timestamp
		repo.mu.Lock()
		repo.tasks[task.ID].CreatedAt = now
		repo.mu.Unlock()
	}

	seenIDs := make(map[string]bool)
	limit := 10
	totalPages := (26 + limit - 1) / limit // 3 pages

	totalReturned := 0
	for page := 1; page <= totalPages; page++ {
		filter := models.TaskFilter{
			Page:  page,
			Limit: limit,
		}
		tasks, total, err := repo.GetAll(filter)
		assert.NoError(t, err)
		assert.Equal(t, 26, total)

		for _, task := range tasks {
			assert.False(t, seenIDs[task.ID], "Duplicate task ID found across pages: %s", task.ID)
			seenIDs[task.ID] = true
			totalReturned++
		}
	}

	assert.Equal(t, 26, totalReturned, "Should return exactly 26 distinct tasks across 3 pages")
	assert.Equal(t, 26, len(seenIDs), "Should have 26 unique task IDs")
}

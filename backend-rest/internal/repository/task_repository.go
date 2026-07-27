package repository

import (
	"errors"
	"sync"
	"time"

	"task-api/internal/models"

	"github.com/google/uuid"
)

var (
	ErrTaskNotFound = errors.New("task not found")
)

type TaskRepository interface {
	Create(input *models.CreateTaskInput) (*models.Task, error)
	GetAll(filter models.TaskFilter) ([]models.Task, int, error)
	GetByID(id string) (*models.Task, error)
	Update(id string, input *models.UpdateTaskInput) (*models.Task, error)
	Delete(id string) error
}

type MemoryTaskRepository struct {
	mu    sync.RWMutex
	tasks map[string]*models.Task
}

func NewMemoryTaskRepository() *MemoryTaskRepository {
	return &MemoryTaskRepository{
		tasks: make(map[string]*models.Task),
	}
}

func (r *MemoryTaskRepository) Create(input *models.CreateTaskInput) (*models.Task, error) {
	r.mu.Lock()
	defer r.mu.Unlock()

	now := time.Now()
	task := &models.Task{
		ID:          uuid.New().String(),
		Title:       input.Title,
		Description: input.Description,
		Status:      input.Status,
		DueDate:     input.DueDate,
		CreatedAt:   now,
		UpdatedAt:   now,
	}

	r.tasks[task.ID] = task
	return task, nil
}

func (r *MemoryTaskRepository) GetAll(filter models.TaskFilter) ([]models.Task, int, error) {
	r.mu.RLock()
	defer r.mu.RUnlock()

	var filtered []models.Task
	for _, task := range r.tasks {
		if filter.Status != "" && string(task.Status) != filter.Status {
			continue
		}
		if filter.DueDate != "" && task.DueDate != nil {
			if task.DueDate.Format("2006-01-02") != filter.DueDate {
				continue
			}
		}
		filtered = append(filtered, *task)
	}

	total := len(filtered)
	page := filter.Page
	if page < 1 {
		page = 1
	}
	limit := filter.Limit
	if limit < 1 {
		limit = 10
	}

	start := (page - 1) * limit
	if start >= total {
		return []models.Task{}, total, nil
	}

	end := start + limit
	if end > total {
		end = total
	}

	return filtered[start:end], total, nil
}

func (r *MemoryTaskRepository) GetByID(id string) (*models.Task, error) {
	r.mu.RLock()
	defer r.mu.RUnlock()

	task, exists := r.tasks[id]
	if !exists {
		return nil, ErrTaskNotFound
	}

	taskCopy := *task
	return &taskCopy, nil
}

func (r *MemoryTaskRepository) Update(id string, input *models.UpdateTaskInput) (*models.Task, error) {
	r.mu.Lock()
	defer r.mu.Unlock()

	task, exists := r.tasks[id]
	if !exists {
		return nil, ErrTaskNotFound
	}

	if input.Title != nil {
		task.Title = *input.Title
	}
	if input.Description != nil {
		task.Description = *input.Description
	}
	if input.Status != nil {
		task.Status = *input.Status
	}
	if input.DueDate != nil {
		task.DueDate = input.DueDate
	}
	task.UpdatedAt = time.Now()

	taskCopy := *task
	return &taskCopy, nil
}

func (r *MemoryTaskRepository) Delete(id string) error {
	r.mu.Lock()
	defer r.mu.Unlock()

	if _, exists := r.tasks[id]; !exists {
		return ErrTaskNotFound
	}

	delete(r.tasks, id)
	return nil
}

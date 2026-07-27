package models

import (
	"errors"
	"time"
)

type TaskStatus string

const (
	StatusPending    TaskStatus = "pending"
	StatusInProgress TaskStatus = "in-progress"
	StatusCompleted  TaskStatus = "completed"
)

type Task struct {
	ID          string     `json:"id"`
	Title       string     `json:"title" binding:"required"`
	Description string     `json:"description,omitempty"`
	Status      TaskStatus `json:"status" binding:"required"`
	DueDate     *time.Time `json:"due_date,omitempty"`
	CreatedAt   time.Time  `json:"created_at"`
	UpdatedAt   time.Time  `json:"updated_at"`
}

type CreateTaskInput struct {
	Title       string     `json:"title" binding:"required"`
	Description string     `json:"description"`
	Status      TaskStatus `json:"status" binding:"required"`
	DueDate     *time.Time `json:"due_date"`
}

type UpdateTaskInput struct {
	Title       *string     `json:"title"`
	Description *string     `json:"description"`
	Status      *TaskStatus `json:"status"`
	DueDate     *time.Time  `json:"due_date"`
}

type TaskFilter struct {
	Status  string `form:"status"`
	DueDate string `form:"due_date"`
	Page    int    `form:"page,default=1"`
	Limit   int    `form:"limit,default=10"`
}

type User struct {
	ID       string `json:"id"`
	Username string `json:"username"`
	Password string `json:"-"`
}

func (s TaskStatus) IsValid() bool {
	switch s {
	case StatusPending, StatusInProgress, StatusCompleted:
		return true
	}
	return false
}

func (input *CreateTaskInput) Validate() error {
	if input.Title == "" {
		return errors.New("title is required")
	}
	if !input.Status.IsValid() {
		return errors.New("invalid status: must be pending, in-progress, or completed")
	}
	return nil
}

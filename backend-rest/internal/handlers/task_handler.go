package handlers

import (
	"errors"
	"net/http"

	"task-api/internal/models"
	"task-api/internal/repository"

	"github.com/gin-gonic/gin"
)

type TaskHandler struct {
	repo repository.TaskRepository
}

func NewTaskHandler(repo repository.TaskRepository) *TaskHandler {
	return &TaskHandler{repo: repo}
}

// CreateTask handles POST /tasks
func (h *TaskHandler) CreateTask(c *gin.Context) {
	var input models.CreateTaskInput
	if err := c.ShouldBindJSON(&input); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Invalid request body", "details": err.Error()})
		return
	}

	if err := input.Validate(); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	task, err := h.repo.Create(&input)
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to create task"})
		return
	}

	c.JSON(http.StatusCreated, task)
}

// GetTasks handles GET /tasks (Supports pagination, status & due_date filtering)
func (h *TaskHandler) GetTasks(c *gin.Context) {
	var filter models.TaskFilter
	if err := c.ShouldBindQuery(&filter); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Invalid query parameters"})
		return
	}

	if filter.Page < 1 {
		filter.Page = 1
	}
	if filter.Limit < 1 || filter.Limit > 100 {
		filter.Limit = 10
	}

	tasks, total, err := h.repo.GetAll(filter)
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to fetch tasks"})
		return
	}

	c.JSON(http.StatusOK, gin.H{
		"data":  tasks,
		"page":  filter.Page,
		"limit": filter.Limit,
		"total": total,
	})
}

// GetTaskByID handles GET /tasks/:id
func (h *TaskHandler) GetTaskByID(c *gin.Context) {
	id := c.Param("id")
	task, err := h.repo.GetByID(id)
	if err != nil {
		if errors.Is(err, repository.ErrTaskNotFound) {
			c.JSON(http.StatusNotFound, gin.H{"error": "Task not found"})
			return
		}
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to retrieve task"})
		return
	}

	c.JSON(http.StatusOK, task)
}

// UpdateTask handles PUT /tasks/:id
func (h *TaskHandler) UpdateTask(c *gin.Context) {
	id := c.Param("id")
	var input models.UpdateTaskInput
	if err := c.ShouldBindJSON(&input); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Invalid request body", "details": err.Error()})
		return
	}

	if input.Status != nil && !input.Status.IsValid() {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Invalid status: must be pending, in-progress, or completed"})
		return
	}

	task, err := h.repo.Update(id, &input)
	if err != nil {
		if errors.Is(err, repository.ErrTaskNotFound) {
			c.JSON(http.StatusNotFound, gin.H{"error": "Task not found"})
			return
		}
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to update task"})
		return
	}

	c.JSON(http.StatusOK, task)
}

// DeleteTask handles DELETE /tasks/:id
func (h *TaskHandler) DeleteTask(c *gin.Context) {
	id := c.Param("id")
	err := h.repo.Delete(id)
	if err != nil {
		if errors.Is(err, repository.ErrTaskNotFound) {
			c.JSON(http.StatusNotFound, gin.H{"error": "Task not found"})
			return
		}
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to delete task"})
		return
	}

	c.JSON(http.StatusOK, gin.H{"message": "Task successfully deleted", "id": id})
}

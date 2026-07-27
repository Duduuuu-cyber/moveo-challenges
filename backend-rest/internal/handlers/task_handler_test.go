package handlers_test

import (
	"bytes"
	"encoding/json"
	"net/http"
	"net/http/httptest"
	"testing"

	"task-api/internal/models"
	"task-api/internal/repository"
	"task-api/internal/router"

	"github.com/stretchr/testify/assert"
)

func TestCreateTaskEndpoint(t *testing.T) {
	repo := repository.NewMemoryTaskRepository()
	r := router.SetupRouter(repo)

	t.Run("Create Task Success", func(t *testing.T) {
		payload := models.CreateTaskInput{
			Title:       "Setup CI/CD Pipeline",
			Description: "Configure GitHub Actions workflow for automated builds",
			Status:      models.StatusPending,
		}
		body, _ := json.Marshal(payload)

		w := httptest.NewRecorder()
		req, _ := http.NewRequest("POST", "/tasks", bytes.NewBuffer(body))
		req.Header.Set("Content-Type", "application/json")
		r.ServeHTTP(w, req)

		assert.Equal(t, http.StatusCreated, w.Code)

		var resp models.Task
		err := json.Unmarshal(w.Body.Bytes(), &resp)
		assert.Nil(t, err)
		assert.Equal(t, "Setup CI/CD Pipeline", resp.Title)
		assert.Equal(t, models.StatusPending, resp.Status)
		assert.NotEmpty(t, resp.ID)
	})

	t.Run("Create Task Validation Error", func(t *testing.T) {
		payload := map[string]string{
			"description": "Missing title and invalid status",
			"status":      "invalid_status",
		}
		body, _ := json.Marshal(payload)

		w := httptest.NewRecorder()
		req, _ := http.NewRequest("POST", "/tasks", bytes.NewBuffer(body))
		req.Header.Set("Content-Type", "application/json")
		r.ServeHTTP(w, req)

		assert.Equal(t, http.StatusBadRequest, w.Code)
	})
}

func TestGetTasksAndPagination(t *testing.T) {
	repo := repository.NewMemoryTaskRepository()
	r := router.SetupRouter(repo)

	// Seed data
	repo.Create(&models.CreateTaskInput{Title: "Task 1", Status: models.StatusPending})
	repo.Create(&models.CreateTaskInput{Title: "Task 2", Status: models.StatusCompleted})
	repo.Create(&models.CreateTaskInput{Title: "Task 3", Status: models.StatusPending})

	t.Run("Get All Tasks", func(t *testing.T) {
		w := httptest.NewRecorder()
		req, _ := http.NewRequest("GET", "/tasks", nil)
		r.ServeHTTP(w, req)

		assert.Equal(t, http.StatusOK, w.Code)
	})

	t.Run("Filter Tasks by Status", func(t *testing.T) {
		w := httptest.NewRecorder()
		req, _ := http.NewRequest("GET", "/tasks?status=completed", nil)
		r.ServeHTTP(w, req)

		assert.Equal(t, http.StatusOK, w.Code)
	})
}

func TestGetTaskByID(t *testing.T) {
	repo := repository.NewMemoryTaskRepository()
	r := router.SetupRouter(repo)

	created, _ := repo.Create(&models.CreateTaskInput{
		Title:  "Deploy to Kubernetes",
		Status: models.StatusInProgress,
	})

	t.Run("Get Task By ID Success", func(t *testing.T) {
		w := httptest.NewRecorder()
		req, _ := http.NewRequest("GET", "/tasks/"+created.ID, nil)
		r.ServeHTTP(w, req)

		assert.Equal(t, http.StatusOK, w.Code)

		var task models.Task
		json.Unmarshal(w.Body.Bytes(), &task)
		assert.Equal(t, created.ID, task.ID)
		assert.Equal(t, "Deploy to Kubernetes", task.Title)
	})

	t.Run("Get Task By ID Not Found", func(t *testing.T) {
		w := httptest.NewRecorder()
		req, _ := http.NewRequest("GET", "/tasks/non-existent-uuid", nil)
		r.ServeHTTP(w, req)

		assert.Equal(t, http.StatusNotFound, w.Code)
	})
}

func TestUpdateAndDeleteTask(t *testing.T) {
	repo := repository.NewMemoryTaskRepository()
	r := router.SetupRouter(repo)

	created, _ := repo.Create(&models.CreateTaskInput{
		Title:  "Draft Documentation",
		Status: models.StatusPending,
	})

	t.Run("Update Task Success", func(t *testing.T) {
		newStatus := models.StatusCompleted
		payload := models.UpdateTaskInput{
			Status: &newStatus,
		}
		body, _ := json.Marshal(payload)

		w := httptest.NewRecorder()
		req, _ := http.NewRequest("PUT", "/tasks/"+created.ID, bytes.NewBuffer(body))
		req.Header.Set("Content-Type", "application/json")
		r.ServeHTTP(w, req)

		assert.Equal(t, http.StatusOK, w.Code)
	})

	t.Run("Delete Task Success", func(t *testing.T) {
		w := httptest.NewRecorder()
		req, _ := http.NewRequest("DELETE", "/tasks/"+created.ID, nil)
		r.ServeHTTP(w, req)

		assert.Equal(t, http.StatusOK, w.Code)
	})
}

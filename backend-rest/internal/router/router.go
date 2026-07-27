package router

import (
	"task-api/internal/handlers"
	"task-api/internal/middleware"
	"task-api/internal/repository"

	"github.com/gin-gonic/gin"
)

func SetupRouter(repo repository.TaskRepository) *gin.Engine {
	r := gin.Default()

	r.Use(gin.Recovery())

	authHandler := handlers.NewAuthHandler()
	taskHandler := handlers.NewTaskHandler(repo)

	// Public API group
	api := r.Group("/api/v1")
	{
		api.POST("/auth/login", authHandler.Login)
		api.GET("/health", func(c *gin.Context) {
			c.JSON(200, gin.H{"status": "healthy", "service": "Task Management API"})
		})
	}

	// Task CRUD Endpoints
	tasks := r.Group("/tasks")
	{
		tasks.POST("", taskHandler.CreateTask)
		tasks.GET("", taskHandler.GetTasks)
		tasks.GET("/:id", taskHandler.GetTaskByID)
		tasks.PUT("/:id", taskHandler.UpdateTask)
		tasks.DELETE("/:id", taskHandler.DeleteTask)
	}

	// Protected endpoints (Requires JWT)
	protected := r.Group("/api/v1/protected")
	protected.Use(middleware.AuthMiddleware())
	{
		protected.GET("/me", func(c *gin.Context) {
			username, _ := c.Get("username")
			c.JSON(200, gin.H{"user": username, "status": "authenticated"})
		})
	}

	return r
}

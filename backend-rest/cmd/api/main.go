package main

import (
	"log"

	"task-api/internal/repository"
	"task-api/internal/router"
)

func main() {
	repo := repository.NewMemoryTaskRepository()
	r := router.SetupRouter(repo)

	log.Println("🚀 Task Management REST API server starting on :8080...")
	if err := r.Run(":8080"); err != nil {
		log.Fatalf("Failed to start server: %v", err)
	}
}

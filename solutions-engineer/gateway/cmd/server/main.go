package main

import (
	"log"
	"os"

	"moveo-integration-gateway/internal/webhook"

	"github.com/gin-gonic/gin"
)

func main() {
	secret := os.Getenv("MOVEO_WEBHOOK_SECRET")
	if secret == "" {
		secret = "moveo-secret-key-123"
	}
	port := os.Getenv("PORT")
	if port == "" {
		port = "8082"
	}

	handler := webhook.NewWebhookHandler(secret)

	r := gin.Default()
	r.POST("/webhooks/moveo", handler.HandleWebhook)
	r.GET("/health", func(c *gin.Context) {
		c.JSON(200, gin.H{"status": "healthy", "service": "Moveo Integration Gateway"})
	})

	log.Printf("🚀 Moveo.AI Integration Gateway running on port :%s", port)
	if err := r.Run(":" + port); err != nil {
		log.Fatalf("Gateway server error: %v", err)
	}
}

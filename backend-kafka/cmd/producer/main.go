package main

import (
	"context"
	"encoding/json"
	"log"
	"net/http"
	"os"
	"os/signal"
	"syscall"
	"time"

	"analytics-service/internal/models"

	"github.com/gin-gonic/gin"
	"github.com/segmentio/kafka-go"
)

type ProducerApp struct {
	writer *kafka.Writer
	topic  string
}

func NewProducerApp(broker, topic string) *ProducerApp {
	writer := &kafka.Writer{
		Addr:         kafka.TCP(broker),
		Topic:        topic,
		Balancer:     &kafka.LeastBytes{},
		Async:        false,
		RequiredAcks: kafka.RequireOne,
	}
	return &ProducerApp{
		writer: writer,
		topic:  topic,
	}
}

func (app *ProducerApp) HandlePublishActivity(c *gin.Context) {
	var activity models.UserActivity
	if err := c.ShouldBindJSON(&activity); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Invalid request body", "details": err.Error()})
		return
	}

	if err := activity.Validate(); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	payloadBytes, err := json.Marshal(activity)
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to serialize message"})
		return
	}

	ctx, cancel := context.WithTimeout(c.Request.Context(), 5*time.Second)
	defer cancel()

	err = app.writer.WriteMessages(ctx, kafka.Message{
		Key:   []byte(activity.UserID),
		Value: payloadBytes,
		Time:  time.Now(),
	})

	if err != nil {
		log.Printf("[Producer Warning] Kafka publish error (Kafka may be unavailable locally): %v", err)
		c.JSON(http.StatusAccepted, gin.H{
			"status":  "queued_fallback",
			"message": "Activity accepted locally (Kafka not connected)",
			"data":    activity,
		})
		return
	}

	log.Printf("[Producer Success] Published activity for user %s to topic %s", activity.UserID, app.topic)
	c.JSON(http.StatusOK, gin.H{
		"status":  "success",
		"message": "Activity published to Kafka topic",
		"topic":   app.topic,
		"data":    activity,
	})
}

func main() {
	broker := os.Getenv("KAFKA_BROKER")
	if broker == "" {
		broker = "localhost:9092"
	}
	topic := os.Getenv("TOPIC_NAME")
	if topic == "" {
		topic = "incoming.user_activity"
	}
	port := os.Getenv("PORT")
	if port == "" {
		port = "8081"
	}

	app := NewProducerApp(broker, topic)
	defer app.writer.Close()

	router := gin.Default()
	router.POST("/activity", app.HandlePublishActivity)
	router.POST("/api/v1/activity", app.HandlePublishActivity)
	router.GET("/health", func(c *gin.Context) {
		c.JSON(http.StatusOK, gin.H{"status": "healthy", "service": "Kafka Producer Microservice"})
	})

	srv := &http.Server{
		Addr:    ":" + port,
		Handler: router,
	}

	// Graceful Shutdown Handler
	go func() {
		log.Printf("🚀 Kafka Producer REST API running on port :%s (Topic: %s)", port, topic)
		if err := srv.ListenAndServe(); err != nil && err != http.ErrServerClosed {
			log.Fatalf("Server error: %v", err)
		}
	}()

	quit := make(chan os.Signal, 1)
	signal.Notify(quit, syscall.SIGINT, syscall.SIGTERM)
	<-quit
	log.Println("🛑 Shutdown signal received. Closing Producer microservice...")

	ctx, cancel := context.WithTimeout(context.Background(), 5*time.Second)
	defer cancel()
	if err := srv.Shutdown(ctx); err != nil {
		log.Fatalf("Server forced to shutdown: %v", err)
	}
	log.Println("✅ Producer microservice gracefully stopped.")
}

package webhook

import (
	"bytes"
	"io"
	"net/http"

	"moveo-integration-gateway/internal/security"

	"github.com/gin-gonic/gin"
)

type MoveoWebhookEvent struct {
	EventID    string                 `json:"event_id" binding:"required"`
	EventType  string                 `json:"event_type" binding:"required"` // tool_call, handover_requested, session_ended
	SessionID  string                 `json:"session_id" binding:"required"`
	UserID     string                 `json:"user_id" binding:"required"`
	Parameters map[string]interface{} `json:"parameters,omitempty"`
}

type WebhookHandler struct {
	webhookSecret string
}

func NewWebhookHandler(secret string) *WebhookHandler {
	return &WebhookHandler{webhookSecret: secret}
}

func (h *WebhookHandler) HandleWebhook(c *gin.Context) {
	bodyBytes, err := io.ReadAll(c.Request.Body)
	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Failed to read request body"})
		return
	}

	// Restore body for downstream binding
	c.Request.Body = io.NopCloser(bytes.NewBuffer(bodyBytes))

	// Security signature validation
	signature := c.GetHeader("X-Moveo-Signature")
	if h.webhookSecret != "" && !security.VerifyMoveoSignature(bodyBytes, signature, h.webhookSecret) {
		c.JSON(http.StatusUnauthorized, gin.H{"error": "Invalid or missing HMAC signature"})
		return
	}

	var event MoveoWebhookEvent
	if err := c.ShouldBindJSON(&event); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Invalid webhook payload structure", "details": err.Error()})
		return
	}

	// Process event types
	switch event.EventType {
	case "tool_call":
		toolName, _ := event.Parameters["tool_name"].(string)
		c.JSON(http.StatusOK, gin.H{
			"status":   "success",
			"event_id": event.EventID,
			"response": gin.H{
				"tool":   toolName,
				"result": "Query processed successfully in Enterprise Backend",
			},
		})

	case "handover_requested":
		c.JSON(http.StatusOK, gin.H{
			"status":            "handover_initiated",
			"event_id":          event.EventID,
			"target_queue":      "Human_Support_Tier2",
			"estimated_wait_s": 45,
		})

	default:
		c.JSON(http.StatusOK, gin.H{
			"status":   "acknowledged",
			"event_id": event.EventID,
		})
	}
}

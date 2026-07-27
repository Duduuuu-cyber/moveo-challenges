package webhook_test

import (
	"bytes"
	"crypto/hmac"
	"crypto/sha256"
	"encoding/hex"
	"encoding/json"
	"net/http"
	"net/http/httptest"
	"testing"

	"moveo-integration-gateway/internal/webhook"

	"github.com/gin-gonic/gin"
	"github.com/stretchr/testify/assert"
)

func TestWebhookHandler(t *testing.T) {
	secret := "moveo-secret-key-123"
	handler := webhook.NewWebhookHandler(secret)

	router := gin.Default()
	router.POST("/webhooks/moveo", handler.HandleWebhook)

	t.Run("Valid Webhook Tool Call Event", func(t *testing.T) {
		payload := webhook.MoveoWebhookEvent{
			EventID:   "evt_9001",
			EventType: "tool_call",
			SessionID: "sess_4500",
			UserID:    "usr_1001",
			Parameters: map[string]interface{}{
				"tool_name": "check_balance",
			},
		}
		bodyBytes, _ := json.Marshal(payload)

		// Compute valid HMAC
		mac := hmac.New(sha256.New, []byte(secret))
		mac.Write(bodyBytes)
		sig := hex.EncodeToString(mac.Sum(nil))

		w := httptest.NewRecorder()
		req, _ := http.NewRequest("POST", "/webhooks/moveo", bytes.NewBuffer(bodyBytes))
		req.Header.Set("Content-Type", "application/json")
		req.Header.Set("X-Moveo-Signature", sig)
		router.ServeHTTP(w, req)

		assert.Equal(t, http.StatusOK, w.Code)
	})

	t.Run("Invalid HMAC Signature Rejected", func(t *testing.T) {
		payload := webhook.MoveoWebhookEvent{
			EventID:   "evt_9002",
			EventType: "tool_call",
			SessionID: "sess_4500",
			UserID:    "usr_1001",
		}
		bodyBytes, _ := json.Marshal(payload)

		w := httptest.NewRecorder()
		req, _ := http.NewRequest("POST", "/webhooks/moveo", bytes.NewBuffer(bodyBytes))
		req.Header.Set("Content-Type", "application/json")
		req.Header.Set("X-Moveo-Signature", "invalid-sig")
		router.ServeHTTP(w, req)

		assert.Equal(t, http.StatusUnauthorized, w.Code)
	})
}

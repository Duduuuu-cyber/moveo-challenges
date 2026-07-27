package handlers

import (
	"net/http"

	"task-api/internal/middleware"

	"github.com/gin-gonic/gin"
)

type AuthHandler struct{}

func NewAuthHandler() *AuthHandler {
	return &AuthHandler{}
}

type AuthRequest struct {
	Username string `json:"username" binding:"required"`
	Password string `json:"password" binding:"required"`
}

func (h *AuthHandler) Login(c *gin.Context) {
	var req AuthRequest
	if err := c.ShouldBindJSON(&req); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Username and password are required"})
		return
	}

	// Demo validation logic
	if req.Username == "admin" && req.Password == "password123" {
		token, err := middleware.GenerateToken(req.Username)
		if err != nil {
			c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to generate token"})
			return
		}
		c.JSON(http.StatusOK, gin.H{
			"message": "Authentication successful",
			"token":   token,
		})
		return
	}

	c.JSON(http.StatusUnauthorized, gin.H{"error": "Invalid username or password"})
}

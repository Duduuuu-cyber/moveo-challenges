package models

import (
	"errors"
	"time"
)

type UserActivity struct {
	UserID       string                 `json:"user_id" binding:"required"`
	ActivityType string                 `json:"activity_type" binding:"required"`
	Timestamp    time.Time              `json:"timestamp" binding:"required"`
	Metadata     map[string]interface{} `json:"metadata,omitempty"`
}

type UserAnalytics struct {
	ID             int64     `json:"id"`
	TotalUsers     int64     `json:"total_users"`
	TotalPageViews int64     `json:"total_page_views"`
	LastUpdated    time.Time `json:"last_updated"`
}

func (a *UserActivity) Validate() error {
	if a.UserID == "" {
		return errors.New("user_id is required")
	}
	if a.ActivityType == "" {
		return errors.New("activity_type is required")
	}
	if a.Timestamp.IsZero() {
		return errors.New("valid timestamp is required")
	}
	return nil
}

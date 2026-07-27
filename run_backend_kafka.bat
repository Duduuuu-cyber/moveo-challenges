@echo off
title Moveo.AI - Backend Kafka Analytics
color 0E
echo ============================================================
echo      MOVEO.AI - BACKEND KAFKA ANALYTICS LAUNCHER
echo ============================================================
echo.
cd /d "%~dp0backend-kafka"
set PATH=%PATH%;C:\Program Files\Go\bin;D:\Program Files\Git\cmd

echo Running Go Unit Tests for Analytics Engine...
echo.
go test -v ./...
echo.
echo Launching Producer REST API on port 8081...
go run cmd/producer/main.go
pause

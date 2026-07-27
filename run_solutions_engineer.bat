@echo off
title Moveo.AI - Solutions Engineer Showcase
color 0D
echo ============================================================
echo      MOVEO.AI - SOLUTIONS ENGINEER GATEWAY LAUNCHER
echo ============================================================
echo.
cd /d "%~dp0solutions-engineer\gateway"
set PATH=%PATH%;C:\Program Files\Go\bin;D:\Program Files\Git\cmd

echo Running HMAC Signature Verification & Webhook Tests...
echo.
go test -v ./...
echo.
echo Launching Moveo Webhook Gateway on port 8082...
go run cmd/server/main.go
pause

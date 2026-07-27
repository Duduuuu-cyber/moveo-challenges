@echo off
title Moveo.AI - Backend REST API
color 0B
echo ============================================================
echo      MOVEO.AI - BACKEND REST API LAUNCHER (GOLANG)
echo ============================================================
echo.
cd /d "%~dp0backend-rest"
set PATH=%PATH%;C:\Program Files\Go\bin;D:\Program Files\Git\cmd

echo Running Go REST API server on http://localhost:8080...
echo.
go run cmd/api/main.go
pause

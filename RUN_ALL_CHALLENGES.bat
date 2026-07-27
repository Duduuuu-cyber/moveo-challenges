@echo off
title Moveo.AI - Challenges Suite Master Launcher
color 0F
:MENU
cls
echo ============================================================
echo         MOVEO.AI TECHNICAL CHALLENGES MASTER LAUNCHER
echo ============================================================
echo.
echo   [1] Launch Frontend Project (React + Tailwind + Vitest)
echo   [2] Launch Backend REST API (Golang Gin Task API)
echo   [3] Test & Run Backend Kafka Analytics (Golang Kafka)
echo   [4] Test & Run Solutions Engineer Gateway (Moveo Webhooks)
echo   [5] Run ALL Unit Tests Across All Projects
echo   [6] Exit
echo.
echo ============================================================
set /p choice="Select an option (1-6): "

if "%choice%"=="1" goto FRONTEND
if "%choice%"=="2" goto BACKEND_REST
if "%choice%"=="3" goto BACKEND_KAFKA
if "%choice%"=="4" goto SOLUTIONS
if "%choice%"=="5" goto ALL_TESTS
if "%choice%"=="6" exit
goto MENU

:FRONTEND
call "%~dp0run_frontend.bat"
goto MENU

:BACKEND_REST
call "%~dp0run_backend_rest.bat"
goto MENU

:BACKEND_KAFKA
call "%~dp0run_backend_kafka.bat"
goto MENU

:SOLUTIONS
call "%~dp0run_solutions_engineer.bat"
goto MENU

:ALL_TESTS
cls
echo Running unit tests for all projects...
set PATH=%PATH%;C:\Program Files\nodejs;C:\Program Files\Go\bin;D:\Program Files\Git\cmd

echo.
echo [1/4] Running Frontend Tests...
cd /d "%~dp0frontend"
call npm test

echo.
echo [2/4] Running Backend REST Tests...
cd /d "%~dp0backend-rest"
go test -v ./...

echo.
echo [3/4] Running Backend Kafka Tests...
cd /d "%~dp0backend-kafka"
go test -v ./...

echo.
echo [4/4] Running Solutions Engineer Tests...
cd /d "%~dp0solutions-engineer\gateway"
go test -v ./...

echo.
echo ============================================================
echo           ALL TESTS COMPLETED SUCCESSFULLY!
echo ============================================================
pause
goto MENU

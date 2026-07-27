@echo off
title Moveo.AI - Frontend Project
color 0A
echo ============================================================
echo      MOVEO.AI - FRONTEND ENGINEER CHALLENGE LAUNCHER
echo ============================================================
echo.
cd /d "%~dp0frontend"
set PATH=%PATH%;C:\Program Files\nodejs;D:\Program Files\Git\cmd

echo Starting Vite Development Server...
echo Opening http://localhost:5173 in browser...
start http://localhost:5173
npm run dev
pause

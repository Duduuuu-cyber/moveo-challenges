#!/usr/bin/env bash

# Moveo.AI - Frontend Project Launcher for macOS / Linux
SCRIPT_DIR="$( cd "$( dirname "${BASH_SOURCE[0]}" )" >/dev/null 2>&1 && pwd )"

echo "============================================================"
echo "     MOVEO.AI - FRONTEND ENGINEER CHALLENGE LAUNCHER"
echo "============================================================"
echo ""

cd "$SCRIPT_DIR/frontend" || exit 1

echo "Starting Vite Development Server..."
echo "Opening http://localhost:5173 in browser..."

if command -v open >/dev/null 2>&1; then
    open http://localhost:5173 &
elif command -v xdg-open >/dev/null 2>&1; then
    xdg-open http://localhost:5173 &
fi

npm run dev

#!/usr/bin/env bash

# Moveo.AI - Backend REST API Launcher for macOS / Linux
SCRIPT_DIR="$( cd "$( dirname "${BASH_SOURCE[0]}" )" >/dev/null 2>&1 && pwd )"

echo "============================================================"
echo "     MOVEO.AI - BACKEND REST API LAUNCHER (GOLANG)"
echo "============================================================"
echo ""

cd "$SCRIPT_DIR/backend-rest" || exit 1

echo "Running Go REST API server on http://localhost:8080..."
echo ""

go run cmd/api/main.go

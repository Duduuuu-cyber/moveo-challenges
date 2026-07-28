#!/usr/bin/env bash

# Moveo.AI - Backend Kafka Analytics Launcher for macOS / Linux
SCRIPT_DIR="$( cd "$( dirname "${BASH_SOURCE[0]}" )" >/dev/null 2>&1 && pwd )"

echo "============================================================"
echo "     MOVEO.AI - BACKEND KAFKA ANALYTICS LAUNCHER"
echo "============================================================"
echo ""

cd "$SCRIPT_DIR/backend-kafka" || exit 1

echo "Running Go Unit Tests for Analytics Engine..."
echo ""
go test -v ./...

echo ""
echo "Launching Producer REST API on port 8081..."
go run cmd/producer/main.go

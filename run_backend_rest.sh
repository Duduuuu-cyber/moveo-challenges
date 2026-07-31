#!/usr/bin/env bash
set -e
cd "$(dirname "$0")/backend-rest"

echo "Starting Moveo.AI backend REST API on http://localhost:8080"
go run cmd/api/main.go

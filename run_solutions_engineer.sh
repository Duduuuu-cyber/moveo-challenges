#!/usr/bin/env bash
set -e
cd "$(dirname "$0")/solutions-engineer/gateway"

echo "Starting Moveo.AI Solutions Engineer gateway on http://localhost:8082"
go run cmd/server/main.go

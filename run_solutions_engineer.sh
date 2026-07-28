#!/usr/bin/env bash

# Moveo.AI - Solutions Engineer Showcase Launcher for macOS / Linux
SCRIPT_DIR="$( cd "$( dirname "${BASH_SOURCE[0]}" )" >/dev/null 2>&1 && pwd )"

echo "============================================================"
echo "     MOVEO.AI - SOLUTIONS ENGINEER GATEWAY LAUNCHER"
echo "============================================================"
echo ""

cd "$SCRIPT_DIR/solutions-engineer/gateway" || exit 1

echo "Running HMAC Signature Verification & Webhook Tests..."
echo ""
go test -v ./...

echo ""
echo "Launching Moveo Webhook Gateway on port 8082..."
go run cmd/server/main.go

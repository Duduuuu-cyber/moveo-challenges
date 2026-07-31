#!/usr/bin/env bash
set -e
cd "$(dirname "$0")/backend-kafka"

echo "Starting Moveo.AI backend Kafka producer/consumer services"
go run cmd/producer/main.go

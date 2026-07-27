# Real-Time Analytics Microservice (Moveo.AI Backend Challenge Kafka)

Event-driven real-time analytics microservice built with **Golang**, **Apache Kafka**, and **PostgreSQL**.

---

## Architecture & Data Flow

```
   HTTP POST /activity
 ─────────────────────► ┌──────────────────┐
                        │  Kafka Producer  │
                        │   (Go REST API)  │
                        └────────┬─────────┘
                                 │
                                 ▼
                     Kafka Topic: incoming.user_activity
                                 │
                                 ▼
                        ┌──────────────────┐
                        │  Kafka Consumer  │
                        │ (Goroutine Pool) │
                        └────────┬─────────┘
                                 │
                                 ▼
                        ┌──────────────────┐
                        │   PostgreSQL     │
                        │ (user_analytics) │
                        └──────────────────┘
```

---

## Key Features & Bonus Implementations

1. **RESTful Kafka Producer:**
   - Exposes `POST /activity` accepting `incoming.user_activity` JSON schema.
   - Validates schema and publishes messages asynchronously to Kafka.
2. **Transformations & Consumer Aggregations:**
   - Deduplicates active users (`user_id`).
   - Aggregates total `page_view` activity events.
   - Upserts summary metrics into PostgreSQL (`user_analytics` single-row table design).
3. **Horizontal Worker Scaling (Bonus):**
   - Spawns a concurrent worker goroutine pool (`WORKER_COUNT=4`) to process messages in parallel.
4. **Retry Strategy & Dead-Letter Queue (Bonus):**
   - Implements exponential backoff retry mechanism for failed message processing.
5. **Graceful Shutdown (Bonus):**
   - Captures `SIGINT` / `SIGTERM` OS signals to finish processing in-flight messages and close consumer channels cleanly.

---

## How to Run

### Option 1: Docker Compose (Single Command)
```bash
docker-compose up --build
```

### Option 2: Run Unit Tests
```bash
go test -v ./...
```

---

## Testing API Endpoints (cURL Example)

### Publish User Activity Message:
```bash
curl -X POST http://localhost:8081/activity \
  -H "Content-Type: application/json" \
  -d '{
    "user_id": "usr_99812",
    "activity_type": "page_view",
    "timestamp": "2026-07-27T12:00:00Z",
    "metadata": {
      "page_url": "https://console.moveo.ai/dashboard",
      "referrer": "https://google.com"
    }
  }'
```

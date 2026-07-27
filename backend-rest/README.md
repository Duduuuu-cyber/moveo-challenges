# Task Management REST API (Moveo.AI Backend Challenge REST)

Production-ready RESTful Task Management API written in **Go (Golang)** using the **Gin Web Framework**, featuring thread-safe architecture, JWT authentication, pagination, status/date filtering, OpenAPI 3.0 documentation, unit tests, and multi-stage Docker containerization.

---

## Features & Endpoints

| Method | Endpoint | Description | Query Parameters / Payload |
|---|---|---|---|
| `POST` | `/tasks` | Create a new task | `{ "title": "...", "description": "...", "status": "pending\|in-progress\|completed", "due_date": "..." }` |
| `GET` | `/tasks` | List tasks | `?page=1&limit=10&status=pending&due_date=2026-07-27` |
| `GET` | `/tasks/:id` | Get single task by ID | Path param `:id` (UUID) |
| `PUT` | `/tasks/:id` | Update task fields | `{ "title": "...", "status": "completed" }` |
| `DELETE` | `/tasks/:id` | Delete task by ID | Path param `:id` (UUID) |
| `POST` | `/api/v1/auth/login` | Obtain JWT bearer token | `{ "username": "admin", "password": "password123" }` |

---

## How to Run

### 1. Run Locally with Go
```bash
go run cmd/api/main.go
```
The server will start listening on `http://localhost:8080`.

### 2. Run Unit Tests
```bash
go test -v ./...
```

### 3. Run via Docker Compose
```bash
docker-compose up --build
```

---

## API Testing Examples (cURL)

### Create Task:
```bash
curl -X POST http://localhost:8080/tasks \
  -H "Content-Type: application/json" \
  -d '{
    "title": "Configure Kafka Consumers",
    "description": "Implement real-time analytics streaming",
    "status": "pending"
  }'
```

### Get Tasks with Pagination & Filtering:
```bash
curl "http://localhost:8080/tasks?page=1&limit=5&status=pending"
```

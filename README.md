# Moveo.AI Technical Challenges Master Suite

A comprehensive repository containing 5 production-grade technical challenges engineered for Moveo.AI, covering Frontend, REST Backend, Kafka Streaming Analytics, DevOps & Kubernetes Infrastructure, and Solutions Engineering Architecture.

---

## Quick Start & Interactive Master Launcher

### macOS / Linux (Apple Silicon ARM & x86_64)

Make the scripts executable and run the master interactive launcher:

```bash
chmod +x *.sh
./RUN_ALL_CHALLENGES.sh
```

#### macOS / Linux Direct Launchers:
- **`./run_frontend.sh`**: Boots the React 19 + Vite development server (`http://localhost:5173`).
- **`./run_backend_rest.sh`**: Runs the Golang Gin Task REST API (`http://localhost:8080`).
- **`./run_backend_kafka.sh`**: Launches Kafka Producer REST API & Consumer analytics services.
- **`./run_solutions_engineer.sh`**: Boots the Solutions Engineer Webhook Gateway (`http://localhost:8082`).

### Windows

On Windows systems, launch the interactive console:

```cmd
RUN_ALL_CHALLENGES.bat
```

#### Windows Direct Launchers:
- **`run_frontend.bat`**: Boots the React 19 + Vite development server (`http://localhost:5173`).
- **`run_backend_rest.bat`**: Runs the Golang Gin Task REST API (`http://localhost:8080`).
- **`run_backend_kafka.bat`**: Launches Kafka Producer REST API & Consumer analytics services.
- **`run_solutions_engineer.bat`**: Boots the Solutions Engineer Webhook Gateway (`http://localhost:8082`).

---

## Suite Structure & Technical Overview

| Challenge Directory | Track / Role | Tech Stack | Key Architectural Highlights |
|---|---|---|---|
| [`frontend/`](./frontend/README.md) | Frontend Engineer | React 19, TypeScript, Tailwind CSS, Framer Motion, Vitest | Client-side parallel data pre-fetching & search, in-place card expansion, 3s timeout fallback resilience. |
| [`backend-rest/`](./backend-rest/README.md) | Backend Engineer (REST) | Go 1.22, Gin Framework, JWT, Docker, OpenAPI 3.0 | Onion architecture, `sync.RWMutex` thread-safe repository, JWT auth, status/due-date filtering & pagination. |
| [`backend-kafka/`](./backend-kafka/README.md) | Backend Engineer (Kafka) | Go, `segmentio/kafka-go`, PostgreSQL, Docker Compose | REST Producer, worker pool consumer (`WORKER_COUNT=4`), exponential backoff retry, Dead-Letter Queue (DLQ). |
| [`devops/`](./devops/README.md) | DevOps Engineer | Docker, Kubernetes, Helm, Terraform, Kafka, Python/Node | Multi-stage non-root Docker builds, Helm package chart, Terraform Kind cluster IaC, Liveness/Readiness probes. |
| [`solutions-engineer/`](./solutions-engineer/README.md) | Solutions Engineer | Go, Webhooks, HMAC SHA-256, Mermaid.js, RFC Specs | `X-Moveo-Signature` security middleware, Mermaid sequence diagrams for `tool_call` & live agent handover. |

---

## Unit Testing Suite

All projects contain unit test coverage verifying business logic, API endpoints, hook behavior, and cryptographic security signatures.

Run all tests across the entire repository with option `[5]` in `RUN_ALL_CHALLENGES.bat`, or individually:

### 1. Frontend Tests (Vitest + React Testing Library)
```bash
cd frontend
npm test
```

### 2. Backend REST Tests (Go Standard Testing)
```bash
cd backend-rest
go test -v ./...
```

### 3. Backend Kafka Streaming Tests (Go Standard Testing)
```bash
cd backend-kafka
go test -v ./...
```

### 4. Solutions Engineer Gateway Tests (Go Standard Testing)
```bash
cd solutions-engineer/gateway
go test -v ./...
```

---

## Prerequisites

- **Go**: `1.22+`
- **Node.js**: `v20+` & **npm**
- **Docker**: Desktop / Engine with `docker-compose`
- **Kubernetes / Helm / Terraform**: (Optional, for DevOps deployment validation)

---

## License & Attribution

Developed for Moveo.AI Technical Evaluation.

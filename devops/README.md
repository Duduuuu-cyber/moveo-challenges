# DevOps Engineer Challenge: Event-Driven Microservices Architecture

Containerized event-driven microservices architecture featuring a **Node.js Frontend**, **Python Kafka Producer**, and **Python Kafka Consumer** orchestrated via **Apache Kafka** on **Kubernetes**, **Helm**, and **Terraform**.

---

## System Architecture

```
                               ┌──────────────────────────┐
                               │     Frontend Service     │
                               │   (Node.js / Port 3000)   │
                               └──────────────────────────┘
                                             ▲
                                             │ HTTP (Ingress/LoadBalancer)
                                             │
                                   ┌──────────────────┐
                                   │  User Browser    │
                                   └──────────────────┘

 ┌──────────────────┐       Kafka Topic        ┌──────────────────┐
 │ Producer Service │ ──► moveo-challenge-topic ──►│ Consumer Service │
 │ (Python Worker)  │                          │ (Python Worker)  │
 └──────────────────┘                          └──────────────────┘
```

---

## How to Run

### Option 1: Local Docker Compose (Single Command Boot)
Run the entire stack (Zookeeper, Kafka Broker, Frontend, Producer, Consumer) with one command:

```bash
docker-compose up --build -d
```

#### Access Frontend:
Open your browser and navigate to: `http://localhost:3000`

#### View Consumer Logs (Verification):
```bash
docker logs -f devops-consumer
```

Expected log output stream:
```
--- Starting Consumer Service ---
Targeting Kafka Broker: kafka:9092
Attempting to connect to Kafka (Attempt 1)...
SUCCESS: Connected to Kafka!
Listening for messages...
Received: {"id": 1, "message": "Hello from Producer Service!"}
Received: {"id": 2, "message": "Hello from Producer Service!"}
Received: {"id": 3, "message": "Hello from Producer Service!"}
```

---

### Option 2: Kubernetes Deployment via Manifests

#### 1. Apply Cluster Manifests:
```bash
kubectl apply -f k8s/configmap.yaml
kubectl apply -f k8s/secret.yaml
kubectl apply -f k8s/kafka.yaml
kubectl apply -f k8s/frontend-deployment.yaml
kubectl apply -f k8s/producer-deployment.yaml
kubectl apply -f k8s/consumer-deployment.yaml
```

#### 2. Check Pod Status:
```bash
kubectl get pods -w
```

#### 3. Stream Consumer Logs:
```bash
kubectl logs -f deployment/consumer-service
```

---

### Option 3: Helm Chart Deployment (Bonus)
Package and deploy using the custom Helm Chart:

```bash
helm install moveo-stack ./helm/moveo-stack
```

---

### Option 4: Infrastructure as Code with Terraform (Bonus)
Provision a local Kind Kubernetes cluster automatically:

```bash
cd terraform
terraform init
terraform apply -auto-approve
```

---

## Architecture Decisions & Best Practices

1. **Multi-Stage & Minimal Base Images:**
   - Frontend uses `node:20-alpine` (lightweight, minimal attack surface).
   - Producer and Consumer use `python:3.11-slim` with a multi-stage builder pattern separating build tools from runtime.
2. **Security & Non-Root Execution:**
   - Containers run under non-root users (`USER node` / `USER appuser`) to satisfy Kubernetes Pod Security Standards.
3. **Decoupled Service Discovery & Environment Configuration:**
   - Hardcoded IP addresses are avoided. Service URLs (`KAFKA_BROKER`, `TOPIC_NAME`) are dynamically injected via Kubernetes `ConfigMap` and `Secret` objects.
4. **Resilience & Probes:**
   - Consumer deployment includes a `livenessProbe` (`pgrep -f consumer.py`) to ensure Kubernetes automatically restarts the worker if it hangs or drops Kafka connection.
   - Frontend includes both `livenessProbe` and `readinessProbe` checking port 3000.

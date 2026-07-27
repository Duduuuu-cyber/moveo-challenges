# Moveo.AI Solutions Engineer Showcase

Enterprise Integration Architecture, Integration Middleware Gateway, and Architecture RFC designed for **Moveo.AI**.

---

## Deliverables & Components

1. **Moveo Integration Gateway (Go Microservice):**
   - Webhook handler for `tool_call` and `handover_requested` events.
   - Security verification via HMAC SHA-256 (`X-Moveo-Signature`).
   - Standardized JSON responses for conversational LLM tool execution.
2. **Architecture Blueprint (`docs/ARCHITECTURE_BLUEPRINT.md`):**
   - High-level topology, security baseline, and system SLA guarantees.
3. **Sequence Diagrams (`docs/sequence_diagrams.md`):**
   - End-to-end interactive Mermaid diagrams for tool calling and live human agent escalation.

---

## How to Run Gateway & Tests

### 1. Run Unit Tests
```bash
cd gateway
go test -v ./...
```

### 2. Run Gateway Server
```bash
cd gateway
go run cmd/server/main.go
```
The gateway server starts on `http://localhost:8082`.

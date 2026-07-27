# Multi-stage production build for Go REST API
FROM golang:1.22-alpine AS builder

WORKDIR /app

COPY go.mod go.sum ./
RUN go mod download

COPY . .
RUN CGO_ENABLED=0 GOOS=linux go build -ldflags="-w -s" -o task-api ./cmd/api

FROM alpine:3.19 AS runner

RUN apk add --no-cache ca-certificates tzdata

WORKDIR /app

COPY --from=builder /app/task-api .
COPY --from=builder /app/docs/swagger.json ./docs/swagger.json

EXPOSE 8080

CMD ["./task-api"]

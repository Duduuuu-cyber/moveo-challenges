# Multi-stage lightweight build for Python Kafka Consumer
FROM python:3.11-slim AS builder

WORKDIR /app

COPY requirements.txt ./
RUN pip install --no-cache-dir --prefix=/install -r requirements.txt

FROM python:3.11-slim AS runner

WORKDIR /app

# Copy installed site-packages from builder stage
COPY --from=builder /install /usr/local
COPY consumer.py ./

# Create non-root system user
RUN useradd -m -u 1000 appuser && chown -R appuser:appuser /app
USER appuser

ENV PYTHONUNBUFFERED=1

CMD ["python", "-u", "consumer.py"]

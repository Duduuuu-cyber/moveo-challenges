# Multi-stage production build for Node.js Frontend Service
FROM node:20-alpine AS base

WORKDIR /app

# Copy application source
COPY server.js ./

# Set environment defaults and non-root security user
ENV NODE_ENV=production \
    PORT=3000

USER node

EXPOSE 3000

# Healthcheck for container status
HEALTHCHECK --interval=10s --timeout=3s --start-period=5s --retries=3 \
  CMD wget --no-verbose --tries=1 --spider http://localhost:3000/ || exit 1

CMD ["node", "server.js"]

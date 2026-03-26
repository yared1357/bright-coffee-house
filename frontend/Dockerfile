# ==================== FRONTEND DOCKERFILE ====================

# Build Stage
FROM node:20-slim AS builder

WORKDIR /app

# Install dependencies with strong network tolerance
COPY package*.json ./

RUN npm config set registry http://registry.npmjs.org/ && \
    npm config set strict-ssl false && \
    npm config set fetch-retries 10 && \
    npm config set fetch-retry-mintimeout 30000 && \
    npm config set fetch-retry-maxtimeout 180000 && \
    npm cache clean --force && \
    npm install --prefer-offline --no-audit --progress=false

# Copy source code and build
COPY . .
RUN npm run build

# Production Stage
FROM nginx:alpine

# Remove default nginx page
RUN rm -rf /usr/share/nginx/html/*

# Copy built React app
COPY --from=builder /app/dist /usr/share/nginx/html

# Custom nginx config for React Router (SPA fallback)
RUN echo 'server { \
    listen 80; \
    server_name localhost; \
    location / { \
    root /usr/share/nginx/html; \
    index index.html index.htm; \
    try_files $uri $uri/ /index.html; \
    } \
    }' > /etc/nginx/conf.d/default.conf

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
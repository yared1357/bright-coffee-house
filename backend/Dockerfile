# ==================== BACKEND DOCKERFILE ====================
FROM node:20-slim

# Install OpenSSL (required by Prisma)
RUN apt-get update && apt-get install -y openssl && rm -rf /var/lib/apt/lists/*

WORKDIR /app

# Copy package files first
COPY package*.json ./
COPY prisma ./prisma/

# Strong network settings for Ethiopia (unstable connection)
RUN npm config set registry http://registry.npmjs.org/ && \
    npm config set strict-ssl false && \
    npm config set fetch-retries 10 && \
    npm config set fetch-retry-mintimeout 30000 && \
    npm config set fetch-retry-maxtimeout 180000 && \
    npm cache clean --force && \
    npm install --prefer-offline --no-audit --progress=false

# Copy source code
COPY . .

# Generate Prisma client and build
RUN npx prisma generate
RUN npm run build

EXPOSE 5000

# Run migrations and start server
CMD ["sh", "-c", "npx prisma migrate deploy && npm start"]
# Stage 1: Build the React (Vite) app
FROM node:20-alpine AS builder

WORKDIR /app

# Copy package files first for caching
COPY package*.json ./

# Install dependencies (ci for clean/prod-like install)
RUN npm ci

# Copy the rest of your project
COPY . .

# Build the production version (Vite outputs to /dist)
RUN npm run build

# Stage 2: Serve with lightweight Nginx
FROM nginx:alpine

# Remove default Nginx welcome page
RUN rm -rf /usr/share/nginx/html/*

# Copy the built Vite files (dist folder)
COPY --from=builder /app/dist /usr/share/nginx/html

# Expose the port Nginx listens on
EXPOSE 80

# Start Nginx in foreground
CMD ["nginx", "-g", "daemon off;"]
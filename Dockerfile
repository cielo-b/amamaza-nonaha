# Step 1: Build the Vite application using Node 20 LTS
FROM node:20-alpine AS builder

WORKDIR /app

# Copy dependency manifests
COPY package*.json ./

# Install exact dependencies
RUN npm ci

# Copy project source and build static bundle
COPY . .
RUN npm run build

# Step 2: Serve with lightweight Caddy web server
FROM caddy:2-alpine

# Copy Caddyfile configuration
COPY Caddyfile /etc/caddy/Caddyfile

# Copy static assets from builder stage
COPY --from=builder /app/dist /usr/share/caddy

# Support standard HTTP, Node/Vite port 3000, or platform-assigned $PORT
EXPOSE 80 3000 8080

CMD ["caddy", "run", "--config", "/etc/caddy/Caddyfile", "--adapter", "caddyfile"]

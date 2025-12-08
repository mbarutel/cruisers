# Build stage
FROM node:20-alpine AS builder

# Install pnpm
RUN corepack enable && corepack prepare pnpm@latest --activate

# Set working directory
WORKDIR /app

# Copy package files
COPY package.json pnpm-lock.yaml ./

# Install dependencies
RUN pnpm install --frozen-lockfile

# Copy source code
COPY . .

# Build the application
RUN pnpm run build

# Production stage
FROM node:20-alpine AS runner

# Install pnpm
RUN corepack enable && corepack prepare pnpm@latest --activate

# Set working directory
WORKDIR /app

# Copy necessary files from builder
COPY --from=builder /app/.output /app/.output
COPY --from=builder /app/package.json /app/package.json

# Set environment to production
ENV NODE_ENV=production

# Expose port 3000
EXPOSE 3000

# Start the application
CMD ["node", ".output/server/index.mjs"]

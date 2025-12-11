#!/bin/bash

# Deployment script for Cruiser's Beach Resort
# Run this script on your Digital Ocean Droplet

set -e

echo "🚀 Starting deployment..."

# Pull latest changes
echo "📥 Pulling latest code..."
git pull

# Stop existing containers
echo "🛑 Stopping existing containers..."
docker-compose down

# Build and start containers
echo "🔨 Building and starting containers..."
docker-compose up -d --build

# Show status
echo "✅ Deployment complete!"
echo ""
echo "📊 Container status:"
docker-compose ps

echo ""
echo "📝 Recent logs:"
docker-compose logs --tail=20

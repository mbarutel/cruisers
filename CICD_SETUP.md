# CI/CD Pipeline Setup Guide

Your CI/CD pipeline has been fixed and enhanced. Here's what was changed and how to complete the setup.

## What Was Fixed

### Problem
- GitHub Actions was building and pushing Docker images to Docker Hub successfully
- However, the `deploy` job wasn't actually pulling and running the new image on your Digital Ocean droplet
- The `IMAGE_NAME` environment variable wasn't being properly passed to the SSH script

### Solution
- Fixed the SSH deployment script to directly use `${{ secrets.DOCKERHUB_USERNAME }}/cruisers:latest`
- Added environment variables for the booking system (Resend API key)
- Added automatic cleanup of old Docker images
- Improved logging and status reporting

## Required GitHub Secrets

You need to configure these secrets in your GitHub repository:

### Go to: `GitHub Repo → Settings → Secrets and variables → Actions`

Add these secrets:

| Secret Name | Description | Example Value |
|------------|-------------|---------------|
| `DOCKERHUB_USERNAME` | Your Docker Hub username | `johndoe` |
| `DOCKERHUB_TOKEN` | Docker Hub access token | `dckr_pat_abc123...` |
| `HOST` | Digital Ocean droplet IP address | `147.182.123.45` |
| `USERNAME` | SSH username (usually `root`) | `root` |
| `SSH_PRIVATE_KEY` | Private SSH key for authentication | `-----BEGIN OPENSSH PRIVATE KEY-----...` |
| `RESEND_API_KEY` | Resend API key for booking emails | `re_abc123...` |
| `RESORT_EMAIL` | Email to receive bookings | `cruisersseafront@gmail.com` |

### How to Get Each Secret

#### 1. DOCKERHUB_USERNAME & DOCKERHUB_TOKEN
```bash
# Your Docker Hub username is your login
# To get an access token:
# 1. Go to hub.docker.com
# 2. Click your profile → Account Settings → Security
# 3. Click "New Access Token"
# 4. Name it "GitHub Actions" with Read/Write permissions
# 5. Copy the token (starts with dckr_pat_)
```

#### 2. HOST
```bash
# Your Digital Ocean droplet IP address
# Find it in Digital Ocean dashboard
```

#### 3. USERNAME
```bash
# Usually "root" for Digital Ocean droplets
# Or whatever user you created
```

#### 4. SSH_PRIVATE_KEY
```bash
# On your local machine:
cat ~/.ssh/id_rsa
# Or if you use a different key:
cat ~/.ssh/your_key_name

# Copy the ENTIRE output, including:
# -----BEGIN OPENSSH PRIVATE KEY-----
# ... key content ...
# -----END OPENSSH PRIVATE KEY-----
```

**Important:** If you don't have an SSH key set up on your droplet:

```bash
# Generate a new key pair locally
ssh-keygen -t ed25519 -C "github-actions-cruisers"

# Copy public key to droplet
ssh-copy-id root@YOUR_DROPLET_IP

# Add private key to GitHub Secrets
cat ~/.ssh/id_ed25519
```

#### 5. RESEND_API_KEY
```bash
# Get from resend.com dashboard
# See BOOKING_SETUP.md for details
```

#### 6. RESORT_EMAIL
```bash
# The email address where bookings should be sent
cruisersseafront@gmail.com
```

## How the CI/CD Pipeline Works

### Trigger
```yaml
on:
  push:
    branches: [main]
```
Pipeline runs automatically when you push to the `main` branch.

### Job 1: Build and Push
1. ✅ Checks out your code
2. ✅ Sets up Docker Buildx for multi-platform builds
3. ✅ Logs into Docker Hub
4. ✅ Builds the Docker image
5. ✅ Pushes to Docker Hub with two tags:
   - `latest` - Always points to the newest build
   - `${{ github.sha }}` - Specific commit hash for rollback

### Job 2: Deploy
1. ✅ SSHs into your Digital Ocean droplet
2. ✅ Pulls the latest image from Docker Hub
3. ✅ Stops and removes the old container
4. ✅ Starts a new container with:
   - Port 3000 exposed
   - Auto-restart enabled
   - Production environment variables
   - Resend API configuration
5. ✅ Cleans up old images to save space
6. ✅ Shows container status and recent logs

## Testing the Pipeline

### Before Testing
Make sure all GitHub Secrets are configured (see above).

### Test Deployment

1. **Make a small change** (to trigger the pipeline):
```bash
# Edit a file (e.g., add a comment to README.md)
git add .
git commit -m "test: trigger CI/CD pipeline"
git push origin main
```

2. **Watch the pipeline**:
   - Go to GitHub → Your Repo → Actions
   - Click on the running workflow
   - Watch both jobs (build-and-push, deploy)

3. **Check deployment**:
```bash
# SSH into your droplet
ssh root@YOUR_DROPLET_IP

# Check running container
docker ps

# Check logs
docker logs cruisers

# Test the website
curl http://localhost:3000
```

4. **View in browser**:
   - Visit http://YOUR_DROPLET_IP:3000
   - Or your domain if configured

## Pipeline Logs Explained

### Successful Deployment Looks Like:
```
🚀 Starting deployment...
📥 Pulling latest image...
latest: Pulling from yourusername/cruisers
Digest: sha256:abc123...
Status: Downloaded newer image
🛑 Stopping existing container...
cruisers
cruisers
🔨 Starting new container...
f8d9c2a1b3e4... (container ID)
🧹 Cleaning up old images...
✅ Deployment complete!

📊 Container status:
CONTAINER ID   IMAGE                          STATUS
f8d9c2a1b3e4   yourusername/cruisers:latest   Up 2 seconds

📝 Recent logs:
Listening on http://[::]:3000
```

### Common Errors

#### Error: "Permission denied (publickey)"
**Solution:** Your SSH key isn't set up correctly.
```bash
# Verify SSH access manually first:
ssh root@YOUR_DROPLET_IP

# If that works, make sure you copied the PRIVATE key to GitHub Secrets
```

#### Error: "Cannot connect to the Docker daemon"
**Solution:** Docker isn't running on your droplet.
```bash
ssh root@YOUR_DROPLET_IP
sudo systemctl start docker
sudo systemctl enable docker
```

#### Error: "unauthorized: authentication required"
**Solution:** Docker Hub credentials are wrong.
- Double-check `DOCKERHUB_USERNAME` and `DOCKERHUB_TOKEN` in GitHub Secrets

#### Error: "pull access denied"
**Solution:** Image name doesn't match or doesn't exist.
- Verify image exists: `docker pull yourusername/cruisers:latest`

## Manual Deployment (If CI/CD Fails)

If you need to deploy manually while debugging:

```bash
# SSH into droplet
ssh root@YOUR_DROPLET_IP

# Pull latest image
docker pull yourusername/cruisers:latest

# Stop old container
docker stop cruisers
docker rm cruisers

# Start new container
docker run -d \
  --name cruisers \
  --restart unless-stopped \
  -p 3000:3000 \
  -e NODE_ENV=production \
  -e NUXT_RESEND_API_KEY=your_resend_key \
  -e NUXT_RESORT_EMAIL=cruisersseafront@gmail.com \
  yourusername/cruisers:latest

# Check status
docker ps
docker logs cruisers
```

## Rollback to Previous Version

If a deployment breaks something:

```bash
# Find previous image tag (commit hash)
# Go to GitHub → Your Repo → Actions → Find working deployment
# Copy the commit SHA from that run

# SSH into droplet
ssh root@YOUR_DROPLET_IP

# Pull specific version
docker pull yourusername/cruisers:COMMIT_SHA_HERE

# Stop current container
docker stop cruisers
docker rm cruisers

# Run previous version
docker run -d \
  --name cruisers \
  --restart unless-stopped \
  -p 3000:3000 \
  -e NODE_ENV=production \
  -e NUXT_RESEND_API_KEY=your_resend_key \
  -e NUXT_RESORT_EMAIL=cruisersseafront@gmail.com \
  yourusername/cruisers:COMMIT_SHA_HERE
```

## Environment Variables on Server

The CI/CD pipeline now automatically sets these environment variables:
- ✅ `NODE_ENV=production`
- ✅ `NUXT_RESEND_API_KEY` (from GitHub Secret)
- ✅ `NUXT_RESORT_EMAIL` (from GitHub Secret)

You don't need to manually configure these on the server.

## Monitoring and Logs

### View Real-time Logs
```bash
# SSH into droplet
ssh root@YOUR_DROPLET_IP

# Follow logs
docker logs -f cruisers

# Last 100 lines
docker logs --tail=100 cruisers

# With timestamps
docker logs -f --timestamps cruisers
```

### Check Container Health
```bash
# Container status
docker ps

# Resource usage
docker stats cruisers

# Inspect container
docker inspect cruisers
```

## Security Best Practices

✅ **What's Already Secure:**
- SSH private key used (not password)
- Environment variables in GitHub Secrets (encrypted)
- `.env` file gitignored (never committed)
- Docker Hub tokens used (not passwords)

⚠️ **Additional Recommendations:**
1. Set up a firewall on your droplet
2. Use a non-root user for deployments
3. Enable 2FA on Docker Hub
4. Rotate SSH keys periodically
5. Set up monitoring alerts

## Troubleshooting Checklist

- [ ] All GitHub Secrets are configured
- [ ] SSH key has correct permissions (`chmod 600 ~/.ssh/id_rsa`)
- [ ] Can SSH into droplet manually: `ssh root@YOUR_DROPLET_IP`
- [ ] Docker is installed and running on droplet
- [ ] Port 3000 is not blocked by firewall
- [ ] Docker Hub repository exists and is accessible
- [ ] Resend API key is valid

## Next Steps

1. ✅ Configure all GitHub Secrets
2. ✅ Test the pipeline with a small commit
3. ✅ Verify deployment on your droplet
4. ✅ Test the booking system in production
5. ✅ Set up domain and SSL (optional)

## Advanced: Blue-Green Deployment (Optional)

For zero-downtime deployments:

```yaml
# In .github/workflows/deploy.yml, modify deploy script:
script: |
  # Pull new image
  docker pull ${{ secrets.DOCKERHUB_USERNAME }}/cruisers:latest
  
  # Start new container on different port
  docker run -d --name cruisers-new -p 3001:3000 \
    -e NODE_ENV=production \
    ${{ secrets.DOCKERHUB_USERNAME }}/cruisers:latest
  
  # Wait for health check (add health endpoint first)
  sleep 5
  
  # Switch traffic (update nginx/reverse proxy)
  # Then remove old container
  docker stop cruisers && docker rm cruisers
  docker rename cruisers-new cruisers
```

## Support

For issues:
1. Check GitHub Actions logs
2. SSH into droplet and check `docker logs cruisers`
3. Verify all secrets are correctly configured
4. Test manual deployment first

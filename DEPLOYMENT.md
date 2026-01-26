# Digital Ocean Deployment Guide

## Prerequisites
- Digital Ocean account
- Domain name (optional but recommended)
- Git repository (GitHub, GitLab, etc.)

## Step 1: Create a Droplet

1. Log in to Digital Ocean
2. Create a new Droplet:
   - **Image**: Ubuntu 22.04 LTS
   - **Plan**: Basic ($6/month minimum recommended)
   - **CPU Options**: Regular (1 GB RAM, 1 vCPU)
   - **Datacenter**: Choose closest to your target audience
   - **Authentication**: SSH keys (recommended) or Password
   - **Hostname**: cruisers-beach-resort

3. Note your Droplet's IP address

## Step 2: Initial Server Setup

SSH into your droplet:
```bash
ssh root@YOUR_DROPLET_IP
```

Update system packages:
```bash
apt update && apt upgrade -y
```

## Step 3: Install Docker and Docker Compose

```bash
# Install Docker
curl -fsSL https://get.docker.com -o get-docker.sh
sh get-docker.sh

# Start and enable Docker
systemctl start docker
systemctl enable docker

# Install Docker Compose
apt install docker-compose -y

# Verify installation
docker --version
docker-compose --version
```

## Step 4: Set Up the Application

Clone your repository:
```bash
cd /opt
git clone YOUR_REPOSITORY_URL cruisers
cd cruisers
```

Build and run with Docker Compose:
```bash
docker-compose up -d
```

Verify the container is running:
```bash
docker-compose ps
```

## Step 5: Install and Configure Nginx

Install Nginx:
```bash
apt install nginx -y
```

Create Nginx configuration:
```bash
nano /etc/nginx/sites-available/cruisers
```

Add this configuration:
```nginx
server {
    listen 80;
    server_name YOUR_DOMAIN.com www.YOUR_DOMAIN.com;

    location / {
        proxy_pass http://localhost:3000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
    }
}
```

Enable the site:
```bash
ln -s /etc/nginx/sites-available/cruisers /etc/nginx/sites-enabled/
nginx -t
systemctl restart nginx
```

## Step 6: Configure Firewall

```bash
# Enable UFW
ufw allow OpenSSH
ufw allow 'Nginx Full'
ufw enable

# Verify
ufw status
```

## Step 7: Set Up Domain (Optional)

1. Go to your domain registrar
2. Add an A record pointing to your Droplet's IP:
   - **Host**: @ (or your subdomain)
   - **Value**: YOUR_DROPLET_IP
   - **TTL**: 3600

3. Add CNAME for www:
   - **Host**: www
   - **Value**: YOUR_DOMAIN.com

Wait for DNS propagation (5-30 minutes)

## Step 8: Install SSL Certificate

Install Certbot:
```bash
apt install certbot python3-certbot-nginx -y
```

Obtain SSL certificate:
```bash
certbot --nginx -d YOUR_DOMAIN.com -d www.YOUR_DOMAIN.com
```

Follow the prompts and select option 2 (redirect HTTP to HTTPS)

Test auto-renewal:
```bash
certbot renew --dry-run
```

## Step 9: Auto-restart Container on Reboot

The Docker Compose file already has `restart: unless-stopped`, so the container will automatically start on server reboot.

## Updating the Application

To update your application:
```bash
cd /opt/cruisers
git pull
docker-compose down
docker-compose up -d --build
```

## Monitoring

View logs:
```bash
docker-compose logs -f
```

Check container status:
```bash
docker-compose ps
```

## Troubleshooting

**Container won't start:**
```bash
docker-compose logs
```

**Nginx errors:**
```bash
nginx -t
tail -f /var/log/nginx/error.log
```

**Port already in use:**
```bash
lsof -i :3000
```

## Security Best Practices

1. Keep system updated: `apt update && apt upgrade`
2. Use SSH keys instead of passwords
3. Change SSH port (optional)
4. Set up fail2ban for brute force protection
5. Regular backups of your data
6. Monitor server resources

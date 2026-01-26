# Deployment Todo List - Cruiser's Beach Resort

This document provides a step-by-step checklist for deploying the application to Digital Ocean with automated GitHub Actions deployment pipeline.

---

## Phase 1: Initial Server Setup

### ☑ 1. Create Digital Ocean Droplet (Ubuntu 22.04, $6/month plan) - COMPLETED

**What it does:** Sets up a cloud server instance where your application will run.

**Why we do it:** Digital Ocean provides reliable, affordable hosting. Ubuntu 22.04 LTS is a stable Linux distribution with long-term support, ideal for production environments.

---

### ☑ 2. SSH into droplet and update system packages - COMPLETED

**What it does:** Connects to your server and updates all installed software to latest versions.

**Why we do it:** Ensures security patches are applied and prevents compatibility issues with outdated packages.

**Commands:**
```bash
ssh root@YOUR_DROPLET_IP
apt update && apt upgrade -y
```

---

### ☑ 3. Install Docker and Docker Compose on droplet - COMPLETED

**What it does:** Installs containerization platform and orchestration tool.

**Why we do it:** Docker allows your application to run in isolated containers with all dependencies included, ensuring consistency across environments. Docker Compose manages multi-container applications.

**Commands:**
```bash
curl -fsSL https://get.docker.com -o get-docker.sh
sh get-docker.sh
systemctl start docker
systemctl enable docker
apt install docker-compose -y
```

---

### ☑ 4. Clone repository to /opt/cruisers on droplet - COMPLETED

**What it does:** Downloads your application code from Git repository to the server.

**Why we do it:** Places your code in a standard location (/opt) for application deployment, making it easy to manage and update.

**Commands:**
```bash
cd /opt
git clone YOUR_REPOSITORY_URL cruisers
cd cruisers
```

---

### ☑ 5. Run docker-compose up -d to start application - COMPLETED

**What it does:** Builds and starts your application containers in detached mode.

**Why we do it:** Gets your application running on the server. The `-d` flag runs containers in the background so they continue running after you disconnect.

**Commands:**
```bash
docker-compose up -d
docker-compose ps
```

---

### ☐ 6. Install and configure Nginx as reverse proxy

**What it does:** Sets up a web server that forwards requests to your application.

**Why we do it:** Nginx handles SSL certificates, serves as a load balancer, provides better security, and allows you to run multiple applications on one server. It also serves static files efficiently.

**Commands:**
```bash
apt install nginx -y
nano /etc/nginx/sites-available/cruisers
# Add configuration
ln -s /etc/nginx/sites-available/cruisers /etc/nginx/sites-enabled/
nginx -t
systemctl restart nginx
```

---

### ☐ 7. Configure UFW firewall (allow SSH and Nginx)

**What it does:** Sets up firewall rules to control network access to your server.

**Why we do it:** Security measure that blocks unauthorized access while allowing necessary traffic (SSH for management, HTTP/HTTPS for web access).

**Commands:**
```bash
ufw allow OpenSSH
ufw allow 'Nginx Full'
ufw enable
ufw status
```

---

### ☐ 8. Set up domain DNS records (A record and CNAME)

**What it does:** Points your domain name to your server's IP address.

**Why we do it:** Allows users to access your site via a memorable domain name instead of an IP address. A record points to the IP, CNAME creates the www subdomain.

**DNS Records:**
- A Record: @ → YOUR_DROPLET_IP
- CNAME: www → YOUR_DOMAIN.com

---

### ☐ 9. Install SSL certificate with Certbot

**What it does:** Obtains and installs a free SSL/TLS certificate from Let's Encrypt.

**Why we do it:** Enables HTTPS encryption for secure communication between users and your server. Required for modern web standards, SEO, and user trust.

**Commands:**
```bash
apt install certbot python3-certbot-nginx -y
certbot --nginx -d YOUR_DOMAIN.com -d www.YOUR_DOMAIN.com
certbot renew --dry-run
```

---

### ☐ 10. Verify deployment and test application

**What it does:** Confirms that all components are working correctly.

**Why we do it:** Ensures the application is accessible, functioning properly, and ready for production use before setting up automation.

**Commands:**
```bash
docker-compose ps
docker-compose logs -f
curl http://localhost:3000
```

---

## Phase 2: GitHub Actions CI/CD Pipeline

### ☐ 11. Generate SSH key pair for GitHub Actions deployment

**What it does:** Creates a cryptographic key pair for secure authentication.

**Why we do it:** Allows GitHub Actions to securely connect to your server without using passwords. The private key stays in GitHub secrets, the public key goes on your server.

**Commands (run on your local machine):**
```bash
ssh-keygen -t ed25519 -C "github-actions-deploy" -f ~/.ssh/github_actions_cruisers
# Creates: github_actions_cruisers (private) and github_actions_cruisers.pub (public)
```

---

### ☐ 12. Add public SSH key to droplet authorized_keys

**What it does:** Authorizes the SSH key to access your server.

**Why we do it:** Grants GitHub Actions permission to SSH into your droplet and execute deployment commands.

**Commands (on droplet):**
```bash
echo "YOUR_PUBLIC_KEY_CONTENT" >> ~/.ssh/authorized_keys
chmod 600 ~/.ssh/authorized_keys
```

---

### ☐ 13. Create GitHub repository secrets (SSH_PRIVATE_KEY, HOST, USERNAME)

**What it does:** Stores sensitive deployment credentials securely in GitHub.

**Why we do it:** Keeps credentials secret and out of your code. GitHub Actions can access these during workflow execution without exposing them in logs.

**Steps:**
1. Go to GitHub repository → Settings → Secrets and variables → Actions
2. Add these secrets:
   - `SSH_PRIVATE_KEY`: Content of your private key file
   - `HOST`: Your droplet's IP address or domain
   - `USERNAME`: SSH username (usually `root`)

---

### ☐ 14. Create .github/workflows/deploy.yml workflow file

**What it does:** Defines an automated deployment process using GitHub Actions.

**Why we do it:** Automates the deployment process so every push to main branch automatically updates your production server. Reduces human error and speeds up deployments.

**File location:** `.github/workflows/deploy.yml`

---

### ☐ 15. Configure workflow to trigger on push to main branch

**What it does:** Sets the workflow to run automatically when code is pushed to main.

**Why we do it:** Implements continuous deployment - your changes go live automatically after merging to main, without manual intervention.

**Workflow triggers:**
```yaml
on:
  push:
    branches: [main]
```

---

### ☐ 16. Test GitHub Actions pipeline with a commit

**What it does:** Validates that the entire automated deployment pipeline works end-to-end.

**Why we do it:** Confirms that code changes successfully trigger deployment, build, and restart on the production server. Catches any configuration issues before they become problems.

**Test:**
1. Make a small change and commit
2. Push to main branch
3. Watch GitHub Actions tab for workflow execution
4. Verify application updates on server

---

## Additional Resources

- **Manual deployment script:** `deploy.sh` - Run this on the droplet to manually deploy updates
- **Full deployment guide:** `DEPLOYMENT.md` - Detailed instructions with code examples
- **Monitor logs:** `docker-compose logs -f`
- **Check status:** `docker-compose ps`

---

## Notes

- Mark items as completed with `[x]` as you finish them
- Keep this file updated with any customizations specific to your setup
- Consider setting up monitoring and backups after initial deployment

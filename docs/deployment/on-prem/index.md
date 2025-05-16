---
author: ReasonOps System
created: '2025-05-16T10:33:34.910Z'
links: []
status: draft
tags:
  - reasonops
  - obsidian
  - enterprise
title: index
type: doc
updated: '2025-05-16T10:33:34.910Z'
visibility: public
---
# 🏗 ReasonOps On-Prem Deployment Guide
This document outlines the strategy for deploying ReasonOps in on-premise, self-managed, or private cloud environments. It supports custom hosting scenarios outside of Vercel, including Docker, NGINX, Railway, Render, or ECS.
---
## 🧠 Purpose
Use this guide when:
- You want to host ReasonOps in your own infrastructure
- You need control over build, logging, scaling, or CI/CD
- Your environment does not support Vercel or similar platforms
---
## 📦 Stack Requirements
| Component  | Required Version                                     |
| ---------- | ---------------------------------------------------- |
| Node.js    | ≥18.x                                                |
| pnpm       | ≥8.x                                                 |
| Docker     | Optional                                             |
| PostgreSQL | Supabase-compatible schema                           |
| Supabase   | Optional (use your own Postgres instance if desired) |
| NGINX      | Optional (for reverse proxy / SSL)                   |
---
## 🐳 Docker Quick Start (Community Option)
1. Build container:
```bash
docker build -t reasonops-app .
```
2. Run app (example):
```bash
docker run -p 3000:3000 \
  -e NEXT_PUBLIC_SUPABASE_URL=... \
  -e NEXT_PUBLIC_SUPABASE_ANON_KEY=... \
  -e CLAUDE_API_KEY=... \
  reasonops-app
```
> You may want to bind a volume for logs or use a .env file with `--env-file`.
---
## 🔐 Env Configuration
See [`env.md`](./env.md) for full list.
At minimum, set:
- `NEXT_PUBLIC_SUPABASE_URL`
- `NEXT_PUBLIC_SUPABASE_ANON_KEY`
- `OPENAI_API_KEY` (optional)
- `CLAUDE_API_KEY` (optional)
- `DEPLOY_ENV=production`
---
## 🌐 Reverse Proxy (NGINX)
Recommended for:
- SSL termination
- Pretty domain names (e.g. `reasonops.yourcompany.com`)
- Traffic routing to ports/services
Sample block:
```nginx
server {
  listen 443 ssl;
  server_name reasonops.example.com;
  ssl_certificate /etc/ssl/certs/fullchain.pem;
  ssl_certificate_key /etc/ssl/private/privkey.pem;
  location / {
    proxy_pass http://localhost:3000;
    proxy_http_version 1.1;
    proxy_set_header Host $host;
    proxy_set_header X-Real-IP $remote_addr;
  }
}
```
---
## 🧱 Database Layer
Use any PostgreSQL-compatible instance. If not using Supabase, you’ll need to:
- Manually provision schema using `schema.sql`
- Replace Supabase auth calls (optional)
- Ensure `anon_key` is emulated for frontend connection
---
## 🔄 Process Management
Use a process manager like:
- `pm2`
- `forever`
- `systemd`
Example with pm2:
```bash
pm2 start pnpm --name reasonops -- run start
```
---
## 🔁 CI/CD Integration
Push to GitHub → Trigger deploy on self-hosted runner or container registry.
Integrations supported:
- GitHub Actions
- Railway Deploy Hook
- ECS GitOps triggers
---
## 🧩 Hosting Alternatives
| Platform | Notes                                     |
| -------- | ----------------------------------------- |
| Railway  | One-click Postgres + Node hosting         |
| Render   | Docker container + background job support |
| ECS      | Production container scaling (AWS)        |
| Fly.io   | Region-based, edge-deployed app runtime   |
---
## 🛡 Security & Access
- Always run behind HTTPS (NGINX + certbot recommended)
- Store secrets in environment file or secrets manager (not checked into Git)
- Use a reverse proxy to prevent port exposure
- Monitor for `DEPLOY_ENV !== "production"` in live envs
---
## ✅ Contributor Notes
- Use `.env` locally, `.env.production` for builds
- Log all startup env keys in `lib/logger.ts` (but never output secrets)
- Dockerfile should:
  - Install dependencies
  - Build frontend
  - Start production server via `pnpm start`
---
This guide ensures ReasonOps can be hosted and secured in fully private or custom-controlled environments.

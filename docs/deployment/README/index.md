---
title: "index"
status: "draft"
---

# 🚀 ReasonOps Deployment Architecture

This directory defines the deployment strategy and infrastructure management practices for ReasonOps. It covers local development, cloud deployment, environment variables, CI/CD, secret handling, and monitoring.

---

## 🧠 Purpose

The ReasonOps deployment system supports:

- Local developer setup and testing
- Staging and production builds (via Vercel or custom)
- Secure environment and secret management
- On-premise and cloud-native scaling
- Continuous integration and observability workflows

---

## 🌍 Environments

| Environment  | Description                                    |
| ------------ | ---------------------------------------------- |
| `local`      | Developer workstation or emulator              |
| `staging`    | Vercel Preview or CI-triggered branch          |
| `production` | Main deploy to live domain (e.g. reasonops.ai) |

---

## 📁 Deployment Modules

| File                               | Description                                    |
| ---------------------------------- | ---------------------------------------------- |
| [`local.md`](./local.md)           | Full local dev setup, Supabase emulator, tests |
| [`vercel.md`](./vercel.md)         | GitHub-linked Vercel deploy instructions       |
| [`supabase.md`](./supabase.md)     | DB provisioning, anon key setup, schema        |
| [`env.md`](./env.md)               | Master environment variable reference          |
| [`secrets.md`](./secrets.md)       | Secure secrets handling across environments    |
| [`cicd.md`](./cicd.md)             | CI pipelines, GitHub Actions, PR gates         |
| [`monitoring.md`](./monitoring.md) | Logging, health checks, analytics              |
| [`on-prem.md`](./on-prem.md)       | Docker, NGINX, self-hosted and ECS flows       |

---

## 🛠 Stack Summary

| Layer      | Tech                                          |
| ---------- | --------------------------------------------- |
| Frontend   | Next.js (App Router)                          |
| Hosting    | Vercel or Docker (on-prem)                    |
| Storage    | Supabase (Postgres)                           |
| API        | Next.js API Routes                            |
| CI/CD      | GitHub Actions + Vercel                       |
| Monitoring | Vercel Analytics, log stream, optional Sentry |

---

## 🔐 Security Principles

- Never commit `.env.local` or secrets to source control
- Use `.env` for CI + `.env.production` in cloud runners
- API keys injected via Vercel dashboard or runner secrets
- Validate `DEPLOY_ENV` on startup to avoid accidental test runs in prod

---

## 🧪 Testing Integration

- CI ensures schema + export conformance
- Developers run tests locally with `pnpm test`
- Coverage tracked in `vitest.config.ts` and gated via CI

---

## ✅ Contributor Guidelines

- When adding a new deployment method (e.g. ECS), create a new `*.md` in this folder
- Update this README index to reflect available environments
- Test changes in `staging` before `production`
- Log all errors and startup events using the shared logger (`lib/logger.ts`)

---

This folder defines the full deployment lifecycle of ReasonOps — from local CLI to cloud-scale evaluation infrastructure.

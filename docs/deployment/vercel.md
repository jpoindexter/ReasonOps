# ▲ ReasonOps Vercel Deployment Guide

This document provides a production-ready deployment strategy for ReasonOps using Vercel. Vercel is the recommended platform for fast CI/CD integration, zero-config scaling, and instant preview environments.

---

## 🧠 Why Vercel?

ReasonOps uses Vercel to:

- Auto-deploy on every push to `main` or PR branch
- Manage staging and production environments
- Securely inject secrets and environment variables
- Enable global CDN delivery for frontend

---

## 🚀 Setup Steps

1. Go to [https://vercel.com](https://vercel.com)
2. Import your GitHub project:
   - Select the ReasonOps repository
   - Set framework to **Next.js**
3. Add environment variables (see [`env.md`](./env.md))
   - `NEXT_PUBLIC_SUPABASE_URL`
   - `NEXT_PUBLIC_SUPABASE_ANON_KEY`
   - `OPENAI_API_KEY`, `CLAUDE_API_KEY` (if using model inference)
   - `DEPLOY_ENV=production` or `staging`
4. Deploy to Production or create Preview Deployment

---

## 📦 Branch Configuration

| Branch                   | Vercel Behavior         |
| ------------------------ | ----------------------- |
| `main`                   | Deploys to production   |
| `staging/*`, PR branches | Deploys to Preview URLs |

> Protect `main` with required PR checks from GitHub Actions (`test.yml`).

---

## 🔁 Environments in Vercel

| Environment   | Use Case                     |
| ------------- | ---------------------------- |
| `Production`  | Live app (main branch)       |
| `Preview`     | Feature branches, PR testing |
| `Development` | Local only (`pnpm dev`)      |

Set environment variable scope appropriately in Vercel dashboard.

---

## 🧪 CI Integration

CI workflows run automatically:

- On push to `main` or PR
- Includes linting, testing, type-check, and coverage enforcement
- Failing CI blocks deploy (recommended)

See: [`cicd.md`](./cicd.md)

---

## 🔐 Secrets and Env Vars

- Inject all runtime secrets via Vercel’s dashboard (`Settings → Environment Variables`)
- Never commit `.env.*` to Git
- Do not expose private keys using `NEXT_PUBLIC_*`
- Rotate keys using Vercel Secrets Manager or manual entry

---

## 📂 Build & Logs

| Action              | Location                       |
| ------------------- | ------------------------------ |
| Build logs          | Vercel dashboard → Deploys tab |
| Runtime errors      | Vercel + `/lib/logger.ts`      |
| Static asset status | `/_next/static/` in deployment |

---

## 📄 Contributor Notes

- Always test Preview Deployments before merging to `main`
- If modifying schema or LLM logic, verify tasks can be completed post-deploy
- Monitor Vercel logs for export timeout or API failures
- All branches should be prefixed (`feature/`, `bugfix/`, `staging/`) for clarity

---

Vercel ensures ReasonOps remains fast, safe, and production-stable with every commit.

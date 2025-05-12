# 🔐 ReasonOps Secrets Management

This document outlines best practices for managing API keys, authentication tokens, and environment secrets across local, staging, and production environments in ReasonOps.

---

## 🧠 Purpose

Secrets management ensures:

- API keys and tokens are never exposed or leaked
- Configuration is environment-specific and auditable
- CI/CD and local environments remain secure and reproducible
- Roles and keys can be rotated without full deploy resets

---

## 📦 Secrets Types

| Key Type        | Example Keys                                            |
| --------------- | ------------------------------------------------------- |
| Public API Key  | `NEXT_PUBLIC_SUPABASE_ANON_KEY` (safe for frontend use) |
| Private API Key | `OPENAI_API_KEY`, `CLAUDE_API_KEY`                      |
| System Token    | `SUPABASE_SERVICE_ROLE_KEY` (do not expose)             |
| Internal Hash   | `SIGNING_SECRET`, `EMBEDDING_KEY` (if applicable)       |

---

## 📁 File & Storage Strategy

| File              | Description                              |
| ----------------- | ---------------------------------------- |
| `.env.local`      | Local development only (Git-ignored)     |
| `.env.production` | Optional local prod build; not committed |
| `.env.test`       | Test fixture keys; used in CI            |
| Vercel Dashboard  | Staging + Production runtime values      |
| GitHub Secrets    | Used for GitHub Actions workflows (CI)   |

---

## 🔒 Rules and Safeguards

| Policy                               | Enforced?                      |
| ------------------------------------ | ------------------------------ |
| No secrets in Git commits            | ✅ `.env.*` is in `.gitignore` |
| No secrets in browser logs           | ✅ Keys validated server-side  |
| Private keys prefixed `process.env`  | ✅ Required                    |
| `NEXT_PUBLIC_` for frontend only     | ✅ Never expose private keys   |
| All secrets must be runtime-injected | ✅ via Vercel, .env, or GitHub |

---

## 🔁 Key Rotation Policy

| When to Rotate           | Action                                                  |
| ------------------------ | ------------------------------------------------------- |
| On team change           | Replace OpenAI/Claude/Supabase keys in Vercel/GitHub    |
| After suspected breach   | Rotate affected keys immediately; invalidate old tokens |
| On permission change     | Re-issue service keys in Supabase/Auth provider         |
| Every 90 days (optional) | Rotate high-privilege backend tokens                    |

Document rotation via commit note or Slack/Linear changelog.

---

## 🛠 CI/CD & Secrets

| Context         | Storage                                    |
| --------------- | ------------------------------------------ |
| GitHub Actions  | Use `Settings → Secrets` (per repo or org) |
| Vercel Deploys  | Add secrets per environment scope          |
| Local test runs | Use `.env.test` (never committed)          |

Ensure all CI/CD jobs use only runtime-injected keys.

---

## ✅ Contributor Checklist

Before pushing or deploying:

- [ ] Have you removed any plaintext API keys or tokens?
- [ ] Is your `.env.local` file Git-ignored?
- [ ] Are all keys loaded from `process.env`?
- [ ] Have you verified keys in the Vercel/GitHub dashboard?

---

This guide defines the security posture and secret-handling policy for ReasonOps — protecting both evaluation integrity and external integrations.

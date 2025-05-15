# 🔐 ReasonOps Environment Variable Reference

This document defines all required and optional environment variables for ReasonOps across development, staging, and production environments. These variables control API access, authentication, model invocation, and telemetry behavior.

---

## 📦 File Locations

| File            | Purpose                             |
| --------------- | ----------------------------------- |
| `.env.local`    | Local development (never committed) |
| `.env` (Vercel) | Production and preview deployments  |
| `.env.test`     | Used during CI tests (optional)     |

---

## 🔑 Environment Variable Index

| Variable                        | Required | Description                                          |
| ------------------------------- | -------- | ---------------------------------------------------- |
| `NEXT_PUBLIC_SUPABASE_URL`      | ✅       | Supabase project base URL                            |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | ✅       | Supabase anon/public key for frontend access         |
| `OPENAI_API_KEY`                | ❌       | Used if GPT model is selected                        |
| `CLAUDE_API_KEY`                | ❌       | Used if Claude model is selected                     |
| `OLLAMA_HOST`                   | ❌       | Used for local Ollama completions                    |
| `DEPLOY_ENV`                    | ✅       | `local`, `staging`, or `production`                  |
| `LOG_LEVEL`                     | ❌       | Optional logging verbosity (`debug`, `info`, `warn`) |

---

## 🧪 Example `.env.local`

```env
NEXT_PUBLIC_SUPABASE_URL=https://xyzcompany.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=pk_live_ABC123xyz
OPENAI_API_KEY=sk-abc123...
CLAUDE_API_KEY=live_sk_foobar
OLLAMA_HOST=http://localhost:11434
DEPLOY_ENV=local
LOG_LEVEL=debug
```

> ⚠️ Do not commit `.env.local` or `.env.*` files to version control.

---

## 🚀 Vercel Deployment Setup

In the Vercel dashboard:

1. Go to Project Settings → Environment Variables
2. Add the keys listed above
3. Assign scope to `Production` and `Preview` as needed

---

## 🛡 Secrets Management Rules

| Policy                                         | Enforcement                              |
| ---------------------------------------------- | ---------------------------------------- |
| Never commit API keys to Git                   | ✅ Gitignore enforced                    |
| All secrets injected at runtime                | ✅ Vercel + CI                           |
| Do not expose private keys via `NEXT_PUBLIC_*` | ✅ Use server-only keys where applicable |
| Rotate keys if leaked or compromised           | ✅ CI will fail if key is missing        |

---

## 🧩 Variable Ownership

| Variable       | Owned by     | Notes                                |
| -------------- | ------------ | ------------------------------------ |
| Supabase keys  | Infra/DevOps | Created in Supabase dashboard        |
| OpenAI/Claude  | AI/LLM team  | Tied to usage-based billing          |
| Ollama host    | Local dev    | Optional for local sandboxing        |
| Logging config | Core/Infra   | Debug visibility during dev and test |

---

## 🧠 Contributor Notes

- Always document new required env vars in this file
- Check `.env.example` (if provided) for up-to-date test configuration
- If your code accesses a secret, validate it on server boot
- Use `process.env.VAR` with fallback guards in all critical modules

---

This file is the canonical source of truth for managing ReasonOps environment variables across all environments.

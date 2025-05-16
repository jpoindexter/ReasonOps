---
title: "index"
status: "draft"
---

# 🧪 Local Development Setup

This guide describes how to run ReasonOps locally in a secure, testable, and production-similar environment. It covers environment setup, Supabase emulation, testing, and developer workflow integration.

---

## 🧠 Purpose

Running ReasonOps locally enables:

- Frontend and API development
- Local LLM mock integration
- Schema testing and export validation
- PR test reproduction and feature previews

---

## 📦 Prerequisites

| Tool              | Version            |
| ----------------- | ------------------ |
| Node.js           | >=18.x             |
| pnpm              | >=8.x              |
| Supabase CLI      | >=1.100.0          |
| Ollama (optional) | Local model server |
| Matomo (optional) | Self-hosted        |

---

## 🛠 1. Clone and Install

```bash
git clone https://github.com/YOUR_ORG/reasonops.git
cd reasonops
pnpm install
```

---

## 🔐 2. Setup Environment

Create a `.env.local` file:

```env
NEXT_PUBLIC_SUPABASE_URL=http://localhost:54321
NEXT_PUBLIC_SUPABASE_ANON_KEY=dev-anon-key
OPENAI_API_KEY=sk-abc...
CLAUDE_API_KEY=sk-abc...
DEPLOY_ENV=local
NEXT_PUBLIC_DISABLE_ANALYTICS=false
```

> ⚠️ Do not commit `.env.local` — it is Git-ignored by default.

---

## 🧩 3. Start Supabase (Emulated)

```bash
supabase start
```

This will spin up:

- Postgres database
- Supabase Auth (optional)
- Supabase Studio (http://localhost:54323)

> Optional: run `supabase db reset` to start from scratch

---

## 📦 4. Migrate Schema (If Needed)

If a local migration file is present:

```bash
supabase db push
```

Or generate from SQL:

```bash
supabase db gen types types.ts
```

---

## ▶️ 5. Run ReasonOps

```bash
pnpm dev
```

Visit: [http://localhost:3000](http://localhost:3000)

---

## 🧪 6. Run Tests

```bash
pnpm test
```

Includes:

- Schema validation tests (Zod)
- UI snapshots (Vitest + Testing Library)
- Export format conformance tests

---

## 🔒 Audit & Observability

ReasonOps supports secure, production-grade telemetry in local development environments:

- **Analytics Platform:** Matomo (self-hosted or on-prem)
- **Tracker Implementation:** `shared/lib/analytics.ts`
- **Runtime Type Validation:** All tracked events use Zod schemas for strict shape validation
- **Secure Transmission:** Events are POSTed to `http://localhost:8080/matomo.php` (use HTTPS in prod)
- **Stability Guarantees:** Analytics failures are captured silently, ensuring uninterrupted UX
- **Environment Control:** Analytics can be toggled with a `.env.local` variable

### Verify Local Analytics

1. Start the Matomo container (`docker-compose up -d`)
2. Visit [http://localhost:8080](http://localhost:8080) and check the dashboard
3. Trigger sample events via:

   ```ts
   import { trackEvent } from '@shared/lib/analytics';

   trackEvent({ name: 'Page Viewed', properties: { route: '/dashboard' } });
   ```

### Disable Analytics in Dev

Add the following to `.env.local`:

```env
NEXT_PUBLIC_DISABLE_ANALYTICS=true
```

This disables all outbound telemetry for local testing or privacy isolation.

---

## 📂 Developer Notes

| File                | Role                                |
| ------------------- | ----------------------------------- |
| `lib/llmAdapter.ts` | Plug in your local LLM or mock      |
| `lib/parseSteps.ts` | Tweak logic for parsing completions |
| `schemas/*.ts`      | Zod validators                      |
| `tests/`            | Contract and format snapshots       |

---

## 🚀 Tips

- Use [Ollama](https://ollama.com) for local Claude/GPT alternatives
- Snapshot new schemas using `pnpm test --update`
- Lint and typecheck with `pnpm lint && pnpm typecheck`

---

This guide ensures consistent ReasonOps development across contributors, with environment parity to staging and production.

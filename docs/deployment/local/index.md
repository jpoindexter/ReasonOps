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

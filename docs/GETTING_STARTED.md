---
author: ReasonOps System
created: '2025-05-16T10:33:34.878Z'
links: []
status: draft
tags:
  - reasonops
  - obsidian
  - enterprise
title: GETTING_STARTED
type: doc
updated: '2025-05-16T10:33:34.878Z'
visibility: public
---
# 🚀 Getting Started with ReasonOps
Welcome to the ReasonOps platform — a modular, full-stack system for evaluating and improving LLM-generated reasoning. This guide walks you through cloning, setting up, running, and contributing to the codebase.
---
## 🧠 What is ReasonOps?
ReasonOps is a TypeScript/Next.js platform for:
- Creating reasoning tasks
- Generating LLM completions
- Scoring logic step-by-step using human or AI judgments
- Exporting datasets for RLHF, QA, and audit workflows
For system architecture, see [`docs/ARCHITECTURE.md`](./ARCHITECTURE.md).
---
## 📦 1. Clone the Repo
```bash
git clone https://github.com/YOUR_ORG/reasonops.git
cd reasonops
```
---
## 🛠 2. Install Dependencies
```bash
corepack enable
corepack prepare pnpm@latest --activate
pnpm install
```
- Required: Node ≥ 20.x (see `.nvmrc`)
- Required: `pnpm` — no `npm` or `yarn` allowed
- Lockfile: `pnpm-lock.yaml` must always be committed
---
## 🌐 3. Configure Environment
Create a local `.env.local` file:
```env
NEXT_PUBLIC_SUPABASE_URL=
NEXT_PUBLIC_SUPABASE_ANON_KEY=
OPENAI_API_KEY=
CLAUDE_API_KEY=
```
- Never commit `.env.local` to version control
- Use [`docs/deployment/env.md`](../docs/deployment/env.md) for full variable definitions
---
## ▶️ 4. Run Locally
```bash
pnpm dev
# App runs at http://localhost:3000
```
---
## 🧩 5. Optional: Supabase Setup
1. Visit [supabase.com](https://supabase.com) and create a new project
2. Enable Postgres and optional Auth
3. Retrieve your API keys and paste into `.env.local`
4. Run migrations (if applicable):
   ```bash
   supabase db push
   ```
---
## 🧪 6. Run Tests (CI Requirements)
```bash
pnpm test         # Vitest full suite
pnpm typecheck    # TS coverage
pnpm lint         # ESLint + Prettier enforcement
```
- Minimum coverage: 90% (unit + integration)
- All export output must match schema snapshot
- Test files must exist for:
  - Scoring logic
  - LLM routing
  - Panels + forms
  - Task + judgment APIs
---
## 📁 7. Folder Structure
See also: [`docs/tasklist/setup.md`](../docs/tasklist/setup.md) for full tooling contract.
ReasonOps follows a modular monorepo architecture:
### Frontend
| Folder                        | Description                                |
| ----------------------------- | ------------------------------------------ |
| `frontend/app/`               | App Router pages (task, evaluate, compare) |
| `frontend/components/ui/`     | Design system primitives (buttons, inputs) |
| `frontend/components/panels/` | Task panels, scoring panels                |
| `frontend/components/layout/` | Shell UI, header, sidebar                  |
| `frontend/hooks/`             | Zustand stores, state logic                |
| `frontend/lib/`               | Client-side fetchers and helpers           |
| `frontend/schemas/`           | Zod schemas for task and judgment forms    |
| `frontend/types/`             | Frontend type definitions                  |
### Backend
| Folder                     | Description                               |
| -------------------------- | ----------------------------------------- |
| `backend/api/`             | REST endpoints (task, completion, etc.)   |
| `backend/services/`        | Task and scoring orchestration            |
| `backend/lib/llm/`         | Claude, GPT, Ollama adapters              |
| `backend/lib/scoring/`     | Rubric application and scoring logic      |
| `backend/lib/parsing/`     | Step extraction and normalization         |
| `backend/exporters/jsonl/` | Export routines for dataset generation    |
| `backend/jobs/`            | Queue-based workers (scoring, export)     |
| `backend/guards/`          | Auth/RBAC enforcement                     |
| `backend/analytics/`       | Usage logging, audit events               |
| `backend/schemas/`         | Zod validation per domain (task, step...) |
### Other
| Folder     | Description                            |
| ---------- | -------------------------------------- |
| `scripts/` | CI helpers, dev tooling, generators    |
| `docs/`    | Prompts, schema, architecture, exports |
| `tests/`   | Unit, integration, and fixtures        |
---
## ✅ 8. Tooling & Code Conventions
- ✅ TypeScript + ESM only (TS ≥ 5.x)
- ✅ Tailwind + Prettier + ESLint
- ✅ All schema logic via Zod
- ✅ Imports must use:
  - `@frontend/components/*`
  - `@backend/services/*`
  - `@types/*`
- ❌ Do not use relative `../../lib/...` imports
- ❌ Do not place shared logic outside `frontend/` or `backend/`
- ✅ All code must pass:
  ```bash
  pnpm lint
  pnpm typecheck
  pnpm test
  ```
---
## 📤 9. Exporting Datasets
To generate exportable JSONL:
```bash
curl http://localhost:3000/api/export/tasks/<taskId> > export.jsonl
```
See [`docs/schema/dataset-format.md`](./schema/dataset-format.md) for the export spec.
---
## 🧩 10. Next Steps
- [ ] Explore [`docs/tasklist/index.md`](../docs/tasklist/index.md) for project-level execution
- [ ] Read [`docs/architecture/README.md`](../docs/architecture/README.md)
- [ ] Review [`docs/schema/README.md`](../docs/schema/README.md) and rubric system
- [ ] Deploy frontend with [`docs/deployment/vercel.md`](../docs/deployment/vercel.md)
- [ ] Begin at `frontend/app/task/page.tsx` or `backend/api/task/route.ts`
---
## 🧠 11. PARITY++ Verification (Optional)
To confirm your local ReasonOps instance includes the full reasoning analytics and agent infrastructure, validate that the following are present:
- `backend/metrics/` and `backend/agents/` folders exist
- `ReviewerConsensusService.ts` and `ReviewerInsightsService.ts` exist
- `ThreadsPanel.tsx` renders in UI layer
- `generateTrainJSONL.ts` is wired for export
- `docs/architecture/reasonops-platform-spec.md` is committed
- `docs/tasklist/phase-2-features.md` is up to date
You can automate this with:
```bash
pnpm exec check:parity
```
See also:
- [`docs/tasklist/phase-2-features.md`](../docs/tasklist/phase-2-features.md)
- [`docs/architecture/reasonops-platform-spec.md`](../docs/architecture/reasonops-platform-spec.md)
---
## 🧠 12. Local Model Integration (Ollama)
ReasonOps supports using local LLMs via [Ollama](https://ollama.com) for evaluation agents. These models can power auto-scorers, critique tools, rubric explainers, and more.
### ✅ Recommended Models
| Alias          | Ollama Model ID    | Purpose                             |
| -------------- | ------------------ | ----------------------------------- |
| `fast-score`   | `phi4:latest`      | Quick rubric-based step scoring     |
| `reason-judge` | `llama3.1:latest`  | Full scoring + rubric explanation   |
| `deep-judge`   | `deepseek-r1:14b`  | Longform judgment and critique      |
| `rewrite`      | `codestral:22b`    | Advanced code/chain critique agent  |
| `embedder`     | `nomic-embed-text` | Step similarity, failure clustering |
### ⚙️ Environment Setup
1. Install [Ollama](https://ollama.com) and run:
   ```bash
   ollama list
   ollama run phi4
   ```
2. Add to `.env.local`:
   ```env
   REASONOPS_LLM_ENDPOINT=http://localhost:11434/api/generate
   REASONOPS_LLM_MODEL=phi4
   ```
3. Models will auto-resolve via `AgentExecutionService.ts` using local agents.
See [`docs/models/ollama-model-map.md`](../models/ollama-model-map.md) for full usage.
Welcome aboard 🧠✨  
Let’s build trustworthy AI reasoning systems together.

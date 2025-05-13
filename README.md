![License: Proprietary](https://img.shields.io/badge/license-Proprietary-red)
![Build](https://img.shields.io/badge/build-passing-brightgreen)

# ReasonOps

ReasonOps is a production-grade platform for evaluating and scoring LLM-generated reasoning. Inspired by Scale AI — but focused on logic instead of perception — it enables structured review, scoring, and export of AI completions across tasks, models, and steps.

---

## 🔗 Live Demo

Coming soon — hosted on [Vercel](https://vercel.com)

---

## 🧠 What It Does

- Generate multi-step LLM responses to user-defined tasks
- Score each reasoning step for clarity, coherence, and contradiction
- Compare completions from multiple models
- Export curated data for fine-tuning or analysis (JSONL)
- Build trustable, human-in-the-loop AI evaluation pipelines supporting async jobs, plugin adapters, and audit-grade evaluation

---

## 👥 Contributing

1. Fork the repo
2. Create a feature branch: `git checkout -b feature/my-feature`
3. Commit and push
4. Open a PR

> See `ARCHITECTURE.md` for deeper technical notes.

---

## 🚀 Tech Stack

- **Next.js (App Router)** — frontend runtime
- **Tailwind CSS (v4)** — styling + tokens
- **Zustand** — frontend state management
- **React Hook Form + Zod** — form state + schema validation
- **Ollama / Claude / OpenAI** — LLM adapters via unified backend interface
- **Supabase (optional)** — auth + storage layer
- **Vitest + Testing Library** — unit + integration tests
- **pnpm + turborepo** — monorepo and package orchestration
- **ESLint + Prettier** — code style enforcement
- **Vite** — local dev + test runner

---

## 📬 Contact

Have ideas, issues, or feedback? Reach out:

- GitHub Issues
- Email: jason@yourdomain.com

---

## 📁 Folder Structure

```
frontend/
├── app/                  # Route segments (task, evaluate, compare)
├── components/           # Modular component library
│   ├── layout/           # Shell, header, containers
│   ├── panels/           # Scoring and evaluation views
│   └── ui/               # Primitive components (Button, Input, etc.)
├── hooks/                # Zustand + custom React hooks
├── lib/                  # Fetchers, token helpers, client utils
├── schemas/              # Zod schemas for frontend forms
├── styles/               # Tailwind tokens, theme base
├── types/                # TS types and shared contracts
└── public/               # Static assets

backend/
├── api/                  # HTTP route handlers
├── adapters/             # External service interfaces (S3, Supabase, etc.)
├── analytics/            # Usage logging and telemetry
├── config/               # Runtime environment config
├── events/               # System event dispatchers
├── exporters/            # Output pipelines (e.g. JSONL datasets)
├── guards/               # Middleware / auth conditions
├── handlers/             # Main logic for API coordination
├── jobs/                 # Queue-based background jobs
├── lib/
│   ├── llm/              # GPT, Claude, Ollama model calls
│   ├── metrics/          # Tracing and usage metrics
│   ├── parsing/          # Tokenizers and format parsers
│   └── scoring/          # Step comparison logic
├── schemas/              # Shared Zod validation
└── services/             # Business orchestration logic

docs/
├── api/                  # Endpoint contracts
├── schema/               # Field structure docs (e.g. judgment, completion)
├── architecture/         # Internal system blueprints
├── guides/               # Walkthroughs and usage guidance
├── prompts/              # Prompt templates and scoring rubrics
├── deployment/           # Environment and infra notes
├── tasklist/             # Roadmaps and priority buckets
└── examples/             # Sample JSON data and flows

scripts/                  # Dev tools and generators
tests/                    # Unit, integration, e2e fixtures
```

## 📊 Observability & Audit

- **Structured logs** for backend step execution and LLM calls
- **Metrics** exported to analytics layer for audit + latency
- **Dataset versioning** for reproducibility
- **Test coverage reports** (Vitest with V8 engine)
- **Task graph diffs** stored with metadata

---

## 🧪 Usage

1. Clone the repo
2. Install dependencies
   ```bash
   pnpm install
   ```
3. Run the dev server
   ```bash
   pnpm dev
   ```
4. Add your LLM API keys to `.env.local`

---

## 📦 Roadmap

- [x] MVP: Task input + LLM completion
- [x] Alpha: Step-based scoring, multi-model comparison
- [ ] Beta: JSONL dataset exports, team scoring dashboards
- [ ] GA: Auth, dataset versioning, enterprise integrations

---

🔒 Licensed under the ReasonOps Proprietary License  
_For inquiries, contact jason@theft.studio_

---

ReasonOps Proprietary License

Copyright © 2024 Jason Poindexter. All rights reserved.

This software is proprietary and confidential. Unauthorized copying, distribution, or modification of this code, via any medium, is strictly prohibited without express written permission from the author.

This repository is licensed under a custom proprietary license. For inquiries, contact jason@theft.studio.

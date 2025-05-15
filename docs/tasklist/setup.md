---
title: Project Setup & Onboarding
description: Full setup, scaffolding, and contributor onboarding process for ReasonOps platform.
sidebar_label: Setup
tags:
  - setup
  - onboarding
  - scaffolding
  - parity++
---

## 🧱 Shell Environment & Cross-Platform Notes

- Recommended shell: `zsh` (macOS), `bash` (Linux), WSL2 (Windows)
- Global node tools (like `tsc`, `pnpm`) must be available in `$PATH`
- Use `.env.local` for local dev secrets — never commit to repo
- Git must be configured with `core.autocrlf=input` on Windows
- VSCode should be used with the following extensions:
  - Prettier – Code formatter
  - ESLint
  - GitLens
  - Tailwind CSS IntelliSense
  - Prisma (if future adapters use Prisma ORM)

---

## 🔁 Contributor Onboarding Checklist

Any new engineer joining this codebase must:

- [ ] Install and use Node ≥ 20.x via `.nvm`
- [ ] Install pnpm globally: `corepack enable` → `corepack prepare pnpm@latest --activate`
- [ ] Clone repo and run `pnpm install` cleanly
- [ ] Confirm `pnpm dev`, `pnpm test`, and `pnpm lint` all pass
- [ ] Enable VSCode workspace settings (`.vscode/settings.json`)
- [ ] Run `pnpm run scaffold` and verify path-aliased output
- [ ] Commit with `feat:`/`chore:`/`fix:`/`docs:` prefixes for semantic versioning

All setup tasks must pass before granting commit access to `main`.

---

## 🧪 Local Test Sandbox (Optional)

To test full stack without LLM API keys:

- [ ] Use `scripts/dev-seed.ts` to create test tasks + completions
- [ ] Mock Claude/GPT responses with `tests/fixtures/llm/`
- [ ] Validate `scoreStep()` output in test runner
- [ ] Run local JSONL export and open with `jq`

---

## 📦 Minimal Local Dev Confirmations

```bash
pnpm dev
# http://localhost:3000/evaluate
# http://localhost:3000/compare
# http://localhost:3000/task
```

---

## ✅ PARITY++ Scaffold Verification

These directories and files should exist after running the full setup script (`fix-folder-structure.sh`):

### Metric Infrastructure

- `backend/metrics/computeReviewerMetrics.ts`
- `backend/metrics/reviewerDriftIndex.ts`
- `backend/metrics/rubricUsageHeatmap.ts`
- `backend/metrics/reviewerEntropy.ts`

### Agent & AI Components

- `backend/agents/AutoEvaluatorAgent.ts`
- `backend/agents/CritiqueRewriteAgent.ts`
- `backend/agents/RubricExplainerAgent.ts`
- `backend/services/AgentExecutionService.ts`

### Reviewer Intelligence

- `backend/services/ReviewerInsightsService.ts`
- `backend/services/ReviewerConsensusService.ts`

### Frontend UI Support

- `frontend/components/review/ThreadsPanel.tsx`
- `frontend/components/review/ConsensusBadge.tsx`

### Training Export Support

- `backend/exporters/finetune/generateTrainJSONL.ts`
- `backend/exporters/finetune/taskCompletionJoin.ts`
- `backend/exporters/finetune/stepJudgmentJoin.ts`

Ensure these files exist to verify that the platform's scaffolding is ready for advanced metrics, AI agents, and reasoning intelligence.

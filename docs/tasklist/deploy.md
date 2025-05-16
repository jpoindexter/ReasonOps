---
title: "deploy"
status: "draft"
---

# 🚀 Deployment Checklist (Enterprise-Grade)

This document defines the production-grade deployment and release process for ReasonOps. It ensures consistent infrastructure, auditability, and a clean MVP launch standard.

---

## ✅ 1. CI/CD + Verification

- [ ] GitHub Actions configured for:
  - [ ] `pnpm lint` — enforce Prettier + ESLint rules
  - [ ] `pnpm typecheck` — ensure `tsconfig.json` coverage
  - [ ] `pnpm test` — run Vitest test suite
  - [ ] Coverage threshold enforced (≥90%)
  - [ ] Export schema snapshot validator (JSONL structure)
- [ ] All CI must pass before `main` merges
- [ ] Commit status badges included in root `README.md`

---

## 🧩 2. Deployment Targets

### Vercel (Frontend)

- [ ] App connected to GitHub repo
- [ ] Environment variables for Supabase + LLM API set
- [ ] Enable preview deployments on PRs
- [ ] Production domain assigned and locked

### Supabase (Backend Data)

- [ ] Supabase project created with Postgres + RLS enabled
- [ ] Tables: `tasks`, `steps`, `completions`, `judgments`, `exports`
- [ ] SQL migration script version-controlled
- [ ] API key permissions restricted to ReasonOps scopes

---

## 📦 3. Production Readiness

- [ ] All `console.log` and unstructured logs removed or replaced with `logger.ts`
- [ ] `.env.production` file committed with template keys
- [ ] All required `.env` variables documented in `/docs/deployment/env.md`
- [ ] `pnpm build` and `pnpm export` succeed cleanly
- [ ] Scoring services return consistent, auditable JSON
- [ ] Dataset output validated against schema

---

## 🔍 4. Post-Launch Monitoring

- [ ] Healthcheck route `/api/health` returns status 200
- [ ] Error logs forwarded to `logs/terminal.log` or remote sink
- [ ] Model failures or export mismatches emit `event: error`
- [ ] Events: `task.created`, `score.submitted`, `export.generated`
- [ ] Analytics: daily user activity, top models, most flagged steps

---

## 🔄 5. Versioning + Release Tags

- [ ] Every major deploy must be tagged (`v1.1.0`, `v1.2.0`, etc.)
- [ ] `CHANGELOG.md` entry created for each tagged version
- [ ] Include:
  - [ ] Features added
  - [ ] Scoring schema changes
  - [ ] Prompt changes
  - [ ] Export format diffs

---

## 📚 6. Documentation Links

- [ ] `README.md` with status badge, `pnpm install`, `pnpm dev` steps
- [ ] `/docs/GETTING_STARTED.md` with full setup + API walkthrough
- [ ] `/docs/deployment/vercel.md` and `supabase.md` with cloud config
- [ ] `/docs/prompts/README.md` with current scoring rubric

---

## ✅ PARITY++ Deployment Validation

- [ ] `backend/metrics/` directory is deployed with all analysis modules
- [ ] `backend/agents/` available and registered in `AgentExecutionService.ts`
- [ ] `ReviewerInsightsService.ts`, `RubricAnalysisService.ts`, and `ReviewerConsensusService.ts` are live
- [ ] Finetune exports (`generateTrainJSONL.ts`, `stepJudgmentJoin.ts`) are reachable from API
- [ ] Reviewer-facing components (`ThreadsPanel.tsx`, `ConsensusBadge.tsx`) render in staging
- [ ] All metric exports are snapshot-validated in CI
- [ ] Drift and entropy scores logged in event system
- [ ] Platform spec (`reasonops-platform-spec.md`) included in release tag

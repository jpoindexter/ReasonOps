# 🗺 ReasonOps Production Roadmap (v1+)

This roadmap defines the phased execution path for ReasonOps as a production-grade, reasoning evaluation platform. It includes core logic, UI scaffolding, export integrity, scoring, prompt versioning, reviewer analytics, and dataset delivery.

---

## ✅ Phase 1: MVP Core System (✅ Complete)

| Area     | Feature                                                                |
| -------- | ---------------------------------------------------------------------- |
| Schema   | Zod models for Task, Completion, Step, Judgment                        |
| Frontend | TaskForm, StepScoringPanel, layout shell                               |
| Backend  | `scoreStep.ts`, `parseCompletion.ts`, LLM adapters                     |
| Storage  | Supabase w/ RLS + prompt/judgment versioning                           |
| Export   | `generateDataset.ts` + JSONL v1.0.0                                    |
| Examples | `task.json`, `completion.json`, `steps.json`, `judgment.json`          |
| Docs     | Full production suite in `docs/`, including schema, tasklist, security |

---

## 🚧 Phase 2: Tooling + Developer Experience

| Area        | Feature                                               |
| ----------- | ----------------------------------------------------- |
| Test Infra  | Vitest + coverage + CI enforcement (≥ 90%)            |
| Lint/Types  | ESLint + Prettier + strict tsconfig                   |
| Dev Seeds   | Dev seeding scripts using JSON fixtures               |
| Snapshots   | CI export snapshot diff + validation checks           |
| Scaffolders | `scripts/scaffold.ts` for new routes, panels, schemas |
| CI Pipeline | Typecheck, lint, export verify, auth token checks     |
| ENV         | Hardened `.env.local` + CI secret enforcement         |

---

## 🧠 Phase 3: Evaluation Logic Expansion

| Area             | Feature                                                           |
| ---------------- | ----------------------------------------------------------------- |
| AI Scoring       | Claude / GPT-based auto-judging + `model` + `rubricVersion` trace |
| Multi-Model Eval | Compare completions from different agents (Claude vs GPT)         |
| Critique Mode    | Structured rewrites + reasoning step critique scoring             |
| Prompt Registry  | Prompt versioning + rubric enforcement (`promptVersion`)          |
| Reviewer Logs    | Judgment streaks, latency, confidence distribution                |
| Step Types       | Step classification (reasoning vs assertion vs hallucination)     |

---

## 📦 Phase 4: Production-Level App Features

| Area            | Feature                                                           |
| --------------- | ----------------------------------------------------------------- |
| Auth & RBAC     | Reviewer/admin scoped tokens + Supabase user access controls      |
| Project Mode    | Multi-project support, scoped export + UI filtering               |
| Export Manager  | Download center with signed URLs + version metadata               |
| UI Layering     | Status chips, scoring badges, completion version drill-down       |
| Error Handling  | Full toast feedback, edge case validation, step mismatch handlers |
| Audit Logging   | Judgment + scoring metadata captured (IP, timestamp, rubric hash) |
| Background Jobs | Cron-based scoring + export previews (worker-mode)                |

---

## 🔌 Phase 5: Ecosystem + Open Source

| Area               | Feature                                                         |
| ------------------ | --------------------------------------------------------------- |
| OSS Mode           | Public split of schema, scoring lib, export utils               |
| Plugin Adapter API | Drop-in scoring adapters for models or formats                  |
| Dataset SDK        | NPM package to consume JSONL + schemas programmatically         |
| Docs Portal        | Live schema + prompt explorer + route tester                    |
| Bridge Mode        | Export to ClearOps, FineTuneOps, or external LLM eval platforms |
| Governance Layer   | Version freeze, rubric tagging, integrity snapshot hashes       |

---

## 🧭 Long-Term Vision

- Human-LLM scoring blend with traceable justification
- Audit-grade `.jsonl` lineage + CI-diffable datasets
- Rubric evolution tracking and regression monitoring
- HELMeval compatibility
- Third-party prompt + response verifiers
- Zero-leakage benchmark authoring interface

---

## 📑 Roadmap Execution Rules

All completed features must:

- [x] Include Zod schema or contract types
- [x] Pass lint, typecheck, and test coverage
- [x] Be exportable via `generateDataset.ts`
- [x] Be documented in `docs/`
- [x] Maintain JSONL audit structure
- [x] Use semantic commits + changelog entries

For architectural structure, see [`docs/architecture/`](./architecture/).

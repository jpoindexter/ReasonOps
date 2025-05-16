---
author: ReasonOps System
created: '2025-05-16T10:33:34.894Z'
links: []
status: draft
tags:
  - reasonops
  - obsidian
  - enterprise
title: index
type: doc
updated: '2025-05-16T10:33:34.894Z'
visibility: public
---
# 🧱 ReasonOps Architecture Overview
This directory defines the architectural foundation of ReasonOps — a production-grade platform for evaluating LLM-generated reasoning.
It provides deep technical structure for how tasks, completions, steps, scoring, exporting, and extensibility systems are modularized and orchestrated.
---
## 🧠 Platform Goals
- Step-level reasoning evaluation for LLM outputs
- Hybrid support for human and automated scoring
- Immutable, schema-driven scoring chain
- JSONL export for RLHF, QA, and alignment tuning
- Plugin-based LLM adapters and extensibility surface
---
## 📦 Architecture Modules
| File                                     | Description                                          |
| ---------------------------------------- | ---------------------------------------------------- |
| [`evaluation.md`](./evaluation.md)       | Core pipeline: completion → step → score → export    |
| [`adapters.md`](./adapters.md)           | LLM router strategy (Claude, GPT, Ollama)            |
| [`export.md`](./export.md)               | Dataset pipeline, schema enforcement, snapshot rules |
| [`extensibility.md`](./extensibility.md) | Plugin architecture for scorers/parsers/exporters    |
| [`versioning.md`](./versioning.md)       | Immutable write-once design and schema evolution     |
---
## ⚙️ System Components
| Component              | Role                                                 |
| ---------------------- | ---------------------------------------------------- |
| `Task`                 | Stores prompt and model reference                    |
| `Completion`           | LLM response linked to a Task                        |
| `Step`                 | Parsed reasoning chunks                              |
| `Judgment`             | Score per Step (`clear`, `unclear`, `contradictory`) |
| `Exporter`             | JSONL generation from fully judged chains            |
| `LLMAdapter`           | Claude/GPT/Ollama dispatcher                         |
| `StepScoringPanel.tsx` | UI logic for judgment submission                     |
| `storeJudgment.ts`     | Scoring pipeline + schema validation                 |
---
## 🔁 Data Flow (Core)
```
[Task]
  ↓
[LLMAdapter → Completion]
  ↓
[Step Parser]
  ↓
[Scoring Panel → Judgment]
  ↓
[Exporter → JSONL]
```
---
## 📚 Related Systems
- [`/docs/schema/`](../schema/README.md) — all schema types + examples
- [`/docs/api/`](../api/README.md) — API routes for task creation, scoring, and export
- [`/docs/PROMPT_GUIDE.md`](../PROMPT_GUIDE.md) — prompt formats for completions and scoring
- [`/docs/DEPLOYMENT.md`](../DEPLOYMENT.md) — hosting, secrets, Vercel/Supabase integration
---
## 🗂 Monorepo Structure
ReasonOps is structured as a modular monorepo with clear domain separation. This supports testability, scalability, and contributor ownership across a unified codebase.
### Root Modules
| Folder      | Purpose                                         |
| ----------- | ----------------------------------------------- |
| `frontend/` | App Router UI, scoring panels, forms, schema    |
| `backend/`  | Scoring engine, API routes, LLM adapters        |
| `docs/`     | Schema specs, deployment, architecture, prompts |
| `scripts/`  | Local scaffolding, CI tools                     |
| `tests/`    | Unit + integration testing, fixtures            |
### Backend Substructure
| Subfolder          | Description                               |
| ------------------ | ----------------------------------------- |
| `api/`             | HTTP endpoints per domain                 |
| `services/`        | Orchestration of scoring and task logic   |
| `lib/llm/`         | Claude/GPT/Ollama model bindings          |
| `lib/scoring/`     | Step scoring, comparison, rubric logic    |
| `lib/parsing/`     | Step extraction from LLM completions      |
| `exporters/jsonl/` | Audit-safe export formatting              |
| `guards/`          | Auth enforcement (e.g., reviewer role)    |
| `jobs/`            | Async queues for scoring + export         |
| `analytics/`       | Metrics, usage logs, performance tracking |
### Frontend Substructure
| Subfolder            | Description                              |
| -------------------- | ---------------------------------------- |
| `components/ui/`     | Design system primitives (Button, Input) |
| `components/layout/` | Shell, sidebar, header                   |
| `components/panels/` | Task list, scoring panel, export UI      |
| `hooks/`             | Client state + fetch logic               |
| `schemas/`           | Zod validation for task/judgment forms   |
---
## ✅ Contributor Guidelines
- All new components must be schema-valid and audit-safe
- Updates to architecture docs should reflect new extensibility paths
- Keep all export logic and scoring behavior consistent with:
  - `versioning.md`
  - `dataset-format.md`
---
This folder contains the strategic scaffolding for ReasonOps to scale across models, teams, and evaluation workloads.

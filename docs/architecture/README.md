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

## ✅ Contributor Guidelines

- All new components must be schema-valid and audit-safe
- Updates to architecture docs should reflect new extensibility paths
- Keep all export logic and scoring behavior consistent with:
  - `versioning.md`
  - `dataset-format.md`

---

This folder contains the strategic scaffolding for ReasonOps to scale across models, teams, and evaluation workloads.

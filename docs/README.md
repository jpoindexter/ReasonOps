# 🧱 ReasonOps Schema System Overview

This document provides a structured index of the full ReasonOps schema system — which defines all data entities, evaluation flows, and validation logic used throughout the platform.

---

## 🧠 Purpose

The schema system governs:

- Task creation and version control
- LLM response handling and step parsing
- Step-level scoring by human or AI judges
- Data integrity and audit enforcement
- JSONL export pipeline for model fine-tuning or QA

All schemas are implemented in Zod (`/schemas/*.ts`) and documented in this folder.

---

## 📦 Core Data Modules

| Entity                                 | Description                                               |
| -------------------------------------- | --------------------------------------------------------- |
| [`task/`](./task/model.md)             | Defines the prompt, model, and metadata for an evaluation |
| [`completion/`](./completion/model.md) | Represents raw model output linked to a Task              |
| [`step/`](./step/model.md)             | One logical segment of reasoning from a Completion        |
| [`judgment/`](./judgment/model.md)     | A score/comment assigned to a Step                        |

Each folder contains:

- `model.md` — schema definition + Zod + type comments
- `usage.md` — where and how it's used in ReasonOps
- `examples.md` — production-grade JSON payloads
- `scoring.md` — scoring rubric (where applicable)

---

## 🔄 Entity Relationships

```
Task (1) ──▶ (M) Completion
Completion (1) ──▶ (M) Step
Step (1) ──▶ (0..1) Judgment
```

See [`relationships.md`](./relationships.md) for foreign key details and referential rules.

---

## 🧩 Scoring & Evaluation

- [`step/scoring.md`](./step/scoring.md) — clarity/contradiction rubric
- [`judgment/scoring.md`](./judgment/scoring.md) — LLM vs human scoring logic
- [`audit.md`](./audit.md) — review provenance and immutability enforcement

---

## 📤 Dataset & Export Schema

- [`dataset-format.md`](./dataset-format.md) — defines the JSONL export structure
- Supports RLHF, QA, and evaluation benchmarks

---

## 🔢 Versioning Rules

- [`versioning.md`](./versioning.md) — defines schema change management, export versioning, and fork logic

---

## ✅ Usage Conventions

- All types validated using Zod + runtime guards
- `metadata` is allowed on all entities for traceability
- All schemas are write-once and versioned where required
- Export shape is locked by format version

---

## 🧪 Contributor Responsibilities

- Update `model.md` and Zod when changing schema logic
- Patch `examples.md` to reflect new or removed fields
- Never break backward compatibility in `export` schema without bumping `formatVersion`
- Use this folder as the single source of truth for reasoning data structures

---

This index is the starting point for all ReasonOps schema extensions and integrations.

# 🧱 ReasonOps Schema System Overview

This document provides a structured index of the ReasonOps schema system — defining all data entities, evaluation flows, and validation logic across the platform.

---

## 🧠 Purpose

The schema system governs:

- Task creation and version control
- LLM response handling and step parsing
- Step-level scoring by human or AI judges
- Audit enforcement and traceability
- JSONL dataset export for fine-tuning, QA, and research

All schemas are implemented using [Zod](https://zod.dev/) and enforced across the API, database, and UI.

---

## 🧩 Core Data Modules

| Module      | Purpose |
|-------------|---------|
| [`task/`](./task/model.md) | Defines prompts to be evaluated by LLMs |
| [`completion/`](./completion/model.md) | Captures raw model output tied to a Task |
| [`step/`](./step/model.md) | Logical segments extracted from a Completion |
| [`judgment/`](./judgment/model.md) | Evaluation of Step quality (score, comment, confidence) |

Each module contains:
- `model.md` — Schema definition with Zod + type comments
- `usage.md` — Functional role across the ReasonOps platform
- `examples.md` — Realistic, production-ready JSON examples
- `scoring.md` — (where applicable) evaluation rubric logic

---

## 🔁 Entity Relationships

```text
Task (1) ──▶ (M) Completion
Completion (1) ──▶ (M) Step
Step (1) ──▶ (0..1) Judgment
```

See [`relationships.md`](./relationships.md) for foreign key rules and export dependencies.

---

## 🧪 Scoring & Evaluation Docs

- [`step/scoring.md`](./step/scoring.md) — defines step-level rubric (clarity, contradiction, etc.)
- [`judgment/scoring.md`](./judgment/scoring.md) — defines scoring behavior for human/AI agents
- [`audit.md`](./audit.md) — immutability and review traceability guarantees

---

## 📤 Dataset Export & Versioning

- [`dataset-format.md`](./dataset-format.md) — defines the JSONL export format for ReasonOps evaluations
- [`versioning.md`](./versioning.md) — schema and data change management across systems

---

## ✅ Schema Conventions

- All types use Zod + runtime validation
- All schema entities support `metadata?: Record<string, unknown>`
- All scoring data is write-once and append-only
- Export schemas are locked to format version and must not change silently

---

## 🛠 Contributor Checklist

Before merging schema-related changes:
- [ ] Update `model.md` with updated fields or enum values
- [ ] Add or adjust `examples.md` with real data
- [ ] Reflect schema contract shifts in `versioning.md`
- [ ] Ensure exports still match `/dataset-format.md`

Use this directory as the single source of truth for all ReasonOps schema logic and validation structure.
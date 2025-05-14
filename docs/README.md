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

| Module                                 | Purpose                                                 |
| -------------------------------------- | ------------------------------------------------------- |
| [`task/`](./task/model.md)             | Defines prompts to be evaluated by LLMs                 |
| [`completion/`](./completion/model.md) | Captures raw model output tied to a Task                |
| [`step/`](./step/model.md)             | Logical segments extracted from a Completion            |
| [`judgment/`](./judgment/model.md)     | Evaluation of Step quality (score, comment, confidence) |

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

---

## 🧠 PARITY++ Platform Schema Extensions

In addition to the core ReasonOps schema modules, the following files capture platform-wide reasoning intelligence, evaluation metrics, and extensibility layers:

### 📊 Metrics & Scoring Analytics

- [`../metrics/reviewer-metrics-spec.md`](../metrics/reviewer-metrics-spec.md) — Defines reviewer accuracy, agreement, drift, and scoring entropy
- [`../metrics/strategic-metrics.md`](../metrics/strategic-metrics.md) — Tracks rubric trends, model deltas, and evaluation reliability at org scale

### 🧩 Feature Roadmaps & Platform Scope

- [`../tasklist/phase-2-features.md`](../tasklist/phase-2-features.md) — Future UX layers: threads, consensus scoring, plugin agents, multi-model benchmarking
- [`../architecture/reasonops-platform-spec.md`](../architecture/reasonops-platform-spec.md) — End-to-end ReasonOps architecture: entities, roadmap, roles, AI integrations

These documents define the future-facing shape of ReasonOps beyond MVP — informing metrics dashboards, collaboration tooling, and LLM-integrated evaluations.

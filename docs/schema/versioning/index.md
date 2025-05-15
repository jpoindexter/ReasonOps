# 🗂️ ReasonOps Schema + Data Versioning Guide

This document defines the versioning strategy for the ReasonOps schema and reasoning data pipeline. It ensures immutability, auditability, and compatibility across UI, API, evaluation, and dataset workflows.

---

## 🎯 Versioning Purpose

Versioning allows ReasonOps to:

- Track changes to tasks, prompts, scoring schemas, or completion structure
- Maintain reproducibility across scoring workflows and dataset exports
- Enable iterative improvement without breaking past audit trails
- Safely evolve the schema, UI behavior, and training formats

---

## 🔖 Types of Versioning

| Type                  | What It Tracks                            | Version Field          |
| --------------------- | ----------------------------------------- | ---------------------- |
| Task Version          | Changes to prompt, model, or metadata     | `Task.version`         |
| Export Format Version | Schema and layout of exported JSONL rows  | `formatVersion`        |
| Schema Contract       | Structural changes to Task/Completion/etc | Tracked via Git & docs |

---

## 📘 Task-Level Versioning

Each time a prompt or its config changes (model, metadata, tags), a new Task version should be created:

```ts
// Sample Task version bump
{
  "id": "task_017",
  "version": 2,
  "prompt": "What are the best ways to regulate AI systems?",
  "model": "claude",
  ...
}
```

Do not edit existing Tasks post-evaluation. Clone → update → increment `version`.

---

## 📦 Export Versioning

Every dataset export must include a `formatVersion` header or config. This defines:

- Field ordering
- Field naming
- Whether metadata is included
- Step/judgment flattening format

Current format:

```json
{ "formatVersion": "1.0.0" }
```

---

## 🏗 Schema Versioning Strategy

The ReasonOps schema follows semantic stability:

| Change Type            | Impact       | Action Required                      |
| ---------------------- | ------------ | ------------------------------------ |
| Field added (optional) | Non-breaking | Update docs                          |
| Field required         | Breaking     | Increment schema version, update UI  |
| Enum modified          | Breaking     | Notify consumers, update type checks |
| Field renamed          | Breaking     | Requires migration support           |

All changes must be reflected in:

- Zod schema files (`/schemas/*.ts`)
- Markdown models (`/docs/schema/*/model.md`)
- This file (`versioning.md`)

---

## 📤 Versioning in JSONL Exports

To ensure reproducibility and parsing compatibility:

- Each export must bundle a metadata file or first row with `formatVersion`
- Downstream consumers (e.g., RLHF pipelines) must verify format match
- If breaking changes occur, create `1.1.0`, `2.0.0`, etc. exports with matching folders

---

## 🔐 Immutability Rules

| Entity       | Mutability                      |
| ------------ | ------------------------------- |
| `Task`       | Read-only once reviewed         |
| `Completion` | Read-only after linked to Steps |
| `Step`       | Read-only once Judged           |
| `Judgment`   | Strictly immutable              |

To “update” any of the above, fork a new object with a new `version`.

---

## 🗃️ Future-Proofing

To support multi-version datasets, downstream consumers should:

- Parse JSONL dynamically
- Validate required fields via schema (`TaskSchema`, `JudgmentSchema`, etc.)
- Log unknown fields (but do not fail on them)

---

## 📌 Summary

ReasonOps schema and export versioning ensures:

- Evaluation reproducibility
- Safe schema evolution
- Dataset stability
- Model fine-tuning compatibility

Always bump `version` when user intent or export structure changes.

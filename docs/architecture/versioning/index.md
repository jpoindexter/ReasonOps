---
title: "index"
status: "draft"
---

# 🔢 ReasonOps Architecture Versioning

This document defines the versioning architecture used across the ReasonOps platform — from data schemas and export formats to plugin systems and evaluation logic. Versioning enables backward compatibility, traceable evaluation pipelines, and reproducible dataset generation.

---

## 🧠 Why Versioning Matters

ReasonOps uses versioning to:

- Maintain compatibility across completions, steps, judgments, and exports
- Ensure reproducible scoring and dataset integrity
- Support safe schema evolution and plugin upgrades
- Manage format transitions (e.g. JSONL schema upgrades)
- Support rollback and validation in training workflows

---

## 🧱 Versioned Elements

| System Component  | Versioning Strategy       | Tracked In               |
| ----------------- | ------------------------- | ------------------------ |
| Task              | `version` field per task  | `Task.version`           |
| Export Format     | Semantic version in JSONL | `formatVersion`          |
| Schema Contracts  | Git-tracked + docs        | `/schema/*/model.md`     |
| Plugin Interfaces | Runtime version metadata  | `metadata.pluginVersion` |
| Prompt Templates  | Prompt ID + version       | `/PROMPT_GUIDE.md`       |

---

## 📘 Task Versioning

Each Task has a `version` number that is manually incremented when:

- The `prompt` is changed
- The assigned model is changed
- Metadata values that affect response generation change

> Once a Task has been scored, do not modify it. Instead, fork a new Task and increment `version`.

---

## 📦 Export Format Versioning

JSONL exports must include:

```json
{ "formatVersion": "1.0.0" }
```

Breaking changes to field names, nesting, or required keys trigger a bump to `1.1.0`, `2.0.0`, etc.

See [`dataset-format.md`](../schema/dataset-format.md) for the current schema.

---

## 🛡 Schema Evolution

| Change Type        | Breaking? | Action Required                               |
| ------------------ | --------- | --------------------------------------------- |
| Add optional field | ❌        | Update examples/docs                          |
| Remove field       | ✅        | Update versioning.md + dataset-format.md      |
| Rename field       | ✅        | Update schemas + docs + test snapshots        |
| Add enum value     | ✅        | Update guards + validators                    |
| Reorder fields     | ❌        | JSONL order is not guaranteed unless enforced |

---

## 🧩 Plugin Versioning

Each plugin used for scoring, exporting, or parsing must:

- Register a version (e.g. `scorer-claude@1.0.2`)
- Output version metadata in any generated result
- Be traceable via its config in `metadata.pluginVersion`

This enables long-term reproducibility for datasets and fine-tuning pipelines.

---

## 🧠 Prompt Versioning

Prompt templates must:

- Include a `version` tag in comments or metadata
- Be registered in [`/PROMPT_GUIDE.md`](../PROMPT_GUIDE.md)
- Use semantic versioning if shared between tasks or agents

---

## ✅ Contributor Guidelines

- Any schema change must be reflected in:
  - `model.md`
  - `examples.md`
  - `versioning.md`
  - `dataset-format.md` (if it affects export)
- Plugin or prompt updates must be backward-compatible or include a version bump
- Document all version bumps in pull request descriptions

---

This file defines the canonical versioning policy for the ReasonOps architecture system.

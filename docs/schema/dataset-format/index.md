---
author: ReasonOps System
created: '2025-05-16T10:33:34.984Z'
links: []
status: draft
tags:
  - reasonops
  - obsidian
  - enterprise
title: index
type: doc
updated: '2025-05-16T10:33:34.984Z'
visibility: public
---
# 📦 ReasonOps Dataset Format (JSONL)
This document defines the canonical export format for ReasonOps evaluation datasets. Exported files are used for fine-tuning, RLHF pipelines, performance benchmarks, alignment experiments, and QA audits.
All exported files follow the **JSON Lines (JSONL)** format — one JSON object per line, newline-separated.
---
## 🧠 Purpose
- Enable structured export of evaluated LLM completions
- Power automated fine-tuning and scoring pipelines
- Support open dataset sharing or internal compliance reviews
---
## 🔍 Format Overview
Each exported object represents a complete evaluation record of one Task and its associated completions and scored steps.
| Field           | Type                | Description                             |
| --------------- | ------------------- | --------------------------------------- |
| `task_id`       | `string`            | ID of the evaluated Task                |
| `prompt`        | `string`            | The prompt provided by the user         |
| `model`         | `string`            | The model that generated the Completion |
| `completion_id` | `string`            | ID of the model-generated response      |
| `response`      | `string`            | Raw response text from the LLM          |
| `steps`         | `array[StepRecord]` | Array of step+judgment pairs            |
### StepRecord
Each `steps[]` item contains:
| Field        | Type     | Description                                          |
| ------------ | -------- | ---------------------------------------------------- |
| `text`       | `string` | Reasoning step content                               |
| `score`      | `string` | Assigned score (`clear`, `unclear`, `contradictory`) |
| `comment`    | `string` | Optional rationale or explanation                    |
| `confidence` | `number` | Optional score confidence (0.0–1.0)                  |
---
## ✅ Example JSONL Row
```json
{
  "task_id": "task_001",
  "prompt": "Why should cities plant more trees?",
  "model": "claude",
  "completion_id": "completion_001",
  "response": "Trees improve air quality, reduce noise, and enhance urban biodiversity.",
  "steps": [
    {
      "text": "Trees filter pollutants from the air.",
      "score": "clear",
      "comment": "Factually accurate and clearly stated.",
      "confidence": 0.98
    },
    {
      "text": "They reduce noise pollution through canopy buffering.",
      "score": "unclear",
      "comment": "Could be more specific about the mechanism.",
      "confidence": 0.75
    },
    {
      "text": "Trees bring more animals into cities.",
      "score": "contradictory",
      "comment": "This conflicts with the prior step on noise reduction benefits.",
      "confidence": 0.82
    }
  ]
}
```
---
## 🔐 Compliance Notes
- All datasets must be fully anonymized
- No user PII should be stored in `comment`, `metadata`, or task prompt
- Reviewer identities are excluded from exports unless explicitly whitelisted
- `metadata`, `taskGroup`, and `createdBy` fields are retained only for internal traces, not public exports
---
## 📂 Use Cases
| Audience              | Use                                         |
| --------------------- | ------------------------------------------- |
| Fine-tuning pipelines | LLM training on step-labeled completions    |
| Model QA teams        | Compare logic performance across models     |
| Alignment researchers | Track judgment disagreement and consistency |
| Internal evaluation   | Run regression tests across model versions  |
---
## 🔁 Format Versioning
Each export batch includes a `formatVersion` tag in the metadata file.
| Format Version | Description                                                          |
| -------------- | -------------------------------------------------------------------- |
| `1.0.0`        | Initial public version — 1 Task → 1 Completion → N Steps with scores |
All exported files must be compatible with the schema defined here. Updates will be reflected in `versioning.md`.

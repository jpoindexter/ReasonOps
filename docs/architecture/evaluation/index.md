---
author: ReasonOps System
created: '2025-05-16T10:33:34.897Z'
links: []
status: draft
tags:
  - reasonops
  - obsidian
  - enterprise
title: index
type: doc
updated: '2025-05-16T10:33:34.897Z'
visibility: public
---
# 🧠 ReasonOps Evaluation Architecture
This document describes the reasoning evaluation layer in ReasonOps — how AI-generated completions are parsed, scored, and exported as structured, trustable data for fine-tuning and model assessment.
---
## 🎯 Purpose
The evaluation system transforms long-form LLM completions into:
- Discrete reasoning steps (`Step`)
- Step-level scoring judgments (`Judgment`)
- Exportable evidence of logical soundness
It enables both human-in-the-loop and automated evaluation flows.
---
## 🔁 Evaluation Lifecycle
```
[Task]
  ↓
[Completion (LLM output)]
  ↓
[Steps parsed from response]
  ↓
[Each Step scored → Judgment]
```
Each task flows through:
| Phase      | Action                                    |
| ---------- | ----------------------------------------- |
| Completion | A prompt is completed by Claude/GPT       |
| Parsing    | Output segmented into `Step` units        |
| Scoring    | Human or LLM assigns score to each step   |
| Export     | Judged steps are exported in JSONL format |
---
## 🪜 Step Decomposition
Steps are parsed via `/lib/parseSteps.ts` using:
- Sentence/phrase segmentation
- Optional LLM-based chunking (future)
- Ordered indexing (`position`)
All steps are:
- Auditable (linked to `Completion`)
- Immutable (once scored)
- Positionally scoped (`0..n` per `Completion`)
---
## 📝 Scoring Layer
| Object     | Description                                                      |
| ---------- | ---------------------------------------------------------------- |
| `Judgment` | Stores a `score`, `comment`, and `confidence` for a given `Step` |
| Score Enum | `clear`, `unclear`, `contradictory`                              |
| Source     | Human (`userId`) or AI (`createdBy: model:*`)                    |
Scores are submitted via `POST /api/judgment` and validated with `JudgmentSchema`.
---
## 🤖 Human vs LLM Evaluation
| Attribute     | Human              | LLM                                        |
| ------------- | ------------------ | ------------------------------------------ |
| Comment       | Optional           | Structured JSON (`comment` + `confidence`) |
| Traceability  | `createdBy` (user) | `createdBy: model:gpt-4`                   |
| Repeatability | Manual             | Deterministic prompt templates             |
LLM scoring uses [`PROMPT_GUIDE.md`](../../PROMPT_GUIDE.md) to ensure consistency.
---
## 🧾 Export Output
Each scored completion becomes a single JSONL row:
```json
{
  "task_id": "...",
  "completion_id": "...",
  "steps": [
    {
      "text": "...",
      "score": "clear",
      "comment": "..."
    }
  ]
}
```
Format governed by [`dataset-format.md`](../../schema/dataset-format.md).
---
## 🛡 Auditability
- Each `Judgment` includes `createdBy`, `createdAt`
- Steps are write-once once scored
- All scoring is append-only
- Exported judgments must be schema-conformant
---
## 🔧 Internal Tooling
| File/Module            | Role                              |
| ---------------------- | --------------------------------- |
| `StepScoringPanel.tsx` | Renders steps + scoring interface |
| `lib/storeJudgment.ts` | Validates and stores scores       |
| `lib/parseSteps.ts`    | Step tokenizer                    |
| `schemas/step.ts`      | Zod structure enforcement         |
| `schemas/judgment.ts`  | Judgment validation schema        |
| `tests/step.spec.ts`   | Score + step edge case coverage   |
---
## 🔐 Governance & Policy
- All scoring prompts must be versioned
- All human scores must have `createdBy`
- Scores are never updated in place — new `Judgment` required
---
## 📌 Summary
The evaluation system is the core of ReasonOps: turning unstructured AI output into structured, scored, exportable reasoning chains — aligned with human logic and aligned for fine-tuning.

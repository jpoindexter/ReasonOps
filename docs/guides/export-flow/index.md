---
author: ReasonOps System
created: '2025-05-16T10:33:34.957Z'
links: []
status: draft
tags:
  - reasonops
  - obsidian
  - enterprise
title: index
type: doc
updated: '2025-05-16T10:33:34.957Z'
visibility: public
---
# 📤 Export Flow Guide
This document explains the end-to-end reasoning pipeline that powers ReasonOps' dataset generation and export tooling. It shows how a task flows from user input, through model completion, human or LLM scoring, and ultimately into audit-safe dataset outputs.
---
## 🧭 Flow Overview
```
Task → Completion → Step Extraction → Judgment → Export
```
Each stage is captured in Supabase tables, scored and normalized via internal services, and output into versioned `.jsonl` datasets.
---
## 🧱 Step-by-Step Breakdown
### 1. Task Creation
- Created via `POST /api/task`
- Stored in `tasks` table
- Schema: `taskForm.ts`, Zod-validated
### 2. Completion Submission
- LLM (e.g., Claude, GPT) returns raw `response`
- Stored in `completions` table
- Used by `parseCompletion.ts` to tokenize and normalize
### 3. Step Extraction
- Handler: `parseSteps.ts`
- Output: `step[]`, each with `stepId`, `text`, `index`, `taskId`
- Stored in `steps` table
### 4. Judgment (Scoring)
- Route: `POST /api/judgment`
- Form: `judgmentForm.ts`, scored per rubric (`clear`, `unclear`, etc.)
- Stored in `judgments` table with `comment`, `confidence`, `model`
### 5. Export Generation
- Generator: `generateDataset.ts`
- Output format: `.jsonl`
- Includes:
  - `taskId`
  - `prompt`
  - `completionId`
  - `step[]`
  - `judgment[]`
  - `model`
  - `rubricVersion`
- Snapshotted for CI and reproducibility
---
## ✅ Sample Output
See `/docs/examples/` for sample:
- `task.json`
- `completion.json`
- `steps.json`
- `judgment.json`
Each feeds into the final dataset row emitted in:
```
backend/exporters/jsonl/generateDataset.ts
```
---
## 🔐 Integrity & Versioning
- Every dataset row is signed with:
  - `createdAt`
  - `rubricVersion`
  - `model`
  - `stepId`
- Output is stable and audit-ready
- Use `previewExport.ts` to view pre-download output for a task
---
## 📚 Related
- [Scoring Engine](../../backend/lib/scoring/scoreStep.ts)
- [Zod Schemas](../../frontend/schemas/judgmentForm.ts)
- [Export Schema Format](../schema/dataset-format.md)
- [Rubrics](../prompts/)

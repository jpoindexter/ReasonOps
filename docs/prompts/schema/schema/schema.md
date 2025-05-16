---
author: ReasonOps System
created: '2025-05-16T10:33:34.978Z'
links: []
status: draft
tags:
  - reasonops
  - obsidian
  - enterprise
title: scoring
type: doc
updated: '2025-05-16T10:33:34.978Z'
visibility: public
---
# 🧠 Scoring Prompt Guide
This document defines the standardized format, structure, and usage of prompts used to evaluate LLM reasoning steps in ReasonOps. Scoring prompts enable both human and automated systems (e.g., Claude, GPT) to assess reasoning quality in a structured and reproducible format.
---
## 🧠 Purpose
Scoring prompts allow ReasonOps to:
- Evaluate step-level logic using rubric-aligned judgment
- Power LLM-as-judge workflows and hybrid QA systems
- Standardize evaluation across model versions and reviewers
- Create auditable, structured outputs for JSONL exports
---
## ✅ Scoring Rubric Values
| Score           | Description                                                             |
| --------------- | ----------------------------------------------------------------------- |
| `clear`         | Step is logically sound, clearly expressed, and aligned with the prompt |
| `unclear`       | Step is vague, ambiguous, or lacks justification                        |
| `contradictory` | Step introduces logical conflict, invalid reasoning, or factual errors  |
This rubric is universal across human and model reviewers.
---
## 🧾 Prompt Format (Generic)
Used as a base for GPT/Claude scorers and documentation reference:
```txt
You are a reasoning evaluator.
Please evaluate the following reasoning step according to this rubric:
- clear: Reasoning is logically sound and clearly stated.
- unclear: Reasoning is vague, ambiguous, or incomplete.
- contradictory: Reasoning introduces contradiction or error.
Respond in this format:
{
  "score": "clear" | "unclear" | "contradictory",
  "comment": "1–2 sentence rationale for your score",
  "confidence": 0.0–1.0
}
Step:
"[reasoning step text here]"
```
---
## 📦 Output Schema (Expected)
```json
{
  "score": "unclear",
  "comment": "The step is too general and lacks supporting reasoning.",
  "confidence": 0.84
}
```
| Field        | Type     | Required | Description                    |
| ------------ | -------- | -------- | ------------------------------ |
| `score`      | `string` | ✅       | Score value per rubric         |
| `comment`    | `string` | ✅       | Brief justification            |
| `confidence` | `number` | ✅       | Range 0.0–1.0, model certainty |
---
## 🤖 Used In
| Context            | Source                     |
| ------------------ | -------------------------- |
| LLM-as-judge       | Claude, GPT scoring agents |
| Human scorer UI    | StepScoringPanel.tsx       |
| CLI auto-raters    | Future `reasonops score`   |
| QA comparison mode | Judged step snapshots      |
---
## 🧩 Prompt Variants
| Variant             | Use Case                               |
| ------------------- | -------------------------------------- |
| `rubrics-claude.md` | Claude-specific JSON output structure  |
| `rubrics-gpt.md`    | GPT-specific instruction style         |
| `critique.md`       | Used for failure detection and rewrite |
| `comparison.md`     | Multi-model or prompt ranking task     |
All variants should be documented and versioned explicitly.
---
## 🔐 Audit & Metadata
Each scored step must log:
| Field              | Stored In                                |
| ------------------ | ---------------------------------------- |
| `createdBy`        | `Judgment.createdBy` (e.g., model:gpt-4) |
| `promptVersion`    | `Judgment.metadata.promptVersion`        |
| `rawModelOutput`   | `Judgment.metadata.rawModelOutput`       |
| `taskId`, `stepId` | Used in trace logs and audit reports     |
---
## 🧠 Prompt Writing Best Practices
- Enforce strict JSON formatting in LLM prompts
- Avoid ambiguous score descriptions (align to rubric)
- Use temperature ≤ 0.5 for reproducibility
- Validate output with schema before persistence
---
## ✅ Contributor Guidelines
- Add new scoring prompts to this folder and reference in `README.md`
- Include at least 3 test cases when introducing a new prompt version
- Score template changes require a new `promptVersion`
- Use consistent phrasing across all prompt variations
---
This guide ensures all ReasonOps scoring prompts are auditable, testable, and consistent — powering the core reasoning evaluation pipeline.

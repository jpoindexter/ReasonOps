---
author: ReasonOps System
created: '2025-05-16T10:33:34.986Z'
links: []
status: draft
tags:
  - reasonops
  - obsidian
  - enterprise
title: scoring
type: doc
updated: '2025-05-16T10:33:34.986Z'
visibility: public
---
# 📝 Judgment Scoring Guide
This document defines how reasoning `Step`s are evaluated in ReasonOps using the `Judgment` entity. Judgments are assigned by either human reviewers or AI scoring agents to assess the logical quality of individual reasoning steps in a Completion.
---
## 🧠 What Judgments Represent
A `Judgment` reflects an opinion — by a person or an AI — on how clear, valid, or contradictory a reasoning step is. Judgments power:
- AI alignment scoring
- Human-in-the-loop trust evaluation
- Prompt and agent tuning feedback loops
- Dataset curation and model fine-tuning
Each Judgment is stored immutably and includes a score, source, optional explanation, and metadata.
---
## ✅ Scoring Rubric
| Score           | Description                                                             |
| --------------- | ----------------------------------------------------------------------- |
| `clear`         | Step is unambiguous, logically coherent, and well-structured            |
| `unclear`       | Step is vague, confusing, or relies on assumptions not stated           |
| `contradictory` | Step conflicts with earlier steps, logical expectations, or known facts |
---
## 🔄 Scoring Contexts
| Context         | Use Case                                        |
| --------------- | ----------------------------------------------- |
| Human Reviewer  | UX-driven feedback panel with buttons + comment |
| LLM-as-Judge    | Prompt-based JSON scoring response              |
| Agent Scaffolds | Score reuse for structured reasoning traces     |
| Crowdworker QA  | Multi-annotator scoring → consensus model       |
---
## 🧪 Human vs AI Judgment Behavior
| Factor         | Human Score     | AI Score                             |
| -------------- | --------------- | ------------------------------------ |
| Subjectivity   | High            | Low (deterministic by prompt)        |
| Speed          | Slower          | Fast / scalable                      |
| Explainability | Manual comments | Model-generated rationale (optional) |
| Confidence     | Not required    | Recommended (0.0–1.0)                |
---
## 🧷 UI Behavior
- Users see one step at a time with 3 score buttons
- Optional comment field available
- After a score is submitted:
  - Step is marked as scored
  - Judgment is stored and locked
  - Visual confirmation shown
- For LLM scores, results are parsed and rendered directly from JSON
---
## 🗃️ Data Storage
All scores are written to the `Judgment` object with:
- `stepId` (FK to Step)
- `score` (enum value)
- `comment` (optional)
- `confidence` (optional)
- `createdBy` (user ID or model name)
- `createdAt`, `updatedAt`
- `metadata` (LLM version, input params, etc.)
Judgments are **never overwritten**. New scores should be versioned or forked.
---
## 🔐 Contributor Notes
- Always score through the Judgment object — never embed scores on Steps
- When building automated agents, store the confidence and reasoning source
- Extend the rubric **only** with PM/stakeholder sign-off (this affects datasets)
- Store all raw model scoring JSON in `metadata` if available
- Don’t store incomplete Judgments — a Judgment must include a `score`
For full schema, see [`model.md`](./model.md)

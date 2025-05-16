---
author: ReasonOps System
created: '2025-05-16T10:33:34.986Z'
links: []
status: draft
tags:
  - reasonops
  - obsidian
  - enterprise
title: model
type: doc
updated: '2025-05-16T10:33:34.986Z'
visibility: public
---
# 📝 Judgment Model
The `Judgment` entity represents the structured evaluation of a single reasoning `Step`. Judgments allow ReasonOps to score each step in a multi-step LLM completion using human reviewers or automated LLM-based agents.
---
## 🧠 Purpose
Judgments are the authoritative evaluation objects in ReasonOps. Each Judgment stores:
- A discrete score value for a Step (e.g. `clear`, `unclear`, `contradictory`)
- Optional feedback such as comments or a confidence value
- Metadata about who/what issued the evaluation
Judgments are immutable once created — they represent a historical fact used for analysis, fine-tuning, or QA workflows.
---
## 🔡 TypeScript + Zod Schema
```ts
import { z } from "zod";
export const JudgmentSchema = z.object({
  id: z.string(), // Unique identifier (UUID)
  stepId: z.string(), // FK: which Step is being judged
  score: z.enum(["clear", "unclear", "contradictory"]), // Core evaluation value
  comment: z.string().optional(), // Optional reviewer notes
  confidence: z.number().min(0).max(1).optional(), // Optional LLM or human certainty
  createdBy: z.string(), // Reviewer or scoring agent ID
  createdAt: z.string(), // ISO timestamp
  updatedAt: z.string(), // ISO timestamp
  metadata: z.record(z.unknown()).optional(), // Audit or evaluator-specific data
});
export type Judgment = z.infer<typeof JudgmentSchema>;
```
---
## ✅ Required Fields
| Field       | Type     | Description                               |
| ----------- | -------- | ----------------------------------------- |
| `id`        | `string` | Unique ID for the Judgment                |
| `stepId`    | `string` | Foreign key linking to Step               |
| `score`     | `enum`   | Assigned value from scoring rubric        |
| `createdBy` | `string` | User ID, worker name, or model identifier |
| `createdAt` | `string` | ISO timestamp of evaluation               |
| `updatedAt` | `string` | Last write timestamp                      |
---
## 🆗 Optional Fields
| Field        | Type                      | Description                                        |
| ------------ | ------------------------- | -------------------------------------------------- |
| `comment`    | `string`                  | Feedback or explanation for the score              |
| `confidence` | `number`                  | Confidence score (0.0 to 1.0)                      |
| `metadata`   | `Record<string, unknown>` | Tooling-specific trace info, LLM config hash, etc. |
---
## 🔗 Related Models
- **Step**: Each Judgment belongs to exactly one Step
- **Task/Completion**: Judgments indirectly link to these via the Step chain
See: [`/docs/schema/step/model.md`](../step/model.md)
---
## 🔐 Contributor Guidelines
- Each Step must have **at most one** Judgment — duplicate scoring is not supported without versioning
- Do not change `score` or `comment` once created — instead, fork a new Judgment and archive the prior
- For LLM judges, populate `confidence` and include relevant LLM parameters in `metadata`
- Always store reviewer identity (`createdBy`) — for auditability and QA comparisons

---
author: ReasonOps System
created: '2025-05-16T10:33:34.990Z'
links: []
status: draft
tags:
  - reasonops
  - obsidian
  - enterprise
title: model
type: doc
updated: '2025-05-16T10:33:34.990Z'
visibility: public
---
# 🪜 Step Model
The `Step` entity represents a single reasoning unit parsed from a model-generated `Completion`. Steps allow granular evaluation of logic, clarity, and coherence — enabling human or LLM-based scoring of individual reasoning segments.
---
## 🧠 Purpose
Steps enable ReasonOps to:
- Break down model outputs into discrete, reviewable logic blocks
- Assign scoring and feedback to each reasoning element
- Support structured judgment workflows
- Analyze patterns in reasoning quality and fallacy rates
Steps form the connective tissue between Completions and Judgments and are the atomic unit of reasoning review.
---
## 🔡 TypeScript + Zod Schema
```ts
import { z } from "zod";
export const StepSchema = z.object({
  id: z.string(), // Unique identifier (UUID)
  completionId: z.string(), // FK: which Completion this step belongs to
  text: z.string().min(1), // The reasoning step content
  position: z.number().int().nonnegative(), // Step index in completion
  type: z
    .enum(["thought", "justification", "conclusion", "fallback"])
    .optional(), // Optional step classification
  createdAt: z.string(), // ISO timestamp
  updatedAt: z.string(), // ISO timestamp
  metadata: z.record(z.unknown()).optional(), // Arbitrary extension field
});
export type Step = z.infer<typeof StepSchema>;
```
---
## ✅ Required Fields
| Field          | Type     | Description                        |
| -------------- | -------- | ---------------------------------- |
| `id`           | `string` | Unique step ID                     |
| `completionId` | `string` | Link to the parent Completion      |
| `text`         | `string` | The reasoning content of this step |
| `position`     | `number` | Step order within the Completion   |
| `createdAt`    | `string` | Creation timestamp                 |
| `updatedAt`    | `string` | Last modification timestamp        |
---
## 🆗 Optional Fields
| Field      | Type                      | Description                                                                |
| ---------- | ------------------------- | -------------------------------------------------------------------------- |
| `type`     | `enum`                    | Optional step label (`thought`, `justification`, `conclusion`, `fallback`) |
| `metadata` | `Record<string, unknown>` | Flexible structure for trace/debug data, extraction confidence, etc.       |
---
## 🔗 Related Models
- `Completion`: Steps are parsed from a Completion’s raw response
- `Judgment`: Each Step may have a Judgment linked to it for evaluation
See: [`/docs/schema/relationships.md`](../relationships.md)
---
## 🔧 Usage Notes
| Location                           | Role                                                   |
| ---------------------------------- | ------------------------------------------------------ |
| `/lib/parseSteps.ts`               | Logic to extract step text from a Completion           |
| `/components/StepScoringPanel.tsx` | UI component to score individual Steps                 |
| `/app/evaluate/[taskId]`           | Evaluation screen where Steps are displayed and judged |
---
## 🧪 Contributor Guidelines
- Do not reuse `id` values — use UUIDs
- Maintain `position` ordering strictly for UX rendering
- Ensure `text` is sanitized and step boundaries are clear
- Use `type` classification if you want to group steps by reasoning role
- Avoid mutating Steps once Judgments have been attached
See [`judgment/model.md`](../judgment/model.md) for scoring structure.

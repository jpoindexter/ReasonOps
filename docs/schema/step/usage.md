---
author: ReasonOps System
created: '2025-05-16T10:33:34.991Z'
links: []
status: draft
tags:
  - reasonops
  - obsidian
  - enterprise
title: usage
type: doc
updated: '2025-05-16T10:33:34.991Z'
visibility: public
---
# 🪜 Step Usage Guide
This document outlines how `Step` entities are created, parsed, rendered, and used within ReasonOps. Each Step represents a single unit of logic extracted from a model-generated Completion and is the atomic element for scoring and reasoning evaluation.
---
## 🧠 What Is a Step?
A Step is a discrete statement, claim, or logical move made by the LLM in response to a Task. It is derived from a `Completion` and is scored individually for clarity, truthfulness, or logical soundness. Steps enable granular insight into a model’s reasoning quality.
---
## 🔁 Step Lifecycle
| Phase        | Description                                                             |
| ------------ | ----------------------------------------------------------------------- |
| **Parsed**   | Steps are extracted from a Completion, either automatically or manually |
| **Rendered** | Steps are displayed in the UI for scoring                               |
| **Scored**   | Each Step may receive a Judgment (from a human or LLM judge)            |
| **Locked**   | After scoring, Steps are treated as immutable in evaluation pipelines   |
---
## 📍 Where Steps Are Used
| Location                           | Purpose                                                  |
| ---------------------------------- | -------------------------------------------------------- |
| `/lib/parseSteps.ts`               | Function to split raw Completion text into step segments |
| `/components/StepScoringPanel.tsx` | UI component for viewing and scoring individual steps    |
| `/app/evaluate/[taskId]`           | Evaluation interface rendering each Step for judgment    |
| `/schemas/step.ts`                 | Zod schema validation for structure and type-safety      |
---
## 🔗 Related Models
- **Completion**: Steps are derived from Completions
- **Judgment**: Each Step may be scored with a linked Judgment
---
## 🔄 Contribution Guidelines
- Steps should be created **only** in direct relation to a valid `Completion`
- Use `position` field to enforce correct ordering in UI and exports
- Steps should not be mutated after associated Judgments exist
- Steps with `type` ("thought", "justification", etc.) help in structured evaluation flows
---
## 🧪 Example Flow
1. A Completion is created from Claude for the task: “Should we ban cars in cities?”
2. The LLM responds with a long-form paragraph.
3. `parseSteps.ts` extracts three claims:
   - Cars cause pollution
   - Cities benefit from walkability
   - Bans reduce traffic deaths
4. Each is stored as a Step with an index position
5. Steps are shown in the StepScoringPanel for manual or LLM judgment
For schema definitions, see [`model.md`](./model.md)

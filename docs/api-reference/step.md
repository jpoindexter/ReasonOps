---
author: ReasonOps System
created: '2025-05-16T10:33:34.893Z'
links: []
status: draft
tags:
  - reasonops
  - obsidian
  - enterprise
title: step
type: doc
updated: '2025-05-16T10:33:34.893Z'
visibility: public
---
# 🧾 API Reference: Get Steps from Completion
Returns a list of normalized reasoning steps derived from a previously submitted completion. This endpoint is used to evaluate and score each logical unit of an LLM-generated response.
---
## 📮 Endpoint
**GET** `/api/step?completionId=<id>`
### Required Headers
```
Authorization: Bearer <api-key>
Content-Type: application/json
```
---
## 📥 Query Parameters
| Parameter      | Required | Type   | Description                     |
| -------------- | -------- | ------ | ------------------------------- |
| `completionId` | ✅ Yes   | string | Completion to extract steps for |
---
## 📤 Example Response
```json
[
  {
    "stepId": "step_0041a1",
    "completionId": "comp_a3c19f",
    "text": "First, calculate the difference in temperature.",
    "index": 0
  },
  {
    "stepId": "step_0041a2",
    "completionId": "comp_a3c19f",
    "text": "Then divide the result by the standard deviation.",
    "index": 1
  }
]
```
---
## ✅ Validation Rules
- `completionId` must exist in database
- Each returned step must be:
  - Tokenized
  - Normalized via `normalizeText()`
  - Sorted by step index (ascending)
- Each step must be unique and linked to `taskId` via `completion.taskId`
---
## 📚 Related Docs
- [Step parsing logic](../../../backend/lib/parsing/parseCompletion.ts)
- [Zod schema](../../schema/step/model.md)
- [Step export format](../../schema/step/usage.md)
- [Step scoring logic](../../../backend/lib/scoring/scoreStep.ts)

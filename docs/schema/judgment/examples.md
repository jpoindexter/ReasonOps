---
author: ReasonOps System
created: '2025-05-16T10:33:34.985Z'
links: []
status: draft
tags:
  - reasonops
  - obsidian
  - enterprise
title: examples
type: doc
updated: '2025-05-16T10:33:34.985Z'
visibility: public
---
# 📝 Judgment Schema — Example Payloads
This document contains realistic example JSON objects for the `Judgment` entity. Judgments represent evaluations of reasoning steps from either human reviewers or automated LLM agents. These examples show how Judgments are formed, stored, and differentiated by origin.
---
## ✅ Example 1: Human Judgment (with comment)
```json
{
  "id": "judgment_001",
  "stepId": "step_001",
  "score": "clear",
  "comment": "This step is logically sound and well-stated.",
  "confidence": 0.95,
  "createdBy": "user_3412",
  "createdAt": "2025-05-12T09:00:00Z",
  "updatedAt": "2025-05-12T09:00:00Z",
  "metadata": {
    "sessionId": "eval_0524_a",
    "annotatorExperience": "senior"
  }
}
```
> This Judgment reflects a confident human evaluation with a qualitative comment and session trace metadata.
---
## ✅ Example 2: LLM Judgment with Justification
```json
{
  "id": "judgment_002",
  "stepId": "step_002",
  "score": "unclear",
  "comment": "The reasoning is vague and lacks a supporting claim.",
  "confidence": 0.78,
  "createdBy": "model:claude-2.1",
  "createdAt": "2025-05-12T09:01:00Z",
  "updatedAt": "2025-05-12T09:01:00Z",
  "metadata": {
    "promptVersion": "v1.6",
    "systemPrompt": "Evaluate logic step for clarity.",
    "temperature": 0.5,
    "rawScoringOutput": {
      "score": "unclear",
      "explanation": "Reasoning was vague; lacks causal link."
    }
  }
}
```
> This shows a model-generated Judgment, including structured `rawScoringOutput` from the prompt and scoring configuration metadata.
---
## ✅ Example 3: Contradictory Score with Fallacy Tag
```json
{
  "id": "judgment_003",
  "stepId": "step_004",
  "score": "contradictory",
  "comment": "This contradicts the prior conclusion that cars are essential for economic activity.",
  "confidence": 0.88,
  "createdBy": "user_2017",
  "createdAt": "2025-05-12T09:02:00Z",
  "updatedAt": "2025-05-12T09:02:00Z",
  "metadata": {
    "fallacyTag": "inconsistency",
    "taskContext": "policy-debate-v4"
  }
}
```
> This human Judgment identifies a contradiction and includes a fallacy tag within metadata for advanced analysis.
---
## 🔁 Notes
- All Judgments must include a `stepId`, `score`, and `createdBy`
- `comment` is optional but highly recommended for human reviewers
- AI judgments should include scoring prompt versions and traceable LLM params in `metadata`
- Confidence values should be normalized (0.0 to 1.0)
See the full schema in [`model.md`](./model.md) and scoring logic in [`scoring.md`](./scoring.md)

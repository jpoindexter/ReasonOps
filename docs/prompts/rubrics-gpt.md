---
title: "rubrics-gpt"
status: "draft"
---

# 🧠 GPT-Specific Scoring Rubric

This document defines the scoring rubric and structured prompt format used when GPT-4 or GPT-3.5 is used to evaluate reasoning steps within ReasonOps. It ensures consistency, traceability, and structured outputs compatible with audit and export pipelines.

---

## 🎯 Purpose

GPT scoring prompts allow ReasonOps to:

- Generate reproducible, rubric-aligned step scores
- Enforce JSON response formatting
- Capture confidence metadata
- Provide traceable explanations for alignment workflows

---

## ✅ Scoring Rubric

| Score           | Criteria                                                          |
| --------------- | ----------------------------------------------------------------- |
| `clear`         | Step is well-reasoned, logically sound, and contextually relevant |
| `unclear`       | Step is vague, ambiguous, or missing explanation                  |
| `contradictory` | Step introduces logical conflict or violates task consistency     |

---

## 📝 GPT Prompt Template

```txt
You are reviewing a single reasoning step produced by an AI model.

Please score the step using the rubric below and return your result as a JSON object.

Rubric:
- clear: Well-reasoned and logically coherent
- unclear: Vague, confusing, or lacks logical support
- contradictory: Inconsistent or logically incorrect

Respond using ONLY this JSON schema:

{
  "score": "clear" | "unclear" | "contradictory",
  "comment": "Brief explanation of your score",
  "confidence": number between 0.0 and 1.0
}

Step:
"[insert step text here]"
```

---

## 🧪 Sample Output

```json
{
  "score": "contradictory",
  "comment": "The step claims X while contradicting a previously stated reason Y.",
  "confidence": 0.76
}
```

---

## 📦 JSON Field Expectations

| Field        | Type     | Notes                                               |
| ------------ | -------- | --------------------------------------------------- |
| `score`      | `string` | Must be one of: `clear`, `unclear`, `contradictory` |
| `comment`    | `string` | Short rationale, ideally 1–2 sentences              |
| `confidence` | `number` | Model's confidence in score (0.0–1.0)               |

---

## 📄 Prompt Behavior Notes

- GPT must return structured JSON (no additional explanation or wrapper)
- The response must be parseable with `JSON.parse()`
- Prompt should include model identifier and version (`gpt-4`, etc.)
- Use temp ≤ 0.5 to reduce randomness in scoring

---

## 🔐 Audit and Traceability

| Element           | Stored In                            |
| ----------------- | ------------------------------------ |
| Raw response      | `Judgment.metadata.rawModelOutput`   |
| Prompt version    | `Judgment.metadata.promptVersion`    |
| Model ID          | `Judgment.createdBy` = `model:gpt-4` |
| Task + step trace | Logged with `taskId` + `stepId`      |

---

## 🧩 Prompt Versioning

- All prompt updates must be versioned (e.g. `v1.0.3`)
- Document prompt version in `rubrics-gpt.md` and in `Judgment.metadata`
- Any change to wording, structure, or scoring logic requires a new version

---

## ✅ Contributor Guidelines

- Test new prompts on at least 3 known-good and 3 flawed steps
- Validate that JSON is returned without additional wrapping or formatting
- Ensure that `comment` does not repeat the input step
- Include fallback handler for parsing in `storeJudgment.ts`

---

This scoring rubric allows ReasonOps to safely and scalably apply GPT-based evaluation to AI-generated reasoning — structured, transparent, and ready for audit.

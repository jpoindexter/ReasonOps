---
title: "index"
status: "draft"
---

> 🧠 ReasonOps Context  
Judgments in ReasonOps are structured evaluations of reasoning quality, not just output correctness. They include tags, scores, and commentary about where logic succeeded or broke down.

# 📝 Judgment API Reference

This document defines the API endpoint used to submit a `Judgment` — a score and optional comment assigned to a `Step` in a model-generated reasoning chain. Judgments may be submitted by human reviewers or LLM scoring agents.

---

## 📥 POST `/api/judgment`

Submits a structured score for a single Step.

---

### ✅ Request Body

```json
{
  "stepId": "step_001",
  "score": "clear",
  "comment": "Logically consistent with prior step.",
  "confidence": 0.95,
  "createdBy": "annotator_008"
}
```

| Field        | Type     | Required | Description                                         |
| ------------ | -------- | -------- | --------------------------------------------------- |
| `stepId`     | `string` | ✅       | ID of the Step being scored                         |
| `score`      | `string` | ✅       | Score value: `clear`, `unclear`, or `contradictory` |
| `comment`    | `string` | Optional | Qualitative rationale for score                     |
| `confidence` | `number` | Optional | Value between 0.0–1.0 if using an LLM judge         |
| `createdBy`  | `string` | ✅       | Human reviewer ID or model identifier               |

---

### ✅ Response

```json
{
  "status": "success",
  "judgmentId": "judgment_101"
}
```

---

## 🧠 Scoring Source

Judgments can originate from:

| Source       | Field `createdBy` format          |
| ------------ | --------------------------------- |
| Human UI     | `annotator_014`, `user_231`       |
| LLM-as-judge | `model:claude-2.1`, `model:gpt-4` |
| Automated QA | `system:scorebot`                 |

All scores are audit-traced via the `createdBy` field and stored as immutable records.

---

## 🛠 Usage in ReasonOps

| File                               | Role                              |
| ---------------------------------- | --------------------------------- |
| `/app/api/judgment/route.ts`       | Handles POST logic                |
| `/lib/storeJudgment.ts`            | Schema validation + DB logic      |
| `/components/StepScoringPanel.tsx` | Triggers API call on score submit |
| `/tests/judgment.spec.ts`          | Schema + API validation tests     |

---

## 📦 Related Schema

| Field     | Model      | Link                                                   |
| --------- | ---------- | ------------------------------------------------------ |
| `stepId`  | `Step`     | [`step/model.md`](../schema/step/model.md)             |
| `score`   | `Judgment` | [`judgment/model.md`](../schema/judgment/model.md)     |
| `comment` | `Judgment` | [`judgment/scoring.md`](../schema/judgment/scoring.md) |

---

## 🔐 Contributor Guidelines

- A Step can only receive one Judgment (no duplicates)
- `score` must be one of the rubric values
- `createdBy` is required and must trace to a known actor
- Judgments must not be editable once submitted
- For AI scorers, include scoring prompt metadata in `metadata` (WIP)

---

For scoring logic, see the scoring guides in:

- [`/schema/step/scoring.md`](../schema/step/scoring.md)
- [`/schema/judgment/scoring.md`](../schema/judgment/scoring.md)

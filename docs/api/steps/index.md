> 🧠 ReasonOps Context  
Each reasoning step in ReasonOps captures a discrete unit of logic in an AI trace. Steps are judged on their contribution to overall coherence, truth alignment, and justification.

# 🪜 Step API Reference

This document defines the ReasonOps API for extracting reasoning steps from a model-generated Completion. Steps are logical units used for granular scoring, fallacy detection, and downstream evaluation exports.

---

## 📥 POST `/api/step/parse`

Parses a Completion’s `response` field into an ordered array of `Step` objects.

---

### ✅ Request Body

```json
{
  "completionId": "completion_001"
}
```

| Field          | Type     | Required | Description                                                   |
| -------------- | -------- | -------- | ------------------------------------------------------------- |
| `completionId` | `string` | ✅       | ID of the Completion whose response will be parsed into Steps |

---

### ✅ Response

```json
[
  {
    "stepId": "step_001",
    "text": "Trees reduce the urban heat island effect.",
    "position": 0
  },
  {
    "stepId": "step_002",
    "text": "They also help filter air pollution.",
    "position": 1
  }
]
```

| Field      | Type     | Description                      |
| ---------- | -------- | -------------------------------- |
| `stepId`   | `string` | ID of the created Step object    |
| `text`     | `string` | Extracted reasoning segment      |
| `position` | `number` | Step order within the Completion |

---

## 🧠 Step Parsing Strategy

Steps can be extracted using:

- Sentence-level segmentation (default)
- Regex or LLM-assisted parsing (optional)
- Line break detection (in future CLI support)

Logic resides in `/lib/parseSteps.ts`.

---

## 🧩 Downstream Use

Parsed Steps are:

- Displayed in the UI (`StepScoringPanel.tsx`)
- Scored individually (`POST /api/judgment`)
- Exported as part of `GET /api/export/tasks/:taskId`

---

## 🔐 Integrity Rules

| Rule                                           | Enforcement |
| ---------------------------------------------- | ----------- |
| Steps must reference a valid `completionId`    | ✅          |
| Step `text` must be unique per Completion      | ✅          |
| `position` must be non-negative and sequential | ✅          |

---

## 🛠 Usage in Codebase

| File                           | Role                                     |
| ------------------------------ | ---------------------------------------- |
| `/lib/parseSteps.ts`           | Core extraction logic                    |
| `/app/api/step/parse/route.ts` | Route handler                            |
| `/schemas/step.ts`             | Zod schema for parsed Steps              |
| `/tests/step.spec.ts`          | Unit + structure tests for output format |

---

## 🔧 Contributor Guidelines

- Ensure all parsed `Step` objects are written using `StepSchema`
- Avoid in-place mutation of `Completion` records — write Steps separately
- Maintain consistent `position` indexing
- If using LLM-assisted parsing, tag results in `Step.metadata` with extraction method
- Add fixtures to `tests/` for edge case parsing (lists, bullets, multi-line)

---

See [`/docs/schema/step/model.md`](../schema/step/model.md) for full Step schema.

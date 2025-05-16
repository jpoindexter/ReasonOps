---
title: "examples"
status: "draft"
---

# 🪜 Step Schema — Example Payloads

This document provides real-world example JSON objects for the `Step` entity. Steps are the fundamental unit of logic extracted from a Completion and are used to evaluate model reasoning quality.

Each example below reflects different levels of reasoning complexity, annotation style, and potential metadata.

---

## ✅ Example 1: Basic Step (no type)

```json
{
  "id": "step_001",
  "completionId": "completion_001",
  "text": "Trees reduce the urban heat island effect by providing shade and releasing water vapor.",
  "position": 0,
  "createdAt": "2025-05-12T08:30:01Z",
  "updatedAt": "2025-05-12T08:30:01Z"
}
```

> This is a straightforward reasoning statement with no optional `type` or metadata provided.

---

## ✅ Example 2: Step with `type` classification

```json
{
  "id": "step_002",
  "completionId": "completion_001",
  "text": "Planting more trees can lower the temperature in cities.",
  "position": 1,
  "type": "justification",
  "createdAt": "2025-05-12T08:30:02Z",
  "updatedAt": "2025-05-12T08:30:02Z"
}
```

> This step has been labeled as a "justification" type — useful in logic-specific workflows or future multi-agent tuning.

---

## ✅ Example 3: Complex Step with Metadata

```json
{
  "id": "step_003",
  "completionId": "completion_002",
  "text": "Reducing vehicle traffic improves air quality and reduces noise pollution.",
  "position": 2,
  "type": "conclusion",
  "createdAt": "2025-05-12T08:30:03Z",
  "updatedAt": "2025-05-12T08:30:03Z",
  "metadata": {
    "extractionMethod": "pattern-matching:v2",
    "segmentConfidence": 0.94,
    "annotatorHint": "Keep as separate reasoning step"
  }
}
```

> This step includes metadata from an automatic parsing process, which can be used to evaluate the extraction pipeline or prompt structure.

---

## 🔁 Notes

- `position` must always be sequential and scoped per Completion
- `metadata` is optional but recommended for advanced parsing, confidence, or audit use
- `type` can be omitted or used to support structured prompting or training

For the full schema definition, see [`model.md`](./model.md).

# 🧾 API Reference: Submit Judgment

Submit a step-level evaluation judgment (manual or model-generated). This endpoint accepts a scored step response and stores it for export, audit, and critique.

---

## 📮 Endpoint

**POST** `/api/judgment`

### Required Headers

```
Content-Type: application/json
Authorization: Bearer <api-key>
```

---

## 📥 Request Body (Zod Schema: `judgmentFormSchema`)

```ts
{
  stepId: string;
  score: 'clear' | 'unclear' | 'contradictory';
  comment?: string;
  confidence?: number; // optional, 0.0 - 1.0
  model?: 'claude' | 'gpt' | 'human'; // optional
}
```

---

## 🧪 Example Request

```json
{
  "stepId": "step_feb811",
  "score": "clear",
  "comment": "Concise, accurate step",
  "confidence": 0.95,
  "model": "claude"
}
```

---

## 📤 Example Response

```json
{
  "status": "ok",
  "judgmentId": "judg_94a233",
  "submittedAt": "2025-05-13T15:12:22Z"
}
```

---

## ✅ Validation Rules

- `stepId` must exist in DB (foreign key)
- `score` must match rubric enum
- `comment` required if score ≠ "clear"
- `confidence` must be a float ≤ 1.0

---

## 📚 Related Docs

- [Zod schema](../../schema/judgment/model.md)
- [Scoring service logic](../../../backend/lib/scoring/scoreStep.ts)
- [StepScoringPanel UI](../../../frontend/components/panels/StepScoringPanel.tsx)
- [Export JSONL structure](../../schema/dataset-format.md)

# 🧪 Example Data for ReasonOps

This folder contains production-grade example payloads used throughout the ReasonOps evaluation pipeline. These examples help developers, test writers, and auditors understand how each layer of the system processes data from task → completion → steps → judgment → export.

---

## 📦 Files

| File              | Description                             | Linked Module                               |
| ----------------- | --------------------------------------- | ------------------------------------------- |
| `task.json`       | A sample task prompt and metadata block | `frontend/app/task/page.tsx`, `taskForm.ts` |
| `completion.json` | A full model response to a task prompt  | `parseCompletion.ts`, `llmAdapter.ts`       |
| `steps.json`      | Parsed step array from a completion     | `normalizeText.ts`, `step.ts`               |
| `judgment.json`   | A scored step-level judgment record     | `scoreStep.ts`, `judgmentForm.ts`           |

---

## 🔍 How to Use

- Use these as seed data for dev environments
- Simulate end-to-end flow:
  - Submit `task.json` → LLM completes `completion.json`
  - Parse into `steps.json` using ReasonOps backend
  - Submit `judgment.json` for scoring
- Useful for snapshot testing of:
  - `generateDataset.ts`
  - StepScoringPanel UI
  - Export preview tooling

---

## 🛠 Related Components

- `backend/exporters/jsonl/generateDataset.ts`
- `backend/lib/parsing/parseCompletion.ts`
- `backend/lib/scoring/scoreStep.ts`
- `frontend/components/panels/StepScoringPanel.tsx`
- `tests/fixtures/`

---

## 📤 Dataset Preview Output

Final output rows (JSONL) will combine data from all example files. For spec details, see:

- [`schema/dataset-format.md`](../schema/dataset-format.md)

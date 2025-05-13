# MVP File Map

This document maps each phase of the MVP to the exact files and directories involved in ReasonOps. Use this as a source of truth for navigation and implementation tracking.

---

## 🧩 Task Creation

| Feature             | File                                     |
| ------------------- | ---------------------------------------- |
| Task form schema    | `frontend/schemas/task/form.ts`          |
| Task zod schema     | `frontend/schemas/task/schema.ts`        |
| Task page UI        | `frontend/app/task/page.tsx`             |
| Task form component | `frontend/components/forms/TaskForm.tsx` |
| Task POST API       | `backend/api/task/route.ts`              |
| Task Zod validation | `backend/schemas/task/task.ts`           |
| Task service logic  | `backend/services/TaskService.ts`        |
| Task tests          | `tests/frontend/TaskForm.test.tsx`       |
| Task test fixture   | `tests/fixtures/task.json`               |

---

## 🔄 Step + Completion Evaluation

| Feature               | File                                                   |
| --------------------- | ------------------------------------------------------ |
| Step parse handler    | `backend/handlers/parseSteps.ts`                       |
| Completion Zod schema | `backend/schemas/completion/completion.ts`             |
| Completion usage docs | `docs/schema/completion/usage.md`                      |
| Step scoring logic    | `backend/lib/scoring/scoreStep.ts`                     |
| Completion parser     | `backend/lib/parsing/parseCompletion.ts`               |
| StepScoringPanel UI   | `frontend/components/panels/step/StepScoringPanel.tsx` |
| Step schema           | `frontend/schemas/step/schema.ts`                      |

---

## 🧠 Judgment Review

| Feature                  | File                                              |
| ------------------------ | ------------------------------------------------- |
| Judgment form schema     | `frontend/schemas/judgment/form.ts`               |
| Judgment API route       | `backend/api/judgment/route.ts`                   |
| Judgment Zod validation  | `backend/schemas/judgment/judgment.ts`            |
| Judgment panel UI        | `frontend/components/forms/JudgmentForm.tsx`      |
| Judgment example fixture | `docs/examples/judgment.json`                     |
| Judgment tests           | `tests/frontend/components/JudgmentForm.test.tsx` |

---

## 📤 Export Dataset

| Feature              | File                                         |
| -------------------- | -------------------------------------------- |
| JSONL exporter logic | `backend/exporters/jsonl/generateDataset.ts` |
| Preview transformer  | `backend/exporters/preview/index.ts`         |
| Export API docs      | `docs/api/export.md`                         |
| Export flow guide    | `docs/guides/export-flow.md`                 |

---

## 🧪 Testing & Validation

| Feature                  | File                                         |
| ------------------------ | -------------------------------------------- |
| Schema test fixtures     | `tests/fixtures/`                            |
| Component tests          | `tests/frontend/components/ui/*.test.tsx`    |
| Snapshot coverage config | `vitest.config.ts`                           |
| Testing utilities        | `frontend/lib/test-utils.ts` (if applicable) |

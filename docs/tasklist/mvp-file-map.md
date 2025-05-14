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
| Step scoring diff     | `backend/lib/scoring/diffSteps.ts`                     |
| Comparison schema     | `backend/schemas/comparison.ts`                        |

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
| Reviewer schema          | `backend/schemas/reviewer.ts`                     |
| Reviewer guard           | `backend/guards/requireRubricVersion.ts`          |

---

## 📤 Export Dataset

| Feature              | File                                         |
| -------------------- | -------------------------------------------- |
| JSONL exporter logic | `backend/exporters/jsonl/generateDataset.ts` |
| Preview transformer  | `backend/exporters/preview/index.ts`         |
| Export API docs      | `docs/api/export.md`                         |
| Export flow guide    | `docs/guides/export-flow.md`                 |
| JSONL validator      | `backend/lib/schema/validateExport.ts`       |
| Export snapshot test | `backend/validators/snapshot.ts`             |
| Audit export event   | `backend/audit/LogReviewEvent.ts`            |

---

## 📊 Reviewer Analytics

| Feature                    | File                                              |
| -------------------------- | ------------------------------------------------- |
| Accuracy tracking logic    | `backend/metrics/trackReviewerAccuracy.ts`        |
| ReviewerStats UI           | `frontend/components/dashboard/ReviewerStats.tsx` |
| Reviewer analytics service | `backend/admin/ReviewerAnalyticsService.ts`       |
| Reviewer analytics docs    | `docs/guides/advanced/reviewer-analytics.md`      |
| Reviewer history page      | `frontend/app/evaluate/history/page.tsx`          |
| Reviewer history service   | `backend/services/EvaluationHistoryService.ts`    |
| History schema             | `backend/schemas/history.ts`                      |

---

## 🛡️ Traceability + Admin

| Feature              | File                                        |
| -------------------- | ------------------------------------------- |
| Audit log schema     | `docs/schema/audit/audit-log-format.md`     |
| Reviewer versioning  | `backend/guards/requireRubricVersion.ts`    |
| Admin dashboard page | `frontend/app/admin/page.tsx`               |
| Admin service logic  | `backend/admin/ReviewerAnalyticsService.ts` |

---

## 🧪 Testing & Validation

| Feature                  | File                                         |
| ------------------------ | -------------------------------------------- |
| Schema test fixtures     | `tests/fixtures/`                            |
| Component tests          | `tests/frontend/components/ui/*.test.tsx`    |
| Snapshot coverage config | `vitest.config.ts`                           |
| Testing utilities        | `frontend/lib/test-utils.ts` (if applicable) |

---

## 🧭 Phase 2: AI Agents & Reviewer Collaboration (Scaffolded)

| Feature                    | File                                            |
| -------------------------- | ----------------------------------------------- |
| Reviewer drift metric      | `backend/metrics/reviewerDriftIndex.ts`         |
| Rubric usage heatmap       | `backend/metrics/rubricUsageHeatmap.ts`         |
| Reviewer entropy score     | `backend/metrics/reviewerEntropy.ts`            |
| Reviewer insights service  | `backend/services/ReviewerInsightsService.ts`   |
| Auto scoring agent logic   | `backend/agents/AutoEvaluatorAgent.ts`          |
| Critique rewrite agent     | `backend/agents/CritiqueRewriteAgent.ts`        |
| Rubric explainer agent     | `backend/agents/RubricExplainerAgent.ts`        |
| Reviewer consensus service | `backend/services/ReviewerConsensusService.ts`  |
| Reviewer threads panel UI  | `frontend/components/review/ThreadsPanel.tsx`   |
| Consensus badge component  | `frontend/components/review/ConsensusBadge.tsx` |

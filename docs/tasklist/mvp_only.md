# 🚀 ReasonOps MVP Checklist: Enterprise Execution Edition

> ℹ️ **See Also**:  
> [Phase 2 Feature Roadmap](./phase-2-features.md) — Collaboration, plugins, AI agents, extensibility  
> [ReasonOps Platform Spec](../architecture/reasonops-platform-spec.md) — Full platform scope + roadmap

This document transforms the MVP spec into a full execution-ready tasklist for shipping ReasonOps as a production-grade platform. Each section is broken into backend, frontend, and analytics requirements with detailed subtasks to track completion.

---

## 🧠 Phase 1: Task Creation

### Backend

- [ ] `POST /api/task` endpoint

  - [ ] Validate Zod schema
  - [ ] Create record in Supabase
  - [ ] Return `taskId`
  - [ ] Handle error + missing fields
  - [ ] Fire `logReviewEvent('task_created')`

- [ ] `TaskService.ts`
  - [ ] Add input contract + output formatting
  - [ ] Attach `reviewerId` via token

### Frontend

- [ ] `TaskForm.tsx`
  - [ ] Form w/ `title`, `prompt`, `model`, `version`, `tags`
  - [ ] Zod schema + validation state
  - [ ] Submit onClick → API → success UX
  - [ ] Block if missing fields or invalid

---

## 📤 Phase 2: Completion Inference (LLM Run)

### Backend

- [ ] `POST /api/llm`

  - [ ] Accept taskId + model
  - [ ] Route to Claude or GPT
  - [ ] Return `completionId`
  - [ ] Log token usage

- [ ] `llmAdapter.ts`

  - [ ] Model switch for Claude / GPT / Ollama

- [ ] `logReviewEvent('completion_generated')`

---

## ✂️ Phase 3: Step Parsing

### Backend

- [ ] `parseCompletion.ts`

  - [ ] Split completion text to logical steps
  - [ ] Normalize + strip boilerplate

- [ ] `parseSteps.ts`
  - [ ] Attach `stepId`, `taskId`, `index`
  - [ ] Error if 0 steps parsed
  - [ ] Store in Supabase
  - [ ] Log `logReviewEvent('steps_parsed')`

### Testing

- [ ] `parseSteps.spec.ts`
  - [ ] Validate >1 step required
  - [ ] Assert shape of output

---

## ✅ Phase 4: Judgment Submission (Step Scoring)

### Backend

- [ ] `POST /api/judgment`

  - [ ] Zod validation
  - [ ] Enforce `rubricVersion`
  - [ ] Require comment if score = 0
  - [ ] Log `logReviewEvent('judgment_submitted')`
  - [ ] Update reviewer metrics

- [ ] `trackReviewerAccuracy.ts`
  - [ ] Compute `avgScore`, `entropy`, `rubric usage`

### Frontend

- [ ] `StepScoringPanel.tsx`

  - [ ] Radio rubric (0–2)
  - [ ] Required comment field
  - [ ] Confidence dropdown
  - [ ] Progress tracker (x/y steps)

- [ ] `useScorePanel.ts`
  - [ ] State hook per `stepId`

---

## 📦 Phase 5: Dataset Export

### Backend

- [ ] `generateDataset.ts`

  - [ ] Join task, completion, step, judgment
  - [ ] Output structured JSONL
  - [ ] Add `stepHash`, `rubricVersion`, `timestamp`

- [ ] `snapshot.ts`

  - [ ] Compare to last known-good export
  - [ ] Flag row mismatch or schema drift

- [ ] `GET /api/export/tasks/:taskId`
  - [ ] Return blob or streaming `.jsonl`

### CI

- [ ] `generateDataset.spec.ts`
  - [ ] Assert schema shape
  - [ ] Assert known row count
  - [ ] Assert export is deterministic

---

## 🧠 Phase 6: Reviewer Analytics + Admin Panel

### Backend

- [ ] `ReviewerAnalyticsService.ts`

  - [ ] Reviewer accuracy, rubric usage
  - [ ] Drift detection per reviewerId

- [ ] `reviewerDriftIndex.ts`, `rubricUsageHeatmap.ts`

### Frontend

- [ ] `ReviewerStats.tsx`

  - [ ] Table view: tasks scored, avg, drift

- [ ] `evaluate/history/page.tsx`
  - [ ] Filtered list of past judgments

---

## 🔐 Enterprise Readiness + Observability

- [ ] `requireReviewer.ts` — token-scope gating
- [ ] `requireRubricVersion.ts` — lock rubric drift
- [ ] `LogReviewEvent.ts` — required per action
- [ ] `ReviewerTokens` table — enforce scope
- [ ] `.jsonl` export must match spec in CI
- [ ] All reviewer actions traced and filterable
- [ ] All schema types must use Zod

---

## 🧪 Testing Matrix

- [ ] `taskForm.test.tsx`
- [ ] `scoreStep.spec.ts`
- [ ] `StepScoringPanel.test.tsx`
- [ ] `export-endpoint.test.ts`
- [ ] `reviewer-analytics.spec.ts`
- [ ] `parseSteps.spec.ts`
- [ ] `generateDataset.spec.ts`
- [ ] E2E: task → llm → parse → score → export

---

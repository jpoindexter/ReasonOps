---
title: "pebbles"
status: "draft"
---

# 🪨 Midlayer Infrastructure Tasks ("Pebbles")

This module defines the full ReasonOps task track for frontend components, adapters, and export infrastructure. These tasks sit between core logic (rocks) and polish (sand) and form the execution bridge between model evaluation and product delivery.

---

## 🧠 PARITY++ Metric & Agent Infrastructure (Post-MVP)

### `backend/metrics/`

- [ ] `computeReviewerMetrics.ts`
- [ ] `reviewerDriftIndex.ts`
- [ ] `rubricUsageHeatmap.ts`
- [ ] `reviewerEntropy.ts`
- [ ] `modelScoreDelta.ts`
- [ ] `modelVersionDrift.ts`
- [ ] `semanticRegressionDetector.ts`
- [ ] `rubricScoreDrift.ts`
- [ ] `rubricAdoptionRate.ts`

### `backend/services/`

- [ ] `ReviewerInsightsService.ts`
- [ ] `RubricAnalysisService.ts`
- [ ] `ReviewerConsensusService.ts`
- [ ] `ReviewerCollaborationService.ts`

### `backend/agents/`

- [ ] `AutoEvaluatorAgent.ts`
- [ ] `CritiqueRewriteAgent.ts`
- [ ] `RubricExplainerAgent.ts`
- [ ] `PromptSummarizerAgent.ts`
- [ ] `AgentExecutionService.ts`

### `frontend/components/review/`

- [ ] `ThreadsPanel.tsx`
- [ ] `ConsensusBadge.tsx`

### `backend/exporters/finetune/`

- [ ] `generateTrainJSONL.ts`
- [ ] `taskCompletionJoin.ts`
- [ ] `stepJudgmentJoin.ts`

## 🧱 UI Routes & Page Surfaces

### `frontend/app/`

- [ ] `app/task/page.tsx`
  - [ ] Render task input form with Zod validation
  - [ ] Pre-fill if route includes `?preset=...`
  - [ ] Save to `api/task` and route to /evaluate
- [ ] `app/evaluate/page.tsx`
  - [ ] Pull task + completion data from backend
  - [ ] Load steps and show scoring panel
- [ ] `app/compare/page.tsx`
  - [ ] Accept two completions and show pairwise scoring
  - [ ] Allow side-by-side step judgment

---

## 🧩 Frontend Panels & UI Components

### `frontend/components/panels/`

- [ ] `StepScoringPanel.tsx`
  - [ ] Accept step[] and emit judgment[]
  - [ ] Wire to `judgmentForm.ts`
  - [ ] Memoize step logic, show rubric visually
- [ ] `TaskListPanel.tsx`
  - [ ] Show history of task runs
  - [ ] Link to `evaluate/` and `compare/`

### `frontend/components/ui/`

- [ ] `Button.tsx`
  - [ ] Accept `variant`, `size`, `disabled` props
  - [ ] Allow icon slot and focus outline
- [ ] `Input.tsx`
  - [ ] Styled input with error state
  - [ ] Accept forwardRef and aria labels

---

## 📑 Form Validation + Hooks

### `frontend/schemas/`

- [ ] `taskForm.ts`
  - [ ] Zod: `title`, `prompt`, `version`, `metadata`
- [ ] `judgmentForm.ts`
  - [ ] Zod: `stepId`, `score`, `comment`, `confidence`

### `frontend/hooks/`

- [ ] `useTask.ts`
  - [ ] Provide task context
  - [ ] Include `saveTask`, `loadTask`, `resetTask`
- [ ] `useScorePanel.ts`
  - [ ] Track form state, current step index
  - [ ] Map form inputs to Zod output

---

## 🔌 Adapter Integration

### `backend/adapters/`

- [ ] `ClaudeAdapter.ts`
  - [ ] Accept prompt + metadata
  - [ ] Retry on model error
- [ ] `GPTAdapter.ts`
  - [ ] Support streaming and temperature
  - [ ] Return raw response + formatted version
- [ ] `SupabaseAdapter.ts`
  - [ ] Read/write task, step, judgment tables
  - [ ] Map Zod input to SQL-safe insert object

---

## 📤 Export Preview + Bridge Code

### `backend/exporters/preview/`

- [ ] `previewExport.ts`
  - [ ] Accept taskId and simulate JSONL output
  - [ ] Return test-safe summary string
- [ ] `compareExportSchemas.ts`
  - [ ] Validate current output against saved schema hash
  - [ ] Fail CI if export format changed without approval

---

## 📚 Documentation Expectations

- [ ] Add `/docs/prompts/presets.md` for standard task templates
- [ ] Add `/docs/export/preview.md` for preview UI logic and matching dataset spec
- [ ] Ensure all forms and UI schemas are referenced in `GETTING_STARTED.md`

---

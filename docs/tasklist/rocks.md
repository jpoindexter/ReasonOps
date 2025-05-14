# 🧱 Core System Tasks ("Rocks")

This track covers ReasonOps' core reasoning engine, including LLM orchestration, scoring services, API interfaces, and step judgment pipelines. These modules must function end-to-end, meet schema guarantees, and integrate cleanly with dataset output and audit systems.

---

## 🧠 LLM Routing & Evaluation Core

### `backend/lib/llm/llmAdapter.ts`

- [ ] `callLLM(model: 'claude' | 'gpt', prompt: string)`
  - [ ] Dispatch request to correct adapter
  - [ ] Handle API response normalization
  - [ ] Attach model metadata to output

### `backend/lib/llm/claude.ts` / `gpt.ts`

- [ ] Export `callClaude(prompt, meta)` / `callGPT(prompt, meta)`
  - [ ] Accept raw string + config
  - [ ] Retry on timeout or malformed JSON
  - [ ] Log token usage and response time

---

## 🧩 Step Extraction Logic

### `backend/lib/parsing/parseCompletion.ts`

- [ ] `extractSteps(completion: string): Step[]`
  - [ ] Tokenize into logical lines or bullets
  - [ ] Trim, normalize casing and whitespace
  - [ ] Remove empty/low-value content

### `backend/lib/parsing/normalizeText.ts`

- [ ] `normalize(text: string): string`
  - [ ] Replace weird tokens, normalize quotes
  - [ ] Strip trailing punctuation if needed

---

## ✅ Step Judgment + Rubric Engine

### `backend/lib/scoring/scoreStep.ts`

- [ ] `applyRubric(stepText: string): ScoreResult`
  - [ ] Map to { score, comment, confidence }
  - [ ] Validate rubric values (clear, unclear, contradictory)

### `backend/lib/scoring/compareSteps.ts`

- [ ] `compareSteps(A: Step[], B: Step[]): ComparisonResult`
  - [ ] Pairwise step judgment
  - [ ] Output preferred, delta, and confidence range

---

## 🧪 Handlers & Step Chain Wiring

### `backend/handlers/parseSteps.ts`

- [ ] `parseAndStoreSteps(taskId: string, completion: string)`
  - [ ] Run `parseCompletion`, attach `step.taskId`
  - [ ] Insert to DB via Supabase adapter
  - [ ] Emit `steps.created` event

---

## ⚙️ Backend API Interfaces

### `backend/api/task/route.ts`

- [ ] `GET /api/task/:id`
  - [ ] Fetch from Supabase with RLS applied
- [ ] `POST /api/task`
  - [ ] Accept task input schema
  - [ ] Return new task ID

### `backend/api/completion/route.ts`

- [ ] `POST /api/completion`
  - [ ] Accept prompt, taskId, model
  - [ ] Dispatch via `llmAdapter.ts`
  - [ ] Store and emit `completion.created`

### `backend/api/step/route.ts`

- [ ] `GET /api/step?completionId=X`
  - [ ] Return steps in original order

### `backend/api/judgment/route.ts`

- [ ] `POST /api/judgment`
  - [ ] Accept stepId, score, comment, model
  - [ ] Store and emit `judgment.submitted`

---

## 🧠 Orchestration Services

### `backend/services/TaskService.ts`

- [ ] `getTaskById(id)`
- [ ] `versionTask(task)`
- [ ] `duplicateTask(task)`

### `backend/services/ScoringService.ts`

- [ ] `scoreStepWithModel(stepText, rubric)`
  - [ ] Call `llmAdapter`, parse result, validate schema

### `backend/services/CritiqueService.ts`

- [ ] `runCritique(stepId)`
  - [ ] Pull step from DB
  - [ ] Prompt critique model
  - [ ] Parse and store issues/comments

---

## 📤 Export Hooks (Core)

### `backend/exporters/jsonl/generateDataset.ts`

- [ ] Accept taskId or step[] array
- [ ] Map into JSONL-ready schema with metadata
- [ ] Include promptVersion, model, userId in each row

---

## 🧾 Schema & Type Guarantees

- [ ] All API inputs validated via `Zod`
- [ ] Output types conform to `Step`, `Judgment`, `ScoreResult` models
- [ ] All scoring results traceable to `model`, `stepId`, and `rubricVersion`

---

## 📊 Reviewer Metrics & Drift Intelligence

### `backend/metrics/computeReviewerMetrics.ts`

- [ ] Aggregate reviewer performance metrics
- [ ] Calculate step count, average score, time-to-score
- [ ] Output reviewer summary object

### `backend/metrics/reviewerDriftIndex.ts`

- [ ] Compare reviewer scores over time
- [ ] Identify drift vs rubric gold or self-drift

### `backend/metrics/rubricUsageHeatmap.ts`

- [ ] Build matrix of rubric score usage
- [ ] Surface over- or under-used rubric labels

### `backend/metrics/reviewerEntropy.ts`

- [ ] Compute entropy per reviewer over rubric use
- [ ] Identify ambiguous or inconsistent scoring patterns

---

## 🧠 AI Agents & Critique Flows

### `backend/agents/AutoEvaluatorAgent.ts`

- [ ] Accept step text + rubric
- [ ] Return score, rationale, confidence
- [ ] Log output + scoring latency

### `backend/agents/CritiqueRewriteAgent.ts`

- [ ] Generate critique of step text
- [ ] Suggest improved reasoning or structure
- [ ] Tag issues (e.g. contradiction, vague, hallucinated)

### `backend/services/AgentExecutionService.ts`

- [ ] Unified runner for registered agents
- [ ] Retry logic, caching, model tracking

---

## 🤝 Reviewer Consensus & Collaboration

### `backend/services/ReviewerConsensusService.ts`

- [ ] Track multiple judgments per step
- [ ] Compute consensus score (avg or rule-based)
- [ ] Flag high disagreement

### `frontend/components/review/ThreadsPanel.tsx`

- [ ] UI for per-step reviewer threads
- [ ] Mention support, resolution toggle

### `frontend/components/review/ConsensusBadge.tsx`

- [ ] Inline UI showing consensus status
- [ ] Tooltip w/ agreement stats

---

## 🧪 Rubric Drift & Analysis Services

### `backend/metrics/rubricScoreDrift.ts`

- [ ] Detect rubric-level scoring shifts over time
- [ ] Track per-reviewer and per-rubric version

### `backend/services/RubricAnalysisService.ts`

- [ ] Aggregate rubric usage trends
- [ ] Output rubric adoption timeline + score variance

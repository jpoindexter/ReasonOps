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

# 🚀 ReasonOps MVP: Vertical Slice to Production

This document defines the leanest vertical feature set required to launch ReasonOps as a reasoning evaluation platform. It outlines the end-to-end flow: from prompt creation → LLM response → step scoring → JSONL export — all under CI and schema validation.

---

## ✅ MVP Goal

Let a user:

1. Submit a reasoning prompt
2. Use Claude/GPT to generate a completion
3. Parse that response into discrete reasoning steps
4. Score each step using a rubric
5. Export everything in a structured `.jsonl` format

---

## 🛠 Core Feature Checklist

### 🧠 Task Creation

- [ ] UI: `TaskForm.tsx` — prompt input + metadata (version, domain)
- [ ] API: `POST /api/task` — creates task record
- [ ] Schema: `taskForm.ts` (Zod)

---

### 📤 Completion Inference

- [ ] API: `POST /api/llm`
- [ ] Logic: Uses `llmAdapter.ts` → calls Claude/GPT
- [ ] Store response in `completions` table
- [ ] Output `completionId` linked to task

---

### ✂️ Step Parsing

- [ ] Logic: `parseCompletion.ts` (tokenize and normalize text)
- [ ] Handler: `parseSteps.ts` → transforms `completion.response` → `step[]`
- [ ] Output: stored steps with `stepId`, `index`, `taskId`, `completionId`

---

### ✅ Step Scoring (Judgment)

- [ ] UI: `StepScoringPanel.tsx`
- [ ] Schema: `judgmentForm.ts` (Zod)
- [ ] API: `POST /api/judgment` — store `score`, `comment`, `model`, `rubricVersion`, `confidence`

---

### 📦 Export Dataset

- [ ] Logic: `generateDataset.ts`
- [ ] Trigger: `GET /api/export/tasks/:taskId`
- [ ] Output: `.jsonl` with full traceable fields:
  - `taskId`, `prompt`, `completion`, `step[]`, `judgment[]`, `rubricVersion`, `model`, `timestamp`

---

## 🔐 Minimum Safeguards

| Safety Layer    | Mechanism                                                 |
| --------------- | --------------------------------------------------------- |
| Auth            | Supabase reviewer session or token                        |
| RLS             | Enforced by reviewer/project scope                        |
| Schema Validity | Zod on all forms + backend handlers                       |
| CI Snapshot     | Export output must match JSON schema                      |
| Required Fields | `rubricVersion`, `stepId`, `model`, `confidence` enforced |

---

## 🧪 Required Tests

- [ ] `taskForm.test.tsx` — create/edit task via UI, schema validation, failure cases
- [ ] `parseSteps.spec.ts` — step parsing from raw LLM completions, edge cases
- [ ] `scoreStep.spec.ts` — score logic unit test, rubric application
- [ ] `StepScoringPanel.test.tsx` — UI scoring, a11y, conditional requirements
- [ ] `generateDataset.spec.ts` — snapshot-based CI export tests, row validation
- [ ] `export-endpoint.test.ts` — full API test for `GET /api/export/tasks/:taskId`
- [ ] E2E test suite:
  - Uses: `task.json`, `completion.json`, `steps.json`, `judgment.json`
  - Flow: Submit task → inference → parse → score → export

---

## 🧾 Done Criteria

- [x] Task → Completion → Step → Judgment → Export runs cleanly
- [x] All code passes `pnpm lint`, `pnpm test`, `pnpm typecheck`
- [x] Output is versioned, reproducible, CI-tested `.jsonl`
- [x] All steps linked to prompt version + model
- [x] No mock data in production path

# 🚀 ReasonOps MVP: Vertical Slice to Production

This document defines the full production-ready MVP scope for ReasonOps — from prompt intake to rubric-aligned step scoring and traceable dataset export. It integrates backend logic, UI, Supabase integration, schema enforcement, CI snapshotting, and test coverage across all layers of the system.

---

## ✅ MVP Goal

Let a user:

1. Submit a structured prompt via UI
2. Trigger Claude/GPT to generate a raw response
3. Parse that response into normalized reasoning steps
4. Score each step with a rubric (manual or AI)
5. Export all steps, scores, and metadata in `.jsonl` format
6. Pass all tests, schema validation, and CI coverage

---

## 🧠 Phase 1: Task Creation (Prompt Intake)

| Layer       | Component/File                    | Requirement                                            |
| ----------- | --------------------------------- | ------------------------------------------------------ |
| Frontend UI | `TaskForm.tsx`                    | Controlled inputs + Zod validation                     |
| Schema      | `taskForm.ts`                     | Zod-enforced: `title`, `prompt`, `version`, `metadata` |
| Backend API | `POST /api/task`                  | Inserts into Supabase, returns `taskId`                |
| DB Access   | `supabase.from('tasks').insert()` | Must log errors, return task ID cleanly                |
| Dev Fixture | `task.json`                       | Used for E2E test, test coverage base                  |

---

## 📤 Phase 2: Completion Inference (Claude/GPT)

| Layer       | Component/File             | Requirement                                   |
| ----------- | -------------------------- | --------------------------------------------- |
| Backend API | `POST /api/llm`            | Accepts `taskId`, calls Claude/GPT            |
| Adapter     | `llmAdapter.ts`            | Supports `claude`, `gpt` via `model` param    |
| Env Setup   | `.env.local`               | Requires `OPENAI_API_KEY`, `CLAUDE_API_KEY`   |
| Output      | `completionId`             | Stored and returned via Supabase              |
| Dev Fixture | `completion.json`          | Mirrors inference output                      |
| Logging     | Token usage must be logged | For LLM transparency and rate limit debugging |

---

## ✂️ Phase 3: Step Parsing

| Layer       | Component/File                 | Requirement                                          |
| ----------- | ------------------------------ | ---------------------------------------------------- |
| Logic       | `parseCompletion.ts`           | Tokenizes `completion.response`, strips junk         |
| Handler     | `parseSteps.ts`                | Maps → `step[]` array with `stepId`, `index`, `text` |
| Backend API | `POST /api/steps` (optional)   | Can auto-trigger post-LLM if desired                 |
| Storage     | Supabase `steps` table         | Must retain `completionId`, `taskId`, `index`        |
| Dev Fixture | `steps.json`                   | Used for test + export                               |
| Validation  | Step count, empty/null filters | Assert no missing or duplicated `step[]`             |

---

## ✅ Phase 4: Judgment Submission (Step Scoring)

| Layer        | Component/File                              | Requirement                                                   |
| ------------ | ------------------------------------------- | ------------------------------------------------------------- |
| UI Component | `StepScoringPanel.tsx`                      | Radio rubric (`clear`, `unclear`, etc), comment, confidence   |
| Hook         | `useScorePanel.ts`                          | Tracks judgment state by `stepId`                             |
| Form Schema  | `judgmentForm.ts`                           | Zod-validated: `score`, `comment`, `confidence`, `model`      |
| Backend API  | `POST /api/judgment`                        | Stores Supabase record, attaches `rubricVersion`, `timestamp` |
| Dev Fixture  | `judgment.json`                             | Snapshot-ready, CI-stable input                               |
| RLS/Auth     | Token-scope enforced                        | Supabase `reviewerId`, `model`, or session scoped             |
| Error UX     | Form validation + required comment fallback | If score ≠ clear, comment is required                         |

---

## 📦 Phase 5: Dataset Export

| Layer       | Component/File                  | Requirement                                                                                             |
| ----------- | ------------------------------- | ------------------------------------------------------------------------------------------------------- |
| Logic       | `generateDataset.ts`            | Composes full dataset rows across all sources                                                           |
| Output      | `.jsonl`                        | Includes: `task`, `prompt`, `completion`, `step[]`, `judgment[]`, `rubricVersion`, `model`, `timestamp` |
| API Trigger | `GET /api/export/tasks/:taskId` | Returns `.jsonl` blob or download stream                                                                |
| CI Snapshot | `generateDataset.spec.ts`       | Validates schema shape + row count                                                                      |
| Export Hash | Each row hashable (optional)    | Add `stepHash`, `rowId` if needed                                                                       |

---

## 🔐 Minimum Safeguards

| Layer            | Requirement                                    |
| ---------------- | ---------------------------------------------- |
| Schema Contracts | All frontend forms Zod-enforced                |
| RLS Enforcement  | Supabase row-level auth: reviewer, task, scope |
| Reviewer Tokens  | Stored + verified via `reviewer_tokens`        |
| CI Snapshot      | Export diffed in test runner via Vitest        |
| Model ID         | All completions/judgments include `model`      |
| Prompt Version   | Every task + step inherits locked `version`    |
| Rubric Version   | Required per judgment for reproducibility      |

---

## 🧪 Required Tests

- [ ] `scoreStep.spec.ts` — judgment score handler (unit)
- [ ] `StepScoringPanel.test.tsx` — UI interaction + a11y
- [ ] `generateDataset.spec.ts` — snapshot test for export integrity
- [ ] `parseSteps.spec.ts` — tokenization & normalization coverage
- [ ] `taskForm.test.tsx` — prompt form render + validation
- [ ] E2E test: Full pipeline from `task.json` → `jsonl` row

---

## ✅ Done Criteria

- [x] Task → Completion → Step → Judgment → Export is functional
- [x] All schema forms pass validation
- [x] All tests + lint + typecheck pass
- [x] Export is `.jsonl`, reproducible, versioned, CI-safe
- [x] Every step tied to `task.version`, `rubricVersion`, `model`
- [x] All rows traceable back to reviewer, prompt, and schema lineage
- [x] No mock data or placeholder glue in runtime paths

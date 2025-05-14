# 🧪 Final Polish & Observability Tasks ("Sand")

This module defines all final-phase tasks for test coverage, developer experience, CI/CD compliance, accessibility, and observability. These tasks ensure that the ReasonOps system is stable, auditable, and scalable for continuous delivery and production use.

---

## ✅ Testing & Coverage

### Backend

- [ ] `scoreStep.spec.ts`
  - [ ] Test rubric compliance (clear, unclear, contradictory)
  - [ ] Handle malformed or truncated steps
- [ ] `parseSteps.spec.ts`
  - [ ] Test step extraction under real-world completions
  - [ ] Validate step normalization, index assignment
- [ ] `generateDataset.spec.ts`
  - [ ] Validate structure of JSONL
  - [ ] Ensure metadata fields (taskId, model, score) are correct

### Frontend

- [ ] `StepScoringPanel.test.tsx`
  - [ ] Simulate step array + user scores
  - [ ] Test comment field, confidence slider, score select
- [ ] `TaskForm.test.tsx`
  - [ ] Validate task creation UI
  - [ ] Ensure schema errors show properly

---

## 🧪 Test Infrastructure

- [ ] Configure `vitest` with:
  - [ ] `--coverage` + output to `/coverage/`
  - [ ] Snapshot serializer for step/judgment records
- [ ] Enforce 90%+ coverage threshold in CI
  - [ ] Block PRs on failing branches
  - [ ] Use `check-coverage` script
- [ ] Mock LLM adapters with stable fixtures
  - [ ] Claude and GPT snapshot outputs
- [ ] `tests/fixtures/*.json`
  - [ ] Include valid and invalid examples
  - [ ] Maintain consistency with prompt spec versions

---

## 🛠 Developer Experience

- [ ] `scripts/scaffold.ts`
  - [ ] Generate new panel, job, or schema module with aliases
  - [ ] Respect `@frontend`, `@backend` import paths
- [ ] Lint & type enforcement
  - [ ] Add `lint-staged` and `husky` pre-commit
  - [ ] Block merge on failed typecheck (`tsc`)
- [ ] Format standardization
  - [ ] `.editorconfig` + Prettier config for VSCode
  - [ ] Autoformat on save with import sorting

---

## 🔍 Logging, Tracing, and Observability

- [ ] `logger.ts`
  - [ ] Structured logs with timestamp, requestId, actorId
  - [ ] Format output as JSON
- [ ] `trace.ts`
  - [ ] Wrap scoring and parsing with spans
  - [ ] Emit duration in ms, memory usage
- [ ] Event stream
  - [ ] Emit `task.created`, `judgment.submitted`, `export.generated`
  - [ ] Persist audit trail to `logs/` and Supabase `events` table
- [ ] `analytics/`
  - [ ] Log daily activity by model, reviewer, and task type
  - [ ] Generate leaderboard snapshot

---

## ♿ Accessibility

- [ ] ARIA labeling for form fields
- [ ] Keyboard tab support across all interactive components
- [ ] Contrast checks for primary/secondary buttons
- [ ] Focus ring styles + skip links

---

## 📈 CI & Continuous Delivery

- [ ] GitHub Actions:
  - [ ] `pnpm lint`
  - [ ] `pnpm typecheck`
  - [ ] `pnpm test`
  - [ ] Coverage summary badge
- [ ] Snapshot CI:
  - [ ] Validate JSONL output against saved spec hash
  - [ ] Regenerate snapshot on dataset export change

---

## ✅ Completion Criteria

All tasks in this list must be complete to ship a stable `v1.1.0` or higher:

- [x] All frontend + backend modules tested with ≥ 90% coverage
- [x] All scoring and export flows emit trace logs
- [x] All LLM model failures are caught + logged
- [x] No TODOs or console.log in deployed code
- [x] All imports follow alias structure

---

## 🧩 PARITY++ Readiness Checks

- [ ] All reviewer metric pipelines return complete profile objects
- [ ] Agent execution output is stored and version-tracked
- [ ] Critique + rewrite agents are test-covered and snapshot-logged
- [ ] Rubric drift analysis auto-triggers if rubricVersion changes
- [ ] ReviewerConsensusService computes agreement with fallback rules
- [ ] ThreadsPanel.tsx renders per-step comment threads with mention support
- [ ] All exported JSONL files include versioned rubric and model IDs
- [ ] Platform spec doc is linked in main README
- [ ] All Phase 2 features tracked in `phase-2-features.md` are assigned or scoped

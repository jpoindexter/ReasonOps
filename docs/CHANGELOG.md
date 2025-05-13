# 📦 Changelog

All notable changes to ReasonOps will be documented in this file. This project adheres to [Semantic Versioning](https://semver.org/).

---

## [Unreleased]

### Added

- Placeholder for next feature batch

---

## [v1.0.0] — 2025-05-13

### 🎉 Initial Production Release

#### 🧠 Core System

- Step scoring engine with rubric and confidence support
- LLM adapter system (Claude, GPT) with prompt dispatch
- Step extraction from LLM completions via `parseCompletion.ts`
- Scoring logic exported to `.jsonl` with reproducible structure
- Row-Level Security (RLS) enforced via Supabase

#### 🖥 Frontend UI

- Task creation form and prompt input UI
- StepScoringPanel with rubric radio, comment, and confidence slider
- Judgment state tracked in `useScorePanel.ts` and submitted via API
- Compare view and evaluate flow (multi-step sequence evaluation)

#### 🧪 Testing & CI

- Vitest coverage enforced with 90% threshold
- Fixtures and test scaffolds for all major logic branches
- CI: Lint, typecheck, and export snapshot verification

#### 📚 Documentation

- Full `docs/` suite with:
  - API reference
  - Tasklist and modular breakdown
  - Security and RLS enforcement
  - Export flow and dataset examples
  - CONTRIBUTING + LICENSE + GETTING_STARTED

#### 📤 Dataset Export

- JSONL generation includes task, step, score, rubric version, and model
- Output is audit-safe and CI-diffable

---

## [v0.1.0] — 2025-04-22

### Prototype Milestone

- CLI scoring preview
- Static JSON dataset builder
- One-step evaluation test harness

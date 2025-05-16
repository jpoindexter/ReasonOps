---
author: ReasonOps System
created: '2025-05-16T10:33:34.933Z'
links: []
status: draft
tags:
  - reasonops
  - obsidian
  - enterprise
title: index
type: doc
updated: '2025-05-16T10:33:34.933Z'
visibility: public
---
# 📊 ReasonOps Dashboard — Full Feature Specification
This document provides an enterprise-grade, production-ready breakdown of all dashboard-level features in ReasonOps. It includes component behavior, filter options, user role visibility, and connected data logic.
---
## 🧩 1. Task List Panel
| Feature          | Description                                                                |
| ---------------- | -------------------------------------------------------------------------- |
| `Task list view` | Dynamic table showing all tasks visible to the user, paginated, sortable   |
| `Columns`        | Title, Model, Rubric, Prompt preview, Completion count, Status             |
| `Status tags`    | Unscored, In Progress, Complete, Re-review needed                          |
| `Sort options`   | Sort by: Last Updated, Date Created, Reviewer Assigned, Model, Score Count |
| `Inline actions` | View task, Begin scoring, Duplicate task (admin), Archive (admin)          |
| `Bulk actions`   | Select multiple tasks → Archive, Reassign, Export                          |
---
## 🔍 2. Global Search & Filter Panel
| Feature         | Description                                                       |
| --------------- | ----------------------------------------------------------------- |
| `Search bar`    | Free text search on title, prompt, tags, task ID                  |
| `Autocomplete`  | Shows recent tasks, known rubric names, known model versions      |
| `Scoped search` | Toggle: All tasks, My tasks, Flagged tasks                        |
| `Inline chips`  | Converts terms like `model:gpt-4` or `rubric:1.1` to filter pills |
### Filters
| Filter Type      | Options                                                              |
| ---------------- | -------------------------------------------------------------------- |
| `Date`           | Created, Updated, Scored — last 24h, 7d, 30d, or custom range        |
| `Reviewer`       | Self, Assigned team, Specific reviewers                              |
| `Model`          | Claude, GPT, Local (phi4, llama3.1), DeepSeek, Codestral             |
| `Rubric version` | Dropdown of available rubric versions (locked from scoring context)  |
| `Project tag`    | Domain classification (e.g. math, ethics, summarization)             |
| `Step type`      | Reasoning, Math, Retrieval, Generation (auto-tagged or admin tagged) |
| `Agreement`      | High consensus, Low consensus, Needs review                          |
---
## 🧮 3. Reviewer Metrics & Summary Tiles
| Tile Name                   | Description                                       |
| --------------------------- | ------------------------------------------------- |
| `Tasks completed this week` | Total unique tasks with >90% scored               |
| `Steps scored today`        | Step count per reviewer (self or others if admin) |
| `Median time per step`      | Reviewer or global average scoring time           |
| `Reviewer leaderboard`      | Steps scored, agreement %, rubric coverage rate   |
---
## 🧑‍💼 4. Admin Insights & Quality Control
| Feature                     | Description                                                         |
| --------------------------- | ------------------------------------------------------------------- |
| `Reviewer activity heatmap` | Days × hours vs. step count (toggle: all vs. self)                  |
| `Rubric drift trend`        | Score distribution change across versions or time                   |
| `Reviewer agreement matrix` | Task-level heatmap showing disagreement zones                       |
| `Suspicious pattern alerts` | Flags: same score used for all steps, no comments on fails          |
| `Export readiness counter`  | Tasks with validated rubric + complete step scoring + CI hash match |
| `Validation summary panel`  | Lists tasks blocked from export due to schema or rubric mismatch    |
---
## 🧾 5. Export Audit Panel
| Feature                   | Description                                                    |
| ------------------------- | -------------------------------------------------------------- |
| `Task export status`      | Pass/Fail badge, last export timestamp                         |
| `Export hash`             | SHA256 hash of last JSONL schema validated in CI               |
| `Reviewer metadata log`   | Reviewer ID, rubric version, model used, scoring time per step |
| `JSONL download`          | Export ready task → download `.jsonl` or view preview          |
| `Snapshot mismatch alert` | Shown if a new export differs from last validated snapshot     |
---
## 🧑‍⚖️ 6. User Identity & Access Controls
| Component           | Description                                                   |
| ------------------- | ------------------------------------------------------------- |
| `User badge`        | Top right identity: email or token-based reviewer ID          |
| `Role display`      | Admin, Reviewer, Observer                                     |
| `Settings shortcut` | Theme toggle, default rubric, export format                   |
| `Logout button`     | Clears Supabase session                                       |
| `Reviewer switcher` | (Admin only) switch view to another reviewer or test identity |
---
## 🔐 7. Role-Based Feature Visibility
| Role     | Visible Components                                                |
| -------- | ----------------------------------------------------------------- |
| Reviewer | Task list, filters, scoring stats, personal export metadata       |
| Admin    | All + reviewer heatmap, disagreement tiles, rubric drift analysis |
| Observer | Read-only view of all components, no export/download allowed      |
---
## ✅ Requirements for All Features
- All data must be paginated and Supabase-queryable
- Filters and search must work in tandem
- No feature should fail silently — all components must provide fallback or loading states
- All tiles and graphs must include metadata tooltips
- All interactions must log `logReviewEvent` entries where applicable
---
## 📦 Parity++ Enhancements (Phase 2+)
These additional features are recommended for full ReasonOps dashboard maturity, reflecting expectations of advanced reviewer platforms, ML observability tools, and enterprise-grade evaluation management systems.
### Dynamic Views & User Workflows
| Feature              | Description                                                                   |
| -------------------- | ----------------------------------------------------------------------------- |
| `Saved filter views` | Bookmark and label filtered dashboard states (e.g. “Low Agreement This Week”) |
| `Project folders`    | Group tasks into named sets for curation or team tracking                     |
| `Pinned tasks`       | Mark tasks for follow-up, shared review, or annotation                        |
| `Recently viewed`    | Show history of task navigation or step scoring access                        |
### Reviewer Experience + Rubric UX
| Feature                   | Description                                                    |
| ------------------------- | -------------------------------------------------------------- |
| `Rubric reference panel`  | Inline view of current rubric version + tooltip per dimension  |
| `Step score distribution` | Visual: bar chart showing score frequency across rubric levels |
| `Judgment source flag`    | Show badge for “Human”, “AutoEvaluator”, or “Critique Agent”   |
| `Multi-scorer badge`      | Indicator if step has multiple reviewer judgments              |
### Model Behavior Analytics
| Feature                        | Description                                                  |
| ------------------------------ | ------------------------------------------------------------ |
| `Step index score chart`       | Aggregates rubric score by step position (Step 1, Step 2...) |
| `Model delta trend`            | Score change per model/version combo over time               |
| `Rubric impact matrix`         | How each rubric dimension impacts final model ranking        |
| `Semantic regression detector` | Flags prompt-model pairs that degraded vs baseline           |
### Training + Export Readiness
| Feature                          | Description                                                       |
| -------------------------------- | ----------------------------------------------------------------- |
| `Training coverage estimator`    | Shows exportable prompt types by domain (RAG, logic, math)        |
| `Gold-label sufficiency checker` | Estimates if steps are ready for supervised training              |
| `Export queue dashboard`         | Live view of tasks in export queue (with snapshot hash + score)   |
| `Prompt agent recommendation`    | Suggest prompts for re-scoring or critique based on drift/failure |
All of these are Phase 2+ (🔒) features and must be linked in `phase-2-features.md` and scoped in future roadmap planning.

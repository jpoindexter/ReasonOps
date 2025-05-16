# ReasonOps Capability Map

This document outlines the high-level capabilities of the ReasonOps system. It follows modern enterprise architecture patterns to ensure secure, modular, scalable systems across functional domains and actors.

---

## 📌 Core Objective

To provide an extensible, vertically integrated platform for evaluating and scoring multi-step reasoning processes by humans and models (LLMs), while supporting auditing, analytics, export, and rubric-based alignment.

---

## 🧠 Domain Entities

| Entity       | Description                                                        |
| ------------ | ------------------------------------------------------------------ |
| Task         | Top-level reasoning assignment (includes prompt, metadata, source) |
| Step         | Individual logical segment within a task                           |
| Judgment     | Human or automated review of a step                                |
| Rubric       | Evaluation criteria, often versioned                               |
| Reviewer     | Human agent assigned to task/step scoring                          |
| Session      | Trace of a reviewer's interaction during scoring                   |
| ModelVersion | Versioned identifier for LLM-generated output                      |
| Export       | Validated, filtered exportable data (e.g., JSONL)                  |

---

## 👤 System Actors

| Role      | Permissions/Responsibilities                                  |
| --------- | ------------------------------------------------------------- |
| Admin     | Configure rubrics, review logs, export data, manage reviewers |
| Reviewer  | Score steps, flag issues, submit judgments                    |
| Agent/LLM | Generate task completions or rewrite steps                    |
| Queue     | Trigger automated scoring or snapshot validation              |
| Platform  | Observability, metrics, audit, schema versioning              |

---

## 🎯 Capabilities by Domain

### 1. 🧪 Evaluation

- Task ingestion and parsing
- Step-by-step evaluation UI
- Rubric-guided scoring
- AI rewrites for reviewer comparison
- Auto-scoring pipelines (Claude, GPT, Ollama)

### 2. 📊 Analytics & Accuracy

- Reviewer agreement heatmaps
- Accuracy drift tracking
- Reviewer-specific insights
- Calibration and benchmarking dashboards

### 3. 📝 Rubric & Versioning

- Version-controlled rubric schemas
- Inline rubric guidance and tooltips
- Rubric changelog and schema diffing
- Automated validation against rubric schema

### 4. 🧾 History & Auditing

- Judgment log API
- Reviewer session replays
- Rubric version capture
- Admin audit trail (LogReviewEvent)

### 5. 📤 Export System

- JSONL export preview
- Schema-validated export pipeline
- Export CI snapshot diff validation
- Data export readiness dashboards

### 6. 🧱 Platform Integrations

- Supabase auth/session store
- Model registry via Ollama
- Scoring queue (LLM scoring and post-processing)
- Observability hooks + telemetry

---

## 🔐 Enterprise Compliance Requirements

| Requirement       | Strategy                                                  |
| ----------------- | --------------------------------------------------------- |
| Schema safety     | All data passes Zod schema enforcement (typed validation) |
| Auditability      | Centralized log stream for all review actions             |
| Data validation   | Export schema guards and linting prior to export          |
| Reviewer trust    | Accuracy metrics and calibration                          |
| Environment split | Local vs Cloud modes with supabase/env wrappers           |

---

## ✅ MVP Vertical Slice Candidates

| Feature            | Vertical Slice Includes                                        |
| ------------------ | -------------------------------------------------------------- |
| Judgment Flow      | `schemas/`, `step/`, `judgment/`, `UI`, `LLM scoring`, `queue` |
| Reviewer Analytics | `dashboard/`, `metrics/`, `analytics/`, `hooks/`, `docs/`      |
| Export System      | `export/`, `preview/`, `jsonl/`, `validators/`, `tests/`       |
| Rubric Manager     | `rubric/`, `versioning/`, `inline-help/`, `schema/`            |

---

## 📚 Documentation & Enforcement

- Each capability must have a corresponding markdown spec: `docs/features/{feature}/index.md`
- CI must validate:
  - Schema consistency
  - Snapshot test coverage
  - Export readiness
- Each feature must be built as a self-contained vertical slice (backend → frontend → test → doc)

---

> Structured for modern enterprise scale, with schema-first enforcement and export guarantees.

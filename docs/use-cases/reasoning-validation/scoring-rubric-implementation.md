---
title: "scoring-rubric-implementation"
status: "draft"
---

# User Story: Scoring Rubric Implementation

## 🧠 ReasonOps Context

This user story is part of the ReasonOps high-assurance evaluation platform. It defines the core scoring rubric logic used across judgment workflows. The rubric allows AI and human evaluators to apply consistent, version-controlled criteria across step and task evaluation panels. It supports dynamic calibration, inline annotations, error detection, consensus scoring, and auditability to ensure accurate and explainable outputs.

## 🎯 Objective

Build a complete rubric-driven evaluation mechanism that powers every judgment within ReasonOps. This enables versioned, explainable, and traceable scoring logic for both step and task evaluation, with built-in LLM alignment and reviewer QA workflows.

## 🧑‍💻 User Role(s)

- Primary evaluators, QA, engineers, researchers.

## ✅ Acceptance Criteria

- [ ] Supports step- and task-level scoring with rubric references.
- [ ] Rubric versions are enforced and traceable per judgment.
- [ ] Reviewers and LLMs both use the same rubric infrastructure.
- [ ] Inline help and rubric prompts appear in scoring UI.
- [ ] Audit trail logs rubric version, scores, and rationale.
- [ ] Errors (e.g., blank, hallucinated, or off-rubric scores) are flagged.
- [ ] Exports include rubric metadata for each scored item.

## 📍 Steps to Implement

1. Design rubric schema (Zod).
2. Implement rubric versioning system (linked to judgments).
3. Add inline rubric help UI in step/task panels.
4. Build rubric-aware scoring logic and validations.
5. Implement audit logging and snapshot tests for rubric usage.
6. Connect scoring exports to include rubric metadata.

## 🔗 Dependencies & Integration Points

- schemas/judgment.ts
- schemas/rubric.ts
- frontend/features/step/ and task/
- backend/lib/scoring/ and services/TaskService.ts
- API endpoints: /api/judgments, /api/export

## 🚩 Edge Cases & Error Handling

- Inconsistent rubric versions between reviewers.
- Rubric prompt does not render inline.
- Score submitted without selection.
- LLM-generated score contradicts rubric.

## 🧪 Testing & Validation

- Manual and automated testing guidelines.

## 📊 Metrics & Observability

- Score distribution per rubric dimension.
- Inter-reviewer agreement per rubric version.
- Percentage of flagged rubric violations.
- Rubric prompt display rate vs skip rate.

## 🔄 Feedback Loop

Scored outputs with rubric metadata are used in:

- Evaluator QA calibration workflows
- Rubric iteration tracking (via snapshot deltas)
- Training data selection for retraining LLMs

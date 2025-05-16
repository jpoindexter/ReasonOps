---
author: ReasonOps System
created: '2025-05-16T10:33:34.961Z'
links: []
status: draft
tags:
  - reasonops
  - obsidian
  - enterprise
title: evaluation-intelligence
type: doc
updated: '2025-05-16T10:33:34.961Z'
visibility: public
---
# 🧠 Evaluation Intelligence Metrics (PARITY++ Layer)
This document defines advanced reasoning metrics for ReasonOps that power reviewer analytics, rubric evolution, and LLM evaluation benchmarking. These metrics go beyond basic score tracking to offer explainable, team-scale insights into the reasoning process.
---
## 📊 Reviewer-Centric Metrics
### `reviewerDriftIndex`
Tracks how a reviewer’s scoring behavior diverges over time compared to their historical baseline or rubric-aligned ground truth.
- **Purpose:** Detects scoring fatigue, rubric misunderstanding, or behavior shifts in individual reviewers.
- **Inputs:** `reviewerId`, `score history`, `rubricVersion`
- **Output:** Normalized drift score (0–1)
- **Usage:** Alerts reviewer managers to retraining needs or rubric confusion; supports reviewer calibration sessions.
---
### `reviewerEntropy`
Measures the consistency of a reviewer’s scoring across a rubric. Higher entropy may indicate ambiguity or lack of scoring confidence.
- **Inputs:** Rubric scores per reviewer
- **Output:** Shannon entropy value per rubric dimension
- **Usage:** Surfaces ambiguous rubric criteria or inconsistent reviewer application.
---
### `rubricUsageHeatmap`
Aggregates rubric score frequency across all reviewers and tasks to identify overused/underused labels.
- **Inputs:** `taskId`, `rubricVersion`, `reviewerId`
- **Output:** Rubric-label frequency matrix
- **Usage:** Highlights rubric criteria that require clarification or are rarely/never used.
---
## 🧪 Rubric + Evaluation Intelligence
### `rubricScoreDrift`
Compares scoring behavior across rubric versions and reviewer sessions.
- **Purpose:** Validates rubric clarity and highlights problematic rubric changes.
- **Output:** Rubric version delta chart per dimension
- **Usage:** Informs rubric revision cycles and tracks impact of rubric updates.
---
### `rubricConflictRate`
Tracks how often reviewers disagree on the same step using the same rubric version.
- **Output:** Percentage conflict per rubric criterion
- **Usage:** Triggers rubric refinement or targeted reviewer training interventions.
---
### `failureModeClustering`
Groups scored reasoning failures into latent categories (e.g. hallucination, logic error, truncation).
- **Inputs:** Reviewer comments + rubric tags
- **Output:** Clustered failure mode embeddings or tags
- **Usage:** Enables root-cause analysis, focused model improvement, and targeted reviewer education.
---
## 🤖 Model Behavior & Drift Metrics
### `modelScoreDelta`
Compares score distributions across model versions for the same task dataset.
- **Purpose:** Tracks LLM regressions, improvements, or behavioral shifts.
- **Output:** Delta heatmap between `modelA` and `modelB`
- **Usage:** Benchmarking, model selection, and regression detection.
---
### `semanticRegressionDetector`
Identifies step-level model output changes that break reasoning integrity.
- **Purpose:** Detects regressions even when final answer matches.
- **Inputs:** `completion diff`, `step score`, `step hash`
- **Output:** Regression flag with metadata
- **Usage:** Prevents silent model regressions and supports safe model deployment.
---
### `reasoningHeatmap`
Visualizes which steps consistently receive low scores across models.
- **Purpose:** Highlights systemic reasoning weak points (e.g. math, inference).
- **Output:** Task × step matrix with average score overlays
- **Usage:** Guides model retraining and rubric focus.
---
These metrics are implemented across `metrics/`, `services/ReviewerInsightsService.ts`, and visualized in `ReviewerStats.tsx` and admin dashboards.
Every metric must be:
- Schema-traceable
- Reviewer-filterable
- Rubric-version scoped
- Exportable via analytics snapshot API

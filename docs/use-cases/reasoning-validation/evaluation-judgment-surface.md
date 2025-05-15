# 🧠 ReasonOps User Story: Evaluation Judgment Surface

## Why this matters

LLMs are increasingly fluent but still fail at structured reasoning. Evaluators need a clear, consistent, and detailed interface for judging whether an AI thought well — step by step.

## The Evaluator Workflow (Real-World Synthesis)

1. Initial Context Setup

   - Understand task, inputs, rubric, expectations

2. First-Pass Trace Review

   - Skim full output for flow, structure, obvious flaws

3. Step-by-Step Analysis

   - Assess each step's logic, relevance, justification
   - Tag errors (logical, factual, missing steps, etc.)

4. Verification & Comparison

   - Against ground truth, expert path, or reference logic

5. Scoring & Tagging

   - Use rubrics (scalar, binary, Likert, hybrid)
   - Apply standardized error codes

6. Documentation & Export

   - JSONL format with metadata, trace annotations, scores

7. Consensus or Escalation
   - Handle disagreement, apply overrides, track IRR

## What They Need from the Tool

- Step trace viewer
- Inline tagging + error classification
- Rubric scoring matrix
- Side-by-side comparison (expert vs. model)
- Export panel (JSONL + schema validation)
- Reviewer role system, blind review mode
- Calibration dashboard (IRR, agreement metrics)

# 🧠 ReasonOps User Story: Evaluation Judgment Surface

## Why This Matters

Modern AI is not failing due to a lack of knowledge — it’s failing in _how it reasons_.  
LLMs produce plausible outputs that mask shallow, inconsistent, or logically invalid thinking. This is a trust gap.

**ReasonOps exists to close this gap by helping humans answer one critical question:  
_Did this AI actually reason well?_**

This page defines the complete evaluator workflow — grounded in enterprise, research, and state-of-the-practice evaluation infrastructure.

---

## 🧩 Full End-to-End Evaluation Workflow

### 1. **Preparation & Task Definition**

- Define goals: correctness? logical structure? interpretability?
- Choose rubric type: scalar, categorical, Likert, hybrid
- Prepare reference reasoning paths, task metadata, and evaluator onboarding
- Tools: rubric editors, version control, reviewer briefings

### 2. **Input Setup & Trace Context**

- Standardize prompt, input, model metadata
- Annotate task difficulty, expected depth of reasoning, domain tags
- Tools: schema validators, metadata injection tools

### 3. **Initial Review (First-Pass Skim)**

- Reviewer skims entire trace for overall structure
- Flags immediate gaps, incoherence, or hallucinations
- Useful for tagging trivial/clear cases or routing to deep review
- Tools: trace viewers, highlight flags, confidence sliders

### 4. **Step-by-Step Trace Evaluation**

- Break down trace into discrete reasoning units
- Score each step on logic, relevance, grounding, sufficiency
- Identify step dependencies, missing links, premature conclusions
- Tools: collapsible trace panels, dependency graph views, step annotation modals

### 5. **Error Tagging and Classification**

- Apply standardized tags:
  - `logic/fallacy`, `factual/hallucination`, `method/wrong_tool`, `missing_step`
- Use severity scoring and root cause notes
- Tools: tag hotkeys, typeahead classifiers, inline tooltips

### 6. **Rubric Scoring (Step + Global)**

- Per-dimension scoring: e.g., Coherence (1–5), Completeness (Pass/Fail), Grounding (Likert)
- Conditional logic: e.g., zeroing global score if critical error present
- Tools: rubric matrix editors, rubric version snapshot history

### 7. **Comparison Mode (Optional)**

- Side-by-side view of:
  - Model vs. expert path
  - Model vs. peer model
  - Versioned model runs (for regression detection)
- Tools: diff overlays, rubric delta views, chain alignment matrix

### 8. **Consensus and Escalation**

- If disagreement exists:
  - Run blind review
  - Use adjudication protocols (majority vote, escalation path)
- Tools: adjudicator interface, reviewer consensus heatmaps

### 9. **Export and Reporting**

- Output to JSONL, CSV, schema-bound exports
- Includes:
  - Per-step scores
  - Error tags
  - Reviewer metadata (anonymized)
  - Trace lineage (model version, time, params)
- Tools: export dashboard, schema validator, reporting CLI

### 10. **Feedback Loop**

- Use findings to:
  - Refine rubrics
  - Fine-tune model (with tagged trace data)
  - Improve prompts or agent strategies
- Tools: retraining set builder, rubric version diff viewer

---

## 🔬 Dimensions of Reasoning Evaluation

| Category      | What It Measures            | Example Criteria                              |
| ------------- | --------------------------- | --------------------------------------------- |
| Coherence     | Step-to-step logic, flow    | "Does each conclusion follow from the prior?" |
| Grounding     | Truthfulness and sourcing   | "Is this supported by known facts?"           |
| Sufficiency   | Coverage of required logic  | "Were any key steps skipped?"                 |
| Justification | Explanatory power           | "Did the model explain _why_?"                |
| Relevance     | Task focus, signal-to-noise | "Was this step necessary?"                    |
| Confidence    | Model’s certainty alignment | "Was unwarranted confidence shown?"           |

---

## 👥 Roles Involved

- **Evaluator**: Scores and tags reasoning
- **Reviewer/Adjudicator**: Handles disagreements or overrides
- **Calibration Lead**: Ensures inter-rater reliability (IRR)
- **Platform Admin**: Manages rubric versioning, tool access
- **Model/Prompt Engineer**: Uses feedback to improve LLM output

---

## 🔐 Governance & Quality Controls

- Rubric versioning (semantic, diffable)
- Blind review enforcement
- Inter-rater reliability (Cohen’s Kappa, Krippendorff’s Alpha)
- Access control by role
- Evaluation logging + audit trails

---

## 🛠 Tooling Requirements

- Trace viewer (collapsible, taggable, diffable)
- Rubric scoring panel (per-dimension, schema-backed)
- Step annotation interface (inline or modal)
- Comparison UI (expert vs. model)
- Reviewer consensus dashboard
- JSONL + schema-bound export options

---

## ✅ Output Structure (Minimum Fields)

```json
{
  "trace_id": "abc123",
  "model": "mistral:instruct",
  "steps": [
    {
      "text": "First, I’ll divide 12 by 3...",
      "score": { "logic": 4, "justification": 5 },
      "tags": ["correct", "complete"],
      "error_type": null
    },
    ...
  ],
  "global_score": 4.5,
  "rubric_version": "v1.2.0",
  "reviewer_id": "anon_17",
  "notes": "Minor redundancy, but otherwise sound."
}
```

---

## 🔁 How This Drives ReasonOps MVP

This workflow is the backbone of:

- The Evaluation Dashboard
- Step Viewer
- Rubric Matrix
- Tagging UI
- Export systems
- Calibration tooling

Every product feature aligns with one of these evaluator goals or workflow stages.

---

## 🎯 Evaluation Dashboard User Story

### Objective

Develop a comprehensive Evaluation Dashboard that ensures the integrity and transparency of structured reasoning evaluation. The dashboard must facilitate consistent, detailed, and reliable judgment of AI reasoning quality across all workflow stages, supporting evaluators, reviewers, and calibration leads.

### Acceptance Criteria

1. **Context and Setup Visibility**

   - Display task definitions, rubric versions, and input metadata clearly.
   - Show evaluator onboarding status and role-based access.

2. **Trace Review Interface**

   - Provide a collapsible, taggable trace viewer with highlight flags and confidence sliders.
   - Enable first-pass skim with quick tagging of trivial or critical issues.

3. **Step-by-Step Evaluation Panel**

   - Present discrete reasoning units with per-step scoring fields aligned with rubric dimensions.
   - Support inline error tagging with standardized codes and severity annotations.
   - Show dependency graphs and allow annotation modals for detailed notes.

4. **Comparison Mode**

   - Enable side-by-side comparison of model output vs. expert reference or peer models.
   - Include diff overlays and rubric delta views to highlight discrepancies.

5. **Consensus and Escalation Tools**

   - Provide blind review workflows and adjudication interfaces.
   - Visualize reviewer consensus heatmaps and track inter-rater reliability metrics.

6. **Export and Reporting**

   - Support JSONL and CSV exports adhering to schema validation.
   - Include complete metadata: per-step scores, error tags, reviewer anonymized IDs, and trace lineage.

7. **Calibration and Metrics**

   - Display IRR metrics (Cohen’s Kappa, Krippendorff’s Alpha) with trend graphs.
   - Track reasoning quality metrics, reviewer consistency, and scoring integrity over time.

8. **Feedback Loop Integration**
   - Link evaluation outcomes to rubric refinement tools and model fine-tuning pipelines.
   - Provide interfaces for submitting feedback and tracking impact on model improvements.

### Implementation Steps

- Integrate schema validators and metadata injection tools for input standardization.
- Develop the trace viewer with collapsible panels, tagging hotkeys, and confidence sliders.
- Build the rubric scoring matrix editor with version control and snapshot history.
- Implement inline step annotation modals and dependency graph visualizations.
- Create comparison UI with diff overlays and chain alignment matrices.
- Develop adjudication interfaces with blind review enforcement and consensus heatmaps.
- Build export dashboard supporting JSONL/CSV with schema validation.
- Integrate calibration dashboards showing IRR and agreement metrics.
- Connect feedback loop interfaces to retraining set builders and rubric diff viewers.

### Dependency Integrations

- Schema definitions for trace data, scoring rubrics, and metadata.
- APIs for role-based access control, versioning, and audit logging.
- External tools for IRR computation and statistical analysis.
- Model management systems for linking evaluation results to fine-tuning datasets.

### Edge Cases and Error Handling

- Handle incomplete or malformed trace data with validation warnings.
- Manage conflicting reviewer scores with escalation workflows.
- Detect and flag inconsistent rubric versions or missing metadata.
- Provide fallback views when expert reference paths are unavailable.
- Gracefully handle export failures with retry and error notifications.

### Testing Guidelines

- Manual testing of the full evaluation workflow with representative tasks.
- Automated unit and integration tests for trace viewing, scoring, tagging, and exporting.
- Simulated multi-reviewer scenarios to validate consensus and IRR calculations.
- Load testing for performance under large trace datasets.
- Security testing for role-based access and data privacy compliance.

### Metrics Definition

- Reasoning Quality: Average per-dimension scores, error tag frequency.
- Reviewer Consistency: Inter-rater reliability coefficients over time.
- Scoring Integrity: Frequency of critical error overrides and adjudications.
- Workflow Efficiency: Time spent per evaluation stage and task throughput.

### Structured Feedback Loop

- Collect evaluation data to identify rubric weaknesses and update criteria.
- Use tagged trace data to fine-tune models, reducing common error types.
- Track feedback impact via versioned rubric comparisons and model performance metrics.
- Facilitate continuous improvement through reviewer training and calibration sessions.

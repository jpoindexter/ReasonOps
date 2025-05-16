---
title: "index"
status: "draft"
---

# 🧠 ReasonOps Platform Specification (PARITY++)

This document defines the core architecture and feature map for ReasonOps as a full-featured, AI-native, reviewer-first LLM evaluation platform. It reflects parity with LangSmith, Labelbox, and HumanLoop — plus additional Figma-style UX, extensibility, and reasoning intelligence capabilities.

---

## 🎯 Product Vision

ReasonOps enables AI teams to evaluate multi-step LLM reasoning with step-level scoring, rubric enforcement, audit-grade exports, and real-time reviewer collaboration. It is designed for prompt engineers, ML researchers, and evaluation leads.

---

## 🧱 Core Platform Entities

- **Workspace**: Org-level container (users, API keys, billing)
- **Project**: Group of tasks, completions, reviewers
- **Task**: A single reasoning prompt + metadata
- **Completion**: Raw model output tied to task
- **Step**: Parsed reasoning units within a completion
- **Judgment**: Human/AI score on a step
- **Rubric**: Scoring criteria, versioned
- **Export**: JSONL representation of dataset state

---

## ✅ Core Evaluation Features

| Feature                          | Description                        |
| -------------------------------- | ---------------------------------- |
| Step-level scoring               | Score individual reasoning steps   |
| Rubric enforcement               | Version-locked, auditable          |
| Comments + justification         | Optional reviewer notes per step   |
| JSONL export                     | CI-safe dataset generation         |
| Reviewer roles (admin, reviewer) | Access control per workspace       |
| Prompt + model version tracking  | Change detection & reproducibility |
| Rubric selector per task         | Scoped rubric application          |

---

## 📊 Metrics & Intelligence

| Area                | Metric Examples                           |
| ------------------- | ----------------------------------------- |
| Reviewer metrics    | avgScore, agreement rate, drift index     |
| Task health         | step variance, rubric conflict rate       |
| Project insights    | reviewer coverage, scoring throughput     |
| Rubric intelligence | adoption rate, rubric heatmaps, evolution |
| Model comparison    | LLM score delta, regression detection     |

---

## 🤖 AI Agents

| Agent Type            | Role                               |
| --------------------- | ---------------------------------- |
| AutoScorerAgent       | Scores step using rubric           |
| CritiqueRewriteAgent  | Suggests improved step phrasing    |
| RubricExplainerAgent  | Describes rubric criteria          |
| PromptSummarizerAgent | Classifies prompt domain or intent |

---

## 🤝 Collaboration UX (Figma-style)

| Feature                  | Status                        |
| ------------------------ | ----------------------------- |
| Threads + mentions       | Reviewer comments + tagging   |
| Task feed / live updates | Real-time visibility          |
| Consensus scoring        | Agreement workflow            |
| Reviewer assignment      | Routing + task load balancing |

---

## 🧪 Evaluation Infrastructure

- Export snapshots validated in CI
- All scoring actions audit-logged
- Rubric + prompt version diffing
- Reviewer activity timeline
- Event schema + webhook emitters (planned)

---

## 🧰 Extensibility

| Feature                    | Description                      |
| -------------------------- | -------------------------------- |
| Plugin SDK (planned)       | Bring-your-own scorer            |
| Evaluation schema registry | JSONL task/step/judgment specs   |
| API keys + scopes          | CI, CLI, or agent access         |
| Webhooks                   | Task scored, export ready events |

---

## 📦 ML Dataset Outputs

- `generateTrainJSONL.ts`: fine-tune export from judgments
- `taskCompletionJoin.ts`: task-to-model input chains
- `stepJudgmentJoin.ts`: per-step data for RLAIF pipelines

---

## 🧭 Roadmap (Phased)

- **Alpha**: Core loop (task → score → export)
- **Beta**: Reviewer dashboard, metric tracking, agent scoring
- **Public**: Teams, billing, public eval sharing, SDK support

---

This spec evolves with product maturity. All features must be auditable, schema-valid, and reproducible.

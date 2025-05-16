---
title: "scoring"
status: "draft"
---

# 🪜 Step Scoring Guide

This document outlines how reasoning `Step`s are evaluated in the ReasonOps platform. Each Step is scored to assess the logical soundness, clarity, and truthfulness of the model's reasoning — either by human reviewers or AI scoring agents.

---

## 🎯 Scoring Purpose

Scoring Steps enables:

- Granular assessment of LLM reasoning chains
- Structured feedback for model fine-tuning or alignment
- Dataset creation for RLHF, QA pipelines, or multi-agent feedback loops

---

## ✅ Available Score Values

| Score           | Description                                                         |
| --------------- | ------------------------------------------------------------------- |
| `clear`         | Step is logically sound, easy to understand, and clearly expressed  |
| `unclear`       | Step is ambiguous, vague, or lacking sufficient detail              |
| `contradictory` | Step contradicts previous steps or introduces logical inconsistency |

These values are applied via UI buttons in the scoring panel or returned by LLM-based scoring agents.

---

## 🧠 Human vs AI Scoring

| Aspect       | Human Annotator                               | LLM Judge                                                    |
| ------------ | --------------------------------------------- | ------------------------------------------------------------ |
| Flexibility  | Can add comments and override presets         | Strict to scoring rubric                                     |
| Subjectivity | Prone to individual bias, allows intuition    | Deterministic, reproducible scoring if prompts are stable    |
| Speed        | Slower, best for high-trust datasets          | Faster, ideal for bulk runs and pre-labeling                 |
| Confidence   | Recorded optionally via UI or prompt metadata | Calculated via heuristic or model-generated confidence score |

---

## 🛠 UX Behavior

- Steps are rendered in `/components/StepScoringPanel.tsx`
- Each Step displays:
  - Reasoning text
  - 3 scoring buttons (`clear`, `unclear`, `contradictory`)
  - Optional comment field
- Scores are saved with the associated `Judgment` object
- Judged Steps are visually marked and cannot be rescored unless reset

---

## 🔄 Score Storage

- All scores are stored in the `Judgment` entity
- Each Step has zero or one Judgment
- Scores are versioned by timestamp (`createdAt`) and may include:
  - Reviewer ID (human)
  - Model used (AI)
  - `confidence` rating (optional)

See: [`/docs/schema/judgment/model.md`](../judgment/model.md)

---

## 🔍 Scoring Prompt (for AI)

LLM-based scorers (e.g., Claude or GPT-4) may use a rubric prompt like:

> You are reviewing AI reasoning. For the following step, return a JSON object with a score (`clear`, `unclear`, `contradictory`) and a brief justification.

This enables prompt-consistent scoring at scale and supports hybrid scoring pipelines.

---

## 🔐 Contributor Notes

- Do not store scores directly on the Step — use `Judgment`
- Keep scoring options flat; if extended, update UI + validation logic
- Use comments or metadata for secondary observations (e.g., fallacy type)

---
title: "comparison"
status: "draft"
---

# ⚖️ Multi-Model & Response Comparison Prompts

This document defines how ReasonOps supports prompt design for comparing multiple LLM completions — either across different models or prompt variants. This enables head-to-head benchmarking, preference tuning, or judgment-based selection of better reasoning.

---

## 🧠 Purpose

Comparison prompts are used to:

- Evaluate two or more completions for a single Task
- Rank or score responses by reasoning quality, clarity, or truthfulness
- Feed preference data into reward models or RLHF pipelines
- Provide structured evidence for prompt effectiveness

---

## 🔁 Comparison Use Cases

| Scenario          | Description                                    |
| ----------------- | ---------------------------------------------- |
| Multi-model eval  | Compare Claude vs GPT vs Ollama on same prompt |
| Prompt ablation   | Compare chain-of-thought vs direct answer      |
| RAG vs No-RAG     | Score retrieval-enhanced completions           |
| Human vs AI judge | Run both and analyze agreement                 |

---

## 📥 Input Format

ReasonOps compares completions linked to a single Task ID.

```json
{
  "taskId": "task_123",
  "modelA": "gpt",
  "modelB": "claude",
  "prompt": "Why should cities plant more trees?",
  "completionA": "...",
  "completionB": "..."
}
```

---

## 🧾 Prompt Template (LLM-as-Judge)

Used to instruct an LLM to score and compare two outputs:

```txt
You are an evaluator tasked with comparing two AI-generated responses to the same question.

Prompt:
[Original task prompt]

Response A:
[First model's completion]

Response B:
[Second model's completion]

Instructions:
Choose which response is clearer, more accurate, and logically stronger.

Return the result in JSON:
{
  "preferred": "A" | "B" | "equal",
  "explanation": "string",
  "confidence": 0.0–1.0
}
```

---

## ✅ Output Schema

| Field         | Type                       | Description                    |
| ------------- | -------------------------- | ------------------------------ |
| `preferred`   | `"A"`, `"B"`, or `"equal"` | Which response is better       |
| `explanation` | `string`                   | Natural language justification |
| `confidence`  | `number`                   | 0.0–1.0 confidence score       |

Store result as part of `Judgment.metadata` if used downstream.

---

## 🔍 Prompt Design Guidelines

- Use consistent instructions across all evaluations
- Anchor with rubric language ("clear", "contradictory", "step-by-step")
- Keep completions < 1000 tokens for fair evaluation
- Ensure response order (`A` vs `B`) is randomized during batch runs

---

## 🧪 Suggested Evaluation Prompt Tags

| Label             | Description                                  |
| ----------------- | -------------------------------------------- |
| `model_pair`      | Used for Claude vs GPT, etc.                 |
| `prompt_variant`  | Used for alternate prompt structures         |
| `comparison_type` | `reasoning-depth`, `clarity`, `truthfulness` |

Include these in `metadata` for traceability.

---

## 🧩 Future Extensions

- 3-way or tournament-style comparisons
- Multi-criteria scoring (clarity + correctness)
- Human reviewer override of LLM preference
- Comparison UI panel with toggle + vote

---

This module powers evaluation scenarios where reasoning quality is measured not just in isolation, but against alternatives — critical for fine-tuning and preference modeling.

---
title: "README"
status: "draft"
---

> 🧠 ReasonOps Context  
ReasonOps is a platform for evaluating reasoning quality in AI — step-by-step. It helps users inspect, score, tag, and export logical traces to improve reliability.

# ✍️ Prompt Engineering Guide (ReasonOps)

This document outlines the structured approach to prompt design and scoring logic for LLM completions in ReasonOps. It includes prompt design patterns, scoring instructions, and integration notes for Claude, GPT, and other LLMs.

---

## 🧠 Purpose

Prompt engineering in ReasonOps ensures:

- Consistent LLM outputs across tasks and sessions
- Reproducible scoring conditions for automated or hybrid evaluations
- Clear audit trail of how completions and judgments were generated
- Configurable prompt variation for benchmarking and experimentation

---

## 🧩 Model Prompt Differences

| Model  | Notes                                                                                      |
| ------ | ------------------------------------------------------------------------------------------ |
| Claude | Requires `system prompt` + natural language input; supports multi-step chain-of-thought    |
| GPT-4  | Flexible JSON output support; needs stronger rubric enforcement for scoring tasks          |
| Ollama | Local execution with simplified temperature/context controls; ideal for sandbox evaluation |

---

## 📝 Prompt Categories

| Type              | Use Case                                                        |
| ----------------- | --------------------------------------------------------------- |
| Task Prompt       | Input for completion generation (`prompt` field in Task)        |
| Scoring Prompt    | Used by LLM judge to evaluate `Step` quality                    |
| Critique Prompt   | Used to elicit explanation or feedback on reasoning flaw        |
| Comparison Prompt | Generate pairwise or multi-model comparisons (optional, future) |

---

## ✅ Standard Prompt Template: Task Completion

```txt
You are an advanced language model.

Respond to the following question in a clear, step-by-step reasoning format:

[User Task Prompt]
```

Used when calling `POST /api/llm` — ensures responses are chain-of-thought compatible.

---

## 🧠 Scoring Prompt (Claude / GPT)

Used in `LLM-as-judge` workflows to evaluate each reasoning step.

```txt
You are reviewing an AI-generated reasoning step.

Please return a JSON object with the following fields:

{
  "score": "clear" | "unclear" | "contradictory",
  "comment": "string (optional)",
  "confidence": 0.0–1.0
}

Scoring rules:
- A clear step is logically sound and well-stated
- An unclear step is vague or lacks detail
- A contradictory step opposes earlier logic or claims
```

---

## 🎯 Prompt Best Practices

- Include model + version tag in `metadata`
- Log prompt version (e.g. `v1.0.2`) for reproducibility
- Use system prompts consistently across completions and judges
- Avoid open-ended output unless required
- For scoring prompts, enforce JSON output format

---

## 🛠 Contributor Guidelines

- All LLM usage must use a prompt from this guide or reference it in `metadata`
- Update prompt templates only when approved in `/docs/schema/versioning.md`
- When creating new scoring rubrics, propose example completions and scoring justifications

---

## 📚 Related Files

- [`llmAdapter.ts`](../lib/llmAdapter.ts) – routes prompts to Claude/GPT/Ollama
- [`/docs/schema/judgment/scoring.md`](./schema/judgment/scoring.md) – defines scoring values
- [`/docs/schema/dataset-format.md`](./schema/dataset-format.md) – scoring output structure

---

This guide is the canonical source of truth for all prompt generation in ReasonOps.

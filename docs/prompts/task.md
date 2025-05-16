---
title: "task"
status: "draft"
---

# 📝 Task Prompt Design Guide

This document defines the standards and patterns for designing task-level prompts in ReasonOps. A Task prompt initiates an LLM response and anchors all subsequent reasoning, scoring, and evaluation workflows.

---

## 🧠 Purpose

Task prompts are:

- The initial input to the LLM (Claude, GPT, Ollama, etc.)
- Stored within each `Task` object in the database
- Used to generate `Completion` responses
- The foundation for downstream Step parsing and scoring

Well-formed task prompts are essential for generating clear, evaluable reasoning.

---

## ✅ Prompt Design Principles

| Principle       | Description                                                |
| --------------- | ---------------------------------------------------------- |
| Clarity         | The prompt should be unambiguous and complete              |
| Relevance       | The prompt should relate to a reasoning-based topic        |
| Evaluability    | The LLM's response must be decomposable into logical steps |
| Neutral framing | Avoid biasing the model toward one answer or tone          |
| Task scoping    | Prompt should ideally yield a ~200–500 word response       |

---

## 🧾 Prompt Template (Basic Form)

Used when submitting a new task via `TaskForm.tsx` or API:

```txt
Why should [subject] [take action or hold a belief]?

Examples:
- Why should cities plant more trees?
- Why should governments regulate AI development?
- Why do some people oppose universal basic income?
```

Prompts may be phrased as:

- Open-ended questions
- Counterfactuals
- Ethical dilemmas
- Socratic setups

---

## 🧪 Model Compatibility

Prompt should be model-agnostic, but adapted as needed:

| Model  | Considerations                                        |
| ------ | ----------------------------------------------------- |
| Claude | Benefits from conversational tone and system prompts  |
| GPT-4  | Handles logic-heavy prompts; avoid long system chains |
| Ollama | Keep prompts concise and focused for local models     |

---

## 🔍 Metadata Usage

Prompts can be enriched with metadata for filtering, audit, and training purposes:

```json
{
  "prompt": "Why should cities plant more trees?",
  "model": "claude",
  "metadata": {
    "topic": "environment",
    "intent": "policy evaluation",
    "format": "open-ended"
  }
}
```

---

## 🚫 Anti-Patterns

| Issue             | Avoid                                           |
| ----------------- | ----------------------------------------------- |
| Leading language  | “Don’t you agree that…”                         |
| Trivial questions | “What color is the sky?”                        |
| Excessive length  | Prompts > 100 words                             |
| Yes/No phrasing   | “Is this a good idea?” (lacks evaluation scope) |

---

## 🔐 Prompt Traceability

| Field                               | Where Used                                                    |
| ----------------------------------- | ------------------------------------------------------------- |
| `Task.prompt`                       | Source field                                                  |
| `Completion.metadata.promptVersion` | Optional for prompt evolution tracking                        |
| `taskId`                            | Linked through all stages to track completion/scoring lineage |

---

## ✅ Contributor Guidelines

- Prompt changes post-submission should result in a new `Task` version
- Prompts should be stored cleanly (no system prompt or model artifacts)
- When testing new formats, document in `/prompts/README.md`
- Pair prompt updates with scoring validation (e.g., 3 sample completions)

---

This guide ensures ReasonOps prompts are structured, evaluable, and consistent across the full LLM reasoning pipeline.

# 🪞 Critique Prompting Guide

This document defines how ReasonOps uses prompts to elicit critiques of model reasoning. Critique prompting enables LLMs or human reviewers to identify flaws, fallacies, and improvement opportunities within individual reasoning steps or full completions.

---

## 🧠 Purpose

Critique prompts help ReasonOps:

- Uncover logical flaws and inconsistencies in reasoning
- Support model self-evaluation or peer feedback
- Provide structured fallacy classification and suggested rewrites
- Enable alignment tuning based on failure patterns

---

## 🔁 Critique Use Cases

| Scenario         | Description                                          |
| ---------------- | ---------------------------------------------------- |
| Self-critique    | Claude or GPT critiques its own output               |
| Peer critique    | Model A critiques Model B                            |
| Multi-agent eval | Judges analyze opponent’s steps                      |
| QA audit         | Reviewer flags for contradiction, vagueness, or bias |

---

## 🧾 Prompt Template: Single-Step Critique

```txt
You are a reasoning evaluator.

Given the following reasoning step, identify any logical issues and suggest improvements.

Step:
"[reasoning step text]"

Return JSON:
{
  "issue": "string (e.g., 'vague claim', 'missing evidence', 'contradiction')",
  "explanation": "string",
  "suggested_rewrite": "string",
  "confidence": 0.0–1.0
}
```

---

## ✅ Output Schema

| Field               | Type     | Description                            |
| ------------------- | -------- | -------------------------------------- |
| `issue`             | `string` | Fallacy label or reasoning flaw        |
| `explanation`       | `string` | Why it’s flawed or suboptimal          |
| `suggested_rewrite` | `string` | Rewritten step that corrects the issue |
| `confidence`        | `number` | 0.0–1.0 certainty score                |

---

## 🧩 Critique Types

| Label                | Description                                  |
| -------------------- | -------------------------------------------- |
| `vague`              | Step lacks specificity or clarity            |
| `unsupported claim`  | Assertion made without evidence              |
| `contradiction`      | Conflicts with prior steps or task logic     |
| `circular reasoning` | Step refers to its own claim as proof        |
| `bias`               | Introduces subjective or unjustified opinion |

These can be used in `Judgment.metadata.critique` or downstream QA dashboards.

---

## 🧪 Example

Input:

```
"Trees are important because they are good for the planet."
```

Critique Response:

```json
{
  "issue": "vague",
  "explanation": "The statement is overly general and lacks actionable insight.",
  "suggested_rewrite": "Trees reduce urban heat by providing shade and releasing moisture.",
  "confidence": 0.91
}
```

---

## 🔧 Integration Notes

- Critique results may be attached to existing `Judgment.metadata`
- LLMs can critique their own or peer completions
- `suggested_rewrite` can be used in evaluation UI (toggle original vs rewrite)
- Confidence can be used to rank top critique candidates

---

## 📄 Contributor Guidelines

- All critique prompts should follow the template above
- Prompt variations must be versioned in `/prompts/README.md`
- Critique feedback should never overwrite original Step text
- Use test fixtures for edge cases (e.g., sarcasm, idioms, compound logic)

---

Critique prompting allows ReasonOps to reason about reasoning — surfacing weaknesses that raw scores might miss and unlocking deeper insights into LLM behavior.

# 🧠 Claude-Specific Scoring Rubric

This document defines the scoring rubric and structured prompt format used when Claude is acting as a step-level reasoning evaluator within ReasonOps. This supports consistent, explainable, and reproducible judgments across tasks.

---

## 🎯 Purpose

Claude scoring prompts enable:

- Structured JSON scoring responses (`clear`, `unclear`, `contradictory`)
- Reproducibility of judgment behavior
- Confidence metadata for export analysis
- Explanation consistency for audit and feedback loops

---

## ✅ Rubric Definitions

| Score           | Criteria                                                          |
| --------------- | ----------------------------------------------------------------- |
| `clear`         | Step is precise, logically coherent, and supports the task prompt |
| `unclear`       | Step is vague, ambiguous, or under-explained                      |
| `contradictory` | Step directly conflicts with prior logic, facts, or itself        |

---

## 📝 Scoring Prompt Template (Claude)

```txt
You are scoring the reasoning quality of an AI-generated statement.

Respond using ONLY the following JSON schema:

{
  "score": "clear" | "unclear" | "contradictory",
  "comment": "string (1–2 sentences explaining the judgment)",
  "confidence": 0.0–1.0
}

Scoring rubric:
- A clear step is well-stated and logically consistent.
- An unclear step is vague, lacks support, or is hard to interpret.
- A contradictory step includes logical conflict or known error.

Step to score:
"[insert step text here]"
```

---

## 🔍 Claude-Specific Instructions

| Field        | Note                                                                                         |
| ------------ | -------------------------------------------------------------------------------------------- |
| `comment`    | Claude is encouraged to justify in 1–2 sentences. Avoid repeating the step.                  |
| `confidence` | Claude may infer based on clarity of logic. Encourage values `0.7+` for confident responses. |
| `score`      | Must match one of the three rubric values exactly (`"clear"`, etc.)                          |

---

## 🧪 Example Output

```json
{
  "score": "unclear",
  "comment": "The statement refers to benefits but does not explain how they work in context.",
  "confidence": 0.82
}
```

---

## 🧩 Prompt Versioning

Claude prompt templates must:

- Be versioned explicitly (e.g. `v1.2.1`)
- Include version metadata in `Judgment.metadata`
- Be documented in `/prompts/README.md`

---

## 🛡 Audit Requirements

- Claude's raw JSON response must be stored for re-auditing
- Score must not be altered after submission
- Prompt text and model version must be recorded in export logs

---

## 📄 Contributor Notes

- Prompt variations must be tested with at least 3 steps of varying quality
- Prompts must include clear JSON structure requirements
- Use `stepId` and `taskId` in logs to trace Claude evaluations
- Avoid scoring prompts that exceed Claude context limits

---

This Claude rubric ensures alignment between LLM evaluation logic and ReasonOps’ scoring principles — built for structured, scalable reasoning QA.

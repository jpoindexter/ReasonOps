---
title: "index"
status: "draft"
---

# 🧪 Benchmark Integrity & Anti-Contamination Policy

This document explains how ReasonOps ensures trustworthy, reproducible evaluations for reasoning benchmarks. It outlines how we guard against data leakage, overfitting, prompt abuse, and schema drift — aligning with best practices used by frontier labs like Scale AI and Anthropic.

---

## 🔐 Why This Matters

Most large models are trained on public datasets, making benchmark contamination easy. Many "leaderboard" scores reflect memorization, not generalization.

ReasonOps treats evaluation like a scientific process:

- Version-controlled prompts
- Sealed judgment schemas
- Auditable JSONL exports
- Zero tolerance for contaminated scoring flows

---

## 📦 Evaluation Isolation Pipeline

Every ReasonOps task passes through the following immutable stages:

1. **Task Created**
   - Prompt version and metadata frozen
   - Task ID assigned
2. **Completion Collected**
   - Raw model response stored (timestamped)
   - Linked to task version
3. **Step Extraction**
   - Each step normalized via `normalizeText.ts`
   - Steps indexed and locked
4. **Judgment Applied**
   - Manual or model-scored rubric judgment
   - Stored with `rubricVersion`, `model`, `confidence`
5. **Export Generated**
   - Output structured via `generateDataset.ts`
   - Stored as `.jsonl` (versioned, hashed, diffable)

---

## 🧾 Versioning Guarantees

| Artifact       | Tracked By               | Example              |
| -------------- | ------------------------ | -------------------- |
| Prompt         | `task.version`           | `"1.0.2"`            |
| Rubric         | `rubricVersion`          | `"v1.0.0"`           |
| Model Identity | `judgment.model`         | `"claude"`           |
| Step Hashing   | `stepId` + content index | `"step_0021ff"`      |
| Export         | CI snapshot diff         | `dataset_v1.1.jsonl` |

All scoring pipelines are snapshot tested for schema integrity.

---

## 📚 Schema-Level Safety

Each `.jsonl` export includes:

```json
{
  "taskId": "task_abc123",
  "version": "1.0.3",
  "prompt": "...",
  "step": {
    "text": "...",
    "index": 0
  },
  "judgment": {
    "score": "clear",
    "comment": "...",
    "rubricVersion": "v1.0.0",
    "model": "claude"
  }
}
```

This guarantees reproducibility, per-step audit, and anti-drift protection.

---

## 🛡 Prompt Drift Protection

- Prompts are never edited after task creation
- Modifications require new `task.version`
- Every exported row must match prompt-version lineage

---

## 🔍 Auditability

All exports:

- Include `createdAt` timestamps
- Link judgments → steps → task → prompt version
- Are validated via CI (schema diff + format lint)
- Are stored with commit + model lineage for replay

---

## 🔁 Contamination Controls

| Threat                          | Mitigation                            |
| ------------------------------- | ------------------------------------- |
| Prompt leakage to training sets | Use private unreleased prompt pools   |
| Rubric overfit via repetition   | Version-controlled rubric updates     |
| LLM score hallucination         | Require rubric + comment + confidence |
| Benchmark drift                 | Snapshotted JSONL enforced in CI      |
| Model impersonation             | Reviewer token + `model` field locked |

---

## 📤 SEAL-Ready Extensions (Future Work)

- Holdout task pools (never shown to reviewers)
- Private benchmark sets (rotated monthly)
- Model performance scorecards (per rubric version)
- Multi-agent inter-judge agreement metrics

---

## 📎 Related

- [`generateDataset.ts`](../../backend/exporters/jsonl/generateDataset.ts)
- [`rubricVersion`](../../docs/prompts/)
- [`dataset-format.md`](../schema/dataset-format.md)
- [`judgment.json`](../examples/judgment.json)
- [`scoreStep.ts`](../../backend/lib/scoring/scoreStep.ts)

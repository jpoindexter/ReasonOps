---
author: ReasonOps System
created: '2025-05-16T10:33:34.981Z'
links: []
status: draft
tags:
  - reasonops
  - obsidian
  - enterprise
title: audit
type: doc
updated: '2025-05-16T10:33:34.981Z'
visibility: public
---
# 🔍 ReasonOps Audit & Traceability Protocol
This document outlines the auditability and compliance guarantees within the ReasonOps platform. As a system designed to evaluate and log human and AI judgment over model reasoning, ReasonOps enforces strict immutability, reviewer traceability, and versioned evaluation data for audit and safety compliance.
---
## 🧠 Purpose of Audit Protocol
Auditing in ReasonOps ensures:
- Immutable records of who scored what, when, and how
- Transparent scoring provenance (human or AI)
- Dataset integrity for regulatory, enterprise, or academic scrutiny
- Reproducibility of evaluation decisions across model versions and task variants
---
## 🔗 Entities Covered
Auditing applies to the following core objects:
| Entity       | Trace ID Source                           | Notes                                           |
| ------------ | ----------------------------------------- | ----------------------------------------------- |
| `Task`       | `id`, `version`                           | Changes result in new task version              |
| `Completion` | `id`, `taskId`, `model`                   | Completion records are immutable                |
| `Step`       | `id`, `completionId`                      | Step text cannot be changed post judgment       |
| `Judgment`   | `id`, `stepId`, `createdBy`, `confidence` | Immutable once created; fork if override needed |
---
## 🔐 Reviewer Traceability
| Field       | Required | Description                                                            |
| ----------- | -------- | ---------------------------------------------------------------------- |
| `createdBy` | ✅       | Required on every `Judgment`, identifies the reviewer (human or model) |
| `createdAt` | ✅       | Time of scoring event (UTC ISO string)                                 |
| `metadata`  | ✅       | Must contain AI system parameters (if `createdBy` is model)            |
Trace IDs must be unique per reviewer session or automated scoring run.
---
## 🛑 Mutation Policy
ReasonOps enforces **immutable evaluation flow**:
- `Judgment` objects cannot be modified once stored
- Re-scoring a Step requires creating a new Judgment version
- `Completion` text and parsed `Step`s are locked after scoring begins
- `Task` changes require a new version (`version++`)
This guarantees that all evaluation data can be trusted and compared across time.
---
## 🧠 LLM-Specific Audit Considerations
When using LLMs for scoring:
- Prompt templates must be version-controlled and traceable
- Returned scores must include the full scoring JSON in `metadata`
- Model identifier (e.g., `claude-2.1`) and runtime settings (`temperature`, `max_tokens`) must be recorded
- If confidence scores are generated, they must be stored in `confidence`
This ensures that LLM-based judgments are interpretable and can be reconstructed or compared downstream.
---
## 🗃️ Retention and Data Lineage
All evaluation artifacts must support:
- Export to JSONL
- Attachment of lineage metadata (`taskGroup`, `annotatorRole`, `sessionId`)
- Reproducibility for dataset releases, experiments, or fine-tuning pipelines
Raw JSON evaluation chains must be serializable and linkable to `Task → Completion → Step → Judgment`.
---
## 📌 Summary
ReasonOps prioritizes traceable, reproducible, and secure scoring flows. Auditing is a first-class concern designed to meet:
- Internal QA requirements
- External client review or compliance checks
- Alignment evaluation in enterprise LLM deployments

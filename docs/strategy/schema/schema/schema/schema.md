---
author: ReasonOps System
created: '2025-05-16T10:33:34.996Z'
links: []
status: draft
tags:
  - reasonops
  - obsidian
  - enterprise
title: platform-roadmap
type: doc
updated: '2025-05-16T10:33:34.996Z'
visibility: public
---
# 🧠 ReasonOps Platform Roadmap (PARITY++ Master Spec)
This roadmap defines all critical features for building ReasonOps as a category-defining reasoning evaluation platform. It includes features from core human-AI evaluation flows, reviewer collaboration, extensibility infrastructure, and long-term ecosystem plays.
---
## ✅ Layer 1: Core Evaluation MVP
| Feature                                | Category        | Status     |
| -------------------------------------- | --------------- | ---------- |
| Step-by-step scoring w/ rubric         | Evaluation Loop | ✅ Live    |
| Multi-model output comparison          | Evaluation Loop | ✅ Live    |
| Prompt + completion versioning         | Evaluation Loop | ✅ Live    |
| Human scoring + comment threads        | Reviewer UX     | ✅ Partial |
| JSONL export for dataset generation    | Training Export | ✅ Live    |
| Python SDK for task/upload/eval/export | Developer Tools | 🟡 Planned |
| Reviewer tokens + role system          | SaaS / Infra    | ✅ Live    |
| Audit logs per judgment                | Governance      | ✅ Live    |
| Evaluation snapshot CI                 | Governance      | ✅ Live    |
---
## 🔁 Layer 2: Platform Features
| Feature                            | Category             | Status         |
| ---------------------------------- | -------------------- | -------------- |
| AI scoring agents (rubric-aligned) | Agent Infrastructure | ✅ Scaffolded  |
| Agent critique + justification UI  | Agent Infrastructure | 🟡 Scaffolded  |
| Reviewer drift tracking / entropy  | Metrics              | ✅ Scaffolded  |
| Reviewer consensus scoring logic   | Reviewer UX          | ✅ Scaffolded  |
| Rubric usage heatmaps              | Metrics              | ✅ Scaffolded  |
| Threads + mentions (per-step)      | Reviewer UX          | ✅ Scaffolded  |
| Prompt engineering workspace       | PromptOps            | ❌ Planned     |
| Export filtering by rubric/score   | Training Export      | ❌ Planned     |
| CLI tool for eval + export         | Developer Tools      | ❌ Planned     |
| Local model integration via Ollama | Agent Infrastructure | 🟡 In Progress |
| Work queues + task assignment      | Reviewer UX          | ❌ Planned     |
---
## 🌐 Layer 3: Ecosystem & Extensibility
| Feature                                 | Category        | Status     |
| --------------------------------------- | --------------- | ---------- |
| Plugin SDK for scorers / metrics        | Ecosystem       | ❌ Planned |
| Task importers from other eval tools    | Ecosystem       | ❌ Planned |
| Public benchmark / gallery sharing      | Community       | ❌ Planned |
| Webhooks + outbound triggers            | Developer Tools | ❌ Planned |
| Prompt-replay evaluator (version drift) | PromptOps       | ❌ Planned |
| HuggingFace / Trulens integrations      | Ecosystem       | ❌ Planned |
| Evaluation schema registry              | Ecosystem       | ❌ Planned |
---
## 🚀 Layer 4: Innovation & Intelligence
| Feature                                   | Category             | Status     |
| ----------------------------------------- | -------------------- | ---------- |
| Reasoning heatmaps (step-level analytics) | Metrics              | ❌ Planned |
| Failure mode taxonomy builder             | Reviewer UX          | ❌ Planned |
| Auto-suggest rubric refinements           | Agent Infrastructure | ❌ Planned |
| Red-teaming agent / stress tester         | Agent Infrastructure | ❌ Planned |
| Evaluation ROI dashboards                 | Admin Intelligence   | ❌ Planned |
| Predictive evaluation planner             | Research             | ❌ Planned |
| Industry-specific eval templates          | Community            | ❌ Planned |
---
This document serves as the master reference for ReasonOps development priorities and parity tracking. See also:
- `phase-2-features.md` — granular UI/infra build targets
- `reasonops-platform-spec.md` — architectural breakdown

## Auto-generated Links

- [[roadmap.md]]
- [[core_evaluation_mvp.md]]
- [[(step-by-step scoring w/ rubric).md]]
- [[(multi-model output comparison).md]]
- [[(prompt + completion versioning).md]]
- [[python sdk for task upload export.md]]
- [[reviewer tokens role system.md]]
- [[audit logs per judgment.md]]
- [[evaluation snapshot CI.md]]
- [[layer_2_platform_features.md]]
- [[(AI scoring agents (rubric-aligned)).md]]
- [[(agent critique justification UI).md]]
- [[(reviewer drift tracking entropy).md]]
- [[(reviewer consensus scoring logic).md]]
- [[(rubric usage heatmaps).md]]
- [[(threads mentions per-step).md]]
- [[cli tool for eval export.md]]
- [[public benchmark gallery sharing.md]]
- [[webhooks outbound triggers.md]]
- [[layer_3_ecosystem_and_extensibility.md]]
- [[plugin sdk for scorers metrics.md]]
- [[task importers from other eval tools.md]]
- [[huggingface trulens integrations.md]]
- [[evaluation schema registry.md]]
- [[layer_4_innovation_intelligence.md]]
- [[(reasoning heatmaps step-level analytics).md]]
- [[(failure mode taxonomy builder).md]]
- [[(auto-suggest rubric refinements).md]]
- [[(red-teaming agent stress tester).md]]
- [[evaluation ROI dashboards.md]]
- [[predictive evaluation planner.md]]
- [[industry-specific eval templates.md]]

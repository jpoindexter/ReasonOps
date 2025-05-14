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

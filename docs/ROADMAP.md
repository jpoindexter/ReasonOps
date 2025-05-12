# 🗺 ReasonOps Development Roadmap

This roadmap defines the phased development plan for ReasonOps — a platform for reasoning evaluation, scoring, and export. It includes core system milestones, internal tooling, evaluation logic, ecosystem expansion, and enterprise deployment.

---

## ✅ Phase 1: MVP Core System (Complete)

| Area       | Feature                                                 |
| ---------- | ------------------------------------------------------- |
| Schema     | Task, Completion, Step, Judgment models with Zod + docs |
| Evaluation | Manual step-level scoring (UI + export)                 |
| Frontend   | Task creator, scoring interface, completion viewer      |
| Backend    | LLM adapter (Claude, GPT, Ollama), API routes           |
| Storage    | Supabase Postgres integration                           |
| Export     | JSONL format, schema v1.0.0                             |
| Docs       | Full production-ready schema & system documentation     |

---

## 🚧 Phase 2: Internal Tooling + DX

| Area       | Feature                                                     |
| ---------- | ----------------------------------------------------------- |
| Testing    | Snapshot tests, component tests, export contract validation |
| CLI Tools  | `export`, `score`, and `parse` utilities                    |
| Dataset QA | Validation scripts, confidence filters, export preview      |
| Test Seeds | Sample completions + judgments for dev + demo               |

---

## 🧠 Phase 3: Evaluation Logic Expansion

| Area                 | Feature                                        |
| -------------------- | ---------------------------------------------- |
| AI Judge             | Claude/GPT scoring pipeline via prompt         |
| Prompt Registry      | Reusable, versioned prompt templates           |
| Multi-Model Eval     | Compare completions across models              |
| Reviewer Analytics   | Annotator agreement, disagreement flags        |
| Structured Critiques | Reasoning chain rewrites, scoring explanations |

---

## 📦 Phase 4: Production Features

| Area            | Feature                                       |
| --------------- | --------------------------------------------- |
| Auth & Access   | Clerk or Supabase Auth + RBAC                 |
| Multi-Project   | Project IDs, workspace switcher               |
| Export Service  | Download center, signed URL JSONL             |
| UI Refinement   | Evaluation status badges, completion filters  |
| Background Jobs | Cron-driven model runs and parsing            |
| Cloud Packaging | Docker + custom deploy targets (Railway, AWS) |

---

## 🔗 Phase 5: Ecosystem & Open Source

| Area             | Feature                                           |
| ---------------- | ------------------------------------------------- |
| OSS Mode         | Export public-core repo, update license           |
| Plugin Framework | Add new scorers, adapters, data processors        |
| Eval SDK         | NPM package for JSONL eval parsing                |
| Docs Portal      | Live schema explorer, sandbox viewer              |
| AI Ops Bridge    | Connect to fine-tuning or eval queues via webhook |

---

## 🧭 Long-Term Vision

- LLM Evaluation-as-a-Service (EaaS)
- AI safety + reasoning alignment audit mode
- Agent reasoning tracking tools
- Benchmarking suite (HELMeval-compatible)
- Fine-tune dataset authoring for internal or OSS models

---

## 🧪 Roadmap Rules

- All major features must:
  - Include schema update (if applicable)
  - Be tested and export-compatible
  - Include a UI + CLI usage path
  - Update documentation and versioning files

For architectural guidance, see [`docs/ARCHITECTURE.md`](./ARCHITECTURE.md).

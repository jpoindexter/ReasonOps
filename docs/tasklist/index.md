---
author: ReasonOps System
created: '2025-05-16T10:33:34.998Z'
links: []
status: draft
tags:
  - reasonops
  - obsidian
  - enterprise
title: index
type: doc
updated: '2025-05-16T10:33:34.998Z'
visibility: public
---
# ✅ ReasonOps Task System
This directory defines the complete modular task breakdown for the ReasonOps platform. All project-level tasks are grouped and structured to support a monorepo, production-grade architecture with full LLM evaluation pipelines.
Each task domain reflects an enterprise delivery pattern using the "pickle jar theory" — big rocks (core LLM infra), supporting pebbles (frontend, adapters, exports), and final sand (CI, a11y, polish).
---
## 🧩 Extended Task Phases (PARITY++)
In addition to the core tasklist above, the following extensions track platform-wide, post-MVP features—including metrics, AI agents, and extensibility for future vertical slices:
| File                                                                                       | Scope Covered                                  |
| ------------------------------------------------------------------------------------------ | ---------------------------------------------- |
| [`phase-2-features.md`](./phase-2-features.md)                                             | Reviewer collaboration, plugin SDK, agent loop |
| [`../architecture/reasonops-platform-spec.md`](../architecture/reasonops-platform-spec.md) | Platform entities, API layers, feature roadmap |
These files support reasoning intelligence, agent infrastructure, extensibility, and future SaaS delivery layers.
---
## 📦 Tasklist Modules
| File                         | Scope Covered                                                 |
| ---------------------------- | ------------------------------------------------------------- |
| [`setup.md`](./setup.md)     | Initial project setup, tooling enforcement, monorepo contract |
| [`rocks.md`](./rocks.md)     | Core LLM system: scoring, adapters, services, backend APIs    |
| [`pebbles.md`](./pebbles.md) | Frontend panels, adapters, Zod schemas, export helpers        |
| [`sand.md`](./sand.md)       | CI, testing, DX, observability, logging, a11y                 |
| [`deploy.md`](./deploy.md)   | Production deployment, tagging, snapshot validation           |
---
## 🧱 Structure & Guidelines
- All task files use `[ ]` checklist format for developer handoff
- Every task must include function names or implementation targets
- Each task should complete a vertical slice (API + schema + service + test)
- Pull requests must link to completed checklist items
- No checklist item should exist without a path-mapped module in `/backend/`, `/frontend/`, or `/docs/`
---
## 🧠 Ownership Model
| Area              | Owner                                           |
| ----------------- | ----------------------------------------------- |
| Scoring logic     | Backend lead                                    |
| Export + dataset  | Infrastructure or data pipeline owner           |
| UI panels         | Frontend developer or design system contributor |
| Adapters          | Infra or model ops lead                         |
| CI, a11y, linting | DX/infra maintainer or tech lead                |
---
## 🔄 Feature Completion Protocol
To be considered **done**, a feature task must:
- [x] Be implemented in the correct modular path (`api/`, `lib/`, `services/`, etc.)
- [x] Have associated tests and fixtures
- [x] Produce schema-compliant output
- [x] Be tracked in version control and linked to release
- [x] Pass CI and snapshot validation
- [x] Update documentation and contributor handoff flow if needed
---
## 🔐 Enforcement
The tasklist is considered a binding system document. If a checklist item is skipped or implemented in violation of project structure, it must be redefined and approved via PR in this folder.
Contributors: use these files as your source of truth for ReasonOps feature development.

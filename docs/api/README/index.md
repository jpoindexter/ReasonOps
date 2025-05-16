---
author: ReasonOps System
created: '2025-05-16T10:33:34.879Z'
links: []
status: draft
tags:
  - reasonops
  - obsidian
  - enterprise
title: index
type: doc
updated: '2025-05-16T10:33:34.879Z'
visibility: public
---
# 📡 ReasonOps API Reference Index
This index documents all API endpoints exposed by the ReasonOps platform. It is organized by resource type and aligns with internal schema logic and platform evaluation workflows.
All endpoints conform to RESTful naming conventions and use `application/json` payloads unless otherwise specified.
---
## 🔗 Route Summary
| Endpoint                    | Method | Description                               |
| --------------------------- | ------ | ----------------------------------------- |
| `/api/task`                 | POST   | Create a new reasoning task               |
| `/api/llm`                  | POST   | Generate a model completion for a Task    |
| `/api/step/parse`           | POST   | Parse a Completion into Step units        |
| `/api/judgment`             | POST   | Submit a score/comment for a Step         |
| `/api/export/tasks/:taskId` | GET    | Export task-level dataset in JSONL format |
---
## 📘 Per-Route Documentation
| Route Group    | Link                                 |
| -------------- | ------------------------------------ |
| Tasks          | [`tasks.md`](./tasks.md)             |
| Completions    | [`completions.md`](./completions.md) |
| Steps          | [`steps.md`](./steps.md)             |
| Judgments      | [`judgments.md`](./judgments.md)     |
| Export         | [`export.md`](./export.md)           |
| Auth (planned) | [`auth.md`](./auth.md)               |
---
## 🔐 Auth Status
| Route Type       | Auth Required | Notes                                  |
| ---------------- | ------------- | -------------------------------------- |
| `POST /task`     | ❌ (dev only) | Auth planned via Supabase/Clerk        |
| `POST /judgment` | ✅ (planned)  | All judgments must include `createdBy` |
| `GET /export`    | ✅ (prod)     | Only accessible to reviewers or owners |
---
## ⚙️ API Design Principles
- All routes are namespaced under `/api/`
- Input and output shapes validated via Zod
- Write operations are append-only (`POST`)
- Idempotency not required — each judgment/export is a unique event
- Export schema follows versioning contract in [`/docs/schema/versioning.md`](../schema/versioning.md)
---
## 📦 Export Format
For JSONL export schema, see:
- [`/docs/schema/dataset-format.md`](../schema/dataset-format.md)
---
## 🧪 Testing / CI
- Each endpoint is covered by Vitest tests in `/tests/*`
- Snapshot coverage is applied to export rows
- API contract tests validate schema conformance
---
## 🧩 Contributor Notes
- Update individual route docs in `/docs/api/*.md`
- Ensure changes align with schemas in `/docs/schema/*`
- If introducing a new route, ensure it:
  - Has Zod validation
  - Writes audit metadata if applicable
  - Supports test mocking via fixtures
---
This index is maintained alongside the live platform schema. Open a PR to update or extend endpoint definitions.

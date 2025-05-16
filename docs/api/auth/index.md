---
author: ReasonOps System
created: '2025-05-16T10:33:34.880Z'
links: []
status: draft
tags:
  - reasonops
  - obsidian
  - enterprise
title: index
type: doc
updated: '2025-05-16T10:33:34.880Z'
visibility: public
---
# 🔐 ReasonOps Auth API (Planned)
This document defines the planned authentication and access control API surface for ReasonOps. While current endpoints are open for development, these auth layers will govern user access, team roles, scoring attribution, and secure API usage in production.
---
## 🧠 Purpose
Auth support in ReasonOps will enable:
- User identity for reviewer traceability (`Judgment.createdBy`)
- Role-based access control for multi-tenant projects
- API security for LLM submission, scoring, and export
- Team workflows with permission boundaries
---
## 📥 Planned Endpoints
| Method | Route               | Description                                |
| ------ | ------------------- | ------------------------------------------ |
| `POST` | `/api/auth/login`   | Authenticate and issue JWT for user/client |
| `POST` | `/api/auth/logout`  | Clear auth session or token                |
| `GET`  | `/api/auth/session` | Retrieve current session (dev + debugging) |
---
## 🔑 Auth Strategy
| Layer               | Approach                                                            |
| ------------------- | ------------------------------------------------------------------- |
| Identity            | Supabase Auth or Clerk                                              |
| Tokens              | JWT-based access for secure endpoints                               |
| Dev Bypass          | Open endpoints allowed in `NODE_ENV=development`                    |
| Scoring Attribution | Every `Judgment` must have a `createdBy` field, set at scoring time |
---
## 🧩 Role-based Access (RBAC)
| Role       | Permissions                             |
| ---------- | --------------------------------------- |
| `reviewer` | Score steps, view tasks                 |
| `editor`   | Create/edit tasks, manage completions   |
| `admin`    | Manage projects, users, schema versions |
| `anon`     | (Future) View exports, public results   |
Roles will be embedded in JWT claims or stored in Supabase tables for RBAC enforcement.
---
## 🛠 Integration (Planned)
| Area                  | Behavior                                               |
| --------------------- | ------------------------------------------------------ |
| Vercel Edge Functions | Protect export endpoints for JSONL download            |
| Supabase Client       | Used for login/session/user lookups                    |
| Headers (API)         | Token expected in `Authorization: Bearer <jwt>` format |
---
## 🔐 Contributor Notes
- All `createdBy` fields must be populated by an authenticated actor
- Never expose raw Supabase service keys to the frontend
- Store keys and token secrets in `.env` and in Vercel/CI secrets manager
- When adding secure routes, use token middleware before route logic
---
## 🔍 References
- [`/docs/schema/audit.md`](../schema/audit.md) – scoring traceability
- [`/docs/schema/judgment/model.md`](../schema/judgment/model.md) – `createdBy` attribution
- [`/docs/DEPLOYMENT.md`](../DEPLOYMENT.md) – setting auth keys in production

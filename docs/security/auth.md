---
title: "auth"
status: "draft"
---

# 🔐 Authentication & Access Control

This document defines the authentication system, reviewer roles, and security policies for accessing ReasonOps APIs and UI interfaces. All logic is enforced via Supabase Auth + Row-Level Security (RLS) with role-based session tokens.

---

## 🔑 Authentication Provider

- Provider: **Supabase Auth**
- Strategy: Email/password or magic link login
- Sessions: JWT token-based with auto-refresh
- Session retrieval: `supabase.auth.getSession()`

## 🧩 Multi-Tiered Auth Architecture

ReasonOps uses a tiered auth system to support operational safety, analytics, and cross-tenant guarantees:

- **Primary Auth Layer**: Supabase Auth (email/password or magic link) with rotating JWTs
- **Session Middleware**: JWTs parsed at app shell and edge API, decoded roles attached to request context
- **Operational Context**: Every session includes an `orgId`, `reviewerId`, and time-signed `sessionScope` validated via middleware
- **Internal Services**: Auth headers validated in Fastify/Edge handlers with explicit role+resource checks

This ensures decoupled privilege validation, isolatable audit logs, and forward compatibility with workload-based tokens.

---

## 👥 Role-Based Access Control (RBAC)

| Role       | Permissions                               |
| ---------- | ----------------------------------------- |
| `admin`    | Create, view, update, and export all data |
| `reviewer` | View and score steps assigned to them     |
| `guest`    | Limited UI view, no scoring or export     |

Roles are embedded in the JWT claim (`role`) and validated both client-side and via Supabase RLS.

---

## 🧾 Auth Headers (API Access)

All secure endpoints require:

```
Authorization: Bearer <access-token>
```

For service access (LLM, agents, internal tools), ReasonOps supports **reviewer-scoped API tokens**:

- Format: `rev_sk_live_4k23abf8c`
- Stored in `reviewer_tokens` table
- Tokens are attached to `reviewerId` + usage scope
- Managed in Supabase Studio or internal admin tools
- All tokens are scope-restricted and time-bound; misuse is detected and revoked via Postgres triggers

---

## 🛡 RLS Enforcement

Each Supabase table defines RLS policies. Examples:

- `tasks`: User must be creator OR `role = 'admin'`
- `steps`: Must match user's allowed task scope
- `judgments`: Reviewer must match the `step.reviewerId`

RLS is enforced automatically by Supabase on all direct table access from frontend or API.

Each policy includes structured comments and is validated with automated tests against privilege escalation. Change approvals require dual-role signoff (admin + security lead) in CI before deployment.

---

## ⚠️ Failure Modes

| Scenario                           | Response | Description              |
| ---------------------------------- | -------- | ------------------------ |
| No token provided                  | 401      | Unauthorized             |
| Token expired                      | 401      | Must re-authenticate     |
| Reviewer accessing out-of-scope ID | 403      | Rejected by RLS          |
| Invalid API token                  | 403      | Token missing or revoked |

---

## 📚 Related Security Policies

- [tokens.md](./tokens.md) — Token structure, generation, and revocation
- [deployment/env.md](../deployment/env.md) — Secure `.env` management
- [judgment.md](../api-reference/judgment.md) — Authenticated scoring endpoint

---

## 🧮 Audit & Traceability

- Every auth token use is logged to a `token_usage_log` table with timestamp, IP, user agent, and matched rule
- Admins can replay access attempts via internal audit dashboards
- Reviewer data access is wrapped in an `access_log` Postgres function that appends signed context

These controls allow ReasonOps to meet enterprise standards for traceability, incident response, and regulatory audit.

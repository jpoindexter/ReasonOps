---
title: "access"
status: "draft"
---

# Access Control

## Role Matrix

| Role            | View Evaluations | Edit Evaluations | View Tokens | Rotate/Invalidate Tokens | View Logs | Manage Users | Notes                                                   |
| --------------- | ---------------- | ---------------- | ----------- | ------------------------ | --------- | ------------ | ------------------------------------------------------- |
| Reviewer        | ✅               | ❌               | ❌          | ❌                       | ❌        | ❌           | Limited to assigned evaluations                         |
| Admin           | ✅               | ✅               | ✅          | ✅                       | ✅        | ✅           | Full access; subject to audit and dual-auth escalation  |
| Observer        | ✅               | ❌               | ❌          | ❌                       | ✅        | ❌           | Read-only audit visibility                              |
| Service Account | ✅               | ✅               | ✅          | ✅                       | ❌        | ❌           | Used for automation; tightly scoped via least privilege |

## Enforcement Rules

- All permissions are enforced at both API gateway and DB schema layers.
- Row-Level Security (RLS) is mandatory for all evaluation, token, and audit log tables.
- API tokens must inherit RLS and respect Role-Based Access Control (RBAC) boundaries.
- Any elevation request must pass through a dual-authorization workflow (admin + auditor).
- Unauthorized privilege attempts are blocked, logged, and surfaced via observability dashboards.

## Audit Requirements

- All permission changes, token actions, and log reads are recorded in immutable audit tables (`tokens_audit`, `access_events`).
- Audit entries must include: actor ID, timestamp, IP, and operation fingerprint.
- All audit records include cryptographic hash chains to ensure tamper-evidence.
- Logs are retained for a minimum of 12 months and replicated across availability zones.
- Role-limited audit APIs are exposed under `/audit/...` with traceable query origin headers.

# 🔐 Authentication & Access Control

This document defines the authentication system, reviewer roles, and security policies for accessing ReasonOps APIs and UI interfaces. All logic is enforced via Supabase Auth + Row-Level Security (RLS) with role-based session tokens.

---

## 🔑 Authentication Provider

- Provider: **Supabase Auth**
- Strategy: Email/password or magic link login
- Sessions: JWT token-based with auto-refresh
- Session retrieval: `supabase.auth.getSession()`

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

---

## 🛡 RLS Enforcement

Each Supabase table defines RLS policies. Examples:

- `tasks`: User must be creator OR `role = 'admin'`
- `steps`: Must match user's allowed task scope
- `judgments`: Reviewer must match the `step.reviewerId`

RLS is enforced automatically by Supabase on all direct table access from frontend or API.

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

# 🔐 ReasonOps Security Overview

This document outlines the security architecture, data access model, and best practices used in ReasonOps to ensure the platform remains safe, auditable, and compliant across all environments.

---

## 🧱 Security Architecture

- **Frontend**: Authenticated via Supabase, no direct DB access
- **Backend**: Node/Next.js serverless APIs with scoped access per endpoint
- **Storage**: Supabase Postgres with Row-Level Security (RLS)
- **Data Flow**: All scoring, steps, and completions are stored in project-scoped tables with strict reviewer or model-level keys

---

## 🔐 Authentication

- Provided by Supabase Auth
- Session tokens stored in client memory (or localStorage)
- Backend endpoints require `Bearer <token>` with RBAC claims
- Reviewer tokens (`rev_sk_*`) are stored and verified via Supabase `reviewer_tokens`

See [`auth.md`](./auth.md) for full RBAC and header format.

---

## 🛡 Row-Level Security (RLS)

RLS policies are applied at the database level. Each table defines:

- Ownership (user_id = auth.uid())
- Scope (`role = 'reviewer'` or `admin`)
- Table-level enforcement even for serverless requests

All SQL policies are defined in `/docs/deployment/supabase.md`

---

## 🔑 Secrets & Environment Variables

- Managed via `.env.local` for local, and Vercel/Supabase for production
- Never committed to source control
- Includes:
  - `SUPABASE_URL`
  - `SUPABASE_SERVICE_ROLE_KEY`
  - `OPENAI_API_KEY`, `CLAUDE_API_KEY`

See [`env.md`](../deployment/env.md) for a full breakdown.

---

## 🕵️ Threat Model

| Threat                     | Mitigation Strategy                                 |
| -------------------------- | --------------------------------------------------- |
| Unauthorized access        | Supabase RLS, reviewer token scoping                |
| Export schema tampering    | JSONL snapshot comparison in CI                     |
| LLM abuse or injection     | Prompt sanitization + auditing in `parseCompletion` |
| Data leakage between tasks | Task ownership + step scoping in Supabase           |
| Reviewer impersonation     | JWT claim checks + token validation                 |

---

## 🧪 Logging & Audit Trails

- Scoring and export events are logged via `trackScoring.ts`
- Reviewer + model ID are embedded in each judgment
- Export includes `rubricVersion`, `timestamp`, and `model` metadata
- Logs are stored in `logs/` or emitted to remote sink (future S3 support)

---

## 🔄 Secure Deployment

- GitHub PRs require:
  - Test pass
  - Typecheck pass
  - Lint pass
  - Reviewer token present in CI
- Supabase is deployed with schema lock and admin-only RLS changes
- Vercel is configured with CI preview environments + secret injection

---

## 🧠 Security Review Process

- All new endpoints must be reviewed for:
  - Auth scope
  - Reviewer visibility
  - Export integrity
- Token-scoped behavior must be tested in `tests/fixtures/` or CI mock agents

---

## 📬 Responsible Disclosure

If you discover a vulnerability, report it per [`disclosure.md`](./disclosure.md)

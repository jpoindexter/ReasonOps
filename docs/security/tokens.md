# 🔑 Reviewer Tokens & API Key Management

This document describes how ReasonOps manages scoped access to its APIs using secure, reviewer-tied tokens. Tokens are used to authenticate programmatic agents such as LLMs, evaluation bots, or CI exports.

---

## 🔐 Token Format

- Prefix: `rev_sk_` (reviewer secret key)
- Example: `rev_sk_live_3ba28ff93b62`
- Length: 32–40 characters
- Format: opaque string stored securely in Supabase

---

## 🎯 Token Purpose

Tokens are used to:

- Score steps via `POST /api/judgment`
- Access protected endpoints during CI runs
- Submit evaluations on behalf of LLM agents
- Enable non-human clients to simulate reviewer workflows

---

## 📥 Token Generation

Tokens are created:

- Manually via Supabase Studio
- Or via internal admin CLI (`scripts/create-token.ts`)

Required fields in `reviewer_tokens` table:

| Column       | Type     | Notes                              |
| ------------ | -------- | ---------------------------------- |
| `token`      | string   | Secret key stored SHA256-hashed    |
| `reviewerId` | string   | Linked reviewer (human or agent)   |
| `model`      | string   | Optional model label (e.g. claude) |
| `scope`      | string[] | Allowed actions (e.g. `["score"]`) |
| `createdAt`  | datetime | Timestamp of creation              |
| `revoked`    | boolean  | If true, token cannot be used      |

---

## 🚫 Revocation Policy

- Tokens can be marked as `revoked = true`
- Any request with a revoked token returns HTTP `403`
- Revoked tokens should be rotated every 30–90 days
- Revocation logs should be kept under `logs/tokens.log`

---

## 🔒 Supabase RLS Integration

- Each token is mapped to a `reviewerId`
- All scoring and judgment queries must resolve the token scope and identity
- RLS policies validate:
  - Token hash exists and is active
  - Reviewer is authorized for the current `taskId`

---

## 🧪 CI Compatibility

- GitHub Actions can export `REASONOPS_TOKEN` as secret
- Used to call scoring APIs in pre-deploy workflows
- Use with:
  ```bash
  curl -H "Authorization: Bearer $REASONOPS_TOKEN" \
       -H "Content-Type: application/json" \
       -X POST https://reasonops.io/api/judgment \
       -d '{"stepId":"...", "score":"clear"}'
  ```

---

## 📚 Related

- [auth.md](./auth.md) — Role-based access and login strategy
- [disclosure.md](./disclosure.md) — Responsible token abuse reporting
- [judgment.md](../api-reference/judgment.md) — Token-authenticated endpoint

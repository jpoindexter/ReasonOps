# 🔑 Reviewer Tokens & API Key Management

This document describes how ReasonOps manages scoped access to its APIs using secure, reviewer-tied tokens. Tokens are used to authenticate programmatic agents such as LLMs, evaluation bots, or CI exports.

---

## 🔐 Token Format

- Prefix: `rev_sk_` (reviewer secret key)
- Example: `rev_sk_live_3ba28ff93b62`
- Length: 32–40 characters
- Format: cryptographically secure opaque string, generated with `crypto.randomUUID()` + HMAC salt, stored SHA256-hashed in Supabase

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

| Column       | Type     | Notes                                 |
| ------------ | -------- | ------------------------------------- |
| `token`      | string   | Secret key stored SHA256-hashed       |
| `reviewerId` | string   | Linked reviewer (human or agent)      |
| `model`      | string   | Optional model label (e.g. claude)    |
| `scope`      | string[] | Allowed actions (e.g. `["score"]`)    |
| `createdAt`  | datetime | Timestamp of creation                 |
| `revoked`    | boolean  | If true, token cannot be used         |
| `rotatedAt`  | datetime | Timestamp of last rotation (nullable) |
| `expiresAt`  | datetime | Optional expiry date for key validity |

---

## 🚫 Revocation Policy

- Tokens can be marked as `revoked = true`
- Any request with a revoked token returns HTTP `403`
- Revoked tokens should be rotated every 30–90 days
- Rotation must be traceable and logged with reviewer identity and previous token fingerprint
- Key rotation enforced via Supabase Function trigger (audit_tokens_rotation)
- Revocation logs should be kept under `logs/tokens.log`

---

## 🔒 Supabase RLS Integration

- RLS policy enforces:
  - Token exists and matches `SHA256(token)`
  - Token is active, unexpired, and not revoked
  - Scope includes current operation
  - `reviewerId` has permission for associated task
  - Query context captures `jwt.claims.token_id` for downstream audit trace

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

> Ensure CI tokens have limited TTL, scope isolation, and IP range restrictions (enforced via Supabase network policy layer)

---

## 📚 Related

- [auth.md](./auth.md) — Role-based access and login strategy
- [disclosure.md](./disclosure.md) — Responsible token abuse reporting
- [judgment.md](../api-reference/judgment.md) — Token-authenticated endpoint

---

## 🧾 Audit and Compliance

- All token actions (creation, usage, revocation, rotation) are logged in `tokens_audit` table
- `tokens_audit` includes actorId, tokenId, action, timestamp, and fingerprint summary
- Logs exported daily to long-term encrypted object storage
- All access paths validated against internal policy engine (OPA/Gatekeeper)

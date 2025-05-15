> 🧠 ReasonOps Context  
ReasonOps is a platform for evaluating reasoning quality in AI — step-by-step. It helps users inspect, score, tag, and export logical traces to improve reliability.

# 📘 ReasonOps API Reference

This directory provides developer-facing documentation for all public HTTP routes within the ReasonOps platform. Each route is version-locked, schema-validated, and auditable through exported datasets.

---

## 🔐 Authentication

All endpoints require a bearer token unless explicitly marked as public.

### Required Header Format

```
Authorization: Bearer <your-api-key>
Content-Type: application/json
```

Tokens must be scoped to the current reviewer, admin, or scoring agent. See [`docs/security/auth.md`](../security/auth.md) for permission details.

---

## 📦 Versioning

All endpoints are semver-stable.

- Breaking changes will bump the major version.
- Stable endpoints are under `/api/`
- Future versions may use `/v2/api/...` style.

---

## 🧭 Route Index

| Endpoint          | Method | Description                           | Spec                         |
| ----------------- | ------ | ------------------------------------- | ---------------------------- |
| `/api/task`       | `POST` | Create a new task prompt              | [task.md](./task.md)         |
| `/api/completion` | `POST` | Submit LLM-generated answer           | _(planned)_                  |
| `/api/step`       | `GET`  | Retrieve parsed steps from completion | [step.md](./step.md)         |
| `/api/judgment`   | `POST` | Submit a step-level score + feedback  | [judgment.md](./judgment.md) |

---

## 📚 Supporting Schemas

- All inputs validated with [Zod](https://zod.dev/)
- Schema definitions live in:
  - [`docs/schema/`](../schema/)
  - `backend/schemas/*`
  - `frontend/schemas/*`

---

## 🚧 Known Limitations

- `/completion` currently does not return streamed responses
- Scores are stored per step, not per task

---

## 🔄 Related Docs

- [Architecture overview](../architecture/README.md)
- [Security rules](../security/auth.md)
- [Dataset export schema](../schema/dataset-format.md)

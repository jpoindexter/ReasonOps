# 📤 Export API Reference

This document defines the ReasonOps API for exporting completed tasks, model responses, and evaluation data in JSONL format. The export system powers downstream fine-tuning, QA audit, benchmarking, and dataset sharing.

---

## 📥 GET `/api/export/tasks/:taskId`

Returns a full export of the specified `Task`, including:

- Prompt
- Completion
- Parsed Steps
- Step-level Judgments

Exports follow the schema defined in `/docs/schema/dataset-format.md`.

---

### ✅ URL Parameters

| Param    | Type     | Required | Description              |
| -------- | -------- | -------- | ------------------------ |
| `taskId` | `string` | ✅       | ID of the task to export |

---

### ✅ Response (JSONL)

Content-Type: `text/plain`  
Each line is a fully evaluated completion with step judgments:

```json
{"task_id":"task_001", "prompt":"...", "model":"claude", "steps":[{"text":"...", "score":"clear"}]}
{"task_id":"task_001", "prompt":"...", "model":"gpt", "steps":[{"text":"...", "score":"unclear"}]}
```

---

## 🗃 Export Format

| Field           | Description                                 |
| --------------- | ------------------------------------------- |
| `task_id`       | Source task ID                              |
| `prompt`        | Original prompt string                      |
| `model`         | Model that generated the completion         |
| `completion_id` | Completion ID                               |
| `response`      | Raw LLM output                              |
| `steps[]`       | List of reasoning units and their judgments |
| `score`         | `clear`, `unclear`, `contradictory`         |
| `comment`       | Optional reviewer or LLM explanation        |
| `confidence`    | Optional score confidence (0.0–1.0)         |

See: [`/docs/schema/dataset-format.md`](../schema/dataset-format.md)

---

## 🔐 Security Notes

- No user identifiers or raw review metadata is included unless explicitly enabled
- Reviewer ID (`createdBy`) is excluded from exports by default
- All exports are append-only, versioned, and compliant with audit policy

---

## 📦 Usage

| File                                      | Role                              |
| ----------------------------------------- | --------------------------------- |
| `/app/api/export/tasks/[taskId]/route.ts` | Implements the JSONL writer       |
| `/lib/exportFormatter.ts`                 | Shapes output per schema          |
| `/tests/export.spec.ts`                   | Validates structure of JSONL rows |

---

## 🧪 Export Rules

- Only `reviewed` Tasks are exportable
- Steps without Judgments are excluded
- If no completions are scored, export returns `204 No Content`
- All rows must conform to current `formatVersion`

---

## 🔧 Contributor Notes

- Format must be maintained in sync with `/docs/schema/dataset-format.md`
- Do not include internal fields (e.g. Supabase IDs, timestamps)
- Add new fields to `metadata` only if backward-compatible
- All exports should be testable via snapshot comparison

---

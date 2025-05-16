---
title: "task"
status: "draft"
---

# 🧾 API Reference: Create Task

Creates a new evaluation task for reasoning-based judgment. A task defines a prompt, instructions, metadata, and a version scope for all attached completions and step scoring.

---

## 📮 Endpoint

**POST** `/api/task`

### Required Headers

```
Authorization: Bearer <api-key>
Content-Type: application/json
```

---

## 📥 Request Body (Zod Schema: `taskFormSchema`)

```ts
{
  title: string;
  prompt: string;
  version?: string;
  metadata?: Record<string, string>;
}
```

---

## 🧪 Example Request

```json
{
  "title": "Climate impact reasoning",
  "prompt": "What would be the most effective solution to reduce global CO2 emissions?",
  "version": "1.0.2",
  "metadata": {
    "domain": "climate",
    "difficulty": "medium"
  }
}
```

---

## 📤 Example Response

```json
{
  "status": "ok",
  "taskId": "task_82df11",
  "createdAt": "2025-05-13T15:25:44Z"
}
```

---

## ✅ Validation Rules

- `title` must be ≤ 100 characters
- `prompt` must be non-empty
- `version` optional, defaults to latest project version
- `metadata` is key-value map, max 10 entries

---

## 📚 Related Docs

- [Zod schema](../../schema/task/model.md)
- [Step parsing logic](../../../backend/lib/parsing/parseCompletion.ts)
- [UI form](../../../frontend/app/task/page.tsx)
- [Prompt guidelines](../../prompts/task.md)
- [Export dataset spec](../../schema/dataset-format.md)

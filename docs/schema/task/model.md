---
title: "model"
status: "draft"
---

# 🧾 Task Model

The `Task` entity represents a user-defined reasoning challenge intended for LLM evaluation. It is the core unit of input to ReasonOps, and the anchor point for completions, evaluations, and scoring workflows.

---

## 🧠 Purpose

Each Task captures:

- A user-defined natural language prompt
- The target LLM model to use (Claude, GPT, Ollama, etc.)
- Optional version and metadata fields for reproducibility and auditability

Tasks are intended to be immutable once evaluated. Updates should result in new versions.

---

## 🔡 TypeScript + Zod Schema

```ts
import { z } from "zod";

export const TaskSchema = z.object({
  id: z.string(), // Unique identifier (UUID or slug)
  prompt: z.string().min(1), // The reasoning prompt/question
  model: z.enum(["claude", "gpt", "ollama"]), // Model to use for completion
  status: z.enum(["draft", "completed", "reviewed"]), // Workflow state
  version: z.number().optional(), // Optional version for reproducibility
  createdAt: z.string(), // ISO timestamp
  updatedAt: z.string(), // ISO timestamp
  metadata: z.record(z.unknown()).optional(), // Arbitrary extra data
});

export type Task = z.infer<typeof TaskSchema>;
```

---

## ✅ Required Fields

| Field       | Type     | Description                              |
| ----------- | -------- | ---------------------------------------- |
| `id`        | `string` | Unique task identifier                   |
| `prompt`    | `string` | Input prompt for the model               |
| `model`     | `enum`   | Target model (`claude`, `gpt`, `ollama`) |
| `status`    | `enum`   | Task state in lifecycle                  |
| `createdAt` | `string` | Creation timestamp                       |
| `updatedAt` | `string` | Last modified timestamp                  |

---

## 🆗 Optional Fields

| Field      | Type                      | Description                              |
| ---------- | ------------------------- | ---------------------------------------- |
| `version`  | `number`                  | Optional version number (starts at 1)    |
| `metadata` | `Record<string, unknown>` | Flexible key-value object for extensions |

---

## 🔗 Related Models

- `Completion`: Generated model output for a Task
- `Step`: Parsed reasoning units from a Completion
- `Judgment`: Evaluations of each Step

See [`/docs/schema/relationships.md`](../relationships.md) for full mapping.

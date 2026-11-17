---
author: ReasonOps System
created: '2025-05-16T10:33:34.889Z'
links: []
status: draft
tags:
  - reasonops
  - obsidian
  - enterprise
title: index
type: doc
updated: '2025-05-16T10:33:34.889Z'
visibility: public
---
# 🧾 Task API Reference
This document defines the ReasonOps API endpoint for creating a new reasoning task. A Task serves as the starting point for all reasoning evaluations, LLM completions, and scoring workflows.
---
## 📥 POST `/api/task`
Creates a new Task with a prompt and a selected model. The Task is stored with lifecycle metadata and an optional version and extension fields.
---
### ✅ Request Body
```json
{
  "prompt": "Why should cities plant more trees?",
  "model": "claude"
}
```
| Field    | Type     | Required | Description                                             |
| -------- | -------- | -------- | ------------------------------------------------------- |
| `prompt` | `string` | ✅       | The natural language input for reasoning evaluation     |
| `model`  | `string` | ✅       | Target model to use: `"claude"`, `"gpt"`, or `"ollama"` |
---
### ✅ Response
```json
{
  "taskId": "task_001",
  "status": "draft",
  "version": 1
}
```
| Field     | Type     | Description                         |
| --------- | -------- | ----------------------------------- |
| `taskId`  | `string` | Unique ID of the created Task       |
| `status`  | `string` | Initial lifecycle state (`draft`)   |
| `version` | `number` | Task version for audit traceability |
---
## 🧱 Task Lifecycle
| Status      | Description                   |
| ----------- | ----------------------------- |
| `draft`     | No completions generated yet  |
| `completed` | One or more Completions exist |
| `reviewed`  | All steps have Judgments      |
---
## 📦 Usage in ReasonOps
| File                       | Role                                |
| -------------------------- | ----------------------------------- |
| `/app/api/task/route.ts`   | Task creation handler               |
| `/lib/createTask.ts`       | Input validation and DB storage     |
| `/components/TaskForm.tsx` | User-facing task input form         |
| `/tests/task.spec.ts`      | Schema conformance and API coverage |
---
## 🧠 Schema Integration
Created tasks conform to the schema defined in:
- [`/docs/schema/task/model.md`](../schema/task/model.md)
- Validated using `TaskSchema` from `/schemas/task.ts`
- Fields like `version` and `metadata` are optional but recommended for traceability
---
## 🔐 Contributor Guidelines
- Ensure `prompt` is non-empty and trimmed
- Use Zod validation (`TaskSchema`) on input payloads
- Initialize `status = "draft"` and set `createdAt`, `updatedAt`
- Auto-increment `version` if a task with similar `prompt` already exists
- Store metadata keys (e.g. topic, user intent) in `Task.metadata`
---
For scoring flow, see:
- [`/api/completions.md`](./completions.md)
- [`/schema/step/model.md`](../schema/step/model.md)

## User Stories
- As a system administrator, I want to create a new Task API endpoint so that ReasonOps can support user requirements for reasoning tasks. This includes providing an interface where users can define the prompt and select the model for each task. The request body should contain fields such as prompt and selected model, which are all required.
- As a developer implementing this feature, I want to ensure that the endpoint works properly by testing it with different scenarios. For instance, validating that an empty prompt or selecting an unavailable model will return appropriate error messages.
- As a user of ReasonOps, I want to create new reasoning tasks so that I can evaluate various natural language inputs using selected models. The system should provide unique IDs for each task and initial lifecycle states (e.g., no completions generated), which are returned in the response body. This allows users to track their progress without needing to reference internal database identifiers. Moreover, fields like version and extension could be used for audit traceability.

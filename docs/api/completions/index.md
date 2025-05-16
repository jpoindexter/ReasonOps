---
author: ReasonOps System
created: '2025-05-16T10:33:34.882Z'
links: []
status: draft
tags:
  - reasonops
  - obsidian
  - enterprise
title: index
type: doc
updated: '2025-05-16T10:33:34.882Z'
visibility: public
---
# 🧠 Completion API Reference
This document defines the ReasonOps API endpoint responsible for generating model completions from a submitted `Task`. A Completion represents the full text response returned by a selected LLM (Claude, GPT, or Ollama) given a Task's `prompt`.
---
## 📥 POST `/api/llm`
Triggers the model generation process based on a Task and stores the result as a new Completion.
---
### ✅ Request Body
```json
{
  "taskId": "task_001",
  "model": "claude"
}
```
| Field    | Type     | Required | Description                                           |
| -------- | -------- | -------- | ----------------------------------------------------- |
| `taskId` | `string` | ✅       | The ID of the Task for which to generate a Completion |
| `model`  | `string` | ✅       | Model to use (`claude`, `gpt`, or `ollama`)           |
---
### ✅ Response
```json
{
  "completionId": "completion_001",
  "response": "Planting more trees in cities improves air quality and reduces heat."
}
```
| Field          | Type     | Description                           |
| -------------- | -------- | ------------------------------------- |
| `completionId` | `string` | ID of the newly created Completion    |
| `response`     | `string` | Raw text output returned from the LLM |
---
## 🧠 Completion Lifecycle
1. User creates a Task
2. Client or server sends a POST to `/api/llm`
3. LLM generates a full response to the `prompt`
4. Completion is saved with metadata, timestamp, model version, etc.
5. Parsing logic may follow to extract Step objects
---
## 🔄 Model Routing
All LLM requests are routed via the adapter at `/lib/llmAdapter.ts`:
```ts
switch (model) {
  case "claude":
    return callClaude(prompt);
  case "gpt":
    return callOpenAI(prompt);
  case "ollama":
    return runOllamaLocally(prompt);
}
```
This enables model-specific prompt injection, system message usage, temperature settings, etc.
---
## 🧩 Metadata (Optional)
Additional runtime fields (e.g. `temperature`, `version`, `systemPrompt`) can be recorded inside the Completion's `metadata` object and returned downstream for tracing or analysis.
---
## 📦 Usage
| File                               | Role                                       |
| ---------------------------------- | ------------------------------------------ |
| `/lib/llmAdapter.ts`               | Handles prompt + model dispatch            |
| `/app/api/llm/route.ts`            | API logic for POST `/api/llm`              |
| `/components/CompletionViewer.tsx` | Renders Completion in UI                   |
| `/lib/parseSteps.ts`               | Optional: extracts Steps from raw response |
---
## 🔐 Contributor Guidelines
- Ensure `taskId` references an existing Task (400 if not found)
- Validate model field using enum (`"claude"`, `"gpt"`, `"ollama"`)
- Attach `createdAt`, `updatedAt` to all Completion objects
- Log LLM parameters in `metadata` (optional but recommended)
- Downstream evaluation (Step parsing) should not mutate the original Completion
---
## 🔗 Related
- [`/docs/schema/completion/model.md`](../schema/completion/model.md)
- [`/docs/schema/task/model.md`](../schema/task/model.md)
- [`/docs/schema/step/model.md`](../schema/step/model.md)

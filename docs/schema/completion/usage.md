---
author: ReasonOps System
created: '2025-05-16T10:33:34.984Z'
links: []
status: draft
tags:
  - reasonops
  - obsidian
  - enterprise
title: usage
type: doc
updated: '2025-05-16T10:33:34.984Z'
visibility: public
---
# 📄 Completion Usage Guide
This document outlines how `Completion` entities are generated, managed, and used throughout the ReasonOps platform.
---
## 🧠 Purpose of Completion
A Completion represents a raw model output in response to a specific Task. It is the starting point for downstream evaluation — all reasoning steps and judgments derive from this entity.
Completions allow ReasonOps to:
- Store model responses in a structured, version-safe way
- Track model performance across tasks
- Support model-to-model comparisons
- Enable full reproducibility and audit trails
---
## 🔁 Completion Lifecycle
| Phase         | Description                                                   |
| ------------- | ------------------------------------------------------------- |
| **Generated** | An LLM (Claude, GPT, Ollama) completes the prompt from a Task |
| **Parsed**    | The response is broken into logical Steps                     |
| **Evaluated** | Steps are scored via human or LLM-generated Judgments         |
| **Locked**    | Once fully judged, Completions should not be edited           |
---
## 🔄 How Completions Are Created
1. User submits a Task (e.g. “Why is the sky blue?”)
2. The LLM adapter receives the prompt and selected model
3. A response is generated and stored as a new Completion
4. The Completion is linked to the originating Task via `taskId`
5. Optionally, a Step parsing job is triggered to segment the response
---
## 🔧 Where Completions Are Used
| File / Component         | Role                                                   |
| ------------------------ | ------------------------------------------------------ |
| `/api/llm/route.ts`      | Handles the POST request that creates a new Completion |
| `/lib/llmAdapter.ts`     | Routes prompt to Claude, GPT, or Ollama                |
| `/app/evaluate/[taskId]` | Displays Completion output, parsed into Steps          |
| `/app/compare/[taskId]`  | Enables visual comparison of multiple Completions      |
| `/lib/parseSteps.ts`     | Optional: extracts structured Steps from response text |
---
## 🔍 Contributor Guidelines
- Always associate a Completion with a valid `taskId`
- Completions should be treated as immutable after creation
- Avoid manual edits — changes should result in new entries
- Store `createdAt` and `updatedAt` on creation
- Populate `metadata` with token usage, temperature, or runtime flags when available
---
## 🧪 Example Use Flow
1. Task is created: `prompt = "Should cities ban cars?"`, `model = claude`
2. POST request is sent to `/api/llm/route.ts`
3. Claude returns a 300-token response
4. Completion is created and stored
5. Response is passed to a Step parser
6. Steps are reviewed and scored by a human judge
For field definitions and examples, see:
- [`model.md`](./model.md)
- [`examples.md`](./examples.md)

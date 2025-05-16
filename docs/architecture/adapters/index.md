---
author: ReasonOps System
created: '2025-05-16T10:33:34.896Z'
links: []
status: draft
tags:
  - reasonops
  - obsidian
  - enterprise
title: index
type: doc
updated: '2025-05-16T10:33:34.896Z'
visibility: public
---
# 🔌 ReasonOps LLM Adapter Architecture
This document outlines the architecture of the ReasonOps LLM adapter system — a core module responsible for routing prompts, managing model-specific behaviors, and standardizing completion outputs across providers.
---
## 🧠 Purpose
The adapter system allows ReasonOps to:
- Route prompt completions to different LLM providers
- Apply model-specific prompt templates and temperature settings
- Capture metadata and runtime parameters for each generation
- Future-proof the platform against vendor shifts or multi-agent pipelines
---
## ⚙️ Adapter Responsibilities
| Responsibility         | Description                                                  |
| ---------------------- | ------------------------------------------------------------ |
| Prompt routing         | Dispatch task prompt to the selected model                   |
| Output standardization | Normalize LLM response format (string → Completion)          |
| Metadata capture       | Log temperature, token count, model version                  |
| Prompt injection       | Insert system-level instructions per model                   |
| Failover/fallback      | Support local fallback if model is unavailable (e.g. Ollama) |
---
## 📦 Supported Models
| Model  | Alias    | Notes                                          |
| ------ | -------- | ---------------------------------------------- |
| Claude | `claude` | Uses Claude API v1 with system + user messages |
| GPT-4  | `gpt`    | OpenAI chat completions (gpt-4, gpt-3.5)       |
| Ollama | `ollama` | Local model runtime for dev/testing            |
---
## 🔀 Routing Strategy
Routing is handled by a centralized switch in `/lib/llmAdapter.ts`:
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
Each function is responsible for:
- Injecting a scoring-safe prompt
- Handling auth (API keys from `.env`)
- Returning a raw string output
---
## 🔧 Prompt Control
Prompt templates should:
- Be versioned per model (e.g. `claude/v1.1`, `gpt/v1.2`)
- Include system prompts for task consistency
- Support debug toggles (`dryRun`, `testPrompt`)
Prompt variants should be stored in `/lib/prompts/` with examples included in `/docs/PROMPT_GUIDE.md`.
---
## 🧩 Adapter Extension Plan
To add new models:
1. Create new adapter function in `/lib/llmAdapter.ts`
2. Extend enum in `TaskSchema.model`
3. Update switch case in adapter
4. Add API key support and `.env` docs
5. Patch `metadata` writer to capture run context
Planned future adapters:
- Cohere
- Mistral API
- Claude v3 (when released)
- Custom fine-tuned LoRA models
---
## 🔍 Observability & Tracing
Each call logs:
- Model name + version
- Prompt fingerprint
- Temperature + config
- Completion ID (on save)
Failures (timeouts, retries) are logged in Supabase or CloudWatch (depending on deployment).
---
## 🔐 Security Notes
- All API keys must be stored in `.env.local` or Vercel secrets
- Never expose keys to the frontend
- Use a proxy service if rate-limiting becomes an issue
---
## ✅ Contributor Rules
- All adapters must return a plain string response
- Do not hardcode model names — use `model` from `Task`
- Include a version tag in `metadata.modelVersion`
- Validate all prompts before sending (length, template compatibility)
- Test adapters with dev fixtures in `/tests/llmAdapter.spec.ts`
---
This adapter system is the abstraction layer for ReasonOps to interact with any LLM provider — centralized, auditable, and vendor-agnostic.

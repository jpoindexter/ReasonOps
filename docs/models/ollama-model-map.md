---
title: "ollama-model-map"
status: "draft"
---

# 🧠 Ollama Model Integration (Local LLMs for ReasonOps)

ReasonOps supports using local models via Ollama to power:

- Auto-scoring agents
- Rubric explanation agents
- Completion critique / rewrite agents
- Semantic clustering via embedding models

## ✅ Models Currently Supported

| Alias          | Ollama Model ID    | Purpose                             |
| -------------- | ------------------ | ----------------------------------- |
| `fast-score`   | `phi4:latest`      | Quick rubric-based step scoring     |
| `reason-judge` | `llama3.1:latest`  | Full scoring + rubric explanation   |
| `deep-judge`   | `deepseek-r1:14b`  | Longform judgment and critique      |
| `rewrite`      | `codestral:22b`    | Advanced code/chain critique agent  |
| `embedder`     | `nomic-embed-text` | Step similarity, failure clustering |

## ⚙️ Local Agent Config

Set environment in `.env.local`:

# 🧾 Task Usage Guide

This document explains how the `Task` schema is used throughout the ReasonOps platform.

---

## 🧠 What is a Task?

A `Task` represents the user-defined intent to evaluate a language model’s reasoning. It is the origin point for the completion pipeline and all downstream judgment activity.

Tasks encapsulate:

- A natural language prompt (the question or scenario to evaluate)
- A target LLM model to run the prompt through
- Metadata for scoring, versioning, and session tracking

---

## 🔁 Task Lifecycle

| Stage       | Description                                            |
| ----------- | ------------------------------------------------------ |
| `draft`     | Task is created but no completions have been generated |
| `completed` | Task has at least one associated Completion            |
| `reviewed`  | All Steps from all Completions have received Judgments |

---

## 📍 Where It’s Used

| Location                 | Purpose                                                         |
| ------------------------ | --------------------------------------------------------------- |
| `/app/task/new`          | Task creation form (prompt, model picker, optional metadata)    |
| `/app/evaluate/[taskId]` | Evaluate completions and steps from a given task                |
| `/app/compare/[taskId]`  | Compare multiple completions side-by-side                       |
| `LLMAdapter.ts`          | Reads the `model` field from Task to route to Claude, GPT, etc. |

---

## 🔄 LLM Integration

- Once a Task is submitted, it is passed to the LLM adapter (via `/api/llm/route.ts`)
- The `prompt` and `model` fields define which provider runs the task
- The resulting raw response becomes a `Completion`, linked to the originating `Task`

---

## 🔐 Versioning Notes

- When a Task is changed in any way (prompt, model), a new version **should** be created
- Versioning ensures reproducibility of completions and judgments

---

## 🔍 Contributor Notes

- Use the `TaskSchema` from `/schemas/task.ts` for all validation
- Ensure task ID is unique (UUID recommended)
- Always set `createdAt` and `updatedAt` via backend or middleware
- Reserved fields (`metadata`, `version`) should not be used for UI-specific logic — keep it model-agnostic

---

## ✅ Example Flow

1. User fills out “Why should cities plant more trees?” as a new Task
2. Chooses `claude` as the model
3. Submits → stored with `status: draft`
4. Completion is generated → Task becomes `completed`
5. All steps judged → Task becomes `reviewed`

See `/task/model.md` for field definitions and schema structure.

---
title: "examples"
status: "draft"
---

# 🧾 Task Schema — Example Payloads

This document provides real-world JSON examples for the `Task` entity. Tasks define what to evaluate, which model to run, and how completions are tracked and scored.

Each example reflects a valid `Task` object at various lifecycle stages and includes realistic metadata to support traceability, dataset generation, and workflow tagging.

---

## ✅ Example 1: Draft Task

```json
{
  "id": "task_001",
  "prompt": "Why should cities plant more trees?",
  "model": "claude",
  "status": "draft",
  "version": 1,
  "createdAt": "2025-05-12T08:15:00Z",
  "updatedAt": "2025-05-12T08:15:00Z",
  "metadata": {
    "topic": "environment",
    "createdBy": "researcher_24",
    "useCase": "urban-policy"
  }
}
```

> This task has been defined and saved, but no completions have been generated. It is in the initial `draft` state.

---

## ✅ Example 2: Completed Task (model = GPT)

```json
{
  "id": "task_002",
  "prompt": "What are the economic arguments for universal basic income?",
  "model": "gpt",
  "status": "completed",
  "version": 1,
  "createdAt": "2025-05-10T12:00:00Z",
  "updatedAt": "2025-05-10T12:05:00Z",
  "metadata": {
    "tags": ["economics", "UBI"],
    "source": "task-library-v3",
    "createdBy": "analyst_01",
    "confidenceThreshold": 0.8
  }
}
```

> This task has one or more completions. It is ready for evaluation, and may be compared across models or exported for scoring.

---

## ✅ Example 3: Reviewed Task with Extended Metadata

```json
{
  "id": "task_003",
  "prompt": "Is it ethical to deploy autonomous drones in active conflict zones?",
  "model": "claude",
  "status": "reviewed",
  "version": 3,
  "createdAt": "2025-04-01T14:22:00Z",
  "updatedAt": "2025-04-03T18:40:00Z",
  "metadata": {
    "assignedTo": "senior_reviewer",
    "urgency": "high",
    "reviewScope": "ethics",
    "taskGroup": "conflict-policy-batch-7"
  }
}
```

> This task has been reviewed and scored. It is now locked for export, audit, or dataset integration.

---

## ✅ Example 4: External Workflow Integration

```json
{
  "id": "task_004",
  "prompt": "Compare solar and nuclear energy for long-term climate resilience.",
  "model": "claude",
  "status": "completed",
  "version": 2,
  "createdAt": "2025-05-02T07:45:00Z",
  "updatedAt": "2025-05-02T08:10:00Z",
  "metadata": {
    "linkedProjectId": "climate_eval_82a",
    "externalSystem": "llm-task-bridge",
    "priority": "medium",
    "tags": ["climate", "energy"],
    "createdBy": "pm_17"
  }
}
```

> This task was triggered from an external workflow engine. Metadata links it to a broader system context for traceability and audit alignment.

---

## 🔄 Versioning Best Practice

When editing a Task’s `prompt`, `model`, or scoring configuration, increment the `version` field and store the new Task alongside the previous. Never overwrite previous versions — ReasonOps assumes append-only history.

See the canonical schema in [`/docs/schema/task/model.md`](../model.md)

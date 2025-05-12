# 🔗 ReasonOps Entity Relationships

This document defines the core relationships between schema entities in ReasonOps. Understanding these links is critical for reasoning pipelines, UI rendering, scoring logic, and export formatting.

All relationships follow a modular, type-safe structure with referential integrity enforced at the schema level and (optionally) in the data layer (e.g. Supabase, Prisma).

---

## 🧱 Entity Map

```
Task (1) ──▶ (M) Completion
Completion (1) ──▶ (M) Step
Step (1) ──▶ (0..1) Judgment
```

---

## 🔁 One-to-Many: Task → Completion

- A single `Task` may have multiple `Completion`s (e.g. different models or parameter variants).
- All completions must reference `taskId`.
- `Task.status` changes from `draft` to `completed` after first completion is stored.

---

## 🔁 One-to-Many: Completion → Step

- A `Completion` contains 1+ `Step`s parsed from its raw `response`.
- All steps must reference `completionId`.
- `position` field defines the order in which steps appear.
- Steps must be generated and stored as a separate entity, not embedded.

---

## 🔁 One-to-One (optional): Step → Judgment

- Each `Step` can have **zero or one** `Judgment`.
- Once a `Judgment` exists, the `Step` is considered evaluated.
- Judgments are not stored inline; they must reference `stepId`.

---

## 🔐 Integrity Rules

| Entity               | Constraint            | Description                     |
| -------------------- | --------------------- | ------------------------------- |
| `Completion.taskId`  | FK → `Task.id`        | Enforced at schema + API level  |
| `Step.completionId`  | FK → `Completion.id`  | Used to trace reasoning lineage |
| `Judgment.stepId`    | FK → `Step.id`        | Required for audit compliance   |
| `Step.position`      | Unique per Completion | Ensures UI rendering order      |
| `Judgment.createdBy` | Must be non-null      | Enables reviewer attribution    |

---

## 📦 Export Dependencies

| Exported Field | Origin                |
| -------------- | --------------------- |
| `task_id`      | `Task.id`             |
| `model`        | `Completion.model`    |
| `response`     | `Completion.response` |
| `step.text`    | `Step.text`           |
| `step.score`   | `Judgment.score`      |
| `step.comment` | `Judgment.comment`    |

See `/docs/schema/dataset-format.md` for full export format and versioning contract.

---

## 🧪 Example Chain

> “Why should cities plant more trees?”

1. **Task** created with `model = claude`
2. **Completion** generated with 200-word output
3. **Steps** parsed into 3 statements
4. Each **Step** scored using `StepScoringPanel`
5. **Judgments** attached — now ready for JSONL export

---

## 🧠 Notes

- Relationship integrity enables granular scoring, model comparisons, and multi-agent auditability.
- All relationships support horizontal scaling, parallel evaluation, and reversible task logic.

For schema field definitions, see `/docs/schema/*/model.md`.

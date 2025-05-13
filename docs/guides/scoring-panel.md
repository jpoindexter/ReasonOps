# 🧩 Guide: StepScoringPanel

The `StepScoringPanel` is the primary UI surface for applying rubric-based judgments to parsed reasoning steps. This guide explains how it works, how to extend it, and how it links to the ReasonOps backend and export pipeline.

---

## 🧭 Component Location

```bash
frontend/components/panels/StepScoringPanel.tsx
```

---

## 🧠 Purpose

The panel provides an interactive interface to:

- View one or more `step.text` values
- Select a score from the rubric (`clear`, `unclear`, `contradictory`)
- Optionally leave a comment and confidence level
- Submit judgments via API or locally queue them

---

## 🧩 Props & State

### Required Props

| Prop       | Type             | Description                                   |
| ---------- | ---------------- | --------------------------------------------- |
| `steps`    | `Step[]`         | Array of normalized steps to evaluate         |
| `onSubmit` | `(judgments) =>` | Callback to handle judgment output            |
| `rubric`   | `Rubric`         | (Optional) Defines the rubric enum and labels |

### Internal State

- `currentStepIndex`: index of the step being evaluated
- `judgments`: array of partial or complete judgment entries
- `formError`: validation feedback if user skips required fields

---

## 🧪 Behavior

- Keyboard navigation: arrows or tab to move between scoring elements
- Auto-focus: moves to next step after valid score selection
- Score rules: if score ≠ `clear`, comment becomes required
- Submission: batch emits full `judgment[]` payload on confirm

---

## 🔄 API Integration

- Uses `POST /api/judgment` to persist scored steps
- Depends on `judgmentForm.ts` schema for validation
- Maps form state → Zod shape → normalized payload

---

## 🧪 Testing Requirements

- File: `StepScoringPanel.test.tsx`
- Must simulate:
  - Step display
  - Score selection
  - Comment typing
  - Submit event
- Snapshot and a11y coverage

---

## 🔧 Extending the Panel

To extend this panel for new use cases:

- Modify `rubric` prop to inject a dynamic scoring config
- Add support for sub-rubrics or reason categories
- Store draft judgments to `localStorage` before commit

---

## 🔗 Related Modules

- [`useScorePanel.ts`](../../frontend/hooks/useScorePanel.ts)
- [`judgmentForm.ts`](../../frontend/schemas/judgmentForm.ts)
- [`scoreStep.ts`](../../backend/lib/scoring/scoreStep.ts)
- [`generateDataset.ts`](../../backend/exporters/jsonl/generateDataset.ts)
- [`judgment.md`](../../docs/api-reference/judgment.md)

# Reviewer Agreement Matrix

The Reviewer Agreement Matrix is an admin-facing heatmap tool designed to surface task-level disagreement zones and reviewer reliability patterns. It is a key component of quality assurance and inter-reviewer calibration.

---

## 🔍 Overview

This feature provides visual insights into how consistently reviewers are applying rubric dimensions across tasks. It helps identify:

- Tasks with low agreement
- Reviewers who may need calibration
- Rubric dimensions with inconsistent scoring

---

## 📊 Core Components

### 1. Task-Level Heatmap

- **Rows:** Individual tasks
- **Columns:** Reviewers assigned
- **Cells:** Color-coded consensus level (green = high agreement, red = conflict)
- **Tooltip:** Shows rubric version, step-level deltas, and timestamp of last review

### 2. Conflict Flagging

- Any cell with ≥ 2 conflicting scores is flagged with a “⚠️ Conflict” badge
- Clicking a conflict opens the scoring diff panel for step-level comparison

---

## ⚙️ Admin Features

- **Filter by rubric version:** Lock view to a specific rubric to isolate version drift
- **Toggle by dimension:** See agreement scores by specific rubric dimensions (e.g. Clarity)
- **Reviewer calibration tools:** Auto-recommend reviewers for retraining based on delta metrics
- **Export CSV:** Task × Reviewer agreement matrix for offline analysis

---

## 🧩 Integration Points

- **Reviewer Heatmap:** Cross-linked; users can jump from matrix → reviewer view
- **Export Readiness Panel:** Tasks with low agreement are excluded from export by default
- **LogReviewEvent:** All matrix views and diff accesses are tracked for audit trail

---

## ✅ Requirements

- Supabase-queryable, filterable by date/rubric/reviewer
- Responsive on admin dashboard, uses shared charting components
- Supports incremental loading for large matrices

---

## 🗂 Data Schema

Each matrix cell derives from the following Supabase view:

- `task_id: string`
- `reviewer_id: string`
- `rubric_dimension: string`
- `score: number`
- `step_index: number`
- `timestamp: ISO8601`

Data is aggregated daily for cacheable matrix rendering.

---

## 🧯 Error Handling

- If matrix data fails to load, a fallback UI with retry + support contact is displayed.
- Cells with missing scores are marked `⏳ Pending` and visually greyed out.
- Unauthorized access to reviewer-specific data is blocked with role-based error messaging.

---

## 🔐 Access Control

| Role     | Matrix View    | Conflict Diff | CSV Export |
| -------- | -------------- | ------------- | ---------- |
| Admin    | ✅             | ✅            | ✅         |
| Reviewer | ❌             | ❌            | ❌         |
| Observer | ✅ (read-only) | ❌            | ❌         |

---

## 🔧 Extensibility

- Matrix rendering uses shared `<HeatmapGrid />` component
- Dimensions and cell logic are modular; supports adding new score types (e.g. model evals)
- Conflict resolution panel uses `<StepDiffViewer />` — can be embedded elsewhere

---

## 🛡 Compliance Hooks

- All reviewer views and score deltas are timestamped and linked to reviewer IDs
- Access logs include matrix load time, user role, and IP address
- Exported CSVs are hash-signed for traceability in CI pipelines

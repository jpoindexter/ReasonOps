---
title: "feature_list"
status: "draft"
---

# Evaluation Dashboard – Component Feature Map (Enterprise-Grade)

This document outlines every visible component on the Evaluation Dashboard, including its purpose, behavior, contract, and usability rationale. This reflects enterprise-grade fidelity and supports rapid development of the ReasonOps MVP.

---

## 🧠 FULL ACTION MAP – EVALUATION DASHBOARD (ENTERPRISE-GRADE)

This section enumerates every distinct user-performable action in the Evaluation Dashboard. It reflects a task-oriented model of ReasonOps behavior, organized by intent, not by UI element. This ensures a complete understanding of available functionality from a workflow and system control perspective.

---

### 📌 1. Create & Configure

- `+ New Evaluation`

  - Opens modal or drawer to define model(s), prompt(s), task type
  - May include evaluation rubric or metadata override
  - Creates test run queued for processing

- `Duplicate Run`
  - Copies existing configuration
  - Opens prefilled evaluation form

---

### 📄 2. Explore & Navigate

- View list of evaluations
  - Paginated, sortable, scrollable
- Filter evaluations
  - By model, agent, tags, task type, score, date
- Toggle view mode
  - List view ↔ analytics summary (card/chart)
- Expand run
  - Accordion reveals reasoning trace and metadata
- Open run in panel
  - Side drawer view of steps and scoring
- Open run fullscreen
  - Modal or route-based overlay
- Switch org / environment
  - From TopNav context

---

### 📊 3. Evaluate & Score

- Apply score
  - To whole run or individual reasoning step
- Apply tags
  - At run or step level
- Comment on step
  - Text notes on logic, failure, etc.
- Flag for review
  - Marks output for follow-up audit
- Judge in bulk
  - Score and tag multiple selected runs

---

### 🧰 4. Modify & Manage

- Edit run metadata
  - Rename, reclassify, relabel
- Add/remove tags
  - Tag manager dialog or inline chips
- Undo/redo judgment
  - Local-only undo buffer
- Archive runs
  - Soft remove from active dashboard
- Delete run
  - Requires confirmation, recoverable (TBD)

---

### 📤 5. Share & Export

- Export data
  - CSV or JSON including filters + scores
- Copy run link
  - Copies deep-link to a single run
- Copy filtered view
  - Preserves current filters in URL
- Open share drawer
  - Collaborative view sharing (future)

---

### 📥 6. Bulk Operations

- Select runs
  - Checkbox with shift-select
- Apply bulk actions:
  - Tag
  - Score
  - Archive
  - Export
  - Delete
- Trigger bulk modal
  - With preview of affected records

---

### 🚨 7. System Control & Feedback

- View error banners
  - With retry for network/API failures
- Respond to unsaved changes
  - Toast warning + prevent navigation
- Use keyboard shortcuts
  - `J/K`, `Enter`, `Cmd+S`, `Esc`, `/` for search

---

### 🧠 8. Understand & Learn

- Hover tooltips
  - Tags, model details, score meaning
- Click help links
  - Opens docs drawer for current feature
- See empty state guidance
  - "No evaluations" message with CTA

---

> 🎯 This action map is canonical. Any new user-facing capability must map to one of these intents or extend this schema.

---

## 🧭 HIGH-LEVEL DASHBOARD BEHAVIORS

This dashboard is not passive — it's the interactive command center for AI test evaluations. From this single screen, the user should be able to do most of the following without navigating away:

- ✅ Create a new test evaluation set (`+ New Evaluation`)
- ✅ View analytics for active or filtered data
- ✅ Archive or delete test runs
- ✅ Export judgments or results (CSV, JSON)
- ✅ Tag and score individual runs or in bulk
- ✅ View and filter all test metadata (model, agent, status, etc.)
- ✅ Open detail panels or step-wise views inline
- ✅ Switch view types (table vs. card vs. summary)
- ✅ Open modals or drawers for in-place editing
- ✅ Share or copy filtered view via sharable URL or clipboard

---

## 🔷 GLOBAL REGION: Top Navigation

### `TopNavBar`

- **Path**: `@components/navigation/TopNavBar`
- **Purpose**: Displays global context, logout/profile access, help link
- **Features**: Shows current org/env, global status indicator, right-aligned nav items
- **Heuristics**: 1 (Visibility), 4 (Consistency), 10 (Help)

### `HelpLink`

- **Path**: `@components/navigation/HelpLink`
- **Purpose**: Opens contextual documentation panel
- **Behavior**: Filters docs based on current route or feature

---

## 🟨 SIDEBAR REGION: Filters

### `EvaluationFilters`

- **Path**: `@features/evaluations/components/EvaluationFilters`
- **Purpose**: Controls for filtering evaluation runs by model, tag, score, etc.
- **Heuristics**: 2 (Match to real world), 6 (Recognition over recall)

#### Subcomponents:

- `ModelSelect` – dropdown for model type
- `AgentSelect` – grouped agent selection
- `TagMultiSelect` – multi-tag with tooltips
- `ScoreSlider` – dual-handle range input
- `DateRangePicker` – preset and custom range support
- `SaveViewButton` – persists current filter state to query + local
- `ClearFiltersButton` – clears all filters and resets view

---

## 🟩 MAIN REGION: Evaluation Table (Expanded)

### `EvaluationTable`

- **Path**: `@features/evaluations/components/EvaluationTable`
- **Purpose**: Paginated, scrollable list of evaluation runs
- **Props**: `evaluations: EvaluationSummary[]`, `onSelect`, `onRowClick`
- **Empty State**: see below
- **Default View**: list/table with sticky header
- **Alternate Views**: toggle for `CardView` or `SummaryView` (TBD)

### `EvaluationRow` (Expanded)

- **Purpose**: Displays run metadata (model, agent, task, score, tags)
- **Interactive**: Row opens detail panel, allows bulk selection
- **Structure**: Clickable row with 6–8 columns
- **Expandable**: Acts like accordion — click or keyboard shortcut expands row inline to reveal `StepViewer`
- **Quick Actions (Row Hover or Icon Menu)**:
  - Open details
  - Add tag
  - Apply score
  - Archive run
  - Export run
  - Copy run link
  - Delete (soft delete, with undo)
- **Context Menu** (right click or kebab menu):
  - “Open in Panel”
  - “Open Fullscreen”
  - “Duplicate Run”
  - “Compare with…”
- **Indicators**:
  - Expand/collapse arrow
  - Dirty state if judgment has changed
  - Tag count badge
  - Status badge (“Judged”, “Needs Review”, “Flagged”)

#### Child Elements:

- `JudgmentStatusBadge` – status: not started, in progress, complete
- `TagBadgeList` – displays up to 3 tags, hover shows more

---

## 🔘 EMPTY STATE BEHAVIOR

If no evaluations exist:

- Show onboarding callout: "No evaluations yet."
- Offer primary action: `+ Create Evaluation` (button)
- Provide links to help docs and examples
- Include subtle illustration or system status (“No test data available”)

---

## 🟦 PAGINATION + BULK ACTIONS

### `PaginationControls`

- **Path**: `@components/ui/PaginationControls`
- **Behavior**: Supports numbered + infinite scroll mode, sticky footer

### `BulkActionBar`

- **Path**: `@features/evaluations/components/BulkActionBar`
- **Condition**: Shown when one or more rows are selected
- **Actions**: Tag, score, archive, export

### `BulkTagEditor`

- **Modal**: Adds tags to all selected runs with validation and preview

---

## ⚙️ CONTEXTUAL ACTIONS AND MODALS

- **Modals open from row or bulk actions**:

  - `BulkTagEditor`, `BulkScoreEditor`
  - `ConfirmArchiveModal`, `DeleteModal`, `ShareModal`
  - All modals must include:
    - Clear label
    - Esc/Close button
    - Keyboard nav
    - Confirm + Cancel actions
    - Optional reasoning preview for destructive actions

- **Close Behavior**:

  - Esc key
  - Explicit “×” close in top-right
  - Clicking outside (if modal, not drawer)

- **Drawers (right-side)**:
  - Open for “Share View”, “Step Detail”, “Analytics”
  - Push content or overlay depending on screen size

---

## 👁️ VIEW MODES

- **Default**: Table view with filters and actions
- **Alternative**: Analytics view
  - Summary tiles: average score, most common tag, tag distribution chart
  - Toggle or side tab to switch modes
  - All views retain current filters

---

## 🟥 FEEDBACK + SHORTCUTS

### `UnsavedWarningToast`

- **Path**: `@components/ui/Toasts/UnsavedWarningToast`
- **Trigger**: Appears when unsaved filters or judgment states exist

### `ErrorBanner`

- **Path**: `@components/ui/Alerts/ErrorBanner`
- **Trigger**: Full-width alert on failure to load data, retry logic optional

### `useKeyboardShortcuts`

- **Path**: `@lib/hooks/useKeyboardShortcuts`
- **Bindings**: `J/K` to navigate, `Cmd+S` to save view, `/` to search

---

## 🔧 STATE MANAGER

### `ViewStateManager`

- **Path**: `@features/evaluations/state/ViewStateManager`
- **Responsibility**: Serializes filter state into query params + localStorage
- **Planned**: Named views with persistent routing

---

## ❓ TERMS

- **Model**: Refers to the underlying LLM or reasoning engine (e.g., `gpt-4`, `mistral-7b`)
- **Agent**: Reasoning strategy (e.g., chain-of-thought, retrieval-augmented)
- **Evaluation**: A test run of a model on a defined task
- **Judgment**: Human or AI feedback on how well the reasoning performed

---

> ✅ This map is canonical. Any new component added to the dashboard must be added here with path, role, contract, and usability rationale.

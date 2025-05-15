# Reviewer Metrics

// TODO: Visualizations and metrics for reviewer agreement, throughput, accuracy

# 📊 Reviewer Metrics Panel

This document defines the enterprise-grade Reviewer Metrics system for ReasonOps. Metrics are segmented by reviewer, rubric version, project tag, and scoring type. All data supports filtering, export, and integration with audit logs.

---

## Overview

The Reviewer Metrics Panel enables team leads and admins to assess reviewer performance across several dimensions:

- Step throughput (steps/day, steps/week)
- Scoring accuracy (rubric adherence, consensus alignment)
- Rubric coverage (dimensions scored over time)
- Time-on-task metrics
- Inter-reviewer agreement

All metrics must be Supabase-queryable and support snapshot export via JSONL.

---

## Core Metric Tiles

| Metric Tile           | Description                                                          |
| --------------------- | -------------------------------------------------------------------- |
| `Steps Scored`        | Total step judgments submitted in selected time window               |
| `Avg Scoring Time`    | Mean time between step load and score submit, per reviewer           |
| `Agreement Score`     | % agreement with other reviewers on same step across sessions        |
| `Rubric Coverage`     | % of rubric dimensions scored at least once in timeframe             |
| `Re-review Flag Rate` | % of steps flagged for re-review or correction after initial scoring |

---

## Time-Series Graphs

- **Scoring Activity Timeline**: Steps scored per hour/day/week (configurable granularity)
- **Reviewer Load Curve**: Histogram of steps scored per session
- **Agreement Delta Over Time**: Tracks how agreement % shifts over reviewer history
- **Dimension Drift Chart**: Change in scoring frequency per rubric dimension

All graphs include:

- `Download CSV` button
- Time filter: last 7d, 30d, 90d, custom
- Reviewer selector
- Rubric version selector

---

## Filter + Segment Options

| Filter Category  | Options                                                       |
| ---------------- | ------------------------------------------------------------- |
| `Time`           | Last 24h, 7d, 30d, 90d, Custom range                          |
| `Reviewer`       | Self, Team, Individual                                        |
| `Rubric Version` | All active, specific version                                  |
| `Step Type`      | Reasoning, Retrieval, Math, etc.                              |
| `Project Tag`    | Domain tags from task metadata                                |
| `Agreement Zone` | Low agreement, High agreement, Auto-eval alignment mismatches |

---

## Export + CI Compatibility

- All metrics panels exportable as JSONL/CSV for internal audit
- Snapshot-compatible summary JSONs for `EvaluationHistoryService`
- Exportable metadata includes timestamp, rubric version, model, reviewer ID

---

## SAP Enterprise Standards

✅ Role-based visibility  
✅ Filter + slice support  
✅ Audit log linked for every scoring action  
✅ Data export and snapshot-ready  
✅ Shipped with fallback and loading states  
✅ Fully typed in Zod schema (coming from backend validator contract)

---

## 🛡️ Role Access Matrix

| Metric Component      | Reviewer | Admin | Observer |
| --------------------- | -------- | ----- | -------- |
| Steps Scored          | ✅       | ✅    | ✅       |
| Avg Scoring Time      | ✅       | ✅    | ❌       |
| Reviewer Load Curve   | ❌       | ✅    | ❌       |
| Agreement Score       | ✅       | ✅    | ✅       |
| Dimension Drift Chart | ❌       | ✅    | ❌       |

---

## 🔐 Validation Schema References

- **Zod Source**: `/backend/schemas/reviewer.ts`
- **Schema Used**: `ReviewerMetricsExportSchema`
- Used by `EvaluationHistoryService` to validate export pipeline
- Synced to frontend dashboard via Supabase query result

---

## ⚠️ Anomaly Detection Rules

These heuristics power alerting and visual badges:

- **Slow Reviewer Warning**: Time-on-task > 10× median = warning flag
- **Disagreement Spike**: Session disagreement rate > 30% = log event
- **Inactive Reviewer**: No scoring in trailing 72h = visibility alert
- All flagged anomalies are logged via `logReviewEvent`

---

## 📈 Uptime, Refresh, and Recovery

- **Availability Target**: 99.9% SLA for all metrics panels
- **Caching**: Read-through cache backed by Supabase edge
- **Auto-refresh**: Dashboard reloads every 15 minutes
- **Manual Refresh**: Pull-to-refresh button included in UI fallback state
- **Fallback State**: Charts show graceful “No Data Available” card if Supabase down

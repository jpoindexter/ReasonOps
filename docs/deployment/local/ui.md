---
author: ReasonOps System
created: '2025-05-16T10:33:34.908Z'
links: []
status: draft
tags:
  - reasonops
  - obsidian
  - enterprise
title: ui
type: doc
updated: '2025-05-16T10:33:34.908Z'
visibility: public
---
# UI Component & Telemetry Integration: Local Deployment Specification
## Overview
This document serves as a canonical specification for UI and telemetry behavior within the local ReasonOps deployment. It documents integration points, tracking coverage, shell layout surfaces, and component stability indicators. This follows enterprise-grade engineering audit and telemetry conventions.
## Governance & Traceability
- **Change Log Authority**: All UI modules must be versioned with associated commit metadata (`git blame` resolvable).
- **Audit Trail Crosslinking**: Component audit tags must correlate with backend session records via `session_audit_id`.
- **Incident Hooks**: UI telemetry failures trigger fallback logging and notify `ops.alerting.channel`.
- **Compliance Snapshot**: All tracking scripts are reviewed quarterly under SOC2 controls.
---
## 1. Shell Entry Points & Runtime Behaviors
- **Application Shell**: `/app/(.)+` → `Shell.tsx`
  - Loads global state providers, environment access guards, audit ID dispatchers
  - Injects evaluator onboarding routes, session policy enforcement, alert gates
- **Dashboard Mountpoint**: `/dashboard`
  - Triggers `trackPageView` event on Matomo during initial render
  - Supports fallback hydration via SSR + CSR dual-phase layout strategy
  - Logs audit stamp via `audit.shell:init -> dashboard.mount`
---
## 2. Primary Interface Components
| Component            | Role & Behavior                                               | Audit Tag      | Status    |
| -------------------- | ------------------------------------------------------------- | -------------- | --------- |
| `<DashboardShell />` | Grid orchestrator; mounts step/task layers; panel injection   | `audit.shell`  | ✅ Stable |
| `<SidebarNav />`     | Persistent vertical navigation; group-aware collapse handling | `audit.nav`    | ✅ Stable |
| `<TopbarNav />`      | Global control bar; mounts search, account, theme controls    | `audit.navbar` | ✅ Stable |
| `<ToastProvider />`  | Error/export banner overlay dispatcher                        | `audit.alerts` | ✅ Stable |
---
## 3. Telemetry Events & Dimension Mapping
Matomo telemetry is injected in the layout bootstrap (`_app.tsx`):
```ts
_paq.push(['trackPageView']);
_paq.push(['enableLinkTracking']);
```
The following events are tracked across UI surfaces:
| Event ID            | Trigger Source          | Parameters             |
| ------------------- | ----------------------- | ---------------------- |
| `UI.Sidebar.Toggle` | Sidebar collapse/expand | side, user_role        |
| `Eval.View.Load`    | Evaluation panel mount  | eval_id, phase_id      |
| `UI.Button.Click`   | All high-value CTAs     | label, context, cohort |
Dimension configuration is passed via:
```ts
_paq.push(['setCustomDimension', index, value]);
```
Tracked dimensions:
- Dimension 1: `user_role`
- Dimension 2: `feature_cohort`
- Dimension 3: `project_phase`
**Advanced Controls**
- All telemetry submissions are routed through a debounce+retry queue to ensure data durability.
- Anomaly detection flags are attached when client session entropy deviates from baseline ranges.
- Custom dimensions are scrubbed via `sanitizeTelemetryFields()` before dispatch.
---
## 4. Compliance & Engineering Safeguards
- ✅ **Audit Tagging**: every component registered via `audit.{id}` namespace
- ✅ **Self-Hosted Telemetry**: Matomo @ `http://localhost:8080`
- ✅ **Structured Session Correlation**: All events are correlated via `globalSessionId` emitted at boot
- ✅ **SPA Resilience**: link tracking and virtual route patching enabled
- ✅ **Runtime Access Policy**: `env.ts` enforces static boundary checks
- ✅ **Fallback Logging**: telemetry init wrapped with error suppression + console flag
- ✅ **Version Stamp**: `_paq.push(['setCustomVariable', 1, 'TelemetryVersion', '1.0.0']);`
---
## 5. Roadmap Actions
- [ ] Deepen telemetry coverage for modals, drawers, and keyboard shortcuts
- [ ] Add dynamic opt-out toggle per user session (configurable via `env.ts`)
- [ ] Include page visibility tracking (tab hide/show)
- [ ] Surface audit compliance indicators in DevTools panel
---
## Appendix: Example Event Payload
```json
{
  "event": "UI.Button.Click",
  "label": "Start Evaluation",
  "context": "dashboard.topbar",
  "user_role": "reviewer",
  "cohort": "v2-experiment",
  "project_phase": "judgment",
  "globalSessionId": "abc123-xyz789",
  "timestamp": "2025-05-16T09:00:00Z"
}
```

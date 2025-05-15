#!/bin/bash

set -eo pipefail

echo "📁 Creating SAP-level doc structure..."

mkdir -p docs/platform/{access,analytics,billing,config,environment,events,governance,metrics,observability,teams}
mkdir -p docs/features/{admin,dashboard/components,export,onboarding,reviewer,rubric,scoring,search,session,showcase}

touch docs/README.md

while IFS='|' read -r path content; do
  mkdir -p "$(dirname "$path")"
  echo -e "$content" > "$path"
  echo "📄 Created $path"
done <<EOF
docs/platform/access/role-matrix.md|# Role Matrix\n\n// TODO: Enumerate all permissions per platform role (Reviewer, Admin, Observer)
docs/platform/access/org-invites.md|# Org Invitation Flow\n\n// TODO: Define user invite, join, leave, and reassignment behavior
docs/platform/environment/feature-flags.md|# Feature Flags\n\n// TODO: List and explain all runtime flags, toggles, and plan-gated features
docs/platform/governance/audit-log-spec.md|# Audit Logging\n\n// TODO: Specify how rubric edits, scoring actions, and exports are logged
docs/platform/analytics/system.md|# Analytics Architecture\n\n// TODO: Track reviewer scoring stats, funnels, heatmaps, QA reports
docs/platform/config/env-modes.md|# Environment Modes\n\n// TODO: Sandbox vs Production vs Staging runtime mode definition
docs/platform/billing/plan-tiers.md|# Billing Plan Tiers\n\n// TODO: Define Free vs Pro vs Enterprise and feature caps
docs/platform/observability/telemetry.md|# System Telemetry\n\n// TODO: LLM agent latency, scoring crashes, queue state
docs/platform/teams/reviewer-hierarchy.md|# Reviewer Teams\n\n// TODO: Define team/project folders, tier roles, scoped dashboards
docs/features/onboarding/flow.md|# Onboarding Flow\n\n// TODO: Step-by-step identity, rubric, walkthrough flow for new users
docs/features/dashboard/components/task-list.md|# Task List\n\n// TODO: Describe UI features of dashboard task table
docs/features/dashboard/components/export-panel.md|# Export Panel\n\n// TODO: Show JSONL state, schema hash, reviewer metadata
docs/features/reviewer/calibration-mode.md|# Reviewer Calibration\n\n// TODO: Define blind scoring, gold label diffing, QA report export
docs/features/rubric/inline-help.md|# Inline Rubric Help\n\n// TODO: Tooltip UX for rubric usage per step
docs/features/search/global-search.md|# Global Search\n\n// TODO: Behavior of task search, autocomplete, scoped filters
docs/features/scoring/step-annotator.md|# Step Scoring UI\n\n// TODO: Scoring scale, comment, tagging, rubric assist, blind toggle
docs/features/showcase/share-links.md|# Showcase & Share Links\n\n// TODO: Figma-style fork/share/public preview
docs/features/session/log-review-event.md|# Session Logging\n\n// TODO: Capture each scoring/reviewer action with task+step+rubric+timestamp
docs/features/admin/reviewer-metrics.md|# Reviewer Metrics\n\n// TODO: Visualizations and metrics for reviewer agreement, throughput, accuracy
docs/features/admin/agreement-matrix.md|# Reviewer Agreement Matrix\n\n// TODO: Heatmap of scoring variance, task-level conflict flagging
docs/features/export/export-readiness.md|# Export Readiness\n\n// TODO: Gate export on schema pass, rubric version match, full scoring
docs/features/export/export-ci-snapshot.md|# Export CI Snapshot\n\n// TODO: Export hash generation, validation, regression triggers
docs/features/export/jsonl-preview.md|# JSONL Preview UI\n\n// TODO: Display export structure, line count, schema field validation
docs/features/reviewer/history-viewer.md|# Reviewer History Viewer\n\n// TODO: Timeline of scored tasks, durations, rubrics used
docs/features/rubric/rubric-versioning.md|# Rubric Versioning\n\n// TODO: Locking behavior, changelogs, version rollback UX
docs/features/scoring/score-consensus.md|# Score Consensus Logic\n\n// TODO: Multi-reviewer agreement, auto-escalation thresholds
docs/features/scoring/confidence-toggles.md|# Confidence Toggle\n\n// TODO: Allow reviewers to mark step certainty (low/med/high)
docs/features/session/logout-behavior.md|# Logout Behavior\n\n// TODO: Secure Supabase session invalidation, redirect logic
EOF

echo "✅ SAP-grade enterprise docs scaffolded."


#!/bin/bash

set -euo pipefail

bold=$(tput bold || true)
normal=$(tput sgr0 || true)
green=$(tput setaf 2 || true)
cyan=$(tput setaf 6 || true)

log() {
  echo "${bold}${cyan}==>${normal} $1"
}

confirm_created() {
  echo "${green}✔${normal} $1"
}

create_file() {
  local dir="$1"
  local file="$2"
  mkdir -p "$dir"
  local path="$dir/$file"
  if [ ! -e "$path" ]; then
    touch "$path"
    confirm_created "$path"
  else
    echo "↪ Skipped (exists): $path"
  fi
}

log "🚀 ReasonOps: Scaffolding PARITY++ feature files..."

# --- Reviewer Metrics + Performance Intelligence ---
log "[metrics] Reviewer intelligence"
create_file backend/metrics computeReviewerMetrics.ts
create_file backend/metrics reviewerDriftIndex.ts
create_file backend/metrics rubricUsageHeatmap.ts
create_file backend/metrics reviewerEntropy.ts
create_file backend/services ReviewerInsightsService.ts

# --- LLM Evaluation Intelligence ---
log "[metrics] Model evaluation"
create_file backend/metrics modelScoreDelta.ts
create_file backend/metrics modelVersionDrift.ts
create_file backend/metrics semanticRegressionDetector.ts
create_file backend/metrics regretScoreTracker.ts

# --- Rubric Intelligence & Drift Tracking ---
log "[rubric] Usage + drift"
create_file backend/metrics rubricScoreDrift.ts
create_file backend/metrics rubricAdoptionRate.ts
create_file backend/services RubricAnalysisService.ts

# --- Reviewer Collaboration & Consensus ---
log "[collab] Reviewer interaction layer"
create_file backend/services ReviewerCollaborationService.ts
create_file backend/services ReviewerConsensusService.ts
create_file frontend/components/review ThreadsPanel.tsx
create_file frontend/components/review ConsensusBadge.tsx

# --- Agent + AI Integrations ---
log "[ai] Scoring agents"
create_file backend/agents AutoEvaluatorAgent.ts
create_file backend/agents CritiqueRewriteAgent.ts
create_file backend/agents RubricExplainerAgent.ts
create_file backend/agents PromptSummarizerAgent.ts
create_file backend/services AgentExecutionService.ts

# --- Dataset + Training Export Tools ---
log "[ml] Training & finetune prep"
create_file backend/exporters/finetune generateTrainJSONL.ts
create_file backend/exporters/finetune taskCompletionJoin.ts
create_file backend/exporters/finetune stepJudgmentJoin.ts

# --- Documentation ---
log "[docs] Metrics + roadmap"
create_file docs/metrics README.md
create_file docs/metrics strategic-metrics.md
create_file docs/metrics reviewer-metrics-spec.md
create_file docs/product PARITY_PLAN.md
create_file docs/product PLATFORM_OVERVIEW.md
create_file docs/product plans-and-tiers.md

log "✅ Scaffolding complete. PARITY++ feature set now tracked."
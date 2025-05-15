#!/bin/bash
set -euo pipefail

echo "📦 Populating SAP-grade documentation templates..."

BASE="./docs"
ACCESS_MATRIX_FILE="./docs/.accessmatrix.yaml"

# Modules to scaffold
MODULES=(
  api
  api-reference
  architecture
  deployment
  examples
  features
  guides
  metrics
  models
  platform
  prompts
  schema
  security
  strategy
  tasklist
  licensing
  .vitepress
)

# Shared structure per module
SUBSECTIONS=(
  index.md
  access.md
  schema.md
  ui.md
)

# Additional submodules
FEATURES_SUBMODULES=(
  reviewer
  reviewer/calibration-mode
  reviewer/history-viewer
  admin
  admin/agreement-matrix
  admin/reviewer-metrics
  search
  search/global-search
  dashboard
  dashboard/components
  dashboard/components/export-panel
  dashboard/components/task-list
  scoring
  scoring/confidence-toggles
  scoring/score-consensus
  scoring/step-annotator
  export
  export/export-ci-snapshot
  export/export-readiness
  export/jsonl-preview
  showcase
  showcase/share-links
  rubric
  rubric/inline-help
  rubric/rubric-versioning
  onboarding
  onboarding/flow
  session
  session/log-review-event
  session/logout-behavior
)

PLATFORM_SUBMODULES=(
  access
  analytics
  billing
  config
  environment
  governance
  observability
  teams
)

SCHEMA_SUBMODULES=(
  judgment
  step
  completion
  audit
  task
  comparison
  relationships
  dataset-format
  versioning
  reviewer
)

GUIDES_SUBMODULES=(
  advanced
)

function scaffold_module() {
  local path="$1"
  for file in "${SUBSECTIONS[@]}"; do
    target="$path/$file"
    mkdir -p "$(dirname "$target")"
    touch "$target"
    echo "✅ Created $target"
  done
}

for mod in "${MODULES[@]}"; do
  mkdir -p "$BASE/$mod"
  scaffold_module "$BASE/$mod"
done

for feat in "${FEATURES_SUBMODULES[@]}"; do
  mkdir -p "$BASE/features/$feat"
  scaffold_module "$BASE/features/$feat"
done

for plat in "${PLATFORM_SUBMODULES[@]}"; do
  mkdir -p "$BASE/platform/$plat"
  scaffold_module "$BASE/platform/$plat"
done

for sch in "${SCHEMA_SUBMODULES[@]}"; do
  mkdir -p "$BASE/schema/$sch"
  scaffold_module "$BASE/schema/$sch"
done

for guide in "${GUIDES_SUBMODULES[@]}"; do
  mkdir -p "$BASE/guides/$guide"
  scaffold_module "$BASE/guides/$guide"
done

echo "✅ SAP-grade doc templates populated."

echo "📜 Generating Palantir-style access matrix..."
cat > "$ACCESS_MATRIX_FILE" <<EOL
# Palantir-style Access Matrix
version: 1
modules:
  - name: features
    roles: [admin, reviewer, analyst]
  - name: models
    roles: [admin, engineer]
  - name: schema
    roles: [engineer, analyst]
  - name: api
    roles: [engineer]
  - name: prompts
    roles: [researcher, analyst]
  - name: platform
    roles: [admin, engineer]
  - name: licensing
    roles: [admin]
  - name: metrics
    roles: [analyst]
  - name: strategy
    roles: [executive, admin]
  - name: deployment
    roles: [devops, admin]
  - name: security
    roles: [admin, security]
  - name: guides
    roles: [all]
  - name: examples
    roles: [all]
  - name: tasklist
    roles: [admin]
EOL
echo "✅ Created $ACCESS_MATRIX_FILE"

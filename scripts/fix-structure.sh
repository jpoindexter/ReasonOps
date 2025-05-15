

#!/bin/bash

#
# Migrate backend/frontend to Palintar-style modular structure
#

# Root path
ROOT="$(dirname "$0")/.."
set -e

echo "Restructuring ReasonOps for Palintar-style modular backend/frontend..."

# --- BACKEND ---

mkdir -p "$ROOT/backend/features"
mkdir -p "$ROOT/backend/platform"

echo "Moving backend feature modules..."
if [ -d "$ROOT/backend/api/compare" ]; then
  mv "$ROOT/backend/api/compare" "$ROOT/backend/features/compare"
fi
if [ -d "$ROOT/backend/api/completion" ]; then
  mv "$ROOT/backend/api/completion" "$ROOT/backend/features/completion"
fi
if [ -d "$ROOT/backend/api/judgment" ]; then
  mv "$ROOT/backend/api/judgment" "$ROOT/backend/features/judgment"
fi
if [ -d "$ROOT/backend/api/step" ]; then
  mv "$ROOT/backend/api/step" "$ROOT/backend/features/step"
fi
if [ -d "$ROOT/backend/api/task" ]; then
  mv "$ROOT/backend/api/task" "$ROOT/backend/features/task"
fi

if [ -f "$ROOT/backend/services/ReviewerAgreementService.ts" ]; then
  mv "$ROOT/backend/services/ReviewerAgreementService.ts" "$ROOT/backend/features/reviewer/"
fi
if [ -f "$ROOT/backend/services/ReviewerService.ts" ]; then
  mv "$ROOT/backend/services/ReviewerService.ts" "$ROOT/backend/features/reviewer/"
fi
if [ -f "$ROOT/backend/services/ReviewerStatsService.ts" ]; then
  mv "$ROOT/backend/services/ReviewerStatsService.ts" "$ROOT/backend/features/reviewer/"
fi

if [ -d "$ROOT/backend/audit" ]; then
  mv "$ROOT/backend/audit" "$ROOT/backend/platform/audit"
fi
if [ -d "$ROOT/backend/analytics" ]; then
  mv "$ROOT/backend/analytics" "$ROOT/backend/platform/analytics"
fi
if [ -d "$ROOT/backend/config" ]; then
  mv "$ROOT/backend/config" "$ROOT/backend/platform/config"
fi
if [ -d "$ROOT/backend/jobs" ]; then
  mv "$ROOT/backend/jobs" "$ROOT/backend/platform/jobs"
fi
if [ -d "$ROOT/backend/metrics" ]; then
  mv "$ROOT/backend/metrics" "$ROOT/backend/platform/metrics"
fi
if [ -d "$ROOT/backend/queues" ]; then
  mv "$ROOT/backend/queues" "$ROOT/backend/platform/queues"
fi

# --- FRONTEND ---

mkdir -p "$ROOT/frontend/features"

echo "Moving frontend feature modules..."
if [ -d "$ROOT/frontend/app/task" ]; then
  mv "$ROOT/frontend/app/task" "$ROOT/frontend/features/task"
fi
if [ -d "$ROOT/frontend/app/evaluate" ]; then
  mv "$ROOT/frontend/app/evaluate" "$ROOT/frontend/features/evaluate"
fi
if [ -d "$ROOT/frontend/app/admin" ]; then
  mv "$ROOT/frontend/app/admin" "$ROOT/frontend/features/admin"
fi

if [ -d "$ROOT/frontend/components/compare" ]; then
  mv "$ROOT/frontend/components/compare" "$ROOT/frontend/features/compare/components"
fi
if [ -d "$ROOT/frontend/components/dashboard" ]; then
  mv "$ROOT/frontend/components/dashboard" "$ROOT/frontend/features/dashboard/components"
fi
if [ -d "$ROOT/frontend/components/rubric" ]; then
  mv "$ROOT/frontend/components/rubric" "$ROOT/frontend/features/rubric/components"
fi
if [ -d "$ROOT/frontend/components/panels/step" ]; then
  mv "$ROOT/frontend/components/panels/step" "$ROOT/frontend/features/step/components"
fi

# Preserve shared components
mkdir -p "$ROOT/frontend/shared/ui"
if [ -d "$ROOT/frontend/components/ui" ]; then
  mv "$ROOT/frontend/components/ui" "$ROOT/frontend/shared/ui"
fi
if [ -d "$ROOT/frontend/components/layout" ]; then
  mv "$ROOT/frontend/components/layout" "$ROOT/frontend/shared/layout"
fi
if [ -d "$ROOT/frontend/components/feedback" ]; then
  mv "$ROOT/frontend/components/feedback" "$ROOT/frontend/shared/feedback"
fi

# --- Clean Up Empty Directories ---
find "$ROOT/backend/api" -type d -empty -delete
find "$ROOT/frontend/app" -type d -empty -delete
find "$ROOT/frontend/components/panels" -type d -empty -delete

echo "Palintar-style modular structure applied."
echo "Migration complete. Please run: pnpm run lint:fix && pnpm run typecheck"
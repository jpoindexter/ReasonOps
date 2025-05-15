import fs from 'node:fs/promises';
import path from 'node:path';

type TrackerSection = {
  name: string;
  status: 'not started' | 'in progress' | 'complete';
  schema?: string;
  backend?: string;
  frontend?: string;
  docs?: string;
  tests?: string;
};

const TRACKER: TrackerSection[] = [
  {
    name: 'Authentication',
    status: 'not started',
    schema: 'schemas/platform/access',
    backend: 'backend/guards',
    frontend: 'frontend/app/(auth)',
    docs: 'docs/platform/access',
    tests: 'tests/backend/api/auth',
  },
  {
    name: 'Task Management',
    status: 'not started',
    schema: 'schemas/task',
    backend: 'backend/features/task',
    frontend: 'frontend/features/task',
    docs: 'docs/features/task',
    tests: 'tests/frontend/integration/TaskForm.test.tsx',
  },
  {
    name: 'Step Evaluation',
    status: 'not started',
    schema: 'schemas/step',
    backend: 'backend/features/step',
    frontend: 'frontend/features/step',
    docs: 'docs/features/scoring/step-annotator',
    tests: 'tests/frontend/integration/StepForm.test.tsx',
  },
  {
    name: 'Reviewer Analytics',
    status: 'not started',
    schema: 'schemas/reviewer',
    backend: 'backend/features/reviewer',
    frontend: 'frontend/features/dashboard/components',
    docs: 'docs/features/admin/reviewer-metrics',
    tests: 'tests/backend/api/reviewer',
  },
  {
    name: 'Export Flow',
    status: 'not started',
    schema: 'schemas/completion',
    backend: 'backend/exporters/jsonl',
    frontend: 'frontend/features/dashboard/components/export-panel',
    docs: 'docs/features/export',
    tests: 'tests/backend/exporters',
  },
];

const OUTPUT_PATH = path.join(process.cwd(), 'docs', 'tasklist', 'tracker.json');

async function writeTrackerFile(): Promise<void> {
  const json = JSON.stringify(TRACKER, null, 2);
  await fs.mkdir(path.dirname(OUTPUT_PATH), { recursive: true });
  await fs.writeFile(OUTPUT_PATH, json);
  console.log(`✅ Tracker written to ${OUTPUT_PATH}`);
}

writeTrackerFile().catch((err) => {
  console.error('❌ Failed to generate tracker:', err);
  process.exit(1);
});

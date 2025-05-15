import { promises as fs } from 'fs';
import path from 'path';

type Capability = {
  name: string;
  status: string;
  schema: string;
  backend: string;
  frontend: string;
  docs: string;
  tests: string;
};

const TRACKER_PATH = path.resolve('docs/features/_tracker.md');

const capabilities: Capability[] = [
  {
    name: 'Task Editor',
    status: '✅ Complete',
    schema: 'schemas/task/task.ts',
    backend: 'backend/features/task/route.ts',
    frontend: 'frontend/features/task/page.tsx',
    docs: 'docs/features/task/index.md',
    tests: 'tests/frontend/TaskForm.test.tsx',
  },
  {
    name: 'Judgment Flow',
    status: '🚧 In Progress',
    schema: 'schemas/judgment/judgment.ts',
    backend: 'TODO',
    frontend: 'frontend/features/step/components/StepScoringPanel.tsx',
    docs: 'docs/features/judgment/index.md',
    tests: 'TODO',
  },
  {
    name: 'Reviewer Analytics',
    status: '🛠 Planned',
    schema: 'schemas/reviewer/reviewer.ts',
    backend: 'backend/features/reviewer/ReviewerStatsService.ts',
    frontend: 'frontend/features/dashboard/components/ReviewerAccuracyChart.tsx',
    docs: 'docs/features/dashboard/index.md',
    tests: 'TODO',
  },
  {
    name: 'Rubric Tooltips',
    status: '✅ Complete',
    schema: '(shared schema)',
    backend: '(not applicable)',
    frontend: 'frontend/features/rubric/components/RubricTooltip.tsx',
    docs: 'docs/features/rubric/index.md',
    tests: 'TODO',
  },
  {
    name: 'Diff Compare View',
    status: '✅ Complete',
    schema: '(uses step schema)',
    backend: '(not applicable)',
    frontend: 'frontend/features/compare/components/DiffInlineView.tsx',
    docs: 'docs/features/compare/index.md',
    tests: 'TODO',
  },
  {
    name: 'Step Rewrite Panel',
    status: '🛠 Planned',
    schema: 'TODO',
    backend: 'TODO',
    frontend: 'TODO',
    docs: 'TODO',
    tests: 'TODO',
  },
  {
    name: 'Export Dataset Flow',
    status: '🛠 Planned',
    schema: 'TODO',
    backend: 'TODO',
    frontend: 'TODO',
    docs: 'TODO',
    tests: 'TODO',
  },
  {
    name: 'Auto-Judgment Queue',
    status: '🛠 Planned',
    schema: 'TODO',
    backend: 'TODO',
    frontend: 'TODO',
    docs: 'TODO',
    tests: 'TODO',
  },
  {
    name: 'Snapshot Validation',
    status: '🛠 Planned',
    schema: 'TODO',
    backend: 'TODO',
    frontend: 'TODO',
    docs: 'TODO',
    tests: 'TODO',
  },
  {
    name: 'Versioning Strategy',
    status: '🛠 Planned',
    schema: 'TODO',
    backend: 'TODO',
    frontend: 'TODO',
    docs: 'TODO',
    tests: 'TODO',
  },
  {
    name: 'Reviewer Agreement Heatmap',
    status: '🛠 Planned',
    schema: 'TODO',
    backend: 'TODO',
    frontend: 'TODO',
    docs: 'TODO',
    tests: 'TODO',
  },
];

const renderTracker = (capabilities: Capability[]) => {
  const rows = capabilities.map((cap) =>
    `| ${cap.name.padEnd(27)} | ${cap.status.padEnd(13)} | ${cap.schema.padEnd(28)} | ${cap.backend.padEnd(50)} | ${cap.frontend.padEnd(65)} | ${cap.docs.padEnd(30)} | ${cap.tests.padEnd(30)} |`
  );
  return [
    '| Capability                 | Status         | Schema                       | Backend                                           | Frontend                                                         | Docs                             | Tests                            |',
    '| -------------------------- | -------------- | ---------------------------- | ------------------------------------------------- | ---------------------------------------------------------------- | -------------------------------- | -------------------------------- |',
    ...rows,
  ].join('\n');
};

async function main() {
  const header = '# ✅ ReasonOps Feature Delivery Tracker\n\nAssociated automated tests ensuring quality. Palintar/SAP-style capability tracking.\n\n';
  const table = renderTracker(capabilities);
  const full = `${table}\n\n${capabilities.map(cap => {
    return `## ${cap.status} ${cap.name}\n\n- Status: ${cap.status}\n- Schema: ${cap.schema}\n- Backend: ${cap.backend}\n- Frontend: ${cap.frontend}\n- Docs: ${cap.docs}\n- Tests: ${cap.tests}\n\n---\n`;
  }).join('\n')}`;
  await fs.writeFile(TRACKER_PATH, `${header}${full}`, 'utf-8');
  console.log(`Wrote updated tracker to ${TRACKER_PATH}`);
}

main().catch(err => {
  console.error(err);
  process.exit(1);
});

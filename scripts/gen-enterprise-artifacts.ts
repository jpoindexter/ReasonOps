// gen-enterprise-artifacts.ts
// Generates ReasonOps production artifacts for schema introspection, bundling, and compliance.

import { generateSchemaDocs } from './gen-schema-docs';
import { generateExampleSnapshots } from './gen-schema-examples';
import { generateSchemaTypes } from './gen-schema-types';
import { info, warn, done } from './log';

async function main() {
  info('Generating enterprise-grade schema artifacts...');

  const args = process.argv.slice(2);
  const shouldRunDocs = args.includes('--docs') || args.length === 0;
  const shouldRunExamples = args.includes('--examples') || args.length === 0;
  const shouldRunTypes = args.includes('--types') || args.length === 0;

  let successForDocs = true;
  let successForExamples = true;
  let successForTypes = true;

  if (shouldRunDocs) {
    try {
      await generateSchemaDocs();
    } catch (err) {
      successForDocs = false;
      warn('generateSchemaDocs failed', err);
    }
  }

  if (shouldRunExamples) {
    try {
      await generateExampleSnapshots();
    } catch (err) {
      successForExamples = false;
      warn('generateExampleSnapshots failed', err);
    }
  }

  if (shouldRunTypes) {
    try {
      await generateSchemaTypes();
    } catch (err) {
      successForTypes = false;
      warn('generateSchemaTypes failed', err);
    }
  }

  done('Artifact generation complete.');

  const summary = [
    ['Schema Docs', successForDocs],
    ['Example Snapshots', successForExamples],
    ['Schema Types', successForTypes],
  ];

  console.table(
    summary.map(([task, success]) => ({
      Task: task,
      Status: success ? '✅ Success' : '⚠️ Failed or Skipped',
    }))
  );

  if (!successForDocs || !successForExamples || !successForTypes) {
    process.exit(2);
  }
}

main().catch((err) => {
  console.error('❌ Unhandled error in gen-enterprise-artifacts.ts:', err);
  process.exit(1);
});

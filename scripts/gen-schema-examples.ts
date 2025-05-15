// gen-schema-examples.ts (optional script)

/**
 * @file gen-schema-examples.ts
 * @description
 * Enterprise-grade script to generate example validation outputs
 * from all frontend Zod schemas. Outputs are saved to
 * `docs/examples/*.example.json` for snapshot-based documentation.
 *
 * Run via: pnpm tsx scripts/gen-schema-examples.ts
 */

import { promises as fs } from 'fs';
import path from 'path';
import fg from 'fast-glob';
import { pathToFileURL } from 'url';
import { fileURLToPath } from 'url';
import { dirname } from 'path';
import { ZodTypeAny } from 'zod';

// No-op message removed for final version

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const SCHEMA_GLOB = 'frontend/schemas/**/schema.ts';
const OUTPUT_DIR = 'docs/examples';

function normalize(obj: unknown): unknown {
  return JSON.parse(JSON.stringify(obj));
}

/**
 * Finds all Zod schema files and generates example outputs
 * by parsing a mock object. Outputs are written as JSON
 * files named after their schema.
 *
 * @returns {Promise<void>}
 */
async function generateExamples() {
  try {
    // Find all schema files matching the glob pattern
    const schemaFiles = await fg(SCHEMA_GLOB);
    if (schemaFiles.length === 0) {
      console.warn(`⚠️  No schema files found matching: ${SCHEMA_GLOB}`);
      return;
    }
    // Ensure output directory exists
    await fs.mkdir(OUTPUT_DIR, { recursive: true });

    // Process each schema file
    const results = await Promise.allSettled(
      schemaFiles.map(async (filePath) => {
        const schemaName = path.basename(path.dirname(filePath));
        const fullPath = path.resolve(__dirname, '..', filePath);
        try {
          // Dynamically import the schema module
          const mod = await import(pathToFileURL(fullPath).href);
          const schema = mod.schema || mod.default;
          if (!schema || typeof schema.parse !== 'function') {
            throw new Error(`Missing or invalid schema export in ${filePath}`);
          }
          const zodSchema = schema as ZodTypeAny;

          const example = normalize(zodSchema.parse({}));
          const banner = `/* ⚠️ AUTO-GENERATED — DO NOT EDIT BY HAND */\n`;
          const outPath = path.join(OUTPUT_DIR, `${schemaName}.example.json`);
          await fs.writeFile(outPath, banner + JSON.stringify(example, null, 2), 'utf-8');
          return { schemaName, success: true };
        } catch (err) {
          return { schemaName, success: false, error: (err as Error).message };
        }
      })
    );

    // Log summary of results
    const successes = results.filter((r) => r.status === 'fulfilled' && r.value.success);
    const failures = results.filter((r) => r.status === 'fulfilled' && !r.value.success);

    console.log(`📸 Generated ${successes.length} examples.`);
    if (failures.length > 0) {
      console.warn(`⚠️ ${failures.length} failures:`);
      for (const f of failures) {
        console.warn(`- ${f.value.schemaName}: ${f.value.error}`);
      }
    }
  } catch (err) {
    console.error('🚨 Error during example generation:', err);
    throw err;
  }
}

// Run the script and handle top-level errors
generateExamples().catch((err) => {
  console.error('🚨 gen-schema-examples.ts failed\n', err);
  process.exit(1);
});

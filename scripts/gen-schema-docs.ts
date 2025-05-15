/**
 * Converts all Zod schemas in `frontend/schemas/**/schema.ts` into
 * enterprise-readable OpenAPI-compatible YAML schema files at
 * `docs/features/**/schema.yaml`. Used in doc validation pipelines.
 */

// gen-schema-docs.ts (enterprise-grade schema.yaml generator)

import { promises as fs } from 'fs';
import { globby } from 'fast-glob';
import { parse } from 'path';
import { fileURLToPath } from 'url';
import { dirname, join, relative, resolve } from 'path';
import { zodToJsonSchema } from 'zod-to-json-schema';
import * as yaml from 'yaml';
import { pathToFileURL } from 'url';

const rootDir = resolve(fileURLToPath(import.meta.url), '../../..');
const srcDir = join(rootDir, 'frontend/schemas');
const docsDir = join(rootDir, 'docs/features');

function logInfo(msg: string) {
  console.log(`🌀 [gen-schema-docs] ${msg}`);
}

function logSuccess(msg: string) {
  console.log(`✅ [gen-schema-docs] ${msg}`);
}

function logError(msg: string) {
  console.error(`❌ [gen-schema-docs] ${msg}`);
}

async function ensureDirExists(path: string) {
  await fs.mkdir(path, { recursive: true });
}

async function generateSchemaDocs() {
  logInfo('Scanning frontend/schemas/**/schema.ts...');

  const schemaFiles = await globby(['**/schema.ts'], { cwd: srcDir, absolute: true });

  for (const filePath of schemaFiles) {
    const { dir } = parse(filePath);
    const feature = relative(srcDir, dir);
    const targetDir = join(docsDir, feature);
    const outFile = join(targetDir, 'schema.yaml');

    try {
      const mod = await import(pathToFileURL(filePath).toString());
      const schema = mod.default || mod.schema;

      if (!schema) {
        logError(`Missing export in ${filePath}`);
        continue;
      }

      const jsonSchema = zodToJsonSchema(schema, feature);
      const yamlSchema = yaml.stringify(jsonSchema);

      await ensureDirExists(targetDir);
      await fs.writeFile(outFile, yamlSchema, 'utf-8');
      logSuccess(`Wrote ${relative(rootDir, outFile)}`);
    } catch (err) {
      logError(`Failed to generate for ${filePath}: ${(err as Error).message}`);
    }
  }

  logInfo(`✅ Completed ${schemaFiles.length} schema conversions.`);
}

generateSchemaDocs().catch((err) => {
  logError(`Unhandled error: ${(err as Error).message}`);
  console.error(err);
  process.exit(1);
});

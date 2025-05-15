import { promises as fs } from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import fg from 'fast-glob';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const TEST_ROOT = path.resolve(__dirname, '../tests');
const SCHEMA_GLOB = 'frontend/schemas/**/{schema,form}.ts';

const scaffoldSchemaTests = async (): Promise<void> => {
  const files = await fg(SCHEMA_GLOB, { onlyFiles: true });
  for (const file of files) {
    const base = file.split('/').slice(2, -1).join('/');
    const type = file.endsWith('form.ts') ? 'form' : 'schema';
    const testDir = path.join(TEST_ROOT, 'frontend', 'schemas', base);
    const testFile = path.join(testDir, `${type}.test.ts`);

    const importPath = `@schemas/${base}/${type}`;
    const content = `import { describe, expect, it } from 'vitest';\nimport * as mod from '${importPath}';\n\ndescribe('${base}/${type}', () => {\n  it('should be defined', () => {\n    expect(mod).toBeDefined();\n  });\n});\n`;

    await fs.mkdir(testDir, { recursive: true });
    try {
      await fs.access(testFile);
      console.log(`⚠️  Skipped existing: ${testFile}`);
    } catch {
      await fs.writeFile(testFile, content);
      console.log(`✅ Created: ${testFile}`);
    }
  }
};

void scaffoldSchemaTests();

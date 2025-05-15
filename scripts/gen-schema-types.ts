// gen-schema-types.ts

import { writeFile } from 'fs/promises';
import { glob } from 'fast-glob';
import path from 'path';
import { Project } from 'ts-morph';

const SCHEMA_DIR = 'frontend/schemas';
const OUTPUT_FILE = 'shared/types/generated-schema.d.ts';
const BANNER = `/* AUTO-GENERATED: DO NOT EDIT. Run scripts/gen-schema-types.ts */\n\n`;

async function generateTypes(): Promise<void> {
  const files = await glob(`${SCHEMA_DIR}/**/schema.ts`);

  const project = new Project({
    tsConfigFilePath: 'tsconfig.json',
  });

  await project.resolveSourceFileDependencies();

  const typeExports: string[] = [];

  for (const file of files) {
    const source = project.addSourceFileAtPath(file);
    const exportSymbols = source.getExportSymbols();
    const relPath = path.relative('frontend/schemas', file).replace(/\.ts$/, '');
    const typeNamePrefix = relPath
      .split(path.sep)
      .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
      .join('');

    for (const sym of exportSymbols) {
      const name = sym.getName();
      const exported = sym.getAliasedSymbol() ?? sym.getDeclarations()[0];
      if (!exported) continue;
      const isZod = exported.getText().includes('z.object(');
      if (!isZod) continue;

      const typeName = `${typeNamePrefix}${name.replace(/Schema$/, '')}`;
      typeExports.push(`export type ${typeName} = z.infer<typeof ${name}>;`);
    }
    if (typeExports.length === 0) {
      console.warn(`⚠️  No Zod schemas found in ${file}`);
    }
  }

  typeExports.sort();

  const content = [BANNER, `import { z } from 'zod';`, '', ...typeExports, ''].join('\n');

  await writeFile(OUTPUT_FILE, content, 'utf8');
  console.log(`✅ Generated ${OUTPUT_FILE}`);
  console.log(`🧾 Scanned ${files.length} files, generated ${typeExports.length} types.`);
}

generateTypes().catch((err) => {
  console.error('❌ Failed to generate schema types:', err);
  process.exit(1);
});

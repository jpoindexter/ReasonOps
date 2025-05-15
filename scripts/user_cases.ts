// scripts/polish_use_cases.ts
import { promises as fs } from 'fs';
import path from 'path';

const useCasesPath = path.join('docs', 'use-cases');

async function polishUseCaseDocs(): Promise<void> {
  const folders = await fs.readdir(useCasesPath, { withFileTypes: true });
  for (const folderEntry of folders) {
    if (!folderEntry.isDirectory()) continue;
    const folder = folderEntry.name;
    const folderPath = path.join(useCasesPath, folder);
    const files = await fs.readdir(folderPath);

    // Rename index.md → <folder>.md
    const indexPath = path.join(folderPath, 'index.md');
    const canonicalPath = path.join(folderPath, `${folder}.md`);
    if (files.includes('index.md')) {
      await fs.rename(indexPath, canonicalPath);
      console.log(`✏️ Renamed: ${folder}/index.md → ${folder}/${folder}.md`);
    }

    // Generate link list for _index.md
    const markdownFiles = (await fs.readdir(folderPath))
      .filter((f) => f.endsWith('.md') && f !== '_index.md')
      .sort();

    const links = markdownFiles
      .map((f) => {
        const label = f
          .replace(/\.md$/, '')
          .replace(/-/g, ' ')
          .replace(/\b\w/g, (c) => c.toUpperCase());
        return `- [${label}](./${f})`;
      })
      .join('\n');

    const header = `# ${folder.replace(/-/g, ' ').replace(/\b\w/g, (c) => c.toUpperCase())}\n\n`;
    const description = `> This directory contains ReasonOps use cases for **${folder.replace(/-/g, ' ')}**.\n\n`;

    const newIndex = header + description + links + '\n';
    await fs.writeFile(path.join(folderPath, '_index.md'), newIndex, 'utf8');
    console.log(`🧭 Updated: ${folder}/_index.md`);
  }
}

polishUseCaseDocs().catch(console.error);

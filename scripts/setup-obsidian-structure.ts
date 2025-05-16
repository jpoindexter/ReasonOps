import path, { dirname } from 'path';
import { fileURLToPath } from 'url';
import fs from 'fs/promises';
import matter from 'gray-matter';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const DOCS_ROOT = path.resolve(__dirname, '../docs');

interface Frontmatter {
  title: string;
  updated: string;
  tags: string[];
  type: string;
  [key: string]: unknown;
}

// Add helper to check if file is stubbed
const isStubbedFile = (content: string): boolean => {
  const plain = content.replace(/[#>*`-]/g, '').trim();
  return plain.length < 100;
};

// Add helper to enrich frontmatter
const enrichFrontmatter = (data: Partial<Frontmatter>, filePath: string): Frontmatter => {
  return {
    title: data.title ?? path.basename(filePath, '.md'),
    updated: data.updated ?? new Date().toISOString(),
    tags: Array.isArray(data.tags) ? data.tags : ['reasonops'],
    type: data.type ?? 'doc',
    ...data,
  };
};

// Track stub files
const stubbedFiles: string[] = [];

/**
 * Formats a markdown file to be Obsidian-friendly:
 * - Ensures frontmatter is at top
 * - Normalizes heading spacing
 * - Trims excess whitespace
 * - Preserves ReasonOps structure
 */
const formatMarkdownFile = async (filePath: string): Promise<void> => {
  try {
    const content: string = await fs.readFile(filePath, 'utf8');
    const parsed = matter(content);
    const data: Partial<Frontmatter> = parsed.data;
    const body: string = parsed.content;

    // Normalize heading spacing and trim
    const cleaned: string = body
      .replace(/\r\n/g, '\n')
      .replace(/^\s*\n/gm, '') // remove leading empty lines
      .replace(/\n{3,}/g, '\n\n') // max two newlines
      .replace(/^\s*#+\s+/gm, (match) => match.trimStart()) // trim heading lines
      .trim();

    if (isStubbedFile(cleaned)) {
      stubbedFiles.push(filePath);
    }

    const enrichedData = enrichFrontmatter(data, filePath);
    const formatted = matter.stringify(cleaned, enrichedData);
    await fs.writeFile(filePath, formatted, 'utf8');
  } catch (error) {
    console.error(`Error formatting ${filePath}:`, error);
  }
};

const formatAllMarkdownFiles = async (baseDir: string): Promise<void> => {
  const entries = await fs.readdir(baseDir, { withFileTypes: true });

  for (const entry of entries) {
    const fullPath = path.join(baseDir, entry.name);
    if (entry.isDirectory()) {
      await formatAllMarkdownFiles(fullPath);
    } else if (entry.isFile() && fullPath.endsWith('.md')) {
      await formatMarkdownFile(fullPath);
    }
  }
};

// Run format pass
await formatAllMarkdownFiles(DOCS_ROOT);
console.log('✅ Obsidian formatting complete');
if (stubbedFiles.length) {
  console.log(`⚠️  Detected ${stubbedFiles.length} stubbed files:`);
  for (const file of stubbedFiles) console.log(`  - ${file}`);
}

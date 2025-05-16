import cliProgress from 'cli-progress';
import pLimit from 'p-limit';
import { setTimeout as wait } from 'timers/promises';
import path, { dirname } from 'path';
import { fileURLToPath } from 'url';
import fs from 'fs/promises';
import matter from 'gray-matter';
import { exec } from 'child_process';
import util from 'util';

const execAsync = util.promisify(exec);

// CLI model override
const userModelArg = process.argv.find((arg) => arg.startsWith('--model='));
const MODEL_NAME = userModelArg ? userModelArg.split('=')[1] : 'deepseek-coder:6.7b';

// Dry-run flag
const isDryRun = process.argv.includes('--dry-run');

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const DOCS_ROOT = path.resolve(__dirname, '../docs');
const TEMPLATE_PATH = path.join(DOCS_ROOT, 'templates', 'docs_template.md');
const LOGS_DIR = path.resolve(__dirname, '../logs');

// Dependency guard: Ensure cli-progress is installed
try {
  require.resolve('cli-progress');
} catch {
  console.error('Missing dependency: cli-progress. Install with `npm install cli-progress`');
  process.exit(1);
}

// Enrichment cache
const ENRICH_CACHE_PATH = path.join(LOGS_DIR, 'enrichment-cache.json');
interface EnrichmentCache {
  [key: string]: string | string[];
  [key: `${string}-tags`]: string[];
}
let enrichmentCache: EnrichmentCache = {};
try {
  enrichmentCache = JSON.parse(await fs.readFile(ENRICH_CACHE_PATH, 'utf8')) as EnrichmentCache;
} catch {
  enrichmentCache = {};
}

type MarkdownType = 'doc' | 'schema' | 'ui' | 'readme' | 'index' | 'other';

interface Frontmatter {
  title: string;
  updated: string;
  created: string;
  tags: string[] | string;
  type: string;
  status: string;
  visibility: string;
  author: string;
  links: string[] | string;
  [key: string]: unknown;
}

const STUB_LENGTH = 100;

const stubbedFiles: string[] = [];
const renamedFiles: string[] = [];
const createdTemplates: string[] = [];
const autoLinkedFiles: string[] = [];

// Utility: Is markdown file stubbed?
const isStubbedFile = (content: string): boolean => {
  const plain = content.replace(/[#>*`-]/g, '').trim();
  return plain.length < STUB_LENGTH;
};

// Utility: Enrich frontmatter with defaults
const enrichFrontmatter = (data: Partial<Frontmatter>, filePath: string): Frontmatter => {
  const now = new Date().toISOString();
  return {
    title: data.title ?? path.basename(filePath, '.md'),
    updated: data.updated ?? now,
    created: data.created ?? now,
    tags:
      Array.isArray(data.tags) && data.tags.length > 0
        ? data.tags
        : Array.isArray(enrichmentCache[`${filePath}-tags`])
          ? enrichmentCache[`${filePath}-tags`]
          : ['reasonops', 'enterprise'],
    type: data.type ?? 'doc',
    status: data.status ?? 'draft',
    visibility: data.visibility ?? 'public',
    author: data.author ?? 'ReasonOps System',
    links: Array.isArray(data.links)
      ? data.links
      : typeof data.links === 'string'
        ? [data.links]
        : [],
    ...data,
  };
};

// Utility: Standardize file/folder names and locations
type FileMoveAction = {
  from: string;
  to: string;
  reason: string;
};

const moveActions: FileMoveAction[] = [];

// Determine target folder and name based on file type and content
function getStandardLocationAndName(
  filePath: string,
  content: string
): { folder: string; name: string; type: MarkdownType } {
  // Heuristic: Use filename and headings to determine type
  const fileName = path.basename(filePath).toLowerCase();
  let type: MarkdownType = 'other';
  if (fileName === 'readme.md') type = 'readme';
  else if (fileName === 'index.md') type = 'index';
  else if (fileName === 'schema.md') type = 'schema';
  else if (fileName === 'ui.md') type = 'ui';
  else if (/schema/i.test(content)) type = 'schema';
  else if (/ui/i.test(content)) type = 'ui';
  else if (/readme/i.test(fileName)) type = 'readme';
  else if (/index/i.test(fileName)) type = 'index';
  else type = 'doc';

  let folder = path.dirname(filePath);
  let name = fileName;

  // Place index.md and readme.md at folder root, schema/ui in subfolders if needed
  if (type === 'readme' || type === 'index') {
    // leave in folder
    name = type === 'readme' ? 'README.md' : 'index.md';
  } else if (type === 'schema') {
    folder = path.join(folder, 'schema');
    name = 'schema.md';
  } else if (type === 'ui') {
    folder = path.join(folder, 'ui');
    name = 'ui.md';
  }
  // else: doc type, leave as is but standardize extension
  if (!name.endsWith('.md')) name += '.md';
  return { folder, name, type };
}

// Helper to normalize markdown content for comparison
function normalizeMarkdownContent(content: string): string {
  return content
    .replace(/\r\n/g, '\n')
    .replace(/\s+/g, ' ')
    .replace(/[#>*`-]/g, '')
    .trim()
    .toLowerCase();
}

// Helper to normalize folder names based on heuristics (lowercase singular, kebab-case)
function normalizeFolderName(folderPath: string): string {
  // Only normalize the last part of the folder path
  const parts = folderPath.split(path.sep);
  if (!parts.length) return folderPath;
  let last = parts[parts.length - 1];
  // Singularize common plurals and lower-case
  const map: Record<string, string> = {
    readmes: 'readme',
    readme: 'readme',
    schemas: 'schema',
    schema: 'schema',
    uis: 'ui',
    ui: 'ui',
    docs: 'doc',
    doc: 'doc',
    components: 'component',
    component: 'component',
  };
  let normalized = last.toLowerCase();
  if (map[normalized]) normalized = map[normalized];
  // Kebab-case: replace spaces/underscores with dash, collapse dashes, trim
  normalized = normalized
    .replace(/[\s_]+/g, '-')
    .replace(/-+/g, '-')
    .replace(/^-|-$/g, '');
  parts[parts.length - 1] = normalized;
  return parts.join(path.sep);
}

// Move file if needed, ensuring no overwrite (append -renamed-{timestamp} if target exists)
// Updated with content comparison and merging logic and folder normalization
async function safeMoveFile(from: string, to: string): Promise<string> {
  // Normalize the destination folder name
  const origDir = path.dirname(to);
  const normalizedDir = normalizeFolderName(origDir);
  let target = path.join(normalizedDir, path.basename(to));
  try {
    const targetExists = await fs
      .stat(target)
      .then(() => true)
      .catch(() => false);
    if (targetExists) {
      // Read both files
      const [sourceContent, targetContent] = await Promise.all([
        fs.readFile(from, 'utf8'),
        fs.readFile(target, 'utf8'),
      ]);
      const normSource = normalizeMarkdownContent(sourceContent);
      const normTarget = normalizeMarkdownContent(targetContent);

      if (normSource === normTarget) {
        // Contents are identical ignoring formatting, delete source
        if (isDryRun) {
          console.log(`[DRY RUN] Would perform: ${from} -> ${target} (delete duplicate source)`);
        } else {
          await fs.unlink(from);
        }
        renamedFiles.push(`${from} -> ${target} (duplicate content, source deleted)`);
        return target;
      }

      // Determine if both are likely stubs
      const sourceIsStub = isStubbedFile(normSource);
      const targetIsStub = isStubbedFile(normTarget);

      if (sourceIsStub && targetIsStub) {
        // Merge content separated by a line
        const mergedContent = targetContent.trim() + '\n\n---\n\n' + sourceContent.trim() + '\n';
        if (isDryRun) {
          console.log(`[DRY RUN] Would perform: ${from} merged into ${target} (both stubs)`);
        } else {
          await fs.writeFile(target, mergedContent, 'utf8');
          await fs.unlink(from);
        }
        renamedFiles.push(`${from} merged into ${target} (both stubs)`);
        return target;
      }

      // Determine which is more complete
      // Heuristic: longer content and more frontmatter keys (if any)
      const sourceMatter = matter(sourceContent);
      const targetMatter = matter(targetContent);
      const sourceMetaCount = Object.keys(sourceMatter.data || {}).length;
      const targetMetaCount = Object.keys(targetMatter.data || {}).length;

      const sourceScore = sourceContent.length + sourceMetaCount * 100;
      const targetScore = targetContent.length + targetMetaCount * 100;

      if (targetScore >= sourceScore) {
        // Target is more complete, keep target and delete source
        if (isDryRun) {
          console.log(`[DRY RUN] Would perform: ${from} deleted (target more complete)`);
        } else {
          await fs.unlink(from);
        }
        renamedFiles.push(`${from} deleted (target more complete)`);
        return target;
      } else {
        // Source is more complete, overwrite target and delete source
        if (isDryRun) {
          console.log(
            `[DRY RUN] Would perform: ${from} overwrote ${target} (source more complete)`
          );
        } else {
          await fs.writeFile(target, sourceContent, 'utf8');
          await fs.unlink(from);
        }
        renamedFiles.push(`${from} overwrote ${target} (source more complete)`);
        return target;
      }
    } else {
      if (isDryRun) {
        console.log(`[DRY RUN] Would perform: ${from} -> ${target}`);
      } else {
        await fs.mkdir(path.dirname(target), { recursive: true });
        await fs.rename(from, target);
      }
      return target;
    }
  } catch (e: unknown) {
    const error = e as Error;
    // fallback: copy+unlink if cross-device
    if (error.message.includes('EXDEV')) {
      if (isDryRun) {
        console.log(`[DRY RUN] Would perform: cross-device move ${from} -> ${target}`);
      } else {
        await fs.mkdir(path.dirname(target), { recursive: true });
        await fs.copyFile(from, target);
        await fs.unlink(from);
      }
      return target;
    }
    throw error;
  }
}

// Scan and standardize all markdown files under a directory
async function standardizeStructure(baseDir: string): Promise<void> {
  const entries = await fs.readdir(baseDir, { withFileTypes: true });
  for (const entry of entries) {
    const fullPath = path.join(baseDir, entry.name);
    if (entry.isDirectory()) {
      await standardizeStructure(fullPath);
    } else if (entry.isFile() && entry.name.endsWith('.md')) {
      const content = await fs.readFile(fullPath, 'utf8');
      const { folder, name } = getStandardLocationAndName(fullPath, content);
      const targetPath = path.join(folder, name);
      if (path.resolve(fullPath) !== path.resolve(targetPath)) {
        moveActions.push({ from: fullPath, to: targetPath, reason: 'Standardize location/name' });
      }
    }
  }
}

// Format a markdown file: normalize content, inject frontmatter, mark stubbed if needed, extract user stories, and AI heuristics-based metadata tagging
const formatMarkdownFile = async (filePath: string): Promise<void> => {
  try {
    const content: string = await fs.readFile(filePath, 'utf8');
    const parsed = matter(content);
    const data: Partial<Frontmatter> = parsed.data;
    const body: string = parsed.content;

    const cleaned: string = body
      .replace(/\r\n/g, '\n')
      .replace(/^\s*\n/gm, '')
      .replace(/\n{3,}/g, '\n\n')
      .replace(/^\s*#+\s+/gm, (match) => match.trimStart())
      .trim();

    let finalBody = cleaned;
    if (isStubbedFile(cleaned)) {
      try {
        const aiEnhanced = await enrichWithAI(cleaned, path.basename(filePath));
        finalBody = aiEnhanced || cleaned;
        stubbedFiles.push(filePath);
        if (!/stub/i.test(cleaned)) {
          finalBody =
            (finalBody ? finalBody + '\n\n' : '') +
            '> **Stub:** This file is a stub and needs expansion.\n';
        }
      } catch (e: unknown) {
        const error = e as Error;
        console.error(`⚠️ AI enrichment failed for ${filePath}:`, error);
        finalBody = cleaned;
      }
    }

    try {
      const userStories = await generateUserStoriesWithAI(finalBody, path.basename(filePath));
      if (userStories.length > 0) {
        finalBody += '\n\n## User Stories\n' + userStories.map((s) => `- ${s}`).join('\n') + '\n';
      }
    } catch (e: unknown) {
      const error = e as Error;
      console.error(`⚠️ User story generation failed for ${filePath}:`, error);
    }

    try {
      const autoLinkedBody = await generateAutoLinksWithAI(finalBody, path.basename(filePath));
      if (autoLinkedBody && autoLinkedBody !== finalBody) {
        finalBody = autoLinkedBody;
        autoLinkedFiles.push(filePath);
      }
    } catch (e: unknown) {
      const error = e as Error;
      console.error(`⚠️ Auto-linking failed for ${filePath}:`, error);
    }

    const enrichedData = enrichFrontmatter(data, filePath);
    const sortedData = Object.fromEntries(
      Object.entries({
        ...enrichedData,
        // Ensure tags is always a string array
        tags: Array.isArray(data.tags)
          ? data.tags
          : typeof data.tags === 'string'
            ? [data.tags]
            : [],
      }).sort(([a], [b]) => a.localeCompare(b))
    );
    const formatted = matter.stringify(finalBody, sortedData);

    if (isDryRun) {
      console.log(`[DRY RUN] Would perform: writeFile ${filePath}`);
    } else {
      await fs.writeFile(filePath, formatted, 'utf8');
    }
  } catch (error) {
    console.error(`Error formatting ${filePath}:`, error);
  }
};

const enrichWithAI = async (content: string, topic: string): Promise<string> => {
  // Use filePath or topic as cache key (topic is basename)
  const filePath = topic;
  if (enrichmentCache[filePath]) {
    const cached = enrichmentCache[filePath];
    return Array.isArray(cached) ? cached.join(' ') : cached;
  }
  try {
    const prompt = `Rewrite the following stub documentation for "${topic}" to match SAP/Palantir enterprise standards. Include headings, user stories, technical context, related links, and tags.\n\n${content}`;
    const { stdout } = await execAsync(`echo ${JSON.stringify(prompt)} | ollama run ${MODEL_NAME}`);
    enrichmentCache[filePath] = stdout.trim();
    // --- Auto-tagging logic ---
    const tagPrompt = `List 3 to 5 concise tags relevant to the following documentation content, comma-separated, lowercase: \n\n${stdout.trim()}`;
    const { stdout: tagOut } = await execAsync(
      `echo ${JSON.stringify(tagPrompt)} | ollama run ${MODEL_NAME}`
    );
    const tags = tagOut
      .split(',')
      .map((t) => t.trim())
      .filter(Boolean);
    enrichmentCache[`${filePath}-tags`] = Array.isArray(tags) ? tags : [tags];
    // --- End auto-tagging logic ---
    if (!isDryRun) {
      await fs.writeFile(ENRICH_CACHE_PATH, JSON.stringify(enrichmentCache, null, 2), 'utf8');
    } else {
      console.log(`[DRY RUN] Would perform: enrichment cache update for ${filePath}`);
    }
    return stdout.trim();
  } catch (err) {
    console.error('⚠️  AI enrichment failed:', err);
    return content;
  }
};

const generateAutoLinksWithAI = async (content: string, filename: string): Promise<string> => {
  // Optionally, cache could be used here as well, but for now only enrichment is cached
  try {
    const prompt = `Given the following markdown content for "${filename}", generate a list of Obsidian-style [[linked/doc/paths]] relevant to validation, evaluation, and dashboard flows. Return only the list of links, one per line, no extra text.\n\n${content}`;
    const { stdout } = await execAsync(`echo ${JSON.stringify(prompt)} | ollama run ${MODEL_NAME}`);
    const links: string[] = stdout
      .trim()
      .split('\n')
      .map((l) => l.trim())
      .filter((l) => l.startsWith('[[') && l.endsWith(']]'));
    if (links.length > 0) {
      // Append links to the bottom of content with a heading
      const appended =
        content.trim() +
        '\n\n## Auto-generated Links\n\n' +
        links.map((l) => `- ${l}`).join('\n') +
        '\n';
      return appended;
    }
    return content;
  } catch (err) {
    console.error(`⚠️ Auto-linking AI failed for ${filename}:`, err);
    return content;
  }
};

const generateUserStoriesWithAI = async (content: string, filename: string): Promise<string[]> => {
  try {
    const prompt = `Generate 3 concise user stories (in the format: "As a [role], I want to [action] so that [goal]") for the following markdown content titled "${filename}":\n\n${content}`;
    const { stdout } = await execAsync(`echo ${JSON.stringify(prompt)} | ollama run ${MODEL_NAME}`);
    return stdout
      .trim()
      .split('\n')
      .map((line) => line.trim())
      .filter((line) => /^-?\s*As a/.test(line));
  } catch (err) {
    console.error(`⚠️ Failed to generate user stories for ${filename}:`, err);
    return [];
  }
};

// Format all markdown files recursively (parallelized with progress bar)
const formatAllMarkdownFiles = async (baseDir: string): Promise<void> => {
  const files: string[] = [];

  async function collectFiles(dir: string): Promise<void> {
    const entries = await fs.readdir(dir, { withFileTypes: true });
    for (const entry of entries) {
      const fullPath = path.join(dir, entry.name);
      if (entry.isDirectory()) await collectFiles(fullPath);
      else if (entry.isFile() && fullPath.endsWith('.md')) files.push(fullPath);
    }
  }

  await collectFiles(baseDir);

  const bar = new cliProgress.SingleBar(
    {
      format: 'Formatting [{bar}] {percentage}% | {value}/{total} | {file}',
      barCompleteChar: '\u2588',
      barIncompleteChar: '\u2591',
    },
    cliProgress.Presets.shades_classic
  );

  bar.start(files.length, 0, { file: '' });

  const limit = pLimit(4);
  await Promise.all(
    files.map((filePath, _idx) =>
      limit(async () => {
        await wait(25); // brief delay to reduce spamming
        void formatMarkdownFile(filePath);
        bar.increment({ file: path.basename(filePath) });
      })
    )
  );

  bar.stop();
};

// Create markdown template file, if not exists
async function createMarkdownTemplate(): Promise<void> {
  const templateDir = path.dirname(TEMPLATE_PATH);
  if (isDryRun) {
    console.log(`[DRY RUN] Would perform: mkdir ${templateDir} for template`);
  } else {
    await fs.mkdir(templateDir, { recursive: true });
  }
  const exists = await fs
    .stat(TEMPLATE_PATH)
    .then(() => true)
    .catch(() => false);
  if (!exists) {
    const template = `---
title: "{{TITLE}}"
created: "{{CREATED_DATE}}"
updated: "{{UPDATED_DATE}}"
tags: [reasonops, enterprise]
type: doc
status: draft
visibility: public
author: ReasonOps System
links: []
---

# {{TITLE}}

## Overview

## Purpose

## Context

## References

## Design Notes

## Related

- [[some/other/doc.md]]
`;
    if (isDryRun) {
      console.log(`[DRY RUN] Would perform: writeFile ${TEMPLATE_PATH}`);
    } else {
      await fs.writeFile(TEMPLATE_PATH, template, 'utf8');
    }
    createdTemplates.push(TEMPLATE_PATH);
  }
}

// TODO: Use Ollama to generate user stories and auto-link related use cases.
// TODO: Validate each folder contains index.md, schema.md, ui.md.
// TODO: Enforce SAP/Palantir-grade folder hierarchy and naming.

// MAIN: 1. Standardize structure, 2. Move files, 3. Format, 4. Create template, 5. Log
async function main(): Promise<void> {
  console.log('🔍 Scanning and standardizing structure...');
  // 1. Standardize file/folder structure
  await standardizeStructure(DOCS_ROOT);

  console.log('📦 Moving files...');
  if (moveActions.length) {
    for (const action of moveActions) {
      // Only move if not to same path
      if (path.resolve(action.from) !== path.resolve(action.to)) {
        // Dry run: log with reason
        if (isDryRun) {
          // Normalize folder name for logging
          const origDir = path.dirname(action.to);
          const normalizedDir = normalizeFolderName(origDir);
          const normalizedTo = path.join(normalizedDir, path.basename(action.to));
          console.log(
            `[DRY RUN] Would move and rename: ${action.from} → ${normalizedTo} (reason: ${action.reason})`
          );
        } else {
          await safeMoveFile(action.from, action.to);
        }
      }
    }
  }

  console.log('🧼 Formatting markdown...');
  // 2. Format all markdown files
  await formatAllMarkdownFiles(DOCS_ROOT);

  console.log('🧠 AI enrichment completed for stubbed files.');

  console.log(`🔗 Auto-linking complete for ${autoLinkedFiles.length} files.`);

  console.log('📁 Creating template...');
  // 3. Create template
  await createMarkdownTemplate();

  // 4. Log summary
  console.log('✅ Obsidian structure and formatting complete');
  if (stubbedFiles.length) {
    console.log(`⚠️  Detected ${stubbedFiles.length} stubbed files (AI enriched):`);
    for (const file of stubbedFiles) console.log(`  - ${file}`);
  }
  if (autoLinkedFiles.length) {
    console.log(`🔗 Auto-linked files:`);
    for (const file of autoLinkedFiles) console.log(`  - ${file}`);
  }
  if (renamedFiles.length) {
    console.log(`📝 Renamed files to avoid overwrite:`);
    for (const msg of renamedFiles) console.log(`  - ${msg}`);
  }
  if (createdTemplates.length) {
    console.log(`📄 Created markdown template(s):`);
    for (const t of createdTemplates) console.log(`  - ${t}`);
  }

  const summaryLog = [
    `# Run Summary (${new Date().toISOString()})`,
    `## Stubbed Files (AI enriched) (${stubbedFiles.length})`,
    ...stubbedFiles.map((f) => `- ${f}`),
    '',
    `## Auto-linked Files (${autoLinkedFiles.length})`,
    ...autoLinkedFiles.map((f) => `- ${f}`),
    '',
    `## Renamed Files (${renamedFiles.length})`,
    ...renamedFiles.map((r) => `- ${r}`),
    '',
    `## Templates Created (${createdTemplates.length})`,
    ...createdTemplates.map((t) => `- ${t}`),
  ].join('\n');

  if (isDryRun) {
    console.log(`[DRY RUN] Would perform: mkdir ${LOGS_DIR} for logs`);
    console.log(
      `[DRY RUN] Would perform: writeFile ${path.join(LOGS_DIR, `log-${Date.now()}.md`)}`
    );
  } else {
    await fs.mkdir(LOGS_DIR, { recursive: true });
    const logFilename = `log-${Date.now()}.md`;
    await fs.writeFile(path.join(LOGS_DIR, logFilename), summaryLog, 'utf8');
  }
}

// Graceful exit handling
process.on('SIGINT', () => {
  console.warn('⚠️  Interrupted. Some files may be partially processed. Check logs for status.');
  process.exit(1);
});

// Run main
main().catch((e) => {
  console.error('❌ Error running setup-obsidian-structure:', e);
  process.exit(1);
});

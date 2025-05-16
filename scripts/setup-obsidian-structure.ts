import { mkdir, writeFile, access, constants } from 'fs/promises';
import { join, dirname } from 'path';

const BASE_DIR = 'docs/features/dashboard';

const folders = [
  'components',
  'components/export-panel',
  'components/task-list',
  'flows',
  'flows/admin',
  'flows/evaluator',
  'access',
];

const files: Record<string, string> = {
  'index.md': '# Dashboard Overview\n\nHigh-level layout and navigational flow.',
  'flows/index.md': '',
  'flows/admin/index.md': '',
  'flows/evaluator/index.md': '',
  'flows/mvp.md': '',
  'components/index.md': '',
  'components/table-actions.md': '',
  'components/observability.md': '',
  'components/export-panel/index.md': '',
  'components/task-list/index.md': '',
  'access/access.md': '',
};

async function ensureDir(path: string): Promise<void> {
  await mkdir(path, { recursive: true });
}

async function ensureFile(path: string, content = ''): Promise<void> {
  try {
    await access(path, constants.F_OK);
    console.log(`[setup-obsidian] ⚠️  Skipped existing file: ${path}`);
  } catch {
    const dir = dirname(path);
    await mkdir(dir, { recursive: true });
    await writeFile(path, content);
    console.log(`[setup-obsidian] ✅ Created: ${path}`);
  }
}

async function main(): Promise<void> {
  if (!BASE_DIR.startsWith('docs/')) {
    throw new Error(`[setup-obsidian] Invalid base path: ${BASE_DIR}`);
  }

  await ensureDir(BASE_DIR);

  for (const folder of folders) {
    await ensureDir(join(BASE_DIR, folder));
  }

  for (const [file, content] of Object.entries(files)) {
    const fullPath = join(BASE_DIR, file);
    await ensureFile(fullPath, content);
  }

  console.log(`[setup-obsidian] 🗂️  Dashboard doc folders and stubs initialized.`);
}

main().catch((err: Error): void => {
  console.error(`[setup-obsidian] ❌ Failed to initialize dashboard structure:`, err);
  process.exitCode = 1;
});

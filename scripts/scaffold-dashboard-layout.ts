// scripts/scaffold-dashboard-layout.ts
import { writeFile, mkdir, access, constants } from 'fs/promises';
import { resolve } from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = resolve(__filename, '..');
const root = resolve(__dirname, '..');
const dirs = {
  layout: resolve(root, 'frontend/shared/layout'),
  ui: resolve(root, 'frontend/shared/ui/ui'),
  uiLib: resolve(root, 'frontend/shared/ui/lib'),
  uiHooks: resolve(root, 'frontend/shared/ui/hooks'),
  app: resolve(root, 'frontend/app/dashboard'),
  appRoot: resolve(root, 'frontend/app'),
  styles: resolve(root, 'frontend/styles'),
  test: resolve(root, 'tests/frontend/components/layout'),
};

async function safeWrite(path: string, content: string): Promise<void> {
  try {
    await access(path, constants.F_OK);
    console.log(`⚠️  Skipped ${path} (already exists)`);
  } catch {
    await writeFile(path, content);
    console.log(`✅ Wrote ${path}`);
  }
}

const files = [
  {
    path: `${dirs.layout}/SidebarNav.tsx`,
    content: `import { Home, Settings } from 'lucide-react'
import Link from 'next/link'

// Using alias: '@/shared/layout/SidebarNav'
export const SidebarNav = () => (
  <nav className="flex flex-col gap-2 p-4">
    <Link href="/dashboard" className="flex items-center gap-2 text-foreground hover:text-accent">
      <Home size={18} /> Dashboard
    </Link>
    <Link href="/dashboard/settings" className="flex items-center gap-2 text-foreground hover:text-accent">
      <Settings size={18} /> Settings
    </Link>
  </nav>
)
`,
  },
  {
    path: `${dirs.layout}/TopbarNav.tsx`,
    content: `// Using alias: '@/shared/layout/TopbarNav'
export const TopbarNav = () => (
  <header className="w-full flex justify-between items-center p-4 border-b bg-background">
    <span className="text-sm font-medium">ReasonOps</span>
    <div className="flex items-center gap-2">[Actions]</div>
  </header>
)`,
  },
  {
    path: `${dirs.layout}/DashboardShell.tsx`,
    content: `import { SidebarNav } from '@/shared/layout/SidebarNav'
import { TopbarNav } from '@/shared/layout/TopbarNav'

// Using alias: '@/shared/layout/DashboardShell'
export const DashboardShell = ({ children }: { children: React.ReactNode }) => (
  <div className="flex h-screen">
    <aside className="w-64 border-r bg-muted">
      <SidebarNav />
    </aside>
    <div className="flex flex-col flex-1">
      <TopbarNav />
      <main className="p-6 overflow-y-auto flex-1">{children}</main>
    </div>
  </div>
)
`,
  },
  {
    path: `${dirs.app}/page.tsx`,
    content: `import { DashboardShell } from '@/shared/layout/DashboardShell'

export default function DashboardPage() {
  return <DashboardShell><p>Welcome to ReasonOps</p></DashboardShell>
}`,
  },
];

// Files to move into shared/ui/lib/
const uiLibFiles = [
  {
    filename: 'StepProgressTracker.tsx',
    content: `// Placeholder content for StepProgressTracker component
export const StepProgressTracker = () => {
  return <div>Step Progress Tracker Component</div>
}
`,
  },
  {
    filename: 'StepScoreTag.tsx',
    content: `// Placeholder content for StepScoreTag component
export const StepScoreTag = () => {
  return <div>Step Score Tag Component</div>
}
`,
  },
  {
    filename: 'UnsavedChangesGuard.tsx',
    content: `// Placeholder content for UnsavedChangesGuard component
import { useEffect } from 'react'

export const UnsavedChangesGuard = () => {
  useEffect(() => {
    const handleBeforeUnload = (e: BeforeUnloadEvent) => {
      e.preventDefault()
      e.returnValue = ''
    }
    window.addEventListener('beforeunload', handleBeforeUnload)
    return () => window.removeEventListener('beforeunload', handleBeforeUnload)
  }, [])
  return null
}
`,
  },
];

// Placeholder hook files
const uiHookFiles = [
  {
    filename: 'useTheme.ts',
    content: `// Placeholder for useTheme hook
import { useState, useEffect } from 'react'

export function useTheme() {
  const [theme, setTheme] = useState<'light' | 'dark'>('light')

  useEffect(() => {
    // Logic to detect and set theme
  }, [])

  return { theme, setTheme }
}
`,
  },
  {
    filename: 'useMounted.ts',
    content: `// Placeholder for useMounted hook
import { useState, useEffect } from 'react'

export function useMounted() {
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  return mounted
}
`,
  },
];

// Additional config and style files to ensure exist
const configFiles = [
  {
    path: resolve(root, 'tailwind.config.ts'),
    content: `import type { Config } from 'tailwindcss'

const config: Config = {
  content: ['./frontend/**/*.{ts,tsx}'],
  theme: {
    extend: {},
  },
  plugins: [],
}

export default config
`,
  },
  {
    path: resolve(root, 'postcss.config.js'),
    content: `module.exports = {
  plugins: {
    tailwindcss: {},
    autoprefixer: {},
  },
}
`,
  },
];

// globals.css content
const globalsCssPath = resolve(dirs.styles, 'globals.css');
const globalsCssContent = `@tailwind base;
@tailwind components;
@tailwind utilities;
`;

// app/layout.tsx content
const appLayoutPath = resolve(dirs.appRoot, 'layout.tsx');
const appLayoutContent = `import '@/styles/globals.css'
import { DashboardShell } from '@/shared/layout/DashboardShell'

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <DashboardShell>{children}</DashboardShell>
      </body>
    </html>
  )
}
`;

// Modify app/dashboard/page.tsx to render placeholder inside DashboardShell
const appDashboardPagePath = resolve(dirs.app, 'page.tsx');
const appDashboardPageContent = `import { DashboardShell } from '@/shared/layout/DashboardShell'

export default function DashboardPage() {
  return <DashboardShell><p>Dashboard placeholder content</p></DashboardShell>
}
`;

async function scaffold(): Promise<void> {
  for (const file of files) {
    const dir = file.path.split('/').slice(0, -1).join('/');
    await mkdir(dir, { recursive: true });
    await safeWrite(file.path, file.content);
  }
}

async function setupAdditionalFiles(): Promise<void> {
  // Create shared/ui/lib and shared/ui/hooks directories
  await mkdir(dirs.uiLib, { recursive: true });
  await mkdir(dirs.uiHooks, { recursive: true });

  // Write files to shared/ui/lib/
  for (const file of uiLibFiles) {
    const path = resolve(dirs.uiLib, file.filename);
    await safeWrite(path, file.content);
  }

  // Write placeholder hook files to shared/ui/hooks/
  for (const file of uiHookFiles) {
    const path = resolve(dirs.uiHooks, file.filename);
    await safeWrite(path, file.content);
  }

  // Ensure globals.css exists
  await mkdir(dirs.styles, { recursive: true });
  await safeWrite(globalsCssPath, globalsCssContent);

  // Ensure tailwind.config.ts and postcss.config.js exist at root
  for (const file of configFiles) {
    await safeWrite(file.path, file.content);
  }

  // Ensure app/layout.tsx exists and uses DashboardShell with html and body wrappers
  await mkdir(dirs.appRoot, { recursive: true });
  await safeWrite(appLayoutPath, appLayoutContent);

  // Ensure app/dashboard/page.tsx renders placeholder inside DashboardShell
  await mkdir(dirs.app, { recursive: true });
  await safeWrite(appDashboardPagePath, appDashboardPageContent);
}

scaffold()
  .then(() => setupAdditionalFiles())
  .catch((err) => {
    console.error('❌ Scaffold failed:', err);
    process.exit(1);
  });

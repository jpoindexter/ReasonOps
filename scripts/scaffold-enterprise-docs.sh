

#!/bin/bash

set -e
echo "📁 Scaffolding SAP-grade VitePress docs..."

# 1. Ensure vitepress is installed
pnpm add -D vitepress

# 2. Create required folder structure
mkdir -p docs/.vitepress/theme
touch docs/.vitepress/config.ts
touch docs/.vitepress/theme/index.ts
touch docs/.vitepress/theme/custom.css

# 3. Add scripts to package.json if not present
if ! grep -q '"docs:dev"' package.json; then
  echo "🔧 Adding VitePress scripts to package.json"
  node -e "
    let fs = require('fs');
    let pkg = JSON.parse(fs.readFileSync('package.json'));
    pkg.scripts ||= {};
    pkg.scripts['docs:dev'] = 'vitepress dev docs';
    pkg.scripts['docs:build'] = 'vitepress build docs';
    pkg.scripts['docs:serve'] = 'vitepress serve docs';
    fs.writeFileSync('package.json', JSON.stringify(pkg, null, 2));
  "
fi

# 4. Bootstrap config.ts if empty
if [ ! -s docs/.vitepress/config.ts ]; then
  cat > docs/.vitepress/config.ts <<EOF
import { defineConfig } from 'vitepress'

export default defineConfig({
  title: 'ReasonOps Docs',
  description: 'Enterprise documentation for LLM evaluation workflows',
  cleanUrls: true,
  themeConfig: {
    logo: {
      light: '/logo-light.svg',
      dark: '/logo-dark.svg'
    },
    nav: [
      { text: 'Getting Started', link: '/GETTING_STARTED' },
      { text: 'Platform', link: '/platform/access/role-matrix' },
      { text: 'Features', link: '/features/dashboard/components/task-list' },
      { text: 'Prompts', link: '/prompts/scoring' },
      { text: 'API', link: '/api/auth' }
    ],
    sidebar: [],
    outline: [2, 3],
    search: { provider: 'local' },
    socialLinks: [
      { icon: 'github', link: 'https://github.com/reasonops/reasonops' }
    ],
    footer: {
      message: 'Released under the MIT License.',
      copyright: 'Copyright © 2025 THEFT Studio'
    }
  }
})
EOF
fi

echo "✅ Enterprise doc scaffold complete. Run 'pnpm run docs:dev' to preview."
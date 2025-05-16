---
title: "CONTRIBUTING"
status: "draft"
---

# 🤝 Contributing to ReasonOps

Welcome to the ReasonOps team. This document outlines our contributor guidelines, tooling expectations, and merge contract.

---

## ✅ Required Setup

- Install Node.js ≥ 20.x (`.nvmrc`)
- Install pnpm via Corepack:
  \`\`\`bash
  corepack enable
  corepack prepare pnpm@latest --activate
  pnpm install
  \`\`\`
- Use VSCode with the following:
  - Prettier
  - ESLint
  - Tailwind CSS IntelliSense
  - GitLens

---

## 🚧 PR Requirements

- All code must:
  - Use path aliases only (`@frontend`, `@backend`)
  - Include at least one test (`*.spec.ts`, `*.test.tsx`)
  - Use semantic commit message (`feat:`, `fix:`, `chore:`)
  - Update docs or schema files if applicable
- All PRs must pass:
  \`\`\`bash
  pnpm lint
  pnpm typecheck
  pnpm test
  \`\`\`
- Coverage must remain ≥ 90%

---

## ✍️ Commit Format

Use [Conventional Commits](https://www.conventionalcommits.org):

- \`feat:\` New feature
- \`fix:\` Bugfix
- \`chore:\` Internal tooling
- \`docs:\` Markdown, schema, prompt update
- \`test:\` Add test coverage

---

## 🧪 Run Locally

```bash
pnpm dev
pnpm test
pnpm typecheck
pnpm lint

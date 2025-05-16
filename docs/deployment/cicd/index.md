---
title: "index"
status: "draft"
---

# 🔁 CI/CD for ReasonOps

This document outlines the Continuous Integration and Continuous Deployment (CI/CD) strategy for ReasonOps. The CI/CD system automates testing, builds, and deployments across environments — ensuring the codebase remains stable, test-covered, and audit-safe.

---

## 🧠 Goals

- Ensure code quality with automated checks
- Prevent regressions with test coverage enforcement
- Enable seamless deploys to staging and production
- Automate export schema validation and format snapshots
- Prepare for future contributor PR workflows and access control

---

## 🚀 CI/CD System Overview

| Stage          | Tool                    | Purpose                         |
| -------------- | ----------------------- | ------------------------------- |
| CI pipeline    | GitHub Actions          | Lint, type-check, test, build   |
| Preview deploy | Vercel (GitHub hook)    | Auto-previews for every PR      |
| Secrets mgmt   | Vercel + GitHub         | Secure handling of env vars     |
| Coverage       | Vitest + snapshot tests | Contract + structure validation |

---

## 📦 GitHub Workflow Files

Workflows live in:

```bash
.github/workflows/
├── test.yml         # Lint, build, unit tests
├── deploy.yml       # Optional: main branch deploy to Vercel or ECS
├── schema-check.yml # Optional: validates schema alignment + format
```

---

## ✅ `test.yml`

```yaml
name: Test Suite
on: [push, pull_request]
jobs:
  build-and-test:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - uses: pnpm/action-setup@v2
        with:
          version: 8
      - run: pnpm install
      - run: pnpm run lint
      - run: pnpm run typecheck
      - run: pnpm run test -- --coverage
```

---

## 🔄 Environments

| Branch      | Deployed To         |
| ----------- | ------------------- |
| `main`      | Production (Vercel) |
| `staging/*` | Vercel Preview URLs |
| PR branches | CI only, no deploy  |

---

## 🧪 CI Test Coverage

- Coverage thresholds configured via `vitest.config.ts`
- Snapshot exports (`export.spec.ts`) must match `dataset-format.md`
- All `POST /api/judgment` + `exportFormatter.ts` changes must include tests

---

## 🔐 Secrets Management

| Tool             | Scope                                                   |
| ---------------- | ------------------------------------------------------- |
| `.env.local`     | Local-only keys (OpenAI, Supabase)                      |
| GitHub Secrets   | Optional, for CI workflows                              |
| Vercel Dashboard | Used for runtime `.env` injection in staging/production |

Avoid committing secrets or `.env.*` to the repository.

---

## 🔍 PR Quality Gate (Planned)

- Auto-label PRs based on area (`schema`, `api`, `adapter`)
- Require passing checks on:
  - Lint
  - Typecheck
  - Unit + schema tests
- Require `docs/schema/*` updates for schema-affecting PRs

---

## 📄 Contributor Guidelines

- All new API routes must include unit tests and be CI-covered
- All breaking export format changes must bump `formatVersion`
- CI must pass before merge
- Tests must snapshot new `Task`, `Step`, or `Judgment` shapes where applicable
- Each PR should link to updated docs when schema/API is affected

---

This CI/CD system enables ReasonOps to scale contributions safely while maintaining audit quality and reproducibility.

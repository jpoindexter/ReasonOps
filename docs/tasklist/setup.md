---

## 🧱 Shell Environment & Cross-Platform Notes

- Recommended shell: `zsh` (macOS), `bash` (Linux), WSL2 (Windows)
- Global node tools (like `tsc`, `pnpm`) must be available in `$PATH`
- Use `.env.local` for local dev secrets — never commit to repo
- Git must be configured with `core.autocrlf=input` on Windows
- VSCode should be used with the following extensions:
  - Prettier – Code formatter
  - ESLint
  - GitLens
  - Tailwind CSS IntelliSense
  - Prisma (if future adapters use Prisma ORM)

---

## 🔁 Contributor Onboarding Checklist

Any new engineer joining this codebase must:

- [ ] Install and use Node ≥ 20.x via `.nvm`
- [ ] Install pnpm globally: `corepack enable` → `corepack prepare pnpm@latest --activate`
- [ ] Clone repo and run `pnpm install` cleanly
- [ ] Confirm `pnpm dev`, `pnpm test`, and `pnpm lint` all pass
- [ ] Enable VSCode workspace settings (`.vscode/settings.json`)
- [ ] Run `pnpm run scaffold` and verify path-aliased output
- [ ] Commit with `feat:`/`chore:`/`fix:`/`docs:` prefixes for semantic versioning

All setup tasks must pass before granting commit access to `main`.

---

## 🧪 Local Test Sandbox (Optional)

To test full stack without LLM API keys:

- [ ] Use `scripts/dev-seed.ts` to create test tasks + completions
- [ ] Mock Claude/GPT responses with `tests/fixtures/llm/`
- [ ] Validate `scoreStep()` output in test runner
- [ ] Run local JSONL export and open with `jq`

---

## 📦 Minimal Local Dev Confirmations

```bash
pnpm dev
# http://localhost:3000/evaluate
# http://localhost:3000/compare
# http://localhost:3000/task
```

Your ReasonOps environment is now ready to ship with strict repeatability across devs and CI.

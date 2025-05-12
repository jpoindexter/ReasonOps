# 🚀 Getting Started with ReasonOps

Welcome to the ReasonOps platform — a modular, full-stack system for evaluating and improving LLM-generated reasoning. This guide walks you through cloning, setting up, running, and contributing to the codebase.

---

## 🧠 What is ReasonOps?

ReasonOps is a TypeScript/Next.js platform for:

- Creating reasoning tasks
- Generating LLM completions
- Scoring logic step-by-step using human or AI judgments
- Exporting datasets for RLHF, QA, and audit workflows

For system architecture, see [`docs/ARCHITECTURE.md`](./ARCHITECTURE.md).

---

## 📦 1. Clone the Repo

```bash
git clone https://github.com/YOUR_ORG/reasonops.git
cd reasonops
```

---

## 🛠 2. Install Dependencies

```bash
pnpm install
# or
npm install
```

---

## 🌐 3. Configure Environment

Create a local `.env.local` file:

```env
NEXT_PUBLIC_SUPABASE_URL=
NEXT_PUBLIC_SUPABASE_ANON_KEY=
OPENAI_API_KEY=
CLAUDE_API_KEY=
```

Use Vercel or Supabase dashboard to obtain secrets.

---

## ▶️ 4. Run Locally

```bash
pnpm dev
# App runs at http://localhost:3000
```

---

## 🧩 5. Optional: Supabase Setup

1. Visit [supabase.com](https://supabase.com) and create a new project
2. Enable Postgres and optional Auth
3. Retrieve your API keys and paste into `.env.local`
4. Run migrations (if applicable):
   ```bash
   supabase db push
   ```

---

## 🧪 6. Run Tests

```bash
pnpm test
# uses Vitest + React Testing Library
```

To test components:

```bash
pnpm test:ui
```

---

## 🧭 7. Folder Structure

| Folder         | Purpose                        |
| -------------- | ------------------------------ |
| `/app/`        | Next.js routes and API logic   |
| `/components/` | React UI blocks for evaluation |
| `/lib/`        | LLM adapter, parsing utilities |
| `/schemas/`    | Zod validation types           |
| `/types/`      | Shared type definitions        |
| `/tests/`      | Unit and UI test files         |
| `/public/`     | Static files and assets        |

---

## ✅ 8. Coding Conventions

- TypeScript + ESM
- Tailwind for styling
- Zod for runtime validation
- Use import aliases like `@lib`, `@components`
- Prefer async/await over `.then()`
- All components must be testable and modular
- Use `metadata` fields for extensions, not core logic

---

## 📤 9. Exporting Datasets

To generate exportable JSONL:

```bash
curl http://localhost:3000/api/export/tasks/<taskId> > export.jsonl
```

See [`docs/schema/dataset-format.md`](./schema/dataset-format.md) for the export spec.

---

## 🧩 10. Next Steps

- Review the [Architecture](./ARCHITECTURE.md)
- Explore the [Schema](./schema/README.md)
- Start building tasks and evaluating completions!

---

Welcome aboard 🧠✨  
Let’s build trustworthy AI reasoning systems together.

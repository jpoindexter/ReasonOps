![License: Proprietary](https://img.shields.io/badge/license-Proprietary-red)
![Build](https://img.shields.io/badge/build-passing-brightgreen)

# ReasonOps

ReasonOps is a production-grade platform for evaluating and scoring LLM-generated reasoning. Inspired by Scale AI — but focused on logic instead of perception — it enables structured review, scoring, and export of AI completions across tasks, models, and steps.

---

## 🔗 Live Demo

Coming soon — hosted on [Vercel](https://vercel.com)

---

## 🧠 What It Does

- Generate multi-step LLM responses to user-defined tasks
- Score each reasoning step for clarity, coherence, and contradiction
- Compare completions from multiple models
- Export curated data for fine-tuning or analysis (JSONL)
- Build trustable, human-in-the-loop AI evaluation pipelines

---

## 👥 Contributing

1. Fork the repo
2. Create a feature branch: `git checkout -b feature/my-feature`
3. Commit and push
4. Open a PR

> See `ARCHITECTURE.md` for deeper technical notes.

---

## 🚀 Tech Stack

- **Next.js (App Router)**
- **Tailwind CSS** (UI + tokens)
- **Zustand** (State)
- **React Hook Form + Zod** (Form + validation)
- **Claude / OpenAI / Ollama** (LLM adapters)
- **Supabase (optional)** for storage/auth
- **Vitest + Testing Library** for unit testing

---

## 📬 Contact

Have ideas, issues, or feedback? Reach out:

- GitHub Issues
- Email: jason@yourdomain.com

---

## 📁 Folder Structure

```
app/               # Pages: task, evaluate, compare, API
components/        # StepScoringPanel, TaskForm, etc.
lib/               # LLM adapters, helpers
schemas/           # Zod schemas for task, step, judgment
types/             # Global types
tests/             # Unit + UI tests
public/            # Static assets
```

---

## 🧪 Usage

1. Clone the repo
2. Install dependencies
   ```bash
   pnpm install
   ```
3. Run the dev server
   ```bash
   pnpm dev
   ```
4. Add your LLM API keys to `.env.local`

---

## 📦 Roadmap

- [x] Task input + LLM completion
- [x] Step-based scoring
- [ ] JSONL dataset exports
- [ ] Multi-model comparison
- [ ] Team scoring dashboards
- [ ] Auth + dataset versioning

---

🔒 Licensed under the ReasonOps Proprietary License  
_For licensing inquiries, contact jason@theft.studio_

---

ReasonOps Proprietary License

Copyright © 2024 Jason Poindexter. All rights reserved.

This software is proprietary and confidential. Unauthorized copying, distribution, or modification of this code, via any medium, is strictly prohibited without express written permission from the author.

This repository is licensed under a custom proprietary license. For licensing inquiries, contact jason@yourdomain.com.

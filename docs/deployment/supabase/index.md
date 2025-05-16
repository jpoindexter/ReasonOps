---
title: "index"
status: "draft"
---

# 🧩 Supabase Deployment & Configuration

This document outlines how to set up and integrate Supabase for ReasonOps in local, staging, and production environments. Supabase provides the Postgres database, optional auth, and storage layer powering ReasonOps data workflows.

---

## 🧠 Why Supabase?

ReasonOps uses Supabase for:

- PostgreSQL-compatible schema (Tasks, Completions, Steps, Judgments)
- Optional auth (for reviewer login, role-based access control)
- Realtime table change detection (future)
- Scalable, managed DB with RESTful API and dashboard

---

## 🧪 Local Setup (Dev)

1. Install Supabase CLI:

```bash
npm install -g supabase
```

2. Start Supabase locally:

```bash
supabase start
```

3. Project will launch with:

- Postgres at `localhost:5432`
- Auth API at `localhost:54321`
- Studio at `localhost:54323`

4. Use `.env.local`:

```env
NEXT_PUBLIC_SUPABASE_URL=http://localhost:54321
NEXT_PUBLIC_SUPABASE_ANON_KEY=dev-anon-key
```

---

## 🗃️ Schema Initialization

To initialize your DB schema:

1. Use provided `schema.sql` (if exists)
2. Or push from CLI:

```bash
supabase db push
```

3. Use Supabase Studio (web UI) to:

- Create tables for `task`, `completion`, `step`, `judgment`
- Add policies (if auth-enabled)

---

## 🌐 Production Supabase Project

1. Go to [https://supabase.com](https://supabase.com) and create a new project.
2. Copy the project URL and public anon key.
3. In Vercel:
   - Add these keys to your project as environment variables.
   - Do not use the service role key in the frontend.
4. In ReasonOps, these go into `.env`:

```env
NEXT_PUBLIC_SUPABASE_URL=https://yourproject.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key
```

---

## 🔐 Auth (Optional)

If using Supabase Auth:

| Feature            | Setup                                                         |
| ------------------ | ------------------------------------------------------------- |
| Reviewer login     | Enable email/password in Supabase Auth                        |
| Role-based access  | Create `role` field in `user` table                           |
| Auth session usage | Use Supabase client in frontend: `supabase.auth.getSession()` |

Auth-based gating can be added via middleware or `createdBy` inference in `/api/judgment`.

---

## 🔁 Supabase Features Used

| Feature     | Used For                                   |
| ----------- | ------------------------------------------ |
| Postgres DB | Task + Completion + Step + Judgment tables |
| Public API  | Optional row-level reads                   |
| Auth        | Role-gated scoring (planned)               |
| Realtime    | Optional export/webhook triggers (future)  |

---

## 🔧 Contributor Setup Notes

- Schema updates must be reflected in:
  - `/schema/*.md`
  - Supabase table migrations
- Never expose the Supabase service key in frontend or public `.env`
- You may generate types using:

```bash
supabase gen types typescript --local > lib/types.ts
```

---

## 🧩 Future Extensions

| Feature                   | Status                                          |
| ------------------------- | ----------------------------------------------- |
| Auth with Clerk           | In planning (alternative to Supabase Auth)      |
| Audit trigger logs        | Optional `trigger` table via Supabase Functions |
| Webhook to export service | Future: on task `reviewed` status               |

---

This guide ensures a secure, production-grade Supabase configuration for ReasonOps across environments.

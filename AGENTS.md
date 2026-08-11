<!-- BEGIN:nextjs-agent-rules -->
# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` before writing any code. Heed deprecation notices.
<!-- END:nextjs-agent-rules -->

## Cursor Cloud specific instructions

Single Next.js 16 app (Phos Wellness) living in `frontend/`. Package manager is **bun** (`bun.lock`); run all commands from `frontend/`. Scripts are in `frontend/package.json`; CI lives in `.github/workflows/ci.yml`. `bun` is installed at `~/.bun/bin` (already on PATH via `~/.bashrc`).

- Run the dev server with `bun run dev` (serves on port 3000). Do not use `bun run build`/`start` for development.
- Checks (same as CI): `bun run typecheck`, `bun run lint`, `bun run format`, `bun run knip`, `bun run check:sitemap`. Note: `bun run lint` (oxlint) prints many warnings but exits 0 — treat warnings as non-blocking.
- `next.config.ts` sets `typescript.ignoreBuildErrors: true`, so rely on `bun run typecheck` (not the build) to catch type errors.

### Environment variables
Pages pull content from a **public** Sanity dataset, so a `.env.local` in `frontend/` is required for Sanity-driven pages to render (the client uses non-null `process.env.NEXT_PUBLIC_SANITY_*` and otherwise errors). `.env.local` is gitignored; if missing, recreate it with these public values (they match `sanity.config.ts`):

```
NEXT_PUBLIC_SANITY_PROJECT_ID=yfse28ye
NEXT_PUBLIC_SANITY_DATASET=production
NEXT_PUBLIC_SANITY_API_VERSION=2024-01-01
NEXT_PUBLIC_SITE_URL=http://localhost:3000
```

The app runs fine without other secrets, but these flows stay inert/error until their keys are provided: `STRIPE_SECRET_KEY`/`STRIPE_WEBHOOK_SECRET` (checkout + `/api/webhook/stripe`), `RESEND_API_KEY` (contact form email send), `SANITY_API_TOKEN` (draft previews + `scripts/seed-*`), and `SENTRY_*`/`NEXT_PUBLIC_POSTHOG_KEY` (telemetry). The `/book` page links out to external JotForm intake forms.

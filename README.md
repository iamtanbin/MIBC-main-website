# MIBC main website

Official website of MIBC, a student-driven business club at North South University.
Built with Next.js (static export) and TypeScript, hosted on Cloudflare Workers.

## Quick start

Requirements: Node.js 20.9+ and npm.

```bash
git clone https://github.com/iamtanbin/MIBC-main-website.git
cd MIBC-main-website
npm ci
npm run dev        # http://localhost:3000
```

Before pushing: `npm run check` (lint, typecheck, build).
To preview the production build on the Workers runtime: `npm run preview` (http://localhost:8787).

## Editing content

All content lives in `src/content/`:

| File | Content |
| --- | --- |
| `site.ts` | Club name, intro, stats, contact, social links, committee term |
| `events.ts` | Flagship events and their editions (each edition gets its own page) |
| `members.ts` | Executives and sub-executives |
| `advisors.ts` | Faculty advisors |
| `partners.ts` | Partners and tiers |

Images go in `public/images/` (pre-optimized WebP/SVG). Brand colors are CSS variables at the top of `src/app/globals.css`.

## Deployment

Pushing to `main` triggers Cloudflare Workers Builds, which runs `npm run build` and `npx wrangler deploy`.
Check the live commit at `/version.json`. Build settings and environment variables are documented in [CLAUDE.md](./CLAUDE.md).

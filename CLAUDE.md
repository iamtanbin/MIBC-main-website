# MIBC main website — instructions for Claude Code and contributors

@AGENTS.md

## Purpose

Public website for **MIBC**, a student-driven business club at North South University (NSU).
Visitors learn about the club, its flagship events (each with multiple editions), members
(executives, then sub-executives), faculty advisors, and partners.

## Architecture

- **Next.js 16 (App Router) + TypeScript**, built as a **fully static export** (`output: "export"` in `next.config.ts`). `next build` writes the site to `out/`.
- **Hosting: Cloudflare Workers static assets.** `wrangler.jsonc` defines an assets-only Worker (`name: "mibc-main-website"`) serving `out/` with `html_handling: "auto-trailing-slash"` and `not_found_handling: "404-page"`. No Worker script yet; add `main` + bindings to `wrangler.jsonc` only when backend features are actually needed.
- **Content is data, not code.** All text/people/events live in `src/content/*.ts`:
  - `site.ts` — club name, intro, stats, contact, socials, committee term
  - `events.ts` — flagship events and their editions
  - `members.ts` — executives and sub-executives (grouped by `department`)
  - `advisors.ts` — faculty advisors
  - `partners.ts` — partners and tiers
  - `types.ts` — the shapes of all of the above
  Values marked **PLACEHOLDER** must be replaced with real content.
- **Routes** (`src/app`): `/`, `/events`, `/events/[event]`, `/events/[event]/[edition]`, `/members`, `/advisors`, `/partners`, plus `sitemap.xml`, `robots.txt`, `version.json`, 404. Dynamic routes use `generateStaticParams` + `dynamicParams = false`; adding an event/edition in `events.ts` creates its pages automatically.
- **Components**: `src/components/Header.tsx` (client; mobile menu), `Footer.tsx`, `ui.tsx` (cards, headers). Shared helpers in `src/lib/` (`site.ts` URL/date helpers, `metadata.ts` per-page SEO, `nav.ts`).
- **SEO**: every page sets title, description, canonical, Open Graph and Twitter via `pageMetadata()` (Next replaces nested metadata objects, so pages must restate them). Social image: `public/og.png`. Icons: `src/app/icon.svg`, `icon.png`, `apple-icon.png`, `favicon.ico`.
- **Build stamp**: the commit SHA is baked in at build time (`next.config.ts`) and exposed at `/version.json`, in `<meta name="build-commit">`, and in the footer. Use it to confirm which commit is live.
- `public/_headers` sets security headers and long caching for `/_next/static/*`.

## Commands

```bash
npm ci                 # install exactly from package-lock.json
npm run dev            # local dev server at http://localhost:3000
npm run lint           # ESLint
npm run typecheck      # route types + tsc --noEmit
npm run build          # static export to ./out
npm run check          # lint + typecheck + build (run before every push)
npm run preview        # build, then serve ./out through Wrangler (workerd) at http://localhost:8787
npm run deploy         # manual deploy (normally NOT needed; pushes to main deploy automatically)
npm run brand:assets   # regenerate og.png / icon.png / apple-icon.png / favicon.ico (needs Playwright)
```

## Required workflow for every update

1. Read this file first.
2. `git status` and `git branch` — check branch and working tree. **Preserve uncommitted work and other contributors' changes** (stash or commit them; never discard).
3. `git switch main && git pull --ff-only origin main` **before editing**.
4. Implement the change completely.
5. `npm run check`. For UI changes also check mobile (≈375px) and desktop (≈1366px) layouts, light and dark mode, with no horizontal scroll (`npm run preview`).
6. Commit and **push directly to `main`** with a normal `git push`. **Never force-push** or overwrite others' work. If `main` moved, `git pull --rebase origin main`, re-run checks, then push.
7. Verify the deployment: wait for the Cloudflare Build, then check `https://<site>/version.json` shows the new commit and the changed pages behave correctly.
8. If the user asks only for a review or preview, do only that (no push).

## Deployment (GitHub → Cloudflare, automatic)

The GitHub repo `iamtanbin/MIBC-main-website` is to be connected to Cloudflare **Workers Builds** (status: PENDING — dashboard connection not yet confirmed; update this line once a push-triggered deploy is verified). Once connected, every push to `main` builds and deploys:

- Worker name: `mibc-main-website` (must equal `name` in `wrangler.jsonc`)
- Build command: `npm run build`
- Deploy command: `npx wrangler deploy`
- Production branch: `main`

Live URL: `https://mibc-main-website.<account-subdomain>.workers.dev` until a custom domain is added (then add it under the Worker's *Domains & Routes*, update `NEXT_PUBLIC_SITE_URL`, and redeploy).

## Environment variables

No secrets are needed. Build-time public settings:

| Name | Purpose | Where configured |
| --- | --- | --- |
| `NEXT_PUBLIC_SITE_URL` | Absolute origin for canonical URLs, sitemap, OG tags (no trailing slash) | `.env.production` (committed); override in Cloudflare → Worker → Settings → Build → Variables |
| `NEXT_PUBLIC_ALLOW_INDEXING` | `"true"` allows search indexing; anything else emits `noindex` + `Disallow: /` | same as above |
| `CLOUDFLARE_API_TOKEN`, `CLOUDFLARE_ACCOUNT_ID` | Only for manual `wrangler deploy` from a terminal/CI outside Cloudflare Builds | shell environment or GitHub Actions secrets — **never commit** |

`NEXT_PUBLIC_*` values are inlined at **build** time, so they must be build variables, not Worker runtime variables. Future secrets (API keys etc.) go in Cloudflare secrets (`wrangler secret put`) or GitHub secrets, never in the repo.

## Design conventions

- Apple-style **glass** UI, minimal: translucent panels (`.glass`) with `backdrop-filter` blur over a soft fixed color ambience. Solid fallback when `backdrop-filter` is unsupported or `prefers-reduced-transparency` is set.
- **All colors are tokens in `src/app/globals.css` `:root`** (with a dark-mode block). Brand colors are `--brand*` / `--glow-*`; change only those to match the MIBC logo. Keep text contrast ≥ 4.5:1 on glass.
- System font stack (SF Pro on Apple devices); no web fonts to keep pages fast.
- Restrained motion only (hover lift, color transitions); everything is disabled under `prefers-reduced-motion`.
- Semantic HTML: one `<h1>` per page, landmarks, breadcrumbs on event pages, `aria-current` on nav, skip link, visible focus rings, 44px minimum tap targets.
- **Mobile requirements**: layouts must work from 320px up with no horizontal scroll; people and partner grids show 2 columns on phones; nav collapses to a keyboard-accessible menu below 820px (Esc closes, closes on navigation).
- Images: pre-optimize before committing (WebP/SVG, square ≥480px for member photos), place under `public/images/...`, always set alt text/dimensions. There is no runtime image optimizer.
- Management/utility pages (e.g. `/version.json`, any future admin) must be `noindex` and disallowed in `robots.ts`.

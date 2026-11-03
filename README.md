# CAM — Career Advisory Movement

Standalone site for **CAM** (an initiative of VOYCE). Extracted from [voyce-x](https://github.com/suryavamshiGovardhan/voyce-x) so CAM lives on its own — no VOYCE navigation, auth, or backend coupling.

**Live:** https://suryavamshigovardhan.github.io/cam-website/

## Stack

Vite + React + TypeScript + Tailwind (same stack as VOYCE-X). Content is **static** — no Supabase or auth required for CAM.

## Routes

| Path | Page |
|------|------|
| `/` | CAM hub (home) |
| `/articles/:slug` | Article |
| `/talk` | The Talk (keynote slides) |
| `/atlas` / `/careers` | Career atlas |
| `/play` | Guess the job |
| `/fit` | Six lenses |
| `/challenge` | 30 days |
| `/about` | About CAM |

Legacy `/cam/*` paths redirect into these routes.

## Develop

```bash
npm install
npm run dev
```

## Build & deploy (GitHub Pages)

```bash
npm run build
cp dist/index.html dist/404.html
touch dist/.nojekyll
# publish dist/ to the gh-pages branch (Pages source = gh-pages /)
```

`vite.config.ts` sets `base: "/cam-website/"`. SPA deep links use a `404.html` copy of `index.html` plus a small redirect restore in `src/main.tsx`.

## What was left behind (on purpose)

VOYCE site chrome (`SiteHeader` / `SiteFooter`), auth (`useAuth`), Supabase client/env, and non-CAM routes/pages. Honest “an initiative of VOYCE” credit is kept where CAM itself shows it. About-page links to AI4Schools / VOYCE for Schools point at the live VOYCE site.

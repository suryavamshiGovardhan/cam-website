# CAM — Career Advisory Movement

Standalone site for **CAM** (an initiative of VOYCE). Extracted from [voyce-x](https://github.com/suryavamshiGovardhan/voyce-x) so CAM can live on its own without VOYCE navigation, auth, or backend coupling.

**Live:** https://suryavamshigovardhan.github.io/cam-website/

## Stack

Vite + React + TypeScript + Tailwind (same stack as VOYCE-X). Content is static — no Supabase or auth required.

## Develop

```bash
npm install
npm run dev
```

## Build

```bash
npm run build
npm run preview
```

GitHub Pages is configured with `base: /cam-website/` and an SPA `404.html` fallback.

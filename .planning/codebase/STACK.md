# Stack

Source: `package.json`, `README.md`, `AGENTS.md`.

## Runtime

- Next.js App Router, current dependency: `next ^16.2.4`.
- React `19.2.4` / React DOM `19.2.4`.
- TypeScript `^5`.
- Tailwind CSS v4 via `@tailwindcss/postcss`.

## Animation / interaction

- GSAP `^3.14.2` and `@gsap/react`.
- Framer Motion `^12.38.0`.
- Lenis `^1.3.21` for smooth scroll support.

## Scripts

- `npm run dev` — local dev server.
- `npm run lint` — ESLint.
- `npm run build` — production build.
- `npm run start` — start built app.

## Deploy

- GitHub repo: `adevwithpurpose/portfolio`.
- Live Vercel fallback URL: `https://portfolio-flame-psi-75.vercel.app`.
- Production domain `safeer.dev` may have DNS resolution issues from server; verify before relying on it.
- Vercel deploys from `main` after push.

## Version caveat

This is not old Next.js. Before changing Next.js-specific APIs or conventions, read the relevant docs under `node_modules/next/dist/docs/`.

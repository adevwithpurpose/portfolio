# Portfolio — Upgrade & Maintenance Guide

> **Live site:** [portfolio-flame-psi-75.vercel.app](https://portfolio-flame-psi-75.vercel.app)
> **GitHub:** [adevwithpurpose/portfolio](https://github.com/adevwithpurpose/portfolio)
> **Vercel project:** `safeeers-projects/portfolio`

---

## How Deployments Work

Every `git push` to `main` automatically triggers a Vercel build and deploy. No manual steps needed.

```
You edit → git commit → git push → Vercel builds → site goes live (~20s)
```

---

## Quick Update Workflow

### 1. Make your changes locally
```bash
cd D:/Anti-Gravity/Projects/portfolio
# edit files in your editor
```

### 2. Preview in dev server
```bash
npm run dev
# Opens http://localhost:3077
```

### 3. Commit and push
```bash
git add -A
git commit -m "updated hero headline and CTA text"
git push
```

That's it. Vercel picks up the push, builds, and deploys to production automatically.

---

## Common Update Scenarios

### Update text, images, or pricing
Edit the relevant component → commit → push. No rebuild needed, Vercel handles it.

| What to change | Where |
|---|---|
| Headline / hero copy | `src/app/page.tsx` → pass updated props to `<Hero>` |
| Service pricing | `src/components/Services.tsx` → edit `services` array |
| Testimonials | `src/components/SocialProof.tsx` → edit `testimonials` array |
| FAQ items | `src/components/FAQSection.tsx` → edit `faqs` array |
| Contact info | `src/components/Contact.tsx` |
| Footer links | `src/components/Footer.tsx` |
| Your photo | Replace `public/safeer.webp` |
| OG image | Replace `public/og-image.svg` |
| Site metadata | `src/app/layout.tsx` → metadata object |
| Global colors | `src/app/globals.css` → `:root` variables |

### Add a new section
1. Create component in `src/components/MySection.tsx`
2. Add its ID to `SECTION_IDS` in `src/app/page.tsx`
3. Add a label to the `labels` array in `NavigationDots.tsx`
4. Import and render in `page.tsx`
5. Give it `id="my-section"` and `snap-section` class
6. Commit → push

### Add a new page (route)
Create a folder under `src/app/` — Next.js App Router handles it automatically.
```
src/app/blog/page.tsx     → https://your-site.vercel.app/blog
src/app/about/page.tsx    → https://your-site.vercel.app/about
```

### Update dependencies
```bash
npm update           # Updates within semver ranges
npm install next@latest   # Major version bumps
git add -A
git commit -m "bump next.js to 17"
git push
```
⚠️ Always test locally with `npm run dev` after dependency changes.

---

## Adding Environment Variables

1. Add to `.env.local` for local dev:
```bash
CONTACT_WEBHOOK_URL=https://your-contact-workflow.example/webhook
```

2. Add to Vercel dashboard → Project → Settings → Environment Variables:
   - Same key/value
   - Set for Production, Preview, and Development environments

3. Commit your code (but **never** `.env.local` — it's in `.gitignore`)

---

## Connecting a Custom Domain

1. Go to Vercel dashboard → `safeeers-projects/portfolio` → Domains
2. Add your domain (e.g., `safeer.dev`)
3. Vercel gives you DNS records — add them to your domain registrar
4. Vercel auto-provisions SSL

---

## Reverting a Bad Deploy

If a push breaks the site:

```bash
# Option 1: Revert the commit and push
git revert HEAD
git push

# Option 2: Rollback from Vercel dashboard
# Vercel → Project → Deployments → click the last "Ready" deployment → Promote to Production
```

---

## Branch Strategy

| Branch | Purpose | Deploys to |
|---|---|---|
| `main` | Production | `portfolio-flame-psi-75.vercel.app` |
| `dev` (optional) | Testing changes | Vercel preview URL |

For feature branches, just push and Vercel creates a preview deployment with a unique URL.

---

## Project Structure Reference

```
portfolio/
├── src/
│   ├── app/                      # Next.js App Router
│   │   ├── layout.tsx            # Root layout, metadata, fonts
│   │   ├── page.tsx              # Homepage (section registry)
│   │   ├── globals.css           # Tailwind, scroll-snap, custom animations
│   │   ├── favicon.ico
│   │   ├── api/
│   │   │   └── contact/route.ts  # Contact form API endpoint
│   │   └── private/
│   │       └── pricing/page.tsx  # Hidden pricing page
│   ├── components/               # 24 UI components
│   │   ├── Hero.tsx
│   │   ├── Services.tsx
│   │   ├── Contact.tsx
│   │   └── ...
│   └── lib/
│       ├── LenisProvider.tsx     # Smooth scroll (currently disabled)
│       └── useAnalytics.ts       # Vercel analytics hook
├── public/                       # Static assets
│   ├── safeer.webp               # Your headshot
│   └── *.svg                     # Icons, OG image
├── .gitignore
├── package.json
├── next.config.ts
├── postcss.config.mjs
├── eslint.config.mjs
├── tsconfig.json
└── README.md                     # Full architecture + customization guide
```

---

## Useful Commands

```bash
npm run dev          # Dev server (port 3077)
npm run build        # Production build
npm run start        # Production server
npm run lint         # ESLint check
npx tsc --noEmit     # TypeScript type check
```

---

## Recovery — If You Lose Local Files Again

Your source is always on GitHub. To recover:
```bash
git clone https://github.com/adevwithpurpose/portfolio D:/Anti-Gravity/Projects/portfolio
cd D:/Anti-Gravity/Projects/portfolio
npm install
```

If something is only on Vercel (not pushed to GitHub):
```bash
npx vercel-deploy-source-downloader <your-token> --project portfolio
```

---

## Key URLs

| What | URL |
|---|---|
| Live site | https://portfolio-flame-psi-75.vercel.app |
| GitHub repo | https://github.com/adevwithpurpose/portfolio |
| Vercel dashboard | https://vercel.com/safeeers-projects/portfolio |
| Vercel deployments | https://vercel.com/safeeers-projects/portfolio/deployments |
| Vercel analytics | https://vercel.com/safeeers-projects/portfolio/analytics |

---

## Tech Stack

| Layer | Technology |
|---|---|
| Framework | Next.js 16 (App Router, Turbopack) |
| Language | TypeScript 5 |
| Styling | Tailwind CSS v4 |
| Animation | GSAP 3 + ScrollTrigger, Framer Motion |
| Fonts | Inter (Google Fonts via next/font) |
| CI/CD | Vercel (auto-deploy on git push) |
| Source Control | GitHub (`adevwithpurpose/portfolio`) |

# safeer.dev — Portfolio + Client Acquisition + Deployment

> Personal brand platform for Safeer — automation, AI systems, and web development.
> Live: https://safeer.dev
> Built with: Next.js 16, React 19, Tailwind CSS v4, GSAP, Framer Motion.

---

## Source of truth

- Agent/project rules: `AGENTS.md`
- Claude-compatible pointer: `CLAUDE.md` imports `AGENTS.md`; do not duplicate rules there.
- Website source: `src/`
- Portfolio/client-acquisition docs: `docs/`
- Deployment notes: `deploy/`

If rules conflict, follow `AGENTS.md` first.

---

## Current positioning

The main public site should stay broad but premium:

- custom AI agents
- automation systems
- web systems / platforms
- workflow cleanup
- internal tools and operational visibility

Do not make the main site a Shopify/n8n/tool-specific offer unless Safeer explicitly asks for a niche landing page or campaign.

---

## Quick start

```bash
cd /home/saf08/sync/G5\ Vault/Gem/knowledge-base/portfolio
npm install
npm run dev
npm run lint
npm run build
```

Deploy is handled by Vercel on push to `main` when changes are ready for production.

---

## Project structure

```text
portfolio/
├── src/                    # Next.js portfolio site
│   ├── app/                # App Router pages + API routes
│   ├── components/         # UI sections/components
│   └── lib/                # analytics/utilities
├── public/                 # static assets
├── docs/                   # strategy, offers, outreach, proof assets, playbooks
├── deploy/                 # Doha/server/deployment notes
├── AGENTS.md               # project agent guide and rules source of truth
├── CLAUDE.md               # thin pointer to AGENTS.md
├── RESOLVER.md             # routing map for docs/workflows
└── llms.txt                # compact doc map for agents
```

---

## Tech stack

| Layer | Technology |
|---|---|
| Framework | Next.js 16 App Router |
| UI | React 19 |
| Language | TypeScript 5 |
| Styling | Tailwind CSS v4 |
| Animation | GSAP + Framer Motion |
| Deployment | Vercel |

Important: this project uses Next.js 16.2.2. Read the relevant `node_modules/next/dist/docs/` guide before writing Next.js code.

---

## Homepage structure

1. Hero — positioning, proof, CTA
2. Social proof — testimonials/activity/proof cues
3. Service 1 — web systems
4. Service 2 — automation systems
5. Service 3 — AI assistants / internal tools
6. Process — how projects run
7. Case studies — anonymized outcomes and proof
8. Why Me — comparison and decision support
9. FAQ
10. Contact — project inquiry and booking path

---

## Service packaging

Use package/value framing, not cheap hourly positioning:

| Offer | Public framing |
|---|---|
| Website / landing page build | From $750 |
| Automation system build | From $500 |
| AI assistant / internal tool | From $900 |

Pricing should be scoped before build. Avoid `$18/hr`, `$20/hr`, `$25/hr`, or other low-cost-first framing in public copy.

---

## Environment variables

| Variable | Purpose | Required |
|---|---|---|
| `CONTACT_WEBHOOK_URL` | Optional generic contact-form webhook forwarding | No |
| `RESEND_API_KEY` | Optional direct email delivery | No |

The contact route currently validates submissions, logs in development, and can forward to a generic webhook if configured.

---

## Documentation map

- `docs/README.md` — docs index and current direction
- `docs/00-admin/USER.md` — Safeer profile and operating preferences
- `docs/01-strategy/channel-action-plans.md` — current broad acquisition plan
- `docs/03-offers/client-onboarding-playbook.md` — onboarding and delivery notes
- `docs/04-outreach/` — outreach templates
- `docs/05-linkedin-presence/` — LinkedIn/profile/proof assets
- `docs/06-progress/tracker.md` — progress tracking
- `docs/07-playbooks/` — repeatable workflows
- `docs/AUDIT.md` / `docs/RESEARCH-QUEUE.md` / `docs/RESTRUCTURE-LOG.md` — audit/control docs

Files prefixed with `legacy-` are preserved source material, not current public positioning.

---

## Verification before deploy

```bash
npm run lint
npm run build
```

Also search public source for stale/risky positioning before deployment:

```bash
rg -n "Shopify|n8n|e-?commerce|\$18/hr|\$20/hr|\$25/hr|your-profile|12,847" src README.md AGENTS.md llms.txt
```

Expected result: no main-site identity/tool-specific positioning. Guardrail mentions in docs/rules are okay when they explicitly say not to use those terms as the main public position.

---

## License

Private — All rights reserved to Safeer.

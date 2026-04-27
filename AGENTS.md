# safeer.dev — Project Agent Guide

**Project:** safeer.dev portfolio + client hunting + GCP Doha agent deployment
**Owner:** Safeer (Boss)
**Timezone:** Asia/Karachi (UTC+5)

---

## Project Structure

```
portfolio/
├── src/                    ← Next.js portfolio site (safeer.dev)
│   ├── app/                ← App Router pages + API routes
│   ├── components/         ← 24 UI components
│   └── lib/                ← Analytics, utilities
├── public/                 ← Static assets (headshot, OG images)
├── docs/                   ← Client acquisition, positioning, proof, playbooks
│   ├── README.md           ← Docs index and current public direction
│   ├── 00-admin/           ← User profile, anti-patterns, skill inventory
│   ├── 01-strategy/        ← Channel/action strategy; legacy files are source only
│   ├── 02-research/        ← Market/channel research and research queue items
│   ├── 03-offers/          ← Offers, onboarding, delivery playbooks
│   ├── 04-outreach/        ← Outreach templates and channel copy
│   ├── 05-linkedin-presence/ ← LinkedIn/profile/proof assets
│   ├── 06-progress/        ← Progress tracker
│   └── 07-playbooks/       ← Repeatable operating procedures
├── deploy/                 ← GCP Doha server deployment notes
│   ├── README.md           ← Server info & architecture
│   ├── .env.example        ← Environment variable template
│   ├── ssh-config          ← SSH config snippet
│   ├── deploy-agent.sh     ← Legacy OpenClaw setup script (historical)
│   └── agent-setup.md      ← Hermes/OpenClaw deployment notes
├── AGENTS.md               ← Project agent guide and rules source of truth
├── CLAUDE.md               ← Thin Claude-compatible pointer to AGENTS.md
```

---

## Core Directories

### `src/` — Portfolio Site (safeer.dev)
- **Framework:** Next.js 16.2.2 App Router, React 19, TypeScript
- **Styling:** Tailwind CSS v4, GSAP, Framer Motion
- **Live:** https://portfolio-flame-psi-75.vercel.app → safeer.dev
- **Deploy:** Auto-deploy on `git push` to main via Vercel
- **Key rule:** Read `node_modules/next/dist/docs/` guides before writing Next.js code — this version has breaking changes from standard Next.js

### `docs/` — Client Hunting Strategy
- **Mission:** Acquire 2-3 premium clients/month for custom AI agents, automation, and web systems.
- **Positioning:** Broad but premium systems builder — custom AI agents, automation, workflow systems, and credible web proof. Do not default to generic Shopify/n8n positioning unless the niche/task explicitly calls for it.
- **Status:** Strategy docs exist, but verify current status from `docs/` before claiming outreach/progress state.
- **Key files:**
  - `docs/README.md` — Docs index and current direction.
  - `docs/01-strategy/channel-action-plans.md` — Current broad channel plan.
  - `docs/00-admin/USER.md` — Boss profile & priorities.
  - `docs/04-outreach/` — Outreach templates; review for current positioning before reuse.
  - `docs/05-linkedin-presence/` — LinkedIn authority/proof assets.
  - Files prefixed with `legacy-` — Preserved historical/niche material, not current public positioning.

### `deploy/` — GCP Doha Server
- **Server:** GCP Doha proxy/agent server. Verify the current IP and service state from memory/config before editing deploy docs or making connection claims.
- **Current known stack:** proxy/VPN services plus Hermes-adjacent automation experiments; do not assume legacy Hysteria2/OpenClaw details are current without checking.
- **Access:** Use documented deploy files and current local credentials/config; never expose raw tokens or secrets.

---

## Working Relationship

- Direct, zero-fluff communication
- Autonomous execution on routine work
- Final verified outcomes over narration
- Absolute paths and technical precision
- Orchestrator → worker model for complex work

## Current Priorities (Ranked)

1. **Client acquisition + portfolio proof**
2. **Stable Hermes / OpenCode / agent operations**
3. **Repeatable premium AI-agent, automation, and web-system delivery**
4. **Self-hosted automation and outreach systems**

## Focus Right Now

- Anything that helps win clients faster
- Anything that improves portfolio credibility or public proof
- Anything that removes friction from Hermes/OpenCode/Codex workflows
- Anything that packages services into repeatable premium delivery

## Agent Quality Rules

- Think before coding: inspect context first, identify assumptions, and ask only if ambiguity changes the implementation.
- Define done before execution and verify done before reporting success.
- Simplicity first: prefer the smallest clean implementation that satisfies the request.
- Surgical changes only: do not refactor, reformat, rename, or clean unrelated code.
- Verify with project-native checks: `npm run lint`, `npm run build`, targeted tests, or direct UI/output inspection as appropriate.
- For Next.js changes, read the relevant `node_modules/next/dist/docs/` guide before coding because this project uses Next.js 16.2.2.

---

<!-- BEGIN:nextjs-agent-rules -->
# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` before writing any code. Heed deprecation notices.
<!-- END:nextjs-agent-rules -->

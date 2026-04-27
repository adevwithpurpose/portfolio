# RESOLVER — Safeer's Portfolio + Hermes Workspace

Maturity: beta
Last updated: 2026-04-26

Purpose: route tasks to the right docs/workflows before creating new files or making changes.

## First rule

Before creating a new doc, ask:

1. Is this website code, portfolio strategy, client hunting, Hermes operations, or general vault knowledge?
2. Is there already a file for this?
3. Should this be public-facing, private strategy, or assistant-managed notes?

## Routing table

| Task type | Use / update | Notes |
|---|---|---|
| safeer.dev website code | `src/`, `package.json`, `next.config.ts` | Run build before deploy |
| public portfolio copy | `src/app/page.tsx`, `src/components/`, `docs/AUDIT.md` | Keep generic: automation + web dev |
| portfolio strategy | `docs/01-strategy/` | Do not blindly use niche Shopify/n8n language |
| offers / service packaging | `docs/03-offers/` | Convert to public copy only after sensitivity check |
| outreach templates | `docs/04-outreach/` | Human review before use |
| LinkedIn presence | `docs/05-linkedin-presence/` | Keep proof-focused, not hype-heavy |
| progress tracking | `docs/06-progress/` | Track outcomes, not vague activity |
| recurring procedures | `docs/07-playbooks/` | Add playbook instead of re-explaining in chat |
| admin/control docs | `docs/00-admin/` | START-HERE, anti-patterns, inventory |
| Hermes reports | `/home/saf08/sync/G5 Vault/Gem/3. Hermes/Reports/` | Assistant-generated research/audits |
| Hermes workflows | `/home/saf08/sync/G5 Vault/Gem/3. Hermes/Workflows/` | Assistant-managed reusable procedures |
| client-sensitive notes | `/home/saf08/sync/G5 Vault/Gem/1. Human/Clients/` | Handle carefully; avoid public exposure |
| unsorted captures | `/home/saf08/sync/G5 Vault/Gem/0. Inbox/` | Use only when no clear destination exists |

## Skill loading hints

| If the task mentions... | Load skill |
|---|---|
| portfolio, safeer.dev, public copy, Vercel | `safeer-portfolio-workflow` |
| deployment, GitHub, Vercel push | `safeer-portfolio-deployment` |
| Obsidian/vault notes | `obsidian` |
| scraping/extraction/site analysis | `crawl4ai-stack` |
| bugs/test failures | `systematic-debugging` |
| implementation plan | `writing-plans` or `subagent-driven-development` |

## File creation rules

- Prefer additive docs over restructuring.
- Do not delete user-authored content without explicit approval.
- Use maturity tags in new docs.
- If content is not ready for public use, label it `beta` or `experimental`.
- Keep public copy free of raw client details and credentials.

## Cron / scheduled job rules

- Use thin prompts: `Read <workflow-or-skill> and run it.`
- Add quiet-hours gate before WhatsApp notifications.
- Stagger schedules; do not pile all jobs on `:00`.
- Save outputs to `3. Hermes/Cron Jobs/` or Reports unless user asked for direct delivery.

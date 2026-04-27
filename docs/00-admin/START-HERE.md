# START HERE — Safeer's Portfolio + Hermes Workspace

Maturity: production
Owner: Safeer / Hermes
Last updated: 2026-04-26

## Purpose

This is the shortest path for an agent or collaborator to understand the current operating system without reading every historical note.

## 1. Understand the current positioning

Public positioning for safeer.dev:

- Automation & Web Development
- AI workflow architecture
- clean websites, internal tools, and workflow systems
- avoid public Shopify/n8n-specific positioning unless Safeer requests a niche page

Read first:

- `docs/README.md`
- `docs/AUDIT.md`
- `docs/00-admin/USER.md`
- `docs/01-strategy/channel-action-plans.md`

## 2. Work on the website safely

Website repo root:

- `/home/saf08/sync/G5 Vault/Gem/knowledge-base/portfolio`

Rules:

- Check `git status` before edits.
- Preserve client-sensitive details.
- Keep public copy generic: automation, web development, workflows, AI assistants/internal tools.
- Run build before deployment changes.
- Push to GitHub only after verification.

Main website files:

- `src/app/page.tsx`
- `src/components/`
- `src/app/api/contact/`
- `src/app/private/pricing/`

## 3. Use the operating docs

Use these docs instead of improvising:

- `RESOLVER.md` — where tasks and notes belong
- `llms.txt` — agent-readable map of key files
- `docs/00-admin/ANTI-PATTERNS.md` — what not to do
- `docs/00-admin/HERMES-SKILL-INVENTORY.md` — active skills/workflows
- `docs/07-playbooks/` — recurring procedures

## 4. Current priority order

1. Client acquisition + portfolio proof
2. Safe public portfolio copy and deployment
3. Repeatable offer/playbook creation
4. Stable Hermes/Obsidian/Honcho operations
5. Optional dashboard/admin UI later

## 5. Quick command checks

```bash
git status
npm run build
```

If a task touches deployment, credentials, or public copy, verify before final response.

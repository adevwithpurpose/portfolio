# Hermes Skill / Workflow Inventory

Maturity: beta
Last updated: 2026-04-26

Purpose: keep track of useful skills, workflows, and copied patterns so Safeer's system does not become a pile of untracked experiments.

## Maturity labels

- production — tested, actively used, documented
- beta — useful but still being refined
- experimental — idea/prototype, not safe to depend on
- avoid — not relevant or too risky for now

## Active local skills

| Skill / Workflow | Maturity | Purpose | Source / Location | Last verified | Notes |
|---|---|---|---|---|---|
| safeer-portfolio-workflow | production | Work on safeer.dev, portfolio docs, positioning, Vercel/GitHub flow | `~/.hermes/skills/software-development/safeer-portfolio-workflow` | 2026-04-26 | Main portfolio operating skill |
| safeer-portfolio-deployment | production | Deploy safeer.dev safely | `~/.hermes/skills/software-development/safeer-portfolio-deployment` | 2026-04-26 | Use before GitHub/Vercel deployment |
| obsidian | production | Read/write synced vault notes | `~/.hermes/skills/note-taking/obsidian` | 2026-04-26 | Vault root: `/home/saf08/sync/G5 Vault/Gem` |
| crawl4ai-stack | production | Scraping/extraction/branding/site analysis | local service `http://localhost:8010` | 2026-04-26 | Preferred extraction tool |
| local-honcho-hermes-memory | production | Honcho memory backend setup/debugging | `~/.hermes/skills/software-development/local-honcho-hermes-memory` | 2026-04-26 | Honcho already active |
| systematic-debugging | production | Bug/test failure workflow | Hermes skill | 2026-04-26 | Load for unexpected failures |
| requesting-code-review | beta | Pre-commit review/check pipeline | Hermes skill | 2026-04-26 | Use for larger code edits |

## Patterns copied from repo audit

| Pattern | Maturity | Copied from | Adopt as |
|---|---|---|---|
| START-HERE onboarding | beta | `awesome-hermes-agent` | `docs/00-admin/START-HERE.md` |
| maturity tags | beta | `awesome-hermes-agent` | labels across docs/scripts |
| RESOLVER dispatcher | beta | `gbrain` | `RESOLVER.md` |
| llms.txt doc map | beta | `gbrain` | root `llms.txt` |
| thin cron prompts | beta | `gbrain` | cron convention |
| quiet-hours notification gate | beta | `gbrain` | WhatsApp cron rule |
| fail-closed admin auth | experimental | `hermes-workspace` | future admin/dashboard UI |
| privacy filter before memory writes | beta | `agentmemory` | memory hygiene rule |
| audit log for forget/delete | beta | `agentmemory` | memory governance rule |

## Candidate tools to evaluate later

| Tool | Maturity | Why evaluate | Decision |
|---|---|---|---|
| hermes-workspace | experimental locally | Possible admin UI/cockpit | Test separately only, no production install yet |
| rtk-hermes | experimental | Token compression for terminal-heavy work | Investigate after portfolio cleanup |
| SkillClaw | experimental | Auto skill evolution | Avoid until skills inventory is clean |
| gbrain | avoid for now | Strong ideas but overlaps Honcho/Obsidian | Copy patterns only |
| agentmemory | avoid for now | Strong memory lifecycle ideas but overlaps Honcho | Copy privacy/audit ideas only |

## Maintenance rule

Before adding a new skill or workflow:

1. Check this inventory.
2. Check `RESOLVER.md`.
3. Extend an existing workflow if possible.
4. Add maturity, source, last verified date.

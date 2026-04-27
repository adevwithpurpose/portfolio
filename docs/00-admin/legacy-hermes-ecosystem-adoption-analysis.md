# Adoption Analysis — awesome-hermes-agent Repo

**Source:** `/tmp/safeer-repo-feature-audit/awesome-hermes-agent` (inspected only, not installed)
**Date:** 2026-04-26
**Repo type:** Curated awesome-list (markdown docs, no code to install)

---

## What This Repo Is

An `awesome-list` cataloging 80+ Hermes Agent ecosystem resources: skills, plugins, deployments, integrations, and guides. Published by `0xNyk` (Builderz). All value is in documentation patterns, categorization schemes, and curation standards — zero installable artifacts.

---

## Reusable Patterns to Copy

### 1. Maturity Tagging System
**File ref:** `README.md` lines 33-39

They tag every item with `**[production]**`, `**[beta]**`, or `**[experimental]**` and define what each means in a table.

**Adopt for Safeer:** Tag all docs, templates, and scripts in the portfolio repo with maturity labels. Prevents wasting time on unproven assets.
- `production` — Tested, documented, actively used
- `beta` — Works, still refining
- `experimental` — Draft / idea stage

### 2. "Where Do I Start?" Onboarding Path
**File ref:** `README.md` lines 24-39

Instead of dumping a list, they give a 3-step path: (1) Get running → (2) Add first skills → (3) Get a GUI. Each step has one recommended tool.

**Adopt for Safeer:** Create a `START-HERE.md` in `/docs/00-admin/` with Safeer's 3-step path:
1. Access Hermes on GCP Doha
2. Load core memory (USER.md + client context)
3. Run first client-hunting workflow

### 3. Operational Playbooks Section
**File ref:** `README.md` lines 252-261

Short, actionable workflow patterns for production use (e.g., "Nightly self-evolution + guardrail evaluation", "Memory pressure handling with Honcho/Hindsight").

**Adopt for Safeer:** Add `/docs/07-playbooks/` with Safeer-specific operational patterns:
- Weekly portfolio update playbook
- Client discovery call prep → follow-up workflow
- Hermes memory hygiene (curate USER.md, prune stale context)
- GCP Doha health check routine

### 4. Level-Up Blueprints (Opinionated Bundles)
**File ref:** `README.md` lines 264-274

They bundle related tools into named stacks ("Memory stack that actually compounds", "Operator cockpit for real work"). Each blueprint explains *when* to use it and *why*.

**Adopt for Safeer:** Create `/docs/00-admin/STACK-BLUEPRINTS.md`:
- **Client Acquisition Stack** — Hermes + WhatsApp + outreach templates + progress tracker
- **Delivery Stack** — Hermes + n8n + Shopify + onboarding playbook
- **Public Proof Stack** — Portfolio site + LinkedIn presence + flagship proof assets

### 5. Skill Categorization Taxonomy
**File ref:** `README.md` lines 82-138

They organize skills into:
- Community Skills (loose contributions)
- agentskills.io Ecosystem (standardized, cross-platform)
- Plugins (extend core behavior)
- Skill Registries & Discovery (where to find more)

**Adopt for Safeer:** Create `/docs/00-admin/HERMES-SKILL-INVENTORY.md` tracking:
- Skills Safeer has built or installed
- Which are active vs. stale
- Dependencies (e.g., Spotify skill needs raspotify)
- Source URL and last verified date

### 6. Quality Standards for Docs
**File ref:** `CONTRIBUTING.md` lines 17-27

Seven criteria for inclusion:
1. Relevant
2. Documented (clear README)
3. Functional
4. Not a duplicate
5. Open source
6. Maintained
7. "Why now" — one sentence on current relevance

**Adopt for Safeer:** Apply these as a checklist before adding any new doc, template, or script to the portfolio repo. Prevents bloat.

### 7. "Anti-Patterns to Avoid" Callouts
**File ref:** `README.md` lines 264-274, `CONTRIBUTING.md` lines 29-33

They explicitly warn against bad practices: "evolve without quietly getting weird", "don't depend on experimental tools for production".

**Adopt for Safeer:** Add an `ANTI-PATTERNS.md` in `/docs/00-admin/`:
- Don't let Hermes run unapproved spending (no USDC/x402 plugins without limits)
- Don't install experimental skills on the production Doha host
- Don't migrate from OpenClaw without side-by-side testing
- Don't treat YouTube as a hobby lane without a business angle (already in USER.md — expand)

---

## Concrete Features / Tools Worth Investigating

From the list, these directly match Safeer's priorities:

| Resource | Maturity | Why It Matters for Safeer |
|---|---|---|
| `wondelai/skills` | production | 380+ stars, cross-platform skills library. Good source for skill design patterns. |
| `hermes-workspace` | production | Web GUI with chat, terminal, memory browser. Could replace SSH tunnel dashboard access. |
| `mission-control` | production | Fleet management + cost tracking. Useful if Safeer scales to multiple client agents. |
| `SkillClaw` | production | Auto-evolves skill library from session data. Frees Safeer from manual skill curation. |
| `rtk-hermes` | beta | Compresses terminal output 60-90% before LLM context. Reduces token burn on Doha host. |
| `evey-setup` | beta | One-command stack setup. Study for automating Safeer's own Hermes re-deployments. |
| `honcho-self-hosted` | beta | Stronger cross-session memory. Safeer already uses Honcho — evaluate if self-hosted is better. |
| `hermes-incident-commander` | beta | SRE agent for production monitoring. Could monitor client n8n/Shopify workflows. |
| `microsoft-workspace-skill` | beta | Outlook/365 integration. Useful for client-facing email automation. |
| `lintlang` | beta | Static linter for agent configs. Catches config drift that breaks behavior. |

---

## What to Avoid

### 1. Forks and Derivatives (Lines 231-239)
Most forks are experimental or single-purpose (e.g., `orahermes-agent` for Oracle, `hermes-agent-camel` for trust boundaries). Safeer doesn't need these unless a specific client demands Oracle or formal verification.

### 2. Blockchain/Crypto Plugins (Lines 123-129, 185-186)
`hermes-payguard`, `ripley-xmr-gateway`, `hermes-blockchain-oracle` — unless Safeer explicitly builds crypto-automation services, these add attack surface and compliance risk.

### 3. Gaming/Fantasy Skills (Lines 91, 218-219)
`Wizards-of-the-Ghosts`, `hermescraft`, `anihermes` — fun but irrelevant to service delivery and client acquisition.

### 4. Research-Only Projects (Lines 226-228)
`hermes-research-agent`, `hermes-genesis` — cool demos, no immediate revenue impact.

### 5. The "Awesome-List" Repo Itself
Do not fork or maintain a copy of this list. It's a consumer reference, not a codebase. Instead, extract the patterns (above) into Safeer's own operating docs.

---

## Recommended Next Actions

1. **Create `/docs/00-admin/START-HERE.md`** using the 3-step onboarding pattern.
2. **Create `/docs/00-admin/ANTI-PATTERNS.md`** with Safeer-specific warnings.
3. **Create `/docs/07-playbooks/`** and move recurring workflows out of ad-hoc chat into documented playbooks.
4. **Create `/docs/00-admin/HERMES-SKILL-INVENTORY.md`** using the taxonomy pattern.
5. **Apply maturity tags** to all existing docs (start with `client-onboarding-playbook.md` as `beta`, `USER.md` as `production`).
6. **Evaluate `rtk-hermes`** for token cost reduction on the Doha host (zero-config, 60-90% compression claimed).
7. **Evaluate `SkillClaw`** to auto-curate Hermes skills instead of manual maintenance.

---

*No files were installed or executed. All references are to the inspected repo at `/tmp/safeer-repo-feature-audit/awesome-hermes-agent`.*

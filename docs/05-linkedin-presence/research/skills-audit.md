# LinkedIn Social Presence — Skills Audit

**Date:** 2026-03-30
**Phase:** Research / Skills Discovery

---

## Gem Vault Skills Found

### LinkedIn Automation

| Skill | Description | Source |可用? |
|-------|-------------|--------|------|
| `linkedin-automation` | Automate LinkedIn tasks via Rube MCP (Composio): create posts, manage profile, company info, comments, image uploads | community | ⚠️ Requires Composio/Rube MCP |
| `linkedin-cli` | CLI for LinkedIn: fetch profiles, search people/companies, send messages, manage connections, create posts, Sales Navigator | community | ⚠️ CLI-based, requires LinkedIn account |

### Content & Social

| Skill | Description | Source | 可用? |
|-------|-------------|--------|------|
| `content-marketer` | Elite content marketing strategist, AI-powered content creation, omnichannel distribution, SEO optimization | community | ✅ Available |
| `social-content` | Expert social media strategist with access to scheduling platform | community | ✅ Available |
| `social-orchestrator` | Unified social channel orchestrator (Instagram, Telegram, WhatsApp) | community | ⚠️ WhatsApp-focused |
| `instagram-automation` | Automate Instagram via Rube MCP (Composio) | community | ⚠️ Different platform |
| `twitter-automation` | Automate Twitter/X via Rube MCP (Composio) | community | ⚠️ Different platform |

### Automation & Workflow

| Skill | Description | Source | 可用? |
|-------|-------------|--------|------|
| `n8n-mcp-tools-expert` | Expert guide for n8n-mcp tools, nodes, templates, workflows | community | ✅ Available |
| `browser-automation` | Browser automation expert for scraping, testing | community | ✅ Available |

### Research & Analysis

| Skill | Description | Source | 可用? |
|-------|-------------|--------|------|
| `exa-search` | Semantic search via Exa API | community | ✅ Available |
| `apify-content-analytics` | Track engagement metrics across Instagram, social campaigns | community | ✅ Available |

---

## GitHub / Open Source Tools Found

### Open Source Libraries

| Tool | Language | Description | Risk |
|------|----------|-------------|------|
| `linkedin-scraper` (PyPI) | Python | Playwright-based profile/company/job scraper. v3.0 async. | ⚠️ LinkedIn ToS risk |
| `linkedInScraper` (ashutosh2411) | Python | Open-source scraper with links.txt, company.txt input | ⚠️ LinkedIn ToS risk |
| `linkedin-api` (now private) | Python | Was official API alternative, now privatized | ❌ Deprecated |

### Automation Platforms

| Tool | Description | Cost | Risk |
|------|-------------|------|------|
| **Phantombuster** | Industry standard, cloud-based, 1000s of automations | ~€99/mo | Medium (LinkedIn detects) |
| **Expandi** | Browser-based, "safest" automation, built-in limits | ~€59/mo | Low-Medium |
| **Dux-Soup** | Browser extension, manual + scheduled modes | Free trial / ~€15/mo | Medium |
| **MeetAlfred** | Mac app, deep LinkedIn integration | ~€49/mo | Low |
| **Dripify** | Video-focused, simple UI | ~€49/mo | Low |
| **Instantly** | Cold email focus, LinkedIn not primary | ~$37/mo | N/A |
| **Apollo.io** | Lead database + email + LinkedIn sequences | Free / ~$60/mo | Low |

---

## Analysis: Gem Vault Skills Gap

### What We Have in Gem Vault
- LinkedIn automation via **Rube MCP (Composio)** — but requires Composio subscription + MCP setup
- LinkedIn CLI skill — but no clear implementation path
- Content creation skills (content-marketer, social-content) — these are for STRATEGY, not automation

### What's MISSING in Gem Vault
- **No skill for Phantombuster/Expandi/Dux-Soup** — industry-standard tools, no gem skill
- **No skill for Buffer/Hootsuite** — content scheduling platforms
- **No skill for LinkedIn Sales Navigator** — outreach automation
- **No skill for Script-based LinkedIn automation** — Python/playwright approach
- **No skill for "content pipeline"** — AI content → scheduling → posting → analytics

---

## Key Finding: The Automation Stack Has 3 Layers

### Layer 1: Content Creation (AI)
- **Gem skills available:** `content-marketer`, `social-content`
- **What we still need:** AI content generation for LinkedIn posts specifically

### Layer 2: Content Scheduling
- **Gem skills found:** None for Buffer/Hootsuite
- **Tools:** Buffer (free tier), Hootsuite, Publer.io
- **Integration:** No gem skill, need API integration or manual

### Layer 3: Outreach & Engagement Automation
- **Gem skills found:** `linkedin-automation` (Rube MCP), `linkedin-cli`
- **Problem:** Rube MCP requires Composio subscription + complex setup
- **Alternative:** Phantombuster, Expandi (direct tools, no gem skill needed)

---

## Recommendation for Boss

**For a realistic, working system, we need to build with:**

1. **Content Creation:** Use gem skills (`content-marketer`) + our own `byte-dream.py` style scripts with Gemini API
2. **Content Scheduling:** Buffer (free tier has 10 scheduled posts) — manual posting to start
3. **Outreach & Engagement:** Phantombuster OR Expandi — these are PURPOSE-BUILT, not hacky scripts
4. **Analytics:** Apollo.io (free tier) for lead tracking

**No gem skill will automate the full LinkedIn workflow.** We need to build a custom pipeline using:
- Gemini API (content generation) — we already have this
- Buffer (scheduling) — simple API
- Phantombuster (engagement/outreach) — already built, just configure
- Or build our own n8n workflow for parts of it

---

## Next Step

See `legacy-tool-analysis.md` for historical deep dive on each tool category + recommended stack.

Then see `plan/implementation-plan.md` for the full working plan.
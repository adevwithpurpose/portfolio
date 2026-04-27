# LinkedIn Social Presence — Open Source Alternatives Research

**Date:** 2026-03-30
**Status:** Complete

---

## Executive Summary

Boss's directive: Find open-source/free alternatives for each tool. We're automation engineers — we build our own systems on open-source platforms. We have local hosting capability + VPS.

**Key Finding:** We can build a 100% free, open-source LinkedIn presence system with:
- Postiz (self-hosted) for content scheduling
- n8n workflows (already have) for LinkedIn lead collection
- LinkedIn MCP server or browser-use for outreach automation
- Twenty (self-hosted CRM) for lead management
- Gemini API (already have) for content generation

**Monthly Cost: $0** (vs original $114-243/mo)

---

## Tool 1: Buffer → POSTIZ (Open Source)

### Original Tool
- **Buffer** ($15/mo paid)
- Social media scheduling
- LinkedIn support via OAuth

### Open Source Alternative: Postiz

**Website:** https://postiz.com/
**GitHub:** https://github.com/gitroomhq/postiz
**Cost:** Free (self-hosted)
**License:** Open source (MIT)

**What it does:**
- Self-hosted social media scheduling
- 30+ platforms supported including LinkedIn ✅
- Uses official platform OAuth (legit, not scraping)
- AI-enhanced content creation built-in
- CLI for AI agents (`postiz-agent` — schedule posts programmatically)
- Analytics dashboard
- Team collaboration

**Key Feature for Us:**
```
Postiz Agent CLI:
- Schedule posts across 28+ platforms programmatically
- AI agents can automate posting
- Perfect for our byte-dream → post pipeline
```

**Deployment Options:**
1. **Docker (local):** `docker run -p 4200:3000 gitroom/postiz`
2. **Railway:** 1-click deploy (https://railway.com/deploy/deploy-postiz)
3. **Self-hosted VPS:** Docker compose file available

**Gem Vault Skill:** `social-content` can be used WITH Postiz for content strategy

**Verdict:** ✅ **FULL REPLACEMENT — BETTER than Buffer**
- Free, open-source, more platforms, AI agent CLI built-in
- LinkedIn via official OAuth ✅

---

## Tool 2: Expandi → Multiple Open Source Options

### Original Tool
- **Expandi** ($99/mo)
- LinkedIn outreach automation
- Connection requests + follow-up sequences
- Auto warm-up, safety features

### Open Source Alternatives

#### Option A: n8n + LinkedIn MCP Server (RECOMMENDED)

**We already have n8n running.** Build LinkedIn automation with n8n + LinkedIn MCP server.

**LinkedIn MCP Server (GitHub):**
- `https://github.com/nickcoutsos/linkedin-mcp-server` or similar
- MCP server that lets AI assistants control LinkedIn
- Real-time data retrieval, posting, messaging

**n8n Workflow for LinkedIn Outreach:**
```
Trigger (schedule) → LinkedIn Search (via MCP or scraping)
  → Extract profile URLs → Filter by ICP
  → Send connection request (via LinkedIn API or browser-use)
  → Store in CRM
  → Follow-up sequence (n8n delays)
```

**How it works:**
- Use `browser-use` (GitHub) to control LinkedIn via local browser
- Or use LinkedIn official API for posting (limited but safe)
- n8n orchestrates the workflow

**Key GitHub Projects:**
1. **browser-use** — "Let any AI agent use the local browser" (Python)
   - Can automate LinkedIn via Playwright
   - 100% local, no external service
   - Works with our existing Playwright setup

2. **linkedin-api** (open-source Python library)
   - Programmatic LinkedIn access via scraping
   - Profile searches, messaging, posting

3. **linkedin-mcp** — MCP server for LinkedIn
   - Connect AI agents (Claude, etc.) to LinkedIn
   - Our agents could use this

#### Option B: Phantombuster (Partially Open)

- **Phantombuster** is NOT open source
- BUT has API access for developers
- $69/mo starter

#### Option C: Build Your Own (Most Control)

Using `browser-use` or Playwright:
```python
from browser_use import Agent
from playwright.sync_api import sync_playwright

# Open LinkedIn, login, search for prospects,
# send connection requests, follow-up messages
agent = Agent(task="Find Shopify store owners in London on LinkedIn, "
                   "send them a connection request with message: "
                   "'Hi, I help Shopify brands automate their reporting. "
                   "Worth a chat?'")
```

**Verdict:** ⚠️ **PARTIAL REPLACEMENT — Requires work**
- No single open-source tool does everything Expandi does
- Best approach: n8n + browser-use + LinkedIn official API
- We have n8n running — this is doable
- Risk: LinkedIn ToS (same risk as Expandi, just more control)

---

## Tool 3: Apollo.io → Open Source Stack

### Original Tool
- **Apollo.io** (free tier / $49/mo paid)
- Lead database
- Email finding
- Contact enrichment

### Open Source Alternatives

#### Option A: Hunter.io (Free Tier) — RECOMMENDED

**Website:** https://hunter.io/
**Free Tier:** 25 searches/month, 100 email verifications/month
**API Access:** Yes (free tier has API)

**What it does:**
- Find email addresses from domain names
- Email format prediction (pattern)
- Email verification
- Company information lookup

**For our use case:**
- Enter prospect's company domain → get email pattern
- Verify before sending
- Free tier: 25 finds/month (startup), can scale with paid

#### Option B: Snov.io (Free Tier)

**Website:** https://snov.io/
**Free Tier:** 50 credits/month
**API:** Yes

**Similar to Hunter.io:**
- Email finder from domain
- Email verifier
- More generous free tier

#### Option C: Built Your Own Email Finder

**GitHub: email-finder (Python)**
- Open-source email extraction from websites
- Scans common contact endpoints
- No API cost, just scraping

**Pattern-based email generation:**
```python
# Common patterns:
# first.last@company.com
# first@company.com
# f.last@company.com
# {first}{last}@company.com

def guess_email(first, last, domain, pattern="first.last"):
    patterns = {
        "first.last": f"{first.lower()}.{last.lower()}@{domain}",
        "first": f"{first.lower()}@{domain}",
        "flast": f"{first[0].lower()}{last.lower()}@{domain}",
    }
    return patterns.get(pattern)
```

#### Option D: LinkedIn Sales Navigator → LinkedIn Leads Scraper

**GitHub: linkedin-leads-discover**
- Open-source LinkedIn lead scraper
- Uses LinkdAPI for automation
- Exports to CSV/JSON
- Free (self-hosted)

**jbinfo/linkedin_sales_navigator_scraper:**
- Specifically scrapes Sales Navigator data
- Get leads, companies, search results
- Export for CRM use

**Verdict:** ✅ **FULL REPLACEMENT — Free tier + self-built**
- Hunter.io free tier: 25 finds/month (startup)
- LinkedIn leads scraper: Get prospects without Sales Navigator
- Self-built email finder: Free, pattern-based
- Cost: $0

---

## Tool 4: LinkedIn Sales Navigator → Open Source Stack

### Original Tool
- **LinkedIn Sales Navigator** ($79.99/mo)
- Advanced lead search
- Lead tracking
- InMail

### Open Source Alternatives

#### Option A: LinkedIn + n8n (RECOMMENDED)

**We already have n8n running.**

```n8n workflow:
LinkedIn Search (manual) → Extract profile URLs
  → n8n HTTP Request to LinkedIn
  → Parse response
  → Store in CRM
```

**Better approach — browser-use:**
```python
# Use browser-use to:
# 1. Go to LinkedIn search
# 2. Apply filters (Shopify, e-commerce, founder)
# 3. Extract profile URLs and data
# 4. Store in CSV
```

#### Option B: LinkedIn Leads Scraper (GitHub)

**linkedin-leads-discover** (GitHub):
- Automated profile discovery
- LinkedIn Sales Navigator data extraction
- Export leads with company info
- Uses LinkdAPI

**jbinfo/linkedin_sales_navigator_scraper:**
- Specific to Sales Navigator
- Extract: names, titles, companies, connections
- CSV export for CRM import

#### Option C: LinkedIn Official API (Free)

**LinkedIn API (free for developers):**
- Profile API (basic)
- Organization API
- Marketing Developer Platform (requires application)

**For posting and organic content:** LinkedIn API is free and sufficient.

**For outreach and Sales Navigator features:** Need scraping or paid tool.

**Verdict:** ✅ **PARTIAL REPLACEMENT**
- Organic content: LinkedIn API (free) ✅
- Lead search: browser-use + n8n (free) ✅
- Sales Navigator advanced features: Some features lost
- Cost: $0 (vs $79.99/mo)

---

## Tool 5: Notion (Already Free)

### Original Tool
- **Notion** (free tier)
- Simple CRM
- Lead tracking

### Already Free

Notion free tier is fine for solo use. But if we want fully self-hosted:

**Open Source Alternative: Twenty CRM**

**Website:** https://twenty.com/
**GitHub:** https://github.com/twentyhq/twenty
**Cost:** Free (self-hosted)
**Stack:** React + TypeScript + PostgreSQL

**What it is:**
- Modern Salesforce/HubSpot alternative
- Self-hosted CRM
- Deals, contacts, companies, tasks
- Email integration
- AI features coming

**Alternatives:**
1. **Krayin** — Laravel-based CRM, self-hosted
2. **Odoo** — Full ERP + CRM suite (heavier)
3. **EspoCRM** — Lightweight, PHP-based

**Verdict:** Notion free tier is fine for now. If we outgrow it → Twenty (self-hosted, free).

---

## Complete Open Source Stack (Zero Cost)

| Original Tool | Cost/mo | Open Source Alternative | Cost/mo |
|--------------|---------|------------------------|---------|
| Buffer | $15 | **Postiz** (self-hosted) | $0 |
| Expandi | $99 | **n8n + browser-use** (we have n8n) | $0 |
| Apollo.io | $49 | **Hunter.io free** + LinkedIn leads scraper | $0 |
| Sales Nav | $80 | **browser-use + n8n** (we have n8n) | $0 |
| Notion | $0 | Notion free tier (or Twenty if needed) | $0 |
| Gemini API | $0 | Gemini API (we have key) | $0 |

**Total Monthly Cost: $0**

---

## Revised Architecture

```
┌─────────────────────────────────────────────────────────────┐
│                  CONTENT PIPELINE ($0)                       │
│                                                              │
│  Gemini API (we have) → AI content generation               │
│       ↓                                                      │
│  Postiz (self-hosted Docker) → Schedule to LinkedIn          │
│       ↓                                                      │
│  Postiz Agent CLI → AI agents can post programmatically     │
│                                                              │
│  Cost: $0 (Postiz is free + open source)                   │
└─────────────────────────────────────────────────────────────┘
                              ↓
┌─────────────────────────────────────────────────────────────┐
│                  OUTREACH PIPELINE ($0)                     │
│                                                              │
│  browser-use (local Playwright) → LinkedIn search            │
│       ↓                                                      │
│  n8n (we have running) → Orchestrate workflow              │
│       ↓                                                      │
│  LinkedIn leads scraper (GitHub) → Get prospect data         │
│       ↓                                                      │
│  Custom email finder (GitHub/python) → Find emails           │
│       ↓                                                      │
│  Twenty CRM (self-hosted) → Store and track leads           │
│                                                              │
│  Cost: $0 (all open source or we have it)                   │
└─────────────────────────────────────────────────────────────┘
```

---

## Deployment Plan

### Week 1-2: Postiz Setup (Content Scheduling)
1. Deploy Postiz via Docker on local/VPS
   ```bash
   docker run -p 4200:3000 gitroom/postiz
   ```
2. Connect LinkedIn via OAuth
3. Connect Gemini API for AI content
4. Use `social-content` gem skill for content strategy
5. Test: AI generates → Postiz schedules → LinkedIn posts

### Week 3-4: Outreach Stack Setup
1. Deploy Twenty CRM (for lead tracking)
   ```bash
   docker run -p 3000:3000 twentyapp/twenty
   ```
2. Set up n8n workflow for LinkedIn lead collection
3. Test browser-use with LinkedIn search
4. Connect Hunter.io free tier for email finding
5. Test full pipeline: Prospect → Scrape → Email → CRM

### Month 2+: Iterate and Optimize
- Refine browser-use automation for LinkedIn outreach
- Build custom email finder if Hunter.io limits hit
- Add more platforms to Postiz as needed

---

## Skills Available in Gem Vault

| Need | Gem Skill | Available |
|------|-----------|-----------|
| Content strategy | `content-marketer`, `social-content` | ✅ |
| n8n workflows | `n8n-mcp-tools-expert` | ✅ |
| Browser automation | `browser-automation` | ✅ |
| LinkedIn via MCP | `linkedin-automation` (Composio) | ⚠️ Needs Composio |
| Email finding | None (use Hunter.io API) | ❌ |
| CRM setup | None (use Twenty directly) | ❌ |

---

## Risk Assessment

| Component | Risk | Mitigation |
|-----------|------|------------|
| LinkedIn ToS violation | Medium | Use official API for posting, browser-use for scraping at low volume |
| Postiz maintenance | Low | Docker container, updates via docker pull |
| Twenty CRM | Low | PostgreSQL-backed, stable |
| Email finding accuracy | Medium | Hunter.io free tier is accurate; verify before sending |
| System downtime | Low | Local Docker + VPS backup |

---

## Next Steps

1. **Deploy Postiz** (this week) — content scheduling free
2. **Test Gemini → Postiz pipeline** — AI content to scheduled posts
3. **Deploy Twenty CRM** — lead tracking self-hosted
4. **Set up n8n + browser-use** — outreach automation
5. **Connect Hunter.io API** — email finding free tier

Full implementation plan: See original `plan/implementation-plan.md` but substitute open-source tools above.

---

## Summary

**We can build this entire system for $0/month using open-source tools.**

Boss's philosophy aligns perfectly: "As automation engineers, we should be building our own systems on open-source platforms."

The key shift:
- **Buffer → Postiz** (self-hosted, free, better features)
- **Expandi → n8n + browser-use** (we already have n8n)
- **Apollo/Sales Nav → LinkedIn scrapers + Hunter.io free tier**
- **Notion → Notion free (or Twenty when needed)**

No subscription fees. Full control. Built by us.
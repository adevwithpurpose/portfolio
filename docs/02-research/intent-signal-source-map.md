# Intent-Signal Source Map

Maturity: draft
Last updated: 2026-04-28

Purpose: Define exact sources and searches for Safeer's no-cold-email acquisition system. Use this for manual validation before building collectors.

## Source automation policy

- Manual: Safeer/Hermes can review manually and log opportunities.
- API-later: automate only through official API/RSS/public allowed access after validation.
- Do-not-automate: high account/platform risk; keep manual.

## P1: Upwork

Policy: Manual first. API/automation not planned unless official access is confirmed.

Search terms:

- workflow automation
- business automation
- AI agent
- AI chatbot for business
- internal tool
- dashboard
- CRM automation
- operations automation
- web app automation
- landing page automation
- Zapier expert
- Make.com expert
- n8n expert
- Airtable automation
- Notion automation

Filters:

- $1K+ preferred
- payment verified
- clear business problem
- founder/operator explains the workflow
- avoid vague “build me AI SaaS” posts
- avoid cheapest/urgent chaos unless scope is clear

High-intent phrases:

- hiring immediately
- need someone ASAP
- long-term opportunity
- budget is
- looking to start this week
- previous contractor did not work out
- need expert

## P1: X native search

Policy: Manual first. API-later only through official X API.

Saved search strings:

- "need someone to build" "automation"
- "looking for" "automation" "developer"
- "need a freelancer" "automation"
- "internal tool" "need someone"
- "dashboard" "need someone to build"
- "AI agent" "for my business"
- "how do I automate" "CRM"
- "manual process" "killing me"
- "spreadsheet hell"
- "Zapier" "broke" "need help"
- "n8n" "need help"
- "Airtable" "automation" "need"

Useful operators to test manually:

- lang:en
- min_faves:2
- min_replies:1
- -job if job spam gets noisy
- since:YYYY-MM-DD

Daily workflow:

1. Open saved searches.
2. Sort latest/top depending on signal quality.
3. Save only posts where the poster likely owns/controls the business problem.
4. Draft public reply first if appropriate; DM only when natural and approved.

## P1: Reddit manual checks

Policy: Manual first. API-later only after official API setup and per-subreddit rule review.

Subreddits to evaluate:

- r/forhire
- r/freelance_forhire
- r/smallbusiness
- r/Entrepreneur
- r/SaaS
- r/startups
- r/webdev
- r/nocode
- r/Automation
- r/Zapier
- r/n8n
- r/Notion
- r/Airtable
- r/agency

Search strings inside Reddit:

- "need help automating"
- "looking for someone to build"
- "manual workflow"
- "internal tool"
- "dashboard"
- "CRM automation"
- "client onboarding"
- "lead follow up"
- "Zapier broke"
- "Make.com help"
- "n8n workflow"
- "Airtable automation"

Rule checklist before responding:

- Are hiring/service replies allowed?
- Are DMs allowed or discouraged?
- Are promotional links allowed?
- Is there a required flair like [Hiring] or [For Hire]?
- Is there a minimum karma/account-age rule?
- Are rates/budget required?

Default response style:

- helpful public comment first
- no pitch wall
- offer 3-point teardown only if allowed
- no mass-DMs

## P1: LinkedIn manual monitoring

Policy: Do-not-automate for scraping/public post collection. Manual only.

Targets to follow:

- founders of service businesses
- agency owners
- COOs / ops leads
- heads of growth
- B2B consultants
- SaaS founders
- no-code/AI consultants who attract operator comments

Manual searches / alerts:

- automation consultant
- AI agent developer
- internal tools
- workflow automation
- CRM automation
- operations automation
- dashboard developer
- AI implementation

Places to monitor:

- feed from curated target list
- comments under AI/automation posts
- LinkedIn job alerts
- relevant groups

Do not:

- scrape posts/profiles
- use auto-connect/auto-DM extensions
- bulk-comment
- mass-export contacts

## P2: Hacker News

Policy: API-later. HN Algolia can be used for public search.

Sources:

- Who is Hiring monthly threads
- Show HN launches with ops-heavy products
- Ask HN posts about tools/workflows

Search terms:

- automation
- internal tools
- workflow
- dashboard
- CRM
- Zapier
- Airtable
- AI agent
- contractor
- freelancer

Use for:

- technical founders
- startup teams
- productized systems ideas

## P2: Indie Hackers / founder communities

Policy: Manual first.

Signals:

- “looking to hire”
- “need help with”
- “does anyone know a tool for”
- “manual process”
- “I built a workaround”
- “stuck with operations”

Response style:

- value-first comment
- share a small architecture idea
- offer teardown if they ask for help

## P3: Niche Slack/Discord communities

Policy: Manual/community-native only.

Potential communities:

- MLOps Community
- Reactiflux
- Design Buddies
- MicroConf community
- Demand Curve community
- tool-specific communities if Safeer joins them naturally

Rules:

- do not join only to pitch
- answer questions first
- use warm intros if possible
- log only public/permission-safe opportunities

## Daily manual validation routine

Total: 30-45 minutes/day for 7 days.

1. Upwork: 10 minutes
2. X saved searches: 10 minutes
3. Reddit: 10 minutes
4. LinkedIn alerts/feed: 10 minutes
5. Score/log opportunities: 5 minutes

Target:

- 5-10 captured signals/day
- only P1/P2 get response drafts
- Safeer approves before sending

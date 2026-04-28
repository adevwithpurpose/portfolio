# Intent-Signal Client Acquisition Research

Maturity: draft
Last updated: 2026-04-28
Owner: Safeer + Hermes

## Purpose

Research how Safeer can find clients who are already showing buying intent instead of relying on cold email. The goal is to build a personal acquisition intelligence system first, then later package it as a sellable system for other service businesses.

## User requirement

Safeer does not want a cold email-first system. Preferred direction:

- find people already looking for help
- monitor public signals on Reddit, LinkedIn, X, marketplaces, job boards, and communities
- score and organize opportunities
- draft useful, specific responses
- keep human approval before any message is sent
- use the system for Safeer's own acquisition first, then turn it into a client-facing productized offer

## Key finding

The safest and strongest version is not an automated spam machine. It is an intent-signal acquisition desk:

1. Monitor public places where buyers already ask for help.
2. Capture posts/jobs/comments that show business pain.
3. Score for fit, urgency, budget, and trust.
4. Produce a short opportunity brief.
5. Draft a helpful response or teardown.
6. Require Safeer approval before any public reply, DM, proposal, or application.
7. Track outcomes and improve the scoring rubric weekly.

## Platform research summary

### LinkedIn

Best use:

- high-ticket B2B leads
- founders, COOs, ops leads, heads of growth
- public posts asking for recommendations
- job posts that reveal internal workflow gaps
- comments under AI/automation posts where operators complain about processes

Strong signals:

- “looking for recommendations on...”
- “anyone know a good...”
- “need someone to build...”
- “hiring a freelancer/developer for...”
- “our process is broken”
- “spreadsheet hell”
- “tired of doing this manually”
- “need an internal dashboard/tool”
- “how can I automate...”

Safety / constraints:

- LinkedIn is high-risk for scraping.
- LinkedIn User Agreement prohibits using software, scripts, robots, browser plugins, or other technology to scrape/copy services, profiles, or data.
- It also prohibits bots or unauthorized automated methods to access services, add/download contacts, send messages, comment, like, share, or drive inauthentic engagement.
- LinkedIn self-serve APIs do not provide broad public member-post search.

Safe workflow:

- manually curate feed by following 50-100 target accounts
- join relevant groups
- save native searches / hashtags
- monitor LinkedIn job alerts for automation/internal tool terms
- log opportunities manually or with copy-paste, not scraping
- draft replies with AI, but Safeer sends manually

Sources:

- LinkedIn User Agreement: https://www.linkedin.com/legal/user-agreement
- LinkedIn API Terms: https://www.linkedin.com/legal/l/api-terms-of-use
- LinkedIn API rate limits: https://learn.microsoft.com/en-us/linkedin/shared/api-guide/concepts/rate-limits

### X / Twitter

Best use:

- real-time public intent
- indie hackers, startup founders, creators, technical operators
- short complaint posts and “who can build this?” posts
- replies under AI/tooling/build-in-public accounts

Strong signals:

- “looking for a dev to build...”
- “can anyone recommend an automation tool...”
- “need a freelancer to automate...”
- “hiring: AI agent builder”
- “DM me if you can build...”
- “I spend 3 hours every Monday doing...”
- “this manual process is killing me”
- “need someone to build a dashboard”

Safety / constraints:

- X prohibits scraping without express written permission.
- Use the official API if automating search.
- Avoid unauthorised scrapers, Nitter mirrors, Puppeteer login automation, or bulk actions.
- X API Basic can support recent search; free tier is too limited for serious search.

Safe workflow:

- use native X search/bookmarked searches manually first
- create private lists of target founders/operators
- check saved searches 1-2x/day
- optional later: official X API recent search storing only IDs and links
- AI drafts responses, Safeer approves/sends manually

Sources:

- X Terms of Service: https://x.com/en/tos
- X Developer Policy: https://docs.x.com/developer-terms/policy
- X API rate limits: https://docs.x.com/x-api/fundamentals/rate-limits

### Reddit

Best use:

- explicit problem posts
- hiring/project subreddits
- founder/small-business communities where people describe workflow pain
- SaaS/automation/tool communities where users ask “how do I connect X to Y?”

Research note:

- Reddit blocks unauthenticated automated access aggressively from this server/browser.
- Live subreddit JSON/search attempts returned HTTP 403 Blocked.
- This reinforces using manual review or compliant API access rather than scraping.

Subreddits to manually evaluate first:

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

Strong signals:

- “[Hiring]”
- “[PAID]”
- “budget is...”
- “looking for someone to build...”
- “need help automating...”
- “manual process”
- “spreadsheet”
- “dashboard”
- “CRM”
- “intake form”
- “follow up”
- “Zapier/Make/n8n broke”
- “I need an internal tool”

Safety / constraints:

- Check each subreddit’s rules before posting or replying.
- Many subreddits ban self-promotion, require specific post formats, or restrict DMs.
- Do not mass-DM users from Reddit threads.
- Prefer public helpful replies where allowed, then let the prospect invite a DM.
- Keep a per-subreddit rules file before automating any monitoring or posting.

Sources:

- Reddit User Agreement: https://www.redditinc.com/policies/user-agreement
- Reddit Developer Terms: https://support.reddithelp.com/hc/en-us/articles/14945211791892-Reddit-s-Developer-Terms
- Reddit API docs: https://www.reddit.com/dev/api/

### Marketplaces and job boards

Best use:

- direct project demand
- existing budget
- lower ambiguity than social posts
- useful for building first proof and proposal reps

Sources to check:

- Upwork: https://www.upwork.com/jobs/
- Contra: https://contra.com/
- Arc: https://arc.dev/
- Wellfound: https://wellfound.com/jobs
- Hacker News Who is Hiring: https://news.ycombinator.com/submitted?id=whoishiring
- Indie Hackers: https://www.indiehackers.com/
- We Work Remotely: https://weworkremotely.com/
- Remotive: https://remotive.com/
- Working Nomads: https://www.workingnomads.com/

Strong signals:

- “hiring immediately”
- “urgent”
- “expert needed”
- “long-term opportunity”
- “verified payment method”
- “budget is $X-$Y”
- “looking to start this week”
- “previous contractor did not work out”
- “founder/CTO hiring directly”
- “contract”
- “freelance”

Low-quality signals:

- “just exploring options”
- “what is your rate?” with no scope
- “cheapest option”
- “unpaid trial”
- “equity only” unless strategically valuable
- vague “build me an AI SaaS” with no workflow/problem

## Qualification rubric

Score each opportunity 0-100.

### Fit: 0-25

- 25: exact match for AI agents, automation systems, internal tools, workflow cleanup, web systems
- 15: adjacent web/dev/ops problem Safeer can solve
- 5: general dev work with weak systems angle
- 0: unrelated

### Intent: 0-25

- 25: explicitly hiring / budget / wants help now
- 18: asking for recommendations or builders
- 10: complaining about workflow pain but not asking for help
- 5: curiosity / general discussion
- 0: no buying signal

### Budget / commercial value: 0-20

- 20: budget stated $1k+ or company clearly funded/revenue-generating
- 14: high-ticket business but no budget stated
- 8: small business/creator with plausible budget
- 3: low-budget signals
- 0: unpaid / barter / equity-only

### Urgency: 0-15

- 15: urgent, this week, broken process, active hiring
- 10: near-term project
- 5: general interest
- 0: no urgency

### Trust / reachability: 0-15

- 15: real person, company visible, direct contact path, good post history
- 10: credible account but limited detail
- 5: anonymous but plausible
- 0: suspicious/spam

Priority bands:

- 80-100: P1, act same day
- 60-79: P2, review and possibly respond
- 40-59: P3, save for nurturing/content ideas
- below 40: ignore

## Recommended first wedge for Safeer

Start with a human-in-the-loop research desk, not full automation.

Reason:

- platform scraping risk is high for LinkedIn/X/Reddit
- Safeer needs proof and message-market fit before scaling
- manual review improves the scoring rubric
- the system still becomes sellable later as “lead intelligence + response workflow” for other service businesses

## Sellable client-facing version later

Potential offer name:

Intent-Signal Acquisition OS

Client promise:

“We monitor public buying signals in your market, score opportunities, prepare response briefs, and keep your team focused on people already showing need.”

Best client types:

- B2B agencies
- consultants
- recruiters
- software/dev shops
- high-ticket service businesses
- niche SaaS teams
- founders who already sell via social/community channels

Keep the public pitch broad and premium:

- not “cold email automation”
- not “scraper bot”
- not “AI spam machine”
- yes: “public buying-signal intelligence + human-approved response workflow”

## Research gaps

Before build automation beyond manual/copy-paste:

- verify Reddit API terms and API access options with an authenticated developer app
- verify current X API pricing/access from Safeer’s account if he wants automated search
- define which LinkedIn workflows are manual-only to protect Safeer’s account
- choose CRM storage: Airtable, Notion, Google Sheet, SQLite, or local Next.js dashboard
- define final channel priority after one week of manual signal sampling

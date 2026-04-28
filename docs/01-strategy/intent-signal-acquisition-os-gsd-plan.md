# Intent-Signal Acquisition OS GSD Plan

> For Hermes: use this as the source-of-truth plan before building. Build task-by-task with human approval before any action that posts, sends, DMs, applies, or automates platform access.

Goal: Build Safeer's own client acquisition system around public buying-intent signals, then package the proven workflow as a sellable acquisition system for other service businesses.

Architecture: Start as a human-in-the-loop research desk using manual-safe monitoring and structured lead scoring. Store opportunities in a simple database/CRM, generate opportunity briefs and response drafts, and require Safeer approval before outreach. Only automate collection through official APIs or low-risk sources after the manual workflow proves which channels convert.

Tech Stack: Phase 1 can run on Google Sheets/Notion/Airtable plus Hermes-generated briefs. Phase 2 should use a small local app or portfolio repo tool with SQLite/Postgres, scheduled collectors, LLM scoring, and a dashboard. Phase 3 can become a client-facing system with per-client source configs, CRM integration, and reporting.

---

## GSD workflow

### 1. Plan

Define the acquisition system around Safeer's offer, not around channels.

Core offer to sell with the system:

- custom AI agents
- automation systems
- web systems / platforms
- internal tools
- workflow cleanup and operational visibility

Core prospect pain to detect:

- manual workflows
- slow lead intake or follow-up
- broken handoffs
- scattered tools
- spreadsheet/CRM chaos
- missing dashboards/reporting
- need for an internal tool or AI assistant
- public request for a builder/freelancer/automation person

Definition of done for MVP:

- Safeer can review 10-25 scored opportunities per week.
- Each opportunity includes source, link, context, signal type, score, fit reason, risk notes, and suggested next action.
- No message is sent automatically.
- Every response draft is specific to the visible signal.
- Outcomes are tracked: ignored, saved, replied, DM sent, call booked, won/lost.

### 2. Research

Research has been saved in:

- docs/02-research/intent-signal-acquisition-research-2026-04-28.md

High-level result:

- LinkedIn: high quality but manual-only because scraping/API public search is risky/limited.
- X: good for real-time public signals; official API can be used later if paying for access.
- Reddit: useful for explicit problem/hiring posts, but subreddit rules and API limits matter; manual first.
- Marketplaces/job boards: highest direct intent because people already post jobs/projects.

### 3. Adapt planning

Use a tiered source strategy.

P1 sources for first 14 days:

1. Upwork manual searches for automation/internal tool/AI agent/dashboard/web app jobs.
2. X native saved searches for public “need builder/automation/internal tool” signals.
3. Reddit manual checks in a small approved subreddit list.
4. LinkedIn manual job alerts + feed/comment monitoring.
5. Hacker News monthly Who is Hiring and relevant startup/operator posts.

Defer for later:

- automated LinkedIn scraping: do not do
- automated Reddit scraping: only with compliant API setup and subreddit rules review
- X API automation: only if the manual X search produces enough signal to justify cost
- fully automated sending: do not do; keep human approval

### 4. Build

Build in four phases.

## Phase 0 — Manual validation desk

Duration: 3-7 days

Objective: Prove which signal phrases and channels actually produce useful opportunities before coding.

Tools:

- spreadsheet, Notion, Airtable, or markdown table
- saved search URLs
- Hermes for scoring and response drafts

Fields:

- id
- captured_at
- source
- source_url
- author/company
- title/post_excerpt
- signal_type
- offer_match
- score_fit
- score_intent
- score_budget
- score_urgency
- score_trust
- total_score
- risk_notes
- suggested_next_action
- response_draft
- status
- outcome

Success criteria:

- at least 50 captured signals
- at least 10 P1/P2 opportunities
- at least 3 approved responses/applications sent manually
- identify top 2 channels by opportunity quality

## Phase 1 — Local acquisition CRM

Duration: 1-2 days

Objective: Replace messy notes with a clean local opportunity database and scoring CLI.

Suggested implementation:

- Create a small Python package under the portfolio repo or a new local folder.
- Use SQLite first.
- Import opportunities from CSV/JSON/manual paste.
- Run a deterministic scoring rubric.
- Generate markdown opportunity briefs.

Core modules:

- sources: manual imports first
- scoring: rubric-based scores
- brief_generator: converts lead context into opportunity brief
- response_drafter: drafts comment/DM/proposal with human approval flag
- export: markdown/CSV for review

Do not integrate auto-sending.

## Phase 2 — Safe collectors

Duration: 2-5 days after manual validation

Objective: Add source collection only where the source is safe and worth automating.

Collector rules:

- LinkedIn: no scraping; manual import only.
- X: official API only if enabled and paid; otherwise manual search imports.
- Reddit: official API only with a developer app and per-subreddit rule checks; otherwise manual import.
- HN: Algolia API is low-friction and safe for public thread/search monitoring.
- Job boards: prefer RSS/API/public pages where allowed; otherwise manual.

Collector output:

- raw source ID/link
- text snippet
- source metadata
- fetched_at
- no private data
- no bypassing login walls/CAPTCHAs

## Phase 3 — Productized client version

Duration: after Safeer gets proof

Objective: Package the system as a sellable service/productized workflow.

Offer name options:

- Intent-Signal Acquisition OS
- Buying-Signal Research Desk
- Client Acquisition Intelligence System
- Public Demand Monitoring System

Client deliverables:

- source map for their niche
- weekly lead intelligence board
- scored opportunities
- response briefs
- CRM pipeline
- reporting dashboard
- optional human-approved outreach workflow

Pricing hypothesis to test later:

- Setup: $500-$1,500 for source map + first dashboard
- Monthly: $750-$2,500 for monitoring + briefs + reporting
- Higher tier: $3,000-$5,000+ if paired with landing pages, CRM, follow-up, and sales ops automation

Do not publish pricing until Safeer has proof or niche-specific validation.

---

## Signal taxonomy

### Signal types

- explicit hiring
- recommendation request
- pain complaint
- workflow question
- tool failure/friction
- job post reveals internal pain
- competitor/tool migration need
- growth bottleneck
- content/comment opportunity

### Best-fit examples

- “Need someone to automate client onboarding.”
- “Looking for an internal dashboard for our ops team.”
- “Our CRM and spreadsheets are a mess.”
- “Any recommendations for an AI agent to qualify leads?”
- “Hiring a freelancer to build a web app for our workflow.”
- “We are drowning in manual reporting.”

### Bad-fit examples

- “I want a viral AI SaaS idea.”
- “Can someone build this for equity only?”
- “Need the cheapest bot.”
- “Just curious what tools you use.”
- “Automate spam DMs.”

---

## Response rules

### Always do

- respond to the exact visible problem
- be useful before pitching
- offer a small teardown/first version
- keep tone calm and specific
- mention relevant systems outcome, not tool buzzwords
- save draft for approval before sending

### Never do

- fake personalization
- pretend prior client proof that does not exist
- mass-DM people
- bypass platform rules
- scrape private/login-gated data
- auto-send replies
- overclaim ROI

### Response formula

```text
Noticed [specific pain/request].

The first useful version is probably [small concrete system], not a giant rebuild.

I build AI/automation/web systems around this kind of workflow: intake, follow-up, reporting, handoffs, and internal visibility.

If useful, I can send a quick 3-point teardown of how I would simplify this.
```

---

# Implementation Plan

## Task 1: Create manual opportunity tracker

Objective: Create the first tracker structure so Safeer can capture 50 signals before coding collectors.

Files:

- Create: docs/06-progress/intent-signal-opportunity-tracker-template.csv
- Create: docs/06-progress/experiments/2026-04-28-intent-signal-acquisition-os.md

Steps:

1. Create CSV headers for the fields listed in Phase 0.
2. Create experiment file with objective, hypothesis, allowed actions, forbidden actions, batch size, and success metric.
3. Verify the files exist and can be opened.

## Task 2: Create saved-search source map

Objective: Define exact searches Safeer should manually check daily.

Files:

- Create: docs/02-research/intent-signal-source-map.md

Steps:

1. Add Upwork search terms.
2. Add X saved search strings.
3. Add Reddit subreddit list and rule-check requirement.
4. Add LinkedIn manual monitoring list.
5. Add HN/Indie Hackers/community checks.
6. Mark each source as manual, API-later, or do-not-automate.

## Task 3: Run 7-day manual validation

Objective: Capture real opportunities before building automation.

Files:

- Update: docs/06-progress/intent-signal-opportunity-tracker-template.csv or copied working tracker
- Update: docs/06-progress/experiments/2026-04-28-intent-signal-acquisition-os.md

Steps:

1. Check P1 sources daily.
2. Add 5-10 opportunities/day.
3. Score each opportunity.
4. Draft responses for P1/P2 only.
5. Safeer approves before sending.
6. Log outcome.

## Task 4: Build local scoring CLI

Objective: Turn the tracker into a repeatable system.

Files:

- Create: tools/acquisition_os/README.md
- Create: tools/acquisition_os/acquisition_os.py
- Create: tools/acquisition_os/schema.sql
- Create: tools/acquisition_os/tests/test_scoring.py

Steps:

1. Implement CSV import.
2. Implement scoring rubric.
3. Implement markdown brief export.
4. Add tests for scoring.
5. Verify with sample CSV.

## Task 5: Add low-risk collectors only after validation

Objective: Add collection automation without account risk.

Files:

- Modify: tools/acquisition_os/acquisition_os.py
- Create: tools/acquisition_os/collectors/hn.py
- Optional later: tools/acquisition_os/collectors/x_api.py
- Optional later: tools/acquisition_os/collectors/reddit_api.py

Steps:

1. Start with HN Algolia/public sources.
2. Add X only through official API if credentials/access exist.
3. Add Reddit only through official API and after subreddit rules review.
4. Keep LinkedIn manual-only.

## Task 6: Package proof and offer

Objective: Convert Safeer's own usage into a portfolio proof asset and sellable offer.

Files:

- Create: docs/05-linkedin-presence/assets/intent-signal-acquisition-os-proof-asset.md
- Create: docs/03-offers/intent-signal-acquisition-os-offer.md

Steps:

1. Summarize before/after workflow.
2. Show anonymized tracker/dashboard screenshots if safe.
3. Document source map and process.
4. Publish as a systems-building proof asset, not a scraping/cold-email claim.

---

## Current next action

Do Task 1 and Task 2 now. Then run a 7-day manual validation before building API collectors.

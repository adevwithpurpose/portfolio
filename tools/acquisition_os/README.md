# Acquisition OS Tooling

Local automated tooling for Safeer's Intent-Signal Acquisition OS.

Status: MVP pipeline running. Collects from safe public sources, scores, and exports briefs.

What it does:

- Collects public intent signals from safe sources (HN Algolia, RSS feeds)
- Optional Reddit API collector (requires credentials)
- Stores in SQLite with deduplication
- Scores every opportunity with deterministic rubric
- Exports P1/P2/P3 markdown briefs
- Does NOT send DMs, comments, proposals, or emails
- Does NOT scrape LinkedIn or bypass login walls

## Run tests

```bash
PYTHONPATH=tools/acquisition_os python3 -m unittest tools/acquisition_os/tests/test_scoring.py -v
```

## Run pipeline manually

```bash
PYTHONPATH=tools/acquisition_os python3 tools/acquisition_os/pipeline.py \
  --db /tmp/acquisition_os.db \
  --briefs-dir /tmp/acquisition_briefs
```

## Run specific collectors only

```bash
PYTHONPATH=tools/acquisition_os python3 tools/acquisition_os/pipeline.py \
  --db /tmp/acquisition_os.db \
  --collectors hn rss
```

## Reddit collector

Requires a Reddit app:

```bash
export REDDIT_CLIENT_ID=your_app_id
export REDDIT_CLIENT_SECRET=your_app_secret
PYTHONPATH=tools/acquisition_os python3 tools/acquisition_os/pipeline.py --collectors reddit
```

## Score a CSV file

```bash
PYTHONPATH=tools/acquisition_os python3 tools/acquisition_os/acquisition_os.py \
  docs/06-progress/intent-signal-opportunity-tracker-template.csv \
  docs/06-progress/intent-signal-opportunity-tracker-scored.csv
```

## Architecture

```
pipeline.py          → orchestrator
db.py                → SQLite persistence
acquisition_os.py    → scoring engine
collectors/
  hn.py              → Hacker News Algolia (safe, no auth)
  rss.py             → RSS job boards/communities
  reddit.py          → Reddit API (needs credentials)
```

## Daily cron setup

See project cronjob or run manually until automated scheduling is configured.

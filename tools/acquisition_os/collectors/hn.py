#!/usr/bin/env python3
"""Hacker News Algolia collector — safe, public, no auth required."""

from __future__ import annotations

import urllib.request
import urllib.parse
import json
from typing import Iterable

from acquisition_os import Opportunity


HN_ALGOLIA_URL = "https://hn.algolia.com/api/v1/search_by_date"

# Safe, high-signal HN queries
QUERIES = [
    "automation",
    "internal tool",
    "dashboard",
    "CRM automation",
    "workflow automation",
    "Zapier",
    "Airtable",
    "n8n",
    "Make.com",
    "need a developer",
    "looking for freelancer",
    "client onboarding",
    "lead follow up",
    "AI agent business",
    "operations automation",
]


def fetch_hn_opportunities(
    queries: list[str] | None = None,
    hits_per_query: int = 20,
    hours_lookback: int = 48,
) -> Iterable[Opportunity]:
    """Fetch recent HN posts matching intent keywords."""
    queries = queries or QUERIES
    seen = set()
    for q in queries:
        params = {
            "query": q,
            "tags": "story",
            "numericFilters": f"created_at_i>{hours_lookback * 3600}",
            "hitsPerPage": hits_per_query,
        }
        url = f"{HN_ALGOLIA_URL}?{urllib.parse.urlencode(params)}"
        req = urllib.request.Request(url, headers={"Accept": "application/json"})
        with urllib.request.urlopen(req, timeout=30) as resp:
            data = json.load(resp)
        for hit in data.get("hits", []):
            object_id = hit.get("objectID")
            if object_id in seen:
                continue
            seen.add(object_id)
            title = hit.get("title", "")
            author = hit.get("author", "")
            story_url = hit.get("url", "")
            hn_url = f"https://news.ycombinator.com/item?id={object_id}"
            # Use HN discussion URL if external story URL is missing
            link = story_url or hn_url
            yield Opportunity(
                source="hn-algolia",
                title_or_excerpt=title,
                signal_type="hn_post",
                offer_match="automation/web/ops",
                author_or_company=author,
                source_url=hn_url,
            )


if __name__ == "__main__":
    import sys
    for opp in fetch_hn_opportunities(hits_per_query=5):
        print(opp.source_url, opp.title_or_excerpt[:100])

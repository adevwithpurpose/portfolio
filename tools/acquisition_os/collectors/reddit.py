#!/usr/bin/env python3
"""Reddit official API collector skeleton.

Requires Reddit app credentials:
  - client_id
  - client_secret
  - user_agent (registered with Reddit)

Set via environment:
  REDDIT_CLIENT_ID
  REDDIT_CLIENT_SECRET

Do NOT use this without a valid Reddit developer app and subreddit rule review.
"""

from __future__ import annotations

import os
import urllib.request
import urllib.parse
import json
from typing import Iterable

from acquisition_os import Opportunity


SUBREDDITS = [
    "forhire",
    "freelance_forhire",
    "smallbusiness",
    "Entrepreneur",
    "SaaS",
    "startups",
    "nocode",
    "Automation",
    "webdev",
]

SEARCH_TERMS = [
    "need help automating",
    "looking for someone to build",
    "internal tool",
    "dashboard",
    "CRM automation",
    "workflow",
    "Zapier",
    "n8n",
    "Airtable",
    "client onboarding",
]


def _reddit_headers() -> dict[str, str]:
    client_id = os.getenv("REDDIT_CLIENT_ID", "")
    client_secret = os.getenv("REDDIT_CLIENT_SECRET", "")
    if not client_id or not client_secret:
        raise RuntimeError("Reddit API credentials missing. Set REDDIT_CLIENT_ID and REDDIT_CLIENT_SECRET.")
    # Reddit uses HTTP Basic Auth for app-only OAuth
    import base64
    creds = base64.b64encode(f"{client_id}:{client_secret}".encode()).decode()
    return {
        "Authorization": f"Basic {creds}",
        "User-Agent": "SafeerIntentBot/0.1 by u/saf08",
    }


def _get_access_token() -> str:
    headers = _reddit_headers()
    data = urllib.parse.urlencode({"grant_type": "client_credentials"}).encode()
    req = urllib.request.Request(
        "https://www.reddit.com/api/v1/access_token",
        data=data,
        headers=headers,
        method="POST",
    )
    with urllib.request.urlopen(req, timeout=30) as resp:
        result = json.load(resp)
    token = result.get("access_token")
    if not token:
        raise RuntimeError(f"Reddit auth failed: {result}")
    return token


def fetch_reddit_opportunities(
    subreddits: list[str] | None = None,
    search_terms: list[str] | None = None,
    limit_per_query: int = 25,
) -> Iterable[Opportunity]:
    """Fetch recent posts from configured subreddits via Reddit API.

    WARNING: Check each subreddit's rules before posting/replying.
    Do not automate replies or DMs.
    """
    subreddits = subreddits or SUBREDDITS
    search_terms = search_terms or SEARCH_TERMS
    token = _get_access_token()
    headers = {
        "Authorization": f"Bearer {token}",
        "User-Agent": "SafeerIntentBot/0.1 by u/saf08",
    }
    seen = set()
    for sub in subreddits:
        for term in search_terms:
            params = {
                "q": term,
                "restrict_sr": "1",
                "sort": "new",
                "t": "week",
                "limit": limit_per_query,
            }
            url = f"https://oauth.reddit.com/r/{sub}/search?{urllib.parse.urlencode(params)}"
            req = urllib.request.Request(url, headers=headers)
            try:
                with urllib.request.urlopen(req, timeout=30) as resp:
                    data = json.load(resp)
            except Exception as exc:
                print(f"Reddit fetch failed r/{sub} '{term}': {exc}", file=__import__("sys").stderr)
                continue
            for child in data.get("data", {}).get("children", []):
                post = child.get("data", {})
                permalink = post.get("permalink", "")
                full_url = f"https://reddit.com{permalink}"
                post_id = post.get("id", "")
                if post_id in seen:
                    continue
                seen.add(post_id)
                yield Opportunity(
                    source=f"reddit-r/{sub}",
                    title_or_excerpt=post.get("title", ""),
                    signal_type="reddit_post",
                    offer_match="automation/web/ops",
                    author_or_company=post.get("author", ""),
                    source_url=full_url,
                )


if __name__ == "__main__":
    import sys
    if not os.getenv("REDDIT_CLIENT_ID"):
        print("Set REDDIT_CLIENT_ID and REDDIT_CLIENT_SECRET to run Reddit collector.", file=sys.stderr)
        raise SystemExit(1)
    for opp in fetch_reddit_opportunities(limit_per_query=5):
        print(opp.source, opp.source_url, opp.title_or_excerpt[:100])

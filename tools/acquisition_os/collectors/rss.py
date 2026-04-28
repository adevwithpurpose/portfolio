#!/usr/bin/env python3
"""Generic RSS collector for job boards and communities."""

from __future__ import annotations

import urllib.request
import xml.etree.ElementTree as ET
from typing import Iterable

from acquisition_os import Opportunity


DEFAULT_FEEDS = {
    "weworkremotely": "https://weworkremotely.com/remote-jobs.rss",
    "hn-automation": "https://hnrss.org/newest?q=automation",
}


def fetch_rss_opportunities(
    feeds: dict[str, str] | None = None,
) -> Iterable[Opportunity]:
    feeds = feeds or DEFAULT_FEEDS
    for source_name, url in feeds.items():
        req = urllib.request.Request(url, headers={
            "Accept": "application/rss+xml,application/xml",
            "User-Agent": "SafeerIntentBot/0.1 (contact via safeer.dev)",
        })
        try:
            with urllib.request.urlopen(req, timeout=30) as resp:
                data = resp.read()
        except Exception as exc:
            # Log and continue — RSS feeds can be flaky
            print(f"RSS fetch failed for {source_name}: {exc}", file=__import__("sys").stderr)
            continue
        try:
            root = ET.fromstring(data)
        except ET.ParseError as exc:
            print(f"RSS parse failed for {source_name}: {exc}", file=__import__("sys").stderr)
            continue
        channel = root.find("channel") if root.tag == "rss" else root
        if channel is None:
            continue
        for item in channel.findall("item"):
            title = item.findtext("title", default="").strip()
            link = item.findtext("link", default="").strip()
            desc = item.findtext("description", default="").strip()
            excerpt = f"{title} | {desc[:240]}" if desc else title
            if not link:
                continue
            yield Opportunity(
                source=source_name,
                title_or_excerpt=excerpt,
                signal_type="rss_job_post",
                offer_match="automation/web/ops",
                author_or_company="",
                source_url=link,
            )


if __name__ == "__main__":
    import sys
    for opp in fetch_rss_opportunities():
        print(opp.source, opp.source_url, opp.title_or_excerpt[:100])

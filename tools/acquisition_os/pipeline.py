#!/usr/bin/env python3
"""Pipeline orchestrator: collect → store → score → export briefs."""

from __future__ import annotations

import argparse
import json
import uuid
from pathlib import Path
from typing import Iterable

from acquisition_os import Opportunity, score_opportunity
from db import AcquisitionDB


def run_pipeline(
    db_path: str,
    collectors: list[str] | None = None,
    score: bool = True,
    export_briefs: bool = True,
    briefs_dir: str = "./briefs",
) -> dict[str, int]:
    """Run selected collectors, ingest, score, and export."""
    db = AcquisitionDB(db_path)
    job_id = str(uuid.uuid4())[:8]
    stats: dict[str, int] = {}

    all_opps: list[Opportunity] = []

    if collectors is None or "hn" in collectors:
        from collectors.hn import fetch_hn_opportunities
        hn_opps = list(fetch_hn_opportunities(hits_per_query=20))
        all_opps.extend(hn_opps)
        stats["hn_found"] = len(hn_opps)

    if collectors is None or "rss" in collectors:
        from collectors.rss import fetch_rss_opportunities
        rss_opps = list(fetch_rss_opportunities())
        all_opps.extend(rss_opps)
        stats["rss_found"] = len(rss_opps)

    if collectors is None or "reddit" in collectors:
        try:
            from collectors.reddit import fetch_reddit_opportunities
            reddit_opps = list(fetch_reddit_opportunities(limit_per_query=10))
            all_opps.extend(reddit_opps)
            stats["reddit_found"] = len(reddit_opps)
        except RuntimeError as exc:
            print(f"Reddit collector skipped: {exc}")
            stats["reddit_found"] = 0

    # Ingest
    new_ids = db.insert_raw(all_opps, source_job_id=job_id)
    stats["new_opportunities"] = len(new_ids)

    # Score
    if score:
        unscored = db.fetch_unscored(limit=500)
        scored = [score_opportunity(opp) for opp in unscored]
        db.save_scores(scored)
        stats["scored"] = len(scored)

    # Export briefs
    if export_briefs:
        brief_path = Path(briefs_dir)
        brief_path.mkdir(parents=True, exist_ok=True)
        for band in ("P1", "P2", "P3"):
            rows = db.fetch_by_priority(band, limit=25)
            if not rows:
                continue
            out_file = brief_path / f"{job_id}-{band}.md"
            lines = [f"# Opportunity Brief — {band} (job {job_id})\n"]
            for r in rows:
                lines.append(f"## {r['title_or_excerpt'][:100]}")
                lines.append(f"- Source: {r['source']}")
                lines.append(f"- URL: {r['source_url']}")
                lines.append(f"- Score: {r['total_score']}")
                lines.append(f"- Fit: {r['score_fit']} | Intent: {r['score_intent']} | Budget: {r['score_budget']} | Urgency: {r['score_urgency']} | Trust: {r['score_trust']}")
                lines.append(f"- Suggested action: {r['suggested_next_action']}")
                lines.append("")
            out_file.write_text("\n".join(lines))
            stats[f"briefs_{band}"] = len(rows)

    return stats


def main() -> int:
    parser = argparse.ArgumentParser(description="Run acquisition pipeline.")
    parser.add_argument("--db", default="./acquisition_os.db")
    parser.add_argument("--collectors", nargs="+", choices=["hn", "rss", "reddit"])
    parser.add_argument("--no-score", action="store_true")
    parser.add_argument("--no-briefs", action="store_true")
    parser.add_argument("--briefs-dir", default="./briefs")
    args = parser.parse_args()

    stats = run_pipeline(
        db_path=args.db,
        collectors=args.collectors,
        score=not args.no_score,
        export_briefs=not args.no_briefs,
        briefs_dir=args.briefs_dir,
    )
    print(json.dumps(stats, indent=2))
    return 0


if __name__ == "__main__":
    raise SystemExit(main())

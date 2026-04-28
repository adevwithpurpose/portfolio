#!/usr/bin/env python3
"""Small scoring CLI for Safeer's Intent-Signal Acquisition OS.

This is intentionally local and human-in-the-loop. It scores imported public
opportunity rows; it does not scrape platforms or send outreach.
"""

from __future__ import annotations

import argparse
import csv
from dataclasses import dataclass, asdict
from pathlib import Path
from typing import Iterable


@dataclass(frozen=True)
class Opportunity:
    source: str
    title_or_excerpt: str
    signal_type: str
    offer_match: str
    author_or_company: str = ""
    source_url: str = ""


@dataclass(frozen=True)
class ScoredOpportunity:
    source: str
    title_or_excerpt: str
    signal_type: str
    offer_match: str
    author_or_company: str
    source_url: str
    score_fit: int
    score_intent: int
    score_budget: int
    score_urgency: int
    score_trust: int
    total_score: int
    suggested_next_action: str


def _contains_any(text: str, phrases: Iterable[str]) -> bool:
    lower = text.lower()
    return any(phrase in lower for phrase in phrases)


def _fit_score(offer_match: str, text: str) -> int:
    combined = f"{offer_match} {text}".lower()
    exact_terms = [
        "automation",
        "ai agent",
        "internal tool",
        "dashboard",
        "workflow",
        "crm",
        "web app",
        "reporting",
        "onboarding",
        "follow-up",
        "follow up",
    ]
    adjacent_terms = ["website", "landing page", "developer", "zapier", "make.com", "n8n", "airtable", "notion"]
    if _contains_any(combined, exact_terms):
        return 25
    if _contains_any(combined, adjacent_terms):
        return 15
    if "weak" in combined:
        return 5
    return 0


def _intent_score(signal_type: str, text: str) -> int:
    combined = f"{signal_type} {text}".lower()
    if _contains_any(combined, ["explicit_hiring", "hiring", "need someone", "looking for someone", "freelancer", "contractor"]):
        return 25
    if _contains_any(combined, ["recommend", "anyone know", "who can", "looking for"]):
        return 18
    if _contains_any(combined, ["manual", "broken", "spreadsheet hell", "killing me", "stuck"]):
        return 10
    if _contains_any(combined, ["curious", "what tools", "is there a tool"]):
        return 5
    return 0


def _budget_score(text: str) -> int:
    lower = text.lower()
    if _contains_any(lower, ["$1,000", "$1000", "$2,000", "$2000", "$5,000", "$5000", "budget is", "paid"]):
        return 20
    if _contains_any(lower, ["company", "funded", "revenue", "b2b", "agency", "saas"]):
        return 14
    if _contains_any(lower, ["small business", "creator", "coach", "consultant"]):
        return 8
    if _contains_any(lower, ["cheap", "low budget", "small budget"]):
        return 3
    if _contains_any(lower, ["unpaid", "equity only", "free"]):
        return 0
    return 8


def _urgency_score(text: str) -> int:
    if _contains_any(text, ["asap", "urgent", "immediately", "this week", "start this week", "broken"]):
        return 15
    if _contains_any(text, ["soon", "near-term", "next week", "hiring"]):
        return 10
    if _contains_any(text, ["curious", "exploring"]):
        return 0
    return 5


def _trust_score(opportunity: Opportunity) -> int:
    text = f"{opportunity.author_or_company} {opportunity.source_url} {opportunity.title_or_excerpt}".lower()
    if opportunity.author_or_company and opportunity.source_url and _contains_any(text, ["company", "founder", "co", "inc", "linkedin", "upwork"]):
        return 15
    if opportunity.author_or_company and opportunity.source_url:
        return 10
    if opportunity.source_url:
        return 5
    return 0


def priority_band(total_score: int) -> str:
    if total_score >= 80:
        return "P1"
    if total_score >= 60:
        return "P2"
    if total_score >= 40:
        return "P3"
    return "ignore"


def _next_action(total_score: int) -> str:
    band = priority_band(total_score)
    if band == "P1":
        return "draft_response"
    if band == "P2":
        return "review"
    if band == "P3":
        return "save_for_nurture"
    return "ignore"


def score_opportunity(opportunity: Opportunity) -> ScoredOpportunity:
    text = opportunity.title_or_excerpt
    fit = _fit_score(opportunity.offer_match, text)
    intent = _intent_score(opportunity.signal_type, text)
    budget = _budget_score(text)
    urgency = _urgency_score(text)
    trust = _trust_score(opportunity)
    total = min(100, fit + intent + budget + urgency + trust)
    return ScoredOpportunity(
        **asdict(opportunity),
        score_fit=fit,
        score_intent=intent,
        score_budget=budget,
        score_urgency=urgency,
        score_trust=trust,
        total_score=total,
        suggested_next_action=_next_action(total),
    )


def score_csv(input_path: Path, output_path: Path) -> None:
    with input_path.open(newline="", encoding="utf-8") as handle:
        rows = list(csv.DictReader(handle))

    scored_rows = []
    for row in rows:
        opportunity = Opportunity(
            source=row.get("source", ""),
            source_url=row.get("source_url", ""),
            author_or_company=row.get("author_or_company", ""),
            title_or_excerpt=row.get("title_or_excerpt", ""),
            signal_type=row.get("signal_type", ""),
            offer_match=row.get("offer_match", ""),
        )
        scored = score_opportunity(opportunity)
        merged = dict(row)
        merged.update({
            "score_fit": scored.score_fit,
            "score_intent": scored.score_intent,
            "score_budget": scored.score_budget,
            "score_urgency": scored.score_urgency,
            "score_trust": scored.score_trust,
            "total_score": scored.total_score,
            "suggested_next_action": scored.suggested_next_action,
        })
        scored_rows.append(merged)

    fieldnames = list(rows[0].keys()) if rows else []
    for field in ["score_fit", "score_intent", "score_budget", "score_urgency", "score_trust", "total_score", "suggested_next_action"]:
        if field not in fieldnames:
            fieldnames.append(field)

    with output_path.open("w", newline="", encoding="utf-8") as handle:
        writer = csv.DictWriter(handle, fieldnames=fieldnames)
        writer.writeheader()
        writer.writerows(scored_rows)


def main() -> int:
    parser = argparse.ArgumentParser(description="Score intent-signal opportunities from a CSV file.")
    parser.add_argument("input_csv", type=Path)
    parser.add_argument("output_csv", type=Path)
    args = parser.parse_args()
    score_csv(args.input_csv, args.output_csv)
    return 0


if __name__ == "__main__":
    raise SystemExit(main())

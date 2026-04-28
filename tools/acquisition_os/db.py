#!/usr/bin/env python3
"""SQLite persistence for intent-signal opportunities."""

from __future__ import annotations

import sqlite3
from dataclasses import asdict
from pathlib import Path
from typing import Iterable

from acquisition_os import Opportunity, ScoredOpportunity


class AcquisitionDB:
    def __init__(self, db_path: str | Path) -> None:
        self.db_path = Path(db_path)
        self._ensure_schema()

    def _conn(self) -> sqlite3.Connection:
        return sqlite3.connect(self.db_path, check_same_thread=False)

    def _ensure_schema(self) -> None:
        schema_path = Path(__file__).with_name("schema.sql")
        with self._conn() as conn:
            conn.executescript(schema_path.read_text())
            conn.commit()

    def insert_raw(
        self,
        opportunities: Iterable[Opportunity],
        source_job_id: str | None = None,
    ) -> list[str]:
        """Insert un-scored opportunities. Skip duplicates by source_url."""
        inserted: list[str] = []
        with self._conn() as conn:
            for opp in opportunities:
                cur = conn.execute(
                    "SELECT id FROM opportunities WHERE source_url = ?",
                    (opp.source_url,),
                )
                if cur.fetchone():
                    continue
                opp_id = _make_id(opp)
                conn.execute(
                    """
                    INSERT INTO opportunities
                    (id, captured_at, source, source_url, author_or_company,
                     title_or_excerpt, signal_type, offer_match, status)
                    VALUES (?, datetime('now'), ?, ?, ?, ?, ?, ?, 'captured')
                    """,
                    (
                        opp_id,
                        opp.source,
                        opp.source_url,
                        opp.author_or_company,
                        opp.title_or_excerpt,
                        opp.signal_type,
                        opp.offer_match,
                    ),
                )
                if source_job_id:
                    conn.execute(
                        "INSERT OR IGNORE INTO source_runs (job_id, source, ran_at) VALUES (?, ?, datetime('now'))",
                        (source_job_id, opp.source),
                    )
                inserted.append(opp_id)
            conn.commit()
        return inserted

    def fetch_unscored(self, limit: int = 100) -> list[Opportunity]:
        with self._conn() as conn:
            conn.row_factory = sqlite3.Row
            rows = conn.execute(
                """
                SELECT source, source_url, author_or_company, title_or_excerpt,
                       signal_type, offer_match
                FROM opportunities
                WHERE total_score = 0
                ORDER BY captured_at DESC
                LIMIT ?
                """,
                (limit,),
            ).fetchall()
        return [Opportunity(**dict(r)) for r in rows]

    def save_scores(self, scored: Iterable[ScoredOpportunity]) -> int:
        updated = 0
        with self._conn() as conn:
            for s in scored:
                conn.execute(
                    """
                    UPDATE opportunities
                    SET score_fit = ?, score_intent = ?, score_budget = ?,
                        score_urgency = ?, score_trust = ?, total_score = ?,
                        suggested_next_action = ?
                    WHERE source_url = ?
                    """,
                    (
                        s.score_fit,
                        s.score_intent,
                        s.score_budget,
                        s.score_urgency,
                        s.score_trust,
                        s.total_score,
                        s.suggested_next_action,
                        s.source_url,
                    ),
                )
                updated += conn.total_changes
            conn.commit()
        return updated

    def fetch_by_priority(self, band: str, limit: int = 50) -> list[sqlite3.Row]:
        bands = {
            "P1": (80, 101),
            "P2": (60, 80),
            "P3": (40, 60),
        }
        low, high = bands.get(band, (0, 0))
        with self._conn() as conn:
            conn.row_factory = sqlite3.Row
            return conn.execute(
                """
                SELECT * FROM opportunities
                WHERE total_score >= ? AND total_score < ?
                ORDER BY total_score DESC, captured_at DESC
                LIMIT ?
                """,
                (low, high, limit),
            ).fetchall()


def _make_id(opp: Opportunity) -> str:
    import hashlib
    base = f"{opp.source}:{opp.source_url}:{opp.title_or_excerpt[:120]}"
    return hashlib.sha256(base.encode()).hexdigest()[:16]

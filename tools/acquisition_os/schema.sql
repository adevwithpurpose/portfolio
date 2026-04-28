CREATE TABLE IF NOT EXISTS opportunities (
  id TEXT PRIMARY KEY,
  captured_at TEXT NOT NULL,
  source TEXT NOT NULL,
  source_url TEXT,
  author_or_company TEXT,
  title_or_excerpt TEXT NOT NULL,
  signal_type TEXT,
  offer_match TEXT,
  score_fit INTEGER DEFAULT 0,
  score_intent INTEGER DEFAULT 0,
  score_budget INTEGER DEFAULT 0,
  score_urgency INTEGER DEFAULT 0,
  score_trust INTEGER DEFAULT 0,
  total_score INTEGER DEFAULT 0,
  risk_notes TEXT,
  suggested_next_action TEXT,
  response_draft TEXT,
  status TEXT DEFAULT 'captured',
  outcome TEXT
);

CREATE TABLE IF NOT EXISTS source_runs (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  job_id TEXT NOT NULL,
  source TEXT NOT NULL,
  ran_at TEXT NOT NULL,
  items_found INTEGER DEFAULT 0,
  items_new INTEGER DEFAULT 0
);

CREATE INDEX IF NOT EXISTS idx_opp_source ON opportunities(source);
CREATE INDEX IF NOT EXISTS idx_opp_score ON opportunities(total_score);
CREATE INDEX IF NOT EXISTS idx_opp_status ON opportunities(status);

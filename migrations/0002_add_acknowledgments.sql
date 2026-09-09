CREATE TABLE IF NOT EXISTS plan_acknowledgments (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  token TEXT UNIQUE NOT NULL,
  plan_slug TEXT NOT NULL,
  acknowledged_at TEXT NOT NULL DEFAULT (datetime('now'))
);

CREATE INDEX IF NOT EXISTS idx_plan_acknowledgments_token ON plan_acknowledgments (token);

ALTER TABLE subscribers ADD COLUMN acknowledgment_token TEXT;

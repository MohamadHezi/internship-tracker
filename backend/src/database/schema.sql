CREATE TABLE IF NOT EXISTS users (
  id            SERIAL PRIMARY KEY,
  email         TEXT NOT NULL UNIQUE,
  password_hash TEXT NOT NULL,
  created_at    TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS applications (
  id              SERIAL PRIMARY KEY,
  company         TEXT NOT NULL,
  position        TEXT NOT NULL,
  status          TEXT NOT NULL,
  location        TEXT,
  salary          TEXT,
  notes           TEXT,
  job_url         TEXT,
  user_id         INTEGER NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  date_applied    TIMESTAMPTZ,
  recruiter_name  TEXT,
  recruiter_email TEXT,
  interview_date  TIMESTAMPTZ,
  resume_path     TEXT
);

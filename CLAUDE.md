# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

### Backend (`/backend`)
```bash
npm run dev     # tsx watch — hot reload via ts-node equivalent
npm run build   # tsc compile → dist/
npm start       # run compiled dist/server.js
```

### Frontend (`/frontend`)
```bash
npm run dev     # Vite dev server
npm run build   # tsc type-check + Vite bundle
npm run lint    # ESLint
```

## Architecture

### Stack

- **Backend**: Express 5 + TypeScript, raw `pg.Pool` SQL (no ORM), bcrypt, JWT, multer
- **Frontend**: React 19 + Vite + Tailwind CSS v4 + Recharts
- **Database**: Neon (serverless PostgreSQL) — connection requires `ssl: { rejectUnauthorized: false }`

### Database

No ORM and no migration framework. All SQL is hand-written in service files. The `pool` singleton lives in `backend/src/database/database.ts` and connects via `DATABASE_URL`.

**The schema does not exist in the repo** — it must be applied manually to the Neon database. The required DDL (derived from service queries):

```sql
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
```

`backend/src/utils/mapApplication.ts` maps every DB row from snake_case to the camelCase `Application` interface before it leaves the service layer.

### Backend Layout

```
src/
  server.ts                  # Express entry; registers /auth, /applications, /dashboard
  routes/                    # Route files; all /applications + /dashboard apply authenticateToken
  controllers/               # Thin handlers — extract params, call service, send response
  services/                  # All business logic and SQL queries
  middleware/
    auth.middleware.ts        # Verifies Bearer JWT, sets request.user.userId
    upload.middleware.ts      # multer diskStorage for resume uploads
  utils/mapApplication.ts    # snake_case DB row → camelCase Application
  @types/
    application.ts            # Application interface (camelCase)
    express/index.d.ts        # Extends Request with user: { userId: number }
  database/
    database.ts               # pg.Pool singleton
```

### Authentication Flow

1. `POST /auth/register` and `POST /auth/login` are public (no middleware).
2. Passwords hashed with bcrypt salt 10. JWT signed with `JWT_SECRET`, 7-day expiry.
3. All other routes require `Authorization: Bearer <token>`; middleware sets `request.user.userId`.
4. Frontend stores the JWT in `localStorage` via `AuthContext` (`frontend/src/context/AuthProvider.tsx`).
5. `frontend/src/services/api.ts` — `apiFetch()` injects the header on every protected call.
6. `frontend/src/services/authService.ts` — uses raw `fetch` (not `apiFetch`) since login/register are public.

### Environment Variables

**`backend/.env`**
```
DATABASE_URL=   # Neon connection string
JWT_SECRET=     # 32-char hex (or similar)
PORT=           # optional, defaults to 3000
```

**`frontend/.env`**
```
VITE_API_URL=http://localhost:3000
```

### Known Bugs

- `dashboard.service.ts` queries column `"dateApplied"` (camelCase, double-quoted) in two places, but the actual DB column is `date_applied`. Both dashboard queries fail at runtime with a column-not-found error.
- `updateApplication` in `applications.service.ts` accepts `recruiterName`, `recruiterEmail`, `interviewDate`, and `dateApplied` parameters but the `UPDATE` statement does not include those columns — they are silently dropped.

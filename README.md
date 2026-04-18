---
title: ProfitPulse
type: system
status: active
created: 2026-04-09
updated: 2026-04-13
tags: [system, saas, fnb, profitpulse]
related:
  - "[[../../01-Projects/TL-Cafe-Invoice-To-Recipe-System/README|T&L Cafe Project]]"
  - "[[../../05-Contacts/CRM/Amirul-TL-Cafe|Amirul CRM]]"
---

# ProfitPulse

AI-Powered FnB Cost Intelligence. Productized live demo version of the T&L Cafe Invoice-to-Recipe System.

## Purpose

Production-ready SaaS demo with Supabase authentication, live database integration, and polished UX. This is the version shown to prospects. The source-of-truth development app remains at `01-Projects/TL-Cafe-Invoice-To-Recipe-System/app/`.

## Stack

- Next.js 16.2.1 (App Router)
- TypeScript + Tailwind CSS v4
- Recharts (data visualization)
- Supabase SSR (Auth + PostgreSQL, `thrive` schema)
- Supabase Auth: Email/Password + Google OAuth (frontend wired, provider config pending)

## Features

| Module | Status | Notes |
|--------|--------|-------|
| Dashboard | Live | KPI cards (clickable drill-downs), margin chart, price alerts |
| Invoice Upload | Live | Claude 3.7 Vision OCR, Supabase storage |
| Invoice History | Live | Search, CSV export, 3-state empty messaging |
| Recipe Manager | Live | Add/edit recipes, margin calculation, CSV export |
| Price Monitor | Live | Pulls from `invoice_line_items` with smart fallback |
| Menu Architect | Pending | Star/Plow/Puzzle/Dog classification (P2) |

## Authentication

- Email/Password: `admin` / `admin` (maps to `admin@tlcafe.com`)
- Google OAuth: Frontend wired. Needs Google Cloud OAuth credentials + Supabase provider toggle.

## Dev Server

```bash
npm run dev
# Runs on localhost (check port in terminal output)
```

## Env Vars

See `.env.local.example` for required variables:
- `NEXT_PUBLIC_SUPABASE_URL`
- `NEXT_PUBLIC_SUPABASE_ANON_KEY`
- `SUPABASE_SERVICE_ROLE_KEY`

## Audit History

- 2026-04-09: Full rebrand T&L -> ProfitPulse
- 2026-04-09: Security hardening (removed client-side password intercept)
- 2026-04-09: 4-persona production audit (14 UX gaps documented)
- 2026-04-09: P1 fixes shipped (Price Monitor rewrite, clickable KPIs, deep-link alerts)

**Malaysia Time:** 2026-04-13 05:11

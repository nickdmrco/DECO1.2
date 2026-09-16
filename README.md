# decoventures.com

Marketing site for **DECO Ventures** — a strategic advisory firm for the
security and life safety industry. Built to the DECO Ventures Brand Board
v1.0 (September 2026).

---

## Stack

| Piece       | Choice                                                    |
| ----------- | --------------------------------------------------------- |
| Framework   | Next.js (App Router) + TypeScript                         |
| Styling     | Tailwind CSS v4 — brand tokens in `src/app/globals.css`   |
| Motion      | Motion (Framer Motion) + GSAP ScrollTrigger for the pin    |
| Blog + auth | Supabase (Postgres, Auth, Storage)                        |
| Email       | Resend                                                    |
| Hosting     | Vercel                                                    |

---

## Getting started

```bash
npm install
cp .env.example .env.local     # fill in the values below
npm run dev
```

The marketing pages render with no environment variables at all — Supabase
is optional at build time. Insights shows an empty state and `/admin` explains
what is missing until you configure it.

| Script              | Does                          |
| ------------------- | ----------------------------- |
| `npm run dev`       | Local dev server              |
| `npm run build`     | Production build              |
| `npm run lint`      | ESLint                        |
| `npm run typecheck` | `tsc --noEmit`                |

---

## Environment

| Variable                        | Where            | Notes                                        |
| ------------------------------- | ---------------- | -------------------------------------------- |
| `NEXT_PUBLIC_SUPABASE_URL`      | Supabase API     | Safe in the browser                          |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | Supabase API     | Safe in the browser; RLS does the work        |
| `SUPABASE_SERVICE_ROLE_KEY`     | Supabase API     | **Server only.** Never prefix `NEXT_PUBLIC_`  |
| `RESEND_API_KEY`                | Resend           | Server only                                   |
| `CONTACT_FROM_EMAIL`            | you              | Must be a verified Resend sending domain      |
| `CONTACT_TO_EMAIL`              | you              | Where consultation requests land              |
| `NEXT_PUBLIC_SITE_URL`          | you              | Used by sitemap, robots, and canonical URLs   |

---

## Supabase setup

1. Create a project at [supabase.com](https://supabase.com).
2. Paste `supabase/schema.sql` into the SQL editor and run it. That creates
   `posts`, `admins`, `contact_submissions`, the `post-images` storage bucket,
   and row-level security on all of them.
3. Create your admin user: **Authentication → Users → Add user** (email +
   password). There is deliberately no self-signup.
4. Make that user an admin:

   ```sql
   insert into public.admins (user_id, email)
   values ('<the user id>', '<their email>');
   ```

   If you skip this you can still sign in, but RLS will block writes —
   `/admin` detects it and prints the exact statement to run, with the id
   filled in.
5. Sign in at `/admin/login`.
6. Optionally run `supabase/seed.sql`. It creates the four articles from the
   old blog as empty **drafts**, ready for you to paste the text into. The old
   blog rendered its posts with scripts, so only the titles could be captured.

### How access is enforced

- `middleware.ts` calls `supabase.auth.getUser()` on every `/admin` request
  and redirects anonymous visitors to the login page. `getUser()` revalidates
  against Supabase; `getSession()` alone would trust an unverified cookie.
- RLS is the real boundary. Anyone may read a post where
  `status = 'published'`; only rows in `admins` may read drafts or write
  anything. The client never holds more power than the policies allow.
- The service role key is used in exactly one place — storing contact
  submissions — behind `src/lib/supabase/admin.ts`, which is server-only.

---

## Resend setup

1. Verify your sending domain in Resend.
2. Set `RESEND_API_KEY`, `CONTACT_FROM_EMAIL`, `CONTACT_TO_EMAIL`.

The contact form writes to Postgres *before* it emails, so a bounced or
misconfigured delivery never loses a lead. If Resend isn't configured, the
submission is still stored and the visitor still gets a confirmation — the
failure is logged, not pushed onto them.

---

## Deploying to Vercel

1. Import the repo.
2. Add every variable from the table above in **Project → Settings →
   Environment Variables**.
3. Add `decoventures.com` under **Domains**.

`vercel.json` pins `"framework": "nextjs"`, which overrides whatever the
project auto-detected when it was first created. That matters here: this repo
was imported while `main` held nothing but a README, so Vercel had no
framework to detect and would otherwise keep building the project as a plain
static site — install succeeds, the deployment reports Ready, and every path
returns Vercel's own 404 because no Next.js output was ever captured.

**Production builds `main`.** A branch only ever produces a Preview
deployment, at its own URL. Until the site is on `main`, the Production URL
serves whatever `main` contains. Either merge the branch, or change
**Settings → Git → Production Branch**.

---

## Where things live

```
src/
  app/
    (site)/          public pages — header, footer, scroll progress
      page.tsx       home
      services/  about/  insights/  contact/
    admin/           editor — outside (site), no marketing chrome
    api/contact/     form handler: validate → store → email
  components/
    brand/           Logo, Mark, ServiceIcon
    site/            Header, Footer, Button, PostCard, Markdown, forms
    home/            the home page sections
    motion/          Reveal, Stagger, SplitWords, Counter, Parallax…
  lib/
    site.ts          all site copy and the service definitions
    posts.ts         types + pure helpers (client-safe)
    posts.server.ts  the database queries (server-only)
    supabase/        client, server, middleware, admin clients
supabase/schema.sql  database schema, RLS, storage
```

**Copy lives in `src/lib/site.ts`**, not in the components. Anything marked
`PLACEHOLDER` there is draft copy written in the brand voice, waiting to be
replaced.

---

## Brand notes

The logo is a true vector reconstruction of the interlocking mark, not a
trace. Two identical hooks, one rotated 180°, on a 100-unit grid where every
vertex is a whole number and every segment is a true 45° diagonal. The hooks
never physically overlap — the interlock is negative space — so each one
animates independently. Lockup proportions in
`src/components/brand/Logo.tsx` were measured off the brand board and are
expressed in em, so the whole lockup scales from one number: `size` is the
cap height of "DECO" in px.

Brand tokens — the seven palette colors, the web type scale, the green rule,
and the split bar — are defined once in `src/app/globals.css`.

### Copy provenance

`src/lib/site.ts` marks every block:

- `VERBATIM` — copy from the existing decoventures.com, unchanged.
- `ADAPTED` — the same copy in the brand voice, or split into bullets. No new
  claims: every fact traces back to the handover brief.
- `PENDING` — still waiting.

Fixes carried over from the handover brief: the template contact details
(New York address, Consultinghub email, phone, opening hours) are gone; the
menu and the services section now list the same six practice areas; the meta
description says what the firm actually does; the "not a broker" qualification
travels with the M&A service everywhere it appears; "Since 2011" (the firm) is
kept distinct from "four decades" (George's career); and `All Right Reserved`
is now `All Rights Reserved`. There is no events section — the old one was
eighteen months stale and no current dates were supplied.

### One thing to decide

The brand board's contrast table says **green on white is 2.3:1 — never for
text**, but the board's own cover sets "Thrive." in green on white. The hero
currently follows the cover. It fails WCAG AA even at the large-text
threshold (3:1). If you want it to pass, the cleanest fix that keeps the
color story is to set the tagline on navy, where green reads at about 4.1:1.

### Accessibility

Every motion component checks `prefers-reduced-motion` in JS, not only in
CSS, and the pinned rail degrades to an ordinary swipeable row. The site has
a skip link, visible focus rings, and no horizontal overflow at 390px.

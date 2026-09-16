# decoventures.com

Marketing site for DECO Ventures — a strategic advisory firm for the security
and life safety industry.

Built to the DECO Ventures Brand Board v1.0 (September 2026).

## Stack

| Piece      | Choice                                        |
| ---------- | --------------------------------------------- |
| Framework  | Next.js (App Router) + TypeScript             |
| Styling    | Tailwind CSS v4, brand tokens in `globals.css` |
| Motion     | Motion (Framer Motion) + GSAP ScrollTrigger   |
| Blog/auth  | Supabase (Postgres + Auth)                    |
| Email      | Resend                                        |
| Hosting    | Vercel                                        |

## Local development

```bash
npm install
cp .env.example .env.local   # then fill in the values
npm run dev
```

## Brand

The logo is a true vector reconstruction of the interlocking mark, not a
trace: two identical hooks, one rotated 180°, on a 100-unit grid. Lockup
proportions in `src/components/brand/Logo.tsx` were measured off the brand
board and are expressed in em, so the whole lockup scales from one number.

Brand tokens (color, type scale, the green rule, the split bar) live in
`src/app/globals.css`. Copy lives in `src/lib/site.ts`.

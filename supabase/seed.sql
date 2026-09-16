-- ============================================================================
-- Optional seed: the four articles from the current decoventures.com blog.
--
-- The old blog renders its posts with client-side scripts, so only the titles
-- could be captured. These are inserted as DRAFTS with an empty body -- they
-- will not appear on the public site until someone pastes the article text in
-- and hits Publish. Nothing here is invented.
--
-- The old blog's categories were: Tips, Electronic Security, Trends and
-- Challenges. Tags are left empty because which post sat under which category
-- wasn't captured -- set them in the editor.
--
-- Run after schema.sql, and only if you want the shells pre-created.
-- ============================================================================

insert into public.posts (slug, title, body, status)
values
  (
    'building-brand-trust',
    'Building Brand Trust',
    E'<!-- Paste the article from the old site here, as Markdown. -->',
    'draft'
  ),
  (
    'trust-but-verify',
    'Trust but Verify',
    E'<!-- Paste the article from the old site here, as Markdown. -->',
    'draft'
  ),
  (
    'security-in-focus-top-industry-trends-and-challenges',
    'Security in Focus: Top Industry Trends and Challenges',
    E'<!-- Paste the article from the old site here, as Markdown. -->',
    'draft'
  ),
  (
    'covid-19-demand-growth-and-challenges',
    'COVID-19: Demand, Growth & Challenges',
    E'<!-- Paste the article from the old site here, as Markdown. -->',
    'draft'
  )
on conflict (slug) do nothing;

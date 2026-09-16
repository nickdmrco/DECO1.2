-- ============================================================================
-- DECO Ventures — database schema
-- Run this once in the Supabase SQL editor (or via `supabase db push`).
-- ============================================================================

-- ---------------------------------------------------------------- admins ---
-- Who may sign in to /admin and manage posts. Create the auth user first
-- (Supabase Dashboard > Authentication > Users > Add user), then insert the
-- id here. Membership is deliberately manual: there is no self-signup.
create table if not exists public.admins (
  user_id    uuid primary key references auth.users (id) on delete cascade,
  email      text,
  created_at timestamptz not null default now()
);

alter table public.admins enable row level security;

-- security definer so the policies below can read the table without
-- recursing through their own RLS checks.
create or replace function public.is_admin()
returns boolean
language sql
stable
security definer
set search_path = public
as $$
  select exists (select 1 from public.admins where user_id = auth.uid());
$$;

drop policy if exists "admins read own row" on public.admins;
create policy "admins read own row" on public.admins
  for select to authenticated using (user_id = auth.uid());

-- ----------------------------------------------------------------- posts ---
create table if not exists public.posts (
  id           uuid primary key default gen_random_uuid(),
  slug         text unique not null,
  title        text not null,
  excerpt      text,
  body         text not null default '',
  cover_url    text,
  tags         text[] not null default '{}',
  status       text not null default 'draft' check (status in ('draft', 'published')),
  published_at timestamptz,
  author_id    uuid references auth.users (id) on delete set null,
  created_at   timestamptz not null default now(),
  updated_at   timestamptz not null default now()
);

create index if not exists posts_published_idx
  on public.posts (published_at desc)
  where status = 'published';

create or replace function public.touch_updated_at()
returns trigger language plpgsql as $$
begin
  new.updated_at := now();
  return new;
end;
$$;

drop trigger if exists posts_touch_updated_at on public.posts;
create trigger posts_touch_updated_at
  before update on public.posts
  for each row execute function public.touch_updated_at();

alter table public.posts enable row level security;

-- Anyone may read a published post. Admins may read and write everything.
drop policy if exists "published posts are public" on public.posts;
create policy "published posts are public" on public.posts
  for select to anon, authenticated
  using (status = 'published' or public.is_admin());

drop policy if exists "admins insert posts" on public.posts;
create policy "admins insert posts" on public.posts
  for insert to authenticated with check (public.is_admin());

drop policy if exists "admins update posts" on public.posts;
create policy "admins update posts" on public.posts
  for update to authenticated using (public.is_admin()) with check (public.is_admin());

drop policy if exists "admins delete posts" on public.posts;
create policy "admins delete posts" on public.posts
  for delete to authenticated using (public.is_admin());

-- --------------------------------------------------- contact submissions ---
-- The form emails through Resend; this is the durable copy so nothing is
-- lost if a delivery bounces. Written server-side with the service role key,
-- so no insert policy is granted to anon.
create table if not exists public.contact_submissions (
  id         uuid primary key default gen_random_uuid(),
  name       text not null,
  email      text not null,
  company    text,
  role       text,
  message    text not null,
  source     text,
  created_at timestamptz not null default now()
);

alter table public.contact_submissions enable row level security;

drop policy if exists "admins read submissions" on public.contact_submissions;
create policy "admins read submissions" on public.contact_submissions
  for select to authenticated using (public.is_admin());

-- ------------------------------------------------------------- storage ----
-- Bucket for post cover images. Public read, admin write.
insert into storage.buckets (id, name, public)
values ('post-images', 'post-images', true)
on conflict (id) do nothing;

drop policy if exists "post images are public" on storage.objects;
create policy "post images are public" on storage.objects
  for select to anon, authenticated using (bucket_id = 'post-images');

drop policy if exists "admins upload post images" on storage.objects;
create policy "admins upload post images" on storage.objects
  for insert to authenticated
  with check (bucket_id = 'post-images' and public.is_admin());

drop policy if exists "admins delete post images" on storage.objects;
create policy "admins delete post images" on storage.objects
  for delete to authenticated
  using (bucket_id = 'post-images' and public.is_admin());

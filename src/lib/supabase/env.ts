/* Supabase is optional at build time: the marketing pages must render on a
   fresh clone with no keys. Anything that needs the database checks this
   first and degrades to an empty state instead of throwing. */
export const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL ?? "";
export const SUPABASE_ANON_KEY = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ?? "";

export const supabaseConfigured = Boolean(SUPABASE_URL && SUPABASE_ANON_KEY);

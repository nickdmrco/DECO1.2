import "server-only";

import { createClient } from "@/lib/supabase/server";
import { supabaseConfigured } from "@/lib/supabase/env";
import type { Post } from "@/lib/posts";

const COLUMNS =
  "id, slug, title, excerpt, body, cover_url, tags, status, published_at, created_at, updated_at";

/** Published posts, newest first. Empty when Supabase isn't configured yet. */
export async function getPublishedPosts(limit?: number): Promise<Post[]> {
  if (!supabaseConfigured) return [];
  const supabase = await createClient();
  let query = supabase
    .from("posts")
    .select(COLUMNS)
    .eq("status", "published")
    .order("published_at", { ascending: false, nullsFirst: false });
  if (limit) query = query.limit(limit);

  const { data, error } = await query;
  if (error) {
    console.error("[posts] getPublishedPosts:", error.message);
    return [];
  }
  return (data ?? []) as Post[];
}

/** A single published post. Drafts resolve only for a signed-in admin. */
export async function getPostBySlug(slug: string): Promise<Post | null> {
  if (!supabaseConfigured) return null;
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("posts")
    .select(COLUMNS)
    .eq("slug", slug)
    .maybeSingle();

  if (error) {
    console.error("[posts] getPostBySlug:", error.message);
    return null;
  }
  return (data as Post) ?? null;
}

/** Everything, for the admin list. RLS keeps this to admins. */
export async function getAllPosts(): Promise<Post[]> {
  if (!supabaseConfigured) return [];
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("posts")
    .select(COLUMNS)
    .order("updated_at", { ascending: false });

  if (error) {
    console.error("[posts] getAllPosts:", error.message);
    return [];
  }
  return (data ?? []) as Post[];
}


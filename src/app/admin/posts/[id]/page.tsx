import Link from "next/link";
import { notFound, redirect } from "next/navigation";
import { AdminShell } from "@/components/admin/AdminShell";
import { PostEditor } from "@/components/admin/PostEditor";
import { createClient } from "@/lib/supabase/server";
import { supabaseConfigured } from "@/lib/supabase/env";
import type { Post } from "@/lib/posts";

export const dynamic = "force-dynamic";

export default async function EditPostPage({ params }: { params: Promise<{ id: string }> }) {
  if (!supabaseConfigured) redirect("/admin/login");

  const { id } = await params;
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) redirect("/admin/login");

  const { data } = await supabase.from("posts").select("*").eq("id", id).maybeSingle();
  if (!data) notFound();
  const post = data as Post;

  return (
    <AdminShell
      email={user.email ?? ""}
      actions={
        <Link
          href={`/insights/${post.slug}`}
          target="_blank"
          className="text-[0.875rem] font-medium text-deep transition-colors hover:text-deep"
        >
          View
        </Link>
      }
    >
      <PostEditor post={post} />
    </AdminShell>
  );
}

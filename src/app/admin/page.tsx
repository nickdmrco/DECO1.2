import Link from "next/link";
import { redirect } from "next/navigation";
import { AdminShell } from "@/components/admin/AdminShell";
import { ArrowRight, ButtonLink } from "@/components/site/Button";
import { formatPostDate } from "@/lib/posts";
import { getAllPosts } from "@/lib/posts.server";
import { createClient } from "@/lib/supabase/server";
import { supabaseConfigured } from "@/lib/supabase/env";

export const dynamic = "force-dynamic";

export default async function AdminHome() {
  if (!supabaseConfigured) redirect("/admin/login");

  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) redirect("/admin/login");

  const { data: adminRow } = await supabase
    .from("admins")
    .select("user_id")
    .eq("user_id", user.id)
    .maybeSingle();

  const posts = await getAllPosts();
  const published = posts.filter((p) => p.status === "published").length;

  return (
    <AdminShell
      email={user.email ?? ""}
      actions={
        <ButtonLink href="/admin/posts/new" size="sm">
          New post
          <ArrowRight />
        </ButtonLink>
      }
    >
      {!adminRow ? (
        <div className="mb-8 rounded-2xl border border-line-light bg-white p-6">
          <h2 className="text-h3 text-deep">This account isn&rsquo;t an admin yet</h2>
          <p className="mt-3 text-[0.9375rem] leading-relaxed text-ink-muted">
            You&rsquo;re signed in, but row-level security will block writes until this user
            is in the <code className="rounded bg-white px-1.5 py-0.5">admins</code> table.
            Run this once in the Supabase SQL editor:
          </p>
          <pre className="mt-4 overflow-x-auto rounded-xl bg-blue p-4 text-[0.8125rem] text-white">
{`insert into public.admins (user_id, email)
values ('${user.id}', '${user.email ?? ""}');`}
          </pre>
        </div>
      ) : null}

      <div className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <h1 className="text-h2 text-deep">Posts</h1>
          <span className="rule-green mt-4" aria-hidden="true" />
          <p className="mt-4 text-[0.9375rem] text-ink-muted">
            {posts.length} total · {published} published · {posts.length - published} draft
          </p>
        </div>
      </div>

      {posts.length === 0 ? (
        <div className="mt-10 rounded-2xl border border-line-light bg-white px-8 py-16 text-center">
          <span className="split-bar mx-auto block h-1 w-16 rounded-full" aria-hidden="true" />
          <h2 className="mt-7 text-h3 text-deep">Nothing written yet</h2>
          <p className="mx-auto mt-3 max-w-sm text-[0.9375rem] text-ink-muted">
            Start the first piece. Drafts stay private until you publish them.
          </p>
          <ButtonLink href="/admin/posts/new" className="mt-7">
            Write the first post
            <ArrowRight />
          </ButtonLink>
        </div>
      ) : (
        <ul className="mt-10 overflow-hidden rounded-2xl border border-line-light bg-white">
          {posts.map((post) => (
            <li key={post.id} className="border-b border-line-light last:border-0">
              <Link
                href={`/admin/posts/${post.id}`}
                className="flex flex-wrap items-center justify-between gap-4 px-6 py-5 transition-colors hover:bg-white"
              >
                <div className="min-w-0">
                  <div className="flex items-center gap-3">
                    <span
                      className={`inline-block h-2 w-2 shrink-0 rounded-full ${
                        post.status === "published" ? "bg-kelp" : "bg-line-light"
                      }`}
                      aria-hidden="true"
                    />
                    <span className="truncate text-[1.0625rem] font-medium text-deep">
                      {post.title || "Untitled"}
                    </span>
                  </div>
                  <p className="mt-1.5 truncate pl-5 text-[0.8125rem] text-ink-muted">
                    /insights/{post.slug} · updated {formatPostDate(post.updated_at)}
                  </p>
                </div>
                <span className="label shrink-0 text-ink-muted">{post.status}</span>
              </Link>
            </li>
          ))}
        </ul>
      )}
    </AdminShell>
  );
}

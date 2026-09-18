"use client";

import { AnimatePresence, motion } from "motion/react";
import { useRouter } from "next/navigation";
import { useRef, useState } from "react";
import { Button, ArrowRight } from "@/components/site/Button";
import { Markdown } from "@/components/site/Markdown";
import { createClient } from "@/lib/supabase/client";
import { slugify, type Post, type PostStatus } from "@/lib/posts";

const field =
  "w-full rounded-xl border border-line-light bg-white px-4 py-3 text-[1rem] text-deep " +
  "transition-colors duration-300 placeholder:text-ink-muted/50 focus:border-blue-deep focus:outline-none";

type Draft = {
  title: string;
  slug: string;
  excerpt: string;
  body: string;
  cover_url: string;
  tags: string;
  status: PostStatus;
  published_at: string;
};

const toDraft = (post?: Post): Draft => ({
  title: post?.title ?? "",
  slug: post?.slug ?? "",
  excerpt: post?.excerpt ?? "",
  body: post?.body ?? "",
  cover_url: post?.cover_url ?? "",
  tags: (post?.tags ?? []).join(", "),
  status: post?.status ?? "draft",
  published_at: post?.published_at ? post.published_at.slice(0, 16) : "",
});

export function PostEditor({ post }: { post?: Post }) {
  const router = useRouter();
  const [draft, setDraft] = useState<Draft>(() => toDraft(post));
  const [slugTouched, setSlugTouched] = useState(Boolean(post));
  const [preview, setPreview] = useState(false);
  const [busy, setBusy] = useState(false);
  const [message, setMessage] = useState<{ tone: "ok" | "bad"; text: string } | null>(null);
  const fileInput = useRef<HTMLInputElement>(null);

  const set = <K extends keyof Draft>(key: K, value: Draft[K]) =>
    setDraft((d) => ({ ...d, [key]: value }));

  function onTitle(value: string) {
    setDraft((d) => ({ ...d, title: value, slug: slugTouched ? d.slug : slugify(value) }));
  }

  async function uploadCover(file: File) {
    setBusy(true);
    setMessage(null);
    const supabase = createClient();
    const path = `${Date.now()}-${slugify(file.name.replace(/\.[^.]+$/, ""))}.${file.name.split(".").pop()}`;
    const { error } = await supabase.storage.from("post-images").upload(path, file, {
      cacheControl: "31536000",
      upsert: false,
    });
    if (error) {
      setMessage({ tone: "bad", text: `Upload failed: ${error.message}` });
    } else {
      const { data } = supabase.storage.from("post-images").getPublicUrl(path);
      set("cover_url", data.publicUrl);
      setMessage({ tone: "ok", text: "Cover image uploaded." });
    }
    setBusy(false);
  }

  async function save(nextStatus?: PostStatus) {
    setBusy(true);
    setMessage(null);

    const status = nextStatus ?? draft.status;
    const slug = draft.slug.trim() || slugify(draft.title);

    if (!draft.title.trim()) {
      setMessage({ tone: "bad", text: "A post needs a title." });
      setBusy(false);
      return;
    }

    const payload = {
      title: draft.title.trim(),
      slug,
      excerpt: draft.excerpt.trim() || null,
      body: draft.body,
      cover_url: draft.cover_url.trim() || null,
      tags: draft.tags
        .split(",")
        .map((t) => t.trim())
        .filter(Boolean),
      status,
      published_at:
        status === "published"
          ? draft.published_at
            ? new Date(draft.published_at).toISOString()
            : new Date().toISOString()
          : draft.published_at
            ? new Date(draft.published_at).toISOString()
            : null,
    };

    const supabase = createClient();
    const result = post
      ? await supabase.from("posts").update(payload).eq("id", post.id).select("id").single()
      : await supabase.from("posts").insert(payload).select("id").single();

    if (result.error) {
      const hint =
        result.error.code === "23505"
          ? "That slug is already taken."
          : result.error.code === "42501"
            ? "Permission denied — this account isn't in the admins table."
            : result.error.message;
      setMessage({ tone: "bad", text: hint });
      setBusy(false);
      return;
    }

    setDraft((d) => ({ ...d, status, slug }));
    setMessage({
      tone: "ok",
      text: status === "published" ? "Published." : "Draft saved.",
    });
    setBusy(false);

    if (!post) router.replace(`/admin/posts/${result.data.id}`);
    router.refresh();
  }

  async function remove() {
    if (!post) return;
    if (!window.confirm(`Delete “${post.title}”? This cannot be undone.`)) return;
    setBusy(true);
    const { error } = await createClient().from("posts").delete().eq("id", post.id);
    if (error) {
      setMessage({ tone: "bad", text: error.message });
      setBusy(false);
      return;
    }
    router.replace("/admin");
    router.refresh();
  }

  return (
    <div className="grid gap-8 lg:grid-cols-[1.6fr_1fr] lg:items-start">
      <div className="rounded-2xl border border-line-light bg-white p-6 sm:p-8">
        <div className="flex items-center justify-between gap-4">
          <h1 className="text-h3 text-deep">{post ? "Edit post" : "New post"}</h1>
          <button
            type="button"
            onClick={() => setPreview((p) => !p)}
            className="text-[0.875rem] font-medium text-deep transition-colors hover:text-deep"
          >
            {preview ? "Back to editing" : "Preview"}
          </button>
        </div>
        <span className="rule-green mt-4" aria-hidden="true" />

        {preview ? (
          <div className="mt-8">
            <h2 className="text-h2 text-deep">{draft.title || "Untitled"}</h2>
            {draft.excerpt ? (
              <p className="mt-4 text-[1.125rem] text-ink-muted">{draft.excerpt}</p>
            ) : null}
            <div className="mt-6 border-t border-line-light pt-2">
              <Markdown>{draft.body || "_Nothing written yet._"}</Markdown>
            </div>
          </div>
        ) : (
          <div className="mt-8 space-y-6">
            <div>
              <label htmlFor="title" className="label block text-ink-muted">
                Title
              </label>
              <input
                id="title"
                value={draft.title}
                onChange={(e) => onTitle(e.target.value)}
                placeholder="What owners get wrong about succession"
                className={`${field} mt-2.5 text-[1.25rem] font-medium`}
              />
            </div>

            <div>
              <label htmlFor="excerpt" className="label block text-ink-muted">
                Excerpt
              </label>
              <textarea
                id="excerpt"
                value={draft.excerpt}
                onChange={(e) => set("excerpt", e.target.value)}
                rows={2}
                placeholder="One or two sentences for the card and the search result."
                className={`${field} mt-2.5 resize-y`}
              />
            </div>

            <div>
              <label htmlFor="body" className="label block text-ink-muted">
                Body · Markdown
              </label>
              <textarea
                id="body"
                value={draft.body}
                onChange={(e) => set("body", e.target.value)}
                rows={22}
                placeholder={"## A heading\n\nWrite the way George talks to an owner across the table."}
                className={`${field} mt-2.5 resize-y font-mono text-[0.9375rem] leading-relaxed`}
              />
            </div>
          </div>
        )}
      </div>

      <aside className="space-y-6 lg:sticky lg:top-8">
        <div className="rounded-2xl border border-line-light bg-white p-6">
          <h2 className="label text-ink-muted">Publishing</h2>
          <span className="rule-green mt-4" aria-hidden="true" />

          <div className="mt-6 space-y-5">
            <div>
              <label htmlFor="slug" className="label block text-ink-muted">
                Slug
              </label>
              <input
                id="slug"
                value={draft.slug}
                onChange={(e) => {
                  setSlugTouched(true);
                  set("slug", slugify(e.target.value));
                }}
                className={`${field} mt-2.5 font-mono text-[0.875rem]`}
              />
              <p className="mt-2 truncate text-[0.75rem] text-ink-muted">/insights/{draft.slug}</p>
            </div>

            <div>
              <label htmlFor="published_at" className="label block text-ink-muted">
                Publish date
              </label>
              <input
                id="published_at"
                type="datetime-local"
                value={draft.published_at}
                onChange={(e) => set("published_at", e.target.value)}
                className={`${field} mt-2.5 text-[0.875rem]`}
              />
              <p className="mt-2 text-[0.75rem] text-ink-muted">Leave empty to stamp on publish.</p>
            </div>

            <div>
              <label htmlFor="tags" className="label block text-ink-muted">
                Tags
              </label>
              <input
                id="tags"
                value={draft.tags}
                onChange={(e) => set("tags", e.target.value)}
                placeholder="succession, m&a"
                className={`${field} mt-2.5 text-[0.875rem]`}
              />
            </div>
          </div>

          <div className="mt-7 flex flex-wrap gap-3">
            <Button size="sm" onClick={() => save("published")} disabled={busy}>
              {draft.status === "published" ? "Update" : "Publish"}
              <ArrowRight />
            </Button>
            <Button size="sm" variant="secondary" onClick={() => save("draft")} disabled={busy}>
              Save draft
            </Button>
          </div>

          <AnimatePresence>
            {message ? (
              <motion.p
                role="status"
                initial={{ opacity: 0, y: -4 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                className={`mt-5 rounded-xl px-4 py-3 text-[0.875rem] ${
                  message.tone === "ok"
                    ? "bg-white text-deep"
                    : "border border-blue-deep/25 bg-white text-deep"
                }`}
              >
                {message.text}
              </motion.p>
            ) : null}
          </AnimatePresence>
        </div>

        <div className="rounded-2xl border border-line-light bg-white p-6">
          <h2 className="label text-ink-muted">Cover image</h2>
          <span className="rule-green mt-4" aria-hidden="true" />
          {draft.cover_url ? (
            <div className="mt-6">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={draft.cover_url} alt="" className="aspect-[16/9] w-full rounded-xl object-cover" />
              <button
                type="button"
                onClick={() => set("cover_url", "")}
                className="mt-3 text-[0.8125rem] text-deep transition-colors hover:text-deep"
              >
                Remove
              </button>
            </div>
          ) : (
            <p className="mt-5 text-[0.8125rem] leading-relaxed text-ink-muted">
              Real people doing real work — bright, natural light. No padlocks, no glowing
              shields.
            </p>
          )}
          <input
            ref={fileInput}
            type="file"
            accept="image/*"
            className="hidden"
            onChange={(e) => {
              const file = e.target.files?.[0];
              if (file) void uploadCover(file);
              e.target.value = "";
            }}
          />
          <Button
            size="sm"
            variant="secondary"
            className="mt-5 w-full"
            onClick={() => fileInput.current?.click()}
            disabled={busy}
          >
            Upload image
          </Button>
        </div>

        {post ? (
          <div className="rounded-2xl border border-line-light bg-white p-6">
            <h2 className="label text-ink-muted">Danger zone</h2>
            <span className="rule-green mt-4" aria-hidden="true" />
            <button
              type="button"
              onClick={remove}
              disabled={busy}
              className="mt-5 text-[0.875rem] font-medium text-deep transition-colors hover:text-deep"
            >
              Delete this post
            </button>
          </div>
        ) : null}
      </aside>
    </div>
  );
}

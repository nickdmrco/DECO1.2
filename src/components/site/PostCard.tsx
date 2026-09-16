import Link from "next/link";
import { ArrowRight } from "@/components/site/Button";
import { formatPostDate, readingTime, type Post } from "@/lib/posts";

export function PostCard({ post, tone = "light" }: { post: Post; tone?: "light" | "dark" }) {
  const dark = tone === "dark";
  return (
    <article className="group h-full">
      <Link
        href={`/insights/${post.slug}`}
        className={`flex h-full flex-col overflow-hidden rounded-2xl border transition-all duration-500 ease-[cubic-bezier(.22,1,.36,1)] hover:-translate-y-1.5 ${
          dark
            ? "border-white/12 bg-white/[0.04] hover:border-green/50"
            : "border-line bg-white hover:border-green/60 hover:shadow-[0_24px_48px_-32px_rgba(16,50,74,.35)]"
        }`}
      >
        <div className={`aspect-[16/9] w-full overflow-hidden ${dark ? "bg-white/5" : "bg-mist"}`}>
          {post.cover_url ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              src={post.cover_url}
              alt=""
              className="h-full w-full object-cover transition-transform duration-700 ease-[cubic-bezier(.22,1,.36,1)] group-hover:scale-[1.04]"
            />
          ) : (
            <div className="flex h-full w-full items-center justify-center">
              <span className="split-bar h-1 w-16 rounded-full" aria-hidden="true" />
            </div>
          )}
        </div>

        <div className="flex flex-1 flex-col p-7">
          <p className={`label ${dark ? "text-white/45" : "text-slate"}`}>
            {formatPostDate(post.published_at ?? post.created_at)}
            <span className="mx-2" aria-hidden="true">
              ·
            </span>
            {readingTime(post.body)}
          </p>
          <h3 className={`mt-4 text-h3 ${dark ? "text-white" : "text-navy"}`}>{post.title}</h3>
          <span
            aria-hidden="true"
            className="mt-3 block h-[3px] w-10 origin-left bg-green transition-transform duration-500 ease-[cubic-bezier(.22,1,.36,1)] group-hover:scale-x-[1.8]"
          />
          {post.excerpt ? (
            <p
              className={`mt-4 line-clamp-3 text-[0.9375rem] leading-[1.6] ${dark ? "text-white/70" : "text-slate"}`}
            >
              {post.excerpt}
            </p>
          ) : null}
          <span
            className={`mt-auto inline-flex items-center gap-2 pt-7 text-[0.9375rem] font-medium ${dark ? "text-green" : "text-deep"}`}
          >
            Read more
            <ArrowRight />
          </span>
        </div>
      </Link>
    </article>
  );
}

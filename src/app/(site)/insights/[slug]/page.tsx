import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowRight, ButtonLink } from "@/components/site/Button";
import { Markdown } from "@/components/site/Markdown";
import { PostCard } from "@/components/site/PostCard";
import { Reveal } from "@/components/motion";
import { formatPostDate, readingTime } from "@/lib/posts";
import { getPostBySlug, getPublishedPosts } from "@/lib/posts.server";
import { site } from "@/lib/site";

export const revalidate = 300;

type Params = { params: Promise<{ slug: string }> };

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const { slug } = await params;
  const post = await getPostBySlug(slug);
  if (!post) return { title: "Not found" };

  return {
    title: post.title,
    description: post.excerpt ?? undefined,
    alternates: { canonical: `/insights/${post.slug}` },
    openGraph: {
      type: "article",
      title: post.title,
      description: post.excerpt ?? undefined,
      publishedTime: post.published_at ?? undefined,
      images: post.cover_url ? [post.cover_url] : undefined,
    },
  };
}

export default async function PostPage({ params }: Params) {
  const { slug } = await params;
  const post = await getPostBySlug(slug);
  if (!post) notFound();

  const related = (await getPublishedPosts(4)).filter((p) => p.id !== post.id).slice(0, 3);
  const isDraft = post.status === "draft";

  return (
    /* The one light surface on the site: long-form body text is genuinely
       harder to read on dark, so articles sit on Surf. */
    <div className="surface-light">
      <article>
        <header className="bg-white pb-16 pt-[calc(var(--header-h)+3.5rem)] lg:pb-20 lg:pt-[calc(var(--header-h)+5rem)]">
          <div className="mx-auto max-w-[46rem] px-6">
            <Link
              href="/insights"
              className="label inline-flex items-center gap-2 text-ink-muted transition-colors hover:text-deep"
            >
              <span aria-hidden="true">&larr;</span> All insights
            </Link>

            {isDraft ? (
              <p className="mt-6 inline-flex rounded-full bg-kelp px-4 py-1.5 text-[0.75rem] font-medium tracking-wide text-deep">
                Draft — visible to admins only
              </p>
            ) : null}

            <h1 className="mt-6 text-[clamp(2rem,4.5vw,2.75rem)] font-semibold leading-[1.12] tracking-[-0.025em] text-deep">
              {post.title}
            </h1>
            <span className="rule-green mt-6" aria-hidden="true" />
            <p className="label mt-6 text-ink-muted">
              {formatPostDate(post.published_at ?? post.created_at)}
              <span className="mx-2" aria-hidden="true">
                ·
              </span>
              {readingTime(post.body)}
            </p>
            {post.excerpt ? (
              <p className="mt-8 text-[1.25rem] leading-[1.5] text-ink-muted">{post.excerpt}</p>
            ) : null}
          </div>
        </header>

        {post.cover_url ? (
          <div className="mx-auto max-w-[62rem] px-6">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={post.cover_url}
              alt=""
              className="-mt-10 w-full rounded-2xl object-cover shadow-[0_32px_64px_-40px_rgba(10,31,51,.45)]"
            />
          </div>
        ) : null}

        <div className="bg-white py-16 lg:py-20">
          <div className="mx-auto max-w-[46rem] px-6">
            <Markdown>{post.body}</Markdown>

            {post.tags.length > 0 ? (
              <ul className="mt-14 flex flex-wrap gap-2.5 border-t border-line-light pt-8">
                {post.tags.map((tag) => (
                  <li
                    key={tag}
                    className="rounded-full border border-line-light px-4 py-1.5 text-[0.8125rem] text-ink-muted"
                  >
                    {tag}
                  </li>
                ))}
              </ul>
            ) : null}

            <div className="mt-14 rounded-2xl bg-white p-8 sm:p-10">
              <p className="label text-ink-muted">Working on this yourself?</p>
              <p className="mt-4 text-h3 text-deep">
                Bring it to the table. {site.founder} reads every enquiry himself.
              </p>
              <ButtonLink href="/contact" className="mt-7">
                Request a consultation
                <ArrowRight />
              </ButtonLink>
            </div>
          </div>
        </div>
      </article>

      {related.length > 0 ? (
        <section className="border-t border-line-light bg-white py-20">
          <div className="mx-auto max-w-[76rem] px-6 lg:px-8">
            <h2 className="label text-ink-muted">Keep reading</h2>
            <span className="rule-green mt-4" aria-hidden="true" />
            <div className="mt-10 grid gap-7 sm:grid-cols-2 lg:grid-cols-3">
              {related.map((item) => (
                <Reveal key={item.id} className="h-full">
                  <PostCard post={item} />
                </Reveal>
              ))}
            </div>
          </div>
        </section>
      ) : null}
    </div>
  );
}

import type { Metadata } from "next";
import { Stagger, StaggerItem } from "@/components/motion";
import { PageHero } from "@/components/site/PageHero";
import { PostCard } from "@/components/site/PostCard";
import { CtaBand } from "@/components/home/CtaBand";
import { getPublishedPosts } from "@/lib/posts.server";

export const metadata: Metadata = {
  title: "Insights",
  description:
    "Perspective on growth, succession, operations, technology, and M&A in the security and life safety industry.",
};

export const revalidate = 300;

export default async function InsightsPage() {
  const posts = await getPublishedPosts();

  return (
    <>
      <PageHero
        label="Insights"
        title="What we're seeing in the industry"
        lede={
          <p>
            Notes from the field on growth, succession, operations, technology, and the
            deals that shape the industry. Written the way we talk.
          </p>
        }
      />

      <section className="bg-white py-20 lg:py-28">
        <div className="mx-auto max-w-[76rem] px-6 lg:px-8">
          {posts.length === 0 ? (
            <div className="rounded-2xl border border-line bg-mist px-8 py-20 text-center">
              <span className="split-bar mx-auto block h-1 w-16 rounded-full" aria-hidden="true" />
              <h2 className="mt-8 text-h2 text-navy">The first piece is on its way.</h2>
              <p className="mx-auto mt-5 max-w-md text-body text-slate">
                New writing lands here. In the meantime, the fastest way to get our read
                on something is to ask.
              </p>
            </div>
          ) : (
            <Stagger className="grid gap-7 sm:grid-cols-2 lg:grid-cols-3" gap={0.08}>
              {posts.map((post) => (
                <StaggerItem key={post.id} className="h-full">
                  <PostCard post={post} />
                </StaggerItem>
              ))}
            </Stagger>
          )}
        </div>
      </section>

      <CtaBand />
    </>
  );
}

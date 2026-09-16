import { Reveal, Stagger, StaggerItem } from "@/components/motion";
import { SectionHeading } from "@/components/site/SectionHeading";
import { ArrowRight, ButtonLink } from "@/components/site/Button";
import { PostCard } from "@/components/site/PostCard";
import type { Post } from "@/lib/posts";

export function InsightsTeaser({ posts }: { posts: Post[] }) {
  if (posts.length === 0) return null;

  return (
    <section className="bg-mist py-28 lg:py-36">
      <div className="mx-auto max-w-[76rem] px-6 lg:px-8">
        <div className="flex flex-wrap items-end justify-between gap-6">
          <SectionHeading
            label="Insights"
            title="What we're seeing in the industry"
          />
          <Reveal delay={0.1}>
            <ButtonLink href="/insights" variant="secondary" size="sm">
              All insights
              <ArrowRight />
            </ButtonLink>
          </Reveal>
        </div>

        <Stagger className="mt-14 grid gap-7 sm:grid-cols-2 lg:grid-cols-3" gap={0.1}>
          {posts.map((post) => (
            <StaggerItem key={post.id} className="h-full">
              <PostCard post={post} />
            </StaggerItem>
          ))}
        </Stagger>
      </div>
    </section>
  );
}

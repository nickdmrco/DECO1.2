import { Hero } from "@/components/home/Hero";
import { Positioning } from "@/components/home/Positioning";
import { ServiceRail } from "@/components/home/ServiceRail";
import { Process } from "@/components/home/Process";
import { Stats } from "@/components/home/Stats";
import { FounderTeaser } from "@/components/home/FounderTeaser";
import { InsightsTeaser } from "@/components/home/InsightsTeaser";
import { CtaBand } from "@/components/home/CtaBand";
import { getPublishedPosts } from "@/lib/posts.server";

export default async function HomePage() {
  const posts = await getPublishedPosts(3);

  return (
    <>
      <Hero />
      <Positioning />
      <ServiceRail />
      <Process />
      <Stats />
      <FounderTeaser />
      <InsightsTeaser posts={posts} />
      <CtaBand />
    </>
  );
}

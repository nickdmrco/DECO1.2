import type { Metadata } from "next";
import { Hero } from "@/components/home/Hero";
import { Challenges } from "@/components/home/Challenges";
import { ServiceRail } from "@/components/home/ServiceRail";
import { Pillars } from "@/components/home/Pillars";
import { Stats } from "@/components/home/Stats";
import { Partners } from "@/components/home/Partners";
import { FounderTeaser } from "@/components/home/FounderTeaser";
import { InsightsTeaser } from "@/components/home/InsightsTeaser";
import { CtaBand } from "@/components/home/CtaBand";
import { getPublishedPosts } from "@/lib/posts.server";

export const metadata: Metadata = {
  description:
    "DECO Ventures is a Southern California advisory firm for the security and life safety industry — leadership, growth, operations, industry networking, technology, and M&A advisory for integrators, monitoring centers, manufacturers, and investors.",
  alternates: { canonical: "/" },
};

export default async function HomePage() {
  const posts = await getPublishedPosts(3);

  return (
    <>
      <Hero />
      <Challenges />
      <ServiceRail />
      <Pillars />
      <Stats />
      <Partners />
      <FounderTeaser />
      <InsightsTeaser posts={posts} />
      <CtaBand />
    </>
  );
}

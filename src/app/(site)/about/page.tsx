import type { Metadata } from "next";
import { Timeline } from "@/components/about/Timeline";
import { GreenRule, Parallax, Reveal, Stagger, StaggerItem } from "@/components/motion";
import { PageHero } from "@/components/site/PageHero";
import { SectionHeading } from "@/components/site/SectionHeading";
import { CtaBand } from "@/components/home/CtaBand";
import { Mark } from "@/components/brand/Logo";
import { Photo } from "@/components/site/Photo";
import { about, audienceValue, awards, differentiators, founder, photos, site } from "@/lib/site";

export const metadata: Metadata = {
  title: "About",
  description:
    "Established in 2011 and built on over four decades of security and life safety expertise, DECO Ventures is the strategic partner for companies navigating industry transitions.",
  alternates: { canonical: "/about" },
};

export default function AboutPage() {
  return (
    <>
      <PageHero
        label={`${site.legalName} · Est. ${site.founded} · ${site.location}`}
        title="The strategic partner for companies navigating industry transitions"
        lede={<p>{about.lede}</p>}
      />

      {/* The firm ------------------------------------------------------- */}
      <section className="bg-white py-24 lg:py-32">
        <div className="mx-auto max-w-[76rem] px-6 lg:px-8">
          <div className="grid gap-16 lg:grid-cols-[1fr_1fr] lg:gap-24">
            <div>
              <SectionHeading label="Who we help" title="Across the whole value chain" />
              <Reveal delay={0.16}>
                <p className="mt-8 text-[1.125rem] leading-[1.6] text-navy">
                  {about.whoWeHelp}
                </p>
              </Reveal>
              <Stagger as="ul" className="mt-10 space-y-6" gap={0.08}>
                {audienceValue.map((item) => (
                  <StaggerItem key={item.who} as="li">
                    <div className="border-l-2 border-line pl-5">
                      <p className="text-h3 text-navy">{item.who}</p>
                      <p className="mt-1.5 text-[0.9375rem] text-slate">{item.value}</p>
                    </div>
                  </StaggerItem>
                ))}
              </Stagger>
            </div>

            <div className="lg:pt-4">
              <Reveal from="right">
                <div className="rounded-[2rem] bg-mist p-10">
                  <p className="label text-slate">Our approach</p>
                  <GreenRule className="mt-5" />
                  <p className="mt-7 text-[1.125rem] leading-[1.6] text-navy">
                    {about.approach}
                  </p>
                  <p className="mt-6 text-body text-slate">{about.scope}</p>
                </div>
              </Reveal>

              <Reveal from="right" delay={0.12}>
                <p className="label mt-14 text-slate">What sets us apart</p>
                <GreenRule className="mt-5" />
              </Reveal>
              <Stagger as="ul" className="mt-7 space-y-4" gap={0.07}>
                {differentiators.map((line) => (
                  <StaggerItem key={line} as="li">
                    <div className="flex gap-3 border-b border-line pb-4 text-[1.0625rem] text-navy">
                      <span
                        aria-hidden="true"
                        className="mt-2.5 h-1.5 w-1.5 shrink-0 rounded-full bg-green"
                      />
                      {line}
                    </div>
                  </StaggerItem>
                ))}
              </Stagger>
            </div>
          </div>
        </div>
      </section>

      {/* George ---------------------------------------------------------- */}
      <section id="george" className="bg-mist py-24 lg:py-32">
        <div className="mx-auto max-w-[76rem] px-6 lg:px-8">
          <div className="grid gap-16 lg:grid-cols-[0.85fr_1.15fr] lg:gap-20">
            <Parallax speed={0.05}>
              <div className="relative lg:sticky lg:top-[calc(var(--header-h)+3rem)]">
                <div className="relative aspect-[4/5] overflow-hidden rounded-[2rem] bg-white">
                  <Photo
                    photo={photos.founderPortrait}
                    hint={`Photograph of ${founder.name} — relaxed and approachable, at ESX or across a table.`}
                    sizes="(max-width: 1024px) 100vw, 38vw"
                    preload
                  />
                </div>
                <span
                  aria-hidden="true"
                  className="split-bar absolute -bottom-2 left-8 right-8 rounded-full"
                />
              </div>
            </Parallax>

            <div>
              <Reveal>
                <p className="label text-slate">{founder.role}</p>
              </Reveal>
              <Reveal delay={0.06}>
                <h2 className="mt-3 text-h2 text-navy sm:text-h1">{founder.heading}</h2>
              </Reveal>
              <GreenRule className="mt-5" delay={0.12} />

              {founder.bio.map((paragraph, i) => (
                <Reveal key={i} delay={0.16 + i * 0.05}>
                  <p
                    className={
                      i === 0
                        ? "mt-8 text-[1.125rem] leading-[1.6] text-navy"
                        : "mt-6 text-body text-slate"
                    }
                  >
                    {paragraph}
                  </p>
                </Reveal>
              ))}

              <Reveal delay={0.3}>
                <p className="label mt-14 text-slate">Four decades, in order</p>
                <GreenRule className="mt-5" />
              </Reveal>
              <Timeline />
            </div>
          </div>
        </div>
      </section>

      {/* On stage — only rendered once a photograph is configured. */}
      {photos.founderStage ? (
        <section aria-hidden="true" className="bg-mist">
          <div className="relative aspect-[21/9] w-full overflow-hidden">
            <Photo
              photo={photos.founderStage}
              hint=""
              sizes="100vw"
            />
            <span
              className="pointer-events-none absolute inset-0 bg-linear-to-t from-navy/35 to-transparent"
            />
          </div>
        </section>
      ) : null}

      {/* Awards ---------------------------------------------------------- */}
      <section className="relative overflow-hidden bg-navy py-24 lg:py-32">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -left-40 bottom-0 hidden w-[32rem] opacity-[0.06] lg:block"
        >
          <Mark tone="white" />
        </div>
        <div className="relative mx-auto max-w-[76rem] px-6 lg:px-8">
          <SectionHeading
            label="Awards & milestones"
            title="Recognized by the industry he helped build"
            tone="dark"
          />
          <Stagger className="mt-16 grid gap-px overflow-hidden rounded-2xl bg-white/12 sm:grid-cols-2 lg:grid-cols-3">
            {awards.map((award) => (
              <StaggerItem key={award}>
                <div className="h-full bg-navy p-8">
                  <span className="block h-[3px] w-10 bg-green" aria-hidden="true" />
                  <p className="mt-6 text-h3 text-white">{award}</p>
                </div>
              </StaggerItem>
            ))}
          </Stagger>
        </div>
      </section>

      <CtaBand />
    </>
  );
}

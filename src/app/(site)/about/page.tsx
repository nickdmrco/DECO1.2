import type { Metadata } from "next";
import { GreenRule, Counter, Parallax, Reveal, Stagger, StaggerItem } from "@/components/motion";
import { PageHero } from "@/components/site/PageHero";
import { SectionHeading } from "@/components/site/SectionHeading";
import { CtaBand } from "@/components/home/CtaBand";
import { Mark } from "@/components/brand/Logo";
import { audiences, founder, site } from "@/lib/site";

export const metadata: Metadata = {
  title: "About",
  description:
    "DECO Ventures was founded in 2011 by George De Marco after four decades inside the security and life safety industry.",
};

/* PLACEHOLDER — the personality traits from the brand board, written out.
   Swap for George's own words when the copy lands. */
const principles = [
  {
    title: "Experienced, not old-fashioned",
    body: "Forty years of pattern recognition, pointed at what happens next — not at how it used to be done.",
  },
  {
    title: "Direct, not blunt",
    body: "Short sentences and plain words. You will always know where you stand, and why.",
  },
  {
    title: "Warm, not casual",
    body: "Relationship first, and still professional. These are the biggest decisions of an owner's career.",
  },
];

export default function AboutPage() {
  return (
    <>
      <PageHero
        label={`Est. ${site.founded} · ${site.location}`}
        title="On your side of the table since 2011"
        lede={
          <p>
            DECO Ventures is a strategic advisory firm for the security and life safety
            industry, founded by {founder.name} after four decades inside it.
          </p>
        }
      />

      <section className="bg-white py-24 lg:py-32">
        <div className="mx-auto max-w-[76rem] px-6 lg:px-8">
          <div className="grid gap-16 lg:grid-cols-[0.95fr_1.05fr] lg:gap-24">
            <Parallax speed={0.05}>
              <div className="relative">
                <div className="aspect-[4/5] overflow-hidden rounded-[2rem] bg-mist">
                  {/* PLACEHOLDER — photograph of George. */}
                  <div className="flex h-full items-center justify-center p-10 text-center">
                    <p className="text-[0.8125rem] leading-relaxed text-slate/70">
                      Photograph of {founder.name}
                      <br />
                      Relaxed and approachable — at ESX, on stage, or across a table.
                    </p>
                  </div>
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
                <h2 className="mt-3 text-h2 text-navy sm:text-h1">{founder.name}</h2>
              </Reveal>
              <GreenRule className="mt-5" delay={0.12} />
              <Reveal delay={0.16}>
                <p className="mt-8 text-[1.125rem] leading-[1.6] text-navy">{founder.blurb}</p>
              </Reveal>
              <Reveal delay={0.22}>
                <p className="mt-6 text-body text-slate">
                  He has run a security company, sold one, and spent the years since
                  making sure the next owner gets it right. That is the whole premise of
                  the firm.
                </p>
              </Reveal>
              <Stagger as="ul" className="mt-10 space-y-4" gap={0.07}>
                {founder.credentials.map((line) => (
                  <StaggerItem key={line} as="li">
                    <div className="flex gap-3 border-b border-line pb-4 text-[0.9375rem] text-navy">
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

      <section className="bg-navy py-24 lg:py-32">
        <div className="mx-auto max-w-[76rem] px-6 lg:px-8">
          <SectionHeading
            label="How we work with you"
            title="Three things you can count on"
            tone="dark"
          />
          <Stagger className="mt-16 grid gap-px overflow-hidden rounded-2xl bg-white/12 md:grid-cols-3">
            {principles.map((item) => (
              <StaggerItem key={item.title}>
                <div className="h-full bg-navy p-8">
                  <span className="block h-[3px] w-10 bg-green" aria-hidden="true" />
                  <h3 className="mt-6 text-h3 text-white">{item.title}</h3>
                  <p className="mt-4 text-[0.9375rem] leading-[1.6] text-white/70">
                    {item.body}
                  </p>
                </div>
              </StaggerItem>
            ))}
          </Stagger>
        </div>
      </section>

      <section className="relative overflow-hidden bg-white py-24 lg:py-32">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -left-40 bottom-0 hidden w-[30rem] opacity-[0.05] lg:block"
        >
          <Mark />
        </div>
        <div className="relative mx-auto max-w-[76rem] px-6 lg:px-8">
          <div className="grid gap-16 lg:grid-cols-2">
            <div>
              <SectionHeading label="Who we work with" title="Across the whole ecosystem" />
              <Stagger as="ul" className="mt-10 flex flex-wrap gap-3" gap={0.06}>
                {audiences.map((audience) => (
                  <StaggerItem key={audience} as="li">
                    <span className="inline-flex rounded-full border border-line px-5 py-2.5 text-[0.9375rem] text-navy transition-colors duration-300 hover:border-green">
                      {audience}
                    </span>
                  </StaggerItem>
                ))}
              </Stagger>
            </div>

            <dl className="grid gap-10 sm:grid-cols-2 lg:self-center">
              {[
                { value: 40, suffix: "+", label: "Years in the industry" },
                { value: 2011, suffix: "", label: "Firm founded", from: 1990 },
              ].map((stat) => (
                <Reveal key={stat.label}>
                  <dt className="text-[clamp(2.5rem,5vw,3.25rem)] font-semibold leading-none tracking-[-0.03em] text-blue">
                    <Counter to={stat.value} from={stat.from ?? 0} suffix={stat.suffix} />
                  </dt>
                  <dd className="mt-4 text-[0.9375rem] text-slate">{stat.label}</dd>
                </Reveal>
              ))}
            </dl>
          </div>
        </div>
      </section>

      <CtaBand />
    </>
  );
}

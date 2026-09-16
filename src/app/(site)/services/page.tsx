import type { Metadata } from "next";
import { ServiceIcon } from "@/components/brand/ServiceIcon";
import { GreenRule, Reveal, Stagger, StaggerItem } from "@/components/motion";
import { ArrowRight, ButtonLink } from "@/components/site/Button";
import { PageHero } from "@/components/site/PageHero";
import { CtaBand } from "@/components/home/CtaBand";
import { services } from "@/lib/site";

export const metadata: Metadata = {
  title: "Services",
  description:
    "Leadership and organizational development, strategy and growth, operational and financial excellence, industry networking, innovative technology, and investment and M&A advisory for the security and life safety industry.",
  alternates: { canonical: "/services" },
};

export default function ServicesPage() {
  return (
    <>
      <PageHero
        label="What we do"
        title="Securing your tomorrow"
        lede={
          <p>
            Strategic guidance for the security and life safety industry. Six practice
            areas, one point of contact — most engagements start in one and end up
            touching two or three.
          </p>
        }
      >
        <nav aria-label="Services" className="mt-12 flex flex-wrap gap-2.5">
          {services.map((service) => (
            <a
              key={service.slug}
              href={`#${service.slug}`}
              className="rounded-full border border-line bg-white px-4 py-2 text-[0.875rem] text-navy transition-colors duration-300 hover:border-green hover:text-deep"
            >
              {service.title}
            </a>
          ))}
        </nav>
      </PageHero>

      <div className="bg-white">
        {services.map((service, i) => (
          <section
            key={service.slug}
            id={service.slug}
            aria-labelledby={`${service.slug}-title`}
            className={`border-b border-line ${i % 2 === 1 ? "bg-mist" : "bg-white"}`}
          >
            <div className="mx-auto max-w-[76rem] px-6 py-20 lg:px-8 lg:py-28">
              <div
                className={`grid gap-12 lg:grid-cols-[0.9fr_1.1fr] lg:gap-20 ${
                  i % 2 === 1 ? "lg:[&>*:first-child]:order-2" : ""
                }`}
              >
                <Reveal from={i % 2 === 1 ? "right" : "left"}>
                  <p className="label text-slate">
                    {String(i + 1).padStart(2, "0")} / {String(services.length).padStart(2, "0")}
                  </p>
                  <ServiceIcon slug={service.slug} className="mt-8 h-12 w-12" />
                  <h2 id={`${service.slug}-title`} className="mt-7 text-h2 text-navy">
                    {service.title}
                  </h2>
                  <GreenRule className="mt-5" delay={0.1} />
                  <p className="mt-7 max-w-md text-[1.125rem] leading-[1.6] text-navy">
                    {service.summary}
                  </p>
                  {service.note ? (
                    <p className="mt-6 max-w-md border-l-2 border-green pl-4 text-[0.9375rem] leading-[1.55] text-slate">
                      {service.note}
                    </p>
                  ) : null}
                </Reveal>

                <Reveal from={i % 2 === 1 ? "left" : "right"} delay={0.1}>
                  <p className="label text-slate">What that looks like</p>
                  <Stagger as="ul" className="mt-7 grid gap-px overflow-hidden rounded-2xl border border-line bg-line sm:grid-cols-2">
                    {service.points.map((point) => (
                      <StaggerItem
                        key={point}
                        as="li"
                        className={i % 2 === 1 ? "bg-mist" : "bg-white"}
                      >
                        <div className="flex h-full gap-3 p-6">
                          <span
                            aria-hidden="true"
                            className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-green"
                          />
                          <span className="text-[0.9375rem] leading-[1.55] text-navy">
                            {point}
                          </span>
                        </div>
                      </StaggerItem>
                    ))}
                  </Stagger>
                  <Reveal delay={0.25}>
                    <ButtonLink href="/contact" variant="secondary" size="sm" className="mt-8">
                      Request a consultation
                      <ArrowRight />
                    </ButtonLink>
                  </Reveal>
                </Reveal>
              </div>
            </div>
          </section>
        ))}
      </div>

      <CtaBand />
    </>
  );
}

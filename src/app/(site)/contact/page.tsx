import type { Metadata } from "next";
import { GreenRule, Reveal } from "@/components/motion";
import { ContactForm } from "@/components/site/ContactForm";
import { Faq } from "@/components/site/Faq";
import { PageHero } from "@/components/site/PageHero";
import { SectionHeading } from "@/components/site/SectionHeading";
import { audienceValue, contactIntro, site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Request a consultation with DECO Ventures. Advisory for the security and life safety industry, based in Southern California.",
  alternates: { canonical: "/contact" },
};

export default function ContactPage() {
  return (
    <>
      <PageHero
        label="Get in touch"
        title="Send us a message"
        lede={<p>{contactIntro}</p>}
      />

      <section className="bg-white py-20 lg:py-28">
        <div className="mx-auto max-w-[76rem] px-6 lg:px-8">
          <div className="grid gap-14 lg:grid-cols-[1.25fr_0.75fr] lg:gap-20">
            <Reveal>
              <ContactForm />
            </Reveal>

            <Reveal delay={0.12} from="right">
              <div className="lg:sticky lg:top-[calc(var(--header-h)+2rem)]">
                <h2 className="label text-slate">Direct</h2>
                <GreenRule className="mt-4" />
                <ul className="mt-6 space-y-4 text-body">
                  <li>
                    <a
                      href={`mailto:${site.email}`}
                      className="text-deep underline-offset-4 transition-colors hover:text-navy hover:underline"
                    >
                      {site.email}
                    </a>
                  </li>
                  {site.phone ? (
                    <li>
                      <a
                        href={`tel:${site.phone.replace(/[^\d+]/g, "")}`}
                        className="text-deep underline-offset-4 transition-colors hover:text-navy hover:underline"
                      >
                        {site.phone}
                      </a>
                    </li>
                  ) : null}
                  <li>
                    <a
                      href={site.linkedin}
                      target="_blank"
                      rel="noreferrer"
                      className="text-deep underline-offset-4 transition-colors hover:text-navy hover:underline"
                    >
                      LinkedIn
                    </a>
                  </li>
                </ul>

                <p className="label mt-12 text-slate">Where we are</p>
                <GreenRule className="mt-4" />
                <p className="mt-6 text-body text-slate">
                  {site.location}
                  <br />
                  Working with clients across North America.
                </p>

                <p className="label mt-12 text-slate">Who we work with</p>
                <GreenRule className="mt-4" />
                <ul className="mt-6 space-y-5">
                  {audienceValue.map((item) => (
                    <li key={item.who}>
                      <p className="text-[0.9375rem] font-medium text-navy">{item.who}</p>
                      <p className="mt-1 text-[0.875rem] text-slate">{item.value}</p>
                    </li>
                  ))}
                </ul>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      <section className="border-t border-line bg-mist py-20 lg:py-28">
        <div className="mx-auto max-w-[46rem] px-6">
          <SectionHeading label="Questions" title="Before you write" align="center" />
          <Faq />
        </div>
      </section>
    </>
  );
}

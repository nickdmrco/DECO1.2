import type { Metadata } from "next";
import { GreenRule, Reveal } from "@/components/motion";
import { ContactForm } from "@/components/site/ContactForm";
import { PageHero } from "@/components/site/PageHero";
import { audiences, site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Request a consultation with DECO Ventures. A first conversation is exactly that — no deck, no pitch.",
};

export default function ContactPage() {
  return (
    <>
      <PageHero
        label="Get in touch"
        title="Tell us what you're working on"
        lede={
          <p>
            A first conversation is exactly that — a conversation. No deck, no pitch.
            Bring the question that has been sitting on your desk.
          </p>
        }
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
                <ul className="mt-6 space-y-2.5 text-[0.9375rem] text-navy">
                  {audiences.map((audience) => (
                    <li key={audience} className="flex gap-3">
                      <span
                        aria-hidden="true"
                        className="mt-2.5 h-1.5 w-1.5 shrink-0 rounded-full bg-green"
                      />
                      {audience}
                    </li>
                  ))}
                </ul>
              </div>
            </Reveal>
          </div>
        </div>
      </section>
    </>
  );
}

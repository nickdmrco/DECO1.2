import { GreenRule, Parallax, Reveal, Stagger, StaggerItem } from "@/components/motion";
import { ArrowRight, ButtonLink } from "@/components/site/Button";
import { awards, founder } from "@/lib/site";

/* George, as the face of the firm. The image slot is waiting for a real
   photograph: bright, natural light, relaxed and approachable. */
export function FounderTeaser() {
  return (
    <section className="bg-white py-28 lg:py-36">
      <div className="mx-auto max-w-[76rem] px-6 lg:px-8">
        <div className="grid items-center gap-16 lg:grid-cols-2 lg:gap-24">
          <Parallax speed={0.06} className="order-2 lg:order-1">
            <div className="relative">
              <div className="aspect-[4/5] w-full overflow-hidden rounded-[2rem] bg-mist">
                {/* PENDING — replace with a photograph of George. */}
                <div className="flex h-full w-full items-center justify-center p-10 text-center">
                  <p className="text-[0.8125rem] leading-relaxed text-slate/70">
                    Photograph of {founder.name}
                    <br />
                    Bright, natural light — on stage at ESX, or across a table.
                  </p>
                </div>
              </div>
              <span
                aria-hidden="true"
                className="split-bar absolute -bottom-2 left-8 right-8 rounded-full"
              />
            </div>
          </Parallax>

          <div className="order-1 lg:order-2">
            <Reveal>
              <p className="label text-slate">{founder.role}</p>
            </Reveal>
            <Reveal delay={0.06}>
              <h2 className="mt-3 text-h2 text-navy sm:text-h1">{founder.name}</h2>
            </Reveal>
            <GreenRule className="mt-5" delay={0.12} />
            <Reveal delay={0.16}>
              <p className="mt-7 text-body text-slate">{founder.blurb}</p>
            </Reveal>

            <Reveal delay={0.22}>
              <p className="label mt-10 text-slate">Awards &amp; milestones</p>
            </Reveal>
            <Stagger as="ul" className="mt-5 space-y-3" gap={0.06}>
              {awards.map((line) => (
                <StaggerItem key={line} as="li">
                  <div className="flex gap-3 text-[0.9375rem] text-navy">
                    <span
                      aria-hidden="true"
                      className="mt-2.5 h-1.5 w-1.5 shrink-0 rounded-full bg-green"
                    />
                    {line}
                  </div>
                </StaggerItem>
              ))}
            </Stagger>

            <Reveal delay={0.28}>
              <ButtonLink href="/about" variant="secondary" className="mt-10">
                Meet George
                <ArrowRight />
              </ButtonLink>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}

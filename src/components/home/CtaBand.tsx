import { Mark } from "@/components/brand/Logo";
import { Reveal } from "@/components/motion";
import { ArrowRight, ButtonLink } from "@/components/site/Button";
import { contactIntro } from "@/lib/site";

export function CtaBand() {
  return (
    <section data-ground="void"
      className="relative overflow-hidden">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -right-24 -top-24 w-[32rem] opacity-[0.06]"
      >
        <Mark tone="white" />
      </div>
      <div className="relative mx-auto max-w-[76rem] px-6 py-24 text-center lg:px-8 lg:py-32">
        <Reveal>
          <h2 className="mx-auto max-w-2xl text-h2 text-surf sm:text-h1">
            Request your consultation
          </h2>
        </Reveal>
        <Reveal delay={0.08}>
          <p className="mx-auto mt-6 max-w-2xl text-body text-muted">{contactIntro}</p>
        </Reveal>
        <Reveal delay={0.14}>
          <div className="mt-10 flex flex-wrap justify-center gap-4">
            <ButtonLink href="/contact" size="lg">
              Request a consultation
              <ArrowRight />
            </ButtonLink>
            <ButtonLink href="/services" variant="ghostLight" size="lg">
              See how we help
            </ButtonLink>
          </div>
        </Reveal>
      </div>
      <div className="split-bar" aria-hidden="true" />
    </section>
  );
}

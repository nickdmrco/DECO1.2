import { Reveal, GreenRule } from "@/components/motion";
import { Mark } from "@/components/brand/Logo";

/* What the mark means — the clearest statement of the partnership, given
   room to breathe. Mostly white, per the color balance. */
export function Positioning() {
  return (
    <section className="relative overflow-hidden bg-white py-28 lg:py-36">
      <div className="mx-auto max-w-[76rem] px-6 lg:px-8">
        <div className="grid items-center gap-16 lg:grid-cols-[1fr_0.85fr]">
          <div>
            <Reveal>
              <p className="label text-slate">What the mark means</p>
            </Reveal>
            <GreenRule className="mt-5" delay={0.08} />
            <Reveal delay={0.1}>
              <p className="mt-8 text-[clamp(1.5rem,3.4vw,2.25rem)] font-semibold leading-[1.25] tracking-[-0.02em] text-navy">
                Two hooks that hold because they interlock.{" "}
                <span className="text-blue">Blue is DECO&rsquo;s insight</span> and{" "}
                <span className="text-green">green is the client&rsquo;s growth</span>.
                Neither works alone, and that&rsquo;s the partnership.
              </p>
            </Reveal>
            <Reveal delay={0.18}>
              <p className="mt-8 max-w-xl text-body text-slate">
                DECO Ventures is a strategic advisory firm for the security and life
                safety industry. We work with owners and leadership teams on the
                decisions that are too consequential to get wrong and too close to see
                clearly from the inside.
              </p>
            </Reveal>
          </div>

          <Reveal from="right" delay={0.12} className="justify-self-center">
            <div className="relative aspect-square w-[min(22rem,70vw)]">
              <div className="absolute inset-0 rounded-[2rem] bg-mist" aria-hidden="true" />
              <Mark className="absolute inset-[18%]" animate="draw" trigger="view" />
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

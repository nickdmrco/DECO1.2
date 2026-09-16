import { Counter, Reveal, Stagger, StaggerItem } from "@/components/motion";
import { audienceValue, differentiators } from "@/lib/site";

/* Credibility band. Navy carries its 15% share of the page here. */
export function Stats() {
  return (
    <section className="relative overflow-hidden bg-navy py-24" aria-labelledby="who-we-serve">
      <div className="mx-auto max-w-[76rem] px-6 lg:px-8">
        <dl className="grid gap-12 border-b border-white/15 pb-16 sm:grid-cols-3">
          <Reveal>
            <dt className="text-[clamp(2.5rem,6vw,3.5rem)] font-semibold leading-none tracking-[-0.03em] text-white">
              <Counter to={40} suffix="+" />
            </dt>
            <span className="mt-4 block h-[3px] w-10 bg-green" aria-hidden="true" />
            <dd className="mt-4 text-[0.9375rem] text-white/70">
              Years focused only on security and life safety
            </dd>
          </Reveal>
          <Reveal delay={0.08}>
            {/* Years are stated, not counted: a count-up spends a second
                displaying a year that isn't true. */}
            <dt className="text-[clamp(2.5rem,6vw,3.5rem)] font-semibold leading-none tracking-[-0.03em] text-white">
              2011
            </dt>
            <span className="mt-4 block h-[3px] w-10 bg-green" aria-hidden="true" />
            <dd className="mt-4 text-[0.9375rem] text-white/70">
              The year DECO Ventures was founded
            </dd>
          </Reveal>
          <Reveal delay={0.16}>
            <dt className="text-[clamp(2.5rem,6vw,3.5rem)] font-semibold leading-none tracking-[-0.03em] text-white">
              1981
            </dt>
            <span className="mt-4 block h-[3px] w-10 bg-green" aria-hidden="true" />
            <dd className="mt-4 text-[0.9375rem] text-white/70">
              George founded Greater Alarm — the operating experience behind the advice
            </dd>
          </Reveal>
        </dl>

        <div className="mt-16 grid gap-14 lg:grid-cols-[1fr_1fr] lg:gap-20">
          <div>
            <Reveal>
              <h2 id="who-we-serve" className="label text-green">
                Who we serve
              </h2>
            </Reveal>
            <Stagger as="ul" className="mt-8 space-y-6" gap={0.08}>
              {audienceValue.map((item) => (
                <StaggerItem key={item.who} as="li">
                  <div className="border-l-2 border-white/15 pl-5">
                    <p className="text-h3 text-white">{item.who}</p>
                    <p className="mt-1.5 text-[0.9375rem] text-white/70">{item.value}</p>
                  </div>
                </StaggerItem>
              ))}
            </Stagger>
          </div>

          <div>
            <Reveal>
              <h2 className="label text-green">Why owners call us</h2>
            </Reveal>
            <Stagger as="ul" className="mt-8 space-y-4" gap={0.08}>
              {differentiators.map((line) => (
                <StaggerItem key={line} as="li">
                  <div className="flex gap-3 border-b border-white/12 pb-4 text-[1.0625rem] text-white/90">
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
  );
}

import { Counter, Reveal, Stagger, StaggerItem } from "@/components/motion";
import { audiences } from "@/lib/site";

/* Credibility band. Navy carries its 15% share of the page here. */
export function Stats() {
  return (
    <section className="relative overflow-hidden bg-navy py-24" aria-labelledby="who-we-serve">
      <div className="mx-auto max-w-[76rem] px-6 lg:px-8">
        <dl className="grid gap-12 border-b border-white/15 pb-16 sm:grid-cols-3">
          {[
            { value: 40, suffix: "+", label: "Years in security and life safety" },
            { value: 2011, suffix: "", label: "Advising owners since" },
            { value: 6, suffix: "", label: "Practice areas, one point of contact" },
          ].map((stat, i) => (
            <Reveal key={stat.label} delay={i * 0.08}>
              <dt className="text-[clamp(2.5rem,6vw,3.5rem)] font-semibold leading-none tracking-[-0.03em] text-white">
                <Counter to={stat.value} from={stat.value > 100 ? 1990 : 0} suffix={stat.suffix} />
              </dt>
              <span className="mt-4 block h-[3px] w-10 bg-green" aria-hidden="true" />
              <dd className="mt-4 text-[0.9375rem] text-white/70">{stat.label}</dd>
            </Reveal>
          ))}
        </dl>

        <div className="mt-16">
          <Reveal>
            <h2 id="who-we-serve" className="label text-green">
              Who we&rsquo;re talking to
            </h2>
          </Reveal>
          <Stagger as="ul" className="mt-8 flex flex-wrap gap-3" gap={0.06}>
            {audiences.map((audience) => (
              <StaggerItem key={audience} as="li">
                <span className="inline-flex rounded-full border border-white/20 px-5 py-2.5 text-[0.9375rem] text-white/85 transition-colors duration-300 hover:border-green hover:text-white">
                  {audience}
                </span>
              </StaggerItem>
            ))}
          </Stagger>
        </div>
      </div>
    </section>
  );
}

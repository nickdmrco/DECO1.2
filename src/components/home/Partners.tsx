import { Reveal, Stagger, StaggerItem } from "@/components/motion";
import { partners } from "@/lib/site";

/* Strategic partners. Set as type for now — swap each entry for a logo when
   the files arrive, keeping the same grid. */
export function Partners() {
  return (
    <section data-ground="deep"
      className="border-y border-line py-16"
      aria-labelledby="partners">
      <div className="mx-auto max-w-[76rem] px-6 lg:px-8">
        <Reveal>
          <h2 id="partners" className="label text-center text-muted">
            Strategic partners
          </h2>
        </Reveal>
        <Stagger
          as="ul"
          className="mt-10 flex flex-wrap items-center justify-center gap-x-12 gap-y-6"
          gap={0.07}
        >
          {partners.map((partner) => (
            <StaggerItem key={partner} as="li">
              <span className="text-[1.0625rem] font-medium text-surf/55 transition-colors duration-300 hover:text-surf">
                {partner}
              </span>
            </StaggerItem>
          ))}
        </Stagger>
      </div>
    </section>
  );
}

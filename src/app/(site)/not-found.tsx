import { Mark } from "@/components/brand/Logo";
import { ArrowRight, ButtonLink } from "@/components/site/Button";

export default function NotFound() {
  return (
    <section data-ground="raised" className="flex min-h-[70vh] items-center pt-[var(--header-h)]">
      <div className="mx-auto max-w-[76rem] px-6 py-24 text-center lg:px-8">
        <Mark className="mx-auto w-20" animate="draw" />
        <p className="label mt-10 text-muted">404</p>
        <h1 className="mt-4 text-h2 text-surf sm:text-h1">This page isn&rsquo;t here.</h1>
        <span className="rule-green mx-auto mt-6" aria-hidden="true" />
        <p className="mx-auto mt-6 max-w-md text-body text-muted">
          The link may be old, or the page may have moved. Start from the top, or tell us
          what you were looking for.
        </p>
        <div className="mt-10 flex flex-wrap justify-center gap-4">
          <ButtonLink href="/">
            Back to home
            <ArrowRight />
          </ButtonLink>
          <ButtonLink href="/contact" variant="secondary">
            Get in touch
          </ButtonLink>
        </div>
      </div>
    </section>
  );
}

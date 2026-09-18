import Link from "next/link";
import { LogoHorizontal } from "@/components/brand/Logo";
import { ArrowRight, ButtonLink } from "@/components/site/Button";
import { nav, services, site } from "@/lib/site";

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="bg-void text-surf">
      <div className="mx-auto max-w-[76rem] px-6 py-20 lg:px-8">
        <div className="grid gap-14 md:grid-cols-[1.2fr_1fr_1fr]">
          <div>
            <LogoHorizontal size={28} tone="default" />
            <p className="mt-6 max-w-sm text-body text-muted">{site.positioning}</p>
            <p className="label mt-8 text-kelp">
              Est. {site.founded} · {site.location}
            </p>
            <ButtonLink href="/contact" className="mt-8">
              Request a consultation
              <ArrowRight />
            </ButtonLink>
          </div>

          <nav aria-label="Services">
            <h2 className="label text-muted/70">Services</h2>
            <ul className="mt-5 space-y-3">
              {services.map((service) => (
                <li key={service.slug}>
                  <Link
                    href={`/services#${service.slug}`}
                    className="text-[0.9375rem] text-muted transition-colors hover:text-kelp"
                  >
                    {service.title}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <nav aria-label="Footer">
            <h2 className="label text-muted/70">Company</h2>
            <ul className="mt-5 space-y-3">
              {nav.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="text-[0.9375rem] text-muted transition-colors hover:text-kelp"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>

            <h2 className="label mt-10 text-muted/70">Get in touch</h2>
            <ul className="mt-5 space-y-3 text-[0.9375rem] text-muted">
              <li>
                <a href={`mailto:${site.email}`} className="transition-colors hover:text-kelp">
                  {site.email}
                </a>
              </li>
              {site.phone ? (
                <li>
                  <a
                    href={`tel:${site.phone.replace(/[^\d+]/g, "")}`}
                    className="transition-colors hover:text-kelp"
                  >
                    {site.phone}
                  </a>
                </li>
              ) : null}
              <li>
                <a
                  href={site.linkedin}
                  className="transition-colors hover:text-kelp"
                  target="_blank"
                  rel="noreferrer"
                >
                  LinkedIn
                </a>
              </li>
            </ul>
          </nav>
        </div>

        <div className="mt-16 flex flex-col gap-3 border-t border-line pt-8 text-[0.8125rem] text-muted/75 sm:flex-row sm:items-center sm:justify-between">
          <p>
            © {year} {site.legalName}. All Rights Reserved.
          </p>
          <p>{site.tagline}</p>
        </div>
      </div>

      {/* The split bar along the bottom edge — brand board §06. */}
      <div className="split-bar" aria-hidden="true" />
    </footer>
  );
}

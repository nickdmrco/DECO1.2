import Link from "next/link";
import { LogoHorizontal } from "@/components/brand/Logo";
import { ArrowRight, ButtonLink } from "@/components/site/Button";
import { nav, services, site } from "@/lib/site";

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="bg-navy text-white">
      <div className="mx-auto max-w-[76rem] px-6 py-20 lg:px-8">
        <div className="grid gap-14 md:grid-cols-[1.2fr_1fr_1fr]">
          <div>
            <LogoHorizontal size={28} tone="reversed" />
            <p className="mt-6 max-w-sm text-body text-white/70">{site.positioning}</p>
            <p className="label mt-8 text-green">
              Est. {site.founded} · {site.location}
            </p>
            <ButtonLink href="/contact" className="mt-8">
              Request a consultation
              <ArrowRight />
            </ButtonLink>
          </div>

          <nav aria-label="Services">
            <h2 className="label text-white/50">Services</h2>
            <ul className="mt-5 space-y-3">
              {services.map((service) => (
                <li key={service.slug}>
                  <Link
                    href={`/services#${service.slug}`}
                    className="text-[0.9375rem] text-white/80 transition-colors hover:text-green"
                  >
                    {service.title}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <nav aria-label="Footer">
            <h2 className="label text-white/50">Company</h2>
            <ul className="mt-5 space-y-3">
              {nav.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="text-[0.9375rem] text-white/80 transition-colors hover:text-green"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>

            <h2 className="label mt-10 text-white/50">Get in touch</h2>
            <ul className="mt-5 space-y-3 text-[0.9375rem] text-white/80">
              <li>
                <a href={`mailto:${site.email}`} className="transition-colors hover:text-green">
                  {site.email}
                </a>
              </li>
              {site.phone ? (
                <li>
                  <a
                    href={`tel:${site.phone.replace(/[^\d+]/g, "")}`}
                    className="transition-colors hover:text-green"
                  >
                    {site.phone}
                  </a>
                </li>
              ) : null}
              <li>
                <a
                  href={site.linkedin}
                  className="transition-colors hover:text-green"
                  target="_blank"
                  rel="noreferrer"
                >
                  LinkedIn
                </a>
              </li>
            </ul>
          </nav>
        </div>

        <div className="mt-16 flex flex-col gap-3 border-t border-white/15 pt-8 text-[0.8125rem] text-white/55 sm:flex-row sm:items-center sm:justify-between">
          <p>
            © {year} {site.name}. All rights reserved.
          </p>
          <p>{site.tagline}</p>
        </div>
      </div>

      {/* The split bar along the bottom edge — brand board §06. */}
      <div className="split-bar" aria-hidden="true" />
    </footer>
  );
}

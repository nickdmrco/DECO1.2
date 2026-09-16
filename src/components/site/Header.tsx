"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { AnimatePresence, motion, useMotionValueEvent, useScroll } from "motion/react";
import { useEffect, useState } from "react";
import { LogoHorizontal } from "@/components/brand/Logo";
import { ArrowRight, ButtonLink } from "@/components/site/Button";
import { nav } from "@/lib/site";

const EASE = [0.22, 1, 0.36, 1] as const;

export function Header() {
  const pathname = usePathname();
  const [condensed, setCondensed] = useState(false);
  const [open, setOpen] = useState(false);
  const { scrollY } = useScroll();

  useMotionValueEvent(scrollY, "change", (y) => setCondensed(y > 24));

  // Close the mobile panel on navigation, and lock the page behind it.
  useEffect(() => setOpen(false), [pathname]);
  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  const isActive = (href: string) => pathname === href || pathname.startsWith(`${href}/`);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-[background-color,box-shadow,backdrop-filter] duration-500 ${
        condensed || open
          ? "bg-white/90 shadow-[0_1px_0_var(--color-line)] backdrop-blur-md"
          : "bg-transparent"
      }`}
      style={{ ["--header-h" as string]: "5.5rem" }}
    >
      <div className="mx-auto flex max-w-[76rem] items-center justify-between px-6 lg:px-8">
        <motion.div
          className="flex items-center py-5"
          animate={{ scale: condensed ? 0.88 : 1 }}
          style={{ transformOrigin: "left center" }}
          transition={{ duration: 0.45, ease: EASE }}
        >
          <Link href="/" aria-label="DECO Ventures — home" className="inline-flex">
            <LogoHorizontal size={26} />
          </Link>
        </motion.div>

        <nav aria-label="Primary" className="hidden items-center gap-1 md:flex">
          {nav.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              aria-current={isActive(item.href) ? "page" : undefined}
              className="relative px-4 py-2 text-[0.9375rem] font-medium text-navy/85 transition-colors hover:text-navy"
            >
              {item.label}
              {isActive(item.href) ? (
                <motion.span
                  layoutId="nav-underline"
                  className="absolute inset-x-4 -bottom-0.5 h-[3px] rounded-full bg-green"
                  transition={{ duration: 0.45, ease: EASE }}
                />
              ) : null}
            </Link>
          ))}
          <ButtonLink href="/contact" size="sm" className="ml-3">
            Request a consultation
            <ArrowRight />
          </ButtonLink>
        </nav>

        <button
          type="button"
          onClick={() => setOpen((v) => !v)}
          aria-expanded={open}
          aria-controls="mobile-nav"
          className="-mr-2 inline-flex h-11 w-11 items-center justify-center rounded-full text-navy md:hidden"
        >
          <span className="sr-only">{open ? "Close menu" : "Open menu"}</span>
          <svg viewBox="0 0 24 24" className="h-6 w-6" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round">
            <motion.path animate={{ d: open ? "M6 6 L18 18" : "M4 8 L20 8" }} transition={{ duration: 0.3, ease: EASE }} />
            <motion.path animate={{ opacity: open ? 0 : 1 }} d="M4 16 L20 16" transition={{ duration: 0.2 }} />
            <motion.path animate={{ d: open ? "M18 6 L6 18" : "M4 16 L20 16", opacity: open ? 1 : 0 }} transition={{ duration: 0.3, ease: EASE }} />
          </svg>
        </button>
      </div>

      <AnimatePresence>
        {open ? (
          <motion.div
            id="mobile-nav"
            key="mobile-nav"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.4, ease: EASE }}
            className="overflow-hidden border-t border-line bg-white md:hidden"
          >
            <nav aria-label="Mobile" className="mx-auto max-w-[76rem] px-6 py-6">
              <ul className="flex flex-col">
                {nav.map((item, i) => (
                  <motion.li
                    key={item.href}
                    initial={{ opacity: 0, y: 12 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.06 + i * 0.05, duration: 0.4, ease: EASE }}
                  >
                    <Link
                      href={item.href}
                      className="block border-b border-line py-4 text-h3 text-navy"
                    >
                      {item.label}
                    </Link>
                  </motion.li>
                ))}
              </ul>
              <ButtonLink href="/contact" className="mt-6 w-full">
                Request a consultation
                <ArrowRight />
              </ButtonLink>
            </nav>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </header>
  );
}

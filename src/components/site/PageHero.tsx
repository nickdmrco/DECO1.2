"use client";

import { motion, useReducedMotion } from "motion/react";
import type { ReactNode } from "react";
import { Mark } from "@/components/brand/Logo";

const EASE = [0.22, 1, 0.36, 1] as const;

/** The interior-page opener: label, title, lede, over a mist ground. */
export function PageHero({
  label,
  title,
  lede,
  children,
}: {
  label: string;
  title: string;
  lede?: ReactNode;
  children?: ReactNode;
}) {
  const reduced = useReducedMotion();
  const words = title.split(" ");

  return (
    <section data-ground="raised" className="relative overflow-hidden pb-20 pt-[calc(var(--header-h)+4rem)] lg:pb-28 lg:pt-[calc(var(--header-h)+6rem)]">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -right-[10%] -top-[30%] hidden w-[36rem] opacity-[0.06] md:block"
      >
        <Mark />
      </div>

      <div className="relative mx-auto max-w-[76rem] px-6 lg:px-8">
        <motion.p
          className="label flex items-center gap-3 text-muted"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: EASE }}
        >
          <span className="inline-block h-px w-8 bg-kelp" aria-hidden="true" />
          {label}
        </motion.p>

        <h1 className="mt-6 max-w-4xl text-[clamp(2.25rem,5.5vw,3.5rem)] font-semibold leading-[1.05] tracking-[-0.03em] text-surf">
          <span className="sr-only">{title}</span>
          <span aria-hidden="true" className="flex flex-wrap gap-x-[0.26em]">
            {words.map((word, i) => (
              <span key={`${word}-${i}`} className="inline-block overflow-hidden pb-[0.08em]">
                <motion.span
                  className="inline-block"
                  initial={reduced ? { opacity: 0 } : { y: "108%" }}
                  animate={reduced ? { opacity: 1 } : { y: "0%" }}
                  transition={{ duration: 0.85, delay: 0.12 + i * 0.05, ease: EASE }}
                >
                  {word}
                </motion.span>
              </span>
            ))}
          </span>
        </h1>

        {lede ? (
          <motion.div
            className="mt-8 max-w-2xl text-[clamp(1.0625rem,2vw,1.25rem)] leading-[1.55] text-muted"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.35, ease: EASE }}
          >
            {lede}
          </motion.div>
        ) : null}

        {children ? (
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.45, ease: EASE }}
          >
            {children}
          </motion.div>
        ) : null}
      </div>
    </section>
  );
}

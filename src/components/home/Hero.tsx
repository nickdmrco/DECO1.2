"use client";

import { motion, useReducedMotion, useScroll, useSpring, useTransform } from "motion/react";
import { useRef } from "react";
import { Mark } from "@/components/brand/Logo";
import { HeroField } from "@/components/home/HeroField";
import { ArrowRight, ButtonLink } from "@/components/site/Button";
import { Magnetic } from "@/components/motion/Magnetic";
import { site } from "@/lib/site";

const EASE = [0.22, 1, 0.36, 1] as const;

/* The tagline, colored the way the brand board sets it. */
const TAGLINE = [
  { word: "Guide.", className: "text-blue" },
  { word: "Innovate.", className: "text-surf" },
  { word: "Thrive.", className: "text-kelp" },
];

export function Hero() {
  const ref = useRef<HTMLElement>(null);
  const reduced = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });

  /* Depth: the ghost mark, the copy, and the ground move at different rates. */
  const markY = useSpring(useTransform(scrollYProgress, [0, 1], [0, 240]), {
    stiffness: 90,
    damping: 28,
  });
  const markRotate = useTransform(scrollYProgress, [0, 1], [0, 28]);
  const markScale = useTransform(scrollYProgress, [0, 1], [1, 1.18]);
  const copyY = useTransform(scrollYProgress, [0, 1], [0, 90]);
  const glowY = useTransform(scrollYProgress, [0, 1], [0, 140]);
  const copyOpacity = useTransform(scrollYProgress, [0, 0.7], [1, 0]);

  return (
    <section
      ref={ref}
      className="relative flex min-h-[100svh] items-center overflow-hidden pt-[var(--header-h)]"
    >
      {/* The lattice, behind everything. */}
      <HeroField />

      {/* Light bleeding from behind the mark — the two accents, lit rather
          than printed. Blurred radial gradients, so they cost one paint. */}
      <motion.div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0"
        style={reduced ? undefined : { y: glowY }}
      >
        <div className="glow-blue absolute -right-[10%] top-[6%] h-[38rem] w-[38rem] opacity-30 blur-[90px]" />
        <div className="glow-kelp absolute right-[6%] top-[42%] h-[26rem] w-[26rem] opacity-25 blur-[80px]" />
        <div className="glow-blue absolute -left-[15%] bottom-[-10%] h-[30rem] w-[30rem] opacity-[0.18] blur-[100px]" />
      </motion.div>
      <div aria-hidden="true" className="vignette pointer-events-none absolute inset-0" />

      {/* The mark at architectural scale, drifting against the scroll. */}
      <motion.div
        aria-hidden="true"
        className="pointer-events-none absolute -right-[18%] top-1/2 hidden w-[52rem] -translate-y-1/2 opacity-[0.16] sm:block lg:-right-[8%]"
        style={reduced ? undefined : { y: markY, rotate: markRotate, scale: markScale }}
      >
        <Mark className="h-full w-full" />
      </motion.div>

      <motion.div
        className="relative mx-auto w-full max-w-[76rem] px-6 py-24 lg:px-8"
        style={reduced ? undefined : { y: copyY, opacity: copyOpacity }}
      >
        <div className="max-w-3xl">
          <motion.p
            className="label flex items-center gap-3 text-muted"
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.15, ease: EASE }}
          >
            <span className="inline-block h-px w-8 bg-kelp" aria-hidden="true" />
            Est. {site.founded} · {site.location}
          </motion.p>

          <h1 className="mt-7 text-[clamp(2.75rem,8vw,4.5rem)] font-semibold leading-[1] tracking-[-0.03em]">
            <span className="sr-only">{site.tagline}</span>
            <span aria-hidden="true" className="flex flex-wrap gap-x-[0.28em] gap-y-1">
              {TAGLINE.map((part, i) => (
                <span key={part.word} className="inline-block overflow-hidden pb-[0.08em]">
                  <motion.span
                    className={`inline-block ${part.className}`}
                    initial={reduced ? { opacity: 0 } : { y: "108%" }}
                    animate={reduced ? { opacity: 1 } : { y: "0%" }}
                    transition={{ duration: 0.95, delay: 0.3 + i * 0.12, ease: EASE }}
                  >
                    {part.word}
                  </motion.span>
                </span>
              ))}
            </span>
          </h1>

          <motion.p
            className="mt-8 max-w-2xl text-[clamp(1.125rem,2.4vw,1.5rem)] leading-[1.4] font-medium text-surf"
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.72, ease: EASE }}
          >
            {site.positioning}
          </motion.p>

          <motion.div
            className="mt-10 flex flex-wrap items-center gap-4"
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.86, ease: EASE }}
          >
            <Magnetic>
              <ButtonLink href="/contact" size="lg">
                Request a consultation
                <ArrowRight />
              </ButtonLink>
            </Magnetic>
            <Magnetic>
              <ButtonLink href="/about" variant="secondary" size="lg">
                Meet George
              </ButtonLink>
            </Magnetic>
          </motion.div>
        </div>
      </motion.div>

      <motion.a
        href="#what-we-do"
        aria-label="Scroll to what we do"
        className="absolute bottom-8 left-1/2 hidden -translate-x-1/2 flex-col items-center gap-2 text-muted md:flex"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8, delay: 1.3 }}
      >
        <span className="label text-[0.625rem]">Scroll</span>
        <span className="relative block h-10 w-px bg-line" aria-hidden="true">
          <motion.span
            className="absolute inset-x-0 top-0 block h-4 bg-kelp"
            animate={reduced ? undefined : { y: ["-100%", "250%"] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          />
        </span>
      </motion.a>
    </section>
  );
}

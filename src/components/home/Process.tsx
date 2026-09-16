"use client";

import { motion, useReducedMotion, useScroll, useSpring, useTransform } from "motion/react";
import { useRef } from "react";
import { Mark } from "@/components/brand/Logo";
import { process } from "@/lib/site";

const TONE = {
  blue: "text-blue",
  navy: "text-navy",
  green: "text-green",
} as const;

/* A scrubbed scene: the left column sticks while the three phases pass it.
   The mark rotates a quarter turn across the section, and the rail fills. */
export function Process() {
  const ref = useRef<HTMLDivElement>(null);
  const reduced = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start center", "end end"],
  });
  const fill = useSpring(scrollYProgress, { stiffness: 160, damping: 34, mass: 0.4 });
  const rotate = useTransform(scrollYProgress, [0, 1], [0, 90]);

  return (
    <section className="bg-mist py-28 lg:py-36" aria-labelledby="how-we-work">
      <div className="mx-auto max-w-[76rem] px-6 lg:px-8">
        <div ref={ref} className="grid gap-16 lg:grid-cols-[0.8fr_1.2fr] lg:gap-24">
          <div className="lg:sticky lg:top-[calc(var(--header-h)+4rem)] lg:h-fit">
            <p className="label text-slate">How we work</p>
            <h2 id="how-we-work" className="mt-3 text-h2 text-navy sm:text-h1">
              Guide. Innovate. Thrive.
            </h2>
            <span className="rule-green mt-5" aria-hidden="true" />
            <p className="mt-6 max-w-sm text-body text-slate">
              It is not a slogan on a wall. It is the order the work happens in.
            </p>
            <motion.div
              className="mt-12 hidden w-40 lg:block"
              style={reduced ? undefined : { rotate }}
              aria-hidden="true"
            >
              <Mark />
            </motion.div>
          </div>

          <ol className="relative">
            {/* The rail, filling as the reader moves through the phases. */}
            <span
              aria-hidden="true"
              className="absolute left-0 top-2 hidden h-[calc(100%-1rem)] w-[3px] bg-line sm:block"
            >
              <motion.span
                className="block h-full w-full origin-top bg-green"
                style={reduced ? { scaleY: 1 } : { scaleY: fill }}
              />
            </span>

            {process.map((step, i) => (
              <motion.li
                key={step.key}
                className="relative pb-20 last:pb-0 sm:pl-14"
                initial={{ opacity: 0, y: 32 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "0px 0px -20% 0px" }}
                transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
              >
                <span
                  aria-hidden="true"
                  className="absolute -left-[7px] top-1.5 hidden h-4 w-4 rounded-full border-[3px] border-mist bg-navy sm:block"
                />
                <p className="label text-slate">Phase {String(i + 1).padStart(2, "0")}</p>
                <h3 className={`mt-2 text-h2 ${TONE[step.tone]}`}>{step.key}</h3>
                <p className="mt-4 text-h3 text-navy">{step.title}</p>
                <p className="mt-4 max-w-xl text-body text-slate">{step.body}</p>
              </motion.li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}

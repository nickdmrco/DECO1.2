"use client";

import { motion, useReducedMotion, useScroll, useSpring } from "motion/react";
import { useRef } from "react";
import { timeline } from "@/lib/site";

/* Four decades, drawn as a rail that fills as you read it. */
export function Timeline() {
  const ref = useRef<HTMLOListElement>(null);
  const reduced = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start 75%", "end 60%"],
  });
  const fill = useSpring(scrollYProgress, { stiffness: 160, damping: 34, mass: 0.4 });

  return (
    <ol ref={ref} className="relative mt-12">
      <span
        aria-hidden="true"
        className="absolute left-[4.5rem] top-3 hidden h-[calc(100%-1.5rem)] w-[3px] -translate-x-1/2 bg-line sm:block"
      >
        <motion.span
          className="block h-full w-full origin-top bg-kelp"
          style={reduced ? { scaleY: 1 } : { scaleY: fill }}
        />
      </span>

      {timeline.map((entry, i) => (
        <motion.li
          key={entry.year}
          className="relative flex gap-6 pb-9 last:pb-0 sm:gap-0"
          initial={{ opacity: 0, x: -16 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: "0px 0px -15% 0px" }}
          transition={{ duration: 0.6, delay: i * 0.04, ease: [0.22, 1, 0.36, 1] }}
        >
          <span className="w-16 shrink-0 font-medium tabular-nums text-blue sm:w-[4.5rem] sm:pr-6 sm:text-right">
            {entry.year}
          </span>
          <span
            aria-hidden="true"
            className="absolute left-[4.5rem] top-[0.45rem] hidden h-3 w-3 -translate-x-1/2 rounded-full border-[3px] border-line bg-void sm:block"
          />
          <span className="text-[1.0625rem] leading-snug text-surf sm:pl-8">
            {entry.label}
          </span>
        </motion.li>
      ))}
    </ol>
  );
}

"use client";

import { motion, useReducedMotion } from "motion/react";
import { Mark } from "@/components/brand/Logo";
import { GreenRule, Reveal } from "@/components/motion";
import { about, challenges } from "@/lib/site";

const EASE = [0.22, 1, 0.36, 1] as const;

/* Opens on the owner's world, not ours: the four pressures stack up, then
   the answer lands. Mostly white, per the color balance in the brand board.
   Text stays navy — blue on white is headlines only, green never. */
export function Challenges() {
  const reduced = useReducedMotion();

  return (
    <section className="relative overflow-hidden bg-white py-28 lg:py-36">
      <div className="mx-auto max-w-[76rem] px-6 lg:px-8">
        <div className="grid items-center gap-16 lg:grid-cols-[1fr_0.8fr]">
          <div>
            <Reveal>
              <p className="label text-slate">What we solve</p>
            </Reveal>
            <GreenRule className="mt-5" delay={0.08} />

            <motion.h2
              className="mt-8 text-[clamp(1.75rem,4vw,2.75rem)] font-semibold leading-[1.15] tracking-[-0.025em] text-navy"
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, margin: "0px 0px -12% 0px" }}
              variants={{
                hidden: {},
                show: { transition: { staggerChildren: 0.11, delayChildren: 0.12 } },
              }}
            >
              {challenges.map((line) => (
                <motion.span
                  key={line}
                  className="block"
                  variants={{
                    hidden: { opacity: 0, y: reduced ? 0 : 18 },
                    show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: EASE } },
                  }}
                >
                  {line}
                </motion.span>
              ))}
            </motion.h2>

            <Reveal delay={0.55}>
              <p className="mt-9 max-w-xl border-l-2 border-green pl-5 text-[1.25rem] font-medium leading-[1.45] text-navy">
                We address them by combining strategic planning with tactical execution.
              </p>
            </Reveal>

            <Reveal delay={0.62}>
              <p className="mt-8 max-w-xl text-body text-slate">{about.whoWeHelp}</p>
            </Reveal>
          </div>

          <Reveal from="right" delay={0.12} className="justify-self-center">
            <div className="relative aspect-square w-[min(20rem,65vw)]">
              <div className="absolute inset-0 rounded-[2rem] bg-mist" aria-hidden="true" />
              <Mark className="absolute inset-[18%]" animate="draw" trigger="view" />
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

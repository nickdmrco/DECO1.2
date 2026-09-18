"use client";

import { motion, useReducedMotion } from "motion/react";
import { useEffect, useState } from "react";

/* The page ground is a single fixed layer that crossfades between tones as
   sections cross the middle of the viewport, so the page reads as a
   sequence of shots rather than a stack of blocks.

   Sections opt in with `data-ground="deep|void|raised"` and render their own
   background as transparent. Anything that doesn't opt in keeps painting its
   own background over this layer, so partial adoption is safe. */

const GROUNDS: Record<string, string> = {
  deep: "#0A1F33",
  void: "#0B1117",
  raised: "#10304C",
};

export function SceneGround() {
  const [ground, setGround] = useState("deep");
  const reduced = useReducedMotion();

  useEffect(() => {
    const sections = Array.from(
      document.querySelectorAll<HTMLElement>("[data-ground]"),
    );
    if (sections.length === 0) return;

    /* Only the section crossing the middle band counts as active, so the
       ground changes once per section rather than twice per boundary. */
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            const next = entry.target.getAttribute("data-ground");
            if (next && GROUNDS[next]) setGround(next);
          }
        }
      },
      { rootMargin: "-45% 0px -45% 0px", threshold: 0 },
    );

    for (const section of sections) observer.observe(section);
    return () => observer.disconnect();
  }, []);

  return (
    <motion.div
      aria-hidden="true"
      className="fixed inset-0 -z-10"
      initial={false}
      animate={{ backgroundColor: GROUNDS[ground] }}
      transition={{ duration: reduced ? 0 : 0.9, ease: [0.22, 1, 0.36, 1] }}
    />
  );
}

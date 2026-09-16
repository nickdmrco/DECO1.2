"use client";

import { AnimatePresence, motion } from "motion/react";
import { useState } from "react";
import { faq } from "@/lib/site";

const EASE = [0.22, 1, 0.36, 1] as const;

export function Faq() {
  const [open, setOpen] = useState<number | null>(0);

  return (
    <ul className="mt-10 overflow-hidden rounded-2xl border border-line bg-white">
      {faq.map((item, i) => {
        const isOpen = open === i;
        return (
          <li key={item.q} className="border-b border-line last:border-0">
            <h3>
              <button
                type="button"
                onClick={() => setOpen(isOpen ? null : i)}
                aria-expanded={isOpen}
                aria-controls={`faq-panel-${i}`}
                className="flex w-full items-start justify-between gap-6 px-6 py-5 text-left transition-colors duration-300 hover:bg-mist sm:px-8"
              >
                <span className="text-[1.0625rem] font-medium text-navy">{item.q}</span>
                <motion.span
                  aria-hidden="true"
                  className="relative mt-2 block h-3 w-3 shrink-0"
                  animate={{ rotate: isOpen ? 90 : 0 }}
                  transition={{ duration: 0.35, ease: EASE }}
                >
                  <span className="absolute left-0 top-[5px] block h-[2px] w-3 rounded bg-green" />
                  <motion.span
                    className="absolute left-[5px] top-0 block h-3 w-[2px] rounded bg-green"
                    animate={{ opacity: isOpen ? 0 : 1 }}
                    transition={{ duration: 0.25 }}
                  />
                </motion.span>
              </button>
            </h3>
            <AnimatePresence initial={false}>
              {isOpen ? (
                <motion.div
                  id={`faq-panel-${i}`}
                  key="panel"
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.4, ease: EASE }}
                  className="overflow-hidden"
                >
                  <p className="px-6 pb-6 pr-12 text-body text-slate sm:px-8 sm:pb-7">
                    {item.a}
                  </p>
                </motion.div>
              ) : null}
            </AnimatePresence>
          </li>
        );
      })}
    </ul>
  );
}

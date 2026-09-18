"use client";

import {
  motion,
  useInView,
  useMotionValue,
  useReducedMotion,
  useScroll,
  useSpring,
  useTransform,
  type MotionValue,
} from "motion/react";
import { useEffect, useRef, type ReactNode } from "react";

const EASE = [0.22, 1, 0.36, 1] as const;

/* ---------------------------------------------------------------- Reveal */

type RevealProps = {
  children: ReactNode;
  className?: string;
  /** Direction the content travels in from. */
  from?: "up" | "down" | "left" | "right" | "none";
  delay?: number;
  duration?: number;
  distance?: number;
  once?: boolean;
  as?: "div" | "section" | "li" | "span" | "article" | "header" | "footer";
};

export function Reveal({
  children,
  className,
  from = "up",
  delay = 0,
  duration = 0.7,
  distance = 28,
  once = true,
  as = "div",
}: RevealProps) {
  const reduced = useReducedMotion();
  const Tag = motion[as];

  const offset =
    from === "up"
      ? { y: distance }
      : from === "down"
        ? { y: -distance }
        : from === "left"
          ? { x: -distance }
          : from === "right"
            ? { x: distance }
            : {};

  return (
    <Tag
      className={className}
      initial={reduced ? { opacity: 0 } : { opacity: 0, ...offset }}
      whileInView={{ opacity: 1, x: 0, y: 0 }}
      viewport={{ once, margin: "0px 0px -12% 0px" }}
      transition={{ duration: reduced ? 0.2 : duration, delay, ease: EASE }}
    >
      {children}
    </Tag>
  );
}

/* ------------------------------------------------------------- Stagger */

export function Stagger({
  children,
  className,
  gap = 0.08,
  delay = 0,
  as = "div",
}: {
  children: ReactNode;
  className?: string;
  gap?: number;
  delay?: number;
  as?: "div" | "ul" | "section";
}) {
  const Tag = motion[as];
  return (
    <Tag
      className={className}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, margin: "0px 0px -12% 0px" }}
      variants={{
        hidden: {},
        show: { transition: { staggerChildren: gap, delayChildren: delay } },
      }}
    >
      {children}
    </Tag>
  );
}

export function StaggerItem({
  children,
  className,
  as = "div",
  distance = 24,
}: {
  children: ReactNode;
  className?: string;
  as?: "div" | "li" | "article";
  distance?: number;
}) {
  const reduced = useReducedMotion();
  const Tag = motion[as];
  return (
    <Tag
      className={className}
      variants={{
        hidden: { opacity: 0, y: reduced ? 0 : distance },
        show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: EASE } },
      }}
    >
      {children}
    </Tag>
  );
}

/* ----------------------------------------------------------- SplitWords */

/** Headline that assembles word by word. Screen readers get the plain string. */
export function SplitWords({
  text,
  className,
  wordClassName,
  delay = 0,
  gap = 0.055,
  once = true,
}: {
  text: string;
  className?: string;
  wordClassName?: string;
  delay?: number;
  gap?: number;
  once?: boolean;
}) {
  const reduced = useReducedMotion();
  const words = text.split(" ");

  if (reduced) return <span className={className}>{text}</span>;

  return (
    <motion.span
      className={className}
      aria-label={text}
      initial="hidden"
      whileInView="show"
      viewport={{ once, margin: "0px 0px -10% 0px" }}
      variants={{ hidden: {}, show: { transition: { staggerChildren: gap, delayChildren: delay } } }}
    >
      {words.map((word, i) => (
        <span
          key={`${word}-${i}`}
          aria-hidden="true"
          className="inline-block overflow-hidden align-bottom"
          style={{ paddingBottom: "0.08em", marginBottom: "-0.08em" }}
        >
          <motion.span
            className={`inline-block ${wordClassName ?? ""}`}
            variants={{
              hidden: { y: "110%", opacity: 0 },
              show: { y: "0%", opacity: 1, transition: { duration: 0.8, ease: EASE } },
            }}
          >
            {word}
            {i < words.length - 1 ? " " : ""}
          </motion.span>
        </span>
      ))}
    </motion.span>
  );
}

/* -------------------------------------------------------------- Counter */

export function Counter({
  to,
  from = 0,
  duration = 1.8,
  suffix = "",
  prefix = "",
  className,
}: {
  to: number;
  from?: number;
  duration?: number;
  suffix?: string;
  prefix?: string;
  className?: string;
}) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "0px 0px -15% 0px" });
  const reduced = useReducedMotion();

  useEffect(() => {
    const node = ref.current;
    if (!node) return;
    if (!inView) return;
    if (reduced) {
      node.textContent = `${prefix}${to}${suffix}`;
      return;
    }
    let raf = 0;
    const start = performance.now();
    const tick = (now: number) => {
      const t = Math.min((now - start) / (duration * 1000), 1);
      const eased = 1 - Math.pow(1 - t, 3);
      node.textContent = `${prefix}${Math.round(from + (to - from) * eased)}${suffix}`;
      if (t < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [inView, to, from, duration, suffix, prefix, reduced]);

  return (
    <span ref={ref} className={className}>
      {prefix}
      {from}
      {suffix}
    </span>
  );
}

/* ------------------------------------------------------------- Parallax */

/** Moves a layer against the scroll. `speed` is a fraction of viewport height. */
export function Parallax({
  children,
  speed = 0.2,
  className,
}: {
  children: ReactNode;
  speed?: number;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const reduced = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const raw = useTransform(scrollYProgress, [0, 1], [speed * 100, speed * -100]);
  const y = useSpring(raw, { stiffness: 120, damping: 30, mass: 0.4 });

  return (
    <div ref={ref} className={className}>
      <motion.div style={reduced ? undefined : { y }}>{children}</motion.div>
    </div>
  );
}

/* ------------------------------------------------------- ScrollProgress */

/** The split bar, doubling as a read-progress indicator. */
export function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 200, damping: 40, mass: 0.3 });
  return (
    <motion.div
      aria-hidden="true"
      className="split-bar fixed inset-x-0 top-0 z-[60] h-[3px] origin-left"
      style={{ scaleX }}
    />
  );
}

/* --------------------------------------------------------- GreenRuleWipe */

/** The green rule, wiping in left to right when its section arrives. */
export function GreenRule({ className, delay = 0 }: { className?: string; delay?: number }) {
  const reduced = useReducedMotion();
  return (
    <motion.span
      aria-hidden="true"
      className={`rule-green ${className ?? ""}`}
      initial={reduced ? { opacity: 1 } : { scaleX: 0 }}
      whileInView={{ scaleX: 1, opacity: 1 }}
      viewport={{ once: true, margin: "0px 0px -10% 0px" }}
      transition={{ duration: 0.7, delay, ease: EASE }}
    />
  );
}

export { SceneGround } from "./SceneGround";
export { Magnetic } from "./Magnetic";

export { EASE, useScroll, useTransform, useSpring, useMotionValue, motion };
export type { MotionValue };

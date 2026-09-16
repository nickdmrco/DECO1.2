"use client";

import { motion, useReducedMotion, type Transition } from "motion/react";
import type { CSSProperties } from "react";

/* ------------------------------------------------------------------
   DECO Ventures logo.

   The mark is redrawn from the vector geometry in the brand board: two
   identical hooks, one rotated 180 degrees. On a 100-unit grid every
   vertex lands on a whole number and every segment is a true 45 degree
   diagonal. The hooks never physically overlap -- the interlock is
   negative space -- so there is no z-order to preserve and each can be
   animated on its own.

   The wordmark is typeset live in Outfit rather than outlined, so it stays
   crisp at any size. Every proportion below was measured off the brand
   board lockups and is expressed in em of the "DECO" font size, so the
   whole lockup scales from a single number.
   ------------------------------------------------------------------ */

const HOOK_BLUE = "M10 -40 L0 -50 L-50 0 L-18 32 L13 1 L4 -8";
const HOOK_GREEN = "M-10 40 L0 50 L50 0 L18 -32 L-13 -1 L-4 8";
const STROKE = 9.2;

/** Outfit's cap height, so `size` can mean the cap height of "DECO". */
const CAP = 0.71875;

const METRICS = {
  horizontal: {
    markBox: 1.3936, // svg box, em
    gap: 0.2721, // mark box to "DECO" advance, em
    venSize: 0.1581, // em
    venTrack: 0.255, // em of VENTURES
    venTop: -0.1094, // em of VENTURES
    ruleTop: 0.0686, // em
    ruleH: 0.0292, // em
  },
  stacked: {
    markBox: 1.3404,
    gap: 0.2858,
    venSize: 0.1725,
    venTrack: 0.306,
    venTop: 1.0226, // em of VENTURES (0.1764 em of DECO)
    ruleTop: 0.0775,
    ruleH: 0.0329,
  },
} as const;

const DECO_TRACK = 0.05; // em — the board's wordmark is tracked slightly open

export type LogoTone = "default" | "reversed" | "white" | "navy";

/* -------------------------------------------------------------- Mark */

/** The mark keeps its colors when reversed; only the wordmark turns white. */
function markColors(tone: LogoTone) {
  if (tone === "white") return { blue: "#fff", green: "#fff" };
  if (tone === "navy") return { blue: "var(--color-navy)", green: "var(--color-navy)" };
  return { blue: "var(--color-blue)", green: "var(--color-green)" };
}

export function Mark({
  className,
  tone = "default",
  animate = "none",
  delay = 0,
  style,
}: {
  className?: string;
  tone?: LogoTone;
  /** "draw" traces each hook, then slides them into the lock. */
  animate?: "draw" | "none";
  delay?: number;
  style?: CSSProperties;
}) {
  const reduced = useReducedMotion();
  const colors = markColors(tone);
  const draw = animate === "draw" && !reduced;

  const trace = (i: number): Transition => ({
    pathLength: { duration: 1.1, delay: delay + i * 0.16, ease: [0.22, 1, 0.36, 1] },
    opacity: { duration: 0.01, delay: delay + i * 0.16 },
  });
  const settle = (i: number): Transition => ({
    duration: 0.9,
    delay: delay + 0.55 + i * 0.08,
    ease: [0.22, 1, 0.36, 1],
  });

  return (
    <svg
      viewBox="-57 -57 114 114"
      className={className}
      style={style}
      aria-hidden="true"
      shapeRendering="geometricPrecision"
    >
      {[
        { d: HOOK_BLUE, color: colors.blue, from: { x: -14, y: -14 } },
        { d: HOOK_GREEN, color: colors.green, from: { x: 14, y: 14 } },
      ].map((hook, i) => (
        <motion.g
          key={hook.d}
          initial={draw ? { x: hook.from.x, y: hook.from.y, opacity: 0 } : false}
          animate={draw ? { x: 0, y: 0, opacity: 1 } : undefined}
          transition={settle(i)}
        >
          <motion.path
            d={hook.d}
            stroke={hook.color}
            fill="none"
            strokeWidth={STROKE}
            strokeLinecap="butt"
            strokeLinejoin="miter"
            initial={draw ? { pathLength: 0, opacity: 0 } : false}
            animate={draw ? { pathLength: 1, opacity: 1 } : undefined}
            transition={trace(i)}
          />
        </motion.g>
      ))}
    </svg>
  );
}

/* ---------------------------------------------------------- Wordmark */

function Wordmark({ tone, stacked = false }: { tone: LogoTone; stacked?: boolean }) {
  const m = stacked ? METRICS.stacked : METRICS.horizontal;
  const light = tone === "reversed" || tone === "white";

  const decoColor = light
    ? "#fff"
    : tone === "navy"
      ? "var(--color-navy)"
      : "var(--color-blue)";
  const venColor = light ? "#fff" : "var(--color-navy)";
  const ruleColor = tone === "white" ? "#fff" : "var(--color-green)";

  /* Every part is display:block with its own line-height — inheriting the
     body's 1.6 would inflate the column. */
  const deco = (
    <span
      className="font-semibold"
      style={{
        display: "block",
        color: decoColor,
        fontSize: "1em",
        lineHeight: 1,
        letterSpacing: `${DECO_TRACK}em`,
        marginRight: `${-DECO_TRACK}em`,
      }}
    >
      DECO
    </span>
  );

  const ventures = (
    <span
      className="font-medium"
      style={{
        display: "block",
        color: venColor,
        fontSize: `${m.venSize}em`,
        lineHeight: 1,
        letterSpacing: `${m.venTrack}em`,
        /* tracking adds a trailing gap; pull it back so the S sits flush */
        marginRight: `${-m.venTrack}em`,
        marginTop: `${m.venTop}em`,
        alignSelf: stacked ? "center" : "flex-end",
      }}
    >
      VENTURES
    </span>
  );

  const rule = (
    <span
      aria-hidden="true"
      style={{
        display: "block",
        width: "100%",
        background: ruleColor,
        height: `max(1.5px, ${m.ruleH}em)`,
        marginTop: `${m.ruleTop}em`,
        transformOrigin: "left center",
      }}
    />
  );

  return (
    <span className="flex flex-col items-stretch" style={{ lineHeight: 1 }}>
      {deco}
      {stacked ? rule : ventures}
      {stacked ? ventures : rule}
    </span>
  );
}

/* ----------------------------------------------------------- Lockups */

type LockupProps = {
  /** Cap height of "DECO", in px. The horizontal lockup's 140px minimum
      width lands at size 22; below that, use the mark alone. */
  size?: number;
  tone?: LogoTone;
  animate?: "draw" | "none";
  delay?: number;
  className?: string;
  title?: string;
};

export function LogoHorizontal({
  size = 26,
  tone = "default",
  animate = "none",
  delay = 0,
  className,
  title = "DECO Ventures",
}: LockupProps) {
  const em = size / CAP;
  const m = METRICS.horizontal;
  return (
    <span
      className={`inline-flex items-center ${className ?? ""}`}
      style={{ fontSize: `${em}px`, gap: `${m.gap}em` }}
      role="img"
      aria-label={title}
    >
      <Mark
        tone={tone}
        animate={animate}
        delay={delay}
        style={{ width: `${m.markBox}em`, height: `${m.markBox}em`, flex: "none" }}
      />
      <Wordmark tone={tone} />
    </span>
  );
}

export function LogoStacked({
  size = 40,
  tone = "default",
  animate = "none",
  delay = 0,
  className,
  title = "DECO Ventures",
}: LockupProps) {
  const em = size / CAP;
  const m = METRICS.stacked;
  return (
    <span
      className={`inline-flex flex-col items-center ${className ?? ""}`}
      style={{ fontSize: `${em}px`, gap: `${m.gap}em` }}
      role="img"
      aria-label={title}
    >
      <Mark
        tone={tone}
        animate={animate}
        delay={delay}
        style={{ width: `${m.markBox}em`, height: `${m.markBox}em` }}
      />
      <Wordmark tone={tone} stacked />
    </span>
  );
}

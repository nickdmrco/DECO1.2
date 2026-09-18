"use client";

import { motion, useMotionValue, useReducedMotion, useSpring } from "motion/react";
import { useRef, type ReactNode } from "react";

/* A control that leans toward the cursor as it approaches, and settles back
   when it leaves. Pointer-only: it does nothing on touch, and nothing when
   the reader has asked for reduced motion. */
export function Magnetic({
  children,
  strength = 0.28,
  className,
}: {
  children: ReactNode;
  strength?: number;
  className?: string;
}) {
  const ref = useRef<HTMLSpanElement>(null);
  const reduced = useReducedMotion();
  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const x = useSpring(mx, { stiffness: 260, damping: 22, mass: 0.35 });
  const y = useSpring(my, { stiffness: 260, damping: 22, mass: 0.35 });

  if (reduced) return <span className={className}>{children}</span>;

  return (
    <motion.span
      ref={ref}
      className={`inline-block ${className ?? ""}`}
      style={{ x, y }}
      onPointerMove={(event) => {
        if (event.pointerType !== "mouse") return;
        const rect = ref.current?.getBoundingClientRect();
        if (!rect) return;
        mx.set((event.clientX - (rect.left + rect.width / 2)) * strength);
        my.set((event.clientY - (rect.top + rect.height / 2)) * strength);
      }}
      onPointerLeave={() => {
        mx.set(0);
        my.set(0);
      }}
    >
      {children}
    </motion.span>
  );
}

"use client";

import { useEffect, useRef } from "react";

/* ══════════════════════════════════════════════════════════════════════
   The hero field.

   A lattice of short strokes resolves out of noise into order, and a slow
   sweep of light runs across it. Every stroke sits at 45 degrees, because
   that is the only angle in the mark — the field is the logo's vocabulary
   at architectural scale rather than a texture borrowed from somewhere.

   Blue strokes lead, kelp follows, split along the same diagonal the two
   hooks meet on. No dependencies, one canvas, one rAF loop.
   ══════════════════════════════════════════════════════════════════════ */

type Cell = {
  ox: number; oy: number;   // where it belongs
  cx: number; cy: number;   // where it starts
  ol: number; cl: number;   // ordered / chaotic length
  oa: number; ca: number;   // ordered / chaotic angle
  seed: number;
  drift: number;
  kelp: boolean;
};

const BLUE = "43,176,234";
const KELP = "127,211,90";

export function HeroField() {
  const ref = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = ref.current;
    if (!canvas) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const ctx = canvas.getContext("2d", { alpha: true });
    if (!ctx) return;

    const DPR = Math.min(window.devicePixelRatio || 1, 2);
    let W = 0, H = 0;
    let cells: Cell[] = [];
    let raf = 0;
    let running = true;
    const start = performance.now();
    const pointer = { x: -9999, y: -9999, tx: -9999, ty: -9999 };
    let fade = 1;

    const build = () => {
      const rect = canvas.getBoundingClientRect();
      W = Math.max(rect.width, 1);
      H = Math.max(rect.height, 1);
      canvas.width = Math.round(W * DPR);
      canvas.height = Math.round(H * DPR);
      ctx.setTransform(DPR, 0, 0, DPR, 0, 0);

      const budget = W < 700 ? 340 : W < 1200 ? 680 : 1000;
      const step = Math.max(28, Math.sqrt((W * H) / budget));
      const cols = Math.ceil(W / step) + 1;
      const rows = Math.ceil(H / step) + 1;

      cells = [];
      for (let r = 0; r < rows; r++) {
        for (let c = 0; c < cols; c++) {
          const ox = c * step + step / 2;
          const oy = r * step + step / 2;
          /* The split runs along the mark's own diagonal. */
          const kelp = ox / W + oy / H > 1;
          cells.push({
            ox, oy,
            cx: ox + (Math.random() - 0.5) * step * 8,
            cy: oy + (Math.random() - 0.5) * step * 8,
            ol: step * (0.34 + Math.random() * 0.3),
            cl: step * (0.08 + Math.random() * 1.5),
            oa: kelp ? -Math.PI / 4 : Math.PI / 4,
            ca: Math.random() * Math.PI * 2,
            seed: Math.random() * Math.PI * 2,
            drift: 0.35 + Math.random() * 0.9,
            kelp,
          });
        }
      }
    };

    const ease = (t: number) => 1 - Math.pow(1 - t, 3);

    const frame = (now: number) => {
      if (!running) return;
      const t = (now - start) / 1000;

      /* Noise resolves into order over the first few seconds. */
      const order = ease(Math.min(t / 3.2, 1));

      pointer.x += (pointer.tx - pointer.x) * 0.08;
      pointer.y += (pointer.ty - pointer.y) * 0.08;

      /* A 45-degree sweep, crossing the field on a long loop. */
      const sweep = ((t * 0.075) % 1.4) - 0.2;

      ctx.clearRect(0, 0, W, H);
      ctx.lineCap = "butt";

      for (const cell of cells) {
        const x = cell.cx + (cell.ox - cell.cx) * order;
        const y = cell.cy + (cell.oy - cell.cy) * order;
        const len = cell.cl + (cell.ol - cell.cl) * order;
        const ang = cell.ca + (cell.oa - cell.ca) * order;

        /* Breathing, so the resolved state is never quite static. */
        const breath = Math.sin(t * cell.drift + cell.seed) * (1 - order * 0.72);
        const half = (len / 2) * (1 + breath * 0.18);

        let alpha = 0.05 + 0.1 * order;

        /* The sweep brightens what it passes. */
        const d = Math.abs(x / W + y / H - 1 - sweep * 2 + 1);
        if (d < 0.16) alpha += (1 - d / 0.16) * 0.42 * order;

        /* So does the pointer. */
        const px = x - pointer.x, py = y - pointer.y;
        const pd = Math.sqrt(px * px + py * py);
        if (pd < 190) alpha += (1 - pd / 190) * 0.3;

        const dx = Math.cos(ang) * half;
        const dy = Math.sin(ang) * half;

        ctx.strokeStyle = `rgba(${cell.kelp ? KELP : BLUE},${(alpha * fade).toFixed(3)})`;
        ctx.lineWidth = 1 + order * 0.5;
        ctx.beginPath();
        ctx.moveTo(x - dx, y - dy);
        ctx.lineTo(x + dx, y + dy);
        ctx.stroke();
      }

      raf = requestAnimationFrame(frame);
    };

    const onPointer = (e: PointerEvent) => {
      const rect = canvas.getBoundingClientRect();
      pointer.tx = e.clientX - rect.left;
      pointer.ty = e.clientY - rect.top;
    };
    const onLeave = () => {
      pointer.tx = -9999;
      pointer.ty = -9999;
    };
    /* Fade the field out as the hero leaves, so it never competes with the
       sections below — and stop the loop entirely once it's gone. */
    const onScroll = () => {
      const next = Math.max(0, 1 - window.scrollY / (window.innerHeight * 0.75));
      fade = next;
      if (next <= 0.01 && running) {
        running = false;
        cancelAnimationFrame(raf);
        ctx.clearRect(0, 0, W, H);
      } else if (next > 0.01 && !running) {
        running = true;
        raf = requestAnimationFrame(frame);
      }
    };

    const onResize = () => build();

    build();
    raf = requestAnimationFrame(frame);
    window.addEventListener("pointermove", onPointer, { passive: true });
    window.addEventListener("pointerleave", onLeave, { passive: true });
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onResize);

    return () => {
      running = false;
      cancelAnimationFrame(raf);
      window.removeEventListener("pointermove", onPointer);
      window.removeEventListener("pointerleave", onLeave);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onResize);
    };
  }, []);

  return (
    <canvas
      ref={ref}
      aria-hidden="true"
      className="pointer-events-none absolute inset-0 h-full w-full"
    />
  );
}

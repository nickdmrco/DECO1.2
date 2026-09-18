import { GreenRule, Reveal } from "@/components/motion";
import type { ReactNode } from "react";

/* Label, title, green rule — the standard section opener from the brand board. */
export function SectionHeading({
  label,
  title,
  intro,
  tone = "light",
  align = "left",
  className,
}: {
  label?: string;
  title: ReactNode;
  intro?: ReactNode;
  tone?: "light" | "dark";
  align?: "left" | "center";
  className?: string;
}) {
  const dark = tone === "dark";
  return (
    <div
      className={`${align === "center" ? "mx-auto max-w-2xl text-center" : "max-w-2xl"} ${className ?? ""}`}
    >
      {label ? (
        <Reveal>
          <p className={`label ${dark ? "text-kelp" : "text-muted"}`}>{label}</p>
        </Reveal>
      ) : null}
      <Reveal delay={0.06}>
        <h2 className={`mt-3 text-h2 sm:text-h1 ${dark ? "text-surf" : "text-surf"}`}>{title}</h2>
      </Reveal>
      <GreenRule className={`mt-5 ${align === "center" ? "mx-auto" : ""}`} delay={0.12} />
      {intro ? (
        <Reveal delay={0.16}>
          <p className={`mt-6 text-body ${dark ? "text-muted" : "text-muted"}`}>{intro}</p>
        </Reveal>
      ) : null}
    </div>
  );
}

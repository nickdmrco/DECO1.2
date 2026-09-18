import Link from "next/link";
import type { ComponentProps, ReactNode } from "react";

/* Brand board §06: primary buttons are Deep Blue, fully rounded, white text.
   Secondary buttons have a green outline and navy text. */

const base =
  "group relative inline-flex items-center justify-center gap-2 rounded-full font-medium " +
  "transition-[transform,background-color,border-color,box-shadow] duration-300 ease-[cubic-bezier(.22,1,.36,1)] " +
  "active:translate-y-0 disabled:cursor-not-allowed disabled:opacity-60";

const sizes = {
  sm: "px-5 py-2 text-[0.9375rem]",
  md: "px-7 py-3 text-[1.0625rem]",
  lg: "px-8 py-3.5 text-[1.0625rem]",
} as const;

const tones = {
  /* Deepwater on Current Blue is 6.8:1. White on Current Blue is 2.5:1 and
     fails — the brand board sets its own blue swatch the same way. */
  primary:
    "bg-blue text-deep font-semibold hover:-translate-y-0.5 hover:bg-kelp " +
    "hover:shadow-[0_12px_32px_-12px_color-mix(in_oklab,var(--color-blue)_70%,transparent)]",
  secondary:
    "border-2 border-kelp text-surf hover:-translate-y-0.5 hover:bg-kelp/12 " +
    "hover:shadow-[0_12px_32px_-16px_color-mix(in_oklab,var(--color-kelp)_70%,transparent)]",
  ghostLight:
    "border-2 border-surf/25 text-surf hover:-translate-y-0.5 hover:border-surf/60 hover:bg-surf/5",
} as const;

type Variant = keyof typeof tones;

export function buttonClass(variant: Variant = "primary", size: keyof typeof sizes = "md") {
  return `${base} ${sizes[size]} ${tones[variant]}`;
}

type ButtonLinkProps = {
  href: string;
  variant?: Variant;
  size?: keyof typeof sizes;
  className?: string;
  children: ReactNode;
} & Omit<ComponentProps<typeof Link>, "href" | "className" | "children">;

export function ButtonLink({
  href,
  variant = "primary",
  size = "md",
  className,
  children,
  ...rest
}: ButtonLinkProps) {
  return (
    <Link href={href} className={`${buttonClass(variant, size)} ${className ?? ""}`} {...rest}>
      {children}
    </Link>
  );
}

export function Button({
  variant = "primary",
  size = "md",
  className,
  children,
  ...rest
}: {
  variant?: Variant;
  size?: keyof typeof sizes;
} & ComponentProps<"button">) {
  return (
    <button className={`${buttonClass(variant, size)} ${className ?? ""}`} {...rest}>
      {children}
    </button>
  );
}

/** The arrow that slides on hover — used inside primary CTAs. */
export function ArrowRight({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 16 16"
      aria-hidden="true"
      className={`h-4 w-4 transition-transform duration-300 ease-[cubic-bezier(.22,1,.36,1)] group-hover:translate-x-1 ${className ?? ""}`}
      fill="none"
      stroke="currentColor"
      strokeWidth="1.75"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M2.5 8h11M9 3.5 13.5 8 9 12.5" />
    </svg>
  );
}

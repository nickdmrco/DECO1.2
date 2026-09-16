/* Icon style — brand board §06: two-color, rounded, on a 32px grid.
   Blue carries the shape, green is the single accent that earns its place. */

type Props = { className?: string; blue?: string; green?: string };

const wrap = (children: React.ReactNode, className?: string) => (
  <svg
    viewBox="0 0 32 32"
    className={className}
    fill="none"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    aria-hidden="true"
  >
    {children}
  </svg>
);

export function ServiceIcon({
  slug,
  className = "h-8 w-8",
  blue = "var(--color-blue)",
  green = "var(--color-green)",
}: Props & { slug: string }) {
  switch (slug) {
    /* Strategy & Growth — a rising line clearing the plateau. */
    case "strategy-growth":
      return wrap(
        <>
          <path d="M4 26V6" stroke={blue} />
          <path d="M4 26h22" stroke={blue} />
          <path d="M8 21l6-6 4 4 8-9" stroke={blue} />
          <path d="M20 10h6v6" stroke={green} />
        </>,
        className,
      );

    /* Leadership & Organizational Development — a team, one out front. */
    case "leadership-organizational-development":
      return wrap(
        <>
          <circle cx="16" cy="9" r="4" stroke={green} />
          <path d="M9 26c0-3.9 3.1-7 7-7s7 3.1 7 7" stroke={green} />
          <path d="M6.5 24c0-2.6.9-4.6 2.3-6" stroke={blue} />
          <path d="M25.5 24c0-2.6-.9-4.6-2.3-6" stroke={blue} />
          <circle cx="6" cy="13" r="3" stroke={blue} />
          <circle cx="26" cy="13" r="3" stroke={blue} />
        </>,
        className,
      );

    /* Operational & Financial Excellence — a dial past the midpoint. */
    case "operational-financial-excellence":
      return wrap(
        <>
          <path d="M4 22a12 12 0 0 1 24 0" stroke={blue} />
          <path d="M4 22h3M25 22h3M7.5 13.5l2 2M24.5 13.5l-2 2M16 8v2.5" stroke={blue} />
          <path d="M16 22l6.5-6.5" stroke={green} />
          <circle cx="16" cy="22" r="1.75" fill={green} stroke={green} />
        </>,
        className,
      );

    /* Industry Networking — a hub with the introduction already made. */
    case "industry-networking":
      return wrap(
        <>
          <path d="M16 12.5V7M12.6 17.8l-4.8 2.7M19.4 17.8l4.8 2.7" stroke={blue} />
          <circle cx="16" cy="16" r="3.5" stroke={blue} />
          <circle cx="16" cy="5" r="2.5" stroke={blue} />
          <circle cx="6" cy="22" r="2.5" stroke={blue} />
          <circle cx="26" cy="22" r="2.5" stroke={green} />
          <path d="M8.3 23.2 23.7 23.2" stroke={green} />
        </>,
        className,
      );

    /* Innovative Technology — a chip with a spark inside. */
    case "innovative-technology":
      return wrap(
        <>
          <rect x="8" y="8" width="16" height="16" rx="3" stroke={blue} />
          <path d="M13 4v4M19 4v4M13 24v4M19 24v4M4 13h4M4 19h4M24 13h4M24 19h4" stroke={blue} />
          <path d="M17.5 12l-3.5 4.5h3L15.5 21l4-5h-3z" stroke={green} />
        </>,
        className,
      );

    /* Investment & M&A Advisory — two companies becoming one. */
    case "investment-ma-advisory":
      return wrap(
        <>
          <circle cx="11" cy="16" r="7.5" stroke={blue} />
          <circle cx="21" cy="16" r="7.5" stroke={green} />
          <path d="M16 10.2a7.5 7.5 0 0 0 0 11.6" stroke={blue} />
        </>,
        className,
      );

    default:
      return wrap(<circle cx="16" cy="16" r="10" stroke={blue} />, className);
  }
}

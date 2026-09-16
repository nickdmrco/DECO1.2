/* ------------------------------------------------------------------
   Site content.

   Everything a copy edit would touch lives here, not in the components.
   Lines marked PLACEHOLDER are my draft in the brand voice (direct, warm,
   experienced) and are waiting to be swapped for the real copy.
   ------------------------------------------------------------------ */

export const site = {
  name: "DECO Ventures",
  domain: "decoventures.com",
  url: "https://decoventures.com",
  tagline: "Guide. Innovate. Thrive.",
  positioning:
    "From insight to execution: securing success in the business of security and life safety.",
  founded: 2011,
  location: "Southern California",
  founder: "George De Marco",
  // PLACEHOLDER — confirm the address you want published.
  email: "info@decoventures.com",
  phone: "" as string,
  linkedin: "https://www.linkedin.com/company/deco-ventures",
} as const;

export const nav = [
  { href: "/services", label: "Services" },
  { href: "/about", label: "About" },
  { href: "/insights", label: "Insights" },
  { href: "/contact", label: "Contact" },
] as const;

export type Service = {
  slug: string;
  title: string;
  /** One line, used on the rail and in cards. */
  summary: string;
  /** Three to five concrete deliverables. */
  points: string[];
};

/* The six practice areas named in the brand board's icon set. */
export const services: Service[] = [
  {
    slug: "strategy-growth",
    title: "Strategy & Growth",
    summary:
      "A plan you can actually run: where the revenue comes from next, and what it takes to get there.",
    points: [
      "Growth strategy and market positioning",
      "Recurring revenue model design",
      "Go-to-market and channel strategy",
      "Annual planning and execution cadence",
    ],
  },
  {
    slug: "leadership-organizational-development",
    title: "Leadership & Organizational Development",
    summary:
      "The company outgrows the org chart long before anyone says so out loud. We fix that early.",
    points: [
      "Succession planning",
      "Leadership team design and accountability",
      "Executive coaching and mentoring",
      "Culture and talent retention",
    ],
  },
  {
    slug: "operational-financial-excellence",
    title: "Operational & Financial Excellence",
    summary:
      "Margin is made in operations. We find where yours is leaking and close the gaps.",
    points: [
      "Operational assessment and KPI design",
      "Service delivery and field productivity",
      "Pricing, margin, and cost structure",
      "Financial reporting that drives decisions",
    ],
  },
  {
    slug: "industry-networking",
    title: "Industry Networking",
    summary:
      "Four decades of relationships across the industry, opened on your behalf.",
    points: [
      "Introductions to partners and buyers",
      "Association and event strategy",
      "Peer group and advisory board placement",
      "Industry visibility and thought leadership",
    ],
  },
  {
    slug: "innovative-technology",
    title: "Innovative Technology",
    summary:
      "Which technologies earn a place in your business, and which are someone else's press release.",
    points: [
      "Technology roadmap and platform selection",
      "Cloud, AI, and managed services evaluation",
      "Vendor and manufacturer alignment",
      "Integration and rollout planning",
    ],
  },
  {
    slug: "investment-ma-advisory",
    title: "Investment & M&A Advisory",
    summary:
      "Buy well, sell once. We sit on your side of the table for the biggest decision of your career.",
    points: [
      "Exit readiness and valuation drivers",
      "Buy-side and sell-side diligence support",
      "Investor and acquirer introductions",
      "Post-close integration planning",
    ],
  },
];

/* Who we're talking to — brand board §01. */
export const audiences = [
  "Integrators",
  "Monitoring centers",
  "Manufacturers",
  "Service providers",
  "Technology innovators",
  "Investment firms",
] as const;

/* PLACEHOLDER — swap for the numbers you want to stand behind. */
export const stats = [
  { value: 40, suffix: "+", label: "Years in security and life safety" },
  { value: 2011, suffix: "", label: "Advising owners since", raw: true },
  { value: 6, suffix: "", label: "Practice areas" },
] as const;

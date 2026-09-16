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

/* How we work — the tagline, turned into three phases.
   PLACEHOLDER copy in the brand voice; swap for George's own words. */
export const process = [
  {
    key: "Guide",
    tone: "blue" as const,
    title: "Start with what is actually happening",
    body:
      "Before anyone proposes anything, we look at the business as it really runs today — the numbers, the org chart, the pipeline, and the things people only say off the record. Most engagements find the real problem somewhere other than where it was reported.",
  },
  {
    key: "Innovate",
    tone: "navy" as const,
    title: "Build the plan you can actually run",
    body:
      "A strategy nobody executes is an expensive document. We size the moves to the team you have, sequence them, and put names and dates against them. Where new technology helps, we say so. Where it does not, we say that too.",
  },
  {
    key: "Thrive",
    tone: "green" as const,
    title: "Stay until it is working",
    body:
      "We stay in the room through execution — quarterly reviews, course corrections, and the hard conversations. The goal is a business that runs well without us, and an owner with options when it matters.",
  },
];

/* PLACEHOLDER — George's bio. Swap for the real copy and add a photo. */
export const founder = {
  name: "George De Marco",
  role: "Founder & Managing Director",
  blurb:
    "Four decades in security and life safety — as an operator, an owner, and an industry leader. George founded DECO Ventures in 2011 to give owners the counsel he wished he had had: direct, experienced, and firmly on their side of the table.",
  credentials: [
    "40+ years in the security and life safety industry",
    "Former integrator owner and operator",
    "Industry association leadership and ESX programming",
    "Advisor on dozens of growth, succession, and exit engagements",
  ],
};

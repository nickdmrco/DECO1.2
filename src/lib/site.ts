/* ------------------------------------------------------------------
   Site content.

   Everything a copy edit would touch lives here, not in the components.

   Provenance is marked per block:
     VERBATIM  — copy from the existing decoventures.com, unchanged.
     ADAPTED   — the same copy, retyped into the brand voice (short
                 sentences, plain words) or split into bullets. No new
                 claims: every fact traces back to the handover brief.
     PENDING   — still waiting on George.
   ------------------------------------------------------------------ */

export const site = {
  legalName: "DECO Ventures LLC",
  name: "DECO Ventures",
  domain: "decoventures.com",
  url: "https://decoventures.com",
  tagline: "Guide. Innovate. Thrive.",
  // VERBATIM — the existing hero subhead, in sentence case.
  positioning:
    "From insight to execution: securing success in the business of security and life safety.",
  founded: 2011,
  location: "Southern California",
  founder: "George De Marco",
  email: "contact@decoventures.com",
  phone: "" as string, // PENDING — none published today, and that's a valid choice.
  linkedin: "https://www.linkedin.com/company/deco-ventures/",
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
  /** Deliverables, decomposed from the firm's own stated scope. */
  points: string[];
  /** A standing qualification that has to travel with the service. */
  note?: string;
};

/* The six practice areas, in the order the current site lists them.
   Summaries: VERBATIM. Points: ADAPTED. */
export const services: Service[] = [
  {
    slug: "leadership-organizational-development",
    title: "Leadership & Organizational Development",
    summary: "Evaluation, coaching, and strategic development of leadership teams.",
    points: [
      "Leadership team evaluation",
      "Executive coaching",
      "Strategic development of the leadership team",
      "Organizational excellence",
    ],
  },
  {
    slug: "strategy-growth",
    title: "Strategy & Growth",
    summary: "Strategic analysis, market-focused growth plans, and market expansion.",
    points: [
      "Strategic analysis",
      "Market-centric growth strategy",
      "Market expansion",
      "Growth planning and execution",
    ],
  },
  {
    slug: "operational-financial-excellence",
    title: "Operational & Financial Excellence",
    summary: "Streamlined processes and operational optimization.",
    points: [
      "Streamlined processes",
      "Operational optimization",
      "Performance improvement for integrators",
      "Scaling operations",
    ],
  },
  {
    slug: "industry-networking",
    title: "Industry Networking",
    summary: "Introductions to industry leaders across the value chain.",
    points: [
      "Introductions across the industry value chain",
      "Connections that extend market reach",
      "Access to industry leadership",
    ],
  },
  {
    slug: "innovative-technology",
    title: "Innovative Technology",
    summary: "Helping new technologies enter the security market.",
    points: [
      "Market entry for emerging technology",
      "Positioning with integrators and monitoring centers",
      "Routes to market across the value chain",
    ],
  },
  {
    slug: "investment-ma-advisory",
    title: "Investment & M&A Advisory",
    summary:
      "Succession planning, acquisitions, sales, and finding investment opportunities.",
    points: [
      "Succession planning",
      "Buying a company",
      "Selling a company",
      "Identifying investment opportunities",
    ],
    // VERBATIM — the distinction the current site is careful to make.
    note: "Advisory services only. DECO Ventures is not a broker.",
  },
];

/* Three pillars — VERBATIM from the current homepage. */
export const pillars = [
  {
    title: "Strategic Leadership",
    tone: "blue" as const,
    body:
      "Enhance organizational leadership and excellence through evaluation, coaching, and strategic development.",
  },
  {
    title: "Operational Efficiency",
    tone: "navy" as const,
    body:
      "Optimize operations and fuel growth with streamlined processes, strategic analysis, and market-centric strategies.",
  },
  {
    title: "Business Expansion",
    tone: "green" as const,
    body:
      "Facilitate business expansion by connecting with industry leaders and guided mergers and acquisitions.",
  },
];

/* Who we're talking to — the brand board's six, used as chips. */
export const audiences = [
  "Integrators",
  "Monitoring centers",
  "Manufacturers",
  "Service providers",
  "Technology innovators",
  "Investment firms",
] as const;

/* Who we serve, and what we do for them — VERBATIM from "Who they serve". */
export const audienceValue = [
  { who: "Integrators", value: "Improve performance and scale operations." },
  {
    who: "Manufacturers and monitoring centers",
    value: "Reach more of the market.",
  },
  { who: "Emerging technology companies", value: "Break into the industry." },
  { who: "Investment firms", value: "Find opportunities in the space." },
];

/* Why clients pick them — VERBATIM. */
export const differentiators = [
  "40+ years focused only on security and life safety",
  "Real operating experience in integration and monitoring",
  "A track record of getting deals done",
  "Relationships across the whole industry",
];

/* ADAPTED from the About page. */
export const about = {
  lede:
    "Established in 2011 and built on over four decades of security and life safety expertise, DECO Ventures has been the strategic partner of choice for companies navigating industry transitions.",
  whoWeHelp:
    "We help integrators optimize performance and scale operations, help manufacturers and monitoring centers expand their market reach, support innovative technologies entering the market, and identify investment opportunities.",
  approach:
    "We address challenges like evolving technology, competitive landscapes, regulatory complexity, and consolidation pressure by combining strategic planning with tactical execution.",
  scope:
    "Services spanning market expansion, operational optimization, succession planning, and M&A strategy.",
};

/* George — VERBATIM from /georgedemarco. */
export const founder = {
  name: "George De Marco",
  role: "Founder & Managing Director",
  heading: "Entrepreneurial leadership and industry impact",
  bio: [
    "George De Marco began his entrepreneurial journey more than four decades ago. As Founder and CEO of Greater Alarm, he built a team recognized nationwide in the electronic security industry. After selling the company, he helped launch and develop the Electronic Security Expo (ESX), where he continues to serve as chairman.",
    "In 2011, George founded DECO Ventures LLC, leveraging his industry expertise to help entrepreneurs and executives transform their approach to leadership, growth strategies, and innovation. As a trusted advisor, he specializes in guiding owners through pivotal transitions, including succession planning and business acquisitions or sales.",
    "George has received numerous honors for his contributions to the industry, including the California Alarm Association's Lifetime Achievement Award, induction into the Security Sales & Integration Hall of Fame, the Electronic Security Association's Sara E. Jackson Award, and recognition as a Life Safety Alliance Top 40 Thought Leader. A published author, keynote speaker, and moderator, George continues his entrepreneurial journey and lifelong commitment to learning from exceptional businesses and individuals.",
  ],
  /** ADAPTED — the homepage's bio teaser, shortened for the card. */
  blurb:
    "Founder and CEO of Greater Alarm, which he built into a nationally recognized security company and later sold. Chairman of the Electronic Security Expo. He founded DECO Ventures in 2011 to help owners through the transitions that decide a company's future.",
};

/* VERBATIM — the timeline on /georgedemarco. */
export const timeline = [
  { year: "1981", label: "Founded Greater Alarm" },
  { year: "2007", label: "Helped develop ESX" },
  { year: "2009", label: "CAA Weinstock Lifetime Achievement" },
  { year: "2011", label: "Founded DECO Ventures LLC" },
  { year: "2019", label: "Sara E. Jackson Award" },
  { year: "2020", label: "SSI Industry Hall of Fame" },
  { year: "2024", label: "Top 40 Thought Leader" },
];

/* VERBATIM — awards and milestones from the homepage. */
export const awards = [
  "CAA's Lifetime Achievement Award",
  "Security Sales & Integration Hall of Fame",
  "ESA's Sara E. Jackson Award",
  "Founder and CEO of Greater Alarm",
  "Electronic Security Expo (ESX) Chairman",
  "Published author, keynote speaker, and moderator",
];

/* VERBATIM — strategic partners from the homepage. Logos PENDING. */
export const partners = [
  "Pavion Security",
  "California Alarm Association",
  "Electronic Security Association",
  "Denyk Digital Marketing",
  "Electronic Security Expo",
];

/* VERBATIM — the contact page FAQ. */
export const faq = [
  {
    q: "How can I request a consultation?",
    a: "Simply send us a message and we'll reach out to you promptly to schedule a consultation.",
  },
  {
    q: "What information should I include in my message?",
    a: "Feel free to share as much detail as possible about your inquiry, project, or question.",
  },
  {
    q: "How soon can I expect a response?",
    a: "Our team is committed to responding promptly. You can typically expect a response within 1-2 business days.",
  },
  {
    q: "Is my email safe with you?",
    a: "Absolutely. We respect your privacy and won't share your email with third parties.",
  },
  {
    q: "Can I unsubscribe from email updates?",
    a: "Yes, you can easily unsubscribe at any time by clicking the 'unsubscribe' link in the emails you receive from us.",
  },
];

/* VERBATIM — the contact form intro. */
export const contactIntro =
  "Have a specific project or need personalized advice? Drop us a message below to start the conversation. Whether it's a question, feedback, or a request for a consultation, our team is here for you.";

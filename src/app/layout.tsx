import type { Metadata, Viewport } from "next";
import { Outfit } from "next/font/google";
import { site } from "@/lib/site";
import "./globals.css";

/* One typeface does everything — brand board §05. */
const outfit = Outfit({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-outfit",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: `${site.name} — Strategic guidance for the security and life safety industry`,
    template: `%s — ${site.name}`,
  },
  description:
    "Consulting and advisory for the security and life safety industry: leadership, growth, operations, industry networking, technology, and M&A. Founded in 2011 by George De Marco.",
  openGraph: {
    type: "website",
    siteName: site.name,
    url: site.url,
    title: `${site.name} — ${site.tagline}`,
    description: site.positioning,
    locale: "en_US",
  },
  twitter: { card: "summary_large_image" },
  icons: {
    icon: [{ url: "/icon.svg", type: "image/svg+xml" }],
    apple: "/apple-icon.png",
  },
};

export const viewport: Viewport = {
  themeColor: "#10324A",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={outfit.variable}>
      <body className="antialiased">{children}</body>
    </html>
  );
}

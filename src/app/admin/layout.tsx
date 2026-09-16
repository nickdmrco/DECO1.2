import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Admin",
  robots: { index: false, follow: false },
};

/* The admin area sits outside the marketing chrome: its own full-height
   surface, no marketing header or footer competing for attention. */
export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return <div className="min-h-screen bg-mist">{children}</div>;
}

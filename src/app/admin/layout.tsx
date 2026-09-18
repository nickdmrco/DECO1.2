import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Admin",
  robots: { index: false, follow: false },
};

/* The admin area sits outside the marketing chrome, and on the light
   surface: writing a long post on Deepwater has the same readability cost
   as reading one. Editor and article therefore match. */
export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return <div className="surface-light min-h-screen">{children}</div>;
}

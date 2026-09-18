import { Header } from "@/components/site/Header";
import { Footer } from "@/components/site/Footer";
import { SceneGround, ScrollProgress } from "@/components/motion";

/* The public site's chrome. /admin sits outside this route group, so the
   editor never inherits the marketing header and footer. */
export default function SiteLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[70] focus:rounded-full focus:bg-blue focus:px-5 focus:py-3 focus:text-surf"
      >
        Skip to content
      </a>
      <SceneGround />
      <ScrollProgress />
      <Header />
      <main id="main">{children}</main>
      <Footer />
    </>
  );
}

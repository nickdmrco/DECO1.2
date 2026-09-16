"use client";

import Link from "next/link";
import { useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ServiceIcon } from "@/components/brand/ServiceIcon";
import { ArrowRight, ButtonLink } from "@/components/site/Button";
import { services } from "@/lib/site";

gsap.registerPlugin(ScrollTrigger);

/* The rail: six practice areas travelling sideways while the section is
   pinned. Below `lg`, and whenever the reader asks for reduced motion, it
   degrades to an ordinary swipeable row -- no pin, no scrub. */
export function ServiceRail() {
  const section = useRef<HTMLElement>(null);
  const track = useRef<HTMLUListElement>(null);
  const progress = useRef<HTMLSpanElement>(null);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      const mm = gsap.matchMedia();
      mm.add(
        {
          pinned: "(min-width: 1024px) and (prefers-reduced-motion: no-preference)",
        },
        () => {
          const el = track.current;
          const sec = section.current;
          if (!el || !sec) return;

          const distance = () => Math.max(0, el.scrollWidth - window.innerWidth + 96);

          const tween = gsap.to(el, {
            x: () => -distance(),
            ease: "none",
            scrollTrigger: {
              trigger: sec,
              start: "top top",
              end: () => `+=${distance()}`,
              pin: true,
              scrub: 0.6,
              anticipatePin: 1,
              invalidateOnRefresh: true,
              onUpdate: (self) => {
                if (progress.current) {
                  progress.current.style.transform = `scaleX(${self.progress})`;
                }
              },
            },
          });
          return () => {
            tween.scrollTrigger?.kill();
            tween.kill();
          };
        },
      );
    }, section);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={section}
      id="what-we-do"
      aria-labelledby="what-we-do-title"
      className="relative overflow-hidden bg-navy py-24 lg:flex lg:h-screen lg:flex-col lg:justify-center lg:py-0"
    >
      <div className="mx-auto w-full max-w-[76rem] px-6 lg:px-8">
        <div className="flex flex-wrap items-end justify-between gap-6">
          <div>
            <p className="label text-green">What we do</p>
            <h2 id="what-we-do-title" className="mt-3 max-w-xl text-h2 text-white sm:text-h1">
              Six places an owner gets stuck. We work all six.
            </h2>
          </div>
          <ButtonLink href="/services" variant="ghostLight" size="sm" className="shrink-0">
            All services
            <ArrowRight />
          </ButtonLink>
        </div>
      </div>

      <div className="mt-14 lg:mt-16">
        <ul
          ref={track}
          className="flex snap-x snap-mandatory gap-6 overflow-x-auto px-6 pb-6 lg:snap-none lg:overflow-visible lg:px-[max(2rem,calc((100vw-76rem)/2+2rem))] lg:pb-0"
        >
          {services.map((service, i) => (
            <li
              key={service.slug}
              className="group w-[min(85vw,22rem)] shrink-0 snap-center lg:w-[24rem]"
            >
              <Link
                href={`/services#${service.slug}`}
                className="flex h-full flex-col rounded-2xl border border-white/12 bg-white/[0.04] p-8 transition-all duration-500 ease-[cubic-bezier(.22,1,.36,1)] hover:-translate-y-1.5 hover:border-green/50 hover:bg-white/[0.07]"
              >
                <span className="label text-white/35">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <ServiceIcon
                  slug={service.slug}
                  className="mt-6 h-9 w-9 transition-transform duration-500 ease-[cubic-bezier(.22,1,.36,1)] group-hover:scale-110"
                  blue="#8FD0EC"
                />
                <h3 className="mt-6 text-h3 text-white">{service.title}</h3>
                <span className="mt-3 block h-[3px] w-10 origin-left bg-green transition-transform duration-500 ease-[cubic-bezier(.22,1,.36,1)] group-hover:scale-x-[1.8]" />
                <p className="mt-5 text-[0.9375rem] leading-[1.6] text-white/70">
                  {service.summary}
                </p>
                <span className="mt-auto inline-flex items-center gap-2 pt-8 text-[0.9375rem] font-medium text-green">
                  Read more
                  <ArrowRight />
                </span>
              </Link>
            </li>
          ))}
        </ul>
      </div>

      {/* Rail progress, drawn as the split bar. */}
      <div
        aria-hidden="true"
        className="mx-auto mt-10 hidden h-[3px] w-full max-w-[76rem] bg-white/12 px-6 lg:block lg:px-8"
      >
        <span
          ref={progress}
          /* inline transform, not a scale utility: Tailwind v4 writes the
             `scale` property, which would win over GSAP's transform */
          style={{ transform: "scaleX(0)" }}
          className="split-bar block h-full origin-left"
        />
      </div>
    </section>
  );
}

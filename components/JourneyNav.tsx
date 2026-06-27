"use client";

import { useEffect, useState } from "react";
import { chapters } from "@/lib/chapters";

/**
 * Case-file progress through the page: a vertical chapter rail on desktop,
 * a slim "evidence meter" + active chapter pill on mobile. Both read the
 * same scroll-spy state so the journey always knows where the guest is.
 */
export default function JourneyNav() {
  const [activeId, setActiveId] = useState(chapters[0].id);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const sections = chapters
      .map((c) => document.getElementById(c.id))
      .filter((el): el is HTMLElement => !!el);

    const observer = new IntersectionObserver(
      (entries) => {
        // Pick whichever observed section is most centered in view.
        const visible = entries.filter((e) => e.isIntersecting);
        if (visible.length > 0) {
          const best = visible.reduce((a, b) =>
            Math.abs(a.boundingClientRect.top) < Math.abs(b.boundingClientRect.top)
              ? a
              : b
          );
          setActiveId(best.target.id);
        }
      },
      { rootMargin: "-35% 0px -55% 0px", threshold: 0 }
    );

    sections.forEach((el) => observer.observe(el));

    const onScroll = () => {
      const max = document.documentElement.scrollHeight - window.innerHeight;
      setProgress(max > 0 ? Math.min(1, Math.max(0, window.scrollY / max)) : 0);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });

    return () => {
      observer.disconnect();
      window.removeEventListener("scroll", onScroll);
    };
  }, []);

  const goTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  const activeChapter =
    chapters.find((c) => c.id === activeId) ?? chapters[0];
  const activeIndex = chapters.indexOf(activeChapter);

  return (
    <>
      {/* Desktop: vertical case-file rail, right edge. */}
      <nav
        aria-label="Case file chapters"
        className="hidden lg:flex fixed right-5 top-1/2 z-40 -translate-y-1/2 flex-col items-end gap-3"
      >
        {chapters.map((c) => {
          const isActive = c.id === activeId;
          return (
            <button
              key={c.id}
              onClick={() => goTo(c.id)}
              aria-current={isActive}
              aria-label={`Jump to Chapter ${c.roman}: ${c.label}`}
              className="group flex items-center gap-2"
            >
              <span
                className={`whitespace-nowrap font-stamp uppercase tracking-[0.2em] text-[0.65rem] transition-all
                  ${isActive ? "opacity-100 text-barn translate-x-0" : "opacity-0 text-navy/70 translate-x-2 group-hover:opacity-100 group-hover:translate-x-0"}`}
              >
                {c.roman} · {c.label}
              </span>
              <span
                className={`h-2.5 w-2.5 rounded-full border-2 transition-all
                  ${isActive ? "bg-barn border-barn scale-125" : "bg-transparent border-navy/40 group-hover:border-barn"}`}
              />
            </button>
          );
        })}
      </nav>

      {/* Mobile / tablet: top evidence meter + current chapter pill. */}
      <div className="lg:hidden fixed top-0 left-0 right-0 z-40">
        <div className="h-1 w-full bg-navy/10">
          <div
            className="h-full bg-barn transition-[width] duration-150"
            style={{ width: `${progress * 100}%` }}
          />
        </div>
        <div className="flex justify-center pt-2">
          <span className="badge-stamp text-[0.55rem] bg-parchment-light/90 backdrop-blur-sm">
            Ch. {activeChapter.roman} of {chapters.length} — {activeChapter.label}
          </span>
        </div>
      </div>
    </>
  );
}

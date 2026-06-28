"use client";

import { useState } from "react";
import Reveal from "./Reveal";
import ChapterMark from "./ChapterMark";
import { suspects, cardTilt } from "@/lib/suspects";
import { chapters } from "@/lib/chapters";

export default function SuspectRoster() {
  // Track which cards have been tapped (mobile reveal).
  const [revealed, setRevealed] = useState<Record<number, boolean>>({});

  const toggle = (i: number) =>
    setRevealed((prev) => ({ ...prev, [i]: !prev[i] }));

  return (
    <section
      id="roster"
      className="relative z-10 min-h-screen chapter-scene flex flex-col justify-center px-4 py-12"
    >
      <div className="mx-auto max-w-5xl w-full">
        <Reveal>
          <ChapterMark roman="IV" total={chapters.length} />
          <h2 className="section-title text-center mb-2">Suspect Roster</h2>
          <p className="text-center font-stamp uppercase tracking-[0.25em] text-xs text-barn mb-8">
            Tap or hover a redacted line to declassify it
          </p>
        </Reveal>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {suspects.map((s, i) => (
            <Reveal key={s.value} delay={i * 120}>
              <article
                className="doc-card h-full px-5 py-6"
                style={{ transform: `rotate(${cardTilt[i] ?? 0}deg)` }}
              >
                <div className="flex items-center gap-3 mb-3">
                  <span className="text-4xl" aria-hidden>
                    {s.emoji}
                  </span>
                  <span className="badge-stamp text-[0.6rem]">
                    Suspect {String(i + 1).padStart(2, "0")}
                  </span>
                </div>

                {s.archetype && (
                  <p className="font-stamp uppercase tracking-[0.15em] text-[0.65rem] text-barn mb-1">
                    {s.archetype}
                  </p>
                )}

                <h3 className="font-serif font-bold text-lg text-navy leading-snug mb-2">
                  {s.name}
                </h3>

                <p className="text-navy/85 leading-relaxed">
                  {s.bio}{" "}
                  <span
                    role="button"
                    tabIndex={0}
                    onClick={() => toggle(i)}
                    onKeyDown={(e) => {
                      if (e.key === "Enter" || e.key === " ") {
                        e.preventDefault();
                        toggle(i);
                      }
                    }}
                    className={`redacted ${revealed[i] ? "revealed" : ""}`}
                    aria-label="Reveal redacted text"
                  >
                    {s.redacted}
                  </span>
                </p>
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

"use client";

import { useEffect, useState } from "react";
import { eventDetails } from "@/lib/eventDetails";

type Remaining = {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
  passed: boolean;
};

function getRemaining(): Remaining {
  const diff = new Date(eventDetails.startISO).getTime() - Date.now();
  if (diff <= 0) {
    return { days: 0, hours: 0, minutes: 0, seconds: 0, passed: true };
  }
  const sec = Math.floor(diff / 1000);
  return {
    days: Math.floor(sec / 86400),
    hours: Math.floor((sec % 86400) / 3600),
    minutes: Math.floor((sec % 3600) / 60),
    seconds: sec % 60,
    passed: false,
  };
}

function Unit({ value, label }: { value: number; label: string }) {
  return (
    <div className="flex flex-col items-center">
      <span className="font-serif font-black text-3xl sm:text-4xl text-barn tabular-nums leading-none">
        {String(value).padStart(2, "0")}
      </span>
      <span className="font-stamp uppercase tracking-widest text-[0.6rem] text-navy/70 mt-1">
        {label}
      </span>
    </div>
  );
}

export default function Countdown() {
  // Render zeros on the server to avoid hydration mismatch; hydrate live.
  const [t, setT] = useState<Remaining>({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
    passed: false,
  });
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    setT(getRemaining());
    const id = setInterval(() => setT(getRemaining()), 1000);
    return () => clearInterval(id);
  }, []);

  return (
    <div className="doc-card torn px-5 py-4 rotate-[-1deg] inline-block">
      <p className="font-stamp uppercase tracking-[0.25em] text-xs text-navy/70 text-center mb-2">
        {t.passed ? "The crime has occurred" : "Days Until the Crime"}
      </p>
      <div
        className="flex items-center justify-center gap-3 sm:gap-4"
        suppressHydrationWarning
      >
        {mounted && t.passed ? (
          <span className="font-serif font-black text-2xl text-barn">
            🔍 Case in progress
          </span>
        ) : (
          <>
            <Unit value={t.days} label="Days" />
            <span className="text-barn font-black text-2xl -mt-3">:</span>
            <Unit value={t.hours} label="Hrs" />
            <span className="text-barn font-black text-2xl -mt-3">:</span>
            <Unit value={t.minutes} label="Min" />
            <span className="text-barn font-black text-2xl -mt-3">:</span>
            <Unit value={t.seconds} label="Sec" />
          </>
        )}
      </div>
    </div>
  );
}

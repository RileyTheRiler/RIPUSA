"use client";

import { useState } from "react";
import { eventDetails } from "@/lib/eventDetails";
import { downloadICS } from "@/lib/ics";

export default function AddToCalendar() {
  const [showTip, setShowTip] = useState(false);

  if (!eventDetails.dateLocked) {
    // Disabled state with "date coming soon" tooltip until the date is locked.
    return (
      <div className="relative inline-block">
        <button
          type="button"
          disabled
          onMouseEnter={() => setShowTip(true)}
          onMouseLeave={() => setShowTip(false)}
          onFocus={() => setShowTip(true)}
          onBlur={() => setShowTip(false)}
          className="cursor-not-allowed opacity-50 font-stamp uppercase tracking-widest text-sm border-2 border-navy/50 px-4 py-2 rounded-sm"
        >
          + Add to Calendar
        </button>
        {showTip && (
          <span className="absolute left-1/2 top-full z-20 mt-2 -translate-x-1/2 whitespace-nowrap bg-navy text-parchment text-xs px-3 py-1 rounded-sm shadow-lg">
            Date coming soon
          </span>
        )}
      </div>
    );
  }

  return (
    <button
      type="button"
      onClick={downloadICS}
      className="font-stamp uppercase tracking-widest text-sm bg-barn text-parchment border-2 border-barn px-4 py-2 rounded-sm
        hover:bg-barn-bright hover:-translate-y-0.5 active:translate-y-0 transition shadow-md"
    >
      + Add to Calendar
    </button>
  );
}

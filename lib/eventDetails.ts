/**
 * SINGLE SOURCE OF TRUTH for all event facts.
 *
 * Everything the guest sees (logistics card, countdown, .ics calendar file,
 * confirmation email) is derived from this object. To update the party, edit
 * here — no need to touch any markup.
 */

export type EventDetails = {
  /** Set to false until the date/venue are locked; gates the "Add to Calendar" button. */
  dateLocked: boolean;
  title: string;
  tagline: string;
  /** ISO 8601 start time WITH timezone offset. Denver is UTC-06:00 in July (MDT). */
  startISO: string;
  /** Event duration in hours (used to compute the calendar end time). */
  durationHours: number;
  dateDisplay: string;
  timeDisplay: string;
  location: {
    name: string;
    address: string;
    note: string;
  };
  refreshments: string;
  questionsPhone: string;
  rsvpDeadlineISO: string;
  rsvpDeadlineDisplay: string;
  /**
   * Briefing video. Leave url as null/empty to render the styled placeholder.
   * Drop in any YouTube / Vimeo / Loom *embed* URL to go live.
   *   YouTube: https://www.youtube.com/embed/VIDEO_ID
   *   Vimeo:   https://player.vimeo.com/video/VIDEO_ID
   *   Loom:    https://www.loom.com/embed/VIDEO_ID
   */
  videoUrl: string | null;
};

export const eventDetails: EventDetails = {
  dateLocked: true,
  title: "🚨 THE CRIME OF THE SEMICENTENNIAL",
  tagline: "Dateline: July 12, 2026 — She's 250, broke, and still throwing the party.",

  // July 12, 2026, 6:30 PM Mountain Daylight Time (UTC-06:00)
  startISO: "2026-07-12T18:30:00-06:00",
  durationHours: 4,

  dateDisplay: "July 12, 2026",
  timeDisplay: "6:30 PM",

  location: {
    name: "Backyard HQ — near City Park",
    address: "2701 York St, Denver, CO 80205",
    note: "Near City Park. NOT 2701 S York St — that's a quiet family home across town with zero interest in becoming a crime scene. Trust the GPS pin, not your gut; your gut also thought America was fine.",
  },

  refreshments:
    "Free food and booze — the last bipartisan institution left standing. Show up hungry, thirsty, and ready to plead the fifth.",

  questionsPhone: "720-842-2720",

  rsvpDeadlineISO: "2026-07-05T23:59:00-06:00",
  rsvpDeadlineDisplay: "July 5, 2026",

  // No video yet — placeholder renders until this is set.
  videoUrl: null,
};

/** Human-readable description used inside the generated calendar invite. */
export const calendarDescription = [
  "You are summoned to an emergency, in-person backyard intervention for a",
  "250-year-old institution who refuses to see a therapist. Help us determine",
  "which of her so-called friends is trying to finish the job before she blows",
  "out the candles.",
  "",
  "Arrive in character. Refreshments provided. Alibis recommended.",
  `Questions? Text ${eventDetails.questionsPhone}.`,
  "",
  "ADDRESS NOTE: " + eventDetails.location.note,
].join("\n");

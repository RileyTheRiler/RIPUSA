/**
 * Suspect roster. `redacted` is the portion of the bio hidden behind a black
 * "[REDACTED]" bar until hover/tap (see SuspectRoster component).
 *
 * NOTE ON SATIRE: these characters allude to real public figures without naming
 * them. Keep it that way — the parody works through allusion, and it stays
 * lighter and safer on a public URL.
 */

export type Suspect = {
  /** Stable value submitted by the form / shown in emails. */
  value: string;
  emoji: string;
  name: string;
  /** Lead-in text, always visible. */
  bio: string;
  /** Hidden behind the redaction bar until revealed. */
  redacted: string;
  isCustom?: boolean;
};

export const suspects: Suspect[] = [
  {
    value: "The Fresh Princess of Beef (Wendy)",
    emoji: "🍔",
    name: "The Fresh Princess of Beef (Wendy)",
    bio: "Fiery-haired defender of square patties,",
    redacted: "ruthless about frozen meat standards.",
  },
  {
    value: "The Corporate Overlord (Mark)",
    emoji: "🤖",
    name: "The Corporate Overlord (Mark)",
    bio: "A completely normal human being who enjoys consuming water",
    redacted: "and harvesting personal biometric data.",
  },
  {
    value: "The Exotic Anarchist (Joe)",
    emoji: "🐯",
    name: "The Exotic Anarchist (Joe)",
    bio: "Bleach-blonde purveyor of tiger-print patterns",
    redacted: "and permanent, fringe-dwelling chaos.",
  },
  {
    value: "The Glitzy Gladiator (The Hot Dog)",
    emoji: "🌭",
    name: "The Glitzy Gladiator (The Hot Dog)",
    bio: "A sentient ballpark frankfurter adorned in rhinestones",
    redacted: "with a massive legal chip on his shoulder.",
  },
  {
    value: "Custom Suspect",
    emoji: "🎭",
    name: "Custom Suspect",
    bio: "“I wish to invent my own fictional or non-fictional American icon.”",
    redacted: "Bring your own chaos. Design details on the RSVP form.",
    isCustom: true,
  },
];

/** Slight, FIXED rotation per card (deg) for the "pinned to a board" look. */
export const cardTilt = [-1.4, 1.1, -0.8, 1.5, -1.2];

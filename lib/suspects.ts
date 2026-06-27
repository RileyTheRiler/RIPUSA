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
    bio: "Fiery-haired enforcer of the square patty, sworn lifelong enemy of the circle.",
    redacted: "Once called the cops on a competitor's clown for 'looking sketchy.'",
  },
  {
    value: "The Corporate Overlord (Mark)",
    emoji: "🤖",
    name: "The Corporate Overlord (Mark)",
    bio: "A completely normal, fully hydrated human male who definitely blinks on a regular schedule.",
    redacted: "Has read your texts. Has read everyone's texts. Calls it 'connection.'",
  },
  {
    value: "The Exotic Anarchist (Joe)",
    emoji: "🐯",
    name: "The Exotic Anarchist (Joe)",
    bio: "Bleach-blonde purveyor of tiger-print everything and a deeply unconvincing mullet.",
    redacted: "Currently running his campaign for President from a place he is legally barred from naming.",
  },
  {
    value: "The Glitzy Gladiator (The Hot Dog)",
    emoji: "🌭",
    name: "The Glitzy Gladiator (The Hot Dog)",
    bio: "A sentient ballpark frankfurter, fully rhinestoned, here on behalf of the bun-industrial complex.",
    redacted: "Has a restraining order against a man dressed as a giant mustard bottle. It's a whole thing.",
  },
  {
    value: "Custom Suspect",
    emoji: "🎭",
    name: "Custom Suspect",
    bio: "“None of these chaos goblins speak to my soul. I shall invent my own.”",
    redacted: "Bring your own chaos. Bureau accepts fictional, historical, or 'allegedly real' icons. Design details on the RSVP form.",
    isCustom: true,
  },
];

/** Slight, FIXED rotation per card (deg) for the "pinned to a board" look. */
export const cardTilt = [-1.4, 1.1, -0.8, 1.5, -1.2];

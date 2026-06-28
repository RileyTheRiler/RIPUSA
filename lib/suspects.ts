/**
 * Suspect roster. `redacted` is the portion of the bio hidden behind a black
 * "[REDACTED]" bar until hover/tap (see SuspectRoster component).
 */

export type Suspect = {
  /** Stable value submitted by the form / shown in emails. */
  value: string;
  emoji: string;
  name: string;
  /** One-line satirical archetype tagline, shown above the name. */
  archetype?: string;
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
    archetype: "The Fresh Princess of Beef",
    bio: "Fiery-haired defender of square patties,",
    redacted: "ruthless about frozen meat standards.",
  },
  {
    value: "The Corporate Overlord (Mark)",
    emoji: "🤖",
    name: "The Corporate Overlord (Mark)",
    archetype: "The Corporate Overlord",
    bio: "A completely normal human being who enjoys consuming water",
    redacted: "and harvesting personal biometric data.",
  },
  {
    value: "The Exotic Anarchist (Joe)",
    emoji: "🐯",
    name: "The Exotic Anarchist (Joe)",
    archetype: "The Exotic Anarchist",
    bio: "Bleach-blonde purveyor of tiger-print patterns",
    redacted: "and permanent, fringe-dwelling chaos.",
  },
  {
    value: "The Glitzy Gladiator (The Hot Dog)",
    emoji: "🌭",
    name: "The Glitzy Gladiator (The Hot Dog)",
    archetype: "The Glitzy Gladiator",
    bio: "A sentient ballpark frankfurter adorned in rhinestones",
    redacted: "with a massive legal chip on his shoulder.",
  },
  {
    value: "The Soft Power Diplomat (Charmin Bear)",
    emoji: "🧸",
    name: "The Soft Power Diplomat (Charmin Bear)",
    archetype: "The Soft Power Diplomat",
    bio: "Disarmingly gentle, never raises his voice,",
    redacted: "suspiciously interested in everyone's \"comfort.\"",
  },
  {
    value: "The Anarchist Trickster (Bugs Bunny)",
    emoji: "🐰",
    name: "The Anarchist Trickster (Bugs Bunny)",
    archetype: "The Anarchist Trickster",
    bio: "Wisecracking rabbit, smarter than everyone in the room,",
    redacted: "allegiance unclear, has been running this con since before the country existed.",
  },
  {
    value: "The Risk Auditor (Flo)",
    emoji: "📋",
    name: "The Risk Auditor (Flo)",
    archetype: "The Risk Auditor",
    bio: "Relentlessly upbeat, always selling something,",
    redacted: "has calculated that the nation's collapse is actuarially profitable for her.",
  },
  {
    value: "The Founding Eccentric (Franklin)",
    emoji: "🪁",
    name: "The Founding Eccentric (Franklin)",
    archetype: "The Founding Eccentric",
    bio: "Kite-flying, lightning-chasing elder statesman,",
    redacted: "privately feels this is all so far from his original vision it should just end.",
  },
  {
    value: "The Overachiever (Hamilton)",
    emoji: "🖋️",
    name: "The Overachiever (Hamilton)",
    archetype: "The Overachiever",
    bio: "Fast-talking, can't stop writing, treats small talk like a Cabinet battle,",
    redacted: "chronically under-credited and done waiting for his due.",
  },
  {
    value: "The Strongman of Softness (Brawny)",
    emoji: "🪵",
    name: "The Strongman of Softness (Brawny)",
    archetype: "The Strongman of Softness",
    bio: "Flannel-clad, helpful to a fault, insists on \"handling things\" physically,",
    redacted: "secretly emasculated by a lifetime of being \"just a paper towel guy.\"",
  },
  {
    value: "The Self-Appointed Detective (Velma)",
    emoji: "🔍",
    name: "The Self-Appointed Detective (Velma)",
    archetype: "The Self-Appointed Detective",
    bio: "Constantly \"solving\" the case out loud, losing and finding her glasses dramatically,",
    redacted: "tired of always finding the mystery and never getting to be it.",
  },
  {
    value: "The Midnight Oracle (Taco Bell)",
    emoji: "🔔",
    name: "The Midnight Oracle (Taco Bell)",
    archetype: "The Midnight Oracle",
    bio: "Speaks only in chimes and cryptic late-night cravings wisdom,",
    redacted: "resents the structured, daylight nature of a nation entirely.",
  },
  {
    value: "The Cookie Cartel Boss (Girl Scout)",
    emoji: "🍪",
    name: "The Cookie Cartel Boss (Girl Scout)",
    archetype: "The Cookie Cartel Boss",
    bio: "Sweet, earnest, sells badges and cookies and \"troop dues\" with ruthless instinct,",
    redacted: "has run the numbers and her cookie empire would be more profitable as its own micro-nation.",
  },
  {
    value: "The Teen Super-Spy (Kim Possible)",
    emoji: "📡",
    name: "The Teen Super-Spy (Kim Possible)",
    archetype: "The Teen Super-Spy",
    bio: "Hyper-competent, treats the party itself like a covert op,",
    redacted: "has decided that if nobody's funding her missions, she'll let one go wrong on purpose.",
  },
  {
    value: "The Silent Operative (Perry)",
    emoji: "🕶️",
    name: "The Silent Operative (Perry)",
    archetype: "The Silent Operative",
    bio: "Says literally nothing all party, wears a fedora, watches everything,",
    redacted: "decades of unrecognized secret-agent work have finally caught up with him.",
  },
  {
    value: "The Fallen Fast-Food King (Ronald)",
    emoji: "🤡",
    name: "The Fallen Fast-Food King (Ronald)",
    archetype: "The Fallen Fast-Food King",
    bio: "Try-hard nostalgic energy, name-drops \"the good old days\" of fast food dominance,",
    redacted: "watched his empire get out-marketed by every mascot in the room.",
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
export const cardTilt = [
  -1.4, 1.1, -0.8, 1.5, -1.2, 0.9, -1.6, 1.3, -0.6, 1.0, -1.3, 0.7, -1.1, 1.4,
  -0.9, 1.2,
];

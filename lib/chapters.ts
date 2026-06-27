/**
 * SINGLE SOURCE OF TRUTH for the case-file "chapters" that make up the
 * journey. Drives the JourneyNav scroll-spy and the chapter marks rendered
 * inside each section. Add/remove an entry here to add/remove a stop.
 */
export type Chapter = {
  id: string;
  roman: string;
  label: string;
  icon: string;
};

export const chapters: Chapter[] = [
  { id: "briefing", roman: "I", label: "The Briefing", icon: "🎥" },
  { id: "dossier", roman: "II", label: "Party Dossier", icon: "📁" },
  { id: "procedure", roman: "III", label: "How It Works", icon: "🎭" },
  { id: "roster", roman: "IV", label: "Suspect Roster", icon: "🕵️" },
  { id: "rsvp", roman: "V", label: "Your Testimony", icon: "🪶" },
];

/** A torn perforation between chapters — the "page turn" of the case file. */
export default function ChapterDivider({ icon = "✦" }: { icon?: string }) {
  return (
    <div
      aria-hidden="true"
      className="relative z-10 mx-auto flex max-w-3xl items-center justify-center gap-4 px-4 py-2"
    >
      <span className="h-px flex-1 bg-navy/25" style={{
        backgroundImage:
          "repeating-linear-gradient(to right, rgba(27,42,74,0.35) 0 6px, transparent 6px 12px)",
        height: "1px",
      }} />
      <span className="text-barn/70 text-base leading-none">{icon}</span>
      <span className="h-px flex-1 bg-navy/25" style={{
        backgroundImage:
          "repeating-linear-gradient(to right, rgba(27,42,74,0.35) 0 6px, transparent 6px 12px)",
        height: "1px",
      }} />
    </div>
  );
}

/** Eyebrow stamp announcing which chapter of the case file a section is. */
export default function ChapterMark({
  roman,
  total,
}: {
  roman: string;
  total: number;
}) {
  return (
    <p className="text-center font-stamp uppercase tracking-[0.35em] text-[0.65rem] text-barn/80 mb-3">
      Chapter {roman} of {total}
    </p>
  );
}

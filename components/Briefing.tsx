import Reveal from "./Reveal";
import VideoEmbed from "./VideoEmbed";
import ChapterMark from "./ChapterMark";
import { chapters } from "@/lib/chapters";

export default function Briefing() {
  return (
    <section
      id="briefing"
      className="relative z-10 min-h-screen chapter-scene flex flex-col justify-center px-4 py-12"
    >
      <Reveal className="mx-auto max-w-3xl w-full">
        <ChapterMark roman="I" total={chapters.length} />
        <div className="doc-card px-6 py-8 sm:px-10 sm:py-10 rotate-[0.4deg]">
          <h2 className="section-title mb-6 text-center">The Briefing</h2>
          <div className="space-y-5 font-serif text-lg leading-relaxed text-navy/90">
            <p>
              America—the great, the dramatic, the chronically online—is
              scheduled to turn 250 years old this July. Sources close to the
              investigation describe her condition as &ldquo;stable, but
              extremely online and deeply in debt.&rdquo; Worse: at least one of
              her closest friends is reportedly trying to finish her off before
              she blows out the candles.
            </p>
            <p>
              You are formally summoned to an emergency,{" "}
              <strong className="text-barn">in-person</strong> backyard
              intervention of the nation&apos;s most eccentric icons to identify
              the culprit before dessert. Bureau analysts have prepared an
              official intelligence briefing. Watch it below. Take notes. Trust
              no one, especially the ones in costume.
            </p>
          </div>
        </div>
      </Reveal>

      <Reveal className="mt-10" delay={120}>
        <VideoEmbed />
      </Reveal>
    </section>
  );
}

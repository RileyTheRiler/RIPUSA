import Image from "next/image";
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
              America—the great, the dramatic, the perpetually chaotic—is
              scheduled to turn 250 years old. But rumors are swirling through
              the grapevines of history that she won&apos;t survive long enough
              to cut her own birthday cake.
            </p>
            <p>
              You are formally summoned to an emergency,{" "}
              <strong className="text-barn">in-person</strong> backyard
              gathering of the nation&apos;s most eccentric icons to figure out
              who is plotting her demise... before it&apos;s too late. Watch the
              official intelligence briefing below.
            </p>
          </div>
        </div>
      </Reveal>

      <Reveal className="mx-auto mt-10 max-w-md w-full" delay={80}>
        <div className="doc-card torn p-3 -rotate-1">
          <div className="relative aspect-[7/9] overflow-hidden">
            <Image
              src="/images/exhibit-a.png"
              alt="Exhibit A: the nation, surrounded by suspects, on her deathbed"
              fill
              className="object-cover"
              sizes="(max-width: 768px) 90vw, 28rem"
            />
          </div>
          <p className="mt-3 text-center font-stamp uppercase tracking-[0.25em] text-[0.65rem] text-barn/80">
            Exhibit A — Scene of the Alleged Crime
          </p>
        </div>
      </Reveal>

      <Reveal className="mt-10" delay={120}>
        <VideoEmbed />
      </Reveal>
    </section>
  );
}

import { eventDetails } from "@/lib/eventDetails";

export default function Header() {
  return (
    <header className="relative z-10 px-4 pt-12 pb-8 sm:pt-16">
      <div className="mx-auto max-w-3xl text-center">
        {/* Decorative distressed border frame */}
        <div className="doc-card torn px-6 py-10 sm:px-12 sm:py-14 -rotate-[0.5deg]">
          <div className="mb-5 flex justify-center gap-3">
            <span className="badge-stamp">Classified</span>
            <span className="badge-stamp rotate-[2deg]">Top Secret</span>
          </div>

          <h1 className="font-serif font-black leading-[0.95] text-navy text-4xl sm:text-6xl md:text-7xl drop-shadow-sm">
            {eventDetails.title}
          </h1>

          <div className="mx-auto my-6 h-[3px] w-2/3 max-w-xs bg-gradient-to-r from-transparent via-barn to-transparent" />

          <p className="font-stamp uppercase tracking-[0.3em] text-barn text-sm sm:text-base">
            {eventDetails.tagline}
          </p>
        </div>
      </div>
    </header>
  );
}

import { eventDetails } from "@/lib/eventDetails";

/**
 * Briefing video in an ornate vintage frame. If `videoUrl` is null/empty,
 * renders a styled placeholder in the same frame so the layout never breaks.
 * Drop an embed URL into eventDetails.videoUrl to go live.
 */
export default function VideoEmbed() {
  const url = eventDetails.videoUrl;

  return (
    <div className="mx-auto max-w-2xl">
      <div className="ornate-frame torn bg-navy rotate-[0.4deg]">
        <div className="relative aspect-video w-full overflow-hidden bg-navy">
          {url ? (
            <iframe
              src={url}
              title="Official Intelligence Briefing"
              className="absolute inset-0 h-full w-full"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            />
          ) : (
            <div className="absolute inset-0 flex flex-col items-center justify-center gap-3 px-6 text-center text-parchment">
              <span className="text-5xl">🎥</span>
              <p className="font-serif text-xl sm:text-2xl font-bold">
                Briefing footage incoming
              </p>
              <p className="font-stamp uppercase tracking-widest text-xs text-parchment/70">
                Surveillance reel still developing — check back soon
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

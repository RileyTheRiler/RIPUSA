import { eventDetails } from "@/lib/eventDetails";

export default function Footer() {
  return (
    <footer className="relative z-10 px-4 pb-12 pt-6">
      <div className="mx-auto max-w-2xl text-center">
        <div className="mx-auto mb-5 h-[2px] w-1/2 max-w-xs bg-gradient-to-r from-transparent via-navy/40 to-transparent" />
        <p className="font-serif italic text-navy/70">
          This is satire. No actual nations were harmed in the making of this
          event.
        </p>
        <p className="mt-3 font-stamp uppercase tracking-widest text-xs text-navy/50">
          Questions? Text {eventDetails.questionsPhone} · Semicentennial
          Investigation Bureau
        </p>
      </div>
    </footer>
  );
}

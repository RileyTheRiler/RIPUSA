import Reveal from "./Reveal";
import Countdown from "./Countdown";
import AddToCalendar from "./AddToCalendar";
import { eventDetails } from "@/lib/eventDetails";

function Row({
  icon,
  label,
  children,
}: {
  icon: string;
  label: string;
  children: React.ReactNode;
}) {
  return (
    <div className="flex gap-3 border-b border-navy/15 py-3 last:border-b-0">
      <span className="text-2xl leading-none shrink-0" aria-hidden>
        {icon}
      </span>
      <div>
        <p className="font-stamp uppercase tracking-widest text-xs text-barn">
          {label}
        </p>
        <div className="text-navy/90">{children}</div>
      </div>
    </div>
  );
}

export default function Logistics() {
  const { location, refreshments, questionsPhone } = eventDetails;

  return (
    <section className="relative z-10 px-4 py-12">
      <Reveal className="mx-auto max-w-2xl">
        <div className="mb-6 flex justify-center">
          <Countdown />
        </div>

        <div className="doc-card px-6 py-8 sm:px-10 rotate-[-0.6deg]">
          <div className="mb-5 flex items-center justify-between gap-3 flex-wrap">
            <h2 className="section-title">Party Dossier</h2>
            <span className="badge-stamp text-xs">File #1776</span>
          </div>

          <div className="divide-y divide-navy/15">
            <Row icon="📅" label="Date">
              {eventDetails.dateDisplay}
            </Row>
            <Row icon="⏰" label="Time">
              {eventDetails.timeDisplay}
            </Row>
            <Row icon="📍" label="Location">
              <p className="font-semibold">{location.address}</p>
              <p className="text-sm text-barn mt-1">⚠️ {location.note}</p>
            </Row>
            <Row icon="🍾" label="Refreshments">
              {refreshments}
            </Row>
            <Row icon="📞" label="Questions? (what to bring, plus-ones, etc.)">
              <a
                href={`tel:${questionsPhone.replace(/[^0-9]/g, "")}`}
                className="underline decoration-barn/50 underline-offset-2 hover:text-barn"
              >
                {questionsPhone}
              </a>
            </Row>
            <Row icon="⏳" label="RSVP Deadline">
              {eventDetails.rsvpDeadlineDisplay}
            </Row>
          </div>

          <div className="mt-6 flex justify-center">
            <AddToCalendar />
          </div>
        </div>
      </Reveal>
    </section>
  );
}

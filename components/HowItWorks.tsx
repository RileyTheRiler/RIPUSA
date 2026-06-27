import Reveal from "./Reveal";
import ChapterMark from "./ChapterMark";
import { chapters } from "@/lib/chapters";

const steps = [
  {
    icon: "🎭",
    title: "Arrive in Character",
    body: "Review the suspect list, pick one (or invent your own), and commit to a costume. High-effort, over-the-top is encouraged.",
  },
  {
    icon: "✉️",
    title: "Envelope A (At the Door)",
    body: "The host hands you your physical Phase A envelope: secret objectives, blackmail material, and starting “Freedom Bucks.”",
  },
  {
    icon: "🎬",
    title: "The Catastrophe Strikes Live",
    body: "No scripted reading. The first ~45 minutes is mingling and trading secrets. Then a live theatrical “incident” occurs.",
  },
  {
    icon: "✉️",
    title: "Envelope B (After the Incident)",
    body: "Reveals how your secrets connect to the murder weapon and the culprit.",
  },
  {
    icon: "💰",
    title: "Social Sleuthing",
    body: "The mystery is solved through socializing, bribery, and trading dirty laundry over real drinks.",
  },
];

export default function HowItWorks() {
  return (
    <section
      id="procedure"
      className="relative z-10 min-h-screen chapter-scene flex flex-col justify-center px-4 py-12"
    >
      <div className="mx-auto max-w-3xl w-full">
        <Reveal>
          <ChapterMark roman="III" total={chapters.length} />
          <h2 className="section-title text-center mb-2">How It Works</h2>
          <p className="text-center font-stamp uppercase tracking-[0.25em] text-xs text-barn mb-8">
            In-person rules of engagement
          </p>
        </Reveal>

        <div className="space-y-4">
          {steps.map((step, i) => (
            <Reveal key={step.title} delay={i * 90}>
              <div className="doc-card flex gap-4 px-5 py-5 sm:px-6">
                <span className="text-3xl leading-none shrink-0" aria-hidden>
                  {step.icon}
                </span>
                <div>
                  <h3 className="font-serif font-bold text-xl text-navy">
                    {step.title}
                  </h3>
                  <p className="text-navy/85 mt-1 leading-relaxed">
                    {step.body}
                  </p>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

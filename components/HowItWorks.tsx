import Reveal from "./Reveal";
import ChapterMark from "./ChapterMark";
import { chapters } from "@/lib/chapters";

const steps = [
  {
    icon: "🎭",
    title: "Arrive in Character",
    body: "Review the suspect list, pick one (or invent your own), and commit to a costume like your alibi depends on it. Because it does. Subtlety will not be rewarded.",
  },
  {
    icon: "✉️",
    title: "Envelope A (At the Door)",
    body: "The host hands you your classified Phase A envelope: a secret objective, leverage on a stranger, and starting “Freedom Bucks” — our patriotic, completely unregulated currency.",
  },
  {
    icon: "🎬",
    title: "The Catastrophe Strikes Live",
    body: "No scripted reading, no rehearsal. The first ~45 minutes is mingling and quietly selling each other out. Then a live theatrical “incident” occurs, and several alibis immediately fall apart.",
  },
  {
    icon: "✉️",
    title: "Envelope B (After the Incident)",
    body: "Reveals exactly how your secret connects to the murder weapon, the culprit, and — most damning of all — you.",
  },
  {
    icon: "💰",
    title: "Social Sleuthing",
    body: "The case is cracked the old-fashioned way: socializing, light bribery, real drinks, and the unhinged trading of everyone's dirty laundry until somebody breaks.",
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
Rules of engagement. Yes, there are rules. No, you don't get a lawyer.
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

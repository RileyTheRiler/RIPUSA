"use client";

import { useState } from "react";
import confetti from "canvas-confetti";
import Reveal from "./Reveal";
import ChapterMark from "./ChapterMark";
import { suspects } from "@/lib/suspects";
import { chapters } from "@/lib/chapters";
import { playStampThud } from "@/lib/sound";

type Status = "idle" | "submitting" | "success" | "error";

const CUSTOM_VALUE = "Custom Suspect";

type Errors = Partial<
  Record<"name" | "email" | "suspectChoice" | "customAlibi", string>
>;

function fireConfetti() {
  // Red / navy / parchment burst, fired once.
  const colors = ["#7B1E1E", "#1B2A4A", "#F4EAD4"];
  confetti({
    particleCount: 110,
    spread: 75,
    origin: { y: 0.6 },
    colors,
  });
  confetti({
    particleCount: 60,
    angle: 60,
    spread: 55,
    origin: { x: 0, y: 0.7 },
    colors,
  });
  confetti({
    particleCount: 60,
    angle: 120,
    spread: 55,
    origin: { x: 1, y: 0.7 },
    colors,
  });
}

export default function RsvpForm() {
  const [status, setStatus] = useState<Status>("idle");
  const [errors, setErrors] = useState<Errors>({});
  const [serverError, setServerError] = useState<string>("");

  const [form, setForm] = useState({
    name: "",
    attendanceStatus: "Attending (Ready to Schmooze)",
    suspectChoice: "",
    customAlibi: "",
    dietaryRestrictions: "",
    email: "",
  });

  const isCustom = form.suspectChoice === CUSTOM_VALUE;

  const update =
    (field: keyof typeof form) =>
    (
      e: React.ChangeEvent<
        HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
      >
    ) => {
      setForm((prev) => ({ ...prev, [field]: e.target.value }));
      setErrors((prev) => ({ ...prev, [field]: undefined }));
    };

  function validate(): boolean {
    const next: Errors = {};
    if (!form.name.trim()) next.name = "The Bureau requires a name for the record, suspect.";
    if (!form.email.trim()) {
      next.email = "No email, no confirmation, no alibi. Try again.";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email.trim())) {
      next.email = "That's not an email. That's barely a sentence.";
    }
    if (!form.suspectChoice) {
      next.suspectChoice = "Choose an identity. The Bureau does not accept 'undecided.'";
    }
    if (isCustom && !form.customAlibi.trim()) {
      next.customAlibi = "Custom suspects must describe their character. Bureau doesn't do mystery-meat identities.";
    }
    setErrors(next);
    return Object.keys(next).length === 0;
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setServerError("");
    if (!validate()) return;

    setStatus("submitting");
    try {
      const res = await fetch("/api/rsvp", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      const data = await res.json().catch(() => ({}));

      if (!res.ok) {
        throw new Error(
          data?.error || "The Bureau's phone lines are jammed. Try again."
        );
      }

      // Success moment: sound + stamp + confetti.
      playStampThud();
      fireConfetti();
      setStatus("success");
    } catch (err) {
      setStatus("error");
      setServerError(
        err instanceof Error ? err.message : "Something went wrong."
      );
    }
  }

  if (status === "success") {
    return (
      <section
        id="rsvp"
        className="relative z-10 min-h-screen chapter-scene flex flex-col justify-center px-4 py-12"
      >
        <div className="mx-auto max-w-xl w-full">
          <ChapterMark roman="V" total={chapters.length} />
          <div className="doc-card torn relative px-6 py-14 text-center overflow-hidden">
            {/* Ink stamp */}
            <div className="pointer-events-none absolute right-4 top-4 sm:right-8 animate-stampIn">
              <div className="font-stamp uppercase tracking-[0.15em] text-barn border-4 border-barn rounded-md px-4 py-2 text-xl sm:text-2xl opacity-90 shadow-sm">
                Case Filed
              </div>
            </div>

            <p className="text-5xl mb-4">🕵️</p>
            <h2 className="section-title mb-4">
              Your testimony has been logged, suspect.
            </h2>
            <p className="font-serif text-lg text-navy/85">
              Your statement is now on file with the Semicentennial
              Investigation Bureau, where it will be read, judged, and possibly
              used against you. Check your email for written confirmation —
              including the address (double-check it, it&apos;s near City Park,
              NOT 2701 S York St — that address has had a long enough year
              already).
            </p>
            <p className="mt-4 text-navy/70">
              Come dressed for the part, bring your best alibi, and remember:
              the Bureau is always watching. Mostly metaphorically.
            </p>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section
      id="rsvp"
      className="relative z-10 min-h-screen chapter-scene flex flex-col justify-center px-4 py-12"
    >
      <Reveal className="mx-auto max-w-xl w-full">
        <ChapterMark roman="V" total={chapters.length} />
        <div className="doc-card px-6 py-8 sm:px-10 rotate-[0.3deg]">
          <div className="mb-6 text-center">
            <h2 className="section-title">Submit Your Testimony</h2>
            <p className="font-stamp uppercase tracking-[0.25em] text-xs text-barn mt-2">
              RSVP — by July 5, 2026
            </p>
          </div>

          <form onSubmit={handleSubmit} noValidate className="space-y-5">
            {/* Name */}
            <div>
              <label htmlFor="name" className="field-label">
                Guest Real Name *
              </label>
              <input
                id="name"
                type="text"
                value={form.name}
                onChange={update("name")}
                className="field-input"
                placeholder="Your real, legal, taxable name (no aliases — yet)"
                aria-invalid={!!errors.name}
              />
              {errors.name && (
                <p className="text-barn text-sm mt-1">{errors.name}</p>
              )}
            </div>

            {/* Attendance */}
            <fieldset>
              <legend className="field-label">Attendance Status *</legend>
              <div className="space-y-2">
                {[
                  "Attending (Ready to Schmooze)",
                  "Fleeing the Country (Cannot Attend)",
                ].map((opt) => (
                  <label
                    key={opt}
                    className="flex items-center gap-2 cursor-pointer text-navy/90"
                  >
                    <input
                      type="radio"
                      name="attendanceStatus"
                      value={opt}
                      checked={form.attendanceStatus === opt}
                      onChange={update("attendanceStatus")}
                      className="accent-barn"
                    />
                    {opt}
                  </label>
                ))}
              </div>
            </fieldset>

            {/* Suspect preference */}
            <div>
              <label htmlFor="suspectChoice" className="field-label">
                Suspect Preference *
              </label>
              <select
                id="suspectChoice"
                value={form.suspectChoice}
                onChange={update("suspectChoice")}
                className="field-input"
                aria-invalid={!!errors.suspectChoice}
              >
                <option value="" disabled>
                  Choose your designated identity…
                </option>
                {suspects.map((s) => (
                  <option key={s.value} value={s.value}>
                    {s.emoji} {s.name}
                  </option>
                ))}
              </select>
              <p className="text-xs text-navy/60 mt-1">
                Duplicate picks are resolved by the host via methods the host
                will not be disclosing in advance.
              </p>
              {errors.suspectChoice && (
                <p className="text-barn text-sm mt-1">{errors.suspectChoice}</p>
              )}
            </div>

            {/* Custom alibi — conditional */}
            {isCustom && (
              <div className="animate-fadeUp">
                <label htmlFor="customAlibi" className="field-label">
                  Custom Alibi &amp; Character Design *
                </label>
                <textarea
                  id="customAlibi"
                  value={form.customAlibi}
                  onChange={update("customAlibi")}
                  rows={4}
                  className="field-input resize-y"
                  placeholder="Describe your custom American character: name, historical background, and their deeply unconvincing motive for wanting America gone."
                  aria-invalid={!!errors.customAlibi}
                />
                {errors.customAlibi && (
                  <p className="text-barn text-sm mt-1">{errors.customAlibi}</p>
                )}
              </div>
            )}

            {/* Dietary */}
            <div>
              <label htmlFor="dietaryRestrictions" className="field-label">
                Dietary Restrictions
              </label>
              <input
                id="dietaryRestrictions"
                type="text"
                value={form.dietaryRestrictions}
                onChange={update("dietaryRestrictions")}
                className="field-input"
                placeholder="Allergies, vegetarian/vegan, sworn enemy of hot dogs, etc. — leave blank if none."
              />
            </div>

            {/* Email */}
            <div>
              <label htmlFor="email" className="field-label">
                Email *
              </label>
              <input
                id="email"
                type="email"
                value={form.email}
                onChange={update("email")}
                className="field-input"
                placeholder="Where the Bureau sends your written confirmation (and nothing else, probably)"
                aria-invalid={!!errors.email}
              />
              {errors.email && (
                <p className="text-barn text-sm mt-1">{errors.email}</p>
              )}
            </div>

            {serverError && (
              <div className="border-2 border-barn bg-barn/10 text-barn px-4 py-3 rounded-sm text-sm">
                ⚠️ {serverError}
              </div>
            )}

            <button
              type="submit"
              disabled={status === "submitting"}
              className="w-full font-stamp uppercase tracking-[0.2em] text-base bg-navy text-parchment border-2 border-navy
                px-6 py-3 rounded-sm hover:bg-navy-soft active:translate-y-0.5 transition shadow-lg
                disabled:opacity-60 disabled:cursor-wait"
            >
              {status === "submitting"
                ? "Filing testimony…"
                : "🪶 File My Testimony"}
            </button>
          </form>
        </div>
      </Reveal>
    </section>
  );
}

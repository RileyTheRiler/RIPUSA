# 🚨 The Crime of the Semicentennial

A one-page, single-scroll invitation site for an in-person satirical murder
mystery party celebrating America's 250th birthday. Built with **Next.js (App
Router)** + **Tailwind CSS**, with one serverless API route that emails the host
and the guest on RSVP. Deploys to **Vercel** from GitHub.

---

## Quick start (local)

```bash
npm install
cp .env.example .env.local   # then fill in your values
npm run dev                  # http://localhost:3000
```

The site renders fully without any env vars — only the RSVP **email send**
needs them (see below).

---

## Editing event details (the one place to change things)

Everything the guest sees is derived from **`lib/eventDetails.ts`**. Update that
file and the logistics card, countdown, `.ics` calendar file, and confirmation
email all follow. No markup edits needed.

| What | Where |
|---|---|
| Date / time / location | `lib/eventDetails.ts` → `eventDetails` |
| Briefing video | `lib/eventDetails.ts` → `videoUrl` (see below) |
| "Add to Calendar" gate | `lib/eventDetails.ts` → `dateLocked` |
| Suspect roster + bios | `lib/suspects.ts` |

### Adding the briefing video

Set `videoUrl` in `lib/eventDetails.ts` to an **embed** URL. Until then a styled
placeholder renders inside the same ornate frame.

- YouTube: `https://www.youtube.com/embed/VIDEO_ID`
- Vimeo: `https://player.vimeo.com/video/VIDEO_ID`
- Loom: `https://www.loom.com/embed/VIDEO_ID`

### "Add to Calendar"

A single `.ics` download (works on iOS, Android, Outlook, Google Calendar) is
generated client-side from `eventDetails`. While `dateLocked` is `false`, the
button shows disabled with a "date coming soon" tooltip.

---

## Email (RSVP → host + guest)

Uses **[Resend](https://resend.com)** (simplest free tier). The `/api/rsvp`
route validates server-side and sends **two** emails: a host notification and a
guest confirmation. Partial failures are logged and reported honestly — the
guest never sees a false "success".

### Environment variables

Set these in **Vercel → Project → Settings → Environment Variables** (and in
`.env.local` for local dev). Never commit real keys.

| Var | Purpose |
|---|---|
| `RESEND_API_KEY` | Your Resend API key |
| `RESEND_FROM` | Sender, e.g. `Semicentennial Bureau <onboarding@resend.dev>` |
| `HOST_EMAIL` | Where the host notification lands (your inbox) |

> **Resend note:** the shared `onboarding@resend.dev` sender can only deliver to
> your own verified Resend email. To send to real guests, verify a domain in
> Resend and set `RESEND_FROM` to an address on that domain.

---

## Deploy to Vercel

1. Push this repo to GitHub.
2. In Vercel, **New Project → Import** this repo (framework auto-detected as
   Next.js).
3. Add the env vars above.
4. Deploy. Auto-deploys on every push.

---

## Design / asset notes

- **Paper grain, torn edges, ornate video frame, redaction bars, ink stamp** —
  all pure CSS/SVG, no image assets or external fonts beyond Google Fonts
  (Playfair Display, Inter, Special Elite) loaded via `next/font`.
- **Confetti** — `canvas-confetti` (a few KB), fires once on RSVP success.
- **Stamp-thud sound** — synthesized at runtime via the Web Audio API
  (`lib/sound.ts`), so there's **no audio asset and no license to track**. It is
  user-initiated only (RSVP submit click) and never autoplays. Swap in a CC0
  sample if you prefer — see the note at the top of `lib/sound.ts`.
- **Reduced motion** — animations are disabled under
  `prefers-reduced-motion: reduce`.

## Not included (v2 candidates, per the spec)

- Database / running RSVP list (currently lives only in the email).
- Plus-ones (no extra-guest field or policy yet).
- Per-character illustrated avatars (text + emoji cards for now).

---

*This is satire. No actual nations were harmed in the making of this event.*

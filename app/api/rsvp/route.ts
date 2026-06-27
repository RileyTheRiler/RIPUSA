import { NextRequest, NextResponse } from "next/server";
import { Resend } from "resend";
import { eventDetails } from "@/lib/eventDetails";
import { suspects } from "@/lib/suspects";

export const runtime = "nodejs";

type RsvpPayload = {
  name?: string;
  attendanceStatus?: string;
  suspectChoice?: string;
  customAlibi?: string;
  dietaryRestrictions?: string;
  email?: string;
};

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const VALID_SUSPECTS = suspects.map((s) => s.value);

function escapeHtml(s: string): string {
  return s
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

export async function POST(req: NextRequest) {
  let body: RsvpPayload;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json(
      { error: "Malformed request." },
      { status: 400 }
    );
  }

  // ---- Server-side validation (don't trust the client) ----
  const name = (body.name || "").trim();
  const email = (body.email || "").trim();
  const suspectChoice = (body.suspectChoice || "").trim();
  const attendanceStatus = (body.attendanceStatus || "").trim();
  const customAlibi = (body.customAlibi || "").trim();
  const dietaryRestrictions = (body.dietaryRestrictions || "").trim();

  const errors: string[] = [];
  if (!name) errors.push("name");
  if (!email || !EMAIL_RE.test(email)) errors.push("email");
  if (!suspectChoice || !VALID_SUSPECTS.includes(suspectChoice)) {
    errors.push("suspectChoice");
  }
  if (suspectChoice === "Custom Suspect" && !customAlibi) {
    errors.push("customAlibi");
  }
  if (errors.length > 0) {
    return NextResponse.json(
      { error: `Invalid or missing fields: ${errors.join(", ")}` },
      { status: 422 }
    );
  }

  // ---- Config check ----
  const apiKey = process.env.RESEND_API_KEY;
  const fromAddress =
    process.env.RESEND_FROM || "Semicentennial Bureau <onboarding@resend.dev>";
  const hostEmail = process.env.HOST_EMAIL;

  if (!apiKey || !hostEmail) {
    console.error(
      "[rsvp] Missing email config: RESEND_API_KEY or HOST_EMAIL not set."
    );
    return NextResponse.json(
      { error: "The Bureau's mail room is offline. Please text the host." },
      { status: 500 }
    );
  }

  const resend = new Resend(apiKey);

  const safe = {
    name: escapeHtml(name),
    email: escapeHtml(email),
    suspectChoice: escapeHtml(suspectChoice),
    attendanceStatus: escapeHtml(attendanceStatus || "Not specified"),
    customAlibi: escapeHtml(customAlibi || "—"),
    dietary: escapeHtml(dietaryRestrictions || "None provided"),
  };

  const { address, note } = eventDetails.location;

  // ---- Host notification ----
  const hostText = `A new suspect has cracked under the immense pressure of a web form
and submitted an RSVP response.

--- SUSPECT INPUT DOSSIER ---
👤 GUEST REAL NAME: ${name}
📬 ATTENDANCE STATUS: ${attendanceStatus || "Not specified"}
🎭 DESIGNATED IDENTITY: ${suspectChoice}
🍽️ DIETARY RESTRICTIONS: ${dietaryRestrictions || "None provided"}
📧 GUEST EMAIL: ${email}

📝 CUSTOM CHARACTER BRIEFING (IF APPLICABLE):
${customAlibi || "—"}
----------------------------

Next step: log this suspect in your master spreadsheet, resolve any
duplicate suspect picks manually, prep their Phase A/B envelopes,
print their name tag, and stack their starting Freedom Bucks.`;

  const hostHtml = `
    <div style="font-family:Georgia,serif;color:#1B2A4A;max-width:600px">
      <p>A new suspect has cracked under the immense pressure of a web form and submitted an RSVP response.</p>
      <h3 style="color:#7B1E1E;border-bottom:2px solid #7B1E1E;padding-bottom:4px">SUSPECT INPUT DOSSIER</h3>
      <p>👤 <strong>Guest Real Name:</strong> ${safe.name}<br/>
      📬 <strong>Attendance Status:</strong> ${safe.attendanceStatus}<br/>
      🎭 <strong>Designated Identity:</strong> ${safe.suspectChoice}<br/>
      🍽️ <strong>Dietary Restrictions:</strong> ${safe.dietary}<br/>
      📧 <strong>Guest Email:</strong> ${safe.email}</p>
      <p>📝 <strong>Custom Character Briefing (if applicable):</strong><br/>
      ${safe.customAlibi.replace(/\n/g, "<br/>")}</p>
      <hr/>
      <p style="font-size:13px;color:#555">Next step: log this suspect in your master spreadsheet, resolve any duplicate suspect picks manually, prep their Phase A/B envelopes, print their name tag, and stack their starting Freedom Bucks.</p>
    </div>`;

  // ---- Guest confirmation ----
  const guestText = `You're confirmed, suspect. Your statement has been filed with the
Semicentennial Investigation Bureau, where it will be cross-referenced,
judged, and lightly mocked in a group chat you are not part of.

🎭 Your designated identity: ${suspectChoice}

We'll see you on ${eventDetails.dateDisplay} at ${eventDetails.timeDisplay} at ${address}
(${note})

Come dressed for the part — and bring your best alibi.

Questions about what to bring, plus-ones, or anything else?
Text ${eventDetails.questionsPhone}.`;

  const guestHtml = `
    <div style="font-family:Georgia,serif;color:#1B2A4A;max-width:600px">
      <p>You're confirmed, suspect. Your statement has been filed with the <strong>Semicentennial Investigation Bureau</strong>, where it will be cross-referenced, judged, and lightly mocked in a group chat you are not part of.</p>
      <p>🎭 <strong>Your designated identity:</strong> ${safe.suspectChoice}</p>
      <p>We'll see you on <strong>${eventDetails.dateDisplay}</strong> at <strong>${eventDetails.timeDisplay}</strong> at<br/>
      <strong>${escapeHtml(address)}</strong></p>
      <p style="color:#7B1E1E"><strong>⚠️ ${escapeHtml(note)}</strong></p>
      <p>Come dressed for the part — and bring your best alibi.</p>
      <p style="font-size:13px;color:#555">Questions about what to bring, plus-ones, or anything else? Text ${escapeHtml(eventDetails.questionsPhone)}.</p>
    </div>`;

  // ---- Send both; track partial failures ----
  let hostOk = false;
  let guestOk = false;

  try {
    const hostRes = await resend.emails.send({
      from: fromAddress,
      to: hostEmail,
      replyTo: email,
      subject: "🚨 EMERGENCY DETECTIVE UPDATE: New Suspect RSVP Received",
      text: hostText,
      html: hostHtml,
    });
    if (hostRes.error) {
      console.error("[rsvp] Host email failed:", hostRes.error);
    } else {
      hostOk = true;
    }
  } catch (err) {
    console.error("[rsvp] Host email threw:", err);
  }

  try {
    const guestRes = await resend.emails.send({
      from: fromAddress,
      to: email,
      subject: "🕵️ Your Testimony Has Been Logged",
      text: guestText,
      html: guestHtml,
    });
    if (guestRes.error) {
      console.error("[rsvp] Guest email failed:", guestRes.error);
    } else {
      guestOk = true;
    }
  } catch (err) {
    console.error("[rsvp] Guest email threw:", err);
  }

  // The host notification is the source of truth for the RSVP. If it failed,
  // the RSVP is effectively lost — report an honest error, never a false success.
  if (!hostOk) {
    return NextResponse.json(
      {
        error:
          "We couldn't file your testimony with the Bureau. Please try again or text the host.",
      },
      { status: 502 }
    );
  }

  if (!guestOk) {
    // Host got it (RSVP is safe) but the guest's copy bounced. Log it and tell
    // the guest the truth so they're not waiting on an email that won't arrive.
    console.error(
      `[rsvp] PARTIAL FAILURE: host notified but guest confirmation to ${email} failed.`
    );
    return NextResponse.json(
      {
        ok: true,
        warning:
          "Your RSVP is logged, but the confirmation email couldn't be sent.",
      },
      { status: 200 }
    );
  }

  return NextResponse.json({ ok: true }, { status: 200 });
}

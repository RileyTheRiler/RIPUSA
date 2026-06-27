import { eventDetails, calendarDescription } from "./eventDetails";

/** Format a Date as a UTC iCalendar timestamp: YYYYMMDDTHHMMSSZ */
function toICSDate(d: Date): string {
  return d.toISOString().replace(/[-:]/g, "").replace(/\.\d{3}/, "");
}

/** Escape text per RFC 5545 (commas, semicolons, newlines). */
function escapeICS(text: string): string {
  return text
    .replace(/\\/g, "\\\\")
    .replace(/;/g, "\\;")
    .replace(/,/g, "\\,")
    .replace(/\n/g, "\\n");
}

/**
 * Build an RFC 5545 .ics file body from eventDetails. Works for import on
 * iOS, Android, Outlook, and Google Calendar.
 */
export function buildICS(): string {
  const start = new Date(eventDetails.startISO);
  const end = new Date(
    start.getTime() + eventDetails.durationHours * 60 * 60 * 1000
  );

  const lines = [
    "BEGIN:VCALENDAR",
    "VERSION:2.0",
    "PRODID:-//Semicentennial Investigation Bureau//Murder Mystery//EN",
    "CALSCALE:GREGORIAN",
    "METHOD:PUBLISH",
    "BEGIN:VEVENT",
    `UID:${start.getTime()}@semicentennial-mystery`,
    `DTSTAMP:${toICSDate(new Date())}`,
    `DTSTART:${toICSDate(start)}`,
    `DTEND:${toICSDate(end)}`,
    `SUMMARY:${escapeICS("The Crime of the Semicentennial — Murder Mystery Party")}`,
    `DESCRIPTION:${escapeICS(calendarDescription)}`,
    `LOCATION:${escapeICS(eventDetails.location.address)}`,
    "END:VEVENT",
    "END:VCALENDAR",
  ];

  // RFC 5545 uses CRLF line endings.
  return lines.join("\r\n");
}

/** Trigger a client-side download of the .ics file. */
export function downloadICS(): void {
  const blob = new Blob([buildICS()], {
    type: "text/calendar;charset=utf-8",
  });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = "semicentennial-mystery.ics";
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
}

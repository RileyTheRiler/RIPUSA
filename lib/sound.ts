/**
 * Stamp-thud sound effect.
 *
 * DESIGN CHOICE / LICENSE NOTE: rather than ship an audio asset (and track its
 * license), the "stamp thud" is synthesized at runtime with the Web Audio API —
 * a short low-frequency thump + a noise transient. This is original, requires no
 * file, and adds zero bytes to the bundle. It is user-initiated only (fires on
 * the RSVP submit click) and never autoplays.
 *
 * If you'd rather use a recorded sample, drop a CC0 click/stamp file in
 * /public (e.g. from freesound.org or mixkit.co), note its source + license
 * here, and play it with `new Audio('/your-file.mp3').play()` from the click
 * handler instead of calling playStampThud().
 */
export function playStampThud(): void {
  if (typeof window === "undefined") return;
  try {
    const Ctx =
      window.AudioContext ||
      (window as unknown as { webkitAudioContext: typeof AudioContext })
        .webkitAudioContext;
    if (!Ctx) return;
    const ctx = new Ctx();
    const now = ctx.currentTime;

    // Low "thud" body — a fast pitch drop.
    const osc = ctx.createOscillator();
    const oscGain = ctx.createGain();
    osc.type = "sine";
    osc.frequency.setValueAtTime(160, now);
    osc.frequency.exponentialRampToValueAtTime(45, now + 0.12);
    oscGain.gain.setValueAtTime(0.6, now);
    oscGain.gain.exponentialRampToValueAtTime(0.001, now + 0.22);
    osc.connect(oscGain).connect(ctx.destination);

    // Short noise transient — the "slap" of paper.
    const bufferSize = Math.floor(ctx.sampleRate * 0.05);
    const buffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
    const data = buffer.getChannelData(0);
    for (let i = 0; i < bufferSize; i++) {
      data[i] = (Math.random() * 2 - 1) * (1 - i / bufferSize);
    }
    const noise = ctx.createBufferSource();
    noise.buffer = buffer;
    const noiseGain = ctx.createGain();
    noiseGain.gain.setValueAtTime(0.35, now);
    noiseGain.gain.exponentialRampToValueAtTime(0.001, now + 0.06);
    noise.connect(noiseGain).connect(ctx.destination);

    osc.start(now);
    osc.stop(now + 0.24);
    noise.start(now);
    noise.stop(now + 0.06);

    // Tidy up the context shortly after playback.
    setTimeout(() => ctx.close().catch(() => {}), 500);
  } catch {
    // Audio is non-essential; never let it break the submit flow.
  }
}

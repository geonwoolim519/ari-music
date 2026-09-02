export function detectPitchHz(buf: ArrayLike<number>, sampleRate: number) {
  let rms = 0;
  for (let i = 0; i < buf.length; i += 1) rms += buf[i] * buf[i];
  rms = Math.sqrt(rms / buf.length);
  if (rms < 0.012) return null;

  const minLag = Math.floor(sampleRate / 900);
  const maxLag = Math.min(Math.floor(sampleRate / 80), buf.length - 1);
  let bestLag = -1;
  let bestCorr = 0;
  let prev = 1;

  for (let lag = minLag; lag <= maxLag; lag += 1) {
    let corr = 0;
    for (let i = 0; i < buf.length - lag; i += 1) {
      corr += buf[i] * buf[i + lag];
    }
    const norm = corr / (buf.length - lag);
    if (norm > bestCorr && norm > prev) {
      bestCorr = norm;
      bestLag = lag;
    }
    prev = norm;
  }

  if (bestLag < 0 || bestCorr < 0.01) return null;
  return sampleRate / bestLag;
}

export function midiFromHz(hz: number) {
  return 69 + 12 * Math.log2(hz / 440);
}

export function pitchScore(hz: number | null, expectedMidi: number) {
  if (hz == null || hz <= 0) return 0;
  const sung = midiFromHz(hz);
  let cents = Math.abs((sung - expectedMidi) * 100);
  cents = Math.min(cents % 1200, 1200 - (cents % 1200));
  if (cents <= 50) return 1;
  if (cents <= 100) return 0.7;
  if (cents <= 200) return 0.35;
  return 0;
}

export function expectedMidiAt(
  notes: { start: number; end: number; midi: number }[],
  time: number,
) {
  for (const note of notes) {
    if (time >= note.start && time < note.end) return note.midi;
  }
  return null;
}

export function gradeFromScore(score: number) {
  if (score >= 90) return "S";
  if (score >= 80) return "A";
  if (score >= 70) return "B";
  if (score >= 55) return "C";
  return "D";
}

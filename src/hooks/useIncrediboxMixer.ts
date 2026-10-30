import { useEffect, useRef } from "react";

const BAR = 2;

function AudioContextClass() {
  return window.AudioContext
    || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
}

function fillPluck(
  data: Float32Array,
  sr: number,
  t0: number,
  freq: number,
  dur: number,
  amp: number,
) {
  const start = Math.floor(t0 * sr);
  const n = Math.floor(dur * sr);
  for (let i = 0; i < n; i += 1) {
    const idx = start + i;
    if (idx < 0 || idx >= data.length) continue;
    const t = i / sr;
    const env = Math.exp(-t * 7) * Math.max(0, 1 - t / dur);
    const wave =
      Math.sin(2 * Math.PI * freq * t) + 0.22 * Math.sin(2 * Math.PI * freq * 2 * t);
    data[idx] += amp * env * wave;
  }
}

function fillFlute(
  data: Float32Array,
  sr: number,
  t0: number,
  freq: number,
  dur: number,
  amp: number,
) {
  const start = Math.floor(t0 * sr);
  const n = Math.floor(dur * sr);
  for (let i = 0; i < n; i += 1) {
    const idx = start + i;
    if (idx < 0 || idx >= data.length) continue;
    const t = i / sr;
    const fade = Math.min(t * 18, 1) * Math.max(0, 1 - t / dur);
    const vib = freq * (1 + 0.012 * Math.sin(2 * Math.PI * 5.2 * t));
    data[idx] += amp * fade * Math.sin(2 * Math.PI * vib * t);
  }
}

function fillPiano(
  data: Float32Array,
  sr: number,
  t0: number,
  freq: number,
  dur: number,
  amp: number,
) {
  const start = Math.floor(t0 * sr);
  const n = Math.floor(dur * sr);
  const harmonics = [1, 0.48, 0.22, 0.12, 0.07, 0.04];
  for (let i = 0; i < n; i += 1) {
    const idx = start + i;
    if (idx < 0 || idx >= data.length) continue;
    const t = i / sr;
    const env = Math.exp(-t * 4.2) * Math.max(0, 1 - t / dur);
    let wave = 0;
    for (let h = 0; h < harmonics.length; h += 1) {
      wave += harmonics[h] * Math.sin(2 * Math.PI * freq * (h + 1) * t);
    }
    data[idx] += amp * env * wave;
  }
}

function fillReed(
  data: Float32Array,
  sr: number,
  t0: number,
  freq: number,
  dur: number,
  amp: number,
) {
  const start = Math.floor(t0 * sr);
  const n = Math.floor(dur * sr);
  for (let i = 0; i < n; i += 1) {
    const idx = start + i;
    if (idx < 0 || idx >= data.length) continue;
    const t = i / sr;
    const fade = Math.min(t * 22, 1) * Math.max(0, 1 - t / dur);
    const phase = 2 * Math.PI * freq * t;
    const saw = 2 * ((freq * t) % 1) - 1;
    data[idx] += amp * fade * (0.55 * Math.sin(phase) + 0.28 * saw);
  }
}

function fillHit(
  data: Float32Array,
  sr: number,
  t0: number,
  dur: number,
  amp: number,
  tone: number,
) {
  const start = Math.floor(t0 * sr);
  const n = Math.floor(dur * sr);
  for (let i = 0; i < n; i += 1) {
    const idx = start + i;
    if (idx < 0 || idx >= data.length) continue;
    const t = i / sr;
    const env = Math.exp(-t * (tone > 80 ? 14 : 9));
    const noise = Math.random() * 2 - 1;
    const body = Math.sin(2 * Math.PI * tone * t);
    data[idx] += amp * env * (0.62 * noise + 0.38 * body);
  }
}

function normalize(data: Float32Array, peak = 0.72) {
  let max = 0.0001;
  for (let i = 0; i < data.length; i += 1) max = Math.max(max, Math.abs(data[i]));
  const g = peak / max;
  for (let i = 0; i < data.length; i += 1) data[i] *= g;
}

function makeBuffer(ctx: AudioContext, fill: (data: Float32Array, sr: number) => void) {
  const sr = ctx.sampleRate;
  const buf = ctx.createBuffer(1, Math.floor(sr * BAR), sr);
  const data = buf.getChannelData(0);
  fill(data, sr);
  normalize(data);
  return buf;
}

const G3 = 196;
const D4 = 293.66;
const E4 = 329.63;
const G4 = 392;
const A4 = 440;
const C5 = 523.25;

const BUILDERS: Record<string, (ctx: AudioContext) => AudioBuffer> = {
  geomungo: (ctx) =>
    makeBuffer(ctx, (d, sr) => {
      fillPluck(d, sr, 0, G3, 0.9, 1);
      fillPluck(d, sr, 1, D4 / 2, 0.85, 0.8);
    }),
  sogeum: (ctx) =>
    makeBuffer(ctx, (d, sr) => {
      fillFlute(d, sr, 0, G4, 0.45, 0.55);
      fillFlute(d, sr, 0.5, A4, 0.45, 0.5);
      fillFlute(d, sr, 1, C5, 0.45, 0.52);
      fillFlute(d, sr, 1.5, A4, 0.45, 0.48);
    }),
  haegeum: (ctx) =>
    makeBuffer(ctx, (d, sr) => {
      fillReed(d, sr, 0, E4, 0.95, 0.42);
      fillReed(d, sr, 1, G4, 0.95, 0.38);
    }),
  gayageum: (ctx) =>
    makeBuffer(ctx, (d, sr) => {
      fillPluck(d, sr, 0, G4, 0.55, 0.7);
      fillPluck(d, sr, 0.5, D4, 0.5, 0.62);
      fillPluck(d, sr, 1, A4, 0.5, 0.66);
      fillPluck(d, sr, 1.5, G4, 0.48, 0.6);
    }),
  janggu: (ctx) =>
    makeBuffer(ctx, (d, sr) => {
      fillHit(d, sr, 0, 0.22, 1, 70);
      fillHit(d, sr, 0.5, 0.12, 0.45, 180);
      fillHit(d, sr, 1, 0.2, 0.85, 78);
      fillHit(d, sr, 1.5, 0.1, 0.4, 190);
    }),
  piri: (ctx) =>
    makeBuffer(ctx, (d, sr) => {
      fillReed(d, sr, 0, A4, 0.7, 0.4);
      fillReed(d, sr, 1, E4, 0.7, 0.38);
    }),
  piano: (ctx) =>
    makeBuffer(ctx, (d, sr) => {
      fillPiano(d, sr, 0, G4, 0.7, 0.72);
      fillPiano(d, sr, 0.5, D4, 0.62, 0.58);
      fillPiano(d, sr, 1, A4, 0.65, 0.66);
      fillPiano(d, sr, 1.5, G4, 0.48, 0.6);
    }),
  flute: (ctx) =>
    makeBuffer(ctx, (d, sr) => {
      fillFlute(d, sr, 0, G4, 0.48, 0.52);
      fillFlute(d, sr, 0.5, A4, 0.48, 0.5);
      fillFlute(d, sr, 1, C5, 0.48, 0.52);
      fillFlute(d, sr, 1.5, A4, 0.48, 0.48);
    }),
};

type Voice = { source: AudioBufferSourceNode; gain: GainNode };

export function useIncrediboxMixer(ids: string[], volume: number) {
  const ctxRef = useRef<AudioContext | null>(null);
  const masterRef = useRef<GainNode | null>(null);
  const voicesRef = useRef<Map<string, Voice>>(new Map());
  const buffersRef = useRef<Map<string, AudioBuffer>>(new Map());
  const barAtRef = useRef(0);

  const ensure = async () => {
    const Ctx = AudioContextClass();
    if (!ctxRef.current) {
      const ctx = new Ctx();
      const master = ctx.createGain();
      const comp = ctx.createDynamicsCompressor();
      comp.threshold.value = -16;
      comp.ratio.value = 3.5;
      master.connect(comp);
      comp.connect(ctx.destination);
      master.gain.value = volume / 100;
      ctxRef.current = ctx;
      masterRef.current = master;
    }
    if (ctxRef.current.state === "suspended") {
      await ctxRef.current.resume();
    }
    return ctxRef.current;
  };

  useEffect(() => {
    const master = masterRef.current;
    if (master) master.gain.value = volume / 100;
  }, [volume]);

  useEffect(() => {
    let cancelled = false;
    const sync = async () => {
      const wanted = new Set(ids);
      const voices = voicesRef.current;
      for (const [id, voice] of voices) {
        if (wanted.has(id)) continue;
        try {
          voice.source.stop();
        } catch {
          /* already stopped */
        }
        voice.source.disconnect();
        voice.gain.disconnect();
        voices.delete(id);
      }
      if (wanted.size === 0) {
        barAtRef.current = 0;
        return;
      }
      const ctx = await ensure();
      if (cancelled || !ctx || !masterRef.current) return;
      if (barAtRef.current === 0) barAtRef.current = ctx.currentTime;
      for (const id of wanted) {
        if (voices.has(id)) continue;
        let buf = buffersRef.current.get(id);
        if (!buf) {
          const build = BUILDERS[id];
          if (!build) continue;
          buf = build(ctx);
          buffersRef.current.set(id, buf);
        }
        const gain = ctx.createGain();
        gain.gain.value = 0.85;
        const source = ctx.createBufferSource();
        source.buffer = buf;
        source.loop = true;
        source.connect(gain);
        gain.connect(masterRef.current);
        const elapsed = ((ctx.currentTime - barAtRef.current) % BAR + BAR) % BAR;
        source.start(0, elapsed);
        voices.set(id, { source, gain });
      }
    };
    void sync();
    return () => {
      cancelled = true;
    };
  }, [ids.join("|")]);

  useEffect(() => {
    return () => {
      for (const voice of voicesRef.current.values()) {
        try {
          voice.source.stop();
        } catch {
          /* ignore */
        }
        voice.source.disconnect();
        voice.gain.disconnect();
      }
      voicesRef.current.clear();
      void ctxRef.current?.close();
      ctxRef.current = null;
      masterRef.current = null;
    };
  }, []);

  return { arm: ensure };
}

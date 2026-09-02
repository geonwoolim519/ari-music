import { useEffect, useRef, useState } from "react";
import { detectPitchHz } from "../lib/pitch";

export type MicStatus = "off" | "on" | "denied";

function AudioContextClass() {
  return window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
}

export function useKaraokeMix() {
  const ctxRef = useRef<AudioContext | null>(null);
  const wiredRef = useRef(false);
  const analyserRef = useRef<AnalyserNode | null>(null);
  const streamRef = useRef<MediaStream | null>(null);
  const micNodesRef = useRef<AudioNode[]>([]);
  const [mic, setMic] = useState<MicStatus>("off");
  const [level, setLevel] = useState(0);
  const pitchBufRef = useRef<Float32Array | null>(null);

  const ensureGraph = async (audio: HTMLAudioElement) => {
    audio.setAttribute("playsinline", "true");
    const Ctx = AudioContextClass();
    if (!ctxRef.current) ctxRef.current = new Ctx();
    const ctx = ctxRef.current;
    if (ctx.state === "suspended") await ctx.resume();
    if (!wiredRef.current) {
      const source = ctx.createMediaElementSource(audio);
      source.connect(ctx.destination);
      wiredRef.current = true;
    }
    return ctx;
  };

  const stopMic = () => {
    streamRef.current?.getTracks().forEach((track) => track.stop());
    streamRef.current = null;
    micNodesRef.current.forEach((node) => node.disconnect());
    micNodesRef.current = [];
    analyserRef.current = null;
  };

  const toggleMic = async (audio: HTMLAudioElement) => {
    if (mic === "on") {
      stopMic();
      setMic("off");
      setLevel(0);
      return;
    }
    try {
      const ctx = await ensureGraph(audio);
      const stream = await navigator.mediaDevices.getUserMedia({
        audio: {
          echoCancellation: true,
          noiseSuppression: true,
          autoGainControl: true,
        },
      });
      streamRef.current = stream;
      const input = ctx.createMediaStreamSource(stream);
      const gain = ctx.createGain();
      gain.gain.value = 1.2;
      const analyser = ctx.createAnalyser();
      analyser.fftSize = 2048;
      analyser.smoothingTimeConstant = 0;
      const delay = ctx.createDelay(0.5);
      delay.delayTime.value = 0.14;
      const feedback = ctx.createGain();
      feedback.gain.value = 0.16;
      input.connect(gain);
      gain.connect(analyser);
      gain.connect(ctx.destination);
      gain.connect(delay);
      delay.connect(feedback);
      feedback.connect(delay);
      delay.connect(ctx.destination);
      analyserRef.current = analyser;
      micNodesRef.current = [input, gain, analyser, delay, feedback];
      setMic("on");
    } catch {
      stopMic();
      setMic("denied");
      setLevel(0);
    }
  };

  useEffect(() => {
    if (mic !== "on") return;
    const analyser = analyserRef.current;
    if (!analyser) return;
    const data = new Uint8Array(analyser.fftSize);
    let raf = 0;
    const tick = () => {
      analyser.getByteTimeDomainData(data);
      let sum = 0;
      for (let i = 0; i < data.length; i += 1) {
        const v = (data[i] - 128) / 128;
        sum += v * v;
      }
      setLevel(Math.min(1, Math.sqrt(sum / data.length) * 3.2));
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [mic]);

  useEffect(() => {
    return () => {
      stopMic();
      const ctx = ctxRef.current;
      ctxRef.current = null;
      wiredRef.current = false;
      if (ctx && ctx.state !== "closed") void ctx.close();
    };
  }, []);

  const readPitchHz = () => {
    const analyser = analyserRef.current;
    const ctx = ctxRef.current;
    if (!analyser || !ctx || mic !== "on") return null;
    if (!pitchBufRef.current || pitchBufRef.current.length !== analyser.fftSize) {
      pitchBufRef.current = new Float32Array(analyser.fftSize);
    }
    analyser.getFloatTimeDomainData(pitchBufRef.current as Float32Array<ArrayBuffer>);
    return detectPitchHz(pitchBufRef.current, ctx.sampleRate);
  };

  return { ensureGraph, toggleMic, mic, level, readPitchHz };
}

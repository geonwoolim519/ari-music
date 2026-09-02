import { useEffect, useMemo, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { bonjoKaraoke, bonjoMelody, type KaraokeLine } from "../data/karaoke";
import { useKaraokeMix } from "../hooks/useKaraokeMix";
import { expectedMidiAt, gradeFromScore, pitchScore } from "../lib/pitch";
import { usePlayerStore } from "../store/playerStore";
import { useLocaleStore, useT } from "../store/localeStore";

function formatTime(seconds: number) {
  if (!Number.isFinite(seconds) || seconds < 0) return "0:00";
  const mins = Math.floor(seconds / 60);
  const secs = Math.floor(seconds % 60);
  return `${mins}:${secs.toString().padStart(2, "0")}`;
}

function lineAt(lines: KaraokeLine[], time: number) {
  for (let i = 0; i < lines.length; i += 1) {
    if (time < lines[i].end || i === lines.length - 1) {
      const line = lines[i];
      const span = Math.max(line.end - line.start, 0.01);
      const progress = (time - line.start) / span;
      return { index: i, line, progress: Math.min(1, Math.max(0, progress)) };
    }
  }
  const last = lines[lines.length - 1];
  return { index: lines.length - 1, line: last, progress: 1 };
}

function WipeText({
  text,
  progress,
  className,
  fillClass,
}: {
  text: string;
  progress: number;
  className: string;
  fillClass: string;
}) {
  const rest = Math.max(0, (1 - progress) * 100);
  return (
    <span className={`relative inline-block max-w-full ${className}`}>
      <span className="text-white/35">{text}</span>
      <span
        className={`absolute inset-0 overflow-hidden ${fillClass}`}
        style={{ clipPath: `inset(0 ${rest.toFixed(3)}% 0 0)` }}
        aria-hidden
      >
        {text}
      </span>
    </span>
  );
}

export function StudioPage() {
  const navigate = useNavigate();
  const t = useT();
  const locale = useLocaleStore((state) => state.locale);
  const pausePlayer = usePlayerStore((state) => state.pausePlayback);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const barRef = useRef<HTMLButtonElement>(null);
  const { ensureGraph, toggleMic, mic, level, readPitchHz } = useKaraokeMix();
  const [playing, setPlaying] = useState(false);
  const [time, setTime] = useState(0);
  const [duration, setDuration] = useState(51);
  const [result, setResult] = useState<{ score: number; grade: string; usedMic: boolean } | null>(
    null,
  );
  const samplesRef = useRef<{ t: number; hz: number | null }[]>([]);
  const lastPitchAtRef = useRef(0);
  const readPitchRef = useRef(readPitchHz);
  const micRef = useRef(mic);
  readPitchRef.current = readPitchHz;
  micRef.current = mic;

  useEffect(() => {
    const audio = new Audio(bonjoKaraoke.audioUrl);
    audio.preload = "auto";
    audioRef.current = audio;

    let raf = 0;
    const tick = () => {
      const now = audio.currentTime;
      setTime(now);
      if (micRef.current === "on" && now - lastPitchAtRef.current >= 0.08) {
        lastPitchAtRef.current = now;
        samplesRef.current.push({ t: now, hz: readPitchRef.current() });
      }
      if (!audio.paused && !audio.ended) raf = requestAnimationFrame(tick);
    };
    const onMeta = () => {
      if (Number.isFinite(audio.duration) && audio.duration > 0) {
        setDuration(audio.duration);
      }
    };
    const onPlay = () => {
      setPlaying(true);
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(tick);
    };
    const onPause = () => {
      setPlaying(false);
      cancelAnimationFrame(raf);
      setTime(audio.currentTime);
    };
    const onEnded = () => {
      setPlaying(false);
      cancelAnimationFrame(raf);
      setTime(audio.duration || audio.currentTime);
      const takes = samplesRef.current;
      if (takes.length < 12) {
        setResult({ score: 0, grade: "D", usedMic: false });
        return;
      }
      let points = 0;
      let counted = 0;
      for (const take of takes) {
        const midi = expectedMidiAt(bonjoMelody, take.t);
        if (midi == null) continue;
        counted += 1;
        points += pitchScore(take.hz, midi);
      }
      const score = counted > 0 ? Math.round((points / counted) * 100) : 0;
      setResult({ score, grade: gradeFromScore(score), usedMic: true });
    };

    audio.addEventListener("loadedmetadata", onMeta);
    audio.addEventListener("play", onPlay);
    audio.addEventListener("pause", onPause);
    audio.addEventListener("ended", onEnded);

    return () => {
      cancelAnimationFrame(raf);
      audio.pause();
      audio.src = "";
      audioRef.current = null;
      audio.removeEventListener("loadedmetadata", onMeta);
      audio.removeEventListener("play", onPlay);
      audio.removeEventListener("pause", onPause);
      audio.removeEventListener("ended", onEnded);
    };
  }, []);

  const { index, line, progress } = useMemo(
    () => lineAt(bonjoKaraoke.lines, time),
    [time],
  );
  const upcoming = bonjoKaraoke.lines[index + 1];
  const ratio = duration > 0 ? Math.min(time / duration, 1) : 0;

  const toggle = () => {
    const audio = audioRef.current;
    if (!audio) return;
    if (audio.paused) {
      pausePlayer();
      if (audio.ended || audio.currentTime >= duration - 0.05) {
        audio.currentTime = 0;
        samplesRef.current = [];
        lastPitchAtRef.current = 0;
        setResult(null);
      }
      void (async () => {
        await ensureGraph(audio);
        await audio.play();
      })().catch(() => undefined);
    } else {
      audio.pause();
    }
  };

  const restart = () => {
    const audio = audioRef.current;
    if (!audio) return;
    pausePlayer();
    audio.currentTime = 0;
    setTime(0);
    samplesRef.current = [];
    lastPitchAtRef.current = 0;
    setResult(null);
    void (async () => {
      await ensureGraph(audio);
      await audio.play();
    })().catch(() => undefined);
  };

  const seekFromEvent = (clientX: number) => {
    const bar = barRef.current;
    const audio = audioRef.current;
    if (!bar || !audio || duration <= 0) return;
    const rect = bar.getBoundingClientRect();
    const next = Math.min(1, Math.max(0, (clientX - rect.left) / rect.width)) * duration;
    audio.currentTime = next;
    setTime(next);
  };

  return (
    <div className="flex h-full flex-col bg-[#14061f] text-white">
      <header className="relative flex h-[52px] shrink-0 items-center justify-center px-[12px]">
        <button
          type="button"
          className="absolute left-[10px] grid h-[36px] w-[36px] place-items-center text-white/70"
          aria-label={t("back")}
          onClick={() => navigate("/")}
        >
          <svg width="18" height="18" viewBox="0 0 16 16" fill="none" aria-hidden>
            <path
              d="M10.5 3.2 5.2 8 10.5 12.8"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </button>
        <h1 className="text-[17px] font-extrabold tracking-[-0.03em]">{t("studioTitle")}</h1>
      </header>

      <div className="flex min-h-0 flex-1 flex-col px-[20px] pb-[130px] pt-[8px]">
        <p className="text-center text-[13px] font-medium tracking-[0.18em] text-[#ff8fb0]">
          {locale === "en" ? bonjoKaraoke.titleEn : bonjoKaraoke.title}
        </p>
        <p className="mt-[6px] text-center text-[12px] leading-[1.5] text-white/55">
          {mic === "denied" ? t("karaokeMicDenied") : mic === "on" ? t("karaokeMicHint") : t("karaokeHint")}
        </p>

        <div className="relative mt-[22px] flex min-h-0 flex-1 flex-col items-center justify-center overflow-hidden rounded-[28px] bg-white/[0.06] px-[18px] py-[28px] ring-1 ring-white/10">
          <span className="pointer-events-none absolute -right-8 -top-10 h-[140px] w-[140px] rounded-full bg-[#ff4d8a]/20 blur-2xl" />
          <span className="pointer-events-none absolute -bottom-12 -left-10 h-[160px] w-[160px] rounded-full bg-[#7b2cff]/25 blur-2xl" />

          <div className="relative z-[1] grid min-h-[168px] w-full place-items-center text-center">
            <WipeText
              text={line.ko}
              progress={playing || time > 0 ? progress : 0}
              className="text-[26px] font-extrabold leading-[1.45] tracking-[-0.03em]"
              fillClass="text-white"
            />
            <WipeText
              text={line.ro}
              progress={playing || time > 0 ? progress : 0}
              className="mt-[12px] text-[15px] font-medium leading-[1.5] tracking-[0.01em]"
              fillClass="text-[#ffd6e8]"
            />
          </div>

          <p className="relative z-[1] mt-[22px] min-h-[20px] text-center text-[12px] text-white/35">
            {upcoming ? upcoming.ko : time >= duration - 0.2 ? t("karaokeDone") : ""}
          </p>
        </div>

        <button
          type="button"
          ref={barRef}
          className="mt-[18px] block h-[8px] w-full overflow-hidden rounded-full bg-white/15"
          aria-label={t("karaokeSeek")}
          onPointerDown={(event) => {
            event.currentTarget.setPointerCapture(event.pointerId);
            seekFromEvent(event.clientX);
          }}
          onPointerMove={(event) => {
            if (!event.currentTarget.hasPointerCapture(event.pointerId)) return;
            seekFromEvent(event.clientX);
          }}
        >
          <span
            className="block h-full rounded-full bg-[#ff4d8a]"
            style={{ width: `${ratio * 100}%` }}
          />
        </button>
        <div className="mt-[6px] flex justify-between text-[11px] text-white/45">
          <span>{formatTime(time)}</span>
          <span>{formatTime(duration)}</span>
        </div>

        <div className="mt-[18px] flex items-center justify-center gap-[22px]">
          <button
            type="button"
            className="grid h-[48px] w-[48px] place-items-center rounded-full bg-white/10 text-[12px] font-semibold"
            onClick={restart}
          >
            {t("karaokeAgain")}
          </button>
          <button
            type="button"
            className="grid h-[72px] w-[72px] place-items-center rounded-full bg-[#ff4d8a] shadow-[0_10px_24px_rgba(255,77,138,0.35)]"
            aria-label={playing ? t("pause") : t("play")}
            onClick={toggle}
          >
            {playing ? (
              <svg width="22" height="22" viewBox="0 0 22 22" fill="white" aria-hidden>
                <rect x="5" y="4" width="4.4" height="14" rx="1.4" />
                <rect x="12.6" y="4" width="4.4" height="14" rx="1.4" />
              </svg>
            ) : (
              <svg width="22" height="22" viewBox="0 0 22 22" fill="white" aria-hidden>
                <path d="M7 4.2 18.2 11 7 17.8Z" />
              </svg>
            )}
          </button>
          <button
            type="button"
            className="relative grid h-[48px] w-[48px] place-items-center rounded-full"
            style={{
              background: mic === "on" ? "#ff4d8a" : "rgba(255,255,255,0.1)",
              boxShadow: mic === "on" ? `0 0 0 ${4 + level * 10}px rgba(255,77,138,${0.18 + level * 0.35})` : "none",
            }}
            aria-label={mic === "on" ? t("karaokeMicOn") : t("karaokeMic")}
            aria-pressed={mic === "on"}
            onClick={() => {
              const audio = audioRef.current;
              if (audio) void toggleMic(audio);
            }}
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden>
              <rect x="10.2" y="12" width="3.6" height="7.2" rx="1.8" stroke="white" strokeWidth="1.7" />
              <ellipse cx="12" cy="8.4" rx="4.2" ry="4.8" stroke="white" strokeWidth="1.7" />
            </svg>
          </button>
        </div>
      </div>

      {result ? (
        <div className="absolute inset-0 z-40 grid place-items-center bg-[#14061f]/82 px-[28px] pb-[80px]">
          <div className="w-full rounded-[28px] bg-white px-[22px] py-[28px] text-center text-[#1a1a1a]">
            <p className="text-[13px] font-semibold tracking-[0.12em] text-[#ff4d8a]">
              {t("karaokeScore")}
            </p>
            {result.usedMic ? (
              <>
                <p className="mt-[10px] text-[56px] font-extrabold leading-none tracking-[-0.04em]">
                  {result.score}
                </p>
                <p className="mt-[12px] text-[18px] font-bold">
                  {t(
                    (
                      {
                        S: "karaokeGradeS",
                        A: "karaokeGradeA",
                        B: "karaokeGradeB",
                        C: "karaokeGradeC",
                        D: "karaokeGradeD",
                      } as const
                    )[result.grade as "S" | "A" | "B" | "C" | "D"],
                  )}
                </p>
              </>
            ) : (
              <p className="mt-[16px] text-[15px] leading-[1.6] text-[#444]">
                {t("karaokeNeedMic")}
              </p>
            )}
            <div className="mt-[24px] flex gap-[10px]">
              <button
                type="button"
                className="h-[46px] flex-1 rounded-full bg-[#f0f0f0] text-[14px] font-bold"
                onClick={() => setResult(null)}
              >
                {t("close")}
              </button>
              <button
                type="button"
                className="h-[46px] flex-1 rounded-full bg-[#ff4d8a] text-[14px] font-bold text-white"
                onClick={restart}
              >
                {t("karaokeAgain")}
              </button>
            </div>
          </div>
        </div>
      ) : null}
    </div>
  );
}

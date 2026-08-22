import { useRef } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { albumName, getAlbum, LYRICS_PLACEHOLDER, trackTitle } from "../data/albums";
import { usePlayerStore } from "../store/playerStore";
import { useUiStore } from "../store/uiStore";
import { useLocaleStore, useT } from "../store/localeStore";

function formatTime(seconds: number) {
  if (!Number.isFinite(seconds) || seconds < 0) return "0:00";
  const mins = Math.floor(seconds / 60);
  const secs = Math.floor(seconds % 60);
  return `${mins}:${secs.toString().padStart(2, "0")}`;
}

function activeLyricIndex(lyrics: { time: number; text: string }[], currentTime: number) {
  if (lyrics.length === 0) return 0;
  let index = 0;
  for (let i = 0; i < lyrics.length; i += 1) {
    if (currentTime >= lyrics[i].time) index = i;
    else break;
  }
  return index;
}

export function LyricsModal() {
  const open = useUiStore((state) => state.lyricsOpen);
  const close = useUiStore((state) => state.closeLyrics);
  const track = usePlayerStore((state) => state.currentTrack);
  const isPlaying = usePlayerStore((state) => state.isPlaying);
  const currentTime = usePlayerStore((state) => state.currentTime);
  const duration = usePlayerStore((state) => state.duration);
  const togglePlay = usePlayerStore((state) => state.togglePlay);
  const nextTrack = usePlayerStore((state) => state.nextTrack);
  const prevTrack = usePlayerStore((state) => state.prevTrack);
  const seek = usePlayerStore((state) => state.seek);
  const album = track ? getAlbum(track.albumId) : undefined;
  const locale = useLocaleStore((state) => state.locale);
  const t = useT();
  const barRef = useRef<HTMLButtonElement>(null);
  const progress = duration > 0 ? Math.min(currentTime / duration, 1) : 0;
  const lyricIndex = track ? activeLyricIndex(track.lyrics, currentTime) : 0;
  const visibleLyrics = track?.lyrics.slice(lyricIndex, lyricIndex + 3) ?? [];

  const seekFromEvent = (clientX: number) => {
    const bar = barRef.current;
    if (!bar || duration <= 0) return;
    const rect = bar.getBoundingClientRect();
    const ratio = Math.min(1, Math.max(0, (clientX - rect.left) / rect.width));
    seek(ratio * duration);
  };

  return (
    <AnimatePresence>
      {open && track && (
        <motion.div
          className="absolute inset-0 z-50"
          initial={{ y: "100%" }}
          animate={{ y: 0 }}
          exit={{ y: "100%" }}
          transition={{ type: "spring", damping: 28, stiffness: 280 }}
          drag="y"
          dragConstraints={{ top: 0, bottom: 0 }}
          dragElastic={{ top: 0.04, bottom: 0.55 }}
          dragMomentum={false}
          onDragEnd={(_, info) => {
            if (info.offset.y > 90 || info.velocity.y > 650) close();
          }}
          style={{ background: album?.theme ?? "#A0A355" }}
        >
          <div className="flex h-full flex-col px-[22px] pt-[4px] text-white">
            <button
              type="button"
              className="flex h-[28px] w-full items-center justify-center"
              aria-label="가사 닫기"
              onClick={close}
            >
              <span className="h-[5px] w-[48px] rounded-full bg-white/90" />
            </button>
            <p className="mt-[6px] text-[20px] font-extrabold leading-[1.25]">
              {album ? `${albumName(album, locale)} ${t("albumWord")}` : ""}
            </p>
            <p className="mt-[4px] text-[15px] font-medium text-white/95">
              {trackTitle(track, locale)}
            </p>

            <div className="mx-auto mt-[22px] h-[210px] w-[210px] overflow-hidden rounded-[22px]">
              <img
                src={album?.cover}
                alt=""
                className="block h-full w-full scale-[1.04] object-cover object-center"
              />
            </div>

            <div className="flex min-h-[118px] flex-1 flex-col justify-center overflow-hidden py-[18px] text-center">
              <AnimatePresence mode="popLayout" initial={false}>
                {visibleLyrics.map((line, index) => (
                  <motion.p
                    key={`${line.time}-${line.text}`}
                    layout="position"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{
                      opacity: 1,
                      y: 0,
                      color: index === 0 ? "#111111" : "#ffffff",
                    }}
                    exit={{ opacity: 0, y: -16 }}
                    transition={{
                      duration: 0.55,
                      ease: [0.22, 1, 0.36, 1],
                      layout: { duration: 0.55, ease: [0.22, 1, 0.36, 1] },
                    }}
                    className="mb-[8px] text-[18px] font-bold leading-[1.45]"
                  >
                    {line.text === LYRICS_PLACEHOLDER ? t("lyricsSoon") : line.text}
                  </motion.p>
                ))}
              </AnimatePresence>
            </div>

            <div className="pb-[28px] pt-[4px]">
              <button
                ref={barRef}
                type="button"
                aria-label="재생 위치"
                className="relative block h-[8px] w-full overflow-hidden rounded-full bg-white"
                onPointerDown={(event) => {
                  event.stopPropagation();
                  event.currentTarget.setPointerCapture(event.pointerId);
                  seekFromEvent(event.clientX);
                }}
                onPointerMove={(event) => {
                  if (event.currentTarget.hasPointerCapture(event.pointerId)) {
                    seekFromEvent(event.clientX);
                  }
                }}
              >
                <span
                  className="absolute inset-y-0 left-0 bg-black"
                  style={{ width: `${progress * 100}%` }}
                />
              </button>
              <div className="mt-[8px] flex justify-between text-[13px] font-semibold text-white">
                <span>{formatTime(currentTime)}</span>
                <span>{formatTime(duration)}</span>
              </div>
              <div className="mt-[18px] flex items-center justify-center gap-[46px]">
                <button
                  type="button"
                  aria-label="이전 곡"
                  className="grid h-[44px] w-[44px] place-items-center"
                  onClick={prevTrack}
                >
                  <svg width="28" height="22" viewBox="0 0 28 22" fill="white">
                    <rect x="1" y="2" width="4" height="18" rx="1" />
                    <path d="M26 2.2v17.6L8.4 11 26 2.2Z" />
                  </svg>
                </button>
                <button
                  type="button"
                  aria-label={isPlaying ? "일시정지" : "재생"}
                  className="grid h-[52px] w-[52px] place-items-center"
                  onClick={togglePlay}
                >
                  {isPlaying ? (
                    <svg width="28" height="32" viewBox="0 0 28 32" fill="white">
                      <rect x="2" y="2" width="8" height="28" rx="1.5" />
                      <rect x="18" y="2" width="8" height="28" rx="1.5" />
                    </svg>
                  ) : (
                    <svg width="30" height="34" viewBox="0 0 30 34" fill="white">
                      <path d="M3 2.2v29.6L27.5 17 3 2.2Z" />
                    </svg>
                  )}
                </button>
                <button
                  type="button"
                  aria-label="다음 곡"
                  className="grid h-[44px] w-[44px] place-items-center"
                  onClick={nextTrack}
                >
                  <svg width="28" height="22" viewBox="0 0 28 22" fill="white">
                    <path d="M2 2.2v17.6L19.6 11 2 2.2Z" />
                    <rect x="23" y="2" width="4" height="18" rx="1" />
                  </svg>
                </button>
              </div>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

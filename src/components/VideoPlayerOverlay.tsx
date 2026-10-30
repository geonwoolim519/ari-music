import { useEffect } from "react";
import { getArchiveVideo, youtubeEmbedSrc } from "../data/videos";
import { useLocaleStore, useT } from "../store/localeStore";
import { usePlayerStore } from "../store/playerStore";
import { useUiStore } from "../store/uiStore";

export function VideoPlayerOverlay() {
  const videoId = useUiStore((state) => state.watchingVideoId);
  const closeVideo = useUiStore((state) => state.closeVideo);
  const pausePlayback = usePlayerStore((state) => state.pausePlayback);
  const t = useT();
  const locale = useLocaleStore((state) => state.locale);
  const video = getArchiveVideo(videoId);

  useEffect(() => {
    if (!videoId) return;
    pausePlayback();
  }, [pausePlayback, videoId]);

  useEffect(() => {
    if (!videoId) return undefined;
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") closeVideo();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [closeVideo, videoId]);

  if (!videoId || !video) return null;

  const title = locale === "en" ? video.titleEn : video.title;
  const channel = locale === "en" ? video.channelEn : video.channel;

  return (
    <div className="absolute inset-0 z-40 flex flex-col overflow-hidden overscroll-none bg-black text-white">
      <header className="relative flex h-[calc(52px+var(--sat))] shrink-0 items-center justify-center px-[12px] pt-[var(--sat)]">
        <button
          type="button"
          className="absolute left-[10px] grid h-[44px] w-[44px] place-items-center text-white/80"
          aria-label={t("videoClose")}
          onClick={closeVideo}
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
        <h1 className="max-w-[72%] truncate text-[15px] font-extrabold tracking-[-0.03em]">
          {title}
        </h1>
      </header>

      <div className="flex min-h-0 flex-1 flex-col pb-[max(24px,env(safe-area-inset-bottom))]">
        <div className="relative aspect-video w-full shrink-0 bg-[#111]">
          <iframe
            key={video.youtubeId}
            src={youtubeEmbedSrc(video.youtubeId)}
            title={title}
            className="absolute inset-0 h-full w-full border-0"
            style={{ touchAction: "auto" }}
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            allowFullScreen
            referrerPolicy="strict-origin-when-cross-origin"
          />
        </div>
        <div className="px-[22px] pt-[16px]">
          <p className="text-[16px] font-extrabold leading-snug tracking-[-0.03em]">{title}</p>
          <p className="mt-[6px] text-[13px] text-white/55">{channel}</p>
        </div>
      </div>
    </div>
  );
}

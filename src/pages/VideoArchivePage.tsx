import { archiveVideos, youtubeThumb } from "../data/videos";
import { useLocaleStore, useT } from "../store/localeStore";
import { useUiStore } from "../store/uiStore";

export function VideoArchivePage() {
  const t = useT();
  const locale = useLocaleStore((state) => state.locale);
  const openVideo = useUiStore((state) => state.openVideo);
  const isEn = locale === "en";

  return (
    <div className="flex h-full flex-col bg-white">
      <header className="px-[22px] pb-[4px] pt-[calc(var(--sat)+16px)]">
        <h1 className="text-[34px] font-extrabold tracking-[-0.06em] text-black">
          {t("videoArchive")}
        </h1>
        <p className="mt-[8px] text-[13px] font-medium leading-[1.45] tracking-[-0.02em] text-[#888]">
          {t("videoArchiveSubtitle")}
        </p>
      </header>

      <div className="phone-scroll min-h-0 flex-1 overflow-y-auto px-[22px] pb-[160px] pt-[14px]">
        <ul className="flex flex-col gap-[18px]">
          {archiveVideos.map((video) => {
            const title = isEn ? video.titleEn : video.title;
            const channel = isEn ? video.channelEn : video.channel;
            return (
              <li key={video.id}>
                <button
                  type="button"
                  className="w-full text-left"
                  onClick={() => openVideo(video.id)}
                  aria-label={`${title} ${t("videoPlay")}`}
                >
                  <span className="relative block aspect-video overflow-hidden rounded-[18px] bg-[#111] shadow-[0_8px_18px_rgba(0,0,0,0.12)]">
                    <img
                      src={youtubeThumb(video.youtubeId)}
                      alt=""
                      className="h-full w-full object-cover"
                      draggable={false}
                    />
                    <span className="absolute inset-0 bg-black/18" />
                    <span className="absolute inset-0 grid place-items-center">
                      <span className="grid h-[46px] w-[46px] place-items-center rounded-full bg-white/92 text-black shadow-[0_4px_12px_rgba(0,0,0,0.28)]">
                        <svg width="16" height="18" viewBox="0 0 16 18" fill="currentColor" aria-hidden>
                          <path d="M2 1.6v14.8L14.8 9.2 2 1.6Z" />
                        </svg>
                      </span>
                    </span>
                  </span>
                  <span className="mt-[10px] block text-[16px] font-extrabold leading-snug tracking-[-0.03em] text-black">
                    {title}
                  </span>
                  <span className="mt-[4px] block text-[13px] text-[#888]">{channel}</span>
                </button>
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
}

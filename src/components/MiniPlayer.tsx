import { getAlbum } from "../data/albums";
import { useAlbumChrome } from "../hooks/useAlbumChrome";
import { usePlayerStore } from "../store/playerStore";
import { useUiStore } from "../store/uiStore";

export function MiniPlayer() {
  const currentTrack = usePlayerStore((state) => state.currentTrack);
  const isPlaying = usePlayerStore((state) => state.isPlaying);
  const visible = usePlayerStore((state) => state.isMiniPlayerVisible);
  const togglePlay = usePlayerStore((state) => state.togglePlay);
  const nextTrack = usePlayerStore((state) => state.nextTrack);
  const openLyrics = useUiStore((state) => state.openLyrics);
  const pageAlbum = useAlbumChrome();

  if (!visible || !currentTrack) return null;

  const album = getAlbum(currentTrack.albumId);
  const themed = Boolean(pageAlbum);
  const controlColor = themed ? "text-white" : "text-black";

  return (
    <div className="pointer-events-auto absolute inset-x-[16px] bottom-[78px] z-20">
      <div
        className="flex h-[54px] items-center gap-[10px] rounded-full px-[8px] shadow-[0_8px_20px_rgba(0,0,0,0.18)] backdrop-blur-md"
        style={{
          background: themed ? `${pageAlbum?.bar ?? "#3F3610"}cc` : "rgba(197,197,197,0.9)",
        }}
      >
        <button
          type="button"
          className="flex min-w-0 flex-1 items-center gap-[10px] text-left"
          onClick={openLyrics}
        >
          <img
            src={album?.cover}
            alt=""
            className="h-[40px] w-[40px] rounded-full object-cover"
          />
          <span className={`truncate text-[15px] font-semibold ${controlColor}`}>
            {currentTrack.title}
          </span>
        </button>
        <button
          type="button"
          aria-label={isPlaying ? "일시정지" : "재생"}
          className={`grid h-[40px] w-[36px] place-items-center ${controlColor}`}
          onClick={togglePlay}
        >
          {isPlaying ? (
            <svg width="16" height="18" viewBox="0 0 16 18" fill="currentColor">
              <rect x="1" y="1" width="5" height="16" rx="1.2" />
              <rect x="10" y="1" width="5" height="16" rx="1.2" />
            </svg>
          ) : (
            <svg width="16" height="18" viewBox="0 0 16 18" fill="currentColor">
              <path d="M2 1.6v14.8L14.8 9.2 2 1.6Z" />
            </svg>
          )}
        </button>
        <button
          type="button"
          aria-label="다음 곡"
          className={`mr-[6px] grid h-[40px] w-[36px] place-items-center ${controlColor}`}
          onClick={nextTrack}
        >
          <svg width="20" height="16" viewBox="0 0 20 16" fill="currentColor">
            <path d="M1 1.4v13.2L12.4 8 1 1.4Z" />
            <rect x="14.2" y="1.2" width="3.4" height="13.6" rx="0.8" />
          </svg>
        </button>
      </div>
    </div>
  );
}

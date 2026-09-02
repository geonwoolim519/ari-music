import { Link, useParams } from "react-router-dom";
import { usePlayerStore } from "../store/playerStore";
import { PLAYLISTS, usePlaylistStore, type PlaylistId } from "../store/playlistStore";
import { DashedRule, VinylIcon } from "../components/LibraryChrome";
import { trackTitle } from "../data/albums";
import { useLocaleStore, useT } from "../store/localeStore";

export function PlaylistPage() {
  const { playlistId } = useParams();
  const id = Number(playlistId) as PlaylistId;
  const playlist = PLAYLISTS.find((item) => item.id === id);
  const items = usePlaylistStore((state) => state.lists[id] ?? []);
  const playTrack = usePlayerStore((state) => state.playTrack);
  const t = useT();
  const locale = useLocaleStore((state) => state.locale);

  if (!playlist) {
    return (
      <div className="flex h-full flex-col bg-white px-[22px] pt-[calc(var(--sat)+20px)]">
        <p>{t("playlistMissing")}</p>
        <Link to="/library" className="mt-[12px] text-[#FF4D4D]">
          {t("toLibrary")}
        </Link>
      </div>
    );
  }

  return (
    <div className="flex h-full flex-col bg-white">
      <header className="px-[22px] pb-[4px] pt-[calc(var(--sat)+16px)]">
        <h1 className="text-[32px] font-extrabold tracking-[-0.06em] text-black">
          {t("playlistN", { n: playlist.id })}
        </h1>
      </header>

      <div className="phone-scroll flex-1 overflow-y-auto px-[22px] pb-[160px] pt-[20px]">
        {items.length === 0 ? null : (
          <>
            <ul>
              {items.map((track) => (
                <li key={track.id}>
                  <button
                    type="button"
                    className="flex w-full items-center gap-[14px] py-[14px] text-left"
                    onClick={() => playTrack(track, items)}
                  >
                    <VinylIcon />
                    <span className="text-[16px] font-medium text-black">
                      {trackTitle(track, locale)}
                    </span>
                  </button>
                  <DashedRule />
                </li>
              ))}
            </ul>
            <button
              type="button"
              className="mx-auto mt-[22px] flex h-[40px] w-[128px] items-center justify-center gap-[6px] rounded-full bg-black text-[15px] font-extrabold text-white"
              onClick={() => playTrack(items[0], items)}
            >
              <svg width="12" height="14" viewBox="0 0 14 16" fill="currentColor">
                <path d="M1.2 1.1v13.8L13 8 1.2 1.1Z" />
              </svg>
              {t("play")}
            </button>
          </>
        )}
      </div>
    </div>
  );
}

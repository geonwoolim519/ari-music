import { useState } from "react";
import { Link, useParams } from "react-router-dom";
import { albumName, getAlbum, trackTitle, type AlbumId } from "../data/albums";
import { usePlayerStore } from "../store/playerStore";
import { usePlaylistStore } from "../store/playlistStore";
import { AlbumDescModal } from "../components/AlbumDescModal";
import { useLocaleStore, useT } from "../store/localeStore";

export function AlbumPage() {
  const { albumId } = useParams();
  const album = getAlbum(albumId as AlbumId);
  const playTrack = usePlayerStore((state) => state.playTrack);
  const openAddSheet = usePlaylistStore((state) => state.openAddSheet);
  const [descOpen, setDescOpen] = useState(false);
  const t = useT();
  const locale = useLocaleStore((state) => state.locale);

  if (!album) {
    return (
      <div className="flex h-full flex-col bg-white px-[18px] pt-[20px]">
        <p>{t("albumNotFound")}</p>
        <Link to="/" className="mt-[12px] text-[#FF4D4D]">
          {t("goHome")}
        </Link>
      </div>
    );
  }

  return (
    <div className="flex h-full flex-col" style={{ background: album.theme }}>
      <div className="relative h-[38%] min-h-[250px] shrink-0 overflow-hidden">
        <img
          src={album.hero}
          alt=""
          className="absolute inset-0 h-full w-full scale-[1.04] object-cover object-center"
        />
        <div className="absolute inset-0 bg-black/10" />
        <div className="absolute inset-x-0 bottom-[18%] grid justify-items-center">
          <h1 className="w-fit max-w-full px-[16px] text-center text-[32px] font-extrabold leading-[1.15] tracking-[-0.04em] text-white drop-shadow-[0_2px_8px_rgba(0,0,0,0.35)]">
            {albumName(album, locale)}
          </h1>
          <button
            type="button"
            className="mt-[10px] rounded-full bg-white px-[16px] py-[7px] text-center text-[13px] font-bold text-black shadow-[0_4px_10px_rgba(0,0,0,0.12)]"
            onClick={() => setDescOpen(true)}
          >
            {t("albumDesc")}
          </button>
        </div>
      </div>

      <div className="flex min-h-0 flex-1 flex-col items-center px-[22px] pt-[22px] pb-[160px]">
        <ul className="w-full">
          {album.tracks.map((track, index) => (
            <li key={track.id} className="border-b border-white/55">
              <div className="flex items-center justify-between py-[14px]">
                <button
                  type="button"
                  className="min-w-0 flex-1 text-left text-[16px] font-semibold text-white"
                  onClick={() => playTrack(track)}
                >
                  {index + 1}. {trackTitle(track, locale)}
                </button>
                <button
                  type="button"
                  aria-label={`${trackTitle(track, locale)} ${t("addToPlaylist")}`}
                  className="grid h-[26px] w-[26px] shrink-0 place-items-center rounded-full border-[1.5px] border-white text-[18px] leading-none text-white"
                  onClick={() => openAddSheet(track)}
                >
                  +
                </button>
              </div>
            </li>
          ))}
        </ul>
      </div>

      <AlbumDescModal
        album={album}
        open={descOpen}
        onClose={() => setDescOpen(false)}
      />
    </div>
  );
}

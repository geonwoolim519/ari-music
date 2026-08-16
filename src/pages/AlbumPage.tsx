import { useState } from "react";
import { Link, useParams } from "react-router-dom";
import { getAlbum, type AlbumId } from "../data/albums";
import { usePlayerStore } from "../store/playerStore";
import { usePlaylistStore } from "../store/playlistStore";
import { AlbumDescModal } from "../components/AlbumDescModal";

export function AlbumPage() {
  const { albumId } = useParams();
  const album = getAlbum(albumId as AlbumId);
  const playTrack = usePlayerStore((state) => state.playTrack);
  const openAddSheet = usePlaylistStore((state) => state.openAddSheet);
  const [descOpen, setDescOpen] = useState(false);

  if (!album) {
    return (
      <div className="flex h-full flex-col bg-white px-[18px] pt-[20px]">
        <p>앨범을 찾을 수 없습니다.</p>
        <Link to="/" className="mt-[12px] text-[#FF4D4D]">
          홈으로
        </Link>
      </div>
    );
  }

  return (
    <div className="flex h-full flex-col" style={{ background: album.theme }}>
      <div className="relative h-[38%] min-h-[250px] shrink-0">
        <img
          src={album.hero}
          alt=""
          className="absolute inset-0 h-full w-full object-cover object-center"
        />
        <div className="absolute inset-0 bg-black/10" />
        <div className="absolute inset-x-0 bottom-[18%] flex flex-col items-center">
          <h1 className="text-[32px] font-extrabold tracking-[-0.04em] text-white drop-shadow-[0_2px_8px_rgba(0,0,0,0.35)]">
            {album.name}
          </h1>
          <button
            type="button"
            className="mt-[10px] rounded-full bg-white px-[16px] py-[7px] text-[13px] font-bold text-black shadow-[0_4px_10px_rgba(0,0,0,0.12)]"
            onClick={() => setDescOpen(true)}
          >
            앨범 설명 보기
          </button>
        </div>
      </div>

      <div className="flex min-h-0 flex-1 flex-col px-[22px] pt-[22px] pb-[160px]">
        <button
          type="button"
          className="mx-auto flex h-[48px] w-[148px] items-center justify-center gap-[8px] rounded-full bg-white text-[17px] font-extrabold text-black"
          onClick={() => playTrack(album.tracks[0])}
        >
          <svg width="14" height="16" viewBox="0 0 14 16" fill="currentColor">
            <path d="M1.2 1.1v13.8L13 8 1.2 1.1Z" />
          </svg>
          재생
        </button>

        <ul className="mt-[16px]">
          {album.tracks.map((track, index) => (
            <li key={track.id} className="border-b border-white/55">
              <div className="flex items-center justify-between py-[14px]">
                <button
                  type="button"
                  className="min-w-0 flex-1 text-left text-[16px] font-semibold text-white"
                  onClick={() => playTrack(track)}
                >
                  {index + 1}. {track.title}
                </button>
                <button
                  type="button"
                  aria-label={`${track.title} 플레이리스트에 추가`}
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

import { Link, useParams } from "react-router-dom";
import { usePlayerStore } from "../store/playerStore";
import { PLAYLISTS, usePlaylistStore, type PlaylistId } from "../store/playlistStore";
import { DashedRule, ProfileBadge, VinylIcon } from "../components/LibraryChrome";

export function PlaylistPage() {
  const { playlistId } = useParams();
  const id = Number(playlistId) as PlaylistId;
  const playlist = PLAYLISTS.find((item) => item.id === id);
  const items = usePlaylistStore((state) => state.lists[id] ?? []);
  const playTrack = usePlayerStore((state) => state.playTrack);

  if (!playlist) {
    return (
      <div className="flex h-full flex-col bg-white px-[22px] pt-[20px]">
        <p>플레이리스트를 찾을 수 없습니다.</p>
        <Link to="/library" className="mt-[12px] text-[#FF4D4D]">
          보관함으로
        </Link>
      </div>
    );
  }

  return (
    <div className="flex h-full flex-col bg-white">
      <header className="flex items-center justify-between px-[22px] pt-[16px] pb-[4px]">
        <h1 className="text-[32px] font-extrabold tracking-[-0.06em] text-black">
          {playlist.name}
        </h1>
        <ProfileBadge />
      </header>

      <div className="px-[22px] pb-[160px] pt-[20px]">
        {items.length === 0 ? null : (
          <ul>
            {items.map((track) => (
              <li key={track.id}>
                <button
                  type="button"
                  className="flex w-full items-center gap-[14px] py-[14px] text-left"
                  onClick={() => playTrack(track)}
                >
                  <VinylIcon />
                  <span className="text-[16px] font-medium text-black">{track.title}</span>
                </button>
                <DashedRule />
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}

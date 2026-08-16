import { useNavigate } from "react-router-dom";
import { DashedRule, ListFolderIcon, ProfileBadge } from "../components/LibraryChrome";
import { PLAYLISTS } from "../store/playlistStore";

export function LibraryPage() {
  const navigate = useNavigate();

  return (
    <div className="flex h-full flex-col bg-white">
      <header className="flex items-center justify-between px-[22px] pt-[16px] pb-[4px]">
        <h1 className="text-[34px] font-extrabold tracking-[-0.06em] text-black">
          보관함
        </h1>
        <ProfileBadge />
      </header>

      <div className="px-[22px] pb-[160px] pt-[18px]">
        <ul>
          {PLAYLISTS.map((playlist) => (
            <li key={playlist.id}>
              <button
                type="button"
                className="flex w-full items-center gap-[12px] py-[16px] text-left"
                onClick={() => navigate(`/library/${playlist.id}`)}
              >
                <ListFolderIcon />
                <span className="text-[17px] font-semibold text-black">
                  {playlist.name}
                </span>
              </button>
              <DashedRule />
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

import { useNavigate } from "react-router-dom";
import { DashedRule, ListFolderIcon } from "../components/LibraryChrome";
import { PLAYLISTS } from "../store/playlistStore";
import { useT } from "../store/localeStore";

export function LibraryPage() {
  const navigate = useNavigate();
  const t = useT();

  return (
    <div className="flex h-full flex-col bg-white">
      <header className="px-[22px] pb-[4px] pt-[calc(var(--sat)+16px)]">
        <h1 className="text-[34px] font-extrabold tracking-[-0.06em] text-black">
          {t("library")}
        </h1>
        <p className="mt-[8px] text-[13px] font-medium leading-[1.45] tracking-[-0.02em] text-[#888]">
          {t("librarySubtitle")}
        </p>
      </header>

      <div className="phone-scroll min-h-0 flex-1 overflow-y-auto px-[22px] pb-[160px] pt-[14px]">
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
                  {t("playlistN", { n: playlist.id })}
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

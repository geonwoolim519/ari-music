import { useNavigate } from "react-router-dom";
import { DashedRule } from "../components/LibraryChrome";
import { albumName, albums } from "../data/albums";
import { useLocaleStore, useT } from "../store/localeStore";

export function LearnLyricsPage() {
  const navigate = useNavigate();
  const t = useT();
  const locale = useLocaleStore((state) => state.locale);

  return (
    <div className="flex h-full flex-col bg-white">
      <header className="relative px-[22px] pb-[8px] pt-[calc(var(--sat)+16px)]">
        <button
          type="button"
          className="absolute left-[10px] top-[calc(var(--sat)+18px)] grid h-[36px] w-[36px] place-items-center text-[#9a9a9a]"
          aria-label={t("back")}
          onClick={() => navigate("/learn")}
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
        <h1 className="px-[36px] text-center text-[22px] font-extrabold tracking-[-0.04em] text-black">
          {t("learnLyrics")}
        </h1>
        <p className="mt-[8px] text-center text-[13px] font-medium leading-[1.45] text-[#888]">
          {t("learnLyricsDesc")}
        </p>
      </header>

      <div className="phone-scroll min-h-0 flex-1 overflow-y-auto px-[22px] pb-[160px] pt-[10px]">
        <ul>
          {albums.map((album) => (
            <li key={album.id}>
              <button
                type="button"
                className="flex w-full items-center gap-[12px] py-[14px] text-left"
                onClick={() => navigate(`/album/${album.id}`)}
              >
                <img
                  src={album.cover}
                  alt=""
                  className="h-[52px] w-[52px] shrink-0 rounded-[10px] object-cover"
                />
                <span className="min-w-0">
                  <span className="block text-[17px] font-semibold text-black">
                    {albumName(album, locale)}
                  </span>
                  <span className="mt-[4px] block text-[13px] text-[#888]">
                    {t("learnLyricsOpenAlbum")}
                  </span>
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

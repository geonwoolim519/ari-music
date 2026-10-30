import { useNavigate } from "react-router-dom";
import { DashedRule } from "../components/LibraryChrome";
import { useT } from "../store/localeStore";

export function LearnPage() {
  const navigate = useNavigate();
  const t = useT();

  return (
    <div className="flex h-full flex-col bg-white">
      <header className="px-[22px] pb-[4px] pt-[calc(var(--sat)+16px)]">
        <h1 className="text-[34px] font-extrabold tracking-[-0.06em] text-black">
          {t("learn")}
        </h1>
        <p className="mt-[8px] text-[13px] font-medium leading-[1.45] tracking-[-0.02em] text-[#888]">
          {t("learnSubtitle")}
        </p>
      </header>

      <div className="phone-scroll min-h-0 flex-1 overflow-y-auto px-[22px] pb-[160px] pt-[14px]">
        <ul>
          <li>
            <button
              type="button"
              className="flex w-full flex-col items-start py-[16px] text-left"
              onClick={() => navigate("/learn/jangdan")}
            >
              <span className="text-[17px] font-semibold text-black">
                {t("learnJangdan")}
              </span>
              <span className="mt-[6px] text-[13px] leading-[1.45] text-[#888]">
                {t("learnJangdanDesc")}
              </span>
            </button>
            <DashedRule />
          </li>
          <li>
            <button
              type="button"
              className="flex w-full flex-col items-start py-[16px] text-left"
              onClick={() => navigate("/learn/lyrics")}
            >
              <span className="text-[17px] font-semibold text-black">
                {t("learnLyrics")}
              </span>
              <span className="mt-[6px] text-[13px] leading-[1.45] text-[#888]">
                {t("learnLyricsDesc")}
              </span>
            </button>
            <DashedRule />
          </li>
        </ul>
      </div>
    </div>
  );
}

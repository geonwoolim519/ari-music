import { useNavigate } from "react-router-dom";
import { DashedRule } from "../components/LibraryChrome";
import { jangdanLessons } from "../data/jangdan";
import { useLocaleStore, useT } from "../store/localeStore";

export function LearnJangdanPage() {
  const navigate = useNavigate();
  const t = useT();
  const locale = useLocaleStore((state) => state.locale);
  const isEn = locale === "en";

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
          {t("learnJangdan")}
        </h1>
        <p className="mt-[8px] text-center text-[13px] font-medium leading-[1.45] text-[#888]">
          {t("learnJangdanDesc")}
        </p>
      </header>

      <div className="phone-scroll min-h-0 flex-1 overflow-y-auto px-[22px] pb-[160px] pt-[10px]">
        <ul>
          {jangdanLessons.map((lesson) => (
            <li key={lesson.id}>
              <div className="py-[16px]">
                <p className="text-[17px] font-semibold text-black">
                  {isEn ? lesson.nameEn : lesson.name}
                  <span className="ml-[8px] text-[13px] font-medium text-[#888]">
                    {isEn ? lesson.meterEn : lesson.meter}
                  </span>
                </p>
                <p className="mt-[6px] text-[14px] leading-[1.6] text-[#444]">
                  {isEn ? lesson.textEn : lesson.text}
                </p>
              </div>
              <DashedRule />
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

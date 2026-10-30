import { useNavigate } from "react-router-dom";
import {
  IncrediboxBackdrop,
  KaraokeBackdrop,
  WorkshopBackdrop,
} from "../components/PlayHeroes";
import { useT } from "../store/localeStore";

export function PlaygroundPage() {
  const navigate = useNavigate();
  const t = useT();

  return (
    <div className="flex h-full flex-col bg-white">
      <header className="relative flex h-[calc(52px+var(--sat))] shrink-0 items-center justify-center px-[12px] pt-[var(--sat)]">
        <button
          type="button"
          className="absolute left-[10px] grid h-[36px] w-[36px] place-items-center text-[#9a9a9a]"
          aria-label={t("back")}
          onClick={() => navigate("/")}
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
        <h1 className="text-[17px] font-extrabold tracking-[-0.03em] text-black">
          {t("playgroundTitle")}
        </h1>
      </header>

      <div className="phone-scroll min-h-0 flex-1 overflow-y-auto px-[18px] pb-[160px] pt-[8px]">
        <p className="mb-[16px] text-[13px] font-medium leading-[1.45] text-[#888]">
          {t("playgroundSubtitle")}
        </p>

        <div className="flex flex-col gap-[12px]">
          <button
            type="button"
            onClick={() => navigate("/studio")}
            className="relative h-[118px] w-full overflow-hidden rounded-[24px] text-left shadow-[0_8px_18px_rgba(0,0,0,0.12)]"
          >
            <KaraokeBackdrop />
            <span className="absolute inset-y-0 left-0 w-[72%] bg-gradient-to-r from-[#1a0828] via-[#1a0828]/78 to-transparent" />
            <span className="relative z-[1] flex h-full flex-col justify-center px-[20px] pr-[80px]">
              <span className="text-[20px] font-extrabold tracking-[-0.04em] text-white">
                {t("studioTitle")}
              </span>
              <span className="mt-[6px] text-[13px] font-medium leading-[1.45] text-white/88">
                {t("studioLine1")}
                <br />
                {t("studioLine2")}
              </span>
            </span>
          </button>

          <button
            type="button"
            onClick={() => navigate("/incredibox")}
            className="relative h-[118px] w-full overflow-hidden rounded-[24px] text-left shadow-[0_8px_18px_rgba(0,0,0,0.12)]"
          >
            <IncrediboxBackdrop />
            <span className="relative z-[1] flex h-full w-[70%] flex-col justify-center px-[20px]">
              <span className="gugak-serif text-[18px] font-bold tracking-[-0.04em] text-[#f3e6c8]">
                {t("incrediboxTitle")}
              </span>
              <span className="mt-[6px] text-[13px] font-medium leading-[1.45] text-[#f3e6c8]/88">
                {t("incrediboxLine1")}
                <br />
                {t("incrediboxLine2")}
              </span>
            </span>
          </button>

          <button
            type="button"
            onClick={() => navigate("/workshop")}
            className="relative h-[118px] w-full overflow-hidden rounded-[24px] text-left shadow-[0_8px_18px_rgba(0,0,0,0.12)]"
          >
            <WorkshopBackdrop />
            <span className="absolute inset-y-0 left-0 w-[72%] bg-gradient-to-r from-[#071824] via-[#071824]/78 to-transparent" />
            <span className="relative z-[1] flex h-full flex-col justify-center px-[20px] pr-[80px]">
              <span className="text-[20px] font-extrabold tracking-[-0.04em] text-white">
                {t("workshopTitle")}
              </span>
              <span className="mt-[6px] text-[13px] font-medium leading-[1.45] text-white/88">
                {t("workshopLine1")}
                <br />
                {t("workshopLine2")}
              </span>
            </span>
          </button>
        </div>
      </div>
    </div>
  );
}

import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { workshopPhrases, type WorkshopPhrase } from "../data/workshopPhrases";
import { useLocaleStore, useT } from "../store/localeStore";

const SLOT_COUNT = 4;

export function LyricsWorkshopPage() {
  const navigate = useNavigate();
  const t = useT();
  const locale = useLocaleStore((state) => state.locale);
  const isEn = locale === "en";
  const [slots, setSlots] = useState<(string | null)[]>(
    Array.from({ length: SLOT_COUNT }, () => null),
  );

  const labelOf = (phrase: WorkshopPhrase) => (isEn ? phrase.en : phrase.ko);
  const regionOf = (phrase: WorkshopPhrase) => (isEn ? phrase.regionEn : phrase.region);
  const phraseById = (id: string | null) =>
    workshopPhrases.find((item) => item.id === id) ?? null;
  const picked = new Set(slots.filter(Boolean));

  const assign = (id: string) => {
    setSlots((current) => {
      if (current.includes(id)) {
        return current.map((slot) => (slot === id ? null : slot));
      }
      const empty = current.findIndex((slot) => slot == null);
      if (empty < 0) return current;
      const next = [...current];
      next[empty] = id;
      return next;
    });
  };

  return (
    <div className="flex h-full flex-col bg-[#f4ead8] text-[#2a2118]">
      <header className="relative flex h-[calc(46px+var(--sat))] shrink-0 items-center justify-center px-[12px] pt-[var(--sat)]">
        <button
          type="button"
          className="absolute left-[8px] grid h-[36px] w-[36px] place-items-center text-[#8a6a4a]"
          aria-label={t("back")}
          onClick={() => navigate("/playground")}
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
        <h1 className="gugak-serif text-[16px] font-bold tracking-[-0.02em]">
          {t("workshopTitle")}
        </h1>
      </header>

      <div className="flex min-h-0 flex-1 flex-col px-[16px] pb-[max(16px,env(safe-area-inset-bottom))]">
        <div className="flex items-center justify-between text-[11px] font-semibold text-[#8a6a4a]">
          <span>{t("workshopVerse")}</span>
          <button
            type="button"
            className="min-h-[32px] px-[4px]"
            onClick={() => setSlots(Array.from({ length: SLOT_COUNT }, () => null))}
          >
            {t("workshopReset")} ↺
          </button>
        </div>

        <div className="mt-[10px] flex flex-col gap-[8px]">
          {slots.map((id, index) => {
            const phrase = phraseById(id);
            return (
              <button
                key={index}
                type="button"
                onClick={() =>
                  setSlots((current) => current.map((slot, i) => (i === index ? null : slot)))
                }
                className="flex min-h-[52px] w-full items-center justify-center rounded-[14px] border border-[#d4b07a]/70 bg-[#1a140f]/82 px-[12px] py-[10px] text-center"
                aria-label={phrase ? labelOf(phrase) : t("workshopEmpty")}
              >
                {phrase ? (
                  <span className="gugak-serif text-[14px] font-bold leading-snug text-[#f3e6c8]">
                    {labelOf(phrase)}
                  </span>
                ) : (
                  <span className="text-[12px] text-[#d4b07a]">{t("workshopEmpty")}</span>
                )}
              </button>
            );
          })}
        </div>

        <p className="mt-[14px] text-center text-[11px] leading-[1.5] text-[#8a6a4a]">
          {t("workshopHint")}
        </p>

        <div className="phone-scroll mt-[12px] grid min-h-0 flex-1 grid-cols-2 content-start gap-[8px] overflow-y-auto pb-[8px]">
          {workshopPhrases.map((phrase) => {
            const on = picked.has(phrase.id);
            return (
              <button
                key={phrase.id}
                type="button"
                onClick={() => assign(phrase.id)}
                className={`rounded-[14px] border bg-[#fbf6ea] px-[10px] py-[11px] text-left ${
                  on
                    ? "border-[#8a3b2a] shadow-[0_0_0_1px_#8a3b2a]"
                    : "border-[#e2d3b6] shadow-[0_1px_0_rgba(255,255,255,0.8)]"
                }`}
              >
                <span className="block text-[10px] font-semibold tracking-[0.04em] text-[#b08958]">
                  {regionOf(phrase)}
                </span>
                <span className="gugak-serif mt-[4px] block text-[13px] font-bold leading-snug tracking-[-0.02em]">
                  {labelOf(phrase)}
                </span>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}

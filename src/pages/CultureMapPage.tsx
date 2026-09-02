import { useNavigate } from "react-router-dom";
import { asset } from "../lib/asset";
import {
  cityName,
  cultureCities,
  isCultureCityId,
  isCultureIntroId,
} from "../data/cultureMap";
import { useLocaleStore, useT } from "../store/localeStore";

export function CultureMapPage() {
  const navigate = useNavigate();
  const t = useT();
  const locale = useLocaleStore((state) => state.locale);

  return (
    <div className="flex h-full flex-col bg-white">
      <header className="relative flex h-[calc(52px+var(--sat))] items-center justify-center px-[12px] pt-[var(--sat)]">
        <button
          type="button"
          className="absolute left-[10px] grid h-[36px] w-[36px] place-items-center text-[#8a8a8a]"
          aria-label={t("back")}
          onClick={() => navigate("/")}
        >
          <svg width="18" height="18" viewBox="0 0 16 16" fill="none" aria-hidden>
            <path
              d="M10.5 3.2 5.2 8 10.5 12.8"
              stroke="currentColor"
              strokeWidth="2.2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </button>
        <h1 className="text-[18px] font-extrabold tracking-[-0.03em] text-black">
          {t("cultureMap")}
        </h1>
      </header>

      <p className="shrink-0 px-[22px] pb-[6px] text-center text-[12px] leading-[1.55] tracking-[-0.02em] text-[#555]">
        {t("mapSubtitle")}
      </p>

      <div className="flex min-h-0 flex-1 justify-center px-[8px] pb-[96px] pt-[2px]">
        <div className="relative h-full w-max max-w-full">
          <img
            src={asset(
              locale === "en" ? "korea-map-pins-en.png?v=2" : "korea-map-pins.png?v=3",
            )}
            alt={t("mapAlt")}
            className="block h-full w-auto max-w-full"
          />
          {cultureCities.map((city) => (
            <button
              key={city.id}
              type="button"
              className="absolute z-[1] -translate-x-1/2 -translate-y-1/2"
              style={{
                left: city.x,
                top: city.y,
                width: city.featured ? "22%" : "16%",
                height: city.featured ? "9%" : "7%",
              }}
              aria-label={cityName(city, locale)}
              onClick={() => {
                if (isCultureCityId(city.id) || isCultureIntroId(city.id)) {
                  navigate(`/map/${city.id}`);
                }
              }}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

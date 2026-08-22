import { Link, useNavigate, useParams } from "react-router-dom";
import { getCultureCity } from "../data/cultureMap";
import { useLocaleStore, useT } from "../store/localeStore";

function MapBackButton({ onClick }: { onClick: () => void }) {
  const t = useT();
  return (
    <button
      type="button"
      className="absolute left-[10px] grid h-[36px] w-[36px] place-items-center text-[#8a8a8a]"
      aria-label={t("back")}
      onClick={onClick}
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
  );
}

export function CultureCityPage() {
  const { cityId } = useParams();
  const navigate = useNavigate();
  const city = getCultureCity(cityId ?? "");
  const locale = useLocaleStore((state) => state.locale);
  const t = useT();

  if (!city) {
    return (
      <div className="flex h-full flex-col bg-white px-[22px] pt-[20px]">
        <p>문화지도를 찾을 수 없습니다.</p>
        <Link to="/map" className="mt-[12px] text-[#FF4D4D]">
          지도로
        </Link>
      </div>
    );
  }

  if (city.intro) {
    return (
      <div className="flex h-full flex-col bg-white">
        <header className="relative flex min-h-[52px] items-center justify-center px-[48px] py-[10px]">
          <MapBackButton onClick={() => navigate("/map")} />
          <h1 className="text-center text-[17px] font-extrabold leading-[1.25] tracking-[-0.03em] text-black">
            {city.intro.title}
          </h1>
        </header>

        <div className="phone-scroll flex-1 overflow-y-auto px-[22px] pb-[150px] pt-[8px]">
          {city.intro.paragraphs.map((text) => (
            <p
              key={text.slice(0, 24)}
              className="mb-[16px] text-[14px] leading-[1.75] tracking-[-0.02em] text-black"
            >
              {text}
            </p>
          ))}
          <img
            src={city.intro.image}
            alt=""
            className="mt-[8px] w-full rounded-[8px] object-cover"
          />
        </div>
      </div>
    );
  }

  return (
    <div className="flex h-full flex-col bg-white">
      <header className="relative flex min-h-[52px] items-center justify-center px-[48px] py-[10px]">
        <MapBackButton onClick={() => navigate("/map")} />
        <h1 className="text-center text-[17px] font-extrabold leading-[1.25] tracking-[-0.03em] text-black">
          {locale === "en"
            ? `${city.nameEn} Arirang Map`
            : `${city.name}아리랑 문화지도`}
        </h1>
      </header>

      <div className="phone-scroll flex-1 overflow-y-auto px-[16px] pb-[150px] pt-[8px]">
        <ul className="flex flex-col gap-[14px]">
          {city.places.map((place) => (
            <li
              key={place.id}
              className="rounded-[10px] border border-[#d0d0d0]"
            >
              <div className="flex items-start gap-[12px] p-[12px]">
                <div className="h-[92px] w-[92px] shrink-0 overflow-hidden rounded-[8px] bg-[#f3f3f3]">
                  <img
                    src={place.thumbnail ?? city.albumCover}
                    alt=""
                    className={`h-full w-full ${
                      place.id === "jacf" ? "object-contain p-[6px]" : "object-cover object-center"
                    }`}
                  />
                </div>
                <div className="min-w-0 flex-1">
                  <div className="flex items-start justify-between gap-[8px]">
                    <h2 className="text-[15px] font-extrabold leading-[1.3] tracking-[-0.03em] text-black">
                      {place.name}
                    </h2>
                    <a
                      href={place.url}
                      target="_blank"
                      rel="noreferrer"
                      className="mt-[2px] shrink-0 text-[11px] font-semibold text-[#888]"
                    >
                      {place.linkLabel === "사이트 보기" ? t("viewSite") : t("viewMap")}
                    </a>
                  </div>
                  <p className="mt-[8px] text-[12px] leading-[1.65] tracking-[-0.02em] text-[#222]">
                    {place.description}
                  </p>
                </div>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

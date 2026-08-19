import { useNavigate } from "react-router-dom";
import { asset } from "../lib/asset";
import { cultureCities, isCultureCityId, isCultureIntroId } from "../data/cultureMap";

export function CultureMapPage() {
  const navigate = useNavigate();

  return (
    <div className="flex h-full flex-col bg-white">
      <header className="relative flex h-[52px] items-center justify-center px-[12px]">
        <button
          type="button"
          className="absolute left-[10px] grid h-[36px] w-[36px] place-items-center text-[#8a8a8a]"
          aria-label="뒤로"
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
          아리랑 문화지도
        </h1>
      </header>

      <p className="px-[22px] pb-[4px] text-center text-[12px] leading-[1.55] tracking-[-0.02em] text-[#555]">
        한국의 3대 아리랑의 발상지인 정선·밀양·진도의 아리랑 관련
        <br />
        헤리티지를 확인하고, 다른 향토 아리랑에 대해 탐색해보세요.
      </p>

      <div className="phone-scroll flex-1 overflow-y-auto px-[8px] pb-[150px] pt-[6px]">
        <div className="relative mx-auto w-full max-w-[360px]">
          <img
            src={asset("korea-map-pins.png")}
            alt="한반도 아리랑 문화지도"
            className="block h-auto w-full"
          />
          {cultureCities.map((city) => (
            <button
              key={city.id}
              type="button"
              className="absolute -translate-x-1/2 -translate-y-1/2"
              style={{
                left: city.x,
                top: city.y,
                width: city.featured ? "22%" : "16%",
                height: city.featured ? "9%" : "7%",
              }}
              aria-label={city.name}
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

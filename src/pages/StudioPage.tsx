import { AppHeader } from "../components/AppHeader";

export function StudioPage() {
  return (
    <div className="flex h-full flex-col bg-white">
      <AppHeader />
      <div className="flex flex-1 flex-col items-center justify-center px-[28px] pb-[140px] text-center">
        <p className="text-[22px] font-extrabold">아리랑 스튜디오</p>
        <p className="mt-[10px] text-[14px] leading-[1.6] text-[#666]">
          국악기와 장단으로 아리랑을 만드는 화면은
          <br />
          다음 단계에서 이어서 구현합니다.
        </p>
      </div>
    </div>
  );
}

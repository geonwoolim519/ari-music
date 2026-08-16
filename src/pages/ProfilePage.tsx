import { AppHeader } from "../components/AppHeader";

export function ProfilePage() {
  return (
    <div className="flex h-full flex-col bg-white">
      <AppHeader />
      <div className="flex flex-1 flex-col items-center px-[28px] pt-[28px]">
        <div className="grid h-[72px] w-[72px] place-items-center rounded-full bg-[#cfcfcf] text-[20px] font-bold">
          아리
        </div>
        <p className="mt-[12px] text-[20px] font-extrabold">아리</p>
        <p className="mt-[8px] text-[14px] text-[#666]">마이페이지 준비 중</p>
      </div>
    </div>
  );
}

import { Link } from "react-router-dom";
import { Logo } from "./Icons";

export function AppHeader() {
  return (
    <header className="flex items-center justify-between px-[18px] pt-[14px] pb-[6px]">
      <div className="flex items-center gap-[8px]">
        <Logo size={36} />
        <h1 className="text-[22px] font-extrabold tracking-[-0.04em] text-black">
          Ari Music
        </h1>
      </div>
      <Link
        to="/profile"
        className="flex h-[38px] w-[38px] items-center justify-center rounded-full bg-[#cfcfcf] text-[13px] font-semibold text-[#333]"
        aria-label="마이페이지"
      >
        아리
      </Link>
    </header>
  );
}

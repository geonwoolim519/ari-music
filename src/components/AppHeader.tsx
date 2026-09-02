import { Link } from "react-router-dom";
import { Logo } from "./Icons";
import { useT } from "../store/localeStore";
import { useProfileStore } from "../store/profileStore";

export function AppHeader() {
  const t = useT();
  const name = useProfileStore((state) => state.name);
  const photo = useProfileStore((state) => state.photo);

  return (
    <header className="flex items-center justify-between px-[18px] pb-[6px] pt-[calc(var(--sat)+14px)]">
      <div className="flex items-center gap-[8px]">
        <Logo size={36} />
        <h1 className="text-[22px] font-extrabold tracking-[-0.04em] text-black">
          Ari Music
        </h1>
      </div>
      <Link
        to="/profile"
        className="flex h-[38px] w-[38px] items-center justify-center overflow-hidden rounded-full bg-[#cfcfcf] text-[13px] font-semibold text-[#333]"
        aria-label={t("myPageAria")}
      >
        {photo ? (
          <img src={photo} alt="" className="h-full w-full object-cover" />
        ) : (
          name.slice(0, 2)
        )}
      </Link>
    </header>
  );
}

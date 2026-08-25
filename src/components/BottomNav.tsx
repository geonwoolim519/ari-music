import { NavLink, useLocation } from "react-router-dom";
import { CommunityIcon, FolderIcon, HomeIcon } from "./Icons";
import { useAlbumChrome } from "../hooks/useAlbumChrome";
import { useT } from "../store/localeStore";

export function BottomNav() {
  const pageAlbum = useAlbumChrome();
  const { pathname } = useLocation();
  const t = useT();
  const themed = Boolean(pageAlbum);
  const onLibrary = pathname.startsWith("/library");
  const onHome = pathname === "/";
  const onCommunity = pathname.startsWith("/community");

  const tabClass = (active: boolean) =>
    `grid h-[40px] w-[40px] place-items-center ${
      themed ? "" : active ? "opacity-100" : "opacity-45"
    }`;

  return (
    <nav
      className={`pointer-events-auto absolute inset-x-[16px] z-20 flex h-[58px] items-center justify-between rounded-full px-[26px] shadow-[0_8px_20px_rgba(0,0,0,0.16)] ${themed ? "text-white" : "text-black"}`}
      style={{
        bottom: "max(12px, calc(env(safe-area-inset-bottom, 0px) + 4px))",
        background: themed ? `${pageAlbum?.bar ?? "#3F3610"}e6` : "#c8c8c8",
      }}
    >
      <NavLink
        to="/"
        aria-label={t("home")}
        aria-current={onHome ? "page" : undefined}
        className={tabClass(onHome)}
      >
        <HomeIcon />
      </NavLink>
      <NavLink
        to="/community"
        aria-label={t("community")}
        aria-current={onCommunity ? "page" : undefined}
        className={tabClass(onCommunity)}
      >
        <CommunityIcon />
      </NavLink>
      <NavLink
        to="/library"
        aria-label={t("library")}
        aria-current={onLibrary ? "page" : undefined}
        className={tabClass(onLibrary)}
      >
        <FolderIcon />
      </NavLink>
    </nav>
  );
}

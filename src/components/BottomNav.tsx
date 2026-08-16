import { NavLink, useLocation } from "react-router-dom";
import { CommunityIcon, FolderIcon, HomeIcon } from "./Icons";
import { useAlbumChrome } from "../hooks/useAlbumChrome";

export function BottomNav() {
  const pageAlbum = useAlbumChrome();
  const { pathname } = useLocation();
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
      className={`pointer-events-auto absolute inset-x-[16px] bottom-[12px] z-20 flex h-[58px] items-center justify-between rounded-full px-[26px] shadow-[0_8px_20px_rgba(0,0,0,0.16)] ${themed ? "text-white" : "text-black"}`}
      style={{
        background: themed ? `${pageAlbum?.bar ?? "#3F3610"}e6` : "#c8c8c8",
      }}
    >
      <NavLink
        to="/"
        aria-label="홈"
        aria-current={onHome ? "page" : undefined}
        className={tabClass(onHome)}
      >
        <HomeIcon />
      </NavLink>
      <NavLink
        to="/community"
        aria-label="커뮤니티"
        aria-current={onCommunity ? "page" : undefined}
        className={tabClass(onCommunity)}
      >
        <CommunityIcon />
      </NavLink>
      <NavLink
        to="/library"
        aria-label="보관함"
        aria-current={onLibrary ? "page" : undefined}
        className={tabClass(onLibrary)}
      >
        <FolderIcon />
      </NavLink>
    </nav>
  );
}

import { useEffect } from "react";
import { Outlet, useLocation } from "react-router-dom";
import { MiniPlayer } from "./MiniPlayer";
import { AudioEngine } from "./AudioEngine";
import { BottomNav } from "./BottomNav";
import { IntroModal } from "./IntroModal";
import { ManualModal } from "./ManualModal";
import { HistoryModal } from "./HistoryModal";
import { LyricsModal } from "./LyricsModal";
import { Toast } from "./Toast";
import { AddToPlaylistSheet } from "./AddToPlaylistSheet";
import { WritePostModal } from "./WritePostModal";
import { useAlbumChrome } from "../hooks/useAlbumChrome";

function shellBackground(pathname: string, albumTheme?: string) {
  if (albumTheme) return albumTheme;
  if (pathname.startsWith("/studio")) return "#14061f";
  return "#ffffff";
}

export function AppShell() {
  const pageAlbum = useAlbumChrome();
  const { pathname } = useLocation();
  const shellBg = shellBackground(pathname, pageAlbum?.theme);

  useEffect(() => {
    const root = document.documentElement;
    const apply = () => {
      const desktop = window.matchMedia("(min-width: 640px)").matches;
      const color = desktop ? "#FF4D4D" : shellBg;
      root.style.backgroundColor = color;
      document.body.style.backgroundColor = color;
    };
    apply();
    const mq = window.matchMedia("(min-width: 640px)");
    mq.addEventListener("change", apply);
    return () => {
      mq.removeEventListener("change", apply);
      root.style.backgroundColor = "";
      document.body.style.backgroundColor = "";
    };
  }, [shellBg]);

  return (
    <div
      className="flex h-full w-full items-stretch justify-center bg-[var(--shell-bg)] sm:items-center sm:bg-[var(--page-theme)] sm:p-[24px]"
      style={
        {
          "--page-theme": pageAlbum?.theme ?? "#FF4D4D",
          "--shell-bg": shellBg,
        } as React.CSSProperties
      }
    >
      <div
        className="relative box-border h-full w-full overflow-hidden sm:h-[min(844px,calc(100dvh-48px))] sm:max-w-[390px] sm:rounded-[40px] sm:shadow-[0_20px_60px_rgba(0,0,0,0.25)]"
        style={{ background: shellBg }}
      >
        <div className="h-full">
          <Outlet />
        </div>
        <MiniPlayer />
        <AudioEngine />
        <BottomNav />
        <IntroModal />
        <ManualModal />
        <HistoryModal />
        <LyricsModal />
        <WritePostModal />
        <Toast />
        <AddToPlaylistSheet />
      </div>
    </div>
  );
}

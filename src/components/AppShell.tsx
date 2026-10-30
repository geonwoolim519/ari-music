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
import { VideoPlayerOverlay } from "./VideoPlayerOverlay";
import { useAlbumChrome } from "../hooks/useAlbumChrome";
import { useUiStore } from "../store/uiStore";

function shellBackground(pathname: string, albumTheme?: string) {
  if (albumTheme) return albumTheme;
  if (pathname.startsWith("/studio")) return "#14061f";
  if (pathname.startsWith("/incredibox") || pathname.startsWith("/workshop")) return "#f4ead8";
  if (pathname.startsWith("/map")) return "#f3ead6";
  return "#ffffff";
}

export function AppShell() {
  const pageAlbum = useAlbumChrome();
  const { pathname } = useLocation();
  const shellBg = shellBackground(pathname, pageAlbum?.theme);
  const closeVideo = useUiStore((state) => state.closeVideo);

  useEffect(() => {
    if (!pathname.startsWith("/videos")) closeVideo();
  }, [closeVideo, pathname]);

  useEffect(() => {
    const root = document.documentElement;
    const apply = () => {
      const desktop = window.matchMedia(
        "(min-width: 640px) and (hover: hover) and (pointer: fine)",
      ).matches;
      const color = desktop ? "#FF4D4D" : shellBg;
      root.style.backgroundColor = color;
      document.body.style.backgroundColor = color;
    };
    apply();
    const mq = window.matchMedia(
      "(min-width: 640px) and (hover: hover) and (pointer: fine)",
    );
    mq.addEventListener("change", apply);
    return () => {
      mq.removeEventListener("change", apply);
      root.style.backgroundColor = "";
      document.body.style.backgroundColor = "";
    };
  }, [shellBg]);

  return (
    <div
      className="desktop-shell flex h-full w-full items-stretch justify-center bg-[var(--shell-bg)]"
      style={
        {
          "--page-theme": pageAlbum?.theme ?? "#FF4D4D",
          "--shell-bg": shellBg,
        } as React.CSSProperties
      }
    >
      <div
        className="desktop-frame relative box-border h-full w-full overflow-hidden"
        style={{ background: shellBg }}
      >
        <div className="h-full min-w-0 w-full max-w-full overflow-hidden">
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
        <VideoPlayerOverlay />
        <Toast />
        <AddToPlaylistSheet />
      </div>
    </div>
  );
}

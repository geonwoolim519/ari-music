import { Outlet, useLocation } from "react-router-dom";
import { MiniPlayer } from "./MiniPlayer";
import { AudioEngine } from "./AudioEngine";
import { BottomNav } from "./BottomNav";
import { IntroModal } from "./IntroModal";
import { HistoryModal } from "./HistoryModal";
import { LyricsModal } from "./LyricsModal";
import { ArchiveVideoModal } from "./ArchiveVideoModal";
import { Toast } from "./Toast";
import { AddToPlaylistSheet } from "./AddToPlaylistSheet";
import { WritePostModal } from "./WritePostModal";
import { useAlbumChrome } from "../hooks/useAlbumChrome";

export function AppShell() {
  const pageAlbum = useAlbumChrome();
  const { pathname } = useLocation();
  const framed =
    pathname.startsWith("/library") || pathname.startsWith("/community");

  return (
    <div
      className={`flex min-h-[100dvh] items-center justify-center ${
        framed ? "p-[20px]" : "p-0 sm:p-[24px]"
      }`}
      style={{ background: pageAlbum?.theme ?? "#FF4D4D" }}
    >
      <div
        className={`relative w-full max-w-[390px] overflow-hidden bg-white shadow-[0_20px_60px_rgba(0,0,0,0.25)] ${
          framed
            ? "h-[min(844px,calc(100dvh-40px))] rounded-[40px]"
            : "h-[100dvh] sm:h-[844px] sm:rounded-[40px]"
        }`}
      >
        <div className="h-full">
          <Outlet />
        </div>
        <MiniPlayer />
        <AudioEngine />
        <BottomNav />
        <IntroModal />
        <HistoryModal />
        <LyricsModal />
        <ArchiveVideoModal />
        <WritePostModal />
        <Toast />
        <AddToPlaylistSheet />
      </div>
    </div>
  );
}

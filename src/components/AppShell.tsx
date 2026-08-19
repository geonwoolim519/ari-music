import { Outlet } from "react-router-dom";
import { MiniPlayer } from "./MiniPlayer";
import { AudioEngine } from "./AudioEngine";
import { BottomNav } from "./BottomNav";
import { IntroModal } from "./IntroModal";
import { ManualModal } from "./ManualModal";
import { HistoryModal } from "./HistoryModal";
import { LyricsModal } from "./LyricsModal";
import { ArchiveVideoModal } from "./ArchiveVideoModal";
import { Toast } from "./Toast";
import { AddToPlaylistSheet } from "./AddToPlaylistSheet";
import { WritePostModal } from "./WritePostModal";
import { useAlbumChrome } from "../hooks/useAlbumChrome";

export function AppShell() {
  const pageAlbum = useAlbumChrome();

  return (
    <div
      className="flex min-h-[100dvh] w-full items-stretch justify-center bg-white sm:items-center sm:bg-[var(--page-theme)] sm:p-[24px]"
      style={
        {
          "--page-theme": pageAlbum?.theme ?? "#FF4D4D",
        } as React.CSSProperties
      }
    >
      <div className="relative h-[100dvh] w-full overflow-hidden bg-white sm:h-[min(844px,calc(100dvh-48px))] sm:max-w-[390px] sm:rounded-[40px] sm:shadow-[0_20px_60px_rgba(0,0,0,0.25)]">
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
        <ArchiveVideoModal />
        <WritePostModal />
        <Toast />
        <AddToPlaylistSheet />
      </div>
    </div>
  );
}

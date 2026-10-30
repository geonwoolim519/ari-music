import { Navigate, Route, Routes } from "react-router-dom";
import { AppShell } from "./components/AppShell";
import { HomePage } from "./pages/HomePage";
import { LibraryPage } from "./pages/LibraryPage";
import { PlaylistPage } from "./pages/PlaylistPage";
import { AlbumPage } from "./pages/AlbumPage";
import { StudioPage } from "./pages/StudioPage";
import { IncrediboxPage } from "./pages/IncrediboxPage";
import { CultureMapPage } from "./pages/CultureMapPage";
import { CultureCityPage } from "./pages/CultureCityPage";
import { ProfilePage } from "./pages/ProfilePage";
import { CommunityPage } from "./pages/CommunityPage";
import { BoardPage } from "./pages/BoardPage";
import { VideoArchivePage } from "./pages/VideoArchivePage";
import { LearnPage } from "./pages/LearnPage";
import { LearnJangdanPage } from "./pages/LearnJangdanPage";
import { LearnLyricsPage } from "./pages/LearnLyricsPage";
import { PlaygroundPage } from "./pages/PlaygroundPage";
import { LyricsWorkshopPage } from "./pages/LyricsWorkshopPage";

export default function App() {
  return (
    <Routes>
      <Route element={<AppShell />}>
        <Route path="/" element={<HomePage />} />
        <Route path="/videos" element={<VideoArchivePage />} />
        <Route path="/learn" element={<LearnPage />} />
        <Route path="/learn/jangdan" element={<LearnJangdanPage />} />
        <Route path="/learn/lyrics" element={<LearnLyricsPage />} />
        <Route path="/library" element={<LibraryPage />} />
        <Route path="/library/:playlistId" element={<PlaylistPage />} />
        <Route path="/album/:albumId" element={<AlbumPage />} />
        <Route path="community">
          <Route index element={<CommunityPage />} />
          <Route path=":boardId" element={<BoardPage />} />
        </Route>
        <Route path="/playground" element={<PlaygroundPage />} />
        <Route path="/studio" element={<StudioPage />} />
        <Route path="/incredibox" element={<IncrediboxPage />} />
        <Route path="/workshop" element={<LyricsWorkshopPage />} />
        <Route path="/map" element={<CultureMapPage />} />
        <Route path="/map/:cityId" element={<CultureCityPage />} />
        <Route path="/profile" element={<ProfilePage />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Route>
    </Routes>
  );
}

import { Navigate, Route, Routes } from "react-router-dom";
import { AppShell } from "./components/AppShell";
import { HomePage } from "./pages/HomePage";
import { LibraryPage } from "./pages/LibraryPage";
import { PlaylistPage } from "./pages/PlaylistPage";
import { AlbumPage } from "./pages/AlbumPage";
import { StudioPage } from "./pages/StudioPage";
import { ProfilePage } from "./pages/ProfilePage";
import { CommunityPage } from "./pages/CommunityPage";
import { BoardPage } from "./pages/BoardPage";

export default function App() {
  return (
    <Routes>
      <Route element={<AppShell />}>
        <Route path="/" element={<HomePage />} />
        <Route path="/library" element={<LibraryPage />} />
        <Route path="/library/:playlistId" element={<PlaylistPage />} />
        <Route path="/album/:albumId" element={<AlbumPage />} />
        <Route path="community">
          <Route index element={<CommunityPage />} />
          <Route path=":boardId" element={<BoardPage />} />
        </Route>
        <Route path="/studio" element={<StudioPage />} />
        <Route path="/profile" element={<ProfilePage />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Route>
    </Routes>
  );
}

import { useLocation } from "react-router-dom";
import { getAlbum, type AlbumId } from "../data/albums";

export function useAlbumChrome() {
  const { pathname } = useLocation();
  const match = pathname.match(/^\/album\/([^/]+)/);
  const album = match ? getAlbum(match[1] as AlbumId) : undefined;
  return album;
}

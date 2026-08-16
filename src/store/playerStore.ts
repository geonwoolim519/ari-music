import { create } from "zustand";
import { defaultTrack, getAlbum, type Track } from "../data/albums";

type PlayerState = {
  currentTrack: Track | null;
  isPlaying: boolean;
  isMiniPlayerVisible: boolean;
  playTrack: (track: Track) => void;
  togglePlay: () => void;
  nextTrack: () => void;
};

export const usePlayerStore = create<PlayerState>((set, get) => ({
  currentTrack: defaultTrack,
  isPlaying: true,
  isMiniPlayerVisible: true,
  playTrack: (track) =>
    set({
      currentTrack: track,
      isPlaying: true,
      isMiniPlayerVisible: true,
    }),
  togglePlay: () => {
    const { currentTrack, isPlaying } = get();
    if (!currentTrack) return;
    set({ isPlaying: !isPlaying });
  },
  nextTrack: () => {
    const { currentTrack } = get();
    if (!currentTrack) return;
    const album = getAlbum(currentTrack.albumId);
    if (!album) return;
    const index = album.tracks.findIndex((track) => track.id === currentTrack.id);
    const next = album.tracks[(index + 1) % album.tracks.length];
    set({ currentTrack: next, isPlaying: true, isMiniPlayerVisible: true });
  },
}));

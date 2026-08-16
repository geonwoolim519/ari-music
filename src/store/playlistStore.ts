import { create } from "zustand";
import type { Track } from "../data/albums";

export const PLAYLISTS = [
  { id: 1, name: "플레이리스트 1" },
  { id: 2, name: "플레이리스트 2" },
  { id: 3, name: "플레이리스트 3" },
] as const;

export type PlaylistId = (typeof PLAYLISTS)[number]["id"];

type PlaylistState = {
  lists: Record<PlaylistId, Track[]>;
  toast: string | null;
  pendingTrack: Track | null;
  openAddSheet: (track: Track) => void;
  closeAddSheet: () => void;
  addToPlaylist: (track: Track, playlistId?: PlaylistId) => void;
  clearToast: () => void;
};

export const usePlaylistStore = create<PlaylistState>((set, get) => ({
  lists: { 1: [], 2: [], 3: [] },
  toast: null,
  pendingTrack: null,
  openAddSheet: (track) => set({ pendingTrack: track }),
  closeAddSheet: () => set({ pendingTrack: null }),
  addToPlaylist: (track, playlistId = 1) => {
    const name =
      PLAYLISTS.find((item) => item.id === playlistId)?.name ?? "플레이리스트 1";
    const current = get().lists[playlistId];
    const exists = current.some((item) => item.id === track.id);
    set({
      lists: exists
        ? get().lists
        : { ...get().lists, [playlistId]: [...current, track] },
      pendingTrack: null,
      toast: exists ? `이미 ${name}에 있습니다` : `${name}에 추가되었습니다`,
    });
    window.setTimeout(() => {
      if (get().toast) set({ toast: null });
    }, 1800);
  },
  clearToast: () => set({ toast: null }),
}));

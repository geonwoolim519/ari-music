import { create } from "zustand";
import { getAlbum, getTrackDuration, type Track } from "../data/albums";

type PlayerState = {
  currentTrack: Track | null;
  isPlaying: boolean;
  isMiniPlayerVisible: boolean;
  currentTime: number;
  duration: number;
  seekTo: number | null;
  playTrack: (track: Track) => void;
  togglePlay: () => void;
  nextTrack: () => void;
  prevTrack: () => void;
  seek: (time: number) => void;
  clearSeek: () => void;
  setPlaybackTime: (currentTime: number, duration?: number) => void;
};

function skipTrack(direction: 1 | -1) {
  const { currentTrack } = usePlayerStore.getState();
  if (!currentTrack) return;
  const album = getAlbum(currentTrack.albumId);
  if (!album) return;
  const index = album.tracks.findIndex((track) => track.id === currentTrack.id);
  const next = album.tracks[(index + direction + album.tracks.length) % album.tracks.length];
  usePlayerStore.setState({
    currentTrack: next,
    isPlaying: true,
    isMiniPlayerVisible: true,
    currentTime: 0,
    duration: getTrackDuration(next),
    seekTo: null,
  });
}

export const usePlayerStore = create<PlayerState>((set, get) => ({
  currentTrack: null,
  isPlaying: false,
  isMiniPlayerVisible: false,
  currentTime: 0,
  duration: 0,
  seekTo: null,
  playTrack: (track) =>
    set({
      currentTrack: track,
      isPlaying: true,
      isMiniPlayerVisible: true,
      currentTime: 0,
      duration: getTrackDuration(track),
      seekTo: 0,
    }),
  togglePlay: () => {
    const { currentTrack, isPlaying } = get();
    if (!currentTrack) return;
    set({ isPlaying: !isPlaying });
  },
  nextTrack: () => skipTrack(1),
  prevTrack: () => skipTrack(-1),
  seek: (time) => {
    const duration = get().duration;
    const clamped = Math.min(Math.max(time, 0), duration || time);
    set({ currentTime: clamped, seekTo: clamped });
  },
  clearSeek: () => set({ seekTo: null }),
  setPlaybackTime: (currentTime, duration) => {
    if (get().seekTo != null) return;
    set({
      currentTime,
      duration: duration && Number.isFinite(duration) && duration > 0 ? duration : get().duration,
    });
  },
}));

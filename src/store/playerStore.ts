import { create } from "zustand";
import { getAlbum, getTrackDuration, type Track } from "../data/albums";

type PlayerState = {
  currentTrack: Track | null;
  queue: Track[];
  isPlaying: boolean;
  isMiniPlayerVisible: boolean;
  currentTime: number;
  duration: number;
  seekTo: number | null;
  playTrack: (track: Track, queue?: Track[]) => void;
  togglePlay: () => void;
  nextTrack: () => void;
  prevTrack: () => void;
  seek: (time: number) => void;
  clearSeek: () => void;
  setPlaybackTime: (currentTime: number, duration?: number) => void;
};

function queueFor(track: Track, queue?: Track[]) {
  if (queue && queue.length > 0) return [...queue];
  const album = getAlbum(track.albumId);
  return album?.tracks ? [...album.tracks] : [track];
}

function skipTrack(direction: 1 | -1) {
  const { currentTrack, queue } = usePlayerStore.getState();
  if (!currentTrack) return;
  const list = queue.length > 0 ? queue : queueFor(currentTrack);
  if (list.length === 0) return;
  const index = list.findIndex((track) => track.id === currentTrack.id);
  const from = index >= 0 ? index : 0;
  const next = list[(from + direction + list.length) % list.length];
  usePlayerStore.setState({
    currentTrack: next,
    queue: list,
    isPlaying: true,
    isMiniPlayerVisible: true,
    currentTime: 0,
    duration: getTrackDuration(next),
    seekTo: null,
  });
}

export const usePlayerStore = create<PlayerState>((set, get) => ({
  currentTrack: null,
  queue: [],
  isPlaying: false,
  isMiniPlayerVisible: false,
  currentTime: 0,
  duration: 0,
  seekTo: null,
  playTrack: (track, queue) =>
    set({
      currentTrack: track,
      queue: queueFor(track, queue),
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

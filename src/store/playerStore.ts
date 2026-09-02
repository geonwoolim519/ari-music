import { create } from "zustand";
import { getAlbum, getTrack, getTrackDuration, type Track } from "../data/albums";

const LISTEN_KEY = "ari-music-listens";
const LISTEN_VERSION = 2;

type ListenState = {
  listenCounts: Record<string, number>;
  lastPlayedAt: Record<string, number>;
};

const emptyListens = (): ListenState => ({
  listenCounts: {},
  lastPlayedAt: {},
});

function loadListens(): ListenState {
  try {
    const raw = localStorage.getItem(LISTEN_KEY);
    if (!raw) return emptyListens();
    const parsed = JSON.parse(raw) as Partial<ListenState> & { v?: number };
    if (parsed.v !== LISTEN_VERSION) return emptyListens();
    return {
      listenCounts: parsed.listenCounts ?? {},
      lastPlayedAt: parsed.lastPlayedAt ?? {},
    };
  } catch {
    return emptyListens();
  }
}

function persistListens(listens: ListenState) {
  try {
    localStorage.setItem(
      LISTEN_KEY,
      JSON.stringify({ ...listens, v: LISTEN_VERSION }),
    );
  } catch {
    /* ignore quota */
  }
}

const initialListens = loadListens();

type PlayerState = {
  currentTrack: Track | null;
  queue: Track[];
  isPlaying: boolean;
  isMiniPlayerVisible: boolean;
  currentTime: number;
  duration: number;
  seekTo: number | null;
  listenCounts: Record<string, number>;
  lastPlayedAt: Record<string, number>;
  playTrack: (track: Track, queue?: Track[]) => void;
  togglePlay: () => void;
  nextTrack: () => void;
  prevTrack: () => void;
  seek: (time: number) => void;
  clearSeek: () => void;
  setPlaybackTime: (currentTime: number, duration?: number) => void;
  pausePlayback: () => void;
};

function queueFor(track: Track, queue?: Track[]) {
  if (queue && queue.length > 0) return [...queue];
  const album = getAlbum(track.albumId);
  return album?.tracks ? [...album.tracks] : [track];
}

function recordListen(trackId: string): ListenState {
  const { listenCounts, lastPlayedAt } = usePlayerStore.getState();
  const next = {
    listenCounts: {
      ...listenCounts,
      [trackId]: (listenCounts[trackId] ?? 0) + 1,
    },
    lastPlayedAt: {
      ...lastPlayedAt,
      [trackId]: Date.now(),
    },
  };
  persistListens(next);
  return next;
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
    ...recordListen(next.id),
  });
}

export function getMostListenedTrack(
  listenCounts: Record<string, number>,
  lastPlayedAt: Record<string, number>,
): Track | null {
  let bestId: string | null = null;
  let bestCount = 0;
  let bestTime = 0;
  for (const [id, count] of Object.entries(listenCounts)) {
    if (count <= 0) continue;
    const time = lastPlayedAt[id] ?? 0;
    if (count > bestCount || (count === bestCount && time > bestTime)) {
      bestId = id;
      bestCount = count;
      bestTime = time;
    }
  }
  if (!bestId) return null;
  return getTrack(bestId)?.track ?? null;
}

export const usePlayerStore = create<PlayerState>((set, get) => ({
  currentTrack: null,
  queue: [],
  isPlaying: false,
  isMiniPlayerVisible: false,
  currentTime: 0,
  duration: 0,
  seekTo: null,
  listenCounts: initialListens.listenCounts,
  lastPlayedAt: initialListens.lastPlayedAt,
  playTrack: (track, queue) =>
    set({
      currentTrack: track,
      queue: queueFor(track, queue),
      isPlaying: true,
      isMiniPlayerVisible: true,
      currentTime: 0,
      duration: getTrackDuration(track),
      seekTo: 0,
      ...recordListen(track.id),
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
  pausePlayback: () => set({ isPlaying: false }),
}));

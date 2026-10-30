import { useEffect, useRef } from "react";
import { albumName, getAlbum, trackTitle } from "../data/albums";
import { useLocaleStore } from "../store/localeStore";
import { usePlayerStore } from "../store/playerStore";

function absoluteUrl(src: string) {
  return new URL(src, window.location.href).href;
}

function artworkType(src: string) {
  return src.toLowerCase().includes(".png") ? "image/png" : "image/jpeg";
}

function bindSessionAction(
  action: MediaSessionAction,
  handler: MediaSessionActionHandler | null,
) {
  if (!("mediaSession" in navigator)) return;
  try {
    navigator.mediaSession.setActionHandler(action, handler);
  } catch {
    /* unsupported on this browser */
  }
}

function updatePositionState(audio: HTMLAudioElement) {
  if (!("mediaSession" in navigator)) return;
  if (typeof navigator.mediaSession.setPositionState !== "function") return;
  const duration = Number.isFinite(audio.duration) && audio.duration > 0 ? audio.duration : 0;
  const position = Number.isFinite(audio.currentTime) ? audio.currentTime : 0;
  if (duration <= 0 || position < 0 || position > duration) return;
  try {
    navigator.mediaSession.setPositionState({
      duration,
      playbackRate: audio.playbackRate || 1,
      position,
    });
  } catch {
    /* Safari throws when values are briefly inconsistent */
  }
}

function applyMediaMetadata(artworkSizes?: string) {
  if (!("mediaSession" in navigator)) return;
  const session = navigator.mediaSession;
  const { currentTrack, isPlaying } = usePlayerStore.getState();

  if (!currentTrack?.audioUrl) {
    session.metadata = null;
    session.playbackState = "none";
    return;
  }

  const locale = useLocaleStore.getState().locale;
  const album = getAlbum(currentTrack.albumId);
  const collection = album ? albumName(album, locale) : "아리뮤직";
  const artwork: MediaImage[] = [];
  if (album?.cover) {
    const image: MediaImage = {
      src: absoluteUrl(album.cover),
      type: artworkType(album.cover),
    };
    if (artworkSizes) image.sizes = artworkSizes;
    artwork.push(image);
  }

  session.metadata = new MediaMetadata({
    title: trackTitle(currentTrack, locale),
    artist: collection,
    album: collection,
    artwork,
  });
  session.playbackState = isPlaying ? "playing" : "paused";
}

export function AudioEngine() {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const artworkTokenRef = useRef(0);
  const artworkSizesRef = useRef<string | undefined>(undefined);
  const lastCoverRef = useRef<string | undefined>(undefined);
  const suppressPauseSyncRef = useRef(false);
  const currentTrack = usePlayerStore((state) => state.currentTrack);
  const isPlaying = usePlayerStore((state) => state.isPlaying);
  const seekTo = usePlayerStore((state) => state.seekTo);
  const nextTrack = usePlayerStore((state) => state.nextTrack);
  const locale = useLocaleStore((state) => state.locale);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    const syncStoreTime = () => {
      usePlayerStore.getState().setPlaybackTime(audio.currentTime, audio.duration);
      updatePositionState(audio);
    };
    const onEnded = () => nextTrack();
    const onPlaying = () => {
      applyMediaMetadata(artworkSizesRef.current);
      updatePositionState(audio);
      if (!usePlayerStore.getState().isPlaying) {
        usePlayerStore.getState().togglePlay();
      }
    };
    const onPause = () => {
      applyMediaMetadata(artworkSizesRef.current);
      if (suppressPauseSyncRef.current || audio.ended) return;
      if (usePlayerStore.getState().isPlaying) {
        usePlayerStore.getState().pausePlayback();
      }
    };

    audio.addEventListener("ended", onEnded);
    audio.addEventListener("timeupdate", syncStoreTime);
    audio.addEventListener("loadedmetadata", syncStoreTime);
    audio.addEventListener("playing", onPlaying);
    audio.addEventListener("pause", onPause);

    bindSessionAction("play", () => {
      if (!usePlayerStore.getState().isPlaying) usePlayerStore.getState().togglePlay();
    });
    bindSessionAction("pause", () => usePlayerStore.getState().pausePlayback());
    bindSessionAction("stop", () => usePlayerStore.getState().pausePlayback());
    bindSessionAction("previoustrack", () => usePlayerStore.getState().prevTrack());
    bindSessionAction("nexttrack", () => usePlayerStore.getState().nextTrack());
    bindSessionAction("seekto", (details) => {
      if (typeof details.seekTime === "number") usePlayerStore.getState().seek(details.seekTime);
    });
    bindSessionAction("seekbackward", (details) => {
      const offset = details.seekOffset ?? 10;
      const { currentTime } = usePlayerStore.getState();
      usePlayerStore.getState().seek(currentTime - offset);
    });
    bindSessionAction("seekforward", (details) => {
      const offset = details.seekOffset ?? 10;
      const { currentTime } = usePlayerStore.getState();
      usePlayerStore.getState().seek(currentTime + offset);
    });

    return () => {
      audio.removeEventListener("ended", onEnded);
      audio.removeEventListener("timeupdate", syncStoreTime);
      audio.removeEventListener("loadedmetadata", syncStoreTime);
      audio.removeEventListener("playing", onPlaying);
      audio.removeEventListener("pause", onPause);
      bindSessionAction("play", null);
      bindSessionAction("pause", null);
      bindSessionAction("stop", null);
      bindSessionAction("previoustrack", null);
      bindSessionAction("nexttrack", null);
      bindSessionAction("seekto", null);
      bindSessionAction("seekbackward", null);
      bindSessionAction("seekforward", null);
    };
  }, [nextTrack]);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    if (!currentTrack?.audioUrl) {
      suppressPauseSyncRef.current = true;
      audio.pause();
      audio.removeAttribute("src");
      audio.load();
      suppressPauseSyncRef.current = false;
      applyMediaMetadata();
      return;
    }

    const nextSrc = absoluteUrl(currentTrack.audioUrl);
    if (audio.src !== nextSrc) {
      suppressPauseSyncRef.current = true;
      audio.src = currentTrack.audioUrl;
    }

    if (isPlaying) {
      void audio
        .play()
        .catch(() => undefined)
        .finally(() => {
          suppressPauseSyncRef.current = false;
        });
    } else {
      audio.pause();
      suppressPauseSyncRef.current = false;
    }

    const cover = getAlbum(currentTrack.albumId)?.cover;
    if (cover !== lastCoverRef.current) {
      lastCoverRef.current = cover;
      artworkSizesRef.current = undefined;
    }

    applyMediaMetadata(artworkSizesRef.current);
    updatePositionState(audio);

    if (!cover) return;
    const token = ++artworkTokenRef.current;
    const image = new Image();
    image.onload = () => {
      if (artworkTokenRef.current !== token) return;
      const width = image.naturalWidth;
      const height = image.naturalHeight;
      artworkSizesRef.current = width && height ? `${width}x${height}` : undefined;
      applyMediaMetadata(artworkSizesRef.current);
    };
    image.src = absoluteUrl(cover);
  }, [currentTrack, isPlaying, locale]);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio || seekTo == null) return;
    audio.currentTime = seekTo;
    usePlayerStore.getState().clearSeek();
    updatePositionState(audio);
  }, [seekTo]);

  return (
    <audio
      ref={audioRef}
      playsInline
      preload="auto"
      className="pointer-events-none absolute h-px w-px overflow-hidden opacity-0"
    />
  );
}

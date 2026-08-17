import { useEffect, useRef } from "react";
import { usePlayerStore } from "../store/playerStore";

export function AudioEngine() {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const currentTrack = usePlayerStore((state) => state.currentTrack);
  const isPlaying = usePlayerStore((state) => state.isPlaying);
  const seekTo = usePlayerStore((state) => state.seekTo);
  const nextTrack = usePlayerStore((state) => state.nextTrack);

  useEffect(() => {
    const audio = new Audio();
    audio.preload = "auto";
    audioRef.current = audio;

    const onEnded = () => nextTrack();
    const onTimeUpdate = () => {
      usePlayerStore.getState().setPlaybackTime(audio.currentTime, audio.duration);
    };
    const onLoaded = () => {
      usePlayerStore.getState().setPlaybackTime(audio.currentTime, audio.duration);
    };

    audio.addEventListener("ended", onEnded);
    audio.addEventListener("timeupdate", onTimeUpdate);
    audio.addEventListener("loadedmetadata", onLoaded);

    return () => {
      audio.removeEventListener("ended", onEnded);
      audio.removeEventListener("timeupdate", onTimeUpdate);
      audio.removeEventListener("loadedmetadata", onLoaded);
      audio.pause();
      audio.src = "";
      audioRef.current = null;
    };
  }, [nextTrack]);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    if (!currentTrack?.audioUrl) {
      audio.pause();
      audio.removeAttribute("src");
      audio.load();
      return;
    }

    const nextSrc = new URL(currentTrack.audioUrl, window.location.href).href;
    if (audio.src !== nextSrc) {
      audio.src = currentTrack.audioUrl;
    }

    if (isPlaying) {
      void audio.play().catch(() => undefined);
    } else {
      audio.pause();
    }
  }, [currentTrack, isPlaying]);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio || seekTo == null) return;
    audio.currentTime = seekTo;
    usePlayerStore.getState().clearSeek();
  }, [seekTo]);

  return null;
}

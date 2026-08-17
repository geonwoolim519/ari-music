import { create } from "zustand";

type UiState = {
  introOpen: boolean;
  historyOpen: boolean;
  historyPage: number;
  lyricsOpen: boolean;
  archiveVideoId: string | null;
  openIntro: () => void;
  closeIntro: () => void;
  openHistory: () => void;
  closeHistory: () => void;
  setHistoryPage: (page: number) => void;
  openLyrics: () => void;
  closeLyrics: () => void;
  openArchiveVideo: (id: string) => void;
  closeArchiveVideo: () => void;
};

export const useUiStore = create<UiState>((set) => ({
  introOpen: false,
  historyOpen: false,
  historyPage: 0,
  lyricsOpen: false,
  archiveVideoId: null,
  openIntro: () => set({ introOpen: true }),
  closeIntro: () => set({ introOpen: false }),
  openHistory: () => set({ historyOpen: true, historyPage: 0 }),
  closeHistory: () => set({ historyOpen: false, historyPage: 0 }),
  setHistoryPage: (page) => set({ historyPage: page }),
  openLyrics: () => set({ lyricsOpen: true }),
  closeLyrics: () => set({ lyricsOpen: false }),
  openArchiveVideo: (id) => set({ archiveVideoId: id }),
  closeArchiveVideo: () => set({ archiveVideoId: null }),
}));

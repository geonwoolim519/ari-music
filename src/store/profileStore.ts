import { create } from "zustand";

const STORAGE_KEY = "ari-music-profile";
const DEFAULT_NAME = "아리";

type StoredProfile = {
  name?: string;
  photo?: string | null;
  v?: number;
};

type ProfileState = {
  name: string;
  photo: string | null;
  setName: (name: string) => void;
  setPhoto: (photo: string | null) => void;
};

function loadProfile(): Pick<ProfileState, "name" | "photo"> {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return { name: DEFAULT_NAME, photo: null };
    const parsed = JSON.parse(raw) as StoredProfile;
    const photo = parsed.photo ?? null;
    const name = parsed.v === 2 ? parsed.name?.trim() || DEFAULT_NAME : DEFAULT_NAME;
    persist(name, photo);
    return { name, photo };
  } catch {
    return { name: DEFAULT_NAME, photo: null };
  }
}

function persist(name: string, photo: string | null) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify({ name, photo, v: 2 }));
  } catch {
    /* ignore quota */
  }
}

const initial = loadProfile();

export const useProfileStore = create<ProfileState>((set, get) => ({
  name: initial.name,
  photo: initial.photo,
  setName: (name) => {
    const next = name.trim() || DEFAULT_NAME;
    persist(next, get().photo);
    set({ name: next });
  },
  setPhoto: (photo) => {
    persist(get().name, photo);
    set({ photo });
  },
}));

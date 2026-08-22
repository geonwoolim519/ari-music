import { create } from "zustand";
import { messages, type Locale, type MessageKey } from "../i18n/strings";

const STORAGE_KEY = "ari-music-locale";

function loadLocale(): Locale {
  try {
    return localStorage.getItem(STORAGE_KEY) === "en" ? "en" : "ko";
  } catch {
    return "ko";
  }
}

function translate(locale: Locale, key: MessageKey, vars?: Record<string, string | number>) {
  let text: string = messages[locale][key] ?? messages.ko[key];
  if (vars) {
    for (const [name, value] of Object.entries(vars)) {
      text = text.replaceAll(`{${name}}`, String(value));
    }
  }
  return text;
}

type LocaleState = {
  locale: Locale;
  setLocale: (locale: Locale) => void;
};

export const useLocaleStore = create<LocaleState>((set) => ({
  locale: loadLocale(),
  setLocale: (locale) => {
    try {
      localStorage.setItem(STORAGE_KEY, locale);
    } catch {
      /* ignore quota */
    }
    document.documentElement.lang = locale === "en" ? "en" : "ko";
    set({ locale });
  },
}));

export function t(key: MessageKey, vars?: Record<string, string | number>) {
  return translate(useLocaleStore.getState().locale, key, vars);
}

export function useT() {
  const locale = useLocaleStore((state) => state.locale);
  return (key: MessageKey, vars?: Record<string, string | number>) =>
    translate(locale, key, vars);
}

if (typeof document !== "undefined") {
  document.documentElement.lang = loadLocale() === "en" ? "en" : "ko";
}

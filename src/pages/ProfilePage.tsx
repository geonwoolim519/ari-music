import { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { PencilIcon, PhotoIcon } from "../components/Icons";
import { trackTitle } from "../data/albums";
import { getMostListenedTrack, usePlayerStore } from "../store/playerStore";
import { useLocaleStore, useT } from "../store/localeStore";
import { useProfileStore } from "../store/profileStore";

export function ProfilePage() {
  const navigate = useNavigate();
  const t = useT();
  const locale = useLocaleStore((state) => state.locale);
  const setLocale = useLocaleStore((state) => state.setLocale);
  const name = useProfileStore((state) => state.name);
  const photo = useProfileStore((state) => state.photo);
  const setName = useProfileStore((state) => state.setName);
  const setPhoto = useProfileStore((state) => state.setPhoto);
  const listenCounts = usePlayerStore((state) => state.listenCounts);
  const lastPlayedAt = usePlayerStore((state) => state.lastPlayedAt);
  const playTrack = usePlayerStore((state) => state.playTrack);
  const mostPlayed = getMostListenedTrack(listenCounts, lastPlayedAt);
  const fileRef = useRef<HTMLInputElement>(null);
  const [editing, setEditing] = useState(false);
  const [draftName, setDraftName] = useState(name);

  const saveName = () => {
    setName(draftName);
    setEditing(false);
  };

  return (
    <div className="flex h-full flex-col bg-white">
      <header className="relative flex items-center justify-center px-[12px] pt-[16px] pb-[10px]">
        <button
          type="button"
          className="absolute left-[10px] grid h-[36px] w-[36px] place-items-center text-[#9a9a9a]"
          aria-label={t("back")}
          onClick={() => navigate(-1)}
        >
          <svg width="18" height="18" viewBox="0 0 16 16" fill="none" aria-hidden>
            <path
              d="M10.5 3.2 5.2 8 10.5 12.8"
              stroke="currentColor"
              strokeWidth="2.2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </button>

        <div className="relative">
          <div className="grid h-[78px] w-[78px] place-items-center overflow-hidden rounded-full bg-[#d8d8d8] text-[20px] font-bold text-[#333]">
            {photo ? (
              <img src={photo} alt="" className="h-full w-full object-cover" />
            ) : (
              <span className="px-[6px] text-center leading-none tracking-[-0.04em]">
                {name}
              </span>
            )}
          </div>
          <div className="absolute left-full top-1/2 ml-[10px] flex -translate-y-1/2 flex-col gap-[10px] text-[#6f6f6f]">
            <button
              type="button"
              aria-label={t("editName")}
              className="grid h-[22px] w-[22px] place-items-center"
              onClick={() => {
                setDraftName(name);
                setEditing(true);
              }}
            >
              <PencilIcon size={18} />
            </button>
            <button
              type="button"
              aria-label={t("editPhoto")}
              className="grid h-[22px] w-[22px] place-items-center"
              onClick={() => fileRef.current?.click()}
            >
              <PhotoIcon size={18} />
            </button>
          </div>
        </div>
      </header>

      <input
        ref={fileRef}
        type="file"
        accept="image/*"
        className="hidden"
        onChange={(event) => {
          const file = event.target.files?.[0];
          event.target.value = "";
          if (!file) return;
          const reader = new FileReader();
          reader.onload = () => {
            if (typeof reader.result === "string") setPhoto(reader.result);
          };
          reader.readAsDataURL(file);
        }}
      />

      <div className="px-[22px] pb-[160px] pt-[8px]">
        <h1 className="text-[34px] font-extrabold tracking-[-0.06em] text-black">
          {t("myPage")}
        </h1>

        {editing ? (
          <div className="mt-[12px] flex items-center gap-[8px]">
            <input
              autoFocus
              value={draftName}
              placeholder={t("namePlaceholder")}
              className="h-[40px] min-w-0 flex-1 rounded-[10px] border border-[#ddd] px-[12px] text-[15px] outline-none"
              onChange={(event) => setDraftName(event.target.value)}
              onKeyDown={(event) => {
                if (event.key === "Enter") saveName();
                if (event.key === "Escape") setEditing(false);
              }}
              onBlur={saveName}
            />
          </div>
        ) : null}

        <ul className="mt-[22px]">
          <li className="flex items-center gap-[12px] py-[14px]">
            <span className="h-[18px] w-[4px] shrink-0 rounded-full bg-[#c8c8c8]" />
            <span className="text-[16px] font-semibold tracking-[-0.03em] text-black">
              {t("mostPlayed")}
            </span>
            <button
              type="button"
              disabled={!mostPlayed}
              className="ml-auto max-w-[58%] truncate rounded-full bg-[#5f5f5f] px-[14px] py-[6px] text-[13px] font-semibold text-white disabled:bg-[#bdbdbd]"
              onClick={() => {
                if (mostPlayed) playTrack(mostPlayed);
              }}
            >
              {mostPlayed ? trackTitle(mostPlayed, locale) : t("noneYet")}
            </button>
          </li>

          <li className="flex items-center gap-[12px] py-[14px]">
            <span className="h-[18px] w-[4px] shrink-0 rounded-full bg-[#c8c8c8]" />
            <span className="text-[16px] font-semibold tracking-[-0.03em] text-black">
              {t("language")}
            </span>
            <div className="ml-auto flex gap-[8px]">
              <button
                type="button"
                className={`rounded-full px-[14px] py-[6px] text-[13px] font-semibold ${
                  locale === "ko"
                    ? "bg-[#5f5f5f] text-white"
                    : "bg-[#d8d8d8] text-black"
                }`}
                onClick={() => setLocale("ko")}
              >
                {t("korean")}
              </button>
              <button
                type="button"
                className={`rounded-full px-[14px] py-[6px] text-[13px] font-semibold ${
                  locale === "en"
                    ? "bg-[#5f5f5f] text-white"
                    : "bg-[#d8d8d8] text-black"
                }`}
                onClick={() => setLocale("en")}
              >
                {t("english")}
              </button>
            </div>
          </li>
        </ul>
      </div>
    </div>
  );
}

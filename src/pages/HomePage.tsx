import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
import { albums, gugakAlbums, albumName } from "../data/albums";
import { useDragScroll } from "../hooks/useDragScroll";
import { useUiStore } from "../store/uiStore";
import { AppHeader } from "../components/AppHeader";
import {
  HistoryClockIcon,
  MapPinIcon,
  MenuIcon,
  SearchIcon,
  FingerIcon,
  SectionChevron,
} from "../components/Icons";
import { useLocaleStore, useT } from "../store/localeStore";

function KaraokeBackdrop() {
  return (
    <span className="pointer-events-none absolute inset-0 overflow-hidden bg-[#1a0828]" aria-hidden>
      <svg
        viewBox="0 0 360 132"
        className="absolute inset-0 h-full w-full"
        preserveAspectRatio="xMaxYMid slice"
      >
        <defs>
          <radialGradient id="karaokeGlow" cx="78%" cy="42%">
            <stop offset="0%" stopColor="#ff5a8a" stopOpacity="0.55" />
            <stop offset="42%" stopColor="#7b2cff" stopOpacity="0.28" />
            <stop offset="100%" stopColor="#1a0828" stopOpacity="0" />
          </radialGradient>
          <linearGradient id="karaokeScreen" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#2a1a4a" />
            <stop offset="100%" stopColor="#12081f" />
          </linearGradient>
          <linearGradient id="karaokeMic" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#f4f0e8" />
            <stop offset="55%" stopColor="#c8c2b6" />
            <stop offset="100%" stopColor="#8e877a" />
          </linearGradient>
        </defs>
        <rect width="360" height="132" fill="#1a0828" />
        <circle cx="286" cy="58" r="92" fill="url(#karaokeGlow)" />
        <rect x="248" y="18" width="98" height="62" rx="8" fill="url(#karaokeScreen)" />
        <rect x="248" y="18" width="98" height="62" rx="8" fill="none" stroke="#ff4d8a" strokeWidth="1.4" opacity="0.7" />
        <path d="M262 38h52M262 50h40M262 62h28" stroke="#ffd6e8" strokeWidth="3" strokeLinecap="round" opacity="0.85" />
        <g transform="translate(292 86) rotate(-28)">
          <rect x="-5" y="8" width="10" height="46" rx="5" fill="url(#karaokeMic)" />
          <ellipse cx="0" cy="4" rx="14" ry="16" fill="#2a2a2a" />
          <ellipse cx="0" cy="4" rx="11" ry="13" fill="#111" />
          <path d="M-8 -6h16M-9 0h18M-8 6h16" stroke="#d8d8d8" strokeWidth="1.4" />
          <rect x="-7" y="18" width="14" height="6" rx="1.5" fill="#e8c36a" />
        </g>
        <circle cx="318" cy="22" r="3.2" fill="#7dffb3" />
        <circle cx="330" cy="38" r="2.4" fill="#ffdf5a" />
        <circle cx="244" cy="28" r="2.6" fill="#7ec8ff" />
      </svg>
    </span>
  );
}

export function HomePage() {
  const navigate = useNavigate();
  const openIntro = useUiStore((state) => state.openIntro);
  const openManual = useUiStore((state) => state.openManual);
  const openHistory = useUiStore((state) => state.openHistory);
  const albumScrollRef = useDragScroll<HTMLDivElement>();
  const gugakScrollRef = useDragScroll<HTMLDivElement>();
  const [storyOpen, setStoryOpen] = useState(false);
  const t = useT();
  const locale = useLocaleStore((state) => state.locale);

  return (
    <div className="flex h-full flex-col bg-white">
      <AppHeader />
      <div className="phone-scroll min-h-0 flex-1 overflow-y-auto overscroll-y-contain px-[18px] pb-[160px] pt-[10px]">
        <div className="flex flex-col gap-[12px]">
          <button
            type="button"
            onClick={() => navigate("/studio")}
            className="relative h-[132px] overflow-hidden rounded-[28px] text-left shadow-[0_8px_18px_rgba(0,0,0,0.12)]"
          >
            <KaraokeBackdrop />
            <span className="absolute inset-y-0 left-0 w-[68%] bg-gradient-to-r from-[#1a0828] via-[#1a0828]/78 to-transparent" />
            <span className="relative z-[1] flex h-full flex-col justify-center px-[22px] pr-[88px]">
              <span className="text-[22px] font-extrabold tracking-[-0.04em] text-white">
                {t("studioTitle")}
              </span>
              <span className="mt-[8px] text-[13px] font-medium leading-[1.45] tracking-[-0.02em] text-white/88">
                {t("studioLine1")}
                <br />
                {t("studioLine2")}
              </span>
            </span>
          </button>

          <div>
            <button
              type="button"
              onClick={() => setStoryOpen((open) => !open)}
              className="flex h-[52px] w-full items-center gap-[10px] rounded-[26px] px-[18px] text-left shadow-[0_8px_18px_rgba(0,0,0,0.12)]"
              style={{
                background: "linear-gradient(90deg, #e8b4f0 0%, #e5b0ed 100%)",
              }}
              aria-expanded={storyOpen}
            >
              <span className="text-black">
                <MenuIcon size={22} />
              </span>
              <span className="text-[17px] font-extrabold tracking-[-0.03em] text-black">
                {t("arirangStory")}
              </span>
            </button>

            <AnimatePresence initial={false}>
              {storyOpen ? (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.22 }}
                  className="overflow-hidden"
                >
                  <div className="ml-[2px] mt-[8px] w-[220px] overflow-hidden rounded-[6px] border border-black bg-white">
                    <button
                      type="button"
                      className="flex w-full items-center gap-[10px] border-b border-black px-[12px] py-[11px] text-left"
                      onClick={openIntro}
                    >
                      <SearchIcon size={18} />
                      <span className="text-[14px] font-semibold tracking-[-0.02em] text-black">
                        {t("intro")}
                      </span>
                    </button>
                    <button
                      type="button"
                      className="flex w-full items-center gap-[10px] border-b border-black px-[12px] py-[11px] text-left"
                      onClick={openManual}
                    >
                      <FingerIcon size={18} />
                      <span className="text-[14px] font-semibold tracking-[-0.02em] text-black">
                        {t("manual")}
                      </span>
                    </button>
                    <button
                      type="button"
                      className="flex w-full items-center gap-[10px] border-b border-black px-[12px] py-[11px] text-left"
                      onClick={openHistory}
                    >
                      <HistoryClockIcon size={18} />
                      <span className="text-[14px] font-semibold tracking-[-0.02em] text-black">
                        {t("history")}
                      </span>
                    </button>
                    <button
                      type="button"
                      className="flex w-full items-center gap-[10px] px-[12px] py-[11px] text-left"
                      onClick={() => navigate("/map")}
                    >
                      <MapPinIcon size={18} />
                      <span className="text-[14px] font-semibold tracking-[-0.02em] text-black">
                        {t("cultureMap")}
                      </span>
                    </button>
                  </div>
                </motion.div>
              ) : null}
            </AnimatePresence>
          </div>
        </div>

        <section className="mt-[28px]">
          <div className="mb-[14px] flex items-center gap-[4px]">
            <h2 className="text-[20px] font-extrabold tracking-[-0.04em] text-black">
              {t("regionalAlbums")}
            </h2>
            <span className="text-[#8a8a8a]">
              <SectionChevron size={22} />
            </span>
          </div>

          <div
            ref={albumScrollRef}
            className="drag-scroll -mx-[18px] flex gap-[12px] overflow-x-auto overscroll-x-contain px-[18px] pb-[2px] snap-x snap-mandatory"
          >
            {albums.map((album) => (
              <button
                key={album.id}
                type="button"
                className="w-[108px] min-w-[108px] max-w-[108px] shrink-0 snap-start overflow-hidden text-center"
                onClick={() => navigate(`/album/${album.id}`)}
              >
                <img
                  src={album.cover}
                  alt={albumName(album, locale)}
                  className="aspect-square w-full rounded-[18px] object-cover"
                />
                <span className="mt-[8px] block h-[34px] w-full text-[13px] font-semibold leading-[1.25] tracking-[-0.02em] break-words text-black">
                  {albumName(album, locale)}
                </span>
              </button>
            ))}
          </div>
        </section>

        <section className="mt-[28px]">
          <div className="mb-[14px] flex items-center gap-[4px]">
            <h2 className="text-[20px] font-extrabold tracking-[-0.04em] text-black">
              {t("gugakAlbums")}
            </h2>
            <span className="text-[#8a8a8a]">
              <SectionChevron size={22} />
            </span>
          </div>

          <div
            ref={gugakScrollRef}
            className="drag-scroll -mx-[18px] flex gap-[12px] overflow-x-auto overscroll-x-contain px-[18px] pb-[2px] snap-x snap-mandatory"
          >
            {gugakAlbums.map((album) => (
              <button
                key={album.id}
                type="button"
                className="w-[108px] min-w-[108px] max-w-[108px] shrink-0 snap-start overflow-hidden text-center"
                onClick={() => navigate(`/album/${album.id}`)}
              >
                <img
                  src={album.cover}
                  alt={albumName(album, locale)}
                  className="aspect-square w-full rounded-[18px] object-cover"
                />
                <span className="mt-[8px] block h-[34px] w-full text-[13px] font-semibold leading-[1.25] tracking-[-0.02em] break-words text-black">
                  {albumName(album, locale)}
                </span>
              </button>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}

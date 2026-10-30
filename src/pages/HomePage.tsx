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
import { PlaygroundBackdrop } from "../components/PlayHeroes";
import { useLocaleStore, useT } from "../store/localeStore";

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
            onClick={() => navigate("/playground")}
            className="relative h-[132px] w-full overflow-hidden rounded-[28px] text-left shadow-[0_8px_18px_rgba(0,0,0,0.12)]"
          >
            <PlaygroundBackdrop />
            <span className="absolute inset-y-0 left-0 w-[62%] bg-gradient-to-r from-[#102820] via-[#102820]/72 to-transparent" />
            <span className="relative z-[1] flex h-full flex-col justify-center px-[22px] pr-[96px] pb-[12px]">
              <span className="gugak-serif text-[21px] font-bold tracking-[-0.04em] text-[#f3e6c8]">
                {t("playgroundTitle")}
              </span>
              <span className="mt-[8px] text-[13px] font-medium leading-[1.45] tracking-[-0.02em] text-[#f3e6c8]/88">
                {t("playgroundLine1")}
                <br />
                {t("playgroundLine2")}
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
            className="drag-scroll -mx-[18px] flex gap-[12px] overflow-x-auto overscroll-x-contain px-[18px] pb-[2px] snap-x snap-proximity"
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
            className="drag-scroll -mx-[18px] flex gap-[12px] overflow-x-auto overscroll-x-contain px-[18px] pb-[2px] snap-x snap-proximity"
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

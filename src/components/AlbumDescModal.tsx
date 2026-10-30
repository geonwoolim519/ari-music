import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { albumCoverNote, albumName, type Album } from "../data/albums";
import { useLocaleStore, useT } from "../store/localeStore";

type Props = {
  album: Album;
  open: boolean;
  onClose: () => void;
};

function ChevronLeftIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden>
      <path
        d="M10.5 3.2 5.2 8 10.5 12.8"
        stroke="white"
        strokeWidth="2.2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function ChevronRightIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden>
      <path
        d="M5.5 3.2 10.8 8 5.5 12.8"
        stroke="white"
        strokeWidth="2.2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function CloseIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden>
      <path
        d="M2.2 2.2 11.8 11.8M11.8 2.2 2.2 11.8"
        stroke="white"
        strokeWidth="2.2"
        strokeLinecap="round"
      />
    </svg>
  );
}

export function AlbumDescModal({ album, open, onClose }: Props) {
  const t = useT();
  const locale = useLocaleStore((state) => state.locale);
  const coverNote = albumCoverNote(album, locale);
  const total = coverNote ? 2 : 1;
  const [page, setPage] = useState(0);
  const isLast = page === total - 1;

  useEffect(() => {
    if (open) setPage(0);
  }, [open, album.id]);

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          className="sheet-overlay absolute inset-0 z-40"
          style={{ background: album.theme }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <motion.div
            className="sheet-panel"
            initial={{ y: 40 }}
            animate={{ y: 0 }}
            exit={{ y: 40 }}
            drag={total > 1 ? "x" : false}
            dragDirectionLock
            dragConstraints={{ left: 0, right: 0 }}
            dragElastic={0.12}
            onDragEnd={(_, info) => {
              if (info.offset.x < -60 && page < total - 1) {
                setPage(page + 1);
              } else if (info.offset.x > 60 && page > 0) {
                setPage(page - 1);
              }
            }}
          >
            <div className="sheet-body flex flex-col">
              <div className="relative mb-[14px] flex h-[34px] shrink-0 items-center justify-center">
                {page > 0 ? (
                  <button
                    type="button"
                    onClick={() => setPage(page - 1)}
                    className="absolute left-0 grid h-[34px] w-[34px] place-items-center rounded-full bg-[#c8c8c8]"
                    aria-label={t("prev")}
                  >
                    <ChevronLeftIcon />
                  </button>
                ) : null}
                <h2 className="text-[20px] font-extrabold tracking-[-0.03em]">
                  {albumName(album, locale)}
                </h2>
                <button
                  type="button"
                  onClick={() => (isLast ? onClose() : setPage(page + 1))}
                  className="absolute right-0 grid h-[34px] w-[34px] place-items-center rounded-full text-white"
                  style={{ background: album.theme }}
                  aria-label={isLast ? t("close") : t("next")}
                >
                  {isLast ? <CloseIcon /> : <ChevronRightIcon />}
                </button>
              </div>

              {total > 1 ? (
                <div className="mb-[18px] shrink-0">
                  <p className="text-[12px] font-semibold tracking-[-0.02em] text-black">
                    {page + 1}/{total}
                  </p>
                  <div className="mt-[8px] h-[4px] w-full overflow-hidden bg-black">
                    <div
                      className="h-full transition-[width] duration-200"
                      style={{
                        width: `${((page + 1) / total) * 100}%`,
                        background: album.theme,
                      }}
                    />
                  </div>
                </div>
              ) : null}

              <div className="phone-scroll min-h-0 flex-1 overflow-y-auto">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={page}
                    initial={{ opacity: 0, x: 24 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -24 }}
                    transition={{ duration: 0.22 }}
                    className="flex min-h-full flex-col"
                  >
                    {page === 0 ? (
                      <>
                        <p className="mb-[10px] text-[12px] font-bold tracking-[0.06em] text-[#8a8a8a]">
                          {t("albumSongsIntro")}
                        </p>
                        {album.description.map((text) => (
                          <p
                            key={text.slice(0, 20)}
                            className="mb-[14px] text-[14px] leading-[1.72] text-[#222]"
                          >
                            {text}
                          </p>
                        ))}
                      </>
                    ) : (
                      <>
                        <p className="mb-[10px] shrink-0 text-[12px] font-bold tracking-[0.06em] text-[#8a8a8a]">
                          {t("albumCoverNote")}
                        </p>
                        <p className="mb-[14px] shrink-0 text-[14px] leading-[1.72] text-[#222]">
                          {coverNote}
                        </p>
                        <div className="mt-[8px] flex min-h-[140px] flex-1 items-center justify-center">
                          <img
                            src={album.cover}
                            alt=""
                            className="sheet-photo w-full rounded-[10px]"
                          />
                        </div>
                      </>
                    )}
                  </motion.div>
                </AnimatePresence>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

import { AnimatePresence, motion } from "framer-motion";
import { getAlbum } from "../data/albums";
import { usePlayerStore } from "../store/playerStore";
import { useUiStore } from "../store/uiStore";

export function LyricsModal() {
  const open = useUiStore((state) => state.lyricsOpen);
  const close = useUiStore((state) => state.closeLyrics);
  const track = usePlayerStore((state) => state.currentTrack);
  const album = track ? getAlbum(track.albumId) : undefined;

  return (
    <AnimatePresence>
      {open && track && (
        <motion.div
          className="absolute inset-0 z-50"
          initial={{ y: "100%" }}
          animate={{ y: 0 }}
          exit={{ y: "100%" }}
          transition={{ type: "spring", damping: 28, stiffness: 280 }}
          drag="y"
          dragConstraints={{ top: 0, bottom: 0 }}
          dragElastic={0.12}
          onDragEnd={(_, info) => {
            if (info.offset.y > 90) close();
          }}
          style={{ background: album?.theme ?? "#A0A355" }}
        >
          <div className="flex h-full flex-col px-[20px] pt-[10px] text-white">
            <button
              type="button"
              className="mx-auto mb-[18px] h-[5px] w-[48px] rounded-full bg-white/90"
              aria-label="가사 닫기"
              onClick={close}
            />
            <div className="mb-[22px] flex items-center gap-[12px]">
              <img
                src={album?.cover}
                alt=""
                className="h-[54px] w-[54px] rounded-[12px] object-cover"
              />
              <p className="text-[18px] font-extrabold">{track.title}</p>
            </div>
            <h3 className="mb-[14px] text-center text-[18px] font-extrabold text-black/80">
              가사
            </h3>
            <div className="phone-scroll flex-1 overflow-y-auto pb-[32px] text-[16px] leading-[1.9]">
              {track.lyrics.map((line) => (
                <p key={`${line.time}-${line.text}`}>{line.text}</p>
              ))}
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

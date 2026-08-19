import { AnimatePresence, motion } from "framer-motion";
import type { Album } from "../data/albums";

type Props = {
  album: Album;
  open: boolean;
  onClose: () => void;
};

export function AlbumDescModal({ album, open, onClose }: Props) {
  return (
    <AnimatePresence>
      {open && (
        <motion.div
          className="absolute inset-0 z-40"
          style={{ background: album.theme }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <button
            type="button"
            className="absolute inset-0"
            aria-label="닫기"
            onClick={onClose}
          />
          <motion.div
            className="absolute inset-x-0 bottom-0 top-[52px] overflow-hidden rounded-t-[28px] bg-white"
            initial={{ y: 48 }}
            animate={{ y: 0 }}
            exit={{ y: 48 }}
            onClick={(event) => event.stopPropagation()}
          >
            <div className="phone-scroll h-full overflow-y-auto px-[22px] pb-[36px] pt-[18px]">
              <div className="relative mb-[18px] flex items-center justify-center">
                <h2 className="text-[20px] font-extrabold">{album.name}</h2>
                <button
                  type="button"
                  onClick={onClose}
                  className="absolute right-0 grid h-[32px] w-[32px] place-items-center rounded-full text-[18px] font-bold text-white"
                  style={{ background: album.theme }}
                  aria-label="닫기"
                >
                  ×
                </button>
              </div>
              {album.description.map((text) => (
                <p
                  key={text.slice(0, 20)}
                  className="mb-[16px] text-[15px] leading-[1.7] text-[#222]"
                >
                  {text}
                </p>
              ))}
              <img
                src={album.hero}
                alt=""
                className="mt-[10px] w-full rounded-[10px] object-cover"
              />
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

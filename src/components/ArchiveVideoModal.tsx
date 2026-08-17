import { AnimatePresence, motion } from "framer-motion";
import { getArchiveVideo } from "../data/archive";
import { useUiStore } from "../store/uiStore";

export function ArchiveVideoModal() {
  const videoId = useUiStore((state) => state.archiveVideoId);
  const close = useUiStore((state) => state.closeArchiveVideo);
  const video = videoId ? getArchiveVideo(videoId) : undefined;

  return (
    <AnimatePresence>
      {video && (
        <motion.div
          className="absolute inset-0 z-50 flex flex-col bg-black"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <div className="flex items-center justify-between px-[18px] pt-[14px] pb-[10px]">
            <p className="truncate pr-[12px] text-[15px] font-bold text-white">
              {video.title}
            </p>
            <button
              type="button"
              onClick={close}
              className="grid h-[32px] w-[32px] shrink-0 place-items-center rounded-full bg-white/18 text-[18px] font-bold text-white"
              aria-label="닫기"
            >
              ×
            </button>
          </div>
          <iframe
            title={video.title}
            src={`https://www.youtube.com/embed/${video.id}?autoplay=1&rel=0`}
            className="aspect-video w-full shrink-0 border-0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          />
          <div className="phone-scroll flex-1 overflow-y-auto px-[18px] pb-[28px] pt-[16px]">
            <p className="text-[14px] leading-[1.75] tracking-[-0.02em] text-white">
              {`> ${video.description}`}
            </p>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

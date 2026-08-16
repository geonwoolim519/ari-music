import { AnimatePresence, motion } from "framer-motion";
import { usePlaylistStore } from "../store/playlistStore";

export function Toast() {
  const toast = usePlaylistStore((state) => state.toast);

  return (
    <AnimatePresence>
      {toast && (
        <motion.div
          className="pointer-events-none absolute inset-x-[28px] top-[18px] z-50 rounded-full bg-black/78 px-[16px] py-[10px] text-center text-[13px] font-semibold text-white"
          initial={{ opacity: 0, y: -8 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -8 }}
        >
          {toast}
        </motion.div>
      )}
    </AnimatePresence>
  );
}

import { AnimatePresence, motion } from "framer-motion";
import { DashedRule, ListFolderIcon } from "./LibraryChrome";
import { PLAYLISTS, usePlaylistStore } from "../store/playlistStore";

export function AddToPlaylistSheet() {
  const pendingTrack = usePlaylistStore((state) => state.pendingTrack);
  const closeAddSheet = usePlaylistStore((state) => state.closeAddSheet);
  const addToPlaylist = usePlaylistStore((state) => state.addToPlaylist);

  return (
    <AnimatePresence>
      {pendingTrack && (
        <motion.div
          className="absolute inset-0 z-40 bg-black/35"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <button
            type="button"
            className="absolute inset-0"
            aria-label="닫기"
            onClick={closeAddSheet}
          />
          <motion.div
            className="absolute inset-x-0 bottom-0 rounded-t-[28px] bg-white px-[22px] pb-[36px] pt-[16px]"
            initial={{ y: 40 }}
            animate={{ y: 0 }}
            exit={{ y: 40 }}
            onClick={(event) => event.stopPropagation()}
          >
            <div className="mx-auto mb-[14px] h-[5px] w-[48px] rounded-full bg-[#d8d8d8]" />
            <h2 className="mb-[6px] text-[20px] font-extrabold">플레이리스트에 추가</h2>
            <p className="mb-[14px] truncate text-[13px] text-[#777]">{pendingTrack.title}</p>
            <ul>
              {PLAYLISTS.map((playlist) => (
                <li key={playlist.id}>
                  <button
                    type="button"
                    className="flex w-full items-center gap-[12px] py-[15px] text-left"
                    onClick={() => addToPlaylist(pendingTrack, playlist.id)}
                  >
                    <ListFolderIcon />
                    <span className="text-[17px] font-semibold">
                      {playlist.name}
                      {playlist.id === 1 ? (
                        <span className="ml-[8px] text-[12px] font-medium text-[#888]">
                          기본
                        </span>
                      ) : null}
                    </span>
                  </button>
                  <DashedRule />
                </li>
              ))}
            </ul>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

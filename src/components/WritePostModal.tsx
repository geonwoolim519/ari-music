import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { useCommunityStore } from "../store/communityStore";

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

export function WritePostModal() {
  const open = useCommunityStore((state) => state.writeOpen);
  const close = useCommunityStore((state) => state.closeWrite);
  const addPost = useCommunityStore((state) => state.addPost);
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");

  useEffect(() => {
    if (open) {
      setTitle("");
      setBody("");
    }
  }, [open]);

  const canSubmit = title.trim().length > 0 && body.trim().length > 0;

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          className="absolute inset-0 z-[15] bg-[#FF4D4D]"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <motion.div
            className="absolute inset-x-0 bottom-0 top-[52px] flex flex-col overflow-hidden rounded-t-[28px] bg-white"
            initial={{ y: 40 }}
            animate={{ y: 0 }}
            exit={{ y: 40 }}
          >
            <div className="relative flex items-center justify-center px-[22px] pt-[18px] pb-[8px]">
              <h2 className="text-[20px] font-extrabold tracking-[-0.03em]">
                글쓰기
              </h2>
              <button
                type="button"
                onClick={close}
                className="absolute right-[22px] grid h-[34px] w-[34px] place-items-center rounded-full bg-[#FF4D4D]"
                aria-label="닫기"
              >
                <CloseIcon />
              </button>
            </div>

            <div className="flex min-h-0 flex-1 flex-col px-[22px] pb-[160px] pt-[18px]">
              <input
                value={title}
                onChange={(event) => setTitle(event.target.value)}
                placeholder="제목을 입력해주세요."
                className="w-full border-none bg-transparent text-[16px] font-semibold text-[#222] outline-none placeholder:text-[#8a8a8a]"
              />
              <div className="mt-[12px] h-px bg-[#d8d8d8]" />
              <textarea
                value={body}
                onChange={(event) => setBody(event.target.value)}
                placeholder="자유롭게 얘기해주세요."
                className="mt-[16px] min-h-[180px] flex-1 resize-none border-none bg-transparent text-[15px] leading-[1.65] text-[#222] outline-none placeholder:text-[#b0b0b0]"
              />
              <button
                type="button"
                disabled={!canSubmit}
                onClick={() => addPost(title, body)}
                className="mx-auto mt-[12px] h-[44px] w-[168px] rounded-full bg-[#24356B] text-[16px] font-bold text-white disabled:opacity-40"
              >
                완료
              </button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

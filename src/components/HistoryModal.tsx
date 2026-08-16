import { AnimatePresence, motion } from "framer-motion";
import { historySlides } from "../data/history";
import { useUiStore } from "../store/uiStore";

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

export function HistoryModal() {
  const open = useUiStore((state) => state.historyOpen);
  const page = useUiStore((state) => state.historyPage);
  const setPage = useUiStore((state) => state.setHistoryPage);
  const close = useUiStore((state) => state.closeHistory);
  const slide = historySlides[page];
  const isLast = page === historySlides.length - 1;

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          className="absolute inset-0 z-40 bg-[#FF4D4D]"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <motion.div
            className="absolute inset-x-0 bottom-0 top-[52px] overflow-hidden rounded-t-[28px] bg-white"
            initial={{ y: 40 }}
            animate={{ y: 0 }}
            exit={{ y: 40 }}
            drag="x"
            dragConstraints={{ left: 0, right: 0 }}
            dragElastic={0.12}
            onDragEnd={(_, info) => {
              if (info.offset.x < -60 && page < historySlides.length - 1) {
                setPage(page + 1);
              } else if (info.offset.x > 60 && page > 0) {
                setPage(page - 1);
              }
            }}
          >
            <div className="phone-scroll h-full overflow-y-auto px-[22px] pb-[36px] pt-[18px]">
              <div className="relative mb-[18px] flex items-center justify-center">
                <h2 className="text-[20px] font-extrabold tracking-[-0.03em]">
                  아리랑의 역사
                </h2>
                <button
                  type="button"
                  onClick={() => (isLast ? close() : setPage(page + 1))}
                  className="absolute right-0 grid h-[34px] w-[34px] place-items-center rounded-full bg-[#FF4D4D]"
                  aria-label={isLast ? "닫기" : "다음"}
                >
                  {isLast ? <CloseIcon /> : <ChevronRightIcon />}
                </button>
              </div>

              <AnimatePresence mode="wait">
                <motion.div
                  key={page}
                  initial={{ opacity: 0, x: 24 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -24 }}
                  transition={{ duration: 0.22 }}
                >
                  {slide.paragraphs.map((text) => (
                    <p
                      key={text.slice(0, 28)}
                      className="mb-[14px] text-[14px] leading-[1.72] text-[#222]"
                    >
                      {text}
                    </p>
                  ))}
                  {slide.quote ? (
                    <p className="mb-[14px] text-[14px] leading-[1.72] text-[#222]">
                      “{slide.quote}”
                    </p>
                  ) : null}
                  <img src={slide.image} alt="" className={slide.imageClass} />
                  {slide.caption ? (
                    <p className="mt-[8px] text-center text-[14px] font-bold text-[#222]">
                      {slide.caption}
                    </p>
                  ) : null}
                </motion.div>
              </AnimatePresence>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

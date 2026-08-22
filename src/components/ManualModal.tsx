import { AnimatePresence, motion } from "framer-motion";
import { useUiStore } from "../store/uiStore";
import { useT } from "../store/localeStore";

function HeadphonesIcon() {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" aria-hidden>
      <path
        d="M4.8 13.2V12A7.2 7.2 0 0 1 12 4.8 7.2 7.2 0 0 1 19.2 12v1.2"
        stroke="#FF4D4D"
        strokeWidth="1.8"
        strokeLinecap="round"
      />
      <rect x="3.2" y="12.4" width="4.4" height="7.2" rx="1.6" stroke="#FF4D4D" strokeWidth="1.8" />
      <rect x="16.4" y="12.4" width="4.4" height="7.2" rx="1.6" stroke="#FF4D4D" strokeWidth="1.8" />
    </svg>
  );
}

function NoteIcon() {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" aria-hidden>
      <path d="M9.2 18.4V8.6L19 6.4v9.6" stroke="#FF4D4D" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
      <circle cx="7.4" cy="18.4" r="2.5" stroke="#FF4D4D" strokeWidth="1.8" />
      <circle cx="17.2" cy="16" r="2.5" stroke="#FF4D4D" strokeWidth="1.8" />
    </svg>
  );
}

function BookIcon() {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" aria-hidden>
      <path
        d="M12 6.2c1.6-1.1 3.8-1.6 7.2-1.6v12.2c-3.2 0-5.3.5-7.2 1.6-1.9-1.1-4-1.6-7.2-1.6V4.6c3.4 0 5.6.5 7.2 1.6Z"
        stroke="#FF4D4D"
        strokeWidth="1.8"
        strokeLinejoin="round"
      />
      <path d="M12 6.4v11.8" stroke="#FF4D4D" strokeWidth="1.8" strokeLinecap="round" />
    </svg>
  );
}

function BulbIcon() {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" aria-hidden>
      <path
        d="M12 4.4A5.4 5.4 0 0 0 6.6 9.7c0 2.1 1.1 3.3 2.2 4.5.5.6.8 1.3.8 2v.3h5.8v-.3c0-.7.3-1.4.8-2 1.1-1.2 2.2-2.4 2.2-4.5A5.4 5.4 0 0 0 12 4.4Z"
        stroke="#FF4D4D"
        strokeWidth="1.8"
        strokeLinejoin="round"
      />
      <path d="M10 18.8h4M10.6 20.6h2.8" stroke="#FF4D4D" strokeWidth="1.8" strokeLinecap="round" />
    </svg>
  );
}

const guideKeys = ["manual1", "manual2", "manual3", "manual4"] as const;

export function ManualModal() {
  const open = useUiStore((state) => state.manualOpen);
  const close = useUiStore((state) => state.closeManual);
  const t = useT();

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          className="absolute inset-0 z-40 bg-[#FF4D4D]"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <button
            type="button"
            className="absolute inset-0"
            aria-label={t("close")}
            onClick={close}
          />
          <motion.div
            className="absolute inset-x-0 bottom-0 top-[52px] overflow-hidden rounded-t-[28px] bg-white"
            initial={{ y: 40 }}
            animate={{ y: 0 }}
            exit={{ y: 40 }}
            onClick={(event) => event.stopPropagation()}
          >
            <div className="phone-scroll h-full overflow-y-auto px-[22px] pb-[36px] pt-[18px]">
              <div className="relative mb-[22px] flex items-center justify-center">
                <h2 className="text-[20px] font-extrabold">{t("manual")}</h2>
                <button
                  type="button"
                  onClick={close}
                  className="absolute right-0 grid h-[32px] w-[32px] place-items-center rounded-full bg-[#FF4D4D] text-[18px] font-bold text-white"
                  aria-label={t("close")}
                >
                  ×
                </button>
              </div>

              <ul className="flex flex-col gap-[22px]">
                {[HeadphonesIcon, NoteIcon, BookIcon, BulbIcon].map((Icon, index) => (
                  <li key={guideKeys[index]} className="flex items-start gap-[14px]">
                    <span className="grid h-[48px] w-[48px] shrink-0 place-items-center rounded-full bg-[#EFEFEF]">
                      <Icon />
                    </span>
                    <p className="pt-[6px] text-[14px] leading-[1.7] tracking-[-0.02em] text-[#222]">
                      {t(guideKeys[index])}
                    </p>
                  </li>
                ))}
              </ul>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

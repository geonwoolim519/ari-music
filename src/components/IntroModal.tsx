import { AnimatePresence, motion } from "framer-motion";
import { Logo } from "./Icons";
import { useUiStore } from "../store/uiStore";
import { useT } from "../store/localeStore";

export function IntroModal() {
  const open = useUiStore((state) => state.introOpen);
  const close = useUiStore((state) => state.closeIntro);
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
              <div className="relative mb-[18px] flex items-center justify-center">
                <h2 className="text-[20px] font-extrabold">{t("intro")}</h2>
                <button
                  type="button"
                  onClick={close}
                  className="absolute right-0 grid h-[32px] w-[32px] place-items-center rounded-full bg-[#FF4D4D] text-[18px] font-bold text-white"
                  aria-label={t("close")}
                >
                  ×
                </button>
              </div>

              <div className="mb-[18px] flex justify-center">
                <Logo size={72} />
              </div>

              <p className="text-[14px] leading-[1.7] text-[#222]">
                {t("introP1")}
              </p>
              <p className="mt-[14px] text-[14px] leading-[1.7] text-[#222]">
                {t("introP2")}
              </p>

              <p className="my-[22px] text-center text-[16px] font-bold leading-[1.55] text-[#2aa7c4]">
                “{t("introQuote1")}
                <br />
                {t("introQuote2")}”
              </p>

              <div className="rounded-[18px] bg-[#F2F2F2] px-[18px] py-[16px]">
                <h3 className="mb-[10px] text-center text-[16px] font-extrabold text-[#FF4D4D]">
                  {t("introFeatures")}
                </h3>
                <ul className="space-y-[8px] text-[13px] leading-[1.55] text-[#222]">
                  <li className="flex gap-[8px]">
                    <span className="mt-[7px] h-[6px] w-[6px] shrink-0 rounded-full bg-[#ff7a3d]" />
                    <span>{t("introFeatureStudio")}</span>
                  </li>
                  <li className="flex gap-[8px]">
                    <span className="mt-[7px] h-[6px] w-[6px] shrink-0 rounded-full bg-[#ff7a3d]" />
                    <span>{t("introFeatureAlbum")}</span>
                  </li>
                </ul>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

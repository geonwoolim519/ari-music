import { AnimatePresence, motion } from "framer-motion";
import { Logo } from "./Icons";
import { useUiStore } from "../store/uiStore";

export function IntroModal() {
  const open = useUiStore((state) => state.introOpen);
  const close = useUiStore((state) => state.closeIntro);

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
            aria-label="닫기"
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
                <h2 className="text-[20px] font-extrabold">아리뮤직 소개</h2>
                <button
                  type="button"
                  onClick={close}
                  className="absolute right-0 grid h-[32px] w-[32px] place-items-center rounded-full bg-[#FF4D4D] text-[18px] font-bold text-white"
                  aria-label="닫기"
                >
                  ×
                </button>
              </div>

              <div className="mb-[18px] flex justify-center">
                <Logo size={72} />
              </div>

              <p className="text-[14px] leading-[1.7] text-[#222]">
                서양의 고급 식당에서는 메인디시 전에 아뮤즈부쉬(Amuse-bouche: 입이
                즐거운), 즉 맛있는 한입거리를 내놓는다. ‘아리뮤직’은 음악계의
                아뮤즈부쉬 - 아리랑을 대중들이 가볍게 즐길 수 있는 서비스이다.
              </p>
              <p className="mt-[14px] text-[14px] leading-[1.7] text-[#222]">
                음파의 진동에서 영감을 얻은 아이콘에서 위로 솟아오른 두 봉우리는
                한국의 산을, 아래로 들어간 봉우리는 한국의 강을, 수평선은 한국의
                평야를 의미한다. 아리랑이 노동요였기 때문에 논밭에서 일하는
                사람들의 모습이 연상되며, 음파는 한국 민중의 바이브를 의미한다.
              </p>

              <p className="my-[22px] text-center text-[16px] font-bold leading-[1.55] text-[#2aa7c4]">
                “여러 아리랑을 들으며
                <br />
                서로 다른 아리랑의 매력을 느껴보세요”
              </p>

              <div className="rounded-[18px] bg-[#F2F2F2] px-[18px] py-[16px]">
                <h3 className="mb-[10px] text-center text-[16px] font-extrabold text-[#FF4D4D]">
                  주요 기능
                </h3>
                <ul className="space-y-[8px] text-[13px] leading-[1.55] text-[#222]">
                  <li className="flex gap-[8px]">
                    <span className="mt-[7px] h-[6px] w-[6px] shrink-0 rounded-full bg-[#ff7a3d]" />
                    <span>
                      아리랑 스튜디오 - 여러 국악기 소리와 장단으로 직접 아리랑
                      음원을 제작
                    </span>
                  </li>
                  <li className="flex gap-[8px]">
                    <span className="mt-[7px] h-[6px] w-[6px] shrink-0 rounded-full bg-[#ff7a3d]" />
                    <span>아리랑 앨범 - 큐레이터가 기획한 지역별 아리랑 컬렉션</span>
                  </li>
                  <li className="flex gap-[8px]">
                    <span className="mt-[7px] h-[6px] w-[6px] shrink-0 rounded-full bg-[#ff7a3d]" />
                    <span>아리랑 동영상 아카이브 - 공연 자료 시청</span>
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

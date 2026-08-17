import { useNavigate } from "react-router-dom";
import { albums } from "../data/albums";
import { archiveVideos } from "../data/archive";
import { useDragScroll } from "../hooks/useDragScroll";
import { usePlayerStore } from "../store/playerStore";
import { useUiStore } from "../store/uiStore";
import { AppHeader } from "../components/AppHeader";
import { MusicNotesIcon, SectionChevron } from "../components/Icons";

const archivePages = Array.from(
  { length: Math.ceil(archiveVideos.length / 2) },
  (_, index) => archiveVideos.slice(index * 2, index * 2 + 2),
);

function YoutubePlayBadge() {
  return (
    <span className="pointer-events-none absolute inset-0 grid place-items-center">
      <svg width="42" height="30" viewBox="0 0 68 48" aria-hidden>
        <path
          d="M66.52 7.74a8.1 8.1 0 0 0-5.7-5.7C55.79.13 34 0 34 0S12.21.13 6.9 1.55a8.1 8.1 0 0 0-5.42 6.19C.06 13.05 0 24 0 24s.06 10.95 1.48 16.26a8.1 8.1 0 0 0 5.42 6.19C12.21 47.87 34 48 34 48s21.79-.13 27.1-1.55a8.1 8.1 0 0 0 5.42-6.19C67.94 34.95 68 24 68 24s-.06-10.95-1.48-16.26Z"
          fill="#FF0000"
        />
        <path d="M45 24 27 14v20Z" fill="#fff" />
      </svg>
    </span>
  );
}

export function HomePage() {
  const navigate = useNavigate();
  const openIntro = useUiStore((state) => state.openIntro);
  const openHistory = useUiStore((state) => state.openHistory);
  const openArchiveVideo = useUiStore((state) => state.openArchiveVideo);
  const albumScrollRef = useDragScroll<HTMLDivElement>();
  const archiveScrollRef = useDragScroll<HTMLDivElement>({ pageSnap: true });

  return (
    <div className="flex h-full flex-col bg-white">
      <AppHeader />
      <div className="phone-scroll flex-1 overflow-y-auto px-[18px] pb-[160px] pt-[10px]">
        <div className="flex flex-col gap-[12px]">
          <button
            type="button"
            onClick={() => navigate("/studio")}
            className="flex h-[62px] items-center justify-between rounded-[31px] px-[22px] text-left shadow-[0_8px_18px_rgba(0,0,0,0.12)]"
            style={{
              background:
                "linear-gradient(90deg, #2af0ff 0%, #c8ff2e 42%, #ffe14a 100%)",
            }}
          >
            <span className="text-[18px] font-extrabold tracking-[-0.03em] text-black">
              아리랑 스튜디오
            </span>
            <MusicNotesIcon size={30} />
          </button>

          <button
            type="button"
            onClick={openIntro}
            className="flex h-[52px] items-center rounded-[26px] px-[22px] text-left shadow-[0_8px_18px_rgba(0,0,0,0.12)]"
            style={{
              background: "linear-gradient(90deg, #cb6fe5 0%, #c86de2 100%)",
            }}
          >
            <span className="text-[17px] font-extrabold tracking-[-0.03em] text-black">
              아리뮤직 소개
            </span>
          </button>

          <button
            type="button"
            onClick={openHistory}
            className="flex h-[52px] items-center rounded-[26px] px-[22px] text-left shadow-[0_8px_18px_rgba(0,0,0,0.12)]"
            style={{
              background: "linear-gradient(90deg, #e1aaf0 0%, #deadeb 100%)",
            }}
          >
            <span className="text-[17px] font-extrabold tracking-[-0.03em] text-black">
              아리랑의 역사
            </span>
          </button>
        </div>

        <section className="mt-[28px]">
          <button
            type="button"
            className="mb-[14px] flex items-center gap-[4px]"
            onClick={() => navigate("/library")}
          >
            <h2 className="text-[20px] font-extrabold tracking-[-0.04em] text-black">
              다양한 아리랑 앨범
            </h2>
            <span className="text-[#8a8a8a]">
              <SectionChevron size={22} />
            </span>
          </button>

          <div
            ref={albumScrollRef}
            className="drag-scroll phone-scroll -mx-[18px] flex gap-[12px] overflow-x-auto px-[18px] pb-[2px] snap-x snap-mandatory touch-pan-x"
          >
            {albums.map((album) => (
              <button
                key={album.id}
                type="button"
                className="w-[108px] shrink-0 snap-start text-center"
                onClick={() => navigate(`/album/${album.id}`)}
              >
                <img
                  src={album.cover}
                  alt={album.name}
                  className="aspect-square w-full rounded-[18px] object-cover"
                />
                <span className="mt-[8px] block text-[13px] font-semibold tracking-[-0.02em] text-black">
                  {album.name}
                </span>
              </button>
            ))}
          </div>
        </section>

        <section className="mt-[26px]">
          <div className="mb-[14px] flex items-center gap-[4px]">
            <h2 className="text-[20px] font-extrabold tracking-[-0.04em] text-black">
              공연 아카이브
            </h2>
            <span className="text-[#8a8a8a]">
              <SectionChevron size={22} />
            </span>
          </div>

          <div
            ref={archiveScrollRef}
            className="drag-scroll phone-scroll -mx-[18px] flex snap-x snap-mandatory overflow-x-auto touch-pan-y"
          >
            {archivePages.map((page, pageIndex) => (
              <div
                key={pageIndex}
                className="grid shrink-0 snap-start grid-cols-2 gap-[10px] px-[18px]"
                style={{ flex: "0 0 100%" }}
              >
                {page.map((video) => (
                  <button
                    key={video.id}
                    type="button"
                    className="relative overflow-hidden rounded-[12px]"
                    onClick={() => {
                      usePlayerStore.setState({ isPlaying: false });
                      openArchiveVideo(video.id);
                    }}
                  >
                    <img
                      src={video.thumbnail}
                      alt={video.title}
                      className="aspect-video w-full object-cover"
                    />
                    {video.overlayPlay ? <YoutubePlayBadge /> : null}
                  </button>
                ))}
              </div>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}

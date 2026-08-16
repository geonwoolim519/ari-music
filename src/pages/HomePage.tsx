import { useNavigate } from "react-router-dom";
import { albums } from "../data/albums";
import { useUiStore } from "../store/uiStore";
import { AppHeader } from "../components/AppHeader";
import { MusicNotesIcon } from "../components/Icons";

export function HomePage() {
  const navigate = useNavigate();
  const openIntro = useUiStore((state) => state.openIntro);
  const openHistory = useUiStore((state) => state.openHistory);

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
            <span className="text-[20px] font-medium text-black">›</span>
          </button>

          <div className="grid grid-cols-3 gap-x-[12px] gap-y-[18px]">
            {albums.map((album) => (
              <button
                key={album.id}
                type="button"
                className="text-center"
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
      </div>
    </div>
  );
}

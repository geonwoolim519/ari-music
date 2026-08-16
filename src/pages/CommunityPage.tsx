import { useNavigate } from "react-router-dom";
import { CommunityIcon } from "../components/Icons";
import { DashedRule, ProfileBadge } from "../components/LibraryChrome";
import { boards } from "../data/boards";

export function CommunityPage() {
  const navigate = useNavigate();

  return (
    <div className="flex h-full flex-col bg-white">
      <header className="flex items-center justify-between px-[22px] pt-[16px] pb-[4px]">
        <h1 className="text-[34px] font-extrabold tracking-[-0.06em] text-black">
          게시판
        </h1>
        <ProfileBadge />
      </header>

      <div className="px-[22px] pb-[160px] pt-[18px]">
        <ul>
          {boards.map((board) => (
            <li key={board.id}>
              <button
                type="button"
                className="flex w-full items-center gap-[12px] py-[16px] text-left"
                onClick={() => navigate(`/community/${board.id}`)}
              >
                <CommunityIcon size={24} />
                <span className="text-[17px] font-semibold text-black">
                  {board.name}
                </span>
              </button>
              <DashedRule />
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

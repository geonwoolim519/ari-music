import { Link, useParams } from "react-router-dom";
import { getBoard, type BoardId } from "../data/boards";
import { useCommunityStore } from "../store/communityStore";

function PencilIcon() {
  return (
    <svg width="26" height="26" viewBox="0 0 24 24" fill="none" aria-hidden>
      <g
        transform="rotate(-45 12 12)"
        stroke="white"
        strokeWidth="1.55"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M9 3.2h6v13.2L12 21.2 9 16.4V3.2Z" />
        <path d="M9 6.4h6" />
        <path d="M9 7.7h6" />
        <path d="M9 16.4h6" />
        <path d="M11 7.9v8.3" />
        <path d="M13 7.9v8.3" />
        <path d="M10.7 18.5h2.6" />
      </g>
    </svg>
  );
}

export function BoardPage() {
  const { boardId } = useParams();
  const board = getBoard(boardId);
  const allPosts = useCommunityStore((state) => state.posts);
  const posts = allPosts.filter((post) => post.boardId === boardId);
  const openWrite = useCommunityStore((state) => state.openWrite);

  if (!board) {
    return (
      <div className="flex h-full flex-col bg-white px-[22px] pt-[calc(var(--sat)+20px)]">
        <p>게시판을 찾을 수 없습니다.</p>
        <Link to="/community" className="mt-[12px] text-[#FF4D4D]">
          게시판으로
        </Link>
      </div>
    );
  }

  return (
    <div className="relative flex h-full flex-col bg-white">
      <header className="px-[22px] pt-[calc(var(--sat)+16px)]">
        <h1 className="text-[28px] font-extrabold leading-[1.25] tracking-[-0.05em] text-black">
          {board.name}
        </h1>
      </header>

      <div className="phone-scroll flex-1 overflow-y-auto px-[18px] pb-[170px] pt-[18px]">
        <ul className="flex flex-col gap-[14px]">
          {posts.map((post) => (
            <li
              key={post.id}
              className="rounded-[4px] border border-[#d0d0d0] px-[14px] py-[12px]"
            >
              <p className="text-[15px] font-extrabold text-black">{post.title}</p>
              <p className="mt-[8px] text-[13px] leading-[1.55] text-[#222]">
                {post.body}
              </p>
            </li>
          ))}
        </ul>
      </div>

      <button
        type="button"
        aria-label="글쓰기"
        onClick={() => openWrite(board.id as BoardId)}
        className="absolute right-[20px] bottom-[150px] grid h-[56px] w-[56px] place-items-center rounded-full bg-[#FF4D4D] shadow-[0_8px_18px_rgba(255,77,77,0.35)]"
      >
        <PencilIcon />
      </button>
    </div>
  );
}

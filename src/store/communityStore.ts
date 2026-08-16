import { create } from "zustand";
import type { BoardId, BoardPost } from "../data/boards";

type CommunityState = {
  posts: BoardPost[];
  writeOpen: boolean;
  writeBoardId: BoardId | null;
  openWrite: (boardId: BoardId) => void;
  closeWrite: () => void;
  addPost: (title: string, body: string) => void;
};

const albumPosts: BoardPost[] = [
  {
    id: "album-1",
    boardId: "album",
    title: "밀양아리랑은 처음 들어보는데...",
    body: "“날 좀 보소”라는 가사가 밀양아리랑에만 있는 특징인 것 처음 알았어요. 특히 웅산님이 부르신 버전을 들어보는데 기존에 제가 알던 아리랑과는 사뭇 다르네요.",
  },
  {
    id: "album-2",
    boardId: "album",
    title: "오늘부로 아리랑에 입덕합니다",
    body: "요즘 아리뮤직이 핫하다길래 어떻게 아리랑용 음원앱이 나오지 싶었는데 계속 듣다보니 우리 아리랑을 요즘 사람들이 잘 모르는 게 아쉬울 정도로 좋은 노래가 많네요.",
  },
  {
    id: "album-3",
    boardId: "album",
    title: "아리랑 야르",
    body: "개좋네 진짜",
  },
];

export const useCommunityStore = create<CommunityState>((set, get) => ({
  posts: albumPosts,
  writeOpen: false,
  writeBoardId: null,
  openWrite: (boardId) => set({ writeOpen: true, writeBoardId: boardId }),
  closeWrite: () => set({ writeOpen: false, writeBoardId: null }),
  addPost: (title, body) => {
    const boardId = get().writeBoardId;
    const trimmedTitle = title.trim();
    const trimmedBody = body.trim();
    if (!boardId || !trimmedTitle || !trimmedBody) return;
    set({
      posts: [
        {
          id: `${boardId}-${Date.now()}`,
          boardId,
          title: trimmedTitle,
          body: trimmedBody,
        },
        ...get().posts,
      ],
      writeOpen: false,
      writeBoardId: null,
    });
  },
}));

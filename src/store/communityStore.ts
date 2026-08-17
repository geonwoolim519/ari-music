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

const culturePosts: BoardPost[] = [
  {
    id: "culture-1",
    boardId: "free",
    title: "아리랑 최고",
    body: "여기 외국인분들도 많으신데, 외국인분들도 우리 국악의 아름다움을 더 잘 아셨으면 좋겠습니다. 아리뮤직이 지역관광 활성화에도 도움이 되지 않을까라는 생각이 드네요.",
  },
  {
    id: "culture-2",
    boardId: "free",
    title: "저 13년생인데 좋아하는 아이돌이 라방에서",
    body: "아리랑 부르는 거 보고 저도 아리랑 듣고 싶어서 왔어요 ^^",
  },
  {
    id: "culture-3",
    boardId: "free",
    title: "OMG Arirang",
    body: "Really nice songs",
  },
  {
    id: "culture-4",
    boardId: "free",
    title: "Am I the only one who found Seoul quite underrated?",
    body: "I went to Korea in 2022, and Seoul had so many beautiful places. I strongly recommend Changdeokgung Palace. I was surprised by how big the Han River is. It was during COVID back then, but I want to go again.",
  },
];

export const useCommunityStore = create<CommunityState>((set, get) => ({
  posts: [...albumPosts, ...culturePosts],
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

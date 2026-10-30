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

const studioPosts: BoardPost[] = [
  {
    id: "studio-1",
    boardId: "studio",
    title: "본조아리랑 반주에 맞춰 부르니까 소름",
    body: "노래방에서 가사가 한 줄씩 넘어가니까 따라 부르기가 진짜 편해요. 십리도 못 가서 발병난다 부분에서 마이크 끄고 혼자 불러봤는데 은근히 중독됩니다.",
  },
  {
    id: "studio-2",
    boardId: "studio",
    title: "일반 노래방이랑은 느낌이 완전 다르네요",
    body: "반주가 국악기 톤이라 그런지 목을 힘줘서 지르기보다 조금 낮게 깔아서 부르게 돼요. 다음엔 밀양이나 진도 버전도 나오면 좋겠어요.",
  },
];

const mixerPosts: BoardPost[] = [
  {
    id: "mixer-1",
    boardId: "mixer",
    title: "아리랑 스튜디오에서 장구 올리니까 분위기 확 바뀌네요",
    body: "거문고만 있을 때는 잔잔했는데 장구를 끌어다 놓으니까 진짜 연주하는 느낌이에요. 다들 어떤 조합으로 듣고 계세요?",
  },
  {
    id: "mixer-2",
    boardId: "mixer",
    title: "소금이랑 가야금이 제일 잘 어울리는 듯",
    body: "무대에서 연주자들이 씰룩거리는 것도 귀엽고, 소리 겹치는 맛이 있어서 자꾸 들어보게 돼요.",
  },
];

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
    body: "진짜 좋네",
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
  posts: [...studioPosts, ...mixerPosts, ...albumPosts, ...culturePosts],
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

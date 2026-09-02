export const boards = [
  { id: "studio", name: "아리랑노래방게시판" },
  { id: "album", name: "아리랑앨범게시판" },
  { id: "free", name: "한국문화게시판" },
] as const;

export type BoardId = (typeof boards)[number]["id"];

export type BoardPost = {
  id: string;
  boardId: BoardId;
  title: string;
  body: string;
};

export function getBoard(id: string | undefined) {
  return boards.find((board) => board.id === id);
}

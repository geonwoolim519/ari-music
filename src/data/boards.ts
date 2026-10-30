export const boards = [
  { id: "studio", name: "아리랑노래방게시판", nameKey: "boardStudio" },
  { id: "mixer", name: "아리랑스튜디오게시판", nameKey: "boardMixer" },
  { id: "album", name: "아리랑앨범게시판", nameKey: "boardAlbum" },
  { id: "free", name: "한국문화게시판", nameKey: "boardCulture" },
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

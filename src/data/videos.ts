export type ArchiveVideo = {
  id: string;
  youtubeId: string;
  title: string;
  titleEn: string;
  channel: string;
  channelEn: string;
};

export const archiveVideos: ArchiveVideo[] = [
  {
    id: "gugak-textbook",
    youtubeId: "hKFxLkcqEpI",
    title: "교과서 속 우리음악: 민요 '아리랑'",
    titleEn: "Textbook Korean music: folk song ‘Arirang’",
    channel: "국립국악원",
    channelEn: "National Gugak Center",
  },
  {
    id: "song-sohee",
    youtubeId: "H_2yhCjGQuQ",
    title: "열린음악회 · 아리랑 · 송소희",
    titleEn: "Open Concert — Arirang — Song Sohee",
    channel: "KBS Kpop",
    channelEn: "KBS Kpop",
  },
  {
    id: "regional-mix",
    youtubeId: "z7vjClodPdc",
    title: "지역별 아리랑 몰아 듣기",
    titleEn: "Regional Arirang mix",
    channel: "피치쌤",
    channelEn: "Peach Teacher",
  },
  {
    id: "four-great",
    youtubeId: "_VfDwtOAAS8",
    title: "대한민국의 4대 아리랑",
    titleEn: "Korea’s four major Arirangs",
    channel: "얼씨구TV",
    channelEn: "Eolssigu TV",
  },
];

export function getArchiveVideo(id: string | null | undefined) {
  if (!id) return undefined;
  return archiveVideos.find((video) => video.id === id);
}

export function youtubeThumb(youtubeId: string) {
  return `https://i.ytimg.com/vi/${youtubeId}/mqdefault.jpg`;
}

export function youtubeEmbedSrc(youtubeId: string) {
  const params = new URLSearchParams({
    autoplay: "1",
    playsinline: "1",
    rel: "0",
    modestbranding: "1",
    iv_load_policy: "3",
  });
  return `https://www.youtube.com/embed/${youtubeId}?${params.toString()}`;
}

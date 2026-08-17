import { asset } from "../lib/asset";

export type ArchiveVideo = {
  id: string;
  title: string;
  url: string;
  thumbnail: string;
  description: string;
  overlayPlay?: boolean;
};

export const archiveVideos: ArchiveVideo[] = [
  {
    id: "H_2yhCjGQuQ",
    title: "송소희 아리랑",
    url: "https://youtu.be/H_2yhCjGQuQ",
    thumbnail: asset("archive/songsohee.jpg"),
    description:
      "국악인 송소희는 5살 때부터 경기민요를 배우기 시작해 초등학교 5학년 때 《전국노래자랑》에서 '청춘가'를 불러 큰 화제를 모았습니다. 이후 '국악 소녀'로 이름을 알리며 대중에게 국악을 친숙하게 알리는 계기를 만들었습니다.",
  },
  {
    id: "hKFxLkcqEpI",
    title: "교과서 속 구성진 민요 아리랑",
    url: "https://youtu.be/hKFxLkcqEpI",
    thumbnail: asset("archive/hanbok.jpg"),
    description:
      "국립국악원은 우리 음악과 춤을 지키고 알리는 대한민국 대표 전통 예술 기관입니다. 신라시대부터 조선시대 장악원까지 이어진 왕실 음악 기관의 전통을 이어받아 1951년에 문을 열었습니다. 현재는 4개의 전속 예술단과 국악박물관을 통해 아름다운 우리 소리를 연구하고 멋진 공연을 선보이고 있습니다.",
  },
  {
    id: "_VfDwtOAAS8",
    title: "대한민국의 4대 아리랑",
    url: "https://youtu.be/_VfDwtOAAS8",
    thumbnail: asset("archive/four-arirang.jpg"),
    overlayPlay: true,
    description:
      "지역별로 다른 맛을 자랑하는 한국의 4대 아리랑을 모았습니다. 강송대 명창이 부르는 진도 아리랑, 정은하 명창이 부르는 밀양 아리랑, 이금미 명창이 부르는 경기 아리랑, 김길자 명창이 부르는 정선 아리랑까지!",
  },
  {
    id: "bB4UVDRQ1EY",
    title: "윤도현 아리랑 응원가",
    url: "https://youtu.be/bB4UVDRQ1EY",
    thumbnail: asset("archive/yoon-cheer.jpg"),
    overlayPlay: true,
    description:
      "뮤직비디오에는 2002년 한일월드컵부터 2018년 평창 동계올림픽까지, 온 대한민국을 열광시켰던 스포츠의 순간들을 담아냈습니다.",
  },
];

export function getArchiveVideo(id: string) {
  return archiveVideos.find((video) => video.id === id);
}

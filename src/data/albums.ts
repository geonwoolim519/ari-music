import { asset } from "../lib/asset";
import { cheerYoonLyrics, miryangUngsanLyrics } from "./lyrics";

export type AlbumId =
  | "gyeonggi"
  | "jindo"
  | "miryang"
  | "jeongseon"
  | "gangwon"
  | "hyundai";

export type Track = {
  id: string;
  title: string;
  albumId: AlbumId;
  audioUrl?: string;
  lyrics: { time: number; text: string }[];
};

export type Album = {
  id: AlbumId;
  name: string;
  cover: string;
  hero: string;
  theme: string;
  bar: string;
  description: string[];
  tracks: Track[];
};

const placeholderLyrics = [{ time: 0, text: "가사가 곧 연결됩니다." }];

export const albums: Album[] = [
  {
    id: "gyeonggi",
    name: "경기아리랑",
    cover: asset("covers/gyeonggi.jpg?v=2"),
    hero: asset("covers/gyeonggi-hero.jpg?v=1"),
    theme: "#A48D23",
    bar: "#3F3610",
    description: [
      "한민족의 희로애락을 담아낸 대표적인 민요인 경기 아리랑은 서울·경기 지역을 중심으로 전파되어 오늘날 대중적으로 가장 친숙해진 아리랑입니다.",
      "흔히 경기아리랑을 논할 때 구아리랑과 본조아리랑을 나누어 설명합니다. 구아리랑은 강원도 아라리의 유입 초기 모습이 남아있어 예스러운 멋과 묵직한 애수가 느껴집니다.",
      "본조아리랑은 나운규의 영화 <아리랑> 주제가로 쓰이면서 전 국민적인 애창곡으로 자리 잡았으며, 우리가 보통 “아리랑” 하면 떠올리는 명랑하면서도 슬픈 3박자 가락입니다.",
    ],
    tracks: [
      {
        id: "bonjo-arirang",
        title: "본조아리랑",
        albumId: "gyeonggi",
        audioUrl: asset("audio/gyeonggi/bonjo-arirang.mp3"),
        lyrics: placeholderLyrics,
      },
      {
        id: "gu-arirang",
        title: "구아리랑",
        albumId: "gyeonggi",
        audioUrl: asset("audio/gyeonggi/gu-arirang.mp3"),
        lyrics: placeholderLyrics,
      },
      {
        id: "gu-arirang-piano",
        title: "구아리랑 (Piano ver.)",
        albumId: "gyeonggi",
        audioUrl: asset("audio/gyeonggi/gu-arirang-piano.mp3"),
        lyrics: placeholderLyrics,
      },
    ],
  },
  {
    id: "jindo",
    name: "진도아리랑",
    cover: asset("covers/jindo.jpg?v=2"),
    hero: asset("covers/jindo-hero.jpg?v=1"),
    theme: "#6A87B2",
    bar: "#3A4E6E",
    description: [
      "남도 민요의 진수이자 흥과 한(恨)이 절묘하게 교차하는 진도아리랑을 담은 앨범입니다.",
      "전라도 민요의 시그니처인 ‘육자배기토리’의 선율을 가지고 있습니다. 떠는 소리, 평으로 내는 소리, 꺾는 소리는 남도 사람들의 고단한 삶의 애환을 달래주는 듯합니다.",
      "가사는 삶의 서러움, 이별의 슬픔, 고단함을 노래하지만, 곡의 전반적인 분위기는 오히려 이를 훌훌 털어버리는 신명 나고 흥겨운 유흥성을 띱니다. 슬픔을 웃음과 흥으로 승화시키는 한국인의 독특한 해학이 담겨 있습니다.",
    ],
    tracks: [
      {
        id: "jindo-arirang",
        title: "진도아리랑",
        albumId: "jindo",
        audioUrl: asset("audio/jindo/jindo-arirang.mp3"),
        lyrics: placeholderLyrics,
      },
      {
        id: "jindo-arirang-jangdan",
        title: "진도아리랑 (장단 ver.)",
        albumId: "jindo",
        audioUrl: asset("audio/jindo/jindo-arirang-jangdan.mp3"),
        lyrics: placeholderLyrics,
      },
      {
        id: "jindo-arirang-piano",
        title: "진도아리랑 (Piano ver.)",
        albumId: "jindo",
        audioUrl: asset("audio/jindo/jindo-arirang-piano.mp3"),
        lyrics: placeholderLyrics,
      },
    ],
  },
  {
    id: "miryang",
    name: "밀양아리랑",
    cover: asset("covers/miryang.jpg?v=2"),
    hero: asset("covers/miryang-hero.jpg?v=1"),
    theme: "#4C5530",
    bar: "#2A3018",
    description: [
      "세마치 장단에 맞추어 비교적 빠르며 선율이 씩씩하고 경쾌함이 매력적인 밀양아리랑은 영남지역을 대표하는 아리랑 가운데 하나입니다.",
      "빠른 리듬과 내어지르는 특성, 후렴이 앞에 위치하는 급함, 반말투의 첫 사설(날좀 보소, 날좀 보소, 날좀 보소~)등 영남지역 사람들의 기질이 드러나는 노래입니다.",
      "메나리토리(한반도 동부지역 음악에 나타나는 음악적 특징)를 바탕으로 한 선율구조를 가지고 있습니다. 라·도·레·미·솔의 5음계로 라에서 시작하여 라로 끝납니다.",
      "힘차게 뻗어나가는 가락을 통해 경상도 민요 특유의 흥을 느낄 수 있습니다.",
    ],
    tracks: [
      {
        id: "miryang-arirang",
        title: "밀양아리랑 (송소희 가창 ver.)",
        albumId: "miryang",
        audioUrl: asset("audio/miryang/miryang-arirang-songsohee.mp3"),
        lyrics: placeholderLyrics,
      },
      {
        id: "miryang-arirang-sorikkun",
        title: "밀양아리랑 (소리꾼 ver.)",
        albumId: "miryang",
        audioUrl: asset("audio/miryang/miryang-arirang-sorikkun.mp3"),
        lyrics: placeholderLyrics,
      },
      {
        id: "miryang-arirang-ungsan",
        title: "밀양아리랑 (웅산 가창 ver.)",
        albumId: "miryang",
        audioUrl: asset("audio/miryang/miryang-arirang-ungsan.mp3"),
        lyrics: miryangUngsanLyrics,
      },
    ],
  },
  {
    id: "jeongseon",
    name: "정선아리랑",
    cover: asset("covers/jeongseon.jpg?v=2"),
    hero: asset("covers/jeongseon-hero.jpg?v=1"),
    theme: "#ABA95A",
    bar: "#4A4A22",
    description: [
      "긴아리랑은 가장 느리고 길게 늘지는 소리입니다. 정선아리랑의 기본이 되는 형태로, 한 마디를 길고 구성지게 뽑아내며 깊은 그리움이나 애절한 감정을 표현합니다.",
      "엮음아리랑은 긴사설(가사)을 빠른 가락으로 촘촘히 엮어서 부르는 소리입니다. 일상생활의 온갖 사연, 재치 있는 이야기, 한탄 등을 숨도 쉴 새 없이 빠르게 쏟아내듯 부르다가 마지막에 높은 소리로 마무리합니다.",
      "뗏목아리랑은 과거 정선 아우라지에서 서울(마포)까지 뗏목을 타고 목재를 운반하던 뱃사공들이 부르던 소리입니다. 거친 물살을 헤치며 나아가던 삶의 애환과 고달픔이 녹아 있는 노동요 성격의 노래입니다.",
    ],
    tracks: [
      {
        id: "jeongseon-gin",
        title: "정선아리랑 (긴아리랑)",
        albumId: "jeongseon",
        audioUrl: asset("audio/jeongseon/jeongseon-gin.mp3"),
        lyrics: placeholderLyrics,
      },
      {
        id: "jeongseon-yeokkeum",
        title: "정선아리랑 (엮음아리랑)",
        albumId: "jeongseon",
        audioUrl: asset("audio/jeongseon/jeongseon-yeokkeum.mp3"),
        lyrics: placeholderLyrics,
      },
      {
        id: "jeongseon-ttaetmok",
        title: "정선아리랑 (뗏목아리랑)",
        albumId: "jeongseon",
        audioUrl: asset("audio/jeongseon/jeongseon-ttaetmok.mp3"),
        lyrics: placeholderLyrics,
      },
    ],
  },
  {
    id: "gangwon",
    name: "강원도아리랑",
    cover: asset("covers/gangwon.jpg?v=2"),
    hero: asset("covers/gangwon-hero.jpg?v=2"),
    theme: "#6B4A2E",
    bar: "#3D2A1C",
    description: [
      "강원도아리랑은 강원 산간 지역의 노동요·토속민요인 ‘자진아라리’에서 비롯되어, 일제강점기를 거치며 널리 불리게 된 민요입니다.",
      "강원도를 넘어 경기 동부, 충북 산간, 경북 북부까지 폭넓게 전승되고 있습니다.",
      "엇모리장단(3·2·3·2의 혼합 리듬)과 메나리토리(미·솔·라·도·레)의 음계를 바탕으로 합니다.",
      "대표 가사 ‘아주까리 동백아 피지 마라’에는 그리움과 허전함을 해학과 애잔함으로 풀어낸 정서가 담겨 있습니다.",
    ],
    tracks: [
      {
        id: "gangwon-arirang",
        title: "강원도아리랑",
        albumId: "gangwon",
        audioUrl: asset("audio/gangwon/gangwon-arirang.mp3"),
        lyrics: placeholderLyrics,
      },
      {
        id: "gangwon-arirang-jangdan",
        title: "강원도아리랑 (장단 ver.)",
        albumId: "gangwon",
        audioUrl: asset("audio/gangwon/gangwon-arirang-jangdan.mp3"),
        lyrics: placeholderLyrics,
      },
      {
        id: "gangwon-arirang-piano",
        title: "강원도아리랑 (피아노 ver.)",
        albumId: "gangwon",
        audioUrl: asset("audio/gangwon/gangwon-arirang-piano.mp3"),
        lyrics: placeholderLyrics,
      },
    ],
  },
  {
    id: "hyundai",
    name: "현대아리랑",
    cover: asset("covers/hyundai.jpg?v=4"),
    hero: asset("covers/hyundai-hero.jpg?v=4"),
    theme: "#715CB7",
    bar: "#4A3A78",
    description: [
      "한민족의 영혼이 담긴 전통 가락 ‘아리랑’이 시대와 장르의 경계를 넘어 현대적 감각으로 재탄생합니다.",
      "이번 <현대 아리랑> 앨범은 오늘날을 살아가는 우리에게 승리와 희망, 그리고 뜨거운 울림을 전하는 다채로운 현대적 편곡 트랙들로 구성되어 있습니다.",
      "‘아리랑 응원가 (국민 ver.)’은 국가대표 경기나 대규모 길거리 응원전에서 전 국민이 한목소리로 목놓아 부르던 뜨거운 에너지의 응원가입니다.",
      "‘아리랑 응원가 (윤도현 가창 ver.)’은 대한민국을 대표하는 록 밴드 YB의 보컬 윤도현 특유의 시원하고 파워풀한 음색이 돋보이는 트랙입니다.",
    ],
    tracks: [
      {
        id: "cheer-national",
        title: "아리랑 응원가 (국민 ver.)",
        albumId: "hyundai",
        audioUrl: asset("audio/hyundai/cheer-national.mp3"),
        lyrics: placeholderLyrics,
      },
      {
        id: "cheer-yoon",
        title: "아리랑 응원가 (윤도현 가창 ver.)",
        albumId: "hyundai",
        audioUrl: asset("audio/hyundai/cheer-yoon.mp3"),
        lyrics: cheerYoonLyrics,
      },
      {
        id: "cheer-gayageum",
        title: "아리랑 응원가 (가야금 ver.)",
        albumId: "hyundai",
        audioUrl: asset("audio/hyundai/cheer-gayageum.mp3"),
        lyrics: placeholderLyrics,
      },
    ],
  },
];

export function getAlbum(id: AlbumId) {
  return albums.find((album) => album.id === id);
}

export function getTrack(trackId: string) {
  for (const album of albums) {
    const track = album.tracks.find((item) => item.id === trackId);
    if (track) return { track, album };
  }
  return undefined;
}

/** 타임스탬프.txt 기준 곡 길이(초) */
export const TRACK_DURATION: Record<string, number> = {
  "bonjo-arirang": 51,
  "gu-arirang": 87,
  "gu-arirang-piano": 97,
  "jindo-arirang": 92,
  "jindo-arirang-jangdan": 92,
  "jindo-arirang-piano": 95,
  "miryang-arirang": 300,
  "miryang-arirang-sorikkun": 139,
  "miryang-arirang-ungsan": 227,
  "jeongseon-gin": 354,
  "jeongseon-yeokkeum": 445,
  "jeongseon-ttaetmok": 785,
  "gangwon-arirang": 72,
  "gangwon-arirang-jangdan": 87,
  "gangwon-arirang-piano": 76,
  "cheer-national": 200,
  "cheer-yoon": 201,
  "cheer-gayageum": 202,
};

export function getTrackDuration(track: Track) {
  return TRACK_DURATION[track.id] ?? 0;
}

export const defaultTrack = albums[0].tracks[2];

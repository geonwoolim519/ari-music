import { asset } from "../lib/asset";

export const mapCategories = ["보존", "전시", "축제", "관광"] as const;

export type MapCategory = (typeof mapCategories)[number];

export type CulturePlace = {
  id: string;
  name: string;
  description: string;
  url: string;
  category: MapCategory;
  linkLabel: "지도 보기" | "사이트 보기";
  thumbnail?: string;
};

export type CultureIntro = {
  title: string;
  paragraphs: string[];
  image: string;
};

export type CultureCity = {
  id: string;
  name: string;
  nameEn: string;
  color: string;
  x: string;
  y: string;
  labelX: string;
  labelY: string;
  featured: boolean;
  labelSide?: "left" | "right";
  albumCover: string;
  places: CulturePlace[];
  intro?: CultureIntro;
};

export const cultureCities: CultureCity[] = [
  {
    id: "jeongseon",
    name: "정선",
    nameEn: "Jeongseon",
    color: "#2FA24F",
    x: "67.1%",
    y: "55.1%",
    labelX: "75.1%",
    labelY: "54.1%",
    featured: true,
    labelSide: "right",
    albumCover: asset("covers/jeongseon.jpg?v=2"),
    places: [
      {
        id: "arari-village",
        name: "아라리촌",
        description:
          "조선시대 강원도 정선의 마을 모습을 재현하여 직접 둘러보고 경험해 볼 수 있는 체험형 전시장입니다. 시장 가운데 놀이마당이 있어 토속적인 분위기와 함께 아리랑 공연을 즐길 수 있습니다.",
        url: "https://maps.app.goo.gl/AioQysNbRTZUWW878",
        category: "관광",
        linkLabel: "지도 보기",
        thumbnail: asset("culture/jeongseon/arari-village.jpg?v=3"),
      },
      {
        id: "auraji",
        name: "아우라지",
        description:
          "강원도 정선군 여량면에 위치한 아우라지는 평창의 송천과 삼척의 골지천이 만나 어우러지는 곳으로, 대한민국 대표 민요인 정선아리랑(정선아라리)의 애정편과 뱃사공 가락이 탄생한 유서 깊은 발상지입니다.",
        url: "https://maps.app.goo.gl/EYTmVH2fj2Vyg95C9",
        category: "관광",
        linkLabel: "지도 보기",
        thumbnail: asset("culture/jeongseon/auraji.jpg?v=3"),
      },
      {
        id: "arirang-festival",
        name: "정선아리랑제",
        description:
          "매년 9월~10월에 개최되는, 아리랑 중 국내 최초로 무형문화재(강원도 무형문화재 제1호)로 지정된 정선아리랑의 가치를 지키기 위해 시작된 유서 깊은 축제입니다. 1976년부터 시작됐습니다.",
        url: "https://arirangfestival.kr/",
        category: "축제",
        linkLabel: "지도 보기",
        thumbnail: asset("culture/jeongseon/arirang-festival.jpg?v=3"),
      },
      {
        id: "arirang-museum",
        name: "아리랑박물관",
        description:
          "아리랑의 역사와 가치를 보존·전시하는 국내 유일의 아리랑 전문 박물관입니다. 2016년에 개관하였으며, 아리랑과 관련된 5천여 점의 다양한 자료를 수집·연구하고 있습니다.",
        url: "https://maps.app.goo.gl/718dcBMLYgAEbfPx8",
        category: "보존",
        linkLabel: "지도 보기",
        thumbnail: asset("culture/jeongseon/arirang-museum.jpg?v=3"),
      },
      {
        id: "jacf",
        name: "정선아리랑문화재단",
        description:
          "정선아리랑의 전승·보존과 창조적 계승을 위해 2008년 9월 1일에 설립된 재단법인입니다. 아리랑 센터와 정선군립아리랑예술단을 운영하며, 정선아리랑제를 주관합니다.",
        url: "https://www.jacf.or.kr/jacf/index.php",
        category: "보존",
        linkLabel: "사이트 보기",
        thumbnail: asset("culture/jeongseon/jacf.jpg?v=3"),
      },
    ],
  },
  {
    id: "miryang",
    name: "밀양",
    nameEn: "Miryang",
    color: "#3B6FDB",
    x: "67.1%",
    y: "71.1%",
    labelX: "74.1%",
    labelY: "71.1%",
    featured: true,
    labelSide: "right",
    albumCover: asset("covers/miryang.jpg?v=2"),
    places: [
      {
        id: "art-center",
        name: "밀양아리랑아트센터",
        description:
          "2016년에 개관하여 지역 주민의 문화 향유와 예술 활동을 지원하며, 대공연장, 소공연장, 밀양아리랑 전수·전시관 등을 갖추고 다양한 공연과 전시를 운영하고 있습니다.",
        url: "https://maps.app.goo.gl/y81fL621m5NMpsM5A",
        category: "전시",
        linkLabel: "지도 보기",
        thumbnail: asset("culture/miryang/art-center.jpg?v=1"),
      },
      {
        id: "aranggak",
        name: "아랑각",
        description:
          "밀양 부사의 딸 '아랑'이 정절을 지키다 살해당한 억울한 죽음을 마을 사람들이 추모하며 부른 노래가 밀양아리랑의 기원이 되었습니다. 영남루 아래 위치한 아랑각은 아랑의 영정을 모신 사당입니다.",
        url: "https://maps.app.goo.gl/apeUdKbRVhzr2xam9",
        category: "관광",
        linkLabel: "지도 보기",
        thumbnail: asset("culture/miryang/aranggak.jpg?v=1"),
      },
      {
        id: "yeongnamnu",
        name: "영남루",
        description:
          "조선시대 후기 대표적인 목조 건축물이자 밀양아리랑의 역사적 배경이 되는 곳으로, 영남루 아래 아랑각에서 아랑의 영정을 모시고 매년 축제를 엽니다.",
        url: "https://maps.app.goo.gl/N5MHpBECTr5S4C8S6",
        category: "관광",
        linkLabel: "지도 보기",
        thumbnail: asset("culture/miryang/yeongnamnu.jpg?v=1"),
      },
      {
        id: "festival",
        name: "밀양아리랑축제",
        description:
          "1957년에 시작되어 매년 5월 경상남도 밀양시 영남루 및 밀양강변 일원에서 개최됩니다. 밀양의 3대 정신인 충의(사명대사), 지덕(점필재 김종직), 정순(아랑낭자)을 기리는 불씨 채화 의식을 시작으로 화려한 막을 올립니다.",
        url: "https://www.arirang.or.kr/",
        category: "축제",
        linkLabel: "사이트 보기",
        thumbnail: asset("culture/miryang/festival.jpg?v=1"),
      },
    ],
  },
  {
    id: "jindo",
    name: "진도",
    nameEn: "Jindo",
    color: "#7B4BC4",
    x: "32.1%",
    y: "81.6%",
    labelX: "25.1%",
    labelY: "82.1%",
    featured: true,
    labelSide: "left",
    albumCover: asset("covers/jindo.jpg?v=2"),
    places: [
      {
        id: "village",
        name: "진도아리랑마을관광지",
        description:
          "우리 민족의 한과 얼이 서린 진도아리랑과 전국 팔도의 아리랑을 보고 듣고 체험할 수 있는 문화 공간입니다. 귀성포구 바다가 내려다보이는 아름다운 풍경 속에 자리 잡고 있습니다.",
        url: "https://maps.app.goo.gl/LZiiFwEes3iQf5856",
        category: "관광",
        linkLabel: "지도 보기",
        thumbnail: asset("culture/jindo/village.jpg?v=1"),
      },
      {
        id: "namdo-gugak",
        name: "국립남도국악원",
        description:
          "판소리, 강강술래, 진도아리랑 등 풍부한 민속문화 자원을 보유한 ‘보배섬’ 진도에서 남도 전통문화 예술을 계승하고 발전시키는 남도 예술의 산실입니다.",
        url: "https://maps.app.goo.gl/5q1qtQE8EW26vEqn7",
        category: "보존",
        linkLabel: "지도 보기",
        thumbnail: asset("culture/jindo/namdo-gugak.jpg?v=1"),
      },
      {
        id: "folk-center",
        name: "진도향토문화회관",
        description:
          "진도의 전통 민속예술을 보존하고 선보이는 진도 문화 예술의 중심 공간입니다. 진도읍 중심부에 자리하여 접근성이 좋으며, 주민과 관광객이 남도 소리의 정수를 함께 즐기는 복합 문화 시설입니다.",
        url: "https://maps.app.goo.gl/dJtWe83dZ4jfULv69",
        category: "전시",
        linkLabel: "지도 보기",
        thumbnail: asset("culture/jindo/folk-center.jpg?v=1"),
      },
      {
        id: "sea-road",
        name: "진도신비의바닷길축제",
        description:
          "전남 진도군 고군면 회동리와 의신면 모도리 사이 약 2km의 바다가 조수간만의 차로 갈라지는 현상을 기념하는 축제입니다. 축제 기간에는 진도아리랑, 강강술래, 진도씻김굿 등 무형문화유산 공연이 이루어집니다.",
        url: "https://maps.app.goo.gl/kZdyd7Doj3vLEbp3A",
        category: "축제",
        linkLabel: "지도 보기",
        thumbnail: asset("culture/jindo/sea-road.jpg?v=1"),
      },
    ],
  },
  {
    id: "tongcheon",
    name: "통천",
    nameEn: "Tongcheon",
    color: "#E53935",
    x: "53.1%",
    y: "40.1%",
    labelX: "59.1%",
    labelY: "40.1%",
    featured: false,
    labelSide: "right",
    albumCover: "",
    places: [],
    intro: {
      title: "통천아리랑이란?",
      paragraphs: [
        "통천아리랑은 강원도 북부 지역의 정서를 담아 금강산 등을 언급하며, 후렴에서 ‘아리랑 고개 고개로 나를 넘겨 나 주소’와 같이 단어를 반복하여 흥을 돋우는 특징이 있습니다. 또한, 높은 음에서 아래로 내려오는 하행형 선율로 독특한 애조를 띠며, 북한에서는 이를 배합관현악으로도 편곡하여 연주합니다.",
        "“아리랑 아리 아리랑 아라리로구나 / 아리 아리랑 고개 고개로 나를 넘겨나 주소”",
        "“강원도라 금강산 일만이천봉 팔만구암자 / 대대 불공들여 아들딸 나달라고 / 산제 불공을 말고 야밤 삼경에 오신 손님을 괄세두나 말아”",
      ],
      image: asset("culture/tongcheon/square.jpg?v=1"),
    },
  },
  {
    id: "haeju",
    name: "해주",
    nameEn: "Haeju",
    color: "#E53935",
    x: "25.1%",
    y: "49.1%",
    labelX: "20.1%",
    labelY: "48.1%",
    featured: false,
    labelSide: "left",
    albumCover: "",
    places: [],
    intro: {
      title: "해주아리랑이란?",
      paragraphs: [
        "해주아리랑은 그 이름 때문에 황해도 해주 지역에서 불리던 아리랑으로 추정되어 왔으나, 음악적 요소에서 서도소리의 특성이 나타나지 않아 실제 해주에서 생성되고 전승되었는지 확신하기 어렵습니다. 이 곡은 <본조아리랑>이 크게 유행한 이후, 그 영향을 받아 생겨난 여러 아리랑 중 한 곡입니다.",
        "중국 동포가 부른 해주아리랑은 <본조아리랑>과 거의 같은 선율을 지니고 있으며, 남한의 해주아리랑은 <밀양아리랑>과 닮아 있습니다. 또한 서도소리의 음조직이 아닌 경기소리의 음조직으로 불립니다. 아울러 황해도 민요 중에는 이 곡과 유사한 곡이 존재하지 않습니다.",
      ],
      image: asset("culture/haeju/pavilion.jpg?v=1"),
    },
  },
  {
    id: "mungyeong",
    name: "문경",
    nameEn: "Mungyeong",
    color: "#E53935",
    x: "57.1%",
    y: "61.1%",
    labelX: "63.3%",
    labelY: "61.3%",
    featured: false,
    labelSide: "right",
    albumCover: "",
    places: [],
    intro: {
      title: "문경아리랑이란?",
      paragraphs: [
        "“문경새재야 물박달나무 / 홍두깨 방망이로 다 나간다”라는 노랫말이 특징이며, 조선 말기 경복궁 중수 공사를 위해 문경 지역의 좋은 박달나무 등을 베어 바치던 힘겨운 세파와 백성들의 한을 담고 있습니다.",
        "1896년 미국의 선교사 헐버트(H. B. Hulbert)가 서양식 악보로 채록한 최초의 아리랑 노랫말 중에 문경새재 관련 내용이 등장하여 아리랑의 역사 연구에서 중요한 위치를 차지합니다.",
      ],
      image: asset("culture/mungyeong/saejae.jpg?v=1"),
    },
  },
  {
    id: "gongju",
    name: "공주",
    nameEn: "Gongju",
    color: "#E53935",
    x: "44.1%",
    y: "65.1%",
    labelX: "39.1%",
    labelY: "66.1%",
    featured: false,
    labelSide: "left",
    albumCover: "",
    places: [],
    intro: {
      title: "공주아리랑이란?",
      paragraphs: [
        "충청남도 공주 지역에서 전승되어 온 토속 민요로, 백제의 옛 역사와 금강의 물결, 그리고 충청도 사람들의 소박하고 유장한 심성이 담겨 있는 소중한 문화유산입니다.",
        "“아리랑 아리랑” 외에도 지역적 특색이 담긴 “아령 아령 아라리야” 같은 독특한 후렴구가 함께 불립니다.",
        "억세지 않고 소박하며, 높고 낮음이 비교적 잔잔하면서도 깊은 정취(유장미)를 지니고 있습니다.",
        "긴소리, 엮음소리, 잦은소리 등 다채로운 형태의 사설로 불립니다.",
      ],
      image: asset("culture/gongju/gongsanseong.jpg?v=1"),
    },
  },
];

export function getCultureCity(id: string) {
  return cultureCities.find((city) => city.id === id);
}

export function cityName(city: CultureCity, locale: "ko" | "en") {
  return locale === "en" ? city.nameEn : city.name;
}

export const cultureCityIds = ["jeongseon", "miryang", "jindo"] as const;
export const cultureIntroIds = ["mungyeong", "haeju", "tongcheon", "gongju"] as const;

export type CultureCityId = (typeof cultureCityIds)[number];
export type CultureIntroId = (typeof cultureIntroIds)[number];

export function isCultureCityId(id: string): id is CultureCityId {
  return (cultureCityIds as readonly string[]).includes(id);
}

export function isCultureIntroId(id: string): id is CultureIntroId {
  return (cultureIntroIds as readonly string[]).includes(id);
}

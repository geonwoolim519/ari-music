export type JangdanLesson = {
  id: string;
  name: string;
  nameEn: string;
  meter: string;
  meterEn: string;
  text: string;
  textEn: string;
};

export const jangdanLessons: JangdanLesson[] = [
  {
    id: "semachi",
    name: "세마치장단",
    nameEn: "Semachi",
    meter: "3박",
    meterEn: "triple meter",
    text: "세 박이 한 호흡으로 이어지는 장단입니다. 밀양아리랑처럼 씩씩하고 경쾌한 노래에 자주 쓰입니다.",
    textEn: "Three beats in one breath. It often carries bright songs like Miryang Arirang.",
  },
  {
    id: "jungmori",
    name: "중모리장단",
    nameEn: "Jungmori",
    meter: "12박",
    meterEn: "12 beats",
    text: "보통 빠르기의 열두 박입니다. 이야기를 풀어 가듯 고르게 걸어 가는 장단이라 가사를 익히기에도 좋습니다.",
    textEn: "A moderate twelve-beat cycle. It walks evenly, which makes it a good partner for learning lyrics.",
  },
  {
    id: "jajinmori",
    name: "자진모리장단",
    nameEn: "Jajinmori",
    meter: "빠른 12박",
    meterEn: "fast 12 beats",
    text: "중모리보다 빠르게 몰아치는 열두 박입니다. 흥이 오를 때 장단이 앞으로 달려 갑니다.",
    textEn: "A quicker twelve-beat cycle than jungmori. The pulse runs forward when the mood lifts.",
  },
  {
    id: "gutgeori",
    name: "굿거리장단",
    nameEn: "Gutgeori",
    meter: "4+4박",
    meterEn: "4+4 beats",
    text: "두 덩어리로 나뉘는 흥겨운 장단입니다. 굿과 잔치의 신명이 남아 있어, 몸을 살짝 흔들며 익히기 좋습니다.",
    textEn: "A festive cycle in two groups of four. It still carries the lift of ritual and celebration.",
  },
  {
    id: "eonmori",
    name: "엇모리장단",
    nameEn: "Eonmori",
    meter: "3+2+3+2박",
    meterEn: "3+2+3+2 beats",
    text: "3과 2가 엇갈리며 걷는 혼합 장단입니다. 강원도아리랑처럼 산간의 숨결이 담긴 노래에서 만날 수 있습니다.",
    textEn: "A mixed pulse of 3 and 2. You can hear it in highland songs such as Gangwondo Arirang.",
  },
];

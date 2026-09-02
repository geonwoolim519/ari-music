import { asset } from "../lib/asset";

export type KaraokeLine = {
  start: number;
  end: number;
  ko: string;
  ro: string;
};

export const bonjoKaraoke = {
  id: "bonjo-arirang",
  title: "본조아리랑",
  titleEn: "Bonjo Arirang",
  audioUrl: asset("audio/karaoke/bonjo-arirang.mp3"),
  lines: [
    { start: 3, end: 9, ko: "아리랑 아리랑 아라리요", ro: "Arirang arirang arariyo" },
    { start: 9, end: 15, ko: "아리랑 고개로 넘어간다", ro: "Arirang gogaero neomeoganda" },
    { start: 15, end: 21, ko: "나를 버리고 가시는 임은", ro: "Nareul beorigo gasineun imeun" },
    { start: 21, end: 27, ko: "십리도 못 가서 발병난다", ro: "Simnido mot gaseo balbyeongnanda" },
    { start: 27, end: 33, ko: "아리랑 아리랑 아라리요", ro: "Arirang arirang arariyo" },
    { start: 33, end: 39, ko: "아리랑 고개로 넘어간다", ro: "Arirang gogaero neomeoganda" },
    { start: 39, end: 45, ko: "나를 버리고 가시는 임은", ro: "Nareul beorigo gasineun imeun" },
    { start: 45, end: 51, ko: "십리도 못 가서 발병난다", ro: "Simnido mot gaseo balbyeongnanda" },
  ] satisfies KaraokeLine[],
};

function stretch(start: number, end: number, midis: number[]) {
  const step = (end - start) / midis.length;
  return midis.map((midi, index) => ({
    start: start + index * step,
    end: start + (index + 1) * step,
    midi,
  }));
}

const refrain = [67, 69, 67, 64, 62, 64, 67, 69, 67, 64];
const pass = [67, 69, 67, 64, 62, 64, 67, 69, 71, 69];
const verseA = [64, 67, 69, 67, 64, 62, 64, 67, 69, 67];
const verseB = [67, 69, 71, 69, 67, 64, 62, 64, 62, 62];

export const bonjoMelody = [
  ...stretch(3, 9, refrain),
  ...stretch(9, 15, pass),
  ...stretch(15, 21, verseA),
  ...stretch(21, 27, verseB),
  ...stretch(27, 33, refrain),
  ...stretch(33, 39, pass),
  ...stretch(39, 45, verseA),
  ...stretch(45, 51, verseB),
];

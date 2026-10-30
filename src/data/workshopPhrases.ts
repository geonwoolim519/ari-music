export type WorkshopPhrase = {
  id: string;
  region: string;
  regionEn: string;
  ko: string;
  en: string;
};

export const workshopPhrases: WorkshopPhrase[] = [
  { id: "b1", region: "본조", regionEn: "Bonjo", ko: "아리랑 아리랑 아라리요", en: "Arirang arirang arariyo" },
  { id: "b2", region: "본조", regionEn: "Bonjo", ko: "아리랑 고개로 넘어간다", en: "Crossing over Arirang Pass" },
  { id: "b3", region: "본조", regionEn: "Bonjo", ko: "나를 버리고 가시는 임은", en: "The one who leaves me behind" },
  { id: "b4", region: "본조", regionEn: "Bonjo", ko: "십리도 못 가서 발병난다", en: "Won’t go ten ri before the feet ache" },
  { id: "b5", region: "본조", regionEn: "Bonjo", ko: "청천하늘엔 잔별도 많고", en: "The blue sky is full of little stars" },
  { id: "b6", region: "본조", regionEn: "Bonjo", ko: "우리네 가슴엔 희망도 많다", en: "And our hearts are full of hope" },
  { id: "b7", region: "본조", regionEn: "Bonjo", ko: "저기 저 산이 백두산이라지", en: "They say that mountain is Baekdusan" },
  { id: "b8", region: "본조", regionEn: "Bonjo", ko: "동지섣달에도 꽃만 핀다", en: "Even in midwinter, only flowers bloom" },
  { id: "b9", region: "본조", regionEn: "Bonjo", ko: "바람이 분다고 꽃이 지랴", en: "Will the flower fall just because the wind blows" },
  { id: "b10", region: "본조", regionEn: "Bonjo", ko: "임이 가신다고 정이 지랴", en: "Will love fade just because you leave" },
  { id: "b11", region: "본조", regionEn: "Bonjo", ko: "산도 첩첩 물도 첩첩", en: "Mountains fold on mountains, waters fold on waters" },
  { id: "b12", region: "본조", regionEn: "Bonjo", ko: "고개도 많다만은 넘어를 가자", en: "Though the passes are many, let us cross them" },

  { id: "m1", region: "밀양", regionEn: "Miryang", ko: "날 좀 보소 날 좀 보소", en: "Look at me, look at me" },
  { id: "m2", region: "밀양", regionEn: "Miryang", ko: "동지섣달 꽃 본 듯이 날 좀 보소", en: "Look at me as if seeing a flower in midwinter" },
  { id: "m3", region: "밀양", regionEn: "Miryang", ko: "아리랑 쓰리랑 아라리가 났네", en: "Arirang seurirang, arari has come" },
  { id: "m4", region: "밀양", regionEn: "Miryang", ko: "아리아리랑 쓰리쓰리랑 아라리가 났네", en: "Ariarirang seuriseurirang, arari has come" },
  { id: "m5", region: "밀양", regionEn: "Miryang", ko: "아리랑 고개로 날 넘겨주소", en: "See me over Arirang Pass" },
  { id: "m6", region: "밀양", regionEn: "Miryang", ko: "다 틀렸네 다 틀렸네", en: "It’s all gone wrong, all gone wrong" },
  { id: "m7", region: "밀양", regionEn: "Miryang", ko: "가마타고 시집가긴 다 글렀네", en: "A palanquin wedding is all out of reach" },
  { id: "m8", region: "밀양", regionEn: "Miryang", ko: "정든 임 보내고 돌아설 적에", en: "When I turn away after sending my love" },
  { id: "m9", region: "밀양", regionEn: "Miryang", ko: "눈물도 하염없이 흘러 내리네", en: "Tears fall without end" },
  { id: "m10", region: "밀양", regionEn: "Miryang", ko: "정든 님이 오시는데 인사를 할까", en: "My love is coming — shall I greet them" },
  { id: "m11", region: "밀양", regionEn: "Miryang", ko: "모르는 체하고 지나갈까", en: "Or pass by as if I do not know" },
  { id: "m12", region: "밀양", regionEn: "Miryang", ko: "머리도 아리고 가슴도 아려", en: "My head aches and my heart aches too" },
  { id: "m13", region: "밀양", regionEn: "Miryang", ko: "밀양 영남루에 달빛이 밝아", en: "Moonlight is bright on Miryang’s Yeongnamnu" },

  { id: "j1", region: "진도", regionEn: "Jindo", ko: "아리 아리랑 쓰리 쓰리랑 아라리가 났네", en: "Ari arirang seuri seurirang, arari has come" },
  { id: "j2", region: "진도", regionEn: "Jindo", ko: "아리랑 응응응 아라리가 났네", en: "Arirang eung-eung-eung, arari has come" },
  { id: "j3", region: "진도", regionEn: "Jindo", ko: "문경새재 박달나무", en: "Birch of Mungyeong Saejae" },
  { id: "j4", region: "진도", regionEn: "Jindo", ko: "홍두깨 방망이로 다 만들었다", en: "All made into laundry paddles" },
  { id: "j5", region: "진도", regionEn: "Jindo", ko: "임을 그린 상사 꿈이라도", en: "Even a dream of the one I miss" },
  { id: "j6", region: "진도", regionEn: "Jindo", ko: "한 번만 더 꾸었으면 좋겠네", en: "I wish I could dream it once more" },
  { id: "j7", region: "진도", regionEn: "Jindo", ko: "이 몸 두고 가신 님은", en: "The one who left this body behind" },
  { id: "j8", region: "진도", regionEn: "Jindo", ko: "어디에 가서 나를 잊으리", en: "Where will you go to forget me" },
  { id: "j9", region: "진도", regionEn: "Jindo", ko: "바람아 불어라 물결아 쳐라", en: "Blow, wind, and rise, waves" },
  { id: "j10", region: "진도", regionEn: "Jindo", ko: "임 실은 배가 잘 가게", en: "So the boat that carries my love may go well" },
  { id: "j11", region: "진도", regionEn: "Jindo", ko: "앞강물 뒷강물 흐르는 물은", en: "The waters flowing ahead and behind" },
  { id: "j12", region: "진도", regionEn: "Jindo", ko: "임을 싣고 가는 배인가", en: "Are they boats carrying my love away" },

  { id: "s1", region: "정선", regionEn: "Jeongseon", ko: "아우라지 뱃사공아 배 좀 건너주게", en: "Boatman of Auraji, ferry me across" },
  { id: "s2", region: "정선", regionEn: "Jeongseon", ko: "싸리골 올동백이 다 떨어진다", en: "The camellias of Ssari valley are all falling" },
  { id: "s3", region: "정선", regionEn: "Jeongseon", ko: "떨어진 동백은 낙엽에 덮이고", en: "Fallen camellias are covered by leaves" },
  { id: "s4", region: "정선", regionEn: "Jeongseon", ko: "묻힌 줄 알면 님이라도 찾아오리", en: "If they knew I was buried, even my love would come" },
  { id: "s5", region: "정선", regionEn: "Jeongseon", ko: "정선 아우라지 황새여울에", en: "At Hwangsae rapids of Jeongseon Auraji" },
  { id: "s6", region: "정선", regionEn: "Jeongseon", ko: "올동백 꽃 피면 큰 애기 시름", en: "When camellias bloom, the eldest daughter’s sorrow" },
  { id: "s7", region: "정선", regionEn: "Jeongseon", ko: "아리랑 아리랑 아라리요", en: "Arirang arirang arariyo" },
  { id: "s8", region: "정선", regionEn: "Jeongseon", ko: "아리랑 고개로 날 넘겨주소", en: "See me over Arirang Pass" },
  { id: "s9", region: "정선", regionEn: "Jeongseon", ko: "정선읍내 물레방아", en: "The mill wheel in Jeongseon town" },
  { id: "s10", region: "정선", regionEn: "Jeongseon", ko: "떠나는 임아 언제나 오려나", en: "Leaving love, when will you return" },

  { id: "g1", region: "강원", regionEn: "Gangwon", ko: "아주까리 동백아 피지 마라", en: "Castor and camellia, do not bloom" },
  { id: "g2", region: "강원", regionEn: "Gangwon", ko: "아주까리 동백 피면 동백 새 운다", en: "If they bloom, the camellia bird will cry" },
  { id: "g3", region: "강원", regionEn: "Gangwon", ko: "아주까리 동백 피면 우리 사랑 들킬라", en: "If they bloom, our love will be found out" },
  { id: "g4", region: "강원", regionEn: "Gangwon", ko: "한 많은 설움도 풀어 버리고", en: "Let go of the old sorrow too" },
  { id: "g5", region: "강원", regionEn: "Gangwon", ko: "한 많은 이 세상 어디메로 가야", en: "Where in this world of grief should I go" },
  { id: "g6", region: "강원", regionEn: "Gangwon", ko: "아리랑 고개로 넘어를 가세", en: "Let us cross over Arirang Pass" },
  { id: "g7", region: "강원", regionEn: "Gangwon", ko: "강원도 아리랑 잘도 넘어간다", en: "Gangwon Arirang crosses the pass so well" },
  { id: "g8", region: "강원", regionEn: "Gangwon", ko: "한숨아 한숨아 가슴에 맺힌 한숨아", en: "Sigh, O sigh, the sigh knotted in my chest" },

  { id: "n1", region: "문경", regionEn: "Mungyeong", ko: "문경새재는 웬 고갠가", en: "What kind of pass is Mungyeong Saejae" },
  { id: "n2", region: "문경", regionEn: "Mungyeong", ko: "구부야 구부구부가 눈물이로구나", en: "Every bend of it is tears" },
  { id: "n3", region: "문경", regionEn: "Mungyeong", ko: "문경새재야 물박달나무", en: "Mungyeong Saejae, water birch" },
  { id: "n4", region: "문경", regionEn: "Mungyeong", ko: "홍두깨 방망이로 다 나간다", en: "All going out as laundry paddles" },

  { id: "t1", region: "통천", regionEn: "Tongcheon", ko: "아리랑 아리 아리랑 아라리로구나", en: "Arirang ari arirang, it is arari" },
  { id: "t2", region: "통천", regionEn: "Tongcheon", ko: "아리 아리랑 고개 고개로 나를 넘겨나 주소", en: "Ari arirang, see me over each pass" },
  { id: "t3", region: "통천", regionEn: "Tongcheon", ko: "강원도라 금강산 일만이천봉", en: "Gangwon’s Geumgangsan, twelve thousand peaks" },

  { id: "p1", region: "공주", regionEn: "Gongju", ko: "아령 아령 아라리야", en: "Aryeong aryeong arariya" },
];

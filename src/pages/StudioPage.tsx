import { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useT } from "../store/localeStore";

type StudioTab = "jangdan" | "gugak" | "melody" | "fx";

type StudioSound = {
  id: string;
  name: string;
  tab: StudioTab;
  hue: string;
};

const TABS: { id: StudioTab; labelKey: "tabJangdan" | "tabGugak" | "tabMelody" | "tabFx" }[] = [
  { id: "jangdan", labelKey: "tabJangdan" },
  { id: "gugak", labelKey: "tabGugak" },
  { id: "melody", labelKey: "tabMelody" },
  { id: "fx", labelKey: "tabFx" },
];

const SOUNDS: StudioSound[] = [
  { id: "janggu", name: "장구", tab: "jangdan", hue: "#E8A05A" },
  { id: "buk", name: "북", tab: "jangdan", hue: "#C46B4A" },
  { id: "kkwaeng", name: "꽹과리", tab: "jangdan", hue: "#D4C15A" },
  { id: "jing", name: "징", tab: "jangdan", hue: "#B7C4D4" },
  { id: "gayageum", name: "가야금", tab: "gugak", hue: "#C9A06A" },
  { id: "haegeum", name: "해금", tab: "gugak", hue: "#7E9ECF" },
  { id: "daegeum", name: "대금", tab: "gugak", hue: "#6AAF8A" },
  { id: "piri", name: "피리", tab: "gugak", hue: "#8E7CC3" },
  { id: "arirang-line", name: "아리랑", tab: "melody", hue: "#E07A7A" },
  { id: "menari", name: "메나리", tab: "melody", hue: "#6BB3B0" },
  { id: "yukjabaegi", name: "육자배기", tab: "melody", hue: "#D9894A" },
  { id: "birds", name: "새소리", tab: "fx", hue: "#8FBF6A" },
  { id: "wind", name: "바람", tab: "fx", hue: "#9AB4D9" },
  { id: "water", name: "물소리", tab: "fx", hue: "#5AA8C4" },
  { id: "clap", name: "손뼉", tab: "fx", hue: "#E0B060" },
];

const SLOT_COUNT = 6;

function Performer({
  sound,
  onClear,
}: {
  sound: StudioSound | null;
  onClear: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onClear}
      disabled={!sound}
      className="flex flex-1 flex-col items-center gap-[8px] disabled:opacity-100"
      aria-label={sound ? `${sound.name} 빼기` : "빈 자리"}
    >
      <span
        className={`relative grid h-[54px] w-[54px] place-items-center rounded-full ${
          sound ? "studio-bob" : ""
        }`}
        style={{
          background: sound ? sound.hue : "#2A3348",
          boxShadow: sound ? `0 8px 16px ${sound.hue}44` : "none",
        }}
      >
        <svg width="34" height="34" viewBox="0 0 34 34" aria-hidden>
          <circle cx="17" cy="14" r="9.2" fill="#F6EFE2" />
          <circle cx="14" cy="13.2" r="1.15" fill="#1B2233" />
          <circle cx="20" cy="13.2" r="1.15" fill="#1B2233" />
          <path
            d="M14.2 17.4c.9 1.4 4.7 1.4 5.6 0"
            stroke="#1B2233"
            strokeWidth="1.2"
            strokeLinecap="round"
            fill="none"
          />
        </svg>
      </span>
      <span
        className={`grid h-[28px] w-[28px] place-items-center rounded-full text-[15px] ${
          sound ? "text-[#1B2233]" : "border border-dashed border-white/30 text-white/45"
        }`}
        style={{ background: sound ? "#F6EFE2" : "transparent" }}
      >
        {sound ? "♪" : "+"}
      </span>
      <span className="h-[16px] text-[10px] text-white/80">
        {sound?.name ?? ""}
      </span>
    </button>
  );
}

export function StudioPage() {
  const navigate = useNavigate();
  const t = useT();
  const [tab, setTab] = useState<StudioTab>("gugak");
  const [slots, setSlots] = useState<(string | null)[]>(
    Array.from({ length: SLOT_COUNT }, () => null),
  );

  const filled = slots.filter(Boolean).length;
  const visible = useMemo(() => SOUNDS.filter((item) => item.tab === tab), [tab]);
  const picked = new Set(slots.filter(Boolean));

  const assign = (id: string) => {
    setSlots((current) => {
      if (current.includes(id)) {
        return current.map((slot) => (slot === id ? null : slot));
      }
      const empty = current.findIndex((slot) => slot == null);
      if (empty < 0) return current;
      const next = [...current];
      next[empty] = id;
      return next;
    });
  };

  return (
    <div className="flex h-full flex-col bg-[#1B2233] text-white">
      <header className="relative flex h-[52px] shrink-0 items-center justify-center px-[12px]">
        <button
          type="button"
          className="absolute left-[10px] grid h-[36px] w-[36px] place-items-center text-white/70"
          aria-label={t("back")}
          onClick={() => navigate("/")}
        >
          <svg width="18" height="18" viewBox="0 0 16 16" fill="none" aria-hidden>
            <path
              d="M10.5 3.2 5.2 8 10.5 12.8"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </button>
        <h1 className="text-[17px] font-extrabold tracking-[-0.03em]">{t("studioTitle")}</h1>
      </header>

      <div className="phone-scroll flex min-h-0 flex-1 flex-col overflow-y-auto px-[16px] pb-[150px]">
        <div className="flex items-center justify-between text-[12px] text-white/65">
          <span>{t("studioCount", { n: filled, max: SLOT_COUNT })}</span>
          <button
            type="button"
            className="text-[12px] font-semibold text-white/80"
            onClick={() => setSlots(Array.from({ length: SLOT_COUNT }, () => null))}
          >
            {t("clearStudio")}
          </button>
        </div>

        <div className="mt-[18px] rounded-[24px] bg-white/[0.05] px-[8px] py-[16px]">
          <div className="flex items-start justify-between gap-[2px]">
            {slots.map((id, index) => (
              <Performer
                key={index}
                sound={SOUNDS.find((item) => item.id === id) ?? null}
                onClear={() =>
                  setSlots((current) => current.map((slot, i) => (i === index ? null : slot)))
                }
              />
            ))}
          </div>
          <p className="mt-[10px] text-center text-[12px] leading-[1.55] text-white/55">
            {t("studioHint1")}
            <br />
            {t("studioHint2")}
          </p>
        </div>

        <div className="mt-[18px] flex gap-[4px] border-b border-white/10">
          {TABS.map((item) => (
            <button
              key={item.id}
              type="button"
              onClick={() => setTab(item.id)}
              className={`flex-1 pb-[10px] text-[13px] font-semibold ${
                tab === item.id
                  ? "border-b-2 border-[#E8A05A] text-white"
                  : "border-b-2 border-transparent text-white/45"
              }`}
            >
                {t(item.labelKey)}
            </button>
          ))}
        </div>

        <div className="mt-[14px] grid grid-cols-4 gap-[10px]">
          {visible.map((sound) => {
            const on = picked.has(sound.id);
            return (
              <button
                key={sound.id}
                type="button"
                onClick={() => assign(sound.id)}
                className={`flex flex-col items-center gap-[8px] rounded-[18px] px-[6px] py-[12px] ${
                  on ? "bg-white/14 ring-1 ring-[#E8A05A]" : "bg-white/[0.06]"
                }`}
              >
                <span
                  className="grid h-[44px] w-[44px] place-items-center rounded-full text-[15px] font-extrabold text-[#1B2233]"
                  style={{ background: sound.hue }}
                >
                  {sound.name.slice(0, 1)}
                </span>
                <span className="text-[11px] font-medium tracking-[-0.02em]">
                  {sound.name}
                </span>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}

import { useEffect, useMemo, useRef, useState, type PointerEvent, type ReactNode } from "react";
import { useNavigate } from "react-router-dom";
import { useIncrediboxMixer } from "../hooks/useIncrediboxMixer";
import { asset } from "../lib/asset";
import { useLocaleStore, useT } from "../store/localeStore";
import { usePlayerStore } from "../store/playerStore";

type StudioTab = "gugak" | "fusion";

type StudioSound = {
  id: string;
  name: string;
  nameEn: string;
  tab: StudioTab;
  icon: "geomungo" | "sogeum" | "haegeum" | "gayageum" | "janggu" | "piri" | "piano" | "flute";
};

const PERFORMERS = [1, 2, 3, 4, 5, 6] as const;
const SLOT_COUNT = PERFORMERS.length;

const SOUNDS: StudioSound[] = [
  { id: "geomungo", name: "거문고", nameEn: "Geomungo", tab: "gugak", icon: "geomungo" },
  { id: "sogeum", name: "소금", nameEn: "Sogeum", tab: "gugak", icon: "sogeum" },
  { id: "haegeum", name: "해금", nameEn: "Haegeum", tab: "gugak", icon: "haegeum" },
  { id: "gayageum", name: "가야금", nameEn: "Gayageum", tab: "gugak", icon: "gayageum" },
  { id: "janggu", name: "장구", nameEn: "Janggu", tab: "gugak", icon: "janggu" },
  { id: "piri", name: "피리", nameEn: "Piri", tab: "gugak", icon: "piri" },
  { id: "piano", name: "피아노", nameEn: "Piano", tab: "fusion", icon: "piano" },
  { id: "flute", name: "플룻트", nameEn: "Flute", tab: "fusion", icon: "flute" },
];

function Icon({ type }: { type: StudioSound["icon"] }) {
  const common = {
    width: 34,
    height: 34,
    viewBox: "0 0 48 48",
    fill: "none",
    stroke: "#8a5a28",
    strokeWidth: 1.7,
    strokeLinecap: "round" as const,
    strokeLinejoin: "round" as const,
    "aria-hidden": true,
  };
  const paths: Record<StudioSound["icon"], ReactNode> = {
    geomungo: (
      <>
        <rect x="7" y="15" width="34" height="18" rx="5" />
        <path d="M11 20.5h26M11 24h26M11 27.5h26" />
      </>
    ),
    sogeum: (
      <>
        <path d="M9 35 35 11" />
        <circle cx="37" cy="9" r="2.4" />
        <path d="M16 28h3.2M21 23.5h3.2M26 19h3.2" />
      </>
    ),
    haegeum: (
      <>
        <circle cx="18" cy="31" r="8" />
        <path d="M18 23V10M14 12h8" />
        <path d="M26 14 38 8M28 18h10" />
      </>
    ),
    gayageum: (
      <>
        <path d="M8 32c9-16 23-16 32 0" />
        <path d="M12 30c7-11 17-11 24 0" />
        <path d="M16 28c5-7 11-7 16 0" />
      </>
    ),
    janggu: (
      <>
        <ellipse cx="24" cy="24" rx="15" ry="8.5" />
        <path d="M11 24c2 7 7 11 13 11s11-4 13-11" />
        <path d="M17 19.5 31 28.5M31 19.5 17 28.5" />
      </>
    ),
    piri: (
      <>
        <path d="M14 35 34 11" />
        <path d="M18 30h3M23 24.5h3M28 19h3" />
        <circle cx="36" cy="9" r="2.2" />
      </>
    ),
    piano: (
      <>
        <rect x="7" y="14" width="34" height="20" rx="2.5" />
        <path d="M7 26h34" />
        <path d="M13.8 14v12M20.6 14v12M27.4 14v12M34.2 14v12" />
        <path d="M16.5 14v8.5M23.3 14v8.5M30.1 14v8.5" strokeWidth="3.2" />
      </>
    ),
    flute: (
      <>
        <path d="M6 28h31" />
        <rect x="37" y="25.2" width="5" height="5.6" rx="1.4" />
        <circle cx="14" cy="28" r="1.3" fill="#8a5a28" stroke="none" />
        <circle cx="20" cy="28" r="1.3" fill="#8a5a28" stroke="none" />
        <circle cx="26" cy="28" r="1.3" fill="#8a5a28" stroke="none" />
        <circle cx="32" cy="28" r="1.3" fill="#8a5a28" stroke="none" />
      </>
    ),
  };
  return <svg {...common}>{paths[type]}</svg>;
}

function wiggleClass(id: string) {
  if (id === "janggu") {
    return "studio-wiggle studio-wiggle-drum";
  }
  if (["sogeum", "piri", "haegeum", "flute"].includes(id)) {
    return "studio-wiggle studio-wiggle-wind";
  }
  return "studio-wiggle studio-wiggle-string";
}

function slotIndexAt(x: number, y: number) {
  const node = document.elementFromPoint(x, y);
  const slot = node instanceof Element ? node.closest("[data-ibx-slot]") : null;
  if (!slot) return null;
  const index = Number(slot.getAttribute("data-ibx-slot"));
  return Number.isInteger(index) ? index : null;
}

export function IncrediboxPage() {
  const navigate = useNavigate();
  const t = useT();
  const pausePlayer = usePlayerStore((state) => state.pausePlayback);
  const [tab, setTab] = useState<StudioTab>("gugak");
  const [volume, setVolume] = useState(75);
  const [slots, setSlots] = useState<(string | null)[]>(
    Array.from({ length: SLOT_COUNT }, () => null),
  );
  const [drag, setDrag] = useState<{ id: string; x: number; y: number } | null>(null);
  const [overSlot, setOverSlot] = useState<number | null>(null);
  const originRef = useRef<{ id: string; x: number; y: number } | null>(null);
  const skipClickRef = useRef(false);
  const draggingRef = useRef(false);

  const filled = slots.filter(Boolean).length;
  const visible = useMemo(() => SOUNDS.filter((item) => item.tab === tab), [tab]);
  const picked = new Set(slots.filter(Boolean));
  const locale = useLocaleStore((state) => state.locale);
  const localeIsEn = locale === "en";
  const playingIds = useMemo(
    () => slots.filter((id): id is string => Boolean(id)),
    [slots],
  );
  const { arm } = useIncrediboxMixer(playingIds, volume);

  useEffect(() => {
    pausePlayer();
  }, [pausePlayer]);

  const assignToSlot = (id: string, index: number) => {
    setSlots((current) => {
      const next = current.map((slot) => (slot === id ? null : slot));
      next[index] = id;
      return next;
    });
  };

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

  const onCardPointerDown = (event: PointerEvent<HTMLButtonElement>, id: string) => {
    skipClickRef.current = false;
    draggingRef.current = false;
    originRef.current = { id, x: event.clientX, y: event.clientY };
    event.currentTarget.setPointerCapture(event.pointerId);
    void arm();
  };

  const onCardPointerMove = (event: PointerEvent<HTMLButtonElement>) => {
    const origin = originRef.current;
    if (!origin) return;
    const dx = event.clientX - origin.x;
    const dy = event.clientY - origin.y;
    if (!draggingRef.current && dx * dx + dy * dy < 64) return;
    draggingRef.current = true;
    skipClickRef.current = true;
    setDrag({ id: origin.id, x: event.clientX, y: event.clientY });
    setOverSlot(slotIndexAt(event.clientX, event.clientY));
  };

  const onCardPointerUp = (event: PointerEvent<HTMLButtonElement>) => {
    const origin = originRef.current;
    const wasDragging = draggingRef.current;
    originRef.current = null;
    draggingRef.current = false;
    if (event.currentTarget.hasPointerCapture(event.pointerId)) {
      event.currentTarget.releasePointerCapture(event.pointerId);
    }
    if (wasDragging && origin) {
      const index = slotIndexAt(event.clientX, event.clientY);
      if (index != null) assignToSlot(origin.id, index);
    }
    setDrag(null);
    setOverSlot(null);
  };

  const soundById = (id: string | null) => SOUNDS.find((item) => item.id === id) ?? null;
  const labelOf = (sound: StudioSound) => (localeIsEn ? sound.nameEn : sound.name);
  const dragSound = drag ? soundById(drag.id) : null;

  return (
    <div className="ibx-page flex h-full w-full min-w-0 max-w-full flex-col overflow-x-hidden text-[#2a2118]">
      <header className="relative flex h-[calc(46px+var(--sat))] shrink-0 items-center justify-center px-[12px] pt-[var(--sat)]">
        <button
          type="button"
          className="absolute left-[8px] grid h-[36px] w-[36px] place-items-center text-[#8a6a4a]"
          aria-label={t("back")}
          onClick={() => navigate("/playground")}
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
        <h1 className="gugak-serif text-[16px] font-bold tracking-[-0.02em]">
          {t("incrediboxTitle")}
        </h1>
      </header>

      <div className="flex min-h-0 min-w-0 w-full flex-1 flex-col px-[10px] pb-[max(12px,env(safe-area-inset-bottom))]">
        <section className="relative flex min-h-0 min-w-0 w-full flex-[1.05] flex-col overflow-hidden rounded-[20px] border border-[#c4a574]/55 shadow-[0_10px_24px_rgba(60,40,20,0.22)]">
          <img
            src={asset("incredibox/stage.jpg")}
            alt=""
            className="absolute inset-0 h-full w-full object-cover object-[50%_62%]"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#1a120c]/90 via-[#1a120c]/20 to-[#1a120c]/45" />

          <div className="relative z-[1] flex h-full min-h-0 min-w-0 w-full flex-col px-[8px] pb-[8px] pt-[8px]">
            <div className="relative z-[3] flex items-center justify-between px-[2px] text-[10px] font-semibold text-[#f3e6c8]">
              <span className="tracking-[-0.02em]">
                ✦ {t("incrediboxPlayers", { n: filled, max: SLOT_COUNT })}
              </span>
              <button
                type="button"
                className="text-[#f3e6c8]/90"
                onClick={() => setSlots(Array.from({ length: SLOT_COUNT }, () => null))}
              >
                {t("incrediboxReset")} ↺
              </button>
            </div>

            <div className="mt-[2px] flex min-h-0 min-w-0 w-full flex-1 flex-col justify-end gap-[6px]">
              {([PERFORMERS.slice(0, 3), PERFORMERS.slice(3)] as const).map((row, rowIndex) => (
                <div
                  key={rowIndex}
                  className="grid min-h-0 min-w-0 w-full flex-1 grid-cols-3 items-end gap-[8px]"
                >
                  {row.map((n) => {
                    const index = n - 1;
                    const sound = soundById(slots[index]);
                    return (
                      <div
                        key={n}
                        data-ibx-slot={index}
                        onDragOver={(event) => {
                          event.preventDefault();
                          setOverSlot(index);
                        }}
                        onDrop={(event) => {
                          event.preventDefault();
                          const id = event.dataTransfer.getData("text/plain");
                          if (id) assignToSlot(id, index);
                          setOverSlot(null);
                        }}
                        onDragLeave={() => {
                          setOverSlot((current) => (current === index ? null : current));
                        }}
                        className={`flex h-full min-w-0 w-full flex-col ${
                          overSlot === index ? "drop-target" : ""
                        }`}
                      >
                        <div className="relative min-h-0 w-full flex-1 overflow-hidden">
                          <img
                            src={asset(`incredibox/p${n}.png`)}
                            alt=""
                            className={`pointer-events-none absolute inset-x-0 bottom-0 h-full w-full object-contain object-bottom ${
                              sound ? wiggleClass(sound.id) : ""
                            }`}
                          />
                        </div>
                        <button
                          type="button"
                          onClick={() =>
                            setSlots((current) =>
                              current.map((slot, i) => (i === index ? null : slot)),
                            )
                          }
                          className={`relative z-[2] flex h-[44px] w-full shrink-0 flex-col items-center justify-center rounded-[10px] border bg-[#1a140f]/82 px-[2px] shadow-[inset_0_0_0_1px_rgba(80,55,30,0.45)] ${
                            overSlot === index
                              ? "border-[#f3e6c8] shadow-[0_0_0_2px_#d4b07a]"
                              : "border-[#d4b07a]/70"
                          }`}
                          aria-label={sound ? labelOf(sound) : t("incrediboxEmpty")}
                        >
                          {sound ? (
                            <span className="gugak-serif text-center text-[10px] font-bold leading-tight text-[#f3e6c8]">
                              {labelOf(sound)}
                            </span>
                          ) : (
                            <>
                              <span className="text-[15px] leading-none text-[#d4b07a]">+</span>
                              <span className="mt-[2px] px-[2px] text-center text-[8px] leading-[1.15] text-[#d4b07a]/95">
                                {t("incrediboxEmpty")}
                              </span>
                            </>
                          )}
                        </button>
                      </div>
                    );
                  })}
                </div>
              ))}
            </div>

            <p className="mt-[6px] px-[8px] text-center text-[9px] leading-[1.45] text-[#f3e6c8]/78">
              {t("incrediboxHint")}
            </p>
          </div>
        </section>

        <div className="mt-[10px] flex items-center gap-[6px]">
          <button
            type="button"
            onClick={() => setTab("gugak")}
            className={`rounded-full px-[11px] py-[6px] text-[12px] font-bold ${
              tab === "gugak" ? "bg-[#5c3a24] text-[#f3e6c8]" : "bg-transparent text-[#8a6a4a]"
            }`}
          >
            {t("tabGugakTradition")}
            <span className="ml-[3px] text-[10px] font-medium opacity-70">
              ({t("tabGugakSub")})
            </span>
          </button>
          <button
            type="button"
            onClick={() => setTab("fusion")}
            className={`rounded-full px-[11px] py-[6px] text-[12px] font-bold ${
              tab === "fusion" ? "bg-[#5c3a24] text-[#f3e6c8]" : "bg-transparent text-[#8a6a4a]"
            }`}
          >
            {t("tabFusion")}
            <span className="ml-[3px] text-[10px] font-medium opacity-70">
              ({t("tabFusionSub")})
            </span>
          </button>
        </div>

        <label className="mt-[8px] flex items-center gap-[8px] text-[11px] text-[#8a6a4a]">
          <svg width="14" height="14" viewBox="0 0 16 16" fill="none" aria-hidden>
            <path d="M2.5 6.2h2.6L8.2 3.8v8.4L5.1 9.8H2.5z" stroke="currentColor" strokeWidth="1.3" />
            <path d="M10.2 6.1c.9.8.9 3 0 3.8M12.2 4.6c1.7 1.5 1.7 5.3 0 6.8" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" />
          </svg>
          <span className="shrink-0">{t("incrediboxVolume")}</span>
          <input
            type="range"
            min={0}
            max={100}
            value={volume}
            onChange={(event) => setVolume(Number(event.target.value))}
            className="ibx-range min-w-0 flex-1"
          />
          <span className="w-[28px] text-right text-[10px] font-semibold">{volume}%</span>
        </label>

        <div className="mt-[10px] grid min-w-0 w-full shrink-0 grid-cols-3 gap-[8px]">
          {visible.map((sound) => {
            const on = picked.has(sound.id);
            return (
              <button
                key={sound.id}
                type="button"
                onPointerDown={(event) => onCardPointerDown(event, sound.id)}
                onPointerMove={onCardPointerMove}
                onPointerUp={onCardPointerUp}
                onPointerCancel={onCardPointerUp}
                draggable
                onDragStart={(event) => {
                  skipClickRef.current = true;
                  event.dataTransfer.setData("text/plain", sound.id);
                  event.dataTransfer.effectAllowed = "copy";
                  void arm();
                }}
                onDragEnd={() => {
                  setOverSlot(null);
                  setDrag(null);
                }}
                onClick={() => {
                  if (skipClickRef.current) return;
                  assign(sound.id);
                }}
                className={`flex min-h-[72px] min-w-0 touch-none flex-col items-center gap-[4px] rounded-[14px] border bg-[#fbf6ea] px-[4px] py-[9px] ${
                  on
                    ? "border-[#8a3b2a] shadow-[0_0_0_1px_#8a3b2a]"
                    : "border-[#e2d3b6] shadow-[0_1px_0_rgba(255,255,255,0.8)]"
                } ${drag?.id === sound.id ? "opacity-40" : ""}`}
              >
                <Icon type={sound.icon} />
                <span className="gugak-serif text-[12px] font-bold tracking-[-0.02em]">
                  {labelOf(sound)}
                </span>
                <span className="text-[9px] text-[#b08958]">{t("incrediboxTap")}</span>
              </button>
            );
          })}
          {Array.from({ length: Math.max(0, 6 - visible.length) }, (_, i) => (
            <div
              key={`pad-${i}`}
              aria-hidden
              className="invisible flex flex-col items-center gap-[4px] rounded-[14px] border px-[4px] py-[9px]"
            >
              <span className="block h-[34px] w-[34px]" />
              <span className="gugak-serif text-[12px] font-bold tracking-[-0.02em]">가</span>
              <span className="text-[9px]">{t("incrediboxTap")}</span>
            </div>
          ))}
        </div>
      </div>

      {drag && dragSound ? (
        <div
          className="pointer-events-none fixed z-[80] flex w-[92px] flex-col items-center gap-[4px] rounded-[14px] border border-[#8a3b2a] bg-[#fbf6ea] px-[6px] py-[8px] shadow-[0_10px_24px_rgba(60,40,20,0.28)]"
          style={{ left: drag.x, top: drag.y, transform: "translate(-50%, -60%)" }}
        >
          <Icon type={dragSound.icon} />
          <span className="gugak-serif text-[11px] font-bold">{labelOf(dragSound)}</span>
        </div>
      ) : null}
    </div>
  );
}

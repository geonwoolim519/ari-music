import { asset } from "../lib/asset";

export function PlaygroundBackdrop() {
  return (
    <span className="pointer-events-none absolute inset-0 overflow-hidden bg-[#16352f]" aria-hidden>
      <svg
        viewBox="0 0 360 132"
        className="absolute inset-0 h-full w-full"
        preserveAspectRatio="xMidYMid slice"
      >
        <defs>
          <linearGradient id="pgSky" x1="0" y1="0" x2="1" y2="0.35">
            <stop offset="0%" stopColor="#102820" />
            <stop offset="42%" stopColor="#1e4a40" />
            <stop offset="72%" stopColor="#c45c32" />
            <stop offset="100%" stopColor="#f0c078" />
          </linearGradient>
          <radialGradient id="pgSun" cx="86%" cy="28%">
            <stop offset="0%" stopColor="#ffe7a8" stopOpacity="0.95" />
            <stop offset="38%" stopColor="#ff9a4a" stopOpacity="0.45" />
            <stop offset="100%" stopColor="#c45c32" stopOpacity="0" />
          </radialGradient>
          <linearGradient id="pgGround" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#2a4a3a" />
            <stop offset="100%" stopColor="#14241c" />
          </linearGradient>
        </defs>
        <rect width="360" height="132" fill="url(#pgSky)" />
        <circle cx="312" cy="38" r="78" fill="url(#pgSun)" />
        <circle cx="318" cy="34" r="16" fill="#ffe7a8" opacity="0.9" />
        <path d="M0 78c38-10 72-6 108 4 34 10 70 8 108-6 40-16 78-10 144 8v48H0Z" fill="#1a332c" />
        <path d="M0 96c48-8 96 2 148 2 52 0 92-10 212 8v26H0Z" fill="url(#pgGround)" />
        <path d="M0 78h150" stroke="#d4b07a" strokeWidth="1.1" opacity="0.35" />

        <g opacity="0.9">
          <path d="M214 18 328 46" stroke="#f3e6c8" strokeWidth="1.2" opacity="0.55" />
          <g transform="translate(236 28)">
            <path d="M0 0v10" stroke="#f3e6c8" strokeWidth="1.1" />
            <ellipse cx="0" cy="18" rx="8" ry="10" fill="#c4452b" />
            <ellipse cx="0" cy="18" rx="5.2" ry="7" fill="#e25a38" />
            <path d="M-3 8h6" stroke="#f3e6c8" strokeWidth="1" />
          </g>
          <g transform="translate(268 38)">
            <path d="M0 0v8" stroke="#f3e6c8" strokeWidth="1.1" />
            <ellipse cx="0" cy="16" rx="7" ry="9" fill="#d4a24a" />
            <ellipse cx="0" cy="16" rx="4.4" ry="6.2" fill="#f0c078" />
          </g>
          <g transform="translate(300 48)">
            <path d="M0 0v8" stroke="#f3e6c8" strokeWidth="1.1" />
            <ellipse cx="0" cy="16" rx="7.5" ry="9.5" fill="#2f6b52" />
            <ellipse cx="0" cy="16" rx="4.8" ry="6.5" fill="#4e8f6e" />
          </g>
        </g>

        <g transform="translate(292 78)" opacity="0.92">
          <rect x="-18" y="8" width="36" height="6" rx="1" fill="#5c3a24" />
          <path d="M-14 8 0-10 14 8" fill="#8a3b2a" />
          <rect x="-11" y="8" width="22" height="22" fill="#f3e6c8" opacity="0.18" />
          <path d="M-11 8h22M0 8v22" stroke="#f3e6c8" strokeWidth="1" opacity="0.45" />
        </g>

        <g transform="translate(238 92)" fill="#f3e6c8" opacity="0.88">
          <ellipse cx="0" cy="18" rx="7" ry="4" fill="#5c3a24" />
          <circle cx="0" cy="4" r="5" />
          <path d="M-6 10h12l3 16H-9Z" fill="#c4452b" />
        </g>
        <g transform="translate(262 94)" fill="#f3e6c8" opacity="0.88">
          <circle cx="0" cy="3.5" r="4.4" />
          <path d="M-5.5 9h11l2.4 16H-8Z" fill="#2a2118" />
          <ellipse cx="9" cy="18" rx="6" ry="3.2" fill="#d4a24a" />
        </g>
        <g transform="translate(286 96)">
          <rect x="-1.4" y="-8" width="2.8" height="22" rx="1" fill="#5c3a24" />
          <path d="M1 2c8 2 12 8 10 14" stroke="#8a3b2a" strokeWidth="1.6" fill="none" />
        </g>
      </svg>
      <span className="absolute inset-0 shadow-[inset_0_0_0_1.5px_rgba(240,192,120,0.35)]" />
    </span>
  );
}

export function KaraokeBackdrop() {
  return (
    <span className="pointer-events-none absolute inset-0 overflow-hidden bg-[#1a0828]" aria-hidden>
      <svg
        viewBox="0 0 360 132"
        className="absolute inset-0 h-full w-full"
        preserveAspectRatio="xMaxYMid slice"
      >
        <defs>
          <radialGradient id="karaokeGlow" cx="78%" cy="42%">
            <stop offset="0%" stopColor="#ff5a8a" stopOpacity="0.55" />
            <stop offset="42%" stopColor="#7b2cff" stopOpacity="0.28" />
            <stop offset="100%" stopColor="#1a0828" stopOpacity="0" />
          </radialGradient>
          <linearGradient id="karaokeScreen" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#2a1a4a" />
            <stop offset="100%" stopColor="#12081f" />
          </linearGradient>
          <linearGradient id="karaokeMic" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#f4f0e8" />
            <stop offset="55%" stopColor="#c8c2b6" />
            <stop offset="100%" stopColor="#8e877a" />
          </linearGradient>
        </defs>
        <rect width="360" height="132" fill="#1a0828" />
        <circle cx="286" cy="58" r="92" fill="url(#karaokeGlow)" />
        <rect x="248" y="18" width="98" height="62" rx="8" fill="url(#karaokeScreen)" />
        <rect
          x="248"
          y="18"
          width="98"
          height="62"
          rx="8"
          fill="none"
          stroke="#ff4d8a"
          strokeWidth="1.4"
          opacity="0.7"
        />
        <path
          d="M262 38h52M262 50h40M262 62h28"
          stroke="#ffd6e8"
          strokeWidth="3"
          strokeLinecap="round"
          opacity="0.85"
        />
        <g transform="translate(292 86) rotate(-28)">
          <rect x="-5" y="8" width="10" height="46" rx="5" fill="url(#karaokeMic)" />
          <ellipse cx="0" cy="4" rx="14" ry="16" fill="#2a2a2a" />
          <ellipse cx="0" cy="4" rx="11" ry="13" fill="#111" />
          <path d="M-8 -6h16M-9 0h18M-8 6h16" stroke="#d8d8d8" strokeWidth="1.4" />
          <rect x="-7" y="18" width="14" height="6" rx="1.5" fill="#e8c36a" />
        </g>
        <circle cx="318" cy="22" r="3.2" fill="#7dffb3" />
        <circle cx="330" cy="38" r="2.4" fill="#ffdf5a" />
        <circle cx="244" cy="28" r="2.6" fill="#7ec8ff" />
      </svg>
    </span>
  );
}

export function IncrediboxBackdrop() {
  return (
    <span className="pointer-events-none absolute inset-0 overflow-hidden bg-[#1a120c]" aria-hidden>
      <img
        src={asset("incredibox/stage.jpg")}
        alt=""
        className="absolute inset-0 h-full w-full object-cover object-[50%_58%]"
      />
      <span className="absolute inset-0 bg-gradient-to-r from-[#1a120c] from-0% via-[#1a120c]/90 via-[48%] to-transparent" />
      <span className="absolute inset-y-0 right-0 w-[42%] overflow-hidden">
        <span className="absolute bottom-[-16px] right-[-4px] flex h-[146px] items-end">
          {[3, 2].map((n, i) => (
            <img
              key={n}
              src={asset(`incredibox/p${n}.png`)}
              alt=""
              className="h-full w-auto max-w-none object-contain object-bottom"
              style={{ marginLeft: i === 0 ? 0 : -14, zIndex: 2 - i }}
            />
          ))}
        </span>
      </span>
      <span className="absolute inset-0 shadow-[inset_0_0_0_1.5px_rgba(212,176,122,0.55)]" />
    </span>
  );
}

export function WorkshopBackdrop() {
  return (
    <span className="pointer-events-none absolute inset-0 overflow-hidden bg-[#071824]" aria-hidden>
      <svg
        viewBox="0 0 360 132"
        className="absolute inset-0 h-full w-full"
        preserveAspectRatio="xMaxYMid slice"
      >
        <defs>
          <radialGradient id="workshopGlow" cx="78%" cy="42%">
            <stop offset="0%" stopColor="#3ee8c8" stopOpacity="0.5" />
            <stop offset="42%" stopColor="#2a6dff" stopOpacity="0.26" />
            <stop offset="100%" stopColor="#071824" stopOpacity="0" />
          </radialGradient>
          <linearGradient id="workshopScreen" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#123044" />
            <stop offset="100%" stopColor="#081420" />
          </linearGradient>
          <linearGradient id="workshopPen" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#f4f0e8" />
            <stop offset="55%" stopColor="#c8c2b6" />
            <stop offset="100%" stopColor="#8e877a" />
          </linearGradient>
        </defs>
        <rect width="360" height="132" fill="#071824" />
        <circle cx="286" cy="58" r="92" fill="url(#workshopGlow)" />
        <rect x="248" y="18" width="98" height="62" rx="8" fill="url(#workshopScreen)" />
        <rect
          x="248"
          y="18"
          width="98"
          height="62"
          rx="8"
          fill="none"
          stroke="#5eead4"
          strokeWidth="1.4"
          opacity="0.75"
        />
        <path
          d="M262 38h52M262 50h40M262 62h28"
          stroke="#d8fff4"
          strokeWidth="3"
          strokeLinecap="round"
          opacity="0.85"
        />
        <g transform="translate(292 86) rotate(-28)">
          <rect x="-5" y="8" width="10" height="46" rx="5" fill="url(#workshopPen)" />
          <path d="M-6 10 0 -12 6 10Z" fill="#d8d4cc" />
          <path d="M-3.2 2 0 -12 3.2 2Z" fill="#1a2430" />
          <rect x="-7" y="16" width="14" height="6" rx="1.5" fill="#5eead4" />
        </g>
        <circle cx="318" cy="22" r="3.2" fill="#7dffb3" />
        <circle cx="330" cy="38" r="2.4" fill="#ffdf5a" />
        <circle cx="244" cy="28" r="2.6" fill="#7ec8ff" />
      </svg>
    </span>
  );
}

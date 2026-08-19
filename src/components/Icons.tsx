export function Logo({ size = 36 }: { size?: number }) {
  return (
    <img
      src={`${import.meta.env.BASE_URL}logo.png?v=2`}
      alt="Ari Music"
      width={size}
      height={size}
      className="rounded-[10px] object-cover"
      draggable={false}
    />
  );
}

export function MusicNotesIcon({ size = 28 }: { size?: number }) {
  return (
    <svg
      width={size}
      height={size * 0.78}
      viewBox="0 0 52 40"
      fill="none"
      aria-hidden="true"
    >
      <path d="M18 6.5 L42 2.5 V10 L18 14 Z" fill="#111" />
      <rect x="16.4" y="6.5" width="3.2" height="24" rx="0.6" fill="#111" />
      <rect x="40.4" y="2.5" width="3.2" height="24" rx="0.6" fill="#111" />
      <ellipse cx="14.2" cy="31.2" rx="6.6" ry="5.1" fill="#111" />
      <ellipse cx="38.2" cy="27.2" rx="6.6" ry="5.1" fill="#111" />
    </svg>
  );
}

export function HomeIcon({ size = 26 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <path
        d="M12 3.2 3.2 10.6V20a1.4 1.4 0 0 0 1.4 1.4h5.1v-6.1h4.6v6.1h5.1A1.4 1.4 0 0 0 20.8 20V10.6L12 3.2Z"
        fill="currentColor"
      />
    </svg>
  );
}

export function FolderIcon({ size = 26 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <path
        d="M3.4 7.1A2.3 2.3 0 0 1 5.7 4.8h3.8l1.7 2h7.1A2.3 2.3 0 0 1 20.6 9.1v8.6a2.3 2.3 0 0 1-2.3 2.3H5.7A2.3 2.3 0 0 1 3.4 17.7V7.1Z"
        fill="currentColor"
      />
    </svg>
  );
}

export function CommunityIcon({ size = 26 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <path
        fill="currentColor"
        fillRule="evenodd"
        d="M4.2 4.4h15.6A2.2 2.2 0 0 1 22 6.6v9.1a2.2 2.2 0 0 1-2.2 2.2H9.4L4 21.4V6.6A2.2 2.2 0 0 1 4.2 4.4ZM8.2 12.25a1.25 1.25 0 1 0 0-2.5 1.25 1.25 0 0 0 0 2.5Zm3.8 0a1.25 1.25 0 1 0 0-2.5 1.25 1.25 0 0 0 0 2.5Zm3.8 0a1.25 1.25 0 1 0 0-2.5 1.25 1.25 0 0 0 0 2.5Z"
      />
    </svg>
  );
}

export function SectionChevron({ size = 22 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" aria-hidden>
      <path
        d="M8.2 4.4 16.6 12 8.2 19.6"
        stroke="currentColor"
        strokeWidth="2.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function MenuIcon({ size = 22 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" aria-hidden>
      <path
        d="M4 6.5h16M4 12h16M4 17.5h16"
        stroke="currentColor"
        strokeWidth="2.2"
        strokeLinecap="round"
      />
    </svg>
  );
}

export function SearchIcon({ size = 20 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" aria-hidden>
      <circle cx="10.5" cy="10.5" r="6.2" stroke="currentColor" strokeWidth="2" />
      <path d="M15.2 15.2 20 20" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
    </svg>
  );
}

export function HistoryClockIcon({ size = 20 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" aria-hidden>
      <path
        d="M7.2 6.2A8 8 0 1 1 4.8 12"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
      />
      <path
        d="M4.6 4.8v4.1h4"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path d="M12 8.4v4.1l2.8 1.7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
    </svg>
  );
}

export function MapPinIcon({ size = 20 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" aria-hidden>
      <path
        d="M5.2 9.2c0-3.7 3-6.7 6.8-6.7s6.8 3 6.8 6.7c0 4.6-6.8 11.3-6.8 11.3S5.2 13.8 5.2 9.2Z"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinejoin="round"
      />
      <circle cx="12" cy="9.2" r="2.1" stroke="currentColor" strokeWidth="2" />
    </svg>
  );
}

export function FingerIcon({ size = 20 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" aria-hidden>
      <path
        d="M8.2 11.2V6.6a1.6 1.6 0 0 1 3.2 0v3.4"
        stroke="currentColor"
        strokeWidth="1.9"
        strokeLinecap="round"
      />
      <path
        d="M11.4 9.8V6.3a1.5 1.5 0 1 1 3 0v4.1"
        stroke="currentColor"
        strokeWidth="1.9"
        strokeLinecap="round"
      />
      <path
        d="M14.4 10.4V7.6a1.5 1.5 0 1 1 3 0v5.2"
        stroke="currentColor"
        strokeWidth="1.9"
        strokeLinecap="round"
      />
      <path
        d="M8.2 11.4v2.2c0 3.4 1.7 6.4 4.6 7.2 2.1.6 4.8-.4 5.8-2.4.4-.8.6-1.7.6-2.6v-2.8a1.4 1.4 0 0 0-2.8 0"
        stroke="currentColor"
        strokeWidth="1.9"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M6.6 13.2 4.8 12a1.5 1.5 0 0 0-2 2.2l3.6 5.2"
        stroke="currentColor"
        strokeWidth="1.9"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

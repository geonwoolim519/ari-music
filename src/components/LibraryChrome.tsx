import { Link } from "react-router-dom";
import { useT } from "../store/localeStore";
import { useProfileStore } from "../store/profileStore";

export function ProfileBadge() {
  const t = useT();
  const name = useProfileStore((state) => state.name);
  const photo = useProfileStore((state) => state.photo);

  return (
    <Link
      to="/profile"
      className="flex h-[38px] w-[38px] shrink-0 items-center justify-center overflow-hidden rounded-full bg-[#d0d0d0] text-[13px] font-semibold text-[#222]"
      aria-label={t("myPageAria")}
    >
      {photo ? (
        <img src={photo} alt="" className="h-full w-full object-cover" />
      ) : (
        name.slice(0, 2)
      )}
    </Link>
  );
}

export function VinylIcon({ size = 32 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 32 32" aria-hidden="true">
      <circle cx="16" cy="16" r="15" fill="#3a3a3a" />
      <circle cx="16" cy="16" r="11.2" fill="none" stroke="#2a2a2a" strokeWidth="1.2" />
      <circle cx="16" cy="16" r="7.6" fill="none" stroke="#2a2a2a" strokeWidth="1.2" />
      <circle cx="16" cy="16" r="3.2" fill="#E53935" />
    </svg>
  );
}

export function ListFolderIcon({ size = 26 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" aria-hidden="true">
      <path
        d="M3.2 6.4A2.2 2.2 0 0 1 5.4 4.2h4.2l1.7 2.1h7.3A2.2 2.2 0 0 1 20.8 8.5v9.1a2.2 2.2 0 0 1-2.2 2.2H5.4A2.2 2.2 0 0 1 3.2 17.6V6.4Z"
        fill="#111"
      />
    </svg>
  );
}

export function DashedRule() {
  return (
    <div
      className="h-[2px] w-full bg-[repeating-linear-gradient(90deg,#b0b0b0_0_8px,transparent_8px_14px)]"
      aria-hidden="true"
    />
  );
}

/* iOS status bar for the phone mockups. Decorative — parents mark the frame aria-hidden. */
export function StatusBar() {
  return (
    <div
      aria-hidden="true"
      className="flex h-[54px] shrink-0 items-end justify-between px-8 pb-2"
    >
      <span className="text-[17px] tracking-[-0.02em]" style={{ fontWeight: 590 }}>
        9:41
      </span>
      <span className="flex items-center gap-1.5">
        {/* signal */}
        <svg width="18" height="12" viewBox="0 0 18 12" fill="currentColor">
          <rect x="0" y="8" width="3" height="4" rx="1" />
          <rect x="5" y="5.5" width="3" height="6.5" rx="1" />
          <rect x="10" y="3" width="3" height="9" rx="1" />
          <rect x="15" y="0" width="3" height="12" rx="1" opacity="0.35" />
        </svg>
        {/* wifi */}
        <svg width="17" height="12" viewBox="0 0 17 12" fill="currentColor">
          <path d="M8.5 9.6a2 2 0 0 1 1.42.59l-1.06 1.32a.5.5 0 0 1-.72 0L7.08 10.2A2 2 0 0 1 8.5 9.6Z" />
          <path d="M8.5 5.9c1.42 0 2.72.53 3.71 1.4l-1.28 1.6a3.28 3.28 0 0 0-4.86 0L4.79 7.3A5.55 5.55 0 0 1 8.5 5.9Z" />
          <path d="M8.5 2.2c2.42 0 4.63.9 6.32 2.37l-1.29 1.6A7.83 7.83 0 0 0 8.5 4.2c-1.94 0-3.71.7-5.03 1.97L2.18 4.57A9.05 9.05 0 0 1 8.5 2.2Z" />
        </svg>
        {/* battery */}
        <svg width="25" height="12" viewBox="0 0 25 12" fill="none">
          <rect x="0.5" y="0.5" width="21" height="11" rx="3.5" stroke="currentColor" opacity="0.4" />
          <rect x="2" y="2" width="18" height="8" rx="2" fill="currentColor" />
          <path d="M23 4v4c1.1-.2 2-1 2-2s-.9-1.8-2-2Z" fill="currentColor" opacity="0.4" />
        </svg>
      </span>
    </div>
  );
}

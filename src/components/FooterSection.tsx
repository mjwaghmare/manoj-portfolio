export function FooterSection() {
  return (
    <footer className="relative overflow-hidden border-t border-(--rule)/40 pt-10 pb-0 md:pt-14">
      {/* Centered Copyright */}
      <div className="relative z-10 wrap text-center">
        <p className="text-[12px] text-(--muted)/80 tracking-wide">
          © 2026 Manoj Waghmare. All rights reserved.
        </p>
      </div>

      {/* Giant MWSTUDIO Backdrop Watermark */}
      <div
        aria-hidden="true"
        className="w-full overflow-hidden select-none pointer-events-none text-center -mt-3 sm:-mt-6 md:-mt-10"
      >
        <p className="font-black tracking-[-0.04em] leading-[0.78] text-[clamp(64px,17vw,240px)] uppercase bg-clip-text text-transparent bg-linear-to-b from-(--ink)/8 to-(--ink)/1 dark:from-white/18 dark:to-white/3 mb-[-0.06em]">
          MWSTUDIO
        </p>
      </div>
    </footer>
  );
}


import Image from 'next/image';
import { PortfolioData } from '@/data/portfolio-data';
import { getAssetPath } from '@/lib/utils';

export function FooterSection() {
  return (
    <footer className="border-t border-[color-mix(in_srgb,var(--rule)_40%,transparent)]">
      <div className="wrap flex flex-wrap items-center justify-between gap-3 py-8">
        <a href="#home" aria-label="MWStudio, back to top" className="inline-flex items-center min-h-11">
          <Image
            src={getAssetPath(PortfolioData.profile.logoAsset)}
            alt="MWStudio"
            width={468}
            height={96}
            className="h-[24px] w-auto"
          />
        </a>
        <p className="text-[11px] text-[var(--muted)]">© 2026 Manoj Waghmare. All rights reserved.</p>
      </div>
    </footer>
  );
}

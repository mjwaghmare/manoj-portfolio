import Image from 'next/image';
import Link from 'next/link';
import { PortfolioData } from '@/data/portfolio-data';
import { getAssetPath } from '@/lib/utils';

export default function NotFound() {
  return (
    <main className="min-h-svh flex flex-col">
      <header className="wrap w-full py-6">
        <Link href="/" aria-label="MWStudio, home" className="inline-flex items-center min-h-11">
          <Image
            src={getAssetPath(PortfolioData.profile.logoAsset)}
            alt="MWStudio"
            width={468}
            height={96}
            className="h-[28px] w-auto"
          />
        </Link>
      </header>
      <section className="wrap w-full flex-1 flex flex-col justify-center pb-24">
        <p className="text-[11px] font-medium uppercase tracking-[0.16em] text-(--muted) mb-6">Error 404</p>
        <h1 className="display text-[clamp(52px,9vw,88px)] leading-[0.96] tracking-[-0.025em]">
          Page not <span className="accent-word">found</span>
        </h1>
        <p className="mt-6 max-w-[40ch] text-[18px] leading-[1.55] text-(--muted)">
          The page you&apos;re looking for doesn&apos;t exist or has moved.
        </p>
        <div className="mt-8">
          <Link
            href="/"
            className="inline-flex items-center justify-center min-h-11 px-6 rounded-full bg-(--ink) text-(--bg) text-[14px] font-semibold hover:opacity-85 transition-opacity"
          >
            Back to home
          </Link>
        </div>
      </section>
    </main>
  );
}

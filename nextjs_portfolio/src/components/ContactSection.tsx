import { ArrowUpRight, Mail } from 'lucide-react';
import { PortfolioData } from '@/data/portfolio-data';
import { CopyEmail } from './CopyEmail';
import { FadeIn } from './FadeIn';
import { RevealHeading } from './RevealHeading';

export function ContactSection() {
  const p = PortfolioData.profile;
  const links = [
    { label: 'Email', value: p.email, href: `mailto:${p.email}` },
    { label: 'LinkedIn', value: p.linkedin.handle, href: p.linkedin.url },
    { label: 'GitHub', value: p.github.handle, href: p.github.url },
    { label: 'YouTube', value: p.youtube.handle, href: p.youtube.url },
  ];

  return (
    <section id="contact" className="border-t border-[color-mix(in_srgb,var(--rule)_40%,transparent)] py-14 md:py-20">
      <FadeIn className="wrap">
        <RevealHeading>
          Let&apos;s work <span className="accent-word">together</span>
        </RevealHeading>
        <p data-s className="mt-5 max-w-[48ch] text-[16px] leading-[1.6] text-[var(--muted)]">{p.contactMessage}</p>
        <div data-s className="mt-8 flex flex-wrap gap-3 print:hidden">
          <a
            href={`mailto:${p.email}`}
            className="inline-flex items-center justify-center gap-2 min-h-11 px-6 rounded-full bg-[var(--ink)] text-[var(--bg)] text-[14px] font-semibold hover:opacity-85 transition-opacity"
          >
            <Mail size={16} aria-hidden />
            Email me
          </a>
          <CopyEmail email={p.email} />
        </div>
        <ul className="mt-10 grid gap-x-6 gap-y-2 sm:grid-cols-2 lg:grid-cols-4">
          {links.map((l) => (
            <li data-s key={l.label} className="border-t border-[var(--rule)]">
              <a
                href={l.href}
                {...(l.href.startsWith('http') ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
                className="group relative block min-h-11 py-4 pr-8 hover:text-[var(--accent)] focus-visible:text-[var(--accent)]"
              >
                <span className="block text-[10px] font-medium uppercase tracking-[0.14em] text-[var(--muted)]">
                  {l.label}
                </span>
                <span className="mt-1 block text-[14px] font-semibold break-words">{l.value}</span>
                <ArrowUpRight
                  size={18}
                  aria-hidden
                  className="absolute right-0 top-4 opacity-0 -translate-x-1 translate-y-1 transition-all duration-200 group-hover:opacity-100 group-hover:translate-x-0 group-hover:translate-y-0 group-focus-visible:opacity-100 group-focus-visible:translate-x-0 group-focus-visible:translate-y-0"
                />
              </a>
            </li>
          ))}
        </ul>
      </FadeIn>
    </section>
  );
}

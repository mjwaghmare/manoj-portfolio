import { PortfolioData } from '@/data/portfolio-data';
import { ContactLink } from './ContactLink';
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
    <section id="contact" className="border-t border-(--rule)/40 pt-14 pb-4 md:pt-20 md:pb-6">
      <FadeIn className="wrap">
        <RevealHeading>
          Let&apos;s work <span className="accent-word">together</span>
        </RevealHeading>
        <p data-s className="mt-5 max-w-[48ch] text-[16px] leading-[1.6] text-(--muted)">{p.contactMessage}</p>
        <ul className="mt-10 grid gap-x-6 gap-y-2 sm:grid-cols-2 lg:grid-cols-4">
          {links.map((l) => (
            <ContactLink
              key={l.label}
              label={l.label}
              value={l.value}
              href={l.href}
              copyText={l.label === 'Email' ? l.value : undefined}
            />
          ))}
        </ul>
      </FadeIn>
    </section>
  );
}

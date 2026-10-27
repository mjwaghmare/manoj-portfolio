import { PortfolioData } from '@/data/portfolio-data';
import { FadeIn } from './FadeIn';
import { RevealHeading } from './RevealHeading';

const focus = ['Performance', 'Clean architecture', 'User experience'];

const stats = [
  { value: '7+', label: 'Years experience' },
  { value: 'Mobile apps', label: 'Development' },
  { value: 'Pune', label: 'India' },
];

export function AboutSection() {
  // First sentence becomes the large lead; the rest stays as body text.
  const current = PortfolioData.experiences[0];
  const [lead, ...rest] = PortfolioData.profile.about.split(/(?<=\.)\s+/);

  return (
    <section id="about" className="border-t border-(--rule)/40 py-14 md:py-20">
      <FadeIn className="wrap grid gap-10 md:grid-cols-[1fr_2fr] md:gap-16">
        <RevealHeading className="md:sticky md:top-28 self-start">
          About <span className="accent-word">me</span>
        </RevealHeading>
        <div>
          <p data-s className="display text-[clamp(26px,3.4vw,38px)] leading-[1.15] tracking-[-0.01em] max-w-[24ch]">
            {lead}
          </p>
          <p data-s className="mt-6 max-w-[58ch] text-[16px] leading-[1.75] text-(--muted)">
            {rest.join(' ')}
          </p>
          <dl className="mt-12 grid grid-cols-1 sm:grid-cols-3 gap-x-8 gap-y-8">
            {stats.map((s, i) => (
              <div data-s key={s.value} className="border-t border-(--rule) pt-5">
                <dd className={`display text-[44px] leading-none ${i === 0 ? 'text-(--accent)' : ''}`}>
                  {s.value}
                </dd>
                <dt className="mt-3 text-[11px] font-medium uppercase tracking-[0.14em] text-(--muted)">
                  {s.label}
                </dt>
              </div>
            ))}
          </dl>

          <dl className="mt-10">
            <div data-s className="grid gap-1 sm:grid-cols-[160px_1fr] sm:gap-6 py-5 border-t border-(--rule)">
              <dt className="text-[11px] font-medium uppercase tracking-[0.14em] text-(--muted) pt-1">
                Currently at
              </dt>
              <dd className="text-[15px]">
                <span className="display text-[24px] leading-tight">{current.company}</span>
                <span className="block text-(--muted)">
                  {current.role} · {current.period.replace(' - ', ' — ')}
                </span>
              </dd>
            </div>
            <div data-s className="grid gap-1 sm:grid-cols-[160px_1fr] sm:gap-6 py-5 border-t border-(--rule)">
              <dt className="text-[11px] font-medium uppercase tracking-[0.14em] text-(--muted) pt-1">
                What I focus on
              </dt>
              <dd className="display text-[24px] leading-tight">
                {focus.map((f, i) => (
                  <span key={f}>
                    {i > 0 && (
                      <span className="text-(--faint)" aria-hidden>
                        {' / '}
                      </span>
                    )}
                    {f}
                  </span>
                ))}
              </dd>
            </div>
          </dl>
        </div>
      </FadeIn>
    </section>
  );
}

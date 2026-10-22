import React from 'react';

interface SectionContainerProps {
  id?: string;
  title?: string;
  accentWord?: string;
  trailing?: React.ReactNode;
  children: React.ReactNode;
  className?: string;
  topPadding?: string;
  bottomPadding?: string;
}

export function SectionTitle({
  text,
  accentWord,
}: {
  text: string;
  accentWord?: string;
}) {
  const accentIndex = accentWord ? text.indexOf(accentWord) : -1;

  return (
    <div className="flex items-center gap-6">
      <h2 className="text-[24px] sm:text-[29px] font-bold leading-[1.25] tracking-[-0.4px] sm:tracking-[-0.5px] text-[var(--heading)]">
        {accentWord && accentIndex >= 0 ? (
          <>
            {text.substring(0, accentIndex)}
            <span className="font-editorial italic font-semibold text-[1.08em] text-[var(--link)]">
              {accentWord}
            </span>
            {text.substring(accentIndex + accentWord.length)}
          </>
        ) : (
          text
        )}
      </h2>

      {/* AccentLine: 44px x 3px gradient bar */}
      <div
        className="w-[44px] h-[3px] rounded-full shrink-0"
        style={{
          background: 'linear-gradient(135deg, var(--accent-g1), var(--accent-g2))',
        }}
        aria-hidden="true"
      />
    </div>
  );
}

export function SectionContainer({
  id,
  title,
  accentWord,
  trailing,
  children,
  className = '',
  topPadding,
  bottomPadding,
}: SectionContainerProps) {
  return (
    <section
      id={id}
      className={`w-full scroll-mt-20 ${topPadding || 'pt-5 sm:pt-[22px]'} ${
        bottomPadding || 'pb-5 sm:pb-[22px]'
      } ${className}`}
    >
      <div className="max-w-[1244px] mx-auto px-5 sm:px-10 lg:px-[72px]">
        {title && (
          <div className="flex items-center justify-between mb-[18px] sm:mb-[20px]">
            <SectionTitle text={title} accentWord={accentWord} />
            {trailing && <div>{trailing}</div>}
          </div>
        )}
        {children}
      </div>
    </section>
  );
}

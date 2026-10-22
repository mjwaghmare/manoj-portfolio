import React from 'react';

interface HoverCardProps {
  children: React.ReactNode;
  className?: string;
  bg?: string;
  border?: string;
  radius?: string;
}

export function HoverCard({
  children,
  className = '',
  bg = 'var(--tile-bg)',
  border = 'var(--tile-border)',
  radius = '14px',
}: HoverCardProps) {
  return (
    <div
      className={`group relative overflow-hidden transition-all duration-[180ms] ease-out hover:-translate-y-1 ${className}`}
      style={{
        backgroundColor: bg,
        borderRadius: radius,
        border: `1px solid ${border}`,
        boxShadow: 'var(--card-shadow)',
      }}
    >
      {children}
    </div>
  );
}

'use client';

import React, { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import { getAssetPath } from '@/lib/utils';

interface ViewportGifMediaProps {
  gifSrc: string;
  posterSrc?: string;
  alt: string;
  className?: string;
  sizes?: string;
}

/**
 * High-performance media component that displays a lightweight static poster image
 * when out of frame, and only activates and plays the animated GIF when scrolled into the viewport.
 */
export function ViewportGifMedia({
  gifSrc,
  posterSrc,
  alt,
  className = 'object-cover object-center transition-transform duration-500 ease-out group-hover:scale-105',
  sizes = '(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw',
}: ViewportGifMediaProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isInView, setIsInView] = useState(false);

  useEffect(() => {
    const el = containerRef.current;
    if (!el || typeof IntersectionObserver === 'undefined') {
      setIsInView(true);
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsInView(entry.isIntersecting);
      },
      {
        threshold: 0.15, // Activates when 15% of the card is visible in the viewport
      }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  const activeSrc = isInView ? gifSrc : (posterSrc ?? gifSrc);

  return (
    <div ref={containerRef} className="relative w-full h-full">
      <Image
        key={isInView ? 'in-view-gif' : 'out-of-view-poster'}
        src={getAssetPath(activeSrc)}
        alt={alt}
        fill
        unoptimized={isInView}
        sizes={sizes}
        className={className}
      />
    </div>
  );
}

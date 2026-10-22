'use client';

import React, { useState, useRef, useEffect, useCallback } from 'react';

interface TextScrambleProps {
  children: string;
  className?: string;
  characterSet?: string; // If provided, uses this set; otherwise shuffles the label's own letters
  speed?: number;
}

export function TextScramble({
  children,
  className = '',
  characterSet,
  speed = 28,
}: TextScrambleProps) {
  const [displayText, setDisplayText] = useState(children);
  const isScrambling = useRef(false);
  const frameRef = useRef<NodeJS.Timeout | null>(null);

  // Trigger scramble ONLY on hover using the word's own letters
  const handleMouseEnter = useCallback(() => {
    if (frameRef.current) clearInterval(frameRef.current);
    isScrambling.current = true;

    let iteration = 0;
    const length = children.length;
    // Use the label's own letters for an anagram decoding effect unless an override set is provided
    const pool = characterSet || children.split('').filter((c) => c !== ' ');

    frameRef.current = setInterval(() => {
      setDisplayText(() =>
        children
          .split('')
          .map((char, index) => {
            if (char === ' ') return ' ';
            if (index < iteration) {
              return children[index];
            }
            return pool[Math.floor(Math.random() * pool.length)];
          })
          .join('')
      );

      iteration += 1 / 2.2;

      if (iteration >= length) {
        if (frameRef.current) clearInterval(frameRef.current);
        isScrambling.current = false;
        setDisplayText(children);
      }
    }, speed);
  }, [children, characterSet, speed]);

  useEffect(() => {
    setDisplayText(children);
    return () => {
      if (frameRef.current) clearInterval(frameRef.current);
    };
  }, [children]);

  return (
    <span
      onMouseEnter={handleMouseEnter}
      className={`relative inline-block select-none ${className}`}
    >
      {/* Ghost text: locks the container to the exact pixel width of the original word so side texts never shift */}
      <span className="invisible opacity-0 pointer-events-none select-none" aria-hidden="true">
        {children}
      </span>

      {/* Visible scrambling text overlay: positioned directly over the ghost */}
      <span className="absolute inset-0 flex items-center justify-center pointer-events-none whitespace-nowrap">
        {displayText}
      </span>
    </span>
  );
}

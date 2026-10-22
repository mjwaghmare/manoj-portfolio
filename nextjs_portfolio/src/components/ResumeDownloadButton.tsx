'use client';

import React, { useState, useRef } from 'react';
import { getAssetPath } from '@/lib/utils';

const progressLines = ['Downloading…', 'Hiding typos…', 'Adding sparkle…'];
const doneLines = ['Saved. Hire me?', 'Again? Flattered.', "It's the same PDF"];

export function ResumeDownloadButton({
  url = '/Manoj_Waghmare_Resume.pdf',
  width = 180,
  height = 48,
}: {
  url?: string;
  width?: number;
  height?: number;
}) {
  const [phase, setPhase] = useState<'idle' | 'downloading' | 'done'>('idle');
  const [currentLine, setCurrentLine] = useState('Download Resume');
  const [progress, setProgress] = useState(0);
  const downloadCount = useRef(0);
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  const handleClick = (e: React.MouseEvent) => {
    e.preventDefault();
    if (phase !== 'idle') return;

    // Trigger actual download immediately
    const a = document.createElement('a');
    a.href = getAssetPath(url);
    a.download = 'Manoj_Waghmare_Resume.pdf';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);

    // Start progress animation
    setPhase('downloading');
    setProgress(0);

    const startTime = performance.now();
    const duration = 1800;

    const animate = (currentTime: number) => {
      const elapsed = currentTime - startTime;
      const t = Math.min(1, elapsed / duration);
      // ease-in-out curve
      const easeT = t < 0.5 ? 2 * t * t : -1 + (4 - 2 * t) * t;
      setProgress(easeT * 100);

      const lineIndex = Math.min(
        progressLines.length - 1,
        Math.floor(t * progressLines.length)
      );
      setCurrentLine(progressLines[lineIndex]);

      if (t < 1) {
        requestAnimationFrame(animate);
      } else {
        setPhase('done');
        const doneText = doneLines[downloadCount.current % doneLines.length];
        downloadCount.current++;
        setCurrentLine(doneText);

        timerRef.current = setTimeout(() => {
          setPhase('idle');
          setCurrentLine('Download Resume');
          setProgress(0);
        }, 2600);
      }
    };

    requestAnimationFrame(animate);
  };

  return (
    <button
      type="button"
      onClick={handleClick}
      style={{
        width: `${width}px`,
        height: `${height}px`,
        borderRadius: '12px',
        background: 'linear-gradient(135deg, var(--button-g1), var(--button-g2))',
        boxShadow: '0 8px 18px rgba(123, 94, 244, 0.28)',
      }}
      className="relative overflow-hidden flex items-center justify-center font-semibold text-[15px] text-white select-none cursor-pointer hover:opacity-95 transition-opacity"
    >
      {/* Progress Fill Overlay */}
      {phase === 'downloading' && (
        <div
          className="absolute left-0 top-0 bottom-0 bg-white/20 transition-all pointer-events-none"
          style={{ width: `${progress}%` }}
        />
      )}

      {/* Button Text */}
      <span className="relative z-10 px-4 whitespace-nowrap">{currentLine}</span>
    </button>
  );
}

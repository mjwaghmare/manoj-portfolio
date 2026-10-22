'use client';

import React, { useState, useRef } from 'react';
import { getAssetPath } from '@/lib/utils';

const progressLines = ['Downloading…', 'Hiding typos…', 'Adding sparkle…'];
const doneLines = ['Saved. Hire me?', 'Again? Flattered.', "It's the same PDF"];

import { Download, Sparkles, CheckCircle2 } from 'lucide-react';

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
        borderRadius: '14px',
        background: 'linear-gradient(135deg, var(--button-g1), var(--button-g2))',
      }}
      className="group relative overflow-hidden flex items-center justify-center gap-2 font-semibold text-[15px] text-white select-none cursor-pointer transition-all duration-300 shadow-[0_8px_20px_rgba(94,61,247,0.32)] hover:shadow-[0_14px_30px_rgba(94,61,247,0.52)] hover:-translate-y-1 active:translate-y-0 active:scale-[0.98]"
    >
      {/* Dynamic diagonal shine sheen on hover */}
      <div className="absolute inset-0 w-[200%] -translate-x-full group-hover:translate-x-full transition-transform duration-1000 bg-gradient-to-r from-transparent via-white/25 to-transparent pointer-events-none" />

      {/* Progress Fill Overlay */}
      {phase === 'downloading' && (
        <div
          className="absolute left-0 top-0 bottom-0 bg-white/25 transition-all pointer-events-none"
          style={{ width: `${progress}%` }}
        />
      )}

      {/* Icon based on state */}
      <span className="relative z-10 flex items-center gap-2 px-3 whitespace-nowrap">
        {phase === 'idle' && (
          <Download
            size={17}
            className="transition-transform duration-300 group-hover:translate-y-0.5"
          />
        )}
        {phase === 'downloading' && (
          <Sparkles size={17} className="animate-spin text-amber-200" />
        )}
        {phase === 'done' && (
          <CheckCircle2 size={17} className="text-emerald-300 animate-bounce" />
        )}
        <span>{currentLine}</span>
      </span>
    </button>
  );
}


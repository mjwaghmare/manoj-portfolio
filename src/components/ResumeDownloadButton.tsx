'use client';

import React from 'react';
import { Download } from 'lucide-react';
import { getAssetPath } from '@/lib/utils';

export function ResumeDownloadButton({ url = '/Manoj_Waghmare_Resume.pdf' }: { url?: string }) {
  return (
    <a
      href={getAssetPath(url)}
      download="Manoj_Waghmare_Resume.pdf"
      className="inline-flex items-center justify-center gap-2 min-h-11 px-6 rounded-full bg-(--ink) text-(--bg) text-[14px] font-semibold hover:opacity-85 transition-opacity"
    >
      <Download size={16} aria-hidden />
      Download Resume
    </a>
  );
}

'use client';

import React, { useRef, useState } from 'react';
import { Check, Copy } from 'lucide-react';

export function CopyEmail({ email }: { email: string }) {
  const [copied, setCopied] = useState(false);
  const timer = useRef<ReturnType<typeof setTimeout> | undefined>(undefined);

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(email);
    } catch {
      return; // clipboard blocked: the mailto button still works
    }
    setCopied(true);
    clearTimeout(timer.current);
    timer.current = setTimeout(() => setCopied(false), 2000);
  };

  return (
    <button
      type="button"
      onClick={copy}
      className="inline-flex items-center justify-center gap-2 min-h-11 px-6 rounded-full border border-[var(--ink)] text-[var(--ink)] text-[14px] font-semibold hover:bg-[var(--ink)] hover:text-[var(--bg)] transition-colors cursor-pointer"
    >
      {copied ? <Check size={16} aria-hidden /> : <Copy size={16} aria-hidden />}
      <span aria-live="polite">{copied ? 'Copied' : 'Copy email'}</span>
    </button>
  );
}

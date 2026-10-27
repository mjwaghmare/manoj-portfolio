'use client';

import React, { useEffect, useRef, useState } from 'react';
import { ArrowUpRight } from 'lucide-react';

interface ContactLinkProps {
  label: string;
  value: string;
  href: string;
  /** When set, clicking also copies this text and shows a "Copied" note under the value. */
  copyText?: string;
}

export function ContactLink({ label, value, href, copyText }: ContactLinkProps) {
  const [copied, setCopied] = useState(false);
  const timer = useRef<ReturnType<typeof setTimeout> | undefined>(undefined);

  useEffect(() => () => clearTimeout(timer.current), []);

  // The link still follows its href (mailto opens the mail app); copying happens alongside.
  const onClick = async () => {
    if (!copyText) return;
    try {
      await navigator.clipboard.writeText(copyText);
    } catch {
      return; // clipboard blocked: the mail app still opens
    }
    setCopied(true);
    clearTimeout(timer.current);
    timer.current = setTimeout(() => setCopied(false), 2000);
  };

  return (
    <li data-s className="border-t border-(--rule)">
      <a
        href={href}
        onClick={onClick}
        {...(href.startsWith('http') ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
        className="group relative block min-h-11 pt-4 pb-7 pr-8 hover:text-(--accent) focus-visible:text-(--accent)"
      >
        <span className="block text-[10px] font-medium uppercase tracking-[0.14em] text-(--muted)">{label}</span>
        <span className="mt-1 block text-[14px] font-semibold wrap-break-word">{value}</span>
        <ArrowUpRight
          size={18}
          aria-hidden
          className="absolute right-0 top-4 opacity-0 -translate-x-1 translate-y-1 transition-all duration-200 group-hover:opacity-100 group-hover:translate-x-0 group-hover:translate-y-0 group-focus-visible:opacity-100 group-focus-visible:translate-x-0 group-focus-visible:translate-y-0"
        />
        {copyText && (
          <span
            role="status"
            className={`absolute left-0 bottom-2 text-[11px] font-medium text-(--accent) transition-all duration-200 ${
              copied ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-1'
            }`}
          >
            {copied ? 'Copied to clipboard' : ''}
          </span>
        )}
      </a>
    </li>
  );
}

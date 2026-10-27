"use client";

import { animate, inView, stagger } from "motion";
import React, { Children, isValidElement, useEffect, useRef } from "react";

/**
 * Section heading whose words rise out of a mask one after another.
 * Children can be plain text and inline elements (e.g. the accent-word span).
 */
export function RevealHeading({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) {
  const ref = useRef<HTMLHeadingElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const words = Array.from(el.querySelectorAll<HTMLElement>(".rw"));
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      words.forEach((w) => (w.style.transform = "none"));
      return;
    }
    return inView(
      el,
      () => {
        animate(
          words,
          { transform: ["translateY(110%)", "translateY(0%)"] },
          { duration: 0.48, delay: stagger(0.035), ease: [0.16, 1, 0.3, 1] },
        );
      },
      // Trigger as heading approaches viewport so words glide up smoothly on scroll
      { margin: "0px 0px 30px 0px" },
    );
  }, []);

  const mask = (key: string, node: React.ReactNode) => (
    // Padding/negative margin keep descenders and italic overhang from being clipped by the mask.
    <span
      key={key}
      className="inline-block overflow-hidden align-bottom pb-[0.14em] mb-[-0.14em] pr-[0.08em] mr-[-0.08em]"
    >
      <span className="rw inline-block">{node}</span>
    </span>
  );

  const parts: React.ReactNode[] = [];
  Children.forEach(children, (child, i) => {
    if (typeof child === "string") {
      child
        .split(/\s+/)
        .filter(Boolean)
        .forEach((word, j) => {
          parts.push(mask(`${i}-${j}`, word), " ");
        });
    } else if (isValidElement(child)) {
      parts.push(mask(`${i}`, child), " ");
    }
  });

  return (
    <h2 ref={ref} className={`h2 ${className}`}>
      {parts}
    </h2>
  );
}

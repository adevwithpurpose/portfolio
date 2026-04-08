"use client";

import { useEffect, useRef, type ReactNode } from "react";

interface SectionWrapperProps {
  id: string;
  children: ReactNode;
  className?: string;
  onEnter?: () => void;
}

/**
 * SectionWrapper — Wraps each full-screen section.
 *
 * Features:
 * - Adds `snap-section` class for CSS scroll-snap (desktop)
 * - Uses IntersectionObserver to detect when section enters viewport
 * - Calls onEnter callback for active section tracking
 * - minHeight: 100vh ensures each section fills the viewport
 */
export default function SectionWrapper({
  id,
  children,
  className = "",
  onEnter,
}: SectionWrapperProps) {
  const ref = useRef<HTMLElement>(null);
  const hasEnteredRef = useRef(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    // IntersectionObserver — fires when section center enters viewport
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !hasEnteredRef.current) {
            hasEnteredRef.current = true;
            onEnter?.();
          }
          // Reset when section leaves (so it can re-enter)
          if (!entry.isIntersecting) {
            hasEnteredRef.current = false;
          }
        });
      },
      {
        root: null,
        rootMargin: "0px",
        threshold: 0.5, // Fire when 50% of section is visible
      },
    );

    observer.observe(el);

    return () => observer.disconnect();
  }, [onEnter]);

  return (
    <section
      ref={ref}
      id={id}
      className={`snap-section relative w-full overflow-hidden ${className}`}
      style={{ minHeight: "100vh" }}
    >
      {children}
    </section>
  );
}

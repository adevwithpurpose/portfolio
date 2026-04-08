"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";

interface ScanLineProps {
  onComplete?: () => void;
}

export default function ScanLine({ onComplete }: ScanLineProps) {
  const lineRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const line = lineRef.current;
    if (!line) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        line,
        { top: "-2px", opacity: 0 },
        {
          top: "100%",
          opacity: 1,
          duration: 1.2,
          ease: "power1.inOut",
          onComplete: () => {
            gsap.set(line, { opacity: 0 });
            onComplete?.();
          },
        }
      );
    });

    return () => ctx.revert();
  }, [onComplete]);

  return (
    <div
      ref={lineRef}
      className="pointer-events-none absolute inset-x-0 z-30 h-[2px] w-full"
      style={{
        background: "linear-gradient(90deg, transparent 0%, rgba(37,99,235,0.8) 30%, rgba(59,130,246,1) 50%, rgba(37,99,235,0.8) 70%, transparent 100%)",
        boxShadow: "0 0 12px rgba(37,99,235,0.6), 0 0 30px rgba(37,99,235,0.3)",
        top: "-2px",
        opacity: 0,
      }}
    />
  );
}

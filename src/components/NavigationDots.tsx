"use client";

import { useEffect, useRef, useState, useCallback } from "react";

interface NavigationDotsProps {
  sections: readonly string[];
  activeSection: number;
  onDotClick: (index: number) => void;
}

/**
 * NavigationDots — Fixed right-side dot navigation with particle burst effect.
 *
 * Features:
 * - Tooltip labels on hover
 * - Particle burst animation on click
 * - Active dot glows with blue accent
 * - Accessible: aria-labels, keyboard focusable
 */
export default function NavigationDots({
  sections,
  activeSection,
  onDotClick,
}: NavigationDotsProps) {
  const [particles, setParticles] = useState<
    { id: number; x: number; y: number; vx: number; vy: number; life: number }[]
  >([]);
  const particleIdRef = useRef(0);
  const rafRef = useRef<number>(0);

  // Human-readable labels — must match SECTION_IDS order/count in page.tsx
  const labels = [
    "Home",
    "Testimonials",
    "Web Development",
    "Automation",
    "AI Agents",
    "How It Works",
    "Case Studies",
    "How I Work",
    "Why Me",
    "FAQ",
    "Contact",
  ];

  // Particle animation loop (gravity + fade)
  useEffect(() => {
    const animate = () => {
      setParticles((prev) =>
        prev
          .map((p) => ({
            ...p,
            x: p.x + p.vx,
            y: p.y + p.vy,
            vy: p.vy + 0.15,
            life: p.life - 1,
          }))
          .filter((p) => p.life > 0),
      );
      rafRef.current = requestAnimationFrame(animate);
    };
    rafRef.current = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(rafRef.current);
  }, []);

  const handleClick = useCallback(
    (index: number, e: React.MouseEvent) => {
      onDotClick(index);

      const rect = (e.currentTarget as HTMLElement).getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;

      const newParticles = Array.from({ length: 12 }, () => {
        const angle = Math.random() * Math.PI * 2;
        const speed = 2 + Math.random() * 4;
        return {
          id: particleIdRef.current++,
          x: centerX,
          y: centerY,
          vx: Math.cos(angle) * speed,
          vy: Math.sin(angle) * speed - 3,
          life: 40 + Math.random() * 20,
        };
      });

      setParticles((prev) => [...prev, ...newParticles]);
    },
    [onDotClick],
  );

  return (
    <>
      {/* Dot container */}
      <div
        className="fixed right-4 top-1/2 z-[99] hidden -translate-y-1/2 flex-col gap-3 md:flex"
        role="navigation"
        aria-label="Page section navigation"
      >
        {sections.map((sectionId, index) => (
          <button
            key={sectionId}
            onClick={(e) => handleClick(index, e)}
            className={`group relative flex items-center justify-center rounded-full transition-all duration-300 ${
              activeSection === index
                ? "scale-125 bg-blue-500 shadow-[0_0_14px_rgba(59,130,246,0.9),0_0_28px_rgba(59,130,246,0.4)]"
                : "bg-white/5 border border-white/25 hover:scale-110 hover:border-white/60 hover:bg-white/10"
            }`}
            style={{ width: 14, height: 14 }}
            aria-label={`Go to section: ${labels[index] ?? sectionId}`}
            aria-current={activeSection === index ? "true" : undefined}
          >
            {/* Inner dot */}
            <span
              className={`rounded-full transition-all duration-300 ${
                activeSection === index
                  ? "bg-white shadow-[0_0_6px_rgba(255,255,255,0.8)]"
                  : "bg-white/30 group-hover:bg-white/60"
              }`}
              style={{
                width: activeSection === index ? 8 : 5,
                height: activeSection === index ? 8 : 5,
              }}
            />
            {/* Tooltip label */}
            <span
              className="pointer-events-none absolute right-full mr-3 whitespace-nowrap rounded-md bg-zinc-900/90 px-2.5 py-1 text-xs font-medium text-white opacity-0 backdrop-blur-sm transition-opacity duration-200 group-hover:opacity-100"
              style={{ top: "50%", transform: "translateY(-50%)" }}
            >
              {labels[index] ?? sectionId}
            </span>
          </button>
        ))}
      </div>

      {/* Particle overlay */}
      <div className="pointer-events-none fixed inset-0 z-[98] overflow-hidden">
        <svg className="absolute inset-0 h-full w-full">
          {particles.map((p) => (
            <circle
              key={p.id}
              cx={p.x}
              cy={p.y}
              r={Math.max(0.5, (p.life / 40) * 3)}
              fill={`rgba(59,130,246,${p.life / 60})`}
            />
          ))}
        </svg>
      </div>
    </>
  );
}

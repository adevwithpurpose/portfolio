"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import SectionWrapper from "@/components/SectionWrapper";

gsap.registerPlugin(ScrollTrigger);

const stats = [
  { value: "5+", label: "Years Building" },
  { value: "150+", label: "Projects Shipped" },
  { value: "99%", label: "Uptime Delivered" },
  { value: "24/7", label: "Systems Running" },
];

interface StatsBannerProps {
  onEnter?: () => void;
}

export default function StatsBanner({ onEnter }: StatsBannerProps) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const items = ref.current?.querySelectorAll(".stat-item");
      if (!items?.length) return;
      gsap.fromTo(
        items,
        { opacity: 0, y: 20 },
        {
          opacity: 1,
          y: 0,
          duration: 0.25,
          ease: "power2.out",
          stagger: 0.06,
          scrollTrigger: {
            trigger: ref.current,
            start: "top 80%",
          },
        },
      );
    }, ref);
    return () => ctx.revert();
  }, []);

  return (
    <SectionWrapper
      id="stats-banner"
      className="flex min-h-[50vh] items-center justify-center py-16"
      onEnter={onEnter}
    >
      {/* Subtle separator lines */}
      <div className="absolute inset-0 flex items-center">
        <div className="h-px w-full bg-gradient-to-r from-transparent via-blue-500/10 to-transparent" />
      </div>

      <div
        ref={ref}
        className="relative z-10 mx-auto grid max-w-5xl grid-cols-2 gap-px bg-blue-500/10 lg:grid-cols-4"
      >
        {stats.map((stat, i) => (
          <div
            key={i}
            className="stat-item flex flex-col items-center justify-center bg-[#09090b] py-10 backdrop-blur-sm"
          >
            <span className="mb-2 text-4xl font-black tracking-tight text-white sm:text-5xl">
              {stat.value}
            </span>
            <span className="text-sm font-medium uppercase tracking-widest text-blue-400/60">
              {stat.label}
            </span>
          </div>
        ))}
      </div>
    </SectionWrapper>
  );
}

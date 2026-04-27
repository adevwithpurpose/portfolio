"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import SectionWrapper from "@/components/SectionWrapper";

gsap.registerPlugin(ScrollTrigger);

const steps = [
  {
    number: "01",
    title: "Discovery Call",
    subtitle: "Free, 15 Minutes",
    description:
      "Tell me what's broken or slow in your business. I'll tell you if I can fix it and how. No pitch, no pressure — just honest advice.",
    icon: (
      <svg
        width="28"
        height="28"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
        <path d="M8 10h.01" />
        <path d="M12 10h.01" />
        <path d="M16 10h.01" />
      </svg>
    ),
  },
  {
    number: "02",
    title: "Build & Iterate",
    subtitle: "2-4 Weeks",
    description:
      "I build while you run your business. Weekly check-ins, full transparency, no surprises. You see progress every step of the way.",
    icon: (
      <svg
        width="28"
        height="28"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <polyline points="16 18 22 12 16 6" />
        <polyline points="8 6 2 12 8 18" />
        <line x1="14" y1="4" x2="10" y2="20" />
      </svg>
    ),
  },
  {
    number: "03",
    title: "Launch & Maintain",
    subtitle: "24/7 Autonomous Operation",
    description:
      "It goes live. I monitor it. If something breaks at 3am, I fix it — you sleep. Ongoing maintenance included in every engagement.",
    icon: (
      <svg
        width="28"
        height="28"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M12 2v4" />
        <path d="m16.2 7.8 2.9-2.9" />
        <path d="M18 12h4" />
        <path d="m16.2 16.2 2.9 2.9" />
        <path d="M12 18v4" />
        <path d="m4.9 19.1 2.9-2.9" />
        <path d="M2 12h4" />
        <path d="m4.9 4.9 2.9 2.9" />
      </svg>
    ),
  },
];

interface ProcessSectionProps {
  onEnter?: () => void;
}

export default function ProcessSection({ onEnter }: ProcessSectionProps) {
  const gridRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const cards = gridRef.current?.querySelectorAll(".process-card");
      if (!cards?.length) return;
      gsap.fromTo(
        cards,
        { opacity: 0, y: 40 },
        {
          opacity: 1,
          y: 0,
          duration: 0.25,
          ease: "power2.out",
          stagger: 0.1,
          scrollTrigger: {
            trigger: gridRef.current,
            start: "top 80%",
          },
        },
      );
    }, gridRef);
    return () => ctx.revert();
  }, []);

  return (
    <SectionWrapper
      id="process"
      className="flex items-center justify-center py-24"
      onEnter={onEnter}
    >
      {/* Ambient glow */}
      <div className="pointer-events-none absolute inset-0 flex items-center justify-center">
        <div className="h-[500px] w-[500px] rounded-full bg-cyan-600/6 blur-[140px]" />
      </div>

      <div className="relative z-10 w-full px-6">
        {/* Header */}
        <div className="mx-auto mb-16 max-w-2xl text-center">
          <span className="mb-4 block text-sm font-medium uppercase tracking-[0.3em] text-white/40">
            How It Works
          </span>
          <h2 className="text-[clamp(1.8rem,4vw,3rem)] font-black leading-[1.1] tracking-tight text-white">
            Three Steps. Zero Headaches.
          </h2>
          <p className="mx-auto mt-4 max-w-lg text-base text-zinc-400">
            From first call to full deployment — here&apos;s exactly what happens
            when we work together.
          </p>
        </div>

        {/* Steps with connecting flow line */}
        <div className="relative">
          {/* Animated flow line behind cards (desktop only) */}
          <div className="absolute left-0 right-0 top-16 hidden h-px md:block">
            <div className="mx-auto h-full max-w-4xl">
              <div className="h-full w-full bg-gradient-to-r from-transparent via-blue-500/20 to-transparent"></div>
              <div className="absolute inset-y-0 left-0 w-24 bg-gradient-to-r from-blue-500/60 to-transparent animate-pulse"></div>
            </div>
          </div>

          <div
            ref={gridRef}
            className="relative mx-auto grid max-w-5xl grid-cols-1 gap-8 md:grid-cols-3"
          >
            {steps.map((step, i) => (
              <div key={step.number} className="process-card relative group">
                {/* Connector arrow (between cards, not on last) */}
                {i < steps.length - 1 && (
                  <div className="absolute -right-4 top-16 hidden md:block">
                    <svg
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      className="text-blue-500/30"
                    >
                      <path
                        d="M5 12h14M13 6l6 6-6 6"
                        stroke="currentColor"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </div>
                )}

                <div className="rounded-2xl border border-white/[0.06] bg-white/[0.03] p-8 backdrop-blur-sm transition-all duration-500 hover:border-blue-500/25 hover:shadow-[0_0_40px_rgba(37,99,235,0.1)]">
                  {/* Step number */}
                  <span className="mb-6 block text-5xl font-black text-blue-500/10">
                    {step.number}
                  </span>

                  {/* Icon */}
                  <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-xl bg-blue-500/10 text-blue-400/80">
                    {step.icon}
                  </div>

                  {/* Title + subtitle */}
                  <h3 className="mb-1 text-xl font-bold text-white">
                    {step.title}
                  </h3>
                  <p className="mb-4 text-sm font-medium text-blue-400/60">
                    {step.subtitle}
                  </p>

                  {/* Description */}
                  <p className="text-sm leading-relaxed text-zinc-400">
                    {step.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </SectionWrapper>
  );
}

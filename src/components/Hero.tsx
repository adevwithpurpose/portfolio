"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import SectionWrapper from "@/components/SectionWrapper";
import HeroTerminal from "./HeroTerminal";

interface HeroProps {
  onEnter?: () => void;
  onCTAClick?: (ctaName: string) => void;
}

export default function Hero({ onEnter, onCTAClick }: HeroProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const subtitleRef = useRef<HTMLParagraphElement>(null);
  const taglineRef = useRef<HTMLParagraphElement>(null);
  const ctasRef = useRef<HTMLDivElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);
  const particleRefs = useRef<HTMLDivElement[]>([]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: "power3.out" } });

      gsap.set(
        [
          titleRef.current,
          subtitleRef.current,
          taglineRef.current,
          ctasRef.current,
        ],
        { opacity: 0, y: 50 },
      );

      tl.to(titleRef.current, { opacity: 1, y: 0, duration: 1.2, delay: 0.2 })
        .to(subtitleRef.current, { opacity: 1, y: 0, duration: 0.9 }, "-=0.7")
        .to(taglineRef.current, { opacity: 1, y: 0, duration: 0.8 }, "-=0.6")
        .to(ctasRef.current, { opacity: 1, y: 0, duration: 0.6 }, "-=0.4")
        .fromTo(".hero-terminal-wrapper", { opacity: 0, x: 50 }, { opacity: 1, x: 0, duration: 1.2, ease: "power3.out" }, "-=0.8");

      // Staggered floating particles
      particleRefs.current.forEach((p, i) => {
        if (!p) return;
        gsap.fromTo(
          p,
          { opacity: 0, scale: 0 },
          {
            opacity: 0.6,
            scale: 1,
            duration: 1,
            delay: 0.5 + i * 0.15,
            ease: "back.out(1.7)",
          },
        );
        gsap.to(p, {
          y: "-=20",
          x: `+=${(i % 2 === 0 ? 1 : -1) * 10}`,
          duration: 3 + i * 0.5,
          ease: "sine.inOut",
          yoyo: true,
          repeat: -1,
        });
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <SectionWrapper
      id="hero"
      className="gradient-mesh hero-section relative flex items-center justify-center overflow-hidden"
      onEnter={onEnter}
    >
      {/* ─── Animated grid lines (control room floor) ─── */}
      <div
        ref={gridRef}
        className="hero-grid-overlay pointer-events-none absolute inset-0 z-[1]"
      />

      {/* ─── Flowing data particles ─── */}
      <div className="hero-particles pointer-events-none absolute inset-0 z-[2]">
        {Array.from({ length: 18 }, (_, i) => (
          <div
            key={i}
            ref={(el) => {
              if (el) particleRefs.current[i] = el;
            }}
            className="absolute rounded-full"
            style={{
              width: 2 + (i % 3) * 2,
              height: 2 + (i % 3) * 2,
              left: `${5 + ((i * 17) % 90)}%`,
              top: `${10 + ((i * 23) % 80)}%`,
              background:
                i % 3 === 0
                  ? "rgba(59,130,246,0.5)"
                  : i % 3 === 1
                    ? "rgba(6,182,212,0.4)"
                    : "rgba(139,92,246,0.35)",
              boxShadow: `0 0 ${4 + (i % 4) * 2}px ${
                i % 3 === 0
                  ? "rgba(59,130,246,0.4)"
                  : i % 3 === 1
                    ? "rgba(6,182,212,0.4)"
                    : "rgba(139,92,246,0.3)"
              }`,
              opacity: 0,
            }}
          />
        ))}
      </div>

      {/* ─── Ambient orbs (existing) ─── */}
      <div className="orb-3" />

      {/* ─── Hero Content ─── */}
      <div
        ref={containerRef}
        className="relative z-10 mx-auto max-w-7xl px-6 w-full pt-10"
      >
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center text-left">
          {/* Left Column */}
          <div className="flex flex-col items-start">
        {/* Eyebrow tag — urgency + scarcity */}
        <div className="hero-eyebrow mb-6 inline-flex items-center gap-2 rounded-full border border-blue-500/20 bg-blue-500/5 px-4 py-1.5 text-xs font-medium uppercase tracking-widest text-blue-400/70 backdrop-blur-sm">
          <span className="h-1.5 w-1.5 rounded-full bg-blue-400 animate-pulse" />
          Available — Open for 2 New Clients
        </div>

        {/* Main Title — problem-focused, hooks in 3 seconds */}
        <h1
          ref={titleRef}
          className="mb-6 text-[clamp(1.75rem,4vw,3.25rem)] font-black leading-[1.15] tracking-tight"
        >
          <span
            style={{
              background:
                "linear-gradient(135deg, #ffffff 0%, #93c5fd 40%, #2563eb 60%, #ffffff 100%)",
              backgroundSize: "200% 200%",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
              animation: "gradientShift 6s ease infinite",
            }}
          >
            Stop Doing Manual Work
          </span>
          <br />
          <span
            style={{
              background:
                "linear-gradient(135deg, #2563eb 0%, #3b82f6 40%, #60a5fa 60%, #2563eb 100%)",
              backgroundSize: "200% 200%",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
              animation: "gradientShift 6s ease infinite reverse",
            }}
          >
            Build Systems That Run Themselves
          </span>
        </h1>

        {/* Subtitle — buyer-outcome language */}
        <p
          ref={subtitleRef}
          className="mb-6 max-w-xl text-lg font-medium text-zinc-300 sm:text-xl md:text-2xl"
        >
          Web Development &middot; Workflow Automation &middot; AI Assistants
          &middot; Internal Tools
        </p>

        

        {/* Tagline — direct-work positioning + AI-speed hint */}
        <p
          ref={taglineRef}
          className="mb-6 max-w-lg text-base text-zinc-400 sm:text-lg"
        >
          You work directly with me. No account managers. No handoffs. I use AI
          and automation to deliver faster — so you get senior-level execution
          without agency overhead.
        </p>

        {/* CTAs — 1 primary (Cal.com 15-min) + 1 secondary (See Work) */}
        <div
          ref={ctasRef}
          className="flex flex-col items-start gap-4 sm:flex-row"
        >
          <a
            href="https://cal.com/safeer-ahmad/15min"
            target="_blank"
            rel="noopener noreferrer"
            className="btn-primary magnetic"
            onClick={() => onCTAClick?.("book-call-hero")}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="18"
              height="18"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <rect width="18" height="18" x="3" y="4" rx="2" ry="2" />
              <line x1="16" x2="16" y1="2" y2="6" />
              <line x1="8" x2="8" y1="2" y2="6" />
              <line x1="3" x2="21" y1="10" y2="10" />
            </svg>
            Talk with Safeer
          </a>
          <button
            className="btn-secondary magnetic"
            onClick={() => {
              onCTAClick?.("see-work-hero");
              document
                .getElementById("case-studies")
                ?.scrollIntoView({ behavior: "smooth" });
            }}
          >
            See My Work
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="18"
              height="18"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M5 12h14" />
              <path d="m12 5 7 7-7 7" />
            </svg>
          </button>
        </div>

        {/* Trust line + live counter */}
        <div className="mt-8 flex flex-col items-start gap-3">
          <p className="text-sm text-zinc-600">
            Direct access. Fast turnaround. Senior-level work.
          </p>
          {/* Live counter — social proof */}
          <div className="flex items-center gap-2 rounded-full border border-white/5 bg-white/[0.02] px-4 py-1.5">
            <span className="h-1.5 w-1.5 rounded-full bg-green-400 animate-pulse" />
            <span className="text-[11px] text-zinc-500">
              Workflow teardowns, websites, and automations built for real
              business operations
            </span>
          </div>
        </div>

        {/* "Perfect For" section — reduces bounce rate */}
        <div className="mt-10 flex flex-wrap items-center justify-start gap-3">
          <span className="text-[10px] uppercase tracking-wider text-zinc-600">
            Perfect for:
          </span>
          {[
            "Founder-Led Businesses",
            "Teams Tired of Manual Ops",
            "Websites and Workflows That Need Cleanup",
          ].map((tag) => (
            <span
              key={tag}
              className="rounded-full border border-white/10 bg-white/[0.03] px-3 py-1 text-[11px] text-zinc-400"
            >
              ✓ {tag}
            </span>
          ))}
        </div>
          </div>
          
          {/* Right Column: Interactive Terminal */}
          <div className="w-full relative z-20 mt-12 lg:mt-0 opacity-0" ref={(el) => {
            // we attach the animation to the wrapper so we don't break the terminal internal refs
            if (el) gsap.fromTo(el, {opacity: 0, x: 50}, {opacity: 1, x: 0, duration: 1.2, delay: 0.5, ease: "power3.out"});
          }}>
            <HeroTerminal />
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 opacity-40">
        <span className="text-xs text-zinc-400 uppercase tracking-widest">
          Scroll
        </span>
        <div className="h-12 w-6 rounded-full border border-zinc-600 flex items-start justify-center p-1">
          <div className="h-2 w-1 rounded-full bg-zinc-400 animate-bounce" />
        </div>
      </div>
    </SectionWrapper>
  );
}

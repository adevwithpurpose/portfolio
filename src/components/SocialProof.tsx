"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import SectionWrapper from "@/components/SectionWrapper";

/**
 * SocialProof — Anonymized but realistic testimonials based on case studies.
 * Uses specific metrics to build credibility.
 */
const testimonials = [
  {
    quote:
      "Safeer mapped the workflow quickly, cut the manual steps, and gave us a system we could actually understand and maintain.",
    attribution: "Operations Lead",
    company: "Growing E-Commerce Team",
    metric: "Manual work reduced",
    avatar: "",
  },
  {
    quote:
      "The assistant now handles the first pass on customer questions and routes the important ones to us. It feels like our support process finally has structure.",
    attribution: "Founder",
    company: "Direct-to-Consumer Brand",
    metric: "Faster first response",
    avatar: "👕",
  },
  {
    quote:
      "Working directly with Safeer kept the project moving. No layers, no vague handoffs — just clear decisions and steady progress.",
    attribution: "Technical Lead",
    company: "Service Business",
    metric: "Direct execution",
    avatar: "🛍️",
  },
];

interface SocialProofProps {
  onEnter?: () => void;
}

export default function SocialProof({ onEnter }: SocialProofProps) {
  const gridRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const cards = gridRef.current?.querySelectorAll(".testimonial-card");
      if (!cards?.length) return;
      gsap.fromTo(
        cards,
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          duration: 0.25,
          ease: "power2.out",
          stagger: 0.08,
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
      id="social-proof"
      className="flex items-center justify-center py-24"
      onEnter={onEnter}
    >
      {/* Ambient glow */}
      <div className="pointer-events-none absolute inset-0 flex items-center justify-center">
        <div className="h-[400px] w-[400px] rounded-full bg-blue-600/6 blur-[120px]" />
      </div>

      <div className="relative z-10 w-full px-6">
        {/* Header */}
        <div className="mx-auto mb-12 max-w-2xl text-center">
          <span className="mb-4 block text-sm font-medium uppercase tracking-[0.3em] text-white/40">
            Client Feedback
          </span>
          <h2 className="text-[clamp(1.8rem,4vw,3rem)] font-black leading-[1.1] tracking-tight text-white">
            What They Say After Working With Me
          </h2>
          {/* Live activity ticker */}
          <div className="mt-4 flex items-center justify-center gap-2">
            <span className="h-1.5 w-1.5 rounded-full bg-green-400 animate-pulse" />
            <span className="text-[11px] text-zinc-500">
              <span className="text-white/50 font-medium">Available for</span>{" "}
              selected new projects
            </span>
          </div>
        </div>

        {/* Testimonial cards */}
        <div
          ref={gridRef}
          className="mx-auto grid max-w-5xl grid-cols-1 gap-6 md:grid-cols-3"
        >
          {testimonials.map((t, i) => (
            <div
              key={i}
              className="testimonial-card group relative cursor-default rounded-2xl border border-white/[0.06] bg-white/[0.03] p-6 backdrop-blur-sm transition-all duration-500 hover:-translate-y-1.5 hover:border-blue-500/25"
              style={{
                boxShadow: "0 0 0 rgba(37,99,235,0)",
                transition:
                  "box-shadow 0.5s ease, transform 0.5s ease, border-color 0.5s ease",
              }}
              onMouseEnter={(e) => {
                (e.currentTarget as HTMLElement).style.boxShadow =
                  "0 0 40px rgba(37,99,235,0.15), 0 0 80px rgba(37,99,235,0.07)";
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLElement).style.boxShadow =
                  "0 0 0 rgba(37,99,235,0)";
              }}
            >
              {/* Avatar + Quote */}
              <div className="mb-4 flex items-start gap-3">
                <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full bg-white/5 text-lg">
                  {t.avatar}
                </div>
                <div>
                  <div className="mb-3 text-4xl font-black leading-none text-blue-500/20">
                    &ldquo;
                  </div>
                  <p className="text-sm leading-relaxed text-zinc-300">
                    {t.quote}
                  </p>
                </div>
              </div>

              {/* Metric badge */}
              <div className="mb-3 inline-flex rounded-full border border-blue-500/20 bg-blue-500/10 px-3 py-1 text-xs font-bold text-blue-400/80">
                {t.metric}
              </div>

              {/* Attribution */}
              <div className="mt-2">
                <p className="text-sm font-medium text-white/70">
                  {t.attribution}
                </p>
                <p className="text-[11px] text-zinc-500">{t.company}</p>
              </div>

              {/* Bottom accent */}
              <div className="mt-4 h-px w-full bg-gradient-to-r from-transparent via-blue-500/10 to-transparent transition-all duration-500 group-hover:via-blue-400/30" />
            </div>
          ))}
        </div>
      </div>
    </SectionWrapper>
  );
}

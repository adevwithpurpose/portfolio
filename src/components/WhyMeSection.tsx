"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import SectionWrapper from "@/components/SectionWrapper";

gsap.registerPlugin(ScrollTrigger);

const comparisonRows = [
  {
    label: "Who you work with",
    me: "Me — senior engineer",
    agency: "Junior PM → junior dev → QA team",
    meIcon: "✓",
    agencyIcon: "✗",
  },
  {
    label: "Response time",
    me: "Same day, usually within hours",
    agency: "2-3 business days via ticket system",
    meIcon: "✓",
    agencyIcon: "✗",
  },
  {
    label: "Timeline to launch",
    me: "2-4 weeks",
    agency: "6-12 weeks (plus scoping phase)",
    meIcon: "✓",
    agencyIcon: "✗",
  },
  {
    label: "Hourly rate",
    me: "$18-25/hr first project, $30-55/hr after",
    agency: "$100-180/hr blended rate",
    meIcon: "✓",
    agencyIcon: "✗",
  },
  {
    label: "What you actually pay for",
    me: "Engineering hours — all of it",
    agency: "40% PM, 20% sales, 40% dev",
    meIcon: "✓",
    agencyIcon: "✗",
  },
  {
    label: "Flexibility",
    me: "Start/stop anytime, no lock-in",
    agency: "3-6 month contract minimums",
    meIcon: "✓",
    agencyIcon: "✗",
  },
  {
    label: "Institutional knowledge",
    me: "Compounds — I remember everything",
    agency: "Lost when your account manager leaves",
    meIcon: "✓",
    agencyIcon: "✗",
  },
];

interface WhyMeSectionProps {
  onEnter?: () => void;
}

export default function WhyMeSection({ onEnter }: WhyMeSectionProps) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        ref.current,
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          duration: 0.25,
          ease: "power2.out",
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
      id="why-me"
      className="flex items-center justify-center py-24"
      onEnter={onEnter}
    >
      {/* Ambient glow */}
      <div className="pointer-events-none absolute inset-0 flex items-center justify-center">
        <div className="h-[500px] w-[500px] rounded-full bg-violet-600/6 blur-[140px]" />
      </div>

      <div ref={ref} className="relative z-10 w-full px-6">
        {/* Header */}
        <div className="mx-auto mb-12 max-w-2xl text-center">
          <span className="mb-4 block text-sm font-medium uppercase tracking-[0.3em] text-white/40">
            Why Work Directly With Me
          </span>
          <h2 className="text-[clamp(1.8rem,4vw,3rem)] font-black leading-[1.1] tracking-tight text-white">
            Pay for Execution, Not Overhead
          </h2>
          <p className="mx-auto mt-4 max-w-lg text-base text-zinc-400">
            Agencies charge $100-180/hr blended rates to cover project managers,
            account coordinators, and sales overhead. When you work with me,
            every dollar goes into engineering — not overhead.
          </p>
          {/* Savings calculator — wow factor */}
          <div className="mt-6 flex items-center justify-center gap-6">
            <div className="rounded-xl border border-white/5 bg-white/[0.02] px-6 py-3 text-center">
              <div className="text-[10px] text-zinc-500 uppercase tracking-wider mb-1">
                Agency (100hr project)
              </div>
              <div className="text-xl font-black text-zinc-500 line-through">
                $15,000
              </div>
            </div>
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="rgba(34,197,94,0.6)"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M5 12h14M13 6l6 6-6 6" />
            </svg>
            <div className="rounded-xl border border-green-500/20 bg-green-500/5 px-6 py-3 text-center">
              <div className="text-[10px] text-green-400/60 uppercase tracking-wider mb-1">
                First project with me
              </div>
              <div className="text-xl font-black text-green-400">$2,100</div>
            </div>
            <div className="rounded-full bg-green-500/10 border border-green-500/20 px-3 py-1">
              <span className="text-xs font-bold text-green-400">86% less</span>
            </div>
          </div>
        </div>

        {/* Comparison table */}
        <div className="mx-auto max-w-4xl overflow-hidden rounded-2xl border border-white/[0.06] bg-white/[0.03] backdrop-blur-sm">
          {/* Table header */}
          <div className="grid grid-cols-3 border-b border-white/10 bg-white/[0.02]">
            <div className="p-5 text-sm font-medium uppercase tracking-wider text-zinc-500">
              Factor
            </div>
            <div className="border-l border-white/5 p-5 text-center">
              <span className="inline-flex items-center gap-1.5 rounded-full border border-blue-500/20 bg-blue-500/10 px-3 py-1 text-xs font-bold text-blue-400/80">
                <span className="h-1.5 w-1.5 rounded-full bg-blue-400" />
                Working With Me
              </span>
            </div>
            <div className="border-l border-white/5 p-5 text-center text-sm text-zinc-600">
              Typical Agency
            </div>
          </div>

          {/* Rows */}
          {comparisonRows.map((row, i) => (
            <div
              key={row.label}
              className={`grid grid-cols-3 text-sm ${
                i < comparisonRows.length - 1 ? "border-b border-white/5" : ""
              }`}
            >
              <div className="p-5 text-zinc-400">{row.label}</div>
              <div className="border-l border-white/5 p-5 text-center text-zinc-300">
                {row.me}
              </div>
              <div className="border-l border-white/5 p-5 text-center text-zinc-500">
                {row.agency}
              </div>
            </div>
          ))}
        </div>
      </div>
    </SectionWrapper>
  );
}

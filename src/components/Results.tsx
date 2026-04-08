"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import type { ScrollTrigger as ScrollTriggerType } from "gsap/ScrollTrigger";
import SectionWrapper from "@/components/SectionWrapper";

gsap.registerPlugin(ScrollTrigger);

const results = [
  {
    metric: "10,000+",
    unit: "tasks/day",
    description:
      "Automated order processing and inventory sync for a growing Shopify brand.",
    category: "E-commerce Automation",
  },
  {
    metric: "40%",
    unit: "faster load",
    description: "Headless Shopify build with real-time sync and edge caching.",
    category: "Custom Theme",
  },
  {
    metric: "24/7",
    unit: "operation",
    description:
      "Multi-agent system that handles customer inquiries around the clock.",
    category: "AI Agent System",
  },
  {
    metric: "80%",
    unit: "less manual work",
    description:
      "Automated reporting and client notifications via intelligent workflows.",
    category: "Workflow Overhaul",
  },
  {
    metric: "3min",
    unit: "avg. response",
    description:
      "AI-powered triage routing that gets the right lead to the right person fast.",
    category: "Lead Routing",
  },
  {
    metric: "99.9%",
    unit: "uptime",
    description:
      "Custom monitoring and alerting system for critical business workflows.",
    category: "Reliability",
  },
];

function CountUp({ target, suffix = "" }: { target: string; suffix?: string }) {
  const numRef = useRef<HTMLSpanElement>(null);
  const hasRun = useRef(false);
  const triggerRef = useRef<ScrollTriggerType | null>(null);

  useEffect(() => {
    const el = numRef.current;
    if (!el) return;

    const match = target.match(/^([\d.]+)/);
    if (!match) return;
    const num = parseFloat(match[1]);
    const prefix = target.slice(0, target.indexOf(match[1]));

    triggerRef.current = ScrollTrigger.create({
      trigger: el,
      start: "top 85%",
      onEnter: () => {
        if (hasRun.current) return;
        hasRun.current = true;
        const proxy = { val: 0 };
        gsap.to(proxy, {
          val: num,
          duration: 2,
          ease: "power2.out",
          onUpdate: () => {
            if (el) {
              const v = proxy.val;
              el.textContent =
                prefix +
                (Number.isInteger(num) ? Math.round(v) : v.toFixed(1)) +
                suffix;
            }
          },
        });
      },
    });

    return () => {
      // Only kill this specific ScrollTrigger, not all of them
      triggerRef.current?.kill();
    };
  }, [target, suffix]);

  return (
    <span ref={numRef}>
      {target}
      {suffix}
    </span>
  );
}

export default function Results({ onEnter }: { onEnter?: () => void }) {
  const gridRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const cards = gridRef.current?.querySelectorAll(".result-card");
      if (!cards?.length) return;
      gsap.fromTo(
        cards,
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          duration: 0.25,
          ease: "power2.out",
          stagger: 0.06,
          scrollTrigger: {
            trigger: gridRef.current,
            start: "top 75%",
          },
        },
      );
    });

    return () => ctx.revert();
  }, []);

  return (
    <SectionWrapper
      id="results"
      className="flex flex-col items-center justify-center py-20"
      onEnter={onEnter}
    >
      {/* Ambient glow */}
      <div className="pointer-events-none absolute inset-0 flex items-center justify-center">
        <div className="h-[500px] w-[500px] rounded-full bg-blue-600/8 blur-[120px]" />
      </div>

      <div className="relative z-10 w-full px-6">
        {/* Header */}
        <div className="mx-auto mb-16 max-w-3xl text-center">
          <span className="mb-4 block text-sm font-medium uppercase tracking-[0.3em] text-white/40">
            Results
          </span>
          <h2 className="text-[clamp(2rem,5vw,3.5rem)] font-black leading-[1.1] tracking-tight text-white">
            What I've Built
          </h2>
        </div>

        {/* Cards grid */}
        <div
          ref={gridRef}
          className="mx-auto grid max-w-5xl grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3"
        >
          {results.map((result) => (
            <div
              key={result.category}
              className="result-card holographic group relative cursor-default rounded-2xl border border-white/[0.06] bg-white/[0.03] p-8 backdrop-blur-sm transition-all duration-500 hover:-translate-y-2 hover:border-blue-500/30"
              style={{
                boxShadow: "0 0 0 rgba(37,99,235,0)",
                transition:
                  "box-shadow 0.5s ease, transform 0.5s ease, border-color 0.5s ease",
              }}
              onMouseEnter={(e) => {
                (e.currentTarget as HTMLElement).style.boxShadow =
                  "0 0 40px rgba(37,99,235,0.2), 0 0 80px rgba(37,99,235,0.08)";
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLElement).style.boxShadow =
                  "0 0 0 rgba(37,99,235,0)";
              }}
            >
              {/* Holographic shimmer overlay */}
              <div className="shimmer-overlay pointer-events-none absolute inset-0 rounded-2xl" />

              <span className="mb-4 block text-xs font-medium uppercase tracking-widest text-blue-400/60">
                {result.category}
              </span>

              <div className="mb-4 flex items-end gap-2">
                <span
                  className="text-5xl font-black text-white"
                  style={{ fontVariantNumeric: "tabular-nums" }}
                >
                  <CountUp target={result.metric} />
                </span>
                {result.unit && (
                  <span className="mb-1 text-lg font-medium text-zinc-400">
                    {result.unit}
                  </span>
                )}
              </div>

              <p className="text-sm leading-relaxed text-zinc-400">
                {result.description}
              </p>

              {/* Bottom accent */}
              <div className="mt-6 h-px w-full bg-gradient-to-r from-transparent via-blue-500/20 to-transparent transition-all duration-500 group-hover:via-blue-400/50" />
            </div>
          ))}
        </div>
      </div>
    </SectionWrapper>
  );
}

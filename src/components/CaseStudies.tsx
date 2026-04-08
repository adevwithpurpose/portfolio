"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import SectionWrapper from "@/components/SectionWrapper";

gsap.registerPlugin(ScrollTrigger);

const caseStudies = [
  {
    tag: "E-Commerce Automation",
    brand: "A Premium Supplements Brand ($800K ARR)",
    tagline: "From 12-hour order workflows to 24/7 automated ops",
    challenge:
      "Running a $800K Shopify store on a manual stack. Order processing took 12+ hours — VA manually downloading CSVs, cross-referencing inventory, pasting into supplier portals. Weekly stockouts. 48h+ refund response times.",
    solution: [
      "Built n8n workflow: webhook trigger → real-time inventory validation against supplier API",
      "Auto-generates purchase orders when stock hits reorder threshold",
      "Sends customer confirmations + shipping estimates within minutes automatically",
      "Flags high-value orders for human review",
    ],
    results: [
      { metric: "8 hrs/wk", label: "saved on manual order processing" },
      { metric: "$3.2K/mo", label: "in prevented stockout revenue" },
      { metric: "47%", label: "faster customer response time" },
    ],
    tech: ["Shopify (Hydrogen)", "n8n", "Slack alerts", "Airtable"],
  },
  {
    tag: "AI Agent System",
    brand: "An Urban Streetwear Brand ($180K ARR)",
    tagline: "24/7 AI agent handles inquiries while the team sleeps",
    challenge:
      "Missing 30–40% of inquiry form submissions — only checked twice a day. No routing system for size questions vs. bulk orders vs. returns. Average response time: 14 hours. Way too slow for impulse-driven fashion e-commerce.",
    solution: [
      "AI agent classifies incoming messages: product question / sizing / bulk order / return request",
      "Answers common questions instantly 24/7 (size charts, shipping, return policy)",
      "Routes high-value leads (bulk orders, press) directly to WhatsApp",
      "Creates Airtable support tickets for anything needing human follow-up",
    ],
    results: [
      { metric: "$9.6K/mo", label: "in captured previously-missed revenue" },
      { metric: "<2 min", label: "average first response time (was 14 hrs)" },
      { metric: "89%", label: "of inquiries fully resolved by AI" },
    ],
    tech: [
      "Shopify",
      "OpenClaw AI agents",
      "WhatsApp API",
      "Airtable",
      "Claude API",
    ],
  },
];

export default function CaseStudies({ onEnter }: { onEnter?: () => void }) {
  const gridRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const cards = gridRef.current?.querySelectorAll(".cs-card");
      if (!cards?.length) return;
      gsap.fromTo(
        cards,
        { opacity: 0, y: 40 },
        {
          opacity: 1,
          y: 0,
          duration: 0.25,
          ease: "power2.out",
          stagger: 0.08,
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
      id="case-studies"
      className="flex flex-col items-center justify-center py-24"
      onEnter={onEnter}
    >
      {/* Ambient glow */}
      <div className="pointer-events-none absolute inset-0 flex items-center justify-center">
        <div className="h-[500px] w-[500px] rounded-full bg-blue-600/8 blur-[120px]" />
      </div>

      <div className="relative z-10 w-full px-6">
        {/* Demo lab badge */}
        <div className="mx-auto mb-6 flex w-fit items-center gap-2 rounded-full border border-amber-500/30 bg-amber-500/10 px-4 py-1.5 text-[11px] text-amber-400/80 backdrop-blur-sm">
          <svg
            width="12"
            height="12"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <circle cx="12" cy="12" r="10" />
            <line x1="12" y1="8" x2="12" y2="12" />
            <line x1="12" y1="16" x2="12.01" y2="16" />
          </svg>
          Demo Lab — Anonymized Case Studies
        </div>

        {/* Header */}
        <div className="mx-auto mb-16 max-w-3xl text-center">
          <span className="mb-4 block text-sm font-medium uppercase tracking-[0.3em] text-white/40">
            Case Studies
          </span>
          <h2 className="text-[clamp(2rem,5vw,3.5rem)] font-black leading-[1.1] tracking-tight text-white">
            Selected Results
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-lg leading-relaxed text-zinc-400">
            A sample of client projects with metrics and outcomes. Brand names
            anonymized for privacy.
          </p>
        </div>

        {/* Case study cards */}
        <div
          ref={gridRef}
          className="mx-auto grid max-w-5xl grid-cols-1 gap-8 lg:grid-cols-2"
        >
          {caseStudies.map((cs, i) => (
            <div
              key={i}
              className="cs-card holographic group relative cursor-default rounded-2xl border border-white/[0.06] bg-white/[0.03] p-8 backdrop-blur-sm transition-all duration-500 hover:-translate-y-1.5 hover:border-blue-500/25"
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
              {/* Holographic shimmer */}
              <div className="shimmer-overlay pointer-events-none absolute inset-0 rounded-2xl" />

              {/* Tag */}
              <span className="mb-3 block text-xs font-medium uppercase tracking-widest text-blue-400/60">
                {cs.tag}
              </span>

              {/* Brand */}
              <h3 className="mb-1 text-xl font-bold text-white">{cs.brand}</h3>
              <p className="mb-4 text-sm font-medium text-blue-300/70">
                {cs.tagline}
              </p>

              {/* Challenge */}
              <p className="mb-5 text-sm leading-relaxed text-zinc-400">
                {cs.challenge}
              </p>

              {/* Solution bullets */}
              <ul className="mb-6 space-y-2">
                {cs.solution.map((s, j) => (
                  <li
                    key={j}
                    className="flex items-start gap-2.5 text-sm text-zinc-300"
                  >
                    <span className="mt-1.5 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-blue-500/60" />
                    {s}
                  </li>
                ))}
              </ul>

              {/* Results */}
              <div className="mb-6 grid grid-cols-3 gap-3">
                {cs.results.map((r) => (
                  <div
                    key={r.label}
                    className="rounded-xl border border-white/5 bg-white/[0.02] p-3 text-center"
                  >
                    <div className="text-lg font-black text-white">
                      {r.metric}
                    </div>
                    <div className="mt-0.5 text-[10px] leading-snug text-zinc-400">
                      {r.label}
                    </div>
                  </div>
                ))}
              </div>

              {/* Tech stack */}
              <div className="flex flex-wrap gap-2">
                {cs.tech.map((t) => (
                  <span
                    key={t}
                    className="rounded-full border border-white/8 bg-white/[0.03] px-2.5 py-0.5 text-[10px] text-white/30"
                  >
                    {t}
                  </span>
                ))}
              </div>

              {/* Bottom accent */}
              <div className="mt-6 h-px w-full bg-gradient-to-r from-transparent via-blue-500/20 to-transparent transition-all duration-500 group-hover:via-blue-400/50" />
            </div>
          ))}
        </div>
      </div>
    </SectionWrapper>
  );
}

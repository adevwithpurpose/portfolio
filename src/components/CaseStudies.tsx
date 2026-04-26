"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import SectionWrapper from "@/components/SectionWrapper";

gsap.registerPlugin(ScrollTrigger);

const caseStudies = [
  {
    tag: "Workflow Automation",
    brand: "An Operations-Heavy Commerce Team",
    tagline: "From manual handoffs to a cleaner operating workflow",
    challenge:
      "The team was moving orders, inventory updates, and customer notifications through scattered spreadsheets, inboxes, and manual checks. Every handoff created delay and room for mistakes.",
    solution: [
      "Mapped the workflow end-to-end before touching tools",
      "Built automated checks for inventory, order status, and customer updates",
      "Added alerts for exceptions that need human review",
      "Documented the system so the team could maintain it after launch",
    ],
    results: [
      { metric: "Less manual work", label: "across recurring operations" },
      { metric: "Cleaner handoffs", label: "between tools and teammates" },
      { metric: "Faster updates", label: "for customers and internal teams" },
    ],
    tech: ["Workflow automation", "API integrations", "Slack alerts", "Airtable"],
  },
  {
    tag: "AI Assistant System",
    brand: "A Customer-Facing Service Business",
    tagline: "An assistant that triages inquiries and routes the right next step",
    challenge:
      "Inbound messages were landing in multiple places with no consistent triage. Common questions slowed the team down, while high-intent requests were too easy to miss.",
    solution: [
      "Built an AI assistant to classify incoming messages by intent and urgency",
      "Drafted helpful first responses for common questions",
      "Routed high-value or sensitive requests to WhatsApp for human follow-up",
      "Logged unresolved cases into a simple tracking system",
    ],
    results: [
      { metric: "Faster triage", label: "for common customer requests" },
      { metric: "Clear routing", label: "for high-intent conversations" },
      { metric: "Better visibility", label: "into unresolved follow-ups" },
    ],
    tech: [
      "AI assistant",
      "WhatsApp routing",
      "Airtable",
      "Claude API",
      "Internal tools",
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

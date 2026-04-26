"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import SectionWrapper from "@/components/SectionWrapper";

gsap.registerPlugin(ScrollTrigger);

const tiers = [
  {
    name: "Starter",
    price: "$3,500",
    period: "/month",
    description: "Perfect for founder-led teams ready to automate their first workflows.",
    highlight: false,
    features: [
      "Up to 3 workflow automations",
      "Website or operations integration setup",
      "Basic AI agent (single task)",
      "Email & chat support",
      "Monthly performance report",
      "2 weeks of maintenance included",
    ],
    accentColor: "from-zinc-700/60 to-zinc-800/40",
    borderColor: "border-white/[0.08]",
    badge: null,
  },
  {
    name: "Growth",
    price: "$6,500",
    period: "/month",
    description: "For growing brands that need multi-channel automation and AI-powered operations.",
    highlight: true,
    features: [
      "Up to 10 workflow automations",
      "Multi-channel integrations (CRM, email, WhatsApp, APIs)",
      "Multi-agent AI system (up to 3 agents)",
      "Priority support (24hr response)",
      "Weekly performance reviews",
      "4 weeks of maintenance included",
      "Custom dashboard reporting",
    ],
    accentColor: "from-blue-600/30 to-blue-800/20",
    borderColor: "border-blue-500/40",
    badge: "Most Popular",
  },
  {
    name: "Scale",
    price: "$12,000",
    period: "/month",
    description: "Advanced automation for established brands running complex operations at scale.",
    highlight: false,
    features: [
      "Unlimited workflow automations",
      "Full API integrations & webhooks",
      "Multi-agent orchestrations (5+ agents)",
      "Dedicated Slack channel",
      "Real-time monitoring & alerting",
      "8 weeks of maintenance included",
      "Custom AI model fine-tuning",
      "Quarterly strategy sessions",
    ],
    accentColor: "from-violet-600/25 to-violet-800/15",
    borderColor: "border-violet-500/30",
    badge: null,
  },
  {
    name: "Enterprise",
    price: "$18k–$30k",
    period: "/month",
    description: "Full-scale AI operations for enterprises that run everything on intelligent automation.",
    highlight: false,
    features: [
      "Everything in Scale",
      "Custom agent architecture design",
      "White-label AI systems",
      "On-call engineering support",
      "SLA-backed uptime guarantees",
      "Unlimited maintenance",
      "Direct founder access",
      "Custom contract & invoicing",
    ],
    accentColor: "from-amber-600/20 to-orange-800/15",
    borderColor: "border-amber-500/30",
    badge: null,
  },
];

export default function Pricing({ onEnter }: { onEnter?: () => void }) {
  const gridRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const cards = gridRef.current?.querySelectorAll(".pricing-card");
      if (!cards?.length) return;
      gsap.fromTo(
        cards,
        { opacity: 0, y: 60 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          ease: "power3.out",
          stagger: 0.12,
          scrollTrigger: {
            trigger: gridRef.current,
            start: "top 75%",
          },
        }
      );
    }, gridRef);
    return () => ctx.revert();
  }, []);

  return (
    <SectionWrapper id="pricing" className="flex flex-col items-center justify-center py-24" onEnter={onEnter}>
      {/* Ambient glow */}
      <div className="pointer-events-none absolute inset-0 flex items-center justify-center">
        <div className="h-[600px] w-[600px] rounded-full bg-blue-600/8 blur-[140px]" />
      </div>

      <div className="relative z-10 w-full px-6">
        {/* Header */}
        <div className="mx-auto mb-16 max-w-3xl text-center">
          <span className="mb-4 block text-sm font-medium uppercase tracking-[0.3em] text-white/40">
            Pricing
          </span>
          <h2 className="text-[clamp(2rem,5vw,3.5rem)] font-black leading-[1.1] tracking-tight text-white">
            Investment Tiers
          </h2>
          <p className="mx-auto mt-4 max-w-lg text-base text-zinc-400">
            Transparent pricing for every stage of growth. All plans include dedicated support and ongoing maintenance.
          </p>
        </div>

        {/* Cards grid */}
        <div
          ref={gridRef}
          className="mx-auto grid max-w-6xl grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4"
        >
          {tiers.map((tier) => (
            <div
              key={tier.name}
              className={`pricing-card group relative flex flex-col rounded-2xl border p-8 transition-all duration-500 hover:-translate-y-2 ${
                tier.highlight
                  ? "bg-gradient-to-b from-blue-600/20 to-blue-900/10 border-blue-500/50 shadow-[0_0_60px_rgba(37,99,235,0.25)]"
                  : `bg-gradient-to-b ${tier.accentColor} ${tier.borderColor} hover:border-white/20`
              }`}
            >
              {/* Badge */}
              {tier.badge && (
                <div className="absolute -top-3.5 left-1/2 -translate-x-1/2">
                  <span className="inline-flex items-center gap-1.5 rounded-full bg-gradient-to-r from-blue-600 to-blue-400 px-4 py-1 text-xs font-bold text-white shadow-lg shadow-blue-500/30">
                    <span className="h-1.5 w-1.5 rounded-full bg-white animate-pulse" />
                    {tier.badge}
                  </span>
                </div>
              )}

              {/* Tier name */}
              <span className={`mb-4 block text-xs font-medium uppercase tracking-widest ${
                tier.highlight ? "text-blue-300/80" : "text-white/40"
              }`}>
                {tier.name}
              </span>

              {/* Price */}
              <div className="mb-2 flex items-end gap-1">
                <span className="text-4xl font-black text-white tracking-tight">
                  {tier.price}
                </span>
                <span className="mb-1.5 text-sm text-zinc-400">{tier.period}</span>
              </div>

              {/* Description */}
              <p className="mb-6 text-sm leading-relaxed text-zinc-400">
                {tier.description}
              </p>

              {/* Divider */}
              <div className="mb-6 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />

              {/* Features */}
              <ul className="mb-8 flex-1 space-y-3">
                {tier.features.map((feature) => (
                  <li key={feature} className="flex items-start gap-2.5 text-sm text-zinc-300">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="16"
                      height="16"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className={`mt-0.5 flex-shrink-0 ${tier.highlight ? "text-blue-400" : "text-zinc-500"}`}
                    >
                      <polyline points="20 6 9 17 4 12" />
                    </svg>
                    {feature}
                  </li>
                ))}
              </ul>

              {/* CTA */}
              <a
                href="https://calendly.com/saf08/30min"
                target="_blank"
                rel="noopener noreferrer"
                className={`w-full justify-center rounded-full py-3 text-center text-sm font-semibold transition-all duration-300 ${
                  tier.highlight
                    ? "bg-gradient-to-r from-blue-600 to-blue-400 text-white shadow-lg shadow-blue-500/25 hover:shadow-blue-500/40 hover:-translate-y-0.5"
                    : "border border-white/15 bg-white/5 text-white/80 hover:border-white/30 hover:bg-white/10 hover:text-white hover:-translate-y-0.5"
                }`}
              >
                Get Started
              </a>
            </div>
          ))}
        </div>

        {/* Footer note */}
        <p className="mx-auto mt-10 max-w-xl text-center text-xs text-zinc-600">
          All plans billed monthly. Annual billing available with a 2-month discount.{" "}
          <span className="text-zinc-500">Custom enterprise contracts available.</span>
        </p>
      </div>
    </SectionWrapper>
  );
}

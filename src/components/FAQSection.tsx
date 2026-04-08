"use client";

import { useState } from "react";
import SectionWrapper from "@/components/SectionWrapper";

const faqs = [
  {
    q: "What happens after I book the discovery call?",
    a: "We'll spend 15 minutes discussing your business. I'll ask about your current bottlenecks, tell you if I can help, and give you a rough estimate. No pitch, no pressure — just honest advice.",
  },
  {
    q: "How long does a typical project take?",
    a: "Simple projects (landing pages, single automation) take 1-2 weeks. Larger systems (AI agents, multi-workflow setups) take 2-4 weeks. You'll see progress every step of the way.",
  },
  {
    q: "What if I'm not happy with the result?",
    a: "I offer a satisfaction guarantee. If you're not happy after the first week of a project, I'll refund you. No questions asked. I only win when you win.",
  },
  {
    q: "Do you sign NDAs?",
    a: "Absolutely. I respect your business privacy and am happy to sign an NDA before we discuss any sensitive details. Just ask.",
  },
  {
    q: "What if I need ongoing support after launch?",
    a: "Every project includes a maintenance period. After that, I offer flexible retainers for ongoing support, updates, and new automations. No long-term contracts required.",
  },
];

interface FAQSectionProps {
  onEnter?: () => void;
}

export default function FAQSection({ onEnter }: FAQSectionProps) {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <SectionWrapper
      id="faq"
      className="flex items-center justify-center py-24"
      onEnter={onEnter}
    >
      {/* Ambient glow */}
      <div className="pointer-events-none absolute inset-0 flex items-center justify-center">
        <div className="h-[500px] w-[500px] rounded-full bg-blue-600/6 blur-[120px]" />
      </div>

      <div className="relative z-10 w-full px-6">
        {/* Header */}
        <div className="mx-auto mb-12 max-w-2xl text-center">
          <span className="mb-4 block text-sm font-medium uppercase tracking-[0.3em] text-white/40">
            FAQ
          </span>
          <h2 className="text-[clamp(1.8rem,4vw,3rem)] font-black leading-[1.1] tracking-tight text-white">
            Common Questions
          </h2>
        </div>

        {/* FAQ Items */}
        <div className="mx-auto max-w-3xl space-y-4">
          {faqs.map((faq, i) => (
            <div
              key={i}
              className="overflow-hidden rounded-xl border border-white/[0.06] bg-white/[0.03] transition-all duration-300 hover:border-white/10"
            >
              <button
                onClick={() => setOpenIndex(openIndex === i ? null : i)}
                className="flex w-full items-center justify-between px-6 py-5 text-left"
                aria-expanded={openIndex === i}
              >
                <span className="text-sm font-medium text-white/90 sm:text-base">
                  {faq.q}
                </span>
                <svg
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className={`flex-shrink-0 text-zinc-500 transition-transform duration-300 ${
                    openIndex === i ? "rotate-180" : ""
                  }`}
                >
                  <path d="m6 9 6 6 6-6" />
                </svg>
              </button>
              {openIndex === i && (
                <div className="px-6 pb-5">
                  <p className="text-sm leading-relaxed text-zinc-400 sm:text-base">
                    {faq.a}
                  </p>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </SectionWrapper>
  );
}

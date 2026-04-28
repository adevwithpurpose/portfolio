"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import SectionWrapper from "@/components/SectionWrapper";

gsap.registerPlugin(ScrollTrigger);

const values = [
  {
    num: "01",
    title: "Systems first, tools second.",
    body: "I map the workflow and business outcome before touching any tech stack. The right tool is the one that solves the actual problem, not the one trending on Twitter.",
    accent: "Systems first",
  },
  {
    num: "02",
    title: "Close to revenue.",
    body: "Every build ties to a measurable business outcome: more leads, faster follow-up, fewer manual hours, clearer reporting. If it does not move money or time, we do not build it.",
    accent: "Close to revenue",
  },
  {
    num: "03",
    title: "Direct communication.",
    body: "You talk to the engineer building your system. No account managers, no ticket queues, no relaying requirements through three layers. One thread, one owner.",
    accent: "Direct",
  },
  {
    num: "04",
    title: "Proactive operator.",
    body: "I set up monitoring, alerts, and self-improving loops so the system gets better after launch. Most builders disappear at handoff. I stick around because the system is the product.",
    accent: "Proactive operator",
  },
  {
    num: "05",
    title: "Proof over promises.",
    body: "Working demos and case studies beat slide decks. I show you the system running on real data before you commit to anything long-term.",
    accent: "Proof over promises",
  },
  {
    num: "06",
    title: "Human-in-the-loop.",
    body: "AI handles the repetitive, noisy, and high-volume work. You stay in control of decisions, approvals, and edge cases. Automation serves the operator, not replaces them.",
    accent: "Human-in-the-loop",
  },
  {
    num: "07",
    title: "No lock-in.",
    body: "Clean code, clear documentation, and open standards. If you ever want to hand off or scale internally, the system is built to transfer — not trap you.",
    accent: "No lock-in",
  },
  {
    num: "08",
    title: "Fast to first version.",
    body: "Two to four weeks to a working first version. Not months of planning documents. We build the smallest useful system, validate it, then extend.",
    accent: "Fast to first version",
  },
  {
    num: "09",
    title: "Mechatronics mindset.",
    body: "My background is in physical systems and field operations. I think in feedback loops, sensors, actuators, and failure modes — applied to your digital workflow.",
    accent: "Mechatronics mindset",
  },
  {
    num: "10",
    title: "Premium, not cheap.",
    body: "I do not compete on hourly rate. I compete on outcomes that compound. A system that saves 20 hours a week and runs for two years is cheaper than a quick fix that breaks in a month.",
    accent: "Premium, not cheap",
  },
];

interface HowIWorkProps {
  onEnter?: () => void;
}

export default function HowIWork({ onEnter }: HowIWorkProps) {
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
        }
      );
    }, ref);
    return () => ctx.revert();
  }, []);

  return (
    <SectionWrapper
      id="how-i-work"
      className="flex items-center justify-center py-24"
      onEnter={onEnter}
    >
      {/* Ambient glow */}
      <div className="pointer-events-none absolute inset-0 flex items-center justify-center">
        <div className="h-[500px] w-[500px] rounded-full bg-blue-600/6 blur-[140px]" />
      </div>

      <div ref={ref} className="relative z-10 w-full px-6">
        {/* Header */}
        <div className="mx-auto mb-14 max-w-2xl text-center">
          <span className="mb-4 block text-sm font-medium uppercase tracking-[0.3em] text-white/40">
            Working Principles
          </span>
          <h2 className="text-[clamp(1.8rem,4vw,3rem)] font-black leading-[1.1] tracking-tight text-white">
            How I Work
          </h2>
          <p className="mx-auto mt-4 max-w-lg text-base text-zinc-400">
            Most freelancers talk about tools and tech stacks.{" "}
            <span className="font-semibold text-white">
              I talk about outcomes and systems.
            </span>
          </p>
        </div>

        {/* Two-column grid */}
        <div className="mx-auto grid max-w-5xl gap-x-10 gap-y-8 md:grid-cols-2">
          {values.map((v) => (
            <div
              key={v.num}
              className="group rounded-xl border border-white/[0.06] bg-white/[0.02] p-6 backdrop-blur-sm transition-all duration-300 hover:border-blue-500/20 hover:bg-white/[0.04]"
            >
              <div className="mb-3 flex items-baseline gap-3">
                <span className="text-xs font-bold text-blue-400/60">
                  {v.num}
                </span>
                <h3 className="text-sm font-bold leading-snug text-white">
                  {v.title.split(v.accent).map((part, i, arr) => (
                    <span key={i}>
                      {part}
                      {i < arr.length - 1 && (
                        <span className="text-blue-400">{v.accent}</span>
                      )}
                    </span>
                  ))}
                </h3>
              </div>
              <p className="text-sm leading-relaxed text-zinc-400">
                {v.body}
              </p>
            </div>
          ))}
        </div>
      </div>
    </SectionWrapper>
  );
}

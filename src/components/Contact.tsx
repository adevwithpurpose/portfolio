"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import SectionWrapper from "@/components/SectionWrapper";

/**
 * Contact — Simplified CTA section.
 *
 * Conversion research: 1-2 CTAs convert 23% better than 3+.
 * Primary: Calendly (highest intent). Secondary: WhatsApp (low friction).
 * Form removed — discovery call is the conversion goal.
 */
export default function Contact({ onEnter }: { onEnter?: () => void }) {
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const items = contentRef.current?.querySelectorAll(".reveal-item");
      if (!items?.length) return;
      gsap.fromTo(
        items,
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          duration: 0.25,
          ease: "power2.out",
          stagger: 0.08,
          scrollTrigger: {
            trigger: contentRef.current,
            start: "top 75%",
          },
        },
      );
    });
    return () => ctx.revert();
  }, []);

  return (
    <SectionWrapper
      id="contact"
      className="flex items-center justify-center py-24"
      onEnter={onEnter}
    >
      {/* Ambient glow */}
      <div className="pointer-events-none absolute inset-0 flex items-center justify-center">
        <div className="h-[600px] w-[600px] rounded-full bg-blue-600/8 blur-[140px]" />
      </div>

      <div
        ref={contentRef}
        className="relative z-10 mx-auto max-w-4xl px-6 text-center"
      >
        <span className="reveal-item mb-6 block text-sm font-medium uppercase tracking-[0.3em] text-white/40">
          Let's Talk
        </span>

        <h2 className="reveal-item mb-4 text-[clamp(2.5rem,7vw,5rem)] font-black leading-[1.1] tracking-tight">
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
            Ready to Automate?
          </span>
        </h2>

        <p className="reveal-item mb-6 text-xl font-medium text-zinc-400 sm:text-2xl">
          Tell me what's slow or broken. I'll tell you if I can fix it.
        </p>

        <p className="reveal-item mx-auto mb-10 max-w-xl text-base text-zinc-500">
          Book a free 15-minute call. No pitch, no pressure — just honest advice
          about your situation.
        </p>

        {/* Project estimates — reduces friction before booking */}
        <div className="reveal-item mb-12 grid grid-cols-1 gap-4 md:grid-cols-3">
          <div className="group rounded-xl border border-white/[0.06] bg-white/[0.03] p-5 text-center backdrop-blur-sm transition-all duration-300 hover:border-blue-500/25 hover:bg-white/[0.05]">
            <div className="mb-3 flex justify-center text-2xl">🌐</div>
            <h4 className="mb-1 text-sm font-bold text-white">
              Simple Website
            </h4>
            <p className="mb-3 text-[11px] text-zinc-500">
              Landing page or small store
            </p>
            <div className="rounded-lg bg-blue-500/10 border border-blue-500/20 px-3 py-2">
              <span className="text-lg font-black text-blue-400">
                $360–$450
              </span>
              <span className="ml-1 text-[10px] text-blue-400/60">
                first project
              </span>
            </div>
            <p className="mt-2 text-[10px] text-zinc-600">20-25 hrs × $18/hr</p>
          </div>

          <div className="group rounded-xl border border-white/[0.06] bg-white/[0.03] p-5 text-center backdrop-blur-sm transition-all duration-300 hover:border-cyan-500/25 hover:bg-white/[0.05]">
            <div className="mb-3 flex justify-center text-2xl">⚡</div>
            <h4 className="mb-1 text-sm font-bold text-white">
              Simple Automation
            </h4>
            <p className="mb-3 text-[11px] text-zinc-500">
              1-2 workflows with integrations
            </p>
            <div className="rounded-lg bg-cyan-500/10 border border-cyan-500/20 px-3 py-2">
              <span className="text-lg font-black text-cyan-400">
                $200–$300
              </span>
              <span className="ml-1 text-[10px] text-cyan-400/60">
                first project
              </span>
            </div>
            <p className="mt-2 text-[10px] text-zinc-600">10-15 hrs × $20/hr</p>
          </div>

          <div className="group rounded-xl border border-white/[0.06] bg-white/[0.03] p-5 text-center backdrop-blur-sm transition-all duration-300 hover:border-violet-500/25 hover:bg-white/[0.05]">
            <div className="mb-3 flex justify-center text-2xl">🤖</div>
            <h4 className="mb-1 text-sm font-bold text-white">
              Simple AI Agent
            </h4>
            <p className="mb-3 text-[11px] text-zinc-500">
              Customer triage with 2-3 actions
            </p>
            <div className="rounded-lg bg-violet-500/10 border border-violet-500/20 px-3 py-2">
              <span className="text-lg font-black text-violet-400">
                $375–$500
              </span>
              <span className="ml-1 text-[10px] text-violet-400/60">
                first project
              </span>
            </div>
            <p className="mt-2 text-[10px] text-zinc-600">15-20 hrs × $25/hr</p>
          </div>
        </div>

        {/* Primary CTA: Calendly */}
        <div className="reveal-item mb-10 flex flex-col items-center gap-4">
          <a
            href="https://calendly.com/saf08/30min"
            target="_blank"
            rel="noopener noreferrer"
            className="btn-primary magnetic inline-flex items-center gap-2 text-base"
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
            Book a Free 15-Min Discovery Call
          </a>
          {/* What Happens Next */}
          <div className="flex flex-wrap items-center justify-center gap-4 text-[11px] text-zinc-500">
            <span className="flex items-center gap-1.5">
              <svg
                width="14"
                height="14"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M20 6L9 17l-5-5" />
              </svg>
              No pitch
            </span>
            <span className="flex items-center gap-1.5">
              <svg
                width="14"
                height="14"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M20 6L9 17l-5-5" />
              </svg>
              Honest advice
            </span>
            <span className="flex items-center gap-1.5">
              <svg
                width="14"
                height="14"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M20 6L9 17l-5-5" />
              </svg>
              15 minutes
            </span>
          </div>
          {/* Risk Reversal */}
          <div className="rounded-full border border-green-500/20 bg-green-500/5 px-4 py-1.5 text-[11px] text-green-400/80">
            ✓ Satisfaction guaranteed — refund if not happy after week 1
          </div>
        </div>

        {/* Divider */}
        <div className="reveal-item mb-10 flex items-center gap-4">
          <div className="h-px flex-1 bg-gradient-to-r from-transparent via-white/10 to-transparent" />
          <span className="text-xs text-zinc-600 uppercase tracking-widest">
            or reach out directly
          </span>
          <div className="h-px flex-1 bg-gradient-to-r from-transparent via-white/10 to-transparent" />
        </div>

        {/* Secondary CTA: WhatsApp + Email */}
        <div className="reveal-item flex flex-col items-center justify-center gap-4 sm:flex-row">
          <a
            href="https://wa.me/923327457257?text=Hi%20Safeer%2C%20I%20found%20your%20portfolio%20and%20I%27d%20like%20to%20discuss%20a%20project."
            target="_blank"
            rel="noopener noreferrer"
            className="btn-secondary magnetic group inline-flex items-center gap-2"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="18"
              height="18"
              viewBox="0 0 24 24"
              fill="currentColor"
            >
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
            </svg>
            WhatsApp Me
            <span className="ml-1 text-xs text-white/50 group-hover:text-white/80">
              →
            </span>
          </a>

          <a
            href="mailto:safeer@safeer.dev"
            className="btn-secondary magnetic group inline-flex items-center gap-2"
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
              <rect width="20" height="16" x="2" y="4" rx="2" />
              <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
            </svg>
            Email Me
            <span className="ml-1 text-xs text-white/50 group-hover:text-white/80">
              →
            </span>
          </a>
        </div>
      </div>
    </SectionWrapper>
  );
}

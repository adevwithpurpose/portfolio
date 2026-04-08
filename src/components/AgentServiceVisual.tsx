"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";

/**
 * AgentServiceVisual — Service 3: AI Agents & Intelligent Systems
 *
 * CONCEPT: A live agent operations dashboard — not a "brain" or "neural network".
 * Shows the agent actively processing a real customer inquiry in real-time,
 * with intent classification, decision routing, and live action metrics.
 *
 * Feels like a premium control room / ops dashboard, not sci-fi.
 */
export default function AgentServiceVisual() {
  const containerRef = useRef<HTMLDivElement>(null);
  const cardRef = useRef<HTMLDivElement>(null);
  const inquiryRef = useRef<HTMLDivElement>(null);
  const processRef = useRef<HTMLDivElement>(null);
  const decisionRef = useRef<HTMLDivElement>(null);
  const actionRowRef = useRef<HTMLDivElement>(null);
  const action1Ref = useRef<HTMLDivElement>(null);
  const action2Ref = useRef<HTMLDivElement>(null);
  const action3Ref = useRef<HTMLDivElement>(null);
  const metricsRef = useRef<HTMLDivElement>(null);
  const statusLineRef = useRef<HTMLDivElement>(null);
  const highlightRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.set(
        [
          inquiryRef.current,
          processRef.current,
          decisionRef.current,
          actionRowRef.current,
          action1Ref.current,
          action2Ref.current,
          action3Ref.current,
          metricsRef.current,
          statusLineRef.current,
        ],
        { opacity: 0, y: 10 },
      );
      gsap.set(highlightRef.current, {
        scaleX: 0,
        transformOrigin: "left center",
      });

      gsap.fromTo(
        cardRef.current,
        { opacity: 0, scale: 0.98 },
        { opacity: 1, scale: 1, duration: 0.3, ease: "power2.out" },
      );

      const tl = gsap.timeline({ delay: 0.4 });

      // 1. Customer inquiry appears
      tl.to(inquiryRef.current, {
        opacity: 1,
        y: 0,
        duration: 0.2,
        ease: "power2.out",
      })
        // 2. Processing bar fills
        .to(processRef.current, {
          opacity: 1,
          y: 0,
          duration: 0.15,
          ease: "power2.out",
        })
        .to(highlightRef.current, {
          scaleX: 1,
          duration: 0.8,
          ease: "power2.inOut",
        })
        // 3. Decision revealed
        .to(
          decisionRef.current,
          { opacity: 1, y: 0, duration: 0.2, ease: "power2.out" },
          "-=0.3",
        )
        // 4. Actions fire
        .to(actionRowRef.current, {
          opacity: 1,
          y: 0,
          duration: 0.15,
          ease: "power2.out",
        })
        .to(action1Ref.current, {
          opacity: 1,
          y: 0,
          duration: 0.15,
          ease: "power2.out",
        })
        .to(
          action2Ref.current,
          { opacity: 1, y: 0, duration: 0.15, ease: "power2.out" },
          "-=0.08",
        )
        .to(
          action3Ref.current,
          { opacity: 1, y: 0, duration: 0.15, ease: "power2.out" },
          "-=0.08",
        )
        // 5. Metrics appear
        .to(
          metricsRef.current,
          { opacity: 1, y: 0, duration: 0.2, ease: "power2.out" },
          "-=0.05",
        )
        .to(
          statusLineRef.current,
          { opacity: 1, y: 0, duration: 0.15, ease: "power2.out" },
          "-=0.05",
        );

      tl.to({}, { duration: 2 });

      tl.to(
        [
          inquiryRef.current,
          processRef.current,
          decisionRef.current,
          actionRowRef.current,
          action1Ref.current,
          action2Ref.current,
          action3Ref.current,
          metricsRef.current,
          statusLineRef.current,
        ],
        {
          opacity: 0,
          y: -8,
          duration: 0.12,
          ease: "power2.in",
          stagger: 0.02,
        },
      );
      tl.to(highlightRef.current, { scaleX: 0, duration: 0.1 });
      tl.to({}, { duration: 0.3 });

      tl.eventCallback("onComplete", () => {
        tl.restart();
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <div
      ref={containerRef}
      className="relative mx-auto w-full max-w-lg overflow-hidden"
    >
      {/* Ambient glow */}
      <div className="absolute -inset-8 rounded-2xl bg-violet-600/15 blur-3xl" />

      {/* Card — clean dashboard aesthetic */}
      <div
        ref={cardRef}
        className="glass relative z-10 overflow-hidden rounded-xl border border-violet-500/15 bg-white/[0.02]"
        style={{ opacity: 0 }}
      >
        {/* Header — ops dashboard style */}
        <div className="flex items-center justify-between border-b border-white/5 px-5 py-2.5">
          <div className="flex items-center gap-2">
            <div className="h-2 w-2 rounded-full bg-green-400 animate-pulse" />
            <span className="text-xs font-semibold text-white/80 uppercase tracking-widest">
              Agent Active
            </span>
          </div>
          <div className="flex items-center gap-3">
            <span className="text-[10px] text-white/30 font-mono">
              3 concurrent
            </span>
            <span className="rounded-full bg-green-500/10 border border-green-500/20 px-2 py-0.5 text-[9px] font-medium text-green-400/80">
              LIVE
            </span>
          </div>
        </div>

        {/* Content */}
        <div className="p-5 space-y-4">
          {/* Customer Inquiry */}
          <div
            ref={inquiryRef}
            className="rounded-lg border border-white/5 bg-white/[0.03] p-3"
            style={{ opacity: 0 }}
          >
            <div className="flex items-center gap-2 mb-2">
              <div className="h-1.5 w-1.5 rounded-full bg-violet-400" />
              <span className="text-[10px] text-violet-300/60 uppercase tracking-wider">
                Incoming Inquiry
              </span>
            </div>
            <p className="text-xs text-white/60 leading-relaxed">
              &ldquo;Hi, do you ship to Europe? I need 500 units of the premium
              pack.&rdquo;
            </p>
          </div>

          {/* Processing bar */}
          <div ref={processRef} className="relative" style={{ opacity: 0 }}>
            <div className="flex items-center justify-between mb-1.5">
              <span className="text-[10px] text-white/30 font-mono">
                AI Processing
              </span>
              <span className="text-[10px] text-violet-400/60 font-mono">
                97% confidence
              </span>
            </div>
            <div className="h-1 w-full rounded-full bg-white/5 overflow-hidden">
              <div
                ref={highlightRef}
                className="h-full rounded-full bg-gradient-to-r from-violet-500 to-purple-500"
                style={{ transformOrigin: "left center" }}
              />
            </div>
          </div>

          {/* Decision */}
          <div
            ref={decisionRef}
            className="rounded-lg border border-violet-500/20 bg-violet-500/5 p-3"
            style={{ opacity: 0 }}
          >
            <div className="flex items-center gap-2">
              <svg
                width="14"
                height="14"
                viewBox="0 0 24 24"
                fill="none"
                stroke="rgba(139,92,246,0.7)"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <circle cx="12" cy="12" r="10" />
                <path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3" />
                <line x1="12" y1="17" x2="12.01" y2="17" />
              </svg>
              <div className="flex flex-col">
                <span className="text-[10px] text-violet-300/70 font-medium">
                  Intent Classified
                </span>
                <span className="text-xs text-white/60">
                  Bulk order inquiry → high-value lead
                </span>
              </div>
            </div>
          </div>

          {/* Actions dispatched */}
          <div>
            <div className="flex items-center gap-2 mb-2.5">
              <svg
                width="12"
                height="12"
                viewBox="0 0 24 24"
                fill="none"
                stroke="rgba(255,255,255,0.3)"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <polyline points="9 11 12 14 22 4" />
                <path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11" />
              </svg>
              <span className="text-[10px] text-white/30 uppercase tracking-wider">
                Actions Dispatched
              </span>
            </div>
            <div
              ref={actionRowRef}
              className="grid grid-cols-3 gap-2.5"
              style={{ opacity: 0 }}
            >
              <div
                ref={action1Ref}
                className="rounded-lg border border-green-500/15 bg-green-500/5 p-2.5 text-center"
                style={{ opacity: 0 }}
              >
                <div className="text-lg mb-1">💬</div>
                <div className="text-[10px] font-medium text-green-300/70">
                  Reply Sent
                </div>
                <div className="text-[9px] text-white/25">Shipping info</div>
              </div>
              <div
                ref={action2Ref}
                className="rounded-lg border border-blue-500/15 bg-blue-500/5 p-2.5 text-center"
                style={{ opacity: 0 }}
              >
                <div className="text-lg mb-1">📲</div>
                <div className="text-[10px] font-medium text-blue-300/70">
                  Lead Routed
                </div>
                <div className="text-[9px] text-white/25">WhatsApp</div>
              </div>
              <div
                ref={action3Ref}
                className="rounded-lg border border-violet-500/15 bg-violet-500/5 p-2.5 text-center"
                style={{ opacity: 0 }}
              >
                <div className="text-lg mb-1">📊</div>
                <div className="text-[10px] font-medium text-violet-300/70">
                  CRM Updated
                </div>
                <div className="text-[9px] text-white/25">$12K deal</div>
              </div>
            </div>
          </div>

          {/* Live metrics */}
          <div
            ref={metricsRef}
            className="grid grid-cols-3 gap-2.5"
            style={{ opacity: 0 }}
          >
            {[
              { value: "0.8s", label: "Response", color: "text-green-400" },
              {
                value: "89%",
                label: "Auto-resolved",
                color: "text-violet-400",
              },
              { value: "$47K", label: "Revenue today", color: "text-blue-400" },
            ].map((m) => (
              <div
                key={m.label}
                className="rounded-lg border border-white/5 bg-white/[0.02] p-2 text-center"
              >
                <div className={`text-sm font-black ${m.color}`}>{m.value}</div>
                <div className="text-[8px] text-white/25 mt-0.5">{m.label}</div>
              </div>
            ))}
          </div>

          {/* Status line */}
          <div
            ref={statusLineRef}
            className="flex items-center justify-between pt-1"
            style={{ opacity: 0 }}
          >
            <div className="flex items-center gap-1.5">
              <span className="h-1.5 w-1.5 rounded-full bg-green-400" />
              <span className="text-[10px] text-white/30">
                Agent running — 3 tasks active
              </span>
            </div>
            <span className="text-[10px] text-white/20 font-mono">24/7</span>
          </div>
        </div>
      </div>
    </div>
  );
}

"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";

/**
 * AgentServiceVisual — Service 3: AI Agents & Intelligent Systems
 *
 * WOW: inquiry materializes, confidence + progress tick live, decision snap,
 * action cascade with completion flashes, metrics punch, alive hold pulse.
 */
export default function AgentServiceVisual() {
  const containerRef = useRef<HTMLDivElement>(null);
  const cardRef = useRef<HTMLDivElement>(null);
  const glowRef = useRef<HTMLDivElement>(null);
  const inquiryRef = useRef<HTMLDivElement>(null);
  const inquiryTextRef = useRef<HTMLParagraphElement>(null);
  const processRef = useRef<HTMLDivElement>(null);
  const decisionRef = useRef<HTMLDivElement>(null);
  const actionRowRef = useRef<HTMLDivElement>(null);
  const action1Ref = useRef<HTMLDivElement>(null);
  const action2Ref = useRef<HTMLDivElement>(null);
  const action3Ref = useRef<HTMLDivElement>(null);
  const metricsRef = useRef<HTMLDivElement>(null);
  const statusLineRef = useRef<HTMLDivElement>(null);
  const highlightRef = useRef<HTMLDivElement>(null);
  const confidenceRef = useRef<HTMLSpanElement>(null);
  const cursorRef = useRef<HTMLSpanElement>(null);

  const fullInquiry =
    "Hi, do you ship to Europe? I need 500 units of the premium pack.";

  useEffect(() => {
    const ctx = gsap.context(() => {
      const actions = [
        action1Ref.current,
        action2Ref.current,
        action3Ref.current,
      ];
      const metricEls = gsap.utils.toArray<HTMLElement>(".ag-metric-value");

      gsap.set(
        [
          inquiryRef.current,
          processRef.current,
          decisionRef.current,
          actionRowRef.current,
          ...actions,
          metricsRef.current,
          statusLineRef.current,
        ],
        { opacity: 0, y: 14 },
      );
      gsap.set(highlightRef.current, {
        scaleX: 0,
        transformOrigin: "left center",
      });
      gsap.set(cursorRef.current, { opacity: 0 });
      if (inquiryTextRef.current) inquiryTextRef.current.textContent = "";
      if (confidenceRef.current) confidenceRef.current.textContent = "0% confidence";

      gsap.fromTo(
        cardRef.current,
        { opacity: 0, scale: 0.97, y: 10 },
        { opacity: 1, scale: 1, y: 0, duration: 0.35, ease: "power3.out" },
      );

      const conf = { v: 0 };
      const typeState = { i: 0 };

      const tl = gsap.timeline({ delay: 0.3, repeat: -1, repeatDelay: 0.35 });

      // 1) Inquiry shell + typewriter
      tl.to(inquiryRef.current, {
        opacity: 1,
        y: 0,
        duration: 0.25,
        ease: "power3.out",
      })
        .to(cursorRef.current, { opacity: 1, duration: 0.1 })
        .to(typeState, {
          i: fullInquiry.length,
          duration: 1.15,
          ease: "none",
          onUpdate: () => {
            if (inquiryTextRef.current) {
              inquiryTextRef.current.textContent = fullInquiry.slice(
                0,
                Math.round(typeState.i),
              );
            }
          },
        })
        .to(cursorRef.current, {
          opacity: 0,
          duration: 0.35,
          repeat: 1,
          yoyo: true,
        })
        // 2) Processing + confidence
        .to(processRef.current, {
          opacity: 1,
          y: 0,
          duration: 0.2,
          ease: "power2.out",
        })
        .to(
          highlightRef.current,
          { scaleX: 1, duration: 0.95, ease: "power2.inOut" },
          "-=0.05",
        )
        .to(
          conf,
          {
            v: 97,
            duration: 0.95,
            ease: "power2.inOut",
            onUpdate: () => {
              if (confidenceRef.current) {
                confidenceRef.current.textContent = `${Math.round(conf.v)}% confidence`;
              }
            },
          },
          "<",
        )
        // 3) Decision snap
        .fromTo(
          decisionRef.current,
          { opacity: 0, y: 12, scale: 0.96 },
          {
            opacity: 1,
            y: 0,
            scale: 1,
            duration: 0.28,
            ease: "back.out(1.6)",
          },
          "-=0.25",
        )
        .to(
          decisionRef.current,
          {
            boxShadow: "0 0 22px rgba(139,92,246,0.28)",
            duration: 0.25,
            yoyo: true,
            repeat: 1,
          },
          "-=0.05",
        )
        // 4) Actions cascade
        .to(actionRowRef.current, {
          opacity: 1,
          y: 0,
          duration: 0.15,
          ease: "power2.out",
        })
        .to(actions, {
          opacity: 1,
          y: 0,
          duration: 0.22,
          ease: "back.out(1.7)",
          stagger: 0.12,
        })
        .to(
          actions,
          {
            scale: 1.04,
            duration: 0.15,
            stagger: 0.08,
            yoyo: true,
            repeat: 1,
            ease: "power2.out",
          },
          "-=0.15",
        )
        // 5) Metrics punch
        .to(
          metricsRef.current,
          { opacity: 1, y: 0, duration: 0.22, ease: "power2.out" },
          "-=0.05",
        )
        .fromTo(
          metricEls,
          { scale: 0.75, opacity: 0.4 },
          {
            scale: 1,
            opacity: 1,
            duration: 0.3,
            ease: "back.out(1.8)",
            stagger: 0.07,
          },
          "-=0.12",
        )
        .to(statusLineRef.current, {
          opacity: 1,
          y: 0,
          duration: 0.18,
          ease: "power2.out",
        })
        // Alive hold
        .to(glowRef.current, {
          opacity: 0.5,
          duration: 0.35,
          ease: "power2.out",
        })
        .to(
          cardRef.current,
          {
            boxShadow: "0 0 40px rgba(139,92,246,0.12)",
            duration: 0.5,
            yoyo: true,
            repeat: 2,
            ease: "sine.inOut",
          },
          "-=0.1",
        )
        .to({}, { duration: 0.7 })
        // Soft reset
        .to(
          [
            inquiryRef.current,
            processRef.current,
            decisionRef.current,
            actionRowRef.current,
            ...actions,
            metricsRef.current,
            statusLineRef.current,
          ],
          {
            opacity: 0,
            y: -10,
            duration: 0.18,
            ease: "power2.in",
            stagger: 0.02,
          },
        )
        .to(highlightRef.current, { scaleX: 0, duration: 0.12 }, "-=0.08")
        .to(glowRef.current, { opacity: 0.2, duration: 0.2 })
        .add(() => {
          conf.v = 0;
          typeState.i = 0;
          if (inquiryTextRef.current) inquiryTextRef.current.textContent = "";
          if (confidenceRef.current) {
            confidenceRef.current.textContent = "0% confidence";
          }
          gsap.set(cursorRef.current, { opacity: 0 });
          gsap.set(decisionRef.current, { boxShadow: "none" });
          gsap.set(cardRef.current, { boxShadow: "none" });
        });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <div
      ref={containerRef}
      className="relative mx-auto w-full max-w-lg overflow-hidden"
    >
      <div
        ref={glowRef}
        className="absolute -inset-8 rounded-2xl bg-violet-600/20 blur-3xl"
        style={{ opacity: 0.2 }}
      />

      <div
        ref={cardRef}
        className="glass relative z-10 overflow-hidden rounded-xl border border-violet-500/15 bg-white/[0.02]"
        style={{ opacity: 0 }}
      >
        <div className="flex items-center justify-between border-b border-white/5 px-5 py-2.5">
          <div className="flex items-center gap-2">
            <div className="h-2 w-2 animate-pulse rounded-full bg-green-400 shadow-[0_0_10px_rgba(74,222,128,0.9)]" />
            <span className="text-xs font-semibold uppercase tracking-widest text-white/80">
              Agent Active
            </span>
          </div>
          <div className="flex items-center gap-3">
            <span className="font-mono text-[10px] text-white/30">
              3 concurrent
            </span>
            <span className="rounded-full border border-green-500/20 bg-green-500/10 px-2 py-0.5 text-[9px] font-medium text-green-400/80">
              LIVE
            </span>
          </div>
        </div>

        <div className="space-y-4 p-5">
          <div
            ref={inquiryRef}
            className="rounded-lg border border-white/5 bg-white/[0.03] p-3"
            style={{ opacity: 0 }}
          >
            <div className="mb-2 flex items-center gap-2">
              <div className="h-1.5 w-1.5 rounded-full bg-violet-400" />
              <span className="text-[10px] uppercase tracking-wider text-violet-300/60">
                Incoming Inquiry
              </span>
            </div>
            <p className="min-h-[2.5rem] text-xs leading-relaxed text-white/65">
              <span ref={inquiryTextRef} />
              <span
                ref={cursorRef}
                className="ml-0.5 inline-block h-3 w-[2px] translate-y-0.5 bg-violet-300/80"
                style={{ opacity: 0 }}
              />
            </p>
          </div>

          <div ref={processRef} className="relative" style={{ opacity: 0 }}>
            <div className="mb-1.5 flex items-center justify-between">
              <span className="font-mono text-[10px] text-white/30">
                AI Processing
              </span>
              <span
                ref={confidenceRef}
                className="font-mono text-[10px] text-violet-400/70"
              >
                0% confidence
              </span>
            </div>
            <div className="h-1 w-full overflow-hidden rounded-full bg-white/5">
              <div
                ref={highlightRef}
                className="h-full rounded-full bg-gradient-to-r from-violet-500 via-fuchsia-400 to-purple-500 shadow-[0_0_12px_rgba(168,85,247,0.55)]"
                style={{ transformOrigin: "left center" }}
              />
            </div>
          </div>

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
                stroke="rgba(167,139,250,0.9)"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <circle cx="12" cy="12" r="10" />
                <path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3" />
                <line x1="12" y1="17" x2="12.01" y2="17" />
              </svg>
              <div className="flex flex-col">
                <span className="text-[10px] font-medium text-violet-300/75">
                  Intent Classified
                </span>
                <span className="text-xs text-white/65">
                  Bulk order inquiry → high-value lead
                </span>
              </div>
            </div>
          </div>

          <div>
            <div className="mb-2.5 flex items-center gap-2">
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
              <span className="text-[10px] uppercase tracking-wider text-white/30">
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
                <div className="mb-1 text-lg">💬</div>
                <div className="text-[10px] font-medium text-green-300/75">
                  Reply Sent
                </div>
                <div className="text-[9px] text-white/30">Shipping info</div>
              </div>
              <div
                ref={action2Ref}
                className="rounded-lg border border-blue-500/15 bg-blue-500/5 p-2.5 text-center"
                style={{ opacity: 0 }}
              >
                <div className="mb-1 text-lg">📲</div>
                <div className="text-[10px] font-medium text-blue-300/75">
                  Lead Routed
                </div>
                <div className="text-[9px] text-white/30">WhatsApp</div>
              </div>
              <div
                ref={action3Ref}
                className="rounded-lg border border-violet-500/15 bg-violet-500/5 p-2.5 text-center"
                style={{ opacity: 0 }}
              >
                <div className="mb-1 text-lg">📊</div>
                <div className="text-[10px] font-medium text-violet-300/75">
                  CRM Updated
                </div>
                <div className="text-[9px] text-white/30">$12K deal</div>
              </div>
            </div>
          </div>

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
              { value: "Live", label: "Ops visibility", color: "text-blue-400" },
            ].map((m) => (
              <div
                key={m.label}
                className="rounded-lg border border-white/5 bg-white/[0.02] p-2 text-center"
              >
                <div className={`ag-metric-value text-sm font-black ${m.color}`}>
                  {m.value}
                </div>
                <div className="mt-0.5 text-[8px] text-white/25">{m.label}</div>
              </div>
            ))}
          </div>

          <div
            ref={statusLineRef}
            className="flex items-center justify-between pt-1"
            style={{ opacity: 0 }}
          >
            <div className="flex items-center gap-1.5">
              <span className="h-1.5 w-1.5 rounded-full bg-green-400" />
              <span className="text-[10px] text-white/35">
                Agent running — 3 tasks active
              </span>
            </div>
            <span className="font-mono text-[10px] text-white/20">24/7</span>
          </div>
        </div>
      </div>
    </div>
  );
}

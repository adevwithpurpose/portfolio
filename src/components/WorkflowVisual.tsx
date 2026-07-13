"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";

/**
 * WorkflowVisual — Service 2: Intelligent Automation
 *
 * WOW: multi-packet data flow, process-node energy ring, cascading output
 * unlocks with check flashes, sequential log lines, continuous "alive" hold.
 */
export default function WorkflowVisual() {
  const containerRef = useRef<HTMLDivElement>(null);
  const cardRef = useRef<HTMLDivElement>(null);
  const glowRef = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<HTMLDivElement>(null);
  const flowLine1Ref = useRef<SVGLineElement>(null);
  const processRef = useRef<HTMLDivElement>(null);
  const flowLine2Ref = useRef<SVGLineElement>(null);
  const output1Ref = useRef<HTMLDivElement>(null);
  const output2Ref = useRef<HTMLDivElement>(null);
  const output3Ref = useRef<HTMLDivElement>(null);
  const statusRef = useRef<HTMLDivElement>(null);
  const log1Ref = useRef<HTMLDivElement>(null);
  const log2Ref = useRef<HTMLDivElement>(null);
  const packet1Ref = useRef<SVGCircleElement>(null);
  const packet2Ref = useRef<SVGCircleElement>(null);
  const packet3Ref = useRef<SVGCircleElement>(null);
  const rippleRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const outputs = [
        output1Ref.current,
        output2Ref.current,
        output3Ref.current,
      ];

      gsap.set(
        [
          triggerRef.current,
          processRef.current,
          ...outputs,
          statusRef.current,
          log1Ref.current,
          log2Ref.current,
        ],
        { opacity: 0, scale: 0.88 },
      );
      gsap.set([flowLine1Ref.current, flowLine2Ref.current], {
        strokeDasharray: 100,
        strokeDashoffset: 100,
      });
      gsap.set(
        [packet1Ref.current, packet2Ref.current, packet3Ref.current],
        { opacity: 0 },
      );
      gsap.set([rippleRef.current, ringRef.current], {
        scale: 0.6,
        opacity: 0,
      });

      gsap.fromTo(
        cardRef.current,
        { opacity: 0, scale: 0.96, y: 10 },
        { opacity: 1, scale: 1, y: 0, duration: 0.35, ease: "power3.out" },
      );

      const tl = gsap.timeline({ delay: 0.3, repeat: -1, repeatDelay: 0.4 });

      // Trigger pops in
      tl.to(triggerRef.current, {
        opacity: 1,
        scale: 1,
        duration: 0.28,
        ease: "back.out(1.7)",
      })
        // Draw first pipe + multi packets
        .to(flowLine1Ref.current, {
          strokeDashoffset: 0,
          duration: 0.45,
          ease: "power2.inOut",
        })
        .fromTo(
          packet1Ref.current,
          { opacity: 0, cy: "10%" },
          { opacity: 1, cy: "32%", duration: 0.45, ease: "power2.inOut" },
          "-=0.4",
        )
        .fromTo(
          packet3Ref.current,
          { opacity: 0, cy: "12%" },
          { opacity: 0.7, cy: "28%", duration: 0.4, ease: "power2.inOut" },
          "-=0.28",
        )
        // Process node + energy
        .to(
          processRef.current,
          { opacity: 1, scale: 1, duration: 0.25, ease: "back.out(1.6)" },
          "-=0.1",
        )
        .fromTo(
          ringRef.current,
          { scale: 0.7, opacity: 0.9 },
          { scale: 1.35, opacity: 0, duration: 0.55, ease: "power2.out" },
          "-=0.05",
        )
        .fromTo(
          rippleRef.current,
          { scale: 0.8, opacity: 0.85 },
          { scale: 1.6, opacity: 0, duration: 0.65, ease: "power2.out" },
          "-=0.4",
        )
        // Second pipe
        .to(flowLine2Ref.current, {
          strokeDashoffset: 0,
          duration: 0.35,
          ease: "power2.inOut",
        })
        .fromTo(
          packet2Ref.current,
          { opacity: 0, cy: "40%" },
          { opacity: 1, cy: "54%", duration: 0.35, ease: "power2.inOut" },
          "-=0.3",
        )
        // Outputs unlock cascade
        .to(outputs, {
          opacity: 1,
          scale: 1,
          duration: 0.22,
          ease: "back.out(1.8)",
          stagger: 0.12,
        })
        .to(
          outputs,
          {
            boxShadow: "0 0 18px rgba(34,211,238,0.25)",
            duration: 0.2,
            stagger: 0.08,
            yoyo: true,
            repeat: 1,
          },
          "-=0.2",
        )
        // Status + logs
        .to(statusRef.current, {
          opacity: 1,
          scale: 1,
          duration: 0.2,
          ease: "power2.out",
        })
        .to(
          log1Ref.current,
          { opacity: 1, scale: 1, x: 0, duration: 0.18, ease: "power2.out" },
          "-=0.05",
        )
        .to(log2Ref.current, {
          opacity: 1,
          scale: 1,
          x: 0,
          duration: 0.18,
          ease: "power2.out",
        })
        // Alive hold: gentle process pulse + packet shimmer
        .to(glowRef.current, {
          opacity: 0.45,
          duration: 0.4,
          ease: "power2.out",
        })
        .to(
          processRef.current,
          {
            scale: 1.04,
            duration: 0.45,
            yoyo: true,
            repeat: 3,
            ease: "sine.inOut",
          },
          "-=0.1",
        )
        .to({}, { duration: 0.6 })
        // Soft reset
        .to(
          [
            triggerRef.current,
            processRef.current,
            ...outputs,
            statusRef.current,
            log1Ref.current,
            log2Ref.current,
          ],
          {
            opacity: 0,
            scale: 0.9,
            duration: 0.2,
            ease: "power2.in",
            stagger: 0.02,
          },
        )
        .to(
          [flowLine1Ref.current, flowLine2Ref.current],
          { strokeDashoffset: 100, duration: 0.15 },
          "-=0.1",
        )
        .to(
          [
            packet1Ref.current,
            packet2Ref.current,
            packet3Ref.current,
            rippleRef.current,
            ringRef.current,
          ],
          { opacity: 0, duration: 0.08 },
        )
        .to(glowRef.current, { opacity: 0.2, duration: 0.2 });
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
        className="absolute -inset-8 rounded-2xl bg-cyan-600/20 blur-3xl"
        style={{ opacity: 0.2 }}
      />

      <div
        ref={cardRef}
        className="glass relative z-10 overflow-hidden rounded-xl border border-white/10 bg-white/[0.02]"
        style={{ opacity: 0 }}
      >
        <div className="flex items-center gap-2 border-b border-white/5 bg-white/[0.02] px-5 py-3">
          <div className="flex gap-2">
            <div className="h-3 w-3 rounded-full bg-red-500/60" />
            <div className="h-3 w-3 rounded-full bg-yellow-500/60" />
            <div className="h-3 w-3 rounded-full bg-green-500/60" />
          </div>
          <div className="ml-3 flex-1 rounded bg-white/5 px-2.5 py-1 font-mono text-xs text-white/25">
            Workflow — Request Processing
          </div>
        </div>

        <div className="relative h-[400px] p-5">
          <svg
            className="pointer-events-none absolute inset-0 h-full w-full"
            style={{ overflow: "visible" }}
          >
            <defs>
              <filter id="glowCyan">
                <feGaussianBlur stdDeviation="2.5" result="coloredBlur" />
                <feMerge>
                  <feMergeNode in="coloredBlur" />
                  <feMergeNode in="SourceGraphic" />
                </feMerge>
              </filter>
            </defs>
            <line
              ref={flowLine1Ref}
              x1="50%"
              y1="10%"
              x2="50%"
              y2="32%"
              stroke="rgba(34,211,238,0.45)"
              strokeWidth="1.5"
              strokeDasharray="6 4"
            />
            <circle
              ref={packet1Ref}
              cx="50%"
              cy="10%"
              r="4.5"
              fill="rgba(34,211,238,0.95)"
              filter="url(#glowCyan)"
              style={{ opacity: 0 }}
            />
            <circle
              ref={packet3Ref}
              cx="50%"
              cy="12%"
              r="3"
              fill="rgba(165,243,252,0.7)"
              filter="url(#glowCyan)"
              style={{ opacity: 0 }}
            />
            <line
              ref={flowLine2Ref}
              x1="50%"
              y1="44%"
              x2="50%"
              y2="54%"
              stroke="rgba(34,211,238,0.35)"
              strokeWidth="1.5"
              strokeDasharray="6 4"
            />
            <circle
              ref={packet2Ref}
              cx="50%"
              cy="44%"
              r="4.5"
              fill="rgba(34,211,238,0.95)"
              filter="url(#glowCyan)"
              style={{ opacity: 0 }}
            />
          </svg>

          <div className="absolute left-0 right-0 top-6 flex justify-center px-5">
            <div
              ref={triggerRef}
              className="flex w-fit items-center gap-2 rounded-lg border border-green-500/30 bg-green-500/10 px-4 py-2 shadow-[0_0_20px_rgba(74,222,128,0.12)]"
              style={{ opacity: 0 }}
            >
              <span className="h-2 w-2 rounded-full bg-green-400 animate-pulse" />
              <span className="font-mono text-xs text-green-300/80">
                Shopify → New Order #4821
              </span>
            </div>
          </div>

          <div className="absolute left-0 right-0 top-[120px] flex justify-center px-5">
            <div className="relative">
              <div
                ref={ringRef}
                className="absolute inset-0 -m-5 rounded-2xl border border-cyan-300/50"
                style={{ opacity: 0 }}
              />
              <div
                ref={rippleRef}
                className="absolute inset-0 -m-4 rounded-xl border border-cyan-400/40"
                style={{ opacity: 0 }}
              />
              <div
                ref={processRef}
                className="relative z-10 flex items-center gap-3 rounded-lg border border-cyan-500/30 bg-cyan-500/10 px-5 py-3 shadow-[0_0_24px_rgba(34,211,238,0.15)]"
                style={{ opacity: 0 }}
              >
                <svg
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="rgba(34,211,238,0.9)"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <circle cx="12" cy="12" r="3" />
                  <path d="M19.07 4.93a10 10 0 0 1 0 14.14M4.93 4.93a10 10 0 0 0 0 14.14" />
                  <path d="M12 1v2M12 21v2M4.22 4.22l1.42 1.42M18.36 18.36l1.42 1.42M1 12h2M21 12h2" />
                </svg>
                <div className="flex flex-col">
                  <span className="text-xs font-semibold text-cyan-300/90">
                    Auto-Process
                  </span>
                  <span className="text-[10px] text-cyan-400/55">
                    automation workflow
                  </span>
                </div>
              </div>
            </div>
          </div>

          <div className="absolute left-0 right-0 top-[210px] px-5">
            <div className="grid grid-cols-3 gap-3">
              <div ref={output1Ref} style={{ opacity: 0 }}>
                <div className="rounded-lg border border-green-500/20 bg-green-500/8 p-3 text-center">
                  <svg
                    className="mx-auto mb-1.5"
                    width="18"
                    height="18"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="rgba(52,211,153,0.8)"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z" />
                    <polyline points="3.27 6.96 12 12.01 20.73 6.96" />
                    <line x1="12" y1="22.08" x2="12" y2="12" />
                  </svg>
                  <span className="text-[10px] font-medium text-green-300/75">
                    Status
                  </span>
                  <span className="block text-[9px] text-white/35">Updated</span>
                </div>
              </div>
              <div ref={output2Ref} style={{ opacity: 0 }}>
                <div className="rounded-lg border border-blue-500/20 bg-blue-500/8 p-3 text-center">
                  <svg
                    className="mx-auto mb-1.5"
                    width="18"
                    height="18"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="rgba(59,130,246,0.8)"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
                  </svg>
                  <span className="text-[10px] font-medium text-blue-300/75">
                    Slack
                  </span>
                  <span className="block text-[9px] text-white/35">Notified</span>
                </div>
              </div>
              <div ref={output3Ref} style={{ opacity: 0 }}>
                <div className="rounded-lg border border-violet-500/20 bg-violet-500/8 p-3 text-center">
                  <svg
                    className="mx-auto mb-1.5"
                    width="18"
                    height="18"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="rgba(168,85,247,0.8)"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <rect width="20" height="16" x="2" y="4" rx="2" />
                    <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
                  </svg>
                  <span className="text-[10px] font-medium text-violet-300/75">
                    Email
                  </span>
                  <span className="block text-[9px] text-white/35">Sent</span>
                </div>
              </div>
            </div>
          </div>

          <div className="absolute bottom-14 left-5 right-5">
            <div
              ref={statusRef}
              className="flex items-center justify-between rounded-lg border border-white/5 bg-white/[0.02] px-4 py-2"
              style={{ opacity: 0 }}
            >
              <div className="flex items-center gap-2">
                <span className="h-2 w-2 rounded-full bg-green-400 animate-pulse" />
                <span className="text-[10px] text-white/45">
                  3 actions completed
                </span>
              </div>
              <span className="font-mono text-[10px] text-cyan-400/70">
                0.3s total
              </span>
            </div>
          </div>

          <div className="absolute bottom-4 left-5 right-5 space-y-1 font-mono text-[10px]">
            <div
              ref={log1Ref}
              className="flex items-center gap-2 text-white/25"
              style={{ opacity: 0, transform: "translateX(-6px)" }}
            >
              <span className="text-green-400/60">[OK]</span>
              <span>Status synced — SKU-4821</span>
            </div>
            <div
              ref={log2Ref}
              className="flex items-center gap-2 text-white/25"
              style={{ opacity: 0, transform: "translateX(-6px)" }}
            >
              <span className="text-blue-400/60">[→]</span>
              <span>#orders channel notified</span>
            </div>
          </div>
        </div>

        <div className="flex items-center justify-between border-t border-white/5 px-5 py-2 text-[10px] text-white/20">
          <span className="flex items-center gap-1.5">
            <span className="h-1.5 w-1.5 rounded-full bg-cyan-400" />
            workflow automation
          </span>
          <span>runs 24/7</span>
        </div>
      </div>
    </div>
  );
}

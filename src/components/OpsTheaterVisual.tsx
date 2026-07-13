"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";

type Variant = "web" | "automation" | "agent";

const labels: Record<Variant, { eyebrow: string; accent: string }> = {
  web: { eyebrow: "RELEASE CONTROL / STORE_014", accent: "cyan" },
  automation: { eyebrow: "ORDER ROUTING / RUN_4821", accent: "emerald" },
  agent: { eyebrow: "TRIAGE DESK / HUMAN-IN-LOOP", accent: "violet" },
};

/**
 * Concept A v2 — deliberately not a generic browser/dashboard card.
 * Three distinct operational surfaces: release monitor, route graph, triage desk.
 */
export default function OpsTheaterVisual({ variant }: { variant: Variant }) {
  const root = useRef<HTMLDivElement>(null);
  const stage = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = root.current;
    if (!el) return;
    const finalFrame = () => gsap.set(el.querySelectorAll("[data-ops]"), { opacity: 1, y: 0, scale: 1 });
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      finalFrame();
      return;
    }

    const ctx = gsap.context(() => {
      const parts = gsap.utils.toArray<HTMLElement>(el.querySelectorAll("[data-ops]"));
      gsap.set(parts, { opacity: 0, y: 14, scale: 0.97 });
      const tl = gsap.timeline({ paused: true, repeat: -1, repeatDelay: 2.6 });
      tl.to(parts, { opacity: 1, y: 0, scale: 1, duration: 0.42, ease: "power3.out", stagger: 0.11 })
        .to(el.querySelectorAll("[data-pulse]"), { scale: 1.04, duration: 0.42, yoyo: true, repeat: 1, stagger: 0.1, ease: "sine.inOut" }, "+=0.15")
        .to({}, { duration: 2.2 })
        .to(stage.current, { opacity: 0, duration: 0.24, ease: "power2.inOut" })
        .set(parts, { opacity: 0, y: 14, scale: 0.97 })
        .set(stage.current, { opacity: 1 });
      tl.play(0);
      const observer = new IntersectionObserver(([entry]) => {
        if (entry.isIntersecting && entry.intersectionRatio > 0.25) tl.play();
        else tl.pause();
      }, { threshold: [0, 0.25] });
      observer.observe(el);
      return () => { observer.disconnect(); tl.kill(); };
    }, el);
    return () => ctx.revert();
  }, []);

  const shell = "relative mx-auto w-full max-w-xl overflow-hidden border border-white/10 bg-[#090b12] p-5 shadow-2xl";
  const grid = "absolute inset-0 opacity-[0.16] [background-image:linear-gradient(rgba(255,255,255,.07)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,.07)_1px,transparent_1px)] [background-size:24px_24px]";

  return (
    <div ref={root} className="relative mx-auto w-full max-w-xl">
      <div className="absolute -inset-12 rounded-full bg-white/5 blur-3xl" />
      <div className={shell}>
        <div className={grid} />
        <div className="relative z-10" ref={stage}>
          <div data-ops className="mb-5 flex items-center justify-between border-b border-white/10 pb-3 font-mono text-[10px] tracking-[0.16em] text-white/45">
            <span>{labels[variant].eyebrow}</span>
            <span className="flex items-center gap-1.5 text-emerald-300"><i className="h-1.5 w-1.5 rounded-full bg-emerald-400" />LIVE</span>
          </div>
          {variant === "web" && <WebSurface />}
          {variant === "automation" && <AutomationSurface />}
          {variant === "agent" && <AgentSurface />}
        </div>
      </div>
    </div>
  );
}

function WebSurface() {
  return <div className="space-y-4">
    <div data-ops className="flex items-center justify-between"><div><p className="text-xs uppercase tracking-[.2em] text-cyan-300/60">Release candidate</p><h3 className="mt-1 text-2xl font-black text-white">NovaBrand Storefront</h3></div><span className="border border-cyan-300/25 bg-cyan-300/10 px-2 py-1 font-mono text-[10px] text-cyan-200">v1.0.0</span></div>
    <div data-ops className="grid grid-cols-[.72fr_1.28fr] gap-3">
      <div className="border border-dashed border-white/25 p-3"><p className="mb-3 text-[9px] uppercase tracking-wider text-white/35">Wireframe</p><div className="space-y-2"><i className="block h-8 bg-white/10"/><i className="block h-2 w-3/4 bg-white/10"/><i className="block h-2 w-1/2 bg-white/10"/><i className="block h-16 bg-white/5"/></div></div>
      <div className="border border-cyan-300/25 bg-gradient-to-br from-cyan-400/15 to-blue-500/5 p-3 shadow-[0_0_30px_rgba(34,211,238,.10)]"><div className="mb-4 flex justify-between text-[9px] text-white/50"><span>NOVABRAND</span><span>SHOP / CART</span></div><p className="text-lg font-black text-white">Made for the everyday ritual.</p><p className="mt-1 text-[10px] text-white/50">Premium collection · Fast checkout</p><button data-pulse className="mt-4 bg-cyan-300 px-3 py-2 text-[10px] font-black text-slate-950">PUBLISH STOREFRONT →</button></div>
    </div>
    <div data-ops className="grid grid-cols-3 gap-2 border-t border-white/10 pt-4"><Metric value="98" label="LIGHTHOUSE" tone="text-emerald-300"/><Metric value="+40%" label="CONVERSION" tone="text-cyan-200"/><Metric value="LIVE" label="PRODUCTION" tone="text-white"/></div>
  </div>;
}

function AutomationSurface() {
  return <div className="space-y-4">
    <div data-ops className="flex items-end justify-between"><div><p className="text-xs uppercase tracking-[.2em] text-emerald-300/60">Event received</p><h3 className="mt-1 text-2xl font-black text-white">Order #4821</h3></div><span className="font-mono text-[10px] text-emerald-300">0.00s</span></div>
    <div data-ops className="relative min-h-52 border-y border-white/10 py-5">
      <div className="absolute left-[22%] right-[22%] top-1/2 h-px bg-gradient-to-r from-emerald-400/20 via-cyan-300/70 to-blue-400/20"/>
      <div className="absolute left-1/2 top-[29%] h-[42%] w-px bg-cyan-300/35"/>
      <div className="relative grid grid-cols-[1fr_.9fr_1fr] items-center gap-3">
        <Node title="SHOPIFY" detail="NEW ORDER" tone="emerald" />
        <div data-pulse className="z-10 border border-cyan-300/40 bg-cyan-300/10 p-3 text-center"><p className="font-mono text-[9px] text-cyan-200">NORMALIZE</p><p className="mt-1 text-xs font-black text-white">ROUTE</p></div>
        <div className="space-y-2"><Node title="STATUS" detail="UPDATED" tone="emerald"/><Node title="SLACK" detail="ALERTED" tone="blue"/><Node title="EMAIL" detail="SENT" tone="violet"/></div>
      </div>
    </div>
    <div data-ops className="flex items-center justify-between"><span className="text-xs text-white/60">Manual steps deleted</span><span className="font-mono text-lg font-black text-emerald-300">3 actions / 0.3s</span></div>
  </div>;
}

function AgentSurface() {
  return <div className="space-y-4">
    <div data-ops className="flex items-end justify-between"><div><p className="text-xs uppercase tracking-[.2em] text-violet-300/60">Incoming request</p><h3 className="mt-1 text-2xl font-black text-white">Bulk order triage</h3></div><span className="font-mono text-[10px] text-violet-200">97% CONFIDENT</span></div>
    <div data-ops className="grid grid-cols-2 gap-3">
      <div className="border border-white/15 bg-white/[.03] p-3"><p className="text-[9px] uppercase tracking-wider text-white/35">Customer asks</p><p className="mt-2 text-xs leading-relaxed text-white/75">“Do you ship 500 premium packs to Europe?”</p><div className="mt-3 border-t border-white/10 pt-2 font-mono text-[9px] text-violet-200">INTENT: B2B / HIGH VALUE</div></div>
      <div className="border border-violet-300/25 bg-violet-400/[.06] p-3"><p className="text-[9px] uppercase tracking-wider text-violet-200">AI draft</p><p className="mt-2 text-xs leading-relaxed text-white/75">EU terms prepared. Sales context attached.</p><div data-pulse className="mt-3 flex items-center gap-2 border-t border-violet-200/15 pt-2 text-[9px] text-emerald-200"><span className="grid h-4 w-4 place-items-center rounded-full bg-emerald-300 text-slate-950">✓</span> REVIEW GATE APPROVED</div></div>
    </div>
    <div data-ops className="grid grid-cols-3 gap-2"><Metric value="REPLY" label="EU TERMS" tone="text-emerald-300"/><Metric value="ROUTE" label="SALES / WA" tone="text-blue-200"/><Metric value="CRM" label="$12K DEAL" tone="text-violet-200"/></div>
  </div>;
}

function Node({ title, detail, tone }: { title: string; detail: string; tone: "emerald" | "blue" | "violet" }) {
  const map = { emerald: "border-emerald-300/30 text-emerald-200", blue: "border-blue-300/30 text-blue-200", violet: "border-violet-300/30 text-violet-200" };
  return <div data-ops data-pulse className={`relative z-10 border bg-[#0b0e16] p-2.5 ${map[tone]}`}><p className="font-mono text-[9px]">{title}</p><p className="mt-1 text-[10px] font-bold text-white/80">{detail}</p></div>;
}

function Metric({ value, label, tone }: { value: string; label: string; tone: string }) {
  return <div data-ops data-pulse className="border border-white/10 bg-white/[.025] p-2.5"><p className={`text-base font-black ${tone}`}>{value}</p><p className="mt-1 font-mono text-[8px] tracking-wider text-white/35">{label}</p></div>;
}

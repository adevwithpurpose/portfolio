"use client";

import { useRef, useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";

/* ─────────────────────────────────────────────────────────────
 * ScrollServicesWorld — True 3D scroll world
 *
 * Architecture:
 * - 400vh scroll track with a sticky 100svh viewport.
 *   (No overflow-hidden ancestors → sticky actually pins.)
 * - A perspective camera rig flies through three stage planes
 *   spaced 1600px apart on the Z axis (multi-plane parallax).
 * - A glowing grid floor + three drifting particle layers render
 *   below/behind the stages for depth.
 * - All per-frame motion (camera, planes, floor, HUD meter) is
 *   written directly to the DOM inside a lerped rAF loop —
 *   React state only changes when the active world changes.
 * ───────────────────────────────────────────────────────────── */

interface ServiceWorldData {
  id: string;
  worldNumber: string;
  shortName: string;
  category: string;
  title: string;
  accentColor: string;
  badge: string;
  metric: string;
  metricLabel: string;
  tags: string[];
  description: string;
}

const SERVICE_WORLDS: ServiceWorldData[] = [
  {
    id: "world-ecommerce",
    worldNumber: "WORLD 01 // STOREFRONT ENGINE",
    shortName: "STOREFRONT ENGINE",
    category: "HEADLESS E-COMMERCE & SHOPIFY DAWN ARCHITECTURE",
    title: "High-Conversion Shopify Dawn & Headless Systems",
    accentColor: "#10B981",
    badge: "98+ Lighthouse",
    metric: "0.4s",
    metricLabel: "Measured LCP (Largest Contentful Paint)",
    tags: ["Shopify Dawn", "Liquid", "Astro", "TinaCMS", "GraphQL"],
    description:
      "Engineered storefronts that bypass page-builder bloat — sub-second loads, zero layout shift, and full editorial freedom via headless architecture.",
  },
  {
    id: "world-ai",
    worldNumber: "WORLD 02 // AI COMMAND CENTER",
    shortName: "AI COMMAND CENTER",
    category: "AUTONOMOUS AI & CRAWL4AI AGENT WORKFLOWS",
    title: "FastAPI, Crawl4AI & Autonomous Agent Pipelines",
    accentColor: "#06B6D4",
    badge: "10x Ops Leverage",
    metric: "100%",
    metricLabel: "Automated Data Extraction & Ingestion",
    tags: ["FastAPI", "Crawl4AI", "Python", "Hermes Agent", "Vector Search"],
    description:
      "Custom scrapers, LLM ingestion pipelines, and agentic workflows that run autonomously in the background — turning hours of ops into zero-touch automation.",
  },
  {
    id: "world-systems",
    worldNumber: "WORLD 03 // TELEMETRY MATRIX",
    shortName: "TELEMETRY MATRIX",
    category: "CUSTOM SYSTEMS, POWER BI & ANALYTICS TELEMETRY",
    title: "Power BI Dashboards & Engineering Integrations",
    accentColor: "#A855F7",
    badge: "Real-time Telemetry",
    metric: "<0.2s",
    metricLabel: "Stream Latency",
    tags: ["Power BI", "Pine Script", "REST/GraphQL", "SQL", "Mechatronics Eng"],
    description:
      "Executive dashboards, Pine Script quant indicators, and hardware-software telemetry that translate complex operational data into real-time decisions.",
  },
];

const N = SERVICE_WORLDS.length;
const DEPTH = 1600; // Z distance between stage planes
const HUD_ZONE = 0.07; // progress reserved for entry/exit flight

const clamp = (v: number, min: number, max: number) =>
  Math.min(max, Math.max(min, v));

/* ── Interactive telemetry badge ─────────────────────────── */

interface BadgeSpec {
  label: string;
  detail: string;
  z: number;
  pos: string; // tailwind position classes
  live?: boolean;
}

function TelemetryBadge({
  spec,
  color,
}: {
  spec: BadgeSpec;
  color: string;
}) {
  const [open, setOpen] = useState(false);
  const [tick, setTick] = useState(0);

  useEffect(() => {
    if (!spec.live) return;
    const t = setInterval(() => setTick((p) => p + 1), 1800);
    return () => clearInterval(t);
  }, [spec.live]);

  const liveSuffix = spec.live ? ` ${12 + (tick % 7)}ms` : "";

  return (
    <button
      type="button"
      tabIndex={-1}
      onMouseEnter={() => setOpen(true)}
      onMouseLeave={() => setOpen(false)}
      onFocus={() => setOpen(true)}
      onBlur={() => setOpen(false)}
      className={`absolute ${spec.pos} hidden sm:block pointer-events-auto px-3.5 py-2 rounded-xl border backdrop-blur-md font-mono text-[11px] text-left shadow-2xl transition-all duration-300 cursor-default select-none ${
        open ? "bg-[#12121A]/95" : "bg-[#12121A]/80"
      }`}
      style={{
        transform: `translateZ(${spec.z}px) scale(${open ? 1.12 : 1})`,
        borderColor: `${color}${open ? "90" : "50"}`,
        color,
        boxShadow: open ? `0 0 28px ${color}45` : `0 8px 24px rgba(0,0,0,0.5)`,
        transitionProperty: "transform, box-shadow, border-color, background-color",
      }}
    >
      <span className="flex items-center gap-1.5 whitespace-nowrap">
        <span
          className="w-1.5 h-1.5 rounded-full animate-pulse"
          style={{ backgroundColor: color }}
        />
        {spec.label}
        {liveSuffix}
      </span>
      <span
        className="block overflow-hidden text-white/70 transition-all duration-300"
        style={{
          maxHeight: open ? 40 : 0,
          opacity: open ? 1 : 0,
          marginTop: open ? 4 : 0,
        }}
      >
        {spec.detail}
      </span>
    </button>
  );
}

/* ── Stage content panels (the deep 3D component per world) ── */

function StorefrontPanel() {
  const [tab, setTab] = useState<"checkout" | "liquid" | "astro">("checkout");
  const accent = "#10B981";

  return (
    <div
      className="relative w-full max-w-[min(92vw,36rem)] bg-[#0F0F14]/95 border rounded-2xl p-4 md:p-5 backdrop-blur-2xl shadow-[0_20px_50px_rgba(0,0,0,0.8)] space-y-3 md:space-y-4"
      style={{ borderColor: `${accent}4D`, transform: "translateZ(70px)" }}
    >
      <div className="flex items-center justify-between gap-2 pb-3 border-b border-white/10">
        <div className="flex items-center gap-2 min-w-0">
          <span className="w-2.5 h-2.5 md:w-3 md:h-3 rounded-full bg-red-500/80 shrink-0" />
          <span className="w-2.5 h-2.5 md:w-3 md:h-3 rounded-full bg-yellow-500/80 shrink-0" />
          <span className="w-2.5 h-2.5 md:w-3 md:h-3 rounded-full bg-green-500/80 shrink-0" />
          <span className="ml-1.5 text-[11px] md:text-xs font-mono text-white/50 truncate">
            store.safeer-os.dev
          </span>
        </div>
        <div className="flex gap-1 text-[10px] md:text-[11px] font-mono shrink-0">
          {(["checkout", "liquid", "astro"] as const).map((t) => (
            <button
              key={t}
              onClick={() => setTab(t)}
              className={`px-2 md:px-2.5 py-1 rounded-md transition-colors ${
                tab === t
                  ? "bg-emerald-500/20 text-emerald-400 border border-emerald-500/30"
                  : "text-white/40 hover:text-white/70"
              }`}
            >
              {t === "checkout" ? "UI" : t === "liquid" ? "Dawn" : "Astro"}
            </button>
          ))}
        </div>
      </div>

      {tab === "checkout" && (
        <div className="grid grid-cols-3 gap-2.5 md:gap-3 pt-1">
          <div className="col-span-1 rounded-xl bg-white/[0.03] border border-white/10 p-2.5 md:p-3 space-y-2">
            <div className="w-full h-16 md:h-20 rounded-lg bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center">
              <svg
                className="w-7 h-7 md:w-8 md:h-8 stroke-emerald-400 fill-none"
                viewBox="0 0 24 24"
                strokeWidth="1.5"
              >
                <path
                  d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </div>
            <div className="h-2.5 w-3/4 rounded bg-white/20" />
            <div className="h-2 w-1/2 rounded bg-emerald-400/60" />
          </div>
          <div className="col-span-2 rounded-xl bg-white/[0.02] border border-white/10 p-2.5 md:p-3 flex flex-col justify-between">
            <div className="space-y-1.5 md:space-y-2">
              <div className="flex justify-between items-center text-[11px] md:text-xs font-mono text-white/80">
                <span>Storefront API</span>
                <span className="text-emerald-400 font-bold">PASS 100%</span>
              </div>
              <p className="text-[11px] md:text-xs text-gray-400 leading-relaxed">
                Dawn sections tuned for zero layout shift (CLS 0.00). Instant
                variant selection & custom cart drawer — no heavy apps.
              </p>
            </div>
            <div className="flex items-center justify-between pt-2 border-t border-white/5 text-[10px] md:text-[11px] font-mono">
              <span className="text-white/40">TTFB: 42ms</span>
              <span className="text-emerald-400">Payload: 14KB</span>
            </div>
          </div>
        </div>
      )}

      {tab === "liquid" && (
        <div className="bg-[#09090D] p-3 rounded-xl border border-white/10 text-[11px] md:text-xs font-mono text-emerald-300 space-y-1 overflow-x-auto">
          <div>
            <span className="text-purple-400">{"{%"}</span> comment{" "}
            <span className="text-purple-400">{"%}"}</span> Dawn Custom Section{" "}
            <span className="text-purple-400">{"{%"}</span> endcomment{" "}
            <span className="text-purple-400">{"%}"}</span>
          </div>
          <div>
            <span className="text-blue-400">&lt;section</span>{" "}
            <span className="text-yellow-300">class=</span>
            <span className="text-emerald-400">&quot;fast-product-grid&quot;</span>
            <span className="text-blue-400">&gt;</span>
          </div>
          <div className="pl-4">
            <span className="text-purple-400">{"{%"}</span>{" "}
            <span className="text-blue-300">for</span> product{" "}
            <span className="text-blue-300">in</span> collection.products{" "}
            <span className="text-purple-400">{"%}"}</span>
          </div>
          <div className="pl-8">
            <span className="text-purple-400">{"{%"}</span> render{" "}
            <span className="text-emerald-400">&apos;card-product-fast&apos;</span>,
            card_product: product <span className="text-purple-400">{"%}"}</span>
          </div>
          <div className="pl-4">
            <span className="text-purple-400">{"{%"}</span> endfor{" "}
            <span className="text-purple-400">{"%}"}</span>
          </div>
          <div>
            <span className="text-blue-400">&lt;/section&gt;</span>
          </div>
        </div>
      )}

      {tab === "astro" && (
        <div className="bg-[#09090D] p-3 rounded-xl border border-white/10 text-[11px] md:text-xs font-mono text-cyan-300 space-y-1 overflow-x-auto">
          <div>
            <span className="text-purple-400">---</span>
          </div>
          <div>
            <span className="text-blue-300">import</span> {"{"}{" "}
            getStorefrontProducts {"}"} <span className="text-blue-300">from</span>{" "}
            <span className="text-emerald-400">&apos;@/lib/shopify&apos;</span>;
          </div>
          <div>
            <span className="text-blue-300">const</span> products ={" "}
            <span className="text-purple-400">await</span> getStorefrontProducts();
          </div>
          <div>
            <span className="text-purple-400">---</span>
          </div>
          <div>
            &lt;<span className="text-yellow-300">StorefrontGrid</span>{" "}
            products=&#123;products&#125; /&gt;
          </div>
        </div>
      )}
    </div>
  );
}

function AgentTerminalPanel() {
  const accent = "#06B6D4";
  const logs = [
    "[Crawl4AI] Initializing browser context...",
    "[FastAPI] GET /v1/scrape/target - 200 OK (12ms)",
    "[Hermes Agent] Parsing DOM schema & extracting JSON...",
    "[Pipeline] 1,420 items indexed to Vector DB",
    "[System] Standby for next extraction batch...",
  ];
  const [logIdx, setLogIdx] = useState(0);

  useEffect(() => {
    const t = setInterval(() => setLogIdx((p) => (p + 1) % logs.length), 2400);
    return () => clearInterval(t);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div
      className="relative w-full max-w-[min(92vw,36rem)] bg-[#0B0F17]/95 border rounded-2xl p-4 md:p-5 backdrop-blur-2xl shadow-[0_20px_50px_rgba(0,0,0,0.8)] space-y-3 md:space-y-4"
      style={{ borderColor: `${accent}4D`, transform: "translateZ(70px)" }}
    >
      <div className="flex items-center justify-between gap-2 pb-3 border-b border-white/10 font-mono text-[11px] md:text-xs">
        <div className="flex items-center gap-2 text-cyan-400 min-w-0">
          <span className="w-2.5 h-2.5 rounded-full bg-cyan-400 animate-pulse shrink-0" />
          <span className="truncate">agent@safeer-os:~ (Crawl4AI + FastAPI)</span>
        </div>
        <span className="text-white/40 shrink-0">STATUS: ACTIVE</span>
      </div>

      <div className="bg-[#05080E] p-3.5 md:p-4 rounded-xl border border-white/10 font-mono text-[11px] md:text-xs space-y-2 h-40 md:h-44 flex flex-col justify-between overflow-hidden">
        <div className="space-y-1.5 text-cyan-300/90">
          <div className="text-white/50 truncate">
            $ python3 -m crawl4ai.agent --target=&quot;https://client-site.com&quot;
          </div>
          <div className="text-emerald-400">
            &gt;&gt; Extracting structured JSON schema...
          </div>
          <div className="text-cyan-400 font-bold">{logs[logIdx]}</div>
        </div>
        <div className="pt-2 border-t border-white/10 flex items-center justify-between text-[10px] md:text-[11px] text-white/50">
          <span>Rate: 120 req/min</span>
          <span className="text-cyan-400">Latency: 14ms</span>
        </div>
      </div>
    </div>
  );
}

function AnalyticsPanel() {
  const accent = "#A855F7";
  return (
    <div
      className="relative w-full max-w-[min(92vw,36rem)] bg-[#100C16]/95 border rounded-2xl p-4 md:p-5 backdrop-blur-2xl shadow-[0_20px_50px_rgba(0,0,0,0.8)] space-y-3 md:space-y-4"
      style={{ borderColor: `${accent}4D`, transform: "translateZ(70px)" }}
    >
      <div className="flex items-center justify-between gap-2 pb-3 border-b border-white/10 font-mono text-[11px] md:text-xs">
        <span className="text-purple-400 truncate">EXECUTIVE TELEMETRY STREAM</span>
        <span className="text-white/40 shrink-0">LATENCY: &lt;0.2s</span>
      </div>
      <div className="grid grid-cols-4 gap-2.5 md:gap-3 h-36 md:h-40 items-end p-3.5 md:p-4 rounded-xl bg-white/[0.02] border border-white/10">
        {[65, 85, 45, 95].map((val, i) => (
          <div key={i} className="flex flex-col items-center gap-2 h-full justify-end">
            <div
              className="w-full rounded-t-lg bg-gradient-to-t from-purple-600/40 to-purple-400 transition-all duration-500 border-t border-purple-300"
              style={{ height: `${val}%` }}
            />
            <span className="text-[10px] font-mono text-white/50">M0{i + 1}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

/* ── Badge layouts per world (deep Z floating telemetry) ──── */

const WORLD_BADGES: BadgeSpec[][] = [
  [
    {
      label: "⚡ LIGHTHOUSE 98/100",
      detail: "Performance · A11y · SEO · Best Practices",
      z: 170,
      pos: "-top-5 -left-4 md:-top-8 md:-left-16",
    },
    {
      label: "🚀 LCP 0.4s",
      detail: "Edge-cached Dawn sections, 14KB payload",
      z: 210,
      pos: "-bottom-5 -right-4 md:-bottom-8 md:-right-16",
      live: true,
    },
    {
      label: "🧩 HEADLESS CMS",
      detail: "TinaCMS editorial layer over Storefront API",
      z: 120,
      pos: "top-1/2 -right-6 md:-right-24",
    },
  ],
  [
    {
      label: "🤖 CRAWL4AI PARSER",
      detail: "LLM-ready markdown + structured JSON",
      z: 180,
      pos: "-top-5 -right-4 md:-top-8 md:-right-16",
    },
    {
      label: "⚙️ FASTAPI ENGINE",
      detail: "Serverless scrape endpoints, auto-scaling",
      z: 210,
      pos: "-bottom-5 -left-4 md:-bottom-8 md:-left-16",
      live: true,
    },
    {
      label: "🧠 VECTOR DB SYNC",
      detail: "1,420 docs indexed · semantic retrieval",
      z: 120,
      pos: "top-1/2 -left-6 md:-left-24",
    },
  ],
  [
    {
      label: "📊 POWER BI MATRIX",
      detail: "Executive KPIs refreshed in real time",
      z: 180,
      pos: "-top-5 -right-4 md:-top-8 md:-right-16",
    },
    {
      label: "📈 PINE SCRIPT QUANT",
      detail: "Custom indicators wired to live market data",
      z: 210,
      pos: "-bottom-5 -left-4 md:-bottom-8 md:-left-16",
    },
    {
      label: "🛰️ STREAM",
      detail: "WebSocket telemetry bus · SQL backbone",
      z: 130,
      pos: "top-1/2 -left-6 md:-left-28",
      live: true,
    },
  ],
];

/* ── Main component ───────────────────────────────────────── */

export default function ScrollServicesWorld() {
  const sectionRef = useRef<HTMLElement>(null);
  const cameraRef = useRef<HTMLDivElement>(null);
  const stageRefs = useRef<(HTMLDivElement | null)[]>([]);
  const floorInnerRef = useRef<HTMLDivElement>(null);
  const layerRefs = useRef<(HTMLDivElement | null)[]>([]);
  const glowRef = useRef<HTMLDivElement>(null);
  const meterRef = useRef<HTMLDivElement>(null);

  const [activeIdx, setActiveIdx] = useState(0);

  const smooth = useRef(0);
  const pointer = useRef({ x: 0, y: 0 });
  const pointerSmooth = useRef({ x: 0, y: 0 });
  const activeRef = useRef(-1);

  /* rAF camera-flight loop — writes transforms directly to DOM */
  useEffect(() => {
    let raf = 0;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    const tick = () => {
      const section = sectionRef.current;
      if (section) {
        const rect = section.getBoundingClientRect();
        const total = rect.height - window.innerHeight;
        const target = total > 0 ? clamp(-rect.top / total, 0, 1) : 0;

        smooth.current += (target - smooth.current) * (reduced ? 1 : 0.09);
        if (Math.abs(target - smooth.current) < 0.0004) smooth.current = target;

        pointerSmooth.current.x += (pointer.current.x - pointerSmooth.current.x) * 0.06;
        pointerSmooth.current.y += (pointer.current.y - pointerSmooth.current.y) * 0.06;

        const p = smooth.current;
        const f = clamp((p - HUD_ZONE) / (1 - HUD_ZONE * 2), 0, 1); // flight progress 0..1

        /* Camera flight */
        const camZ = f * DEPTH * (N - 1);
        const rotX = Math.sin(f * Math.PI * 2) * 2.5 + pointerSmooth.current.y * -3;
        const rotY = Math.sin(f * Math.PI * 3) * 4 + pointerSmooth.current.x * 5;
        const camX = Math.sin(f * Math.PI * N) * 36 + pointerSmooth.current.x * 22;
        const camY = pointerSmooth.current.y * 14;

        if (cameraRef.current) {
          cameraRef.current.style.transform = `translate3d(${camX.toFixed(1)}px, ${camY.toFixed(1)}px, ${camZ.toFixed(1)}px) rotateX(${rotX.toFixed(2)}deg) rotateY(${rotY.toFixed(2)}deg)`;
        }

        /* Stage planes — visibility from camera distance */
        for (let i = 0; i < N; i++) {
          const el = stageRefs.current[i];
          if (!el) continue;
          const dist = Math.abs(camZ - i * DEPTH); // 0 = perfectly framed
          const opacity = clamp(1.15 - dist / (DEPTH * 0.52), 0, 1);
          const blur = clamp((dist / DEPTH - 0.18) * 9, 0, 9);
          el.style.opacity = opacity.toFixed(3);
          el.style.filter = blur > 0.2 ? `blur(${blur.toFixed(1)}px)` : "none";
          el.style.visibility = opacity <= 0.01 ? "hidden" : "visible";
          el.style.pointerEvents = dist < DEPTH * 0.35 ? "auto" : "none";
        }

        /* Glowing grid floor — scrolls toward viewer with accent crossfade */
        const flt = f * (N - 1);
        const idx = Math.round(flt);
        const frac = flt - Math.floor(flt);
        const c1 = SERVICE_WORLDS[Math.floor(flt)].accentColor;
        const c2 = SERVICE_WORLDS[Math.min(N - 1, Math.floor(flt) + 1)].accentColor;
        const fl = floorInnerRef.current;
        if (fl) {
          fl.style.backgroundPositionY = `${(p * 640).toFixed(1)}px`;
          fl.style.backgroundImage = `linear-gradient(to right, ${c1}30 1px, transparent 1px), linear-gradient(to bottom, ${c1}30 1px, transparent 1px), linear-gradient(to right, ${c2}30 1px, transparent 1px), linear-gradient(to bottom, ${c2}30 1px, transparent 1px)`;
          fl.style.backgroundSize = "56px 56px, 56px 56px, 56px 56px, 56px 56px";
          const off = frac * 56;
          fl.style.backgroundPosition = `0px 0px, 0px 0px, 0px ${off.toFixed(1)}px, 0px ${off.toFixed(1)}px`;
          fl.style.opacity = String(1 - Math.abs(frac - 0.5) * 0.4);
        }
        if (glowRef.current) {
          glowRef.current.style.backgroundColor = SERVICE_WORLDS[idx].accentColor;
        }

        /* Parallax dust layers */
        const layers = layerRefs.current;
        if (layers[0]) layers[0].style.transform = `translateY(${(-p * 90).toFixed(1)}px)`;
        if (layers[1]) layers[1].style.transform = `translateY(${(-p * 170).toFixed(1)}px)`;
        if (layers[2]) layers[2].style.transform = `translateY(${(-p * 280).toFixed(1)}px)`;

        /* HUD progress meter */
        if (meterRef.current) {
          meterRef.current.style.transform = `scaleX(${p.toFixed(4)})`;
        }

        /* Active world — React state only on change */
        const ai = Math.min(N - 1, Math.round(flt));
        if (ai !== activeRef.current) {
          activeRef.current = ai;
          setActiveIdx(ai);
        }
      }
      raf = requestAnimationFrame(tick);
    };

    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, []);

  /* Pointer parallax */
  useEffect(() => {
    const onMove = (e: PointerEvent) => {
      pointer.current.x = (e.clientX / window.innerWidth) * 2 - 1;
      pointer.current.y = (e.clientY / window.innerHeight) * 2 - 1;
    };
    window.addEventListener("pointermove", onMove, { passive: true });
    return () => window.removeEventListener("pointermove", onMove);
  }, []);

  const scrollToWorld = useCallback((idx: number) => {
    const section = sectionRef.current;
    if (!section) return;
    const rect = section.getBoundingClientRect();
    const total = rect.height - window.innerHeight;
    const target =
      window.scrollY + rect.top + (HUD_ZONE + (idx / (N - 1)) * (1 - HUD_ZONE * 2)) * total;
    window.scrollTo({ top: target, behavior: "smooth" });
  }, []);

  const activeWorld = SERVICE_WORLDS[activeIdx];

  return (
    <section
      ref={sectionRef}
      id="services-3d-world"
      aria-label="Interactive 3D services world"
      className="snap-section relative w-full h-[400vh] bg-[#050508]"
    >
      {/* Sticky 3D viewport — no overflow-hidden ancestors, so this pins */}
      <div className="sticky top-0 h-svh overflow-hidden select-none">
        {/* Ambient accent glow (color set per-frame) */}
        <div
          ref={glowRef}
          className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[min(80vw,600px)] h-[min(80vw,600px)] rounded-full blur-[140px] pointer-events-none opacity-[0.16] transition-colors duration-500"
          style={{ backgroundColor: SERVICE_WORLDS[0].accentColor }}
        />

        {/* Parallax dust layers */}
        <div ref={(el) => { layerRefs.current[0] = el; }} className="absolute inset-0 pointer-events-none opacity-30 bg-[radial-gradient(circle_at_20%_30%,rgba(255,255,255,0.09)_1px,transparent_1.5px)] bg-[size:180px_180px]" />
        <div ref={(el) => { layerRefs.current[1] = el; }} className="absolute inset-0 pointer-events-none opacity-20 bg-[radial-gradient(circle_at_70%_60%,rgba(255,255,255,0.12)_1px,transparent_1.5px)] bg-[size:260px_260px]" />
        <div ref={(el) => { layerRefs.current[2] = el; }} className="absolute inset-0 pointer-events-none opacity-10 bg-[radial-gradient(circle_at_45%_80%,rgba(255,255,255,0.16)_1.5px,transparent_2px)] bg-[size:380px_380px]" />

        {/* Glowing grid floor */}
        <div
          className="absolute left-[-60%] right-[-60%] bottom-[-12%] h-[75%] pointer-events-none"
          style={{
            transform: "perspective(900px) rotateX(64deg)",
            transformOrigin: "50% 100%",
            WebkitMaskImage:
              "linear-gradient(to top, rgba(0,0,0,0.9) 0%, rgba(0,0,0,0.35) 55%, transparent 90%)",
            maskImage:
              "linear-gradient(to top, rgba(0,0,0,0.9) 0%, rgba(0,0,0,0.35) 55%, transparent 90%)",
          }}
        >
          <div ref={floorInnerRef} className="absolute inset-0" />
        </div>

        {/* 3D perspective viewport */}
        <div
          className="absolute inset-0"
          style={{ perspective: "1100px", perspectiveOrigin: "50% 46%" }}
        >
          <div
            ref={cameraRef}
            className="absolute inset-0 will-change-transform"
            style={{ transformStyle: "preserve-3d" }}
          >
            {SERVICE_WORLDS.map((world, i) => (
              <div
                key={world.id}
                ref={(el) => { stageRefs.current[i] = el; }}
                className="absolute inset-0 flex items-center justify-center will-change-transform"
                style={{
                  transform: `translateZ(${-i * DEPTH}px)`,
                  transformStyle: "preserve-3d",
                  visibility: i === 0 ? "visible" : "hidden",
                }}
              >
                {/* Depth ring behind each stage */}
                <div
                  className="absolute w-[min(88vw,42rem)] h-[min(88vw,42rem)] rounded-full border border-dashed opacity-25 animate-[spin_40s_linear_infinite] pointer-events-none"
                  style={{
                    borderColor: world.accentColor,
                    transform: "translateZ(-160px)",
                  }}
                />
                <div
                  className="absolute w-[min(70vw,30rem)] h-[min(70vw,30rem)] rounded-full blur-[90px] opacity-20 pointer-events-none"
                  style={{
                    backgroundColor: world.accentColor,
                    transform: "translateZ(-220px)",
                  }}
                />

                {/* Floating interactive telemetry badges (multi-plane Z) */}
                <div
                  className="absolute inset-0 flex items-center justify-center pointer-events-none"
                  style={{ transformStyle: "preserve-3d" }}
                >
                  <div
                    className="relative w-full max-w-[min(92vw,36rem)] h-full pointer-events-none"
                    style={{ transformStyle: "preserve-3d" }}
                  >
                    {WORLD_BADGES[i].map((spec) => (
                      <TelemetryBadge key={spec.label} spec={spec} color={world.accentColor} />
                    ))}
                  </div>
                </div>

                {/* Deep 3D component panel */}
                {i === 0 && <StorefrontPanel />}
                {i === 1 && <AgentTerminalPanel />}
                {i === 2 && <AnalyticsPanel />}
              </div>
            ))}
          </div>
        </div>

        {/* Vignette + scanline flavor */}
        <div className="absolute inset-0 pointer-events-none bg-[radial-gradient(ellipse_at_center,transparent_55%,rgba(0,0,0,0.55)_100%)]" />

        {/* ── Top HUD ── */}
        <div className="absolute top-0 left-0 right-0 z-30 flex items-center justify-between gap-3 max-w-7xl mx-auto w-full px-4 md:px-8 pt-16 md:pt-20">
          <div className="flex items-center gap-2.5 min-w-0">
            <span
              className="w-2.5 h-2.5 rounded-full animate-ping shrink-0"
              style={{ backgroundColor: activeWorld.accentColor }}
            />
            <span className="text-[11px] md:text-xs font-mono tracking-widest text-white/70 truncate">
              {activeWorld.worldNumber}
            </span>
          </div>

          <div className="flex items-center gap-1.5 md:gap-2 bg-[#101014]/90 backdrop-blur-md px-2 md:px-3 py-1.5 rounded-full border border-white/10 shadow-xl shrink-0">
            {SERVICE_WORLDS.map((w, idx) => (
              <button
                key={w.id}
                onClick={() => scrollToWorld(idx)}
                aria-label={`Fly to ${w.shortName}`}
                className={`px-2.5 md:px-3 py-1 rounded-full text-[11px] md:text-xs font-mono transition-all duration-300 ${
                  idx === activeIdx
                    ? "bg-white/15 text-white border border-white/20 shadow-[0_0_15px_rgba(255,255,255,0.1)]"
                    : "text-white/40 hover:text-white/70"
                }`}
              >
                0{idx + 1}
              </button>
            ))}
          </div>
        </div>

        {/* ── Bottom HUD: service intel card + progress meter ── */}
        <div className="absolute bottom-0 left-0 right-0 z-30 max-w-7xl mx-auto w-full px-4 md:px-8 pb-4 md:pb-6">
          {/* Flight progress meter */}
          <div className="flex items-center gap-3 mb-3 md:mb-4">
            <span className="text-[10px] font-mono text-white/40 tracking-widest shrink-0">
              FLIGHT PATH
            </span>
            <div className="relative flex-1 h-px bg-white/10 overflow-visible">
              <div
                ref={meterRef}
                className="absolute inset-0 origin-left"
                style={{
                  backgroundColor: activeWorld.accentColor,
                  transform: "scaleX(0)",
                  boxShadow: `0 0 8px ${activeWorld.accentColor}`,
                }}
              />
              {SERVICE_WORLDS.map((w, i) => (
                <button
                  key={w.id}
                  onClick={() => scrollToWorld(i)}
                  aria-label={`Waypoint ${w.shortName}`}
                  className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 w-2 h-2 rounded-full border transition-colors duration-300"
                  style={{
                    left: `${(i / (N - 1)) * 100}%`,
                    backgroundColor: i <= activeIdx ? w.accentColor : "#1a1a20",
                    borderColor: i <= activeIdx ? w.accentColor : "rgba(255,255,255,0.25)",
                    boxShadow: i === activeIdx ? `0 0 10px ${w.accentColor}` : "none",
                  }}
                />
              ))}
            </div>
            <span className="text-[10px] font-mono tracking-widest shrink-0" style={{ color: activeWorld.accentColor }}>
              {String(activeIdx + 1).padStart(2, "0")}/03
            </span>
          </div>

          <AnimatePresence mode="wait">
            <motion.div
              key={activeWorld.id}
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -14 }}
              transition={{ duration: 0.3 }}
              className="grid grid-cols-1 lg:grid-cols-3 gap-3 md:gap-4 p-4 md:p-5 rounded-2xl bg-[#0F0F14]/90 border border-white/10 backdrop-blur-2xl shadow-2xl"
            >
              <div className="lg:col-span-2 space-y-1.5 md:space-y-2 min-w-0">
                <div className="flex items-center justify-between gap-2">
                  <span className="text-[10px] md:text-xs font-mono text-white/50 tracking-wider truncate">
                    {activeWorld.category}
                  </span>
                  <span
                    className="px-2.5 md:px-3 py-0.5 rounded-full text-[10px] md:text-xs font-mono border shrink-0"
                    style={{
                      color: activeWorld.accentColor,
                      borderColor: `${activeWorld.accentColor}50`,
                      backgroundColor: `${activeWorld.accentColor}15`,
                    }}
                  >
                    {activeWorld.badge}
                  </span>
                </div>

                <h3 className="text-base md:text-xl font-bold text-white tracking-tight">
                  {activeWorld.title}
                </h3>

                <p className="text-[11px] md:text-sm text-gray-300 leading-relaxed line-clamp-2 md:line-clamp-none">
                  {activeWorld.description}
                </p>

                <div className="hidden sm:flex flex-wrap gap-1.5 md:gap-2 pt-0.5">
                  {activeWorld.tags.map((tag) => (
                    <span
                      key={tag}
                      className="px-2 md:px-2.5 py-0.5 md:py-1 rounded-md bg-white/5 border border-white/10 text-[10px] md:text-xs font-mono text-white/80"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>

              {/* Metric impact panel */}
              <div className="flex lg:flex-col items-center lg:items-stretch justify-between gap-3 p-3 md:p-4 rounded-xl bg-white/[0.03] border border-white/5">
                <div className="text-[10px] md:text-[11px] font-mono text-white/50 tracking-widest shrink-0">
                  BENCHMARK
                </div>
                <div className="lg:my-1 min-w-0">
                  <div
                    className="text-2xl md:text-3xl font-extrabold tracking-tight font-mono"
                    style={{ color: activeWorld.accentColor }}
                  >
                    {activeWorld.metric}
                  </div>
                  <div className="text-[10px] md:text-xs text-gray-400 mt-0.5 truncate">
                    {activeWorld.metricLabel}
                  </div>
                </div>
                <div className="hidden lg:block w-full bg-white/10 h-1.5 rounded-full overflow-hidden">
                  <div
                    className="h-full rounded-full transition-all duration-500"
                    style={{
                      width: `${((activeIdx + 1) / N) * 100}%`,
                      backgroundColor: activeWorld.accentColor,
                    }}
                  />
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}

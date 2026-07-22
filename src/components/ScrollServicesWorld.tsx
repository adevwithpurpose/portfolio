"use client";

import { useRef, useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import SectionWrapper from "@/components/SectionWrapper";

interface ServiceWorldData {
  id: string;
  worldNumber: string;
  category: string;
  title: string;
  tagline: string;
  accentColor: string; // Hex color
  accentGlow: string; // CSS shadow / glow color
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
    category: "STOREFRONT & HEADLESS ARCHITECTURE",
    title: "High-Conversion Shopify Dawn & Headless Systems",
    tagline: "Bypassing page-builder bloat for sub-second speeds and custom commerce workflows.",
    accentColor: "#10B981", // Emerald
    accentGlow: "rgba(16, 185, 129, 0.4)",
    badge: "98+ Lighthouse",
    metric: "0.4s",
    metricLabel: "Measured LCP (Largest Contentful Paint)",
    tags: ["Shopify Dawn", "Liquid", "Astro", "TinaCMS", "GraphQL"],
    description:
      "Engineered storefronts that load instantly, convert higher, and allow full editorial freedom without sacrificing speed or custom design.",
  },
  {
    id: "world-ai",
    worldNumber: "WORLD 02 // AI COMMAND CENTER",
    category: "AUTONOMOUS AI & AGENTIC TOOLING",
    title: "FastAPI, Crawl4AI & Autonomous Workflows",
    tagline: "Deploying high-leverage agent pipelines and serverless API automation.",
    accentColor: "#06B6D4", // Cyan
    accentGlow: "rgba(6, 182, 212, 0.4)",
    badge: "10x Ops Leverage",
    metric: "100%",
    metricLabel: "Automated Data Extraction & Ingestion",
    tags: ["FastAPI", "Crawl4AI", "Python", "Hermes Agent", "Vector Search"],
    description:
      "Custom web scrapers, LLM data ingestion pipelines, and agentic workflows that run autonomously in the background.",
  },
  {
    id: "world-systems",
    worldNumber: "WORLD 03 // TELEMETRY MATRIX",
    category: "CUSTOM SYSTEMS & ANALYTICS",
    title: "Power BI & Engineering Integrations",
    tagline: "Translating complex operational data into real-time decision dashboards.",
    accentColor: "#A855F7", // Purple
    accentGlow: "rgba(168, 85, 247, 0.4)",
    badge: "Real-time Telemetry",
    metric: "<0.2s",
    metricLabel: "Stream Latency",
    tags: ["Power BI", "Pine Script", "REST/GraphQL", "SQL", "Mechatronics Eng"],
    description:
      "Executive data dashboards, Pine Script quant indicators, and hardware-software telemetry integrations.",
  },
];

export default function ScrollServicesWorld() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [activeIdx, setActiveIdx] = useState(0);

  // Live simulation states for interactive 3D components
  const [activeStoreTab, setActiveStoreTab] = useState<"checkout" | "liquid" | "astro">("checkout");
  const [terminalLogIdx, setTerminalLogIdx] = useState(0);

  const logs = [
    "[Crawl4AI] Initializing browser context...",
    "[FastAPI] GET /v1/scrape/target - 200 OK (12ms)",
    "[Hermes Agent] Parsing DOM schema & extracting JSON...",
    "[Pipeline] 1,420 items indexed to Vector DB",
    "[System] Standby for next extraction batch...",
  ];

  // Rotate log terminal text periodically
  useEffect(() => {
    const timer = setInterval(() => {
      setTerminalLogIdx((prev) => (prev + 1) % logs.length);
    }, 2400);
    return () => clearInterval(timer);
  }, [logs.length]);

  // Track overall scroll progress within the 400vh section
  useEffect(() => {
    const handleScroll = () => {
      if (!containerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      const windowHeight = window.innerHeight;
      const totalScrollable = rect.height - windowHeight;
      if (totalScrollable <= 0) return;

      const currentScroll = Math.max(0, -rect.top);
      const progress = Math.min(1, Math.max(0, currentScroll / totalScrollable));
      setScrollProgress(progress);

      // Determine active service world (0, 1, or 2)
      const currentIdx = Math.min(
        SERVICE_WORLDS.length - 1,
        Math.floor(progress * SERVICE_WORLDS.length)
      );
      setActiveIdx(currentIdx);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Compute 3D Camera Flight Position per section segment
  const segmentProgress = (scrollProgress * SERVICE_WORLDS.length) % 1;
  const activeWorld = SERVICE_WORLDS[activeIdx];

  // Deep 3D Z-flight + camera rotation
  const cameraZ = -150 + segmentProgress * 320; // Flies forward through Z space
  const cameraRotX = 22 - Math.sin(segmentProgress * Math.PI) * 12; // Dynamic pitch
  const cameraRotY = -18 + segmentProgress * 36; // Dynamic yaw sweep

  return (
    <SectionWrapper id="services-3d-world" className="relative min-h-[400vh] bg-[#060608]">
      {/* Sticky 3D Viewport Stage */}
      <div
        ref={containerRef}
        className="sticky top-0 left-0 w-full h-screen overflow-hidden flex flex-col justify-between p-4 md:p-8 select-none"
      >
        {/* Ambient Glows & Cyber Grid Background */}
        <div className="absolute inset-0 pointer-events-none opacity-25 bg-[linear-gradient(to_right,#ffffff08_1px,transparent_1px),linear-gradient(to_bottom,#ffffff08_1px,transparent_1px)] bg-[size:40px_40px]" />
        
        <div
          className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[600px] h-[600px] rounded-full blur-[140px] pointer-events-none transition-colors duration-700 opacity-20"
          style={{ backgroundColor: activeWorld.accentColor }}
        />

        {/* Top HUD Bar */}
        <div className="relative z-30 flex items-center justify-between max-w-7xl mx-auto w-full pt-2">
          <div className="flex items-center gap-3">
            <span className="w-2.5 h-2.5 rounded-full animate-ping" style={{ backgroundColor: activeWorld.accentColor }} />
            <span className="text-xs font-mono tracking-widest text-white/70">
              {activeWorld.worldNumber}
            </span>
          </div>

          {/* Nav / World Selector Pills */}
          <div className="flex items-center gap-2 bg-[#101014]/90 backdrop-blur-md px-3 py-1.5 rounded-full border border-white/10 shadow-xl">
            {SERVICE_WORLDS.map((w, idx) => (
              <button
                key={w.id}
                onClick={() => {
                  if (!containerRef.current) return;
                  const rect = containerRef.current.getBoundingClientRect();
                  const target =
                    window.scrollY +
                    rect.top +
                    (idx / SERVICE_WORLDS.length) * (rect.height - window.innerHeight);
                  window.scrollTo({ top: target, behavior: "smooth" });
                }}
                className={`px-3 py-1 rounded-full text-xs font-mono transition-all duration-300 ${
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

        {/* Main 3D Space Viewport */}
        <div className="relative z-20 flex-1 w-full max-w-7xl mx-auto flex items-center justify-center perspective-[1200px] my-2">
          
          {/* 3D Camera Container */}
          <div
            className="relative w-full max-w-4xl h-[400px] md:h-[460px] transform-style-3d transition-transform duration-100 ease-out"
            style={{
              transform: `rotateX(${cameraRotX}deg) rotateY(${cameraRotY}deg) translateZ(${cameraZ}px)`,
            }}
          >
            {/* 3D Isometric Base Grid Floor */}
            <div className="absolute inset-0 rounded-3xl bg-gradient-to-b from-[#121216]/90 to-[#0A0A0E]/95 border border-white/10 shadow-[0_40px_100px_rgba(0,0,0,0.9)] transform-style-3d overflow-hidden">
              <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_0%,#000000_80%)]" />
              
              {/* Glowing floor grid lines */}
              <div
                className="absolute inset-0 opacity-30 bg-[linear-gradient(to_right,#ffffff15_1px,transparent_1px),linear-gradient(to_bottom,#ffffff15_1px,transparent_1px)] bg-[size:36px_36px]"
              />

              {/* Glowing Horizon Ring */}
              <div
                className="absolute -top-24 left-1/2 -translate-x-1/2 w-96 h-96 rounded-full border border-dashed opacity-40 animate-[spin_30s_linear_infinite]"
                style={{ borderColor: activeWorld.accentColor }}
              />
            </div>

            {/* WORLD 01: REAL 3D E-COMMERCE STOREFRONT COMPONENT */}
            {activeIdx === 0 && (
              <motion.div
                initial={{ opacity: 0, scale: 0.85 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.85 }}
                transition={{ duration: 0.4 }}
                className="absolute inset-0 flex items-center justify-center p-4 transform-style-3d"
              >
                {/* Background Parallax Depth Telemetry Floating Badges */}
                <div
                  className="absolute -top-6 -left-6 px-4 py-2 rounded-xl bg-[#16161D]/90 border border-emerald-500/40 backdrop-blur-md text-emerald-400 font-mono text-xs shadow-2xl transition-transform duration-200"
                  style={{ transform: `translate3d(-40px, -20px, 120px)` }}
                >
                  ⚡ LIGHTHOUSE 98/100
                </div>

                <div
                  className="absolute -bottom-6 -right-6 px-4 py-2 rounded-xl bg-[#16161D]/90 border border-teal-500/40 backdrop-blur-md text-teal-300 font-mono text-xs shadow-2xl transition-transform duration-200"
                  style={{ transform: `translate3d(40px, 30px, 140px)` }}
                >
                  🚀 SUB-SECOND LCP: 0.4s
                </div>

                {/* 3D Storefront Glass Component Frame */}
                <div
                  className="relative z-20 w-full max-w-xl bg-[#0F0F14]/95 border border-emerald-500/30 rounded-2xl p-5 backdrop-blur-2xl shadow-[0_20px_50px_rgba(0,0,0,0.8)] space-y-4"
                  style={{ transform: "translateZ(60px)" }}
                >
                  {/* Browser Header Bar */}
                  <div className="flex items-center justify-between pb-3 border-b border-white/10">
                    <div className="flex items-center gap-2">
                      <span className="w-3 h-3 rounded-full bg-red-500/80" />
                      <span className="w-3 h-3 rounded-full bg-yellow-500/80" />
                      <span className="w-3 h-3 rounded-full bg-green-500/80" />
                      <span className="ml-2 text-xs font-mono text-white/50">store.safeer-os.dev</span>
                    </div>
                    <div className="flex gap-1 text-[11px] font-mono">
                      <button
                        onClick={() => setActiveStoreTab("checkout")}
                        className={`px-2.5 py-1 rounded-md transition-colors ${
                          activeStoreTab === "checkout" ? "bg-emerald-500/20 text-emerald-400 border border-emerald-500/30" : "text-white/40"
                        }`}
                      >
                        UI Storefront
                      </button>
                      <button
                        onClick={() => setActiveStoreTab("liquid")}
                        className={`px-2.5 py-1 rounded-md transition-colors ${
                          activeStoreTab === "liquid" ? "bg-emerald-500/20 text-emerald-400 border border-emerald-500/30" : "text-white/40"
                        }`}
                      >
                        Shopify Dawn
                      </button>
                      <button
                        onClick={() => setActiveStoreTab("astro")}
                        className={`px-2.5 py-1 rounded-md transition-colors ${
                          activeStoreTab === "astro" ? "bg-emerald-500/20 text-emerald-400 border border-emerald-500/30" : "text-white/40"
                        }`}
                      >
                        Astro API
                      </button>
                    </div>
                  </div>

                  {/* Interactive Tab Visualizer */}
                  {activeStoreTab === "checkout" && (
                    <div className="grid grid-cols-3 gap-3 pt-1">
                      <div className="col-span-1 rounded-xl bg-white/[0.03] border border-white/10 p-3 space-y-2">
                        <div className="w-full h-20 rounded-lg bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center">
                          <svg className="w-8 h-8 stroke-emerald-400 fill-none" viewBox="0 0 24 24" strokeWidth="1.5">
                            <path d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" strokeLinecap="round" strokeLinejoin="round" />
                          </svg>
                        </div>
                        <div className="h-2.5 w-3/4 rounded bg-white/20" />
                        <div className="h-2 w-1/2 rounded bg-emerald-400/60" />
                      </div>

                      <div className="col-span-2 rounded-xl bg-white/[0.02] border border-white/10 p-3 flex flex-col justify-between">
                        <div className="space-y-2">
                          <div className="flex justify-between items-center text-xs font-mono text-white/80">
                            <span>Shopify Storefront API</span>
                            <span className="text-emerald-400 font-bold">PASS 100%</span>
                          </div>
                          <p className="text-xs text-gray-400 leading-relaxed">
                            Liquid sections tuned for zero layout shift (CLS 0.00). Instant variant selection & custom cart drawer without heavy apps.
                          </p>
                        </div>

                        <div className="flex items-center justify-between pt-2 border-t border-white/5 text-[11px] font-mono">
                          <span className="text-white/40">TTFB: 42ms</span>
                          <span className="text-emerald-400">Payload: 14KB</span>
                        </div>
                      </div>
                    </div>
                  )}

                  {activeStoreTab === "liquid" && (
                    <div className="bg-[#09090D] p-3 rounded-xl border border-white/10 text-xs font-mono text-emerald-300 space-y-1 overflow-x-auto">
                      <div><span className="text-purple-400">{"{%"}</span> comment <span className="text-purple-400">{"%}"}</span> Shopify Dawn Custom Section <span className="text-purple-400">{"{%"}</span> endcomment <span className="text-purple-400">{"%}"}</span></div>
                      <div><span className="text-blue-400">&lt;section</span> <span className="text-yellow-300">class=</span><span className="text-emerald-400">&quot;fast-product-grid&quot;</span><span className="text-blue-400">&gt;</span></div>
                      <div className="pl-4"><span className="text-purple-400">{"{%"}</span> <span className="text-blue-300">for</span> product <span className="text-blue-300">in</span> collection.products <span className="text-purple-400">{"%}"}</span></div>
                      <div className="pl-8"><span className="text-purple-400">{"{%"}</span> render <span className="text-emerald-400">&apos;card-product-fast&apos;</span>, card_product: product <span className="text-purple-400">{"%}"}</span></div>
                      <div className="pl-4"><span className="text-purple-400">{"{%"}</span> endfor <span className="text-purple-400">{"%}"}</span></div>
                      <div><span className="text-blue-400">&lt;/section&gt;</span></div>
                    </div>
                  )}

                  {activeStoreTab === "astro" && (
                    <div className="bg-[#09090D] p-3 rounded-xl border border-white/10 text-xs font-mono text-cyan-300 space-y-1">
                      <div><span className="text-purple-400">---</span></div>
                      <div><span className="text-blue-300">import</span> {"{"} getStorefrontProducts {"}"} <span className="text-blue-300">from</span> <span className="text-emerald-400">&apos;@/lib/shopify&apos;</span>;</div>
                      <div><span className="text-blue-300">const</span> products = <span className="text-purple-400">await</span> getStorefrontProducts();</div>
                      <div><span className="text-purple-400">---</span></div>
                      <div>&lt;<span className="text-yellow-300">StorefrontGrid</span> products=&#123;products&#125; /&gt;</div>
                    </div>
                  )}
                </div>
              </motion.div>
            )}

            {/* WORLD 02: REAL 3D AI COMMAND TERMINAL COMPONENT */}
            {activeIdx === 1 && (
              <motion.div
                initial={{ opacity: 0, scale: 0.85 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.85 }}
                transition={{ duration: 0.4 }}
                className="absolute inset-0 flex items-center justify-center p-4 transform-style-3d"
              >
                {/* Orbiting 3D AI Nodes */}
                <div
                  className="absolute -top-8 -right-4 px-4 py-2 rounded-xl bg-[#10151C]/90 border border-cyan-500/40 backdrop-blur-md text-cyan-400 font-mono text-xs shadow-2xl"
                  style={{ transform: `translate3d(40px, -10px, 130px)` }}
                >
                  🤖 CRAWL4AI PARSER
                </div>

                <div
                  className="absolute -bottom-6 -left-4 px-4 py-2 rounded-xl bg-[#10151C]/90 border border-blue-500/40 backdrop-blur-md text-blue-300 font-mono text-xs shadow-2xl"
                  style={{ transform: `translate3d(-30px, 20px, 140px)` }}
                >
                  ⚙️ FASTAPI ENGINE
                </div>

                {/* 3D Terminal Container */}
                <div
                  className="relative z-20 w-full max-w-xl bg-[#0B0F17]/95 border border-cyan-500/30 rounded-2xl p-5 backdrop-blur-2xl shadow-[0_20px_50px_rgba(0,0,0,0.8)] space-y-4"
                  style={{ transform: "translateZ(60px)" }}
                >
                  <div className="flex items-center justify-between pb-3 border-b border-white/10 font-mono text-xs">
                    <div className="flex items-center gap-2 text-cyan-400">
                      <span className="w-2.5 h-2.5 rounded-full bg-cyan-400 animate-pulse" />
                      <span>agent@safeer-os:~ (Crawl4AI + FastAPI)</span>
                    </div>
                    <span className="text-white/40">STATUS: ACTIVE</span>
                  </div>

                  {/* Terminal Output Screen */}
                  <div className="bg-[#05080E] p-4 rounded-xl border border-white/10 font-mono text-xs space-y-2 h-44 flex flex-col justify-between overflow-hidden">
                    <div className="space-y-1 text-cyan-300/90">
                      <div className="text-white/50">$ python3 -m crawl4ai.agent --target=&quot;https://client-site.com&quot;</div>
                      <div className="text-emerald-400">&gt;&gt; Extracting structured JSON schema...</div>
                      <div className="text-cyan-400 font-bold">{logs[terminalLogIdx]}</div>
                    </div>

                    <div className="pt-2 border-t border-white/10 flex items-center justify-between text-[11px] text-white/50">
                      <span>Rate: 120 req/min</span>
                      <span className="text-cyan-400">Latency: 14ms</span>
                    </div>
                  </div>
                </div>
              </motion.div>
            )}

            {/* WORLD 03: REAL 3D TELEMETRY & ANALYTICS COMPONENT */}
            {activeIdx === 2 && (
              <motion.div
                initial={{ opacity: 0, scale: 0.85 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.85 }}
                transition={{ duration: 0.4 }}
                className="absolute inset-0 flex items-center justify-center p-4 transform-style-3d"
              >
                <div
                  className="absolute -top-6 -right-6 px-4 py-2 rounded-xl bg-[#14101A]/90 border border-purple-500/40 backdrop-blur-md text-purple-300 font-mono text-xs shadow-2xl"
                  style={{ transform: `translate3d(30px, -20px, 130px)` }}
                >
                  📊 POWER BI MATRIX
                </div>

                <div
                  className="absolute -bottom-6 -left-6 px-4 py-2 rounded-xl bg-[#14101A]/90 border border-pink-500/40 backdrop-blur-md text-pink-300 font-mono text-xs shadow-2xl"
                  style={{ transform: `translate3d(-40px, 20px, 140px)` }}
                >
                  📈 PINE SCRIPT QUANT
                </div>

                {/* 3D Holographic Dashboard Component */}
                <div
                  className="relative z-20 w-full max-w-xl bg-[#100C16]/95 border border-purple-500/30 rounded-2xl p-5 backdrop-blur-2xl shadow-[0_20px_50px_rgba(0,0,0,0.8)] space-y-4"
                  style={{ transform: "translateZ(60px)" }}
                >
                  <div className="flex items-center justify-between pb-3 border-b border-white/10 font-mono text-xs">
                    <span className="text-purple-400">EXECUTIVE TELEMETRY STREAM</span>
                    <span className="text-white/40">LATENCY: &lt;0.2s</span>
                  </div>

                  {/* Holographic 3D Data Bars */}
                  <div className="grid grid-cols-4 gap-3 h-40 items-end p-4 rounded-xl bg-white/[0.02] border border-white/10">
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
              </motion.div>
            )}

          </div>
        </div>

        {/* Bottom Floating Service Info & Specs Card */}
        <div className="relative z-30 max-w-7xl mx-auto w-full">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeWorld.id}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.3 }}
              className="grid grid-cols-1 lg:grid-cols-3 gap-4 p-5 rounded-2xl bg-[#0F0F14]/90 border border-white/10 backdrop-blur-2xl shadow-2xl"
            >
              <div className="lg:col-span-2 space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-mono text-white/50 tracking-wider">
                    {activeWorld.category}
                  </span>
                  <span
                    className="px-3 py-0.5 rounded-full text-xs font-mono border"
                    style={{
                      color: activeWorld.accentColor,
                      borderColor: `${activeWorld.accentColor}50`,
                      backgroundColor: `${activeWorld.accentColor}15`,
                    }}
                  >
                    {activeWorld.badge}
                  </span>
                </div>

                <h3 className="text-lg md:text-xl font-bold text-white tracking-tight">
                  {activeWorld.title}
                </h3>

                <p className="text-xs md:text-sm text-gray-300 leading-relaxed">
                  {activeWorld.description}
                </p>

                <div className="flex flex-wrap gap-2 pt-1">
                  {activeWorld.tags.map((tag) => (
                    <span
                      key={tag}
                      className="px-2.5 py-1 rounded-md bg-white/5 border border-white/10 text-xs font-mono text-white/80"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>

              {/* Metric Impact Panel */}
              <div className="flex flex-col justify-between p-4 rounded-xl bg-white/[0.03] border border-white/5">
                <div className="text-[11px] font-mono text-white/50 tracking-widest">
                  BENCHMARK METRIC
                </div>
                <div className="my-1">
                  <div
                    className="text-3xl font-extrabold tracking-tight font-mono"
                    style={{ color: activeWorld.accentColor }}
                  >
                    {activeWorld.metric}
                  </div>
                  <div className="text-xs text-gray-400 mt-0.5">
                    {activeWorld.metricLabel}
                  </div>
                </div>
                <div className="w-full bg-white/10 h-1.5 rounded-full overflow-hidden">
                  <div
                    className="h-full rounded-full transition-all duration-500"
                    style={{
                      width: `${(activeIdx + 1) * 33.33}%`,
                      backgroundColor: activeWorld.accentColor,
                    }}
                  />
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>

      </div>
    </SectionWrapper>
  );
}

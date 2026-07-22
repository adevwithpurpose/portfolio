"use client";

import { useRef, useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import SectionWrapper from "@/components/SectionWrapper";

interface ServiceIsland {
  id: string;
  title: string;
  category: string;
  badge: string;
  metric: string;
  metricLabel: string;
  description: string;
  tags: string[];
  color: string; // Tailwind hex / rgb string
  glowClass: string;
  accentHex: string;
  iconSvg: React.ReactNode;
  dioramaNodes: { label: string; x: number; y: number; z: number; type: string }[];
}

const SERVICE_ISLANDS: ServiceIsland[] = [
  {
    id: "headless-ecommerce",
    category: "01 // STOREFRONT ARCHITECTURE",
    title: "Headless E-Commerce & Shopify Dawn",
    badge: "Sub-second LCP",
    metric: "98+",
    metricLabel: "Lighthouse Performance Score",
    description:
      "Bespoke Shopify Dawn Liquid & headless storefronts built for extreme speed, high conversion rates, and total design control without page-builder bloat.",
    tags: ["Shopify Dawn", "Liquid", "Astro", "TinaCMS", "Headless GraphQL"],
    color: "#10B981", // Emerald
    glowClass: "from-emerald-500/20 to-teal-500/5 border-emerald-500/30 text-emerald-400",
    accentHex: "#10B981",
    iconSvg: (
      <svg className="w-6 h-6 stroke-emerald-400 fill-none" viewBox="0 0 24 24" strokeWidth="2">
        <path d="M6 2L3 6v14a2 2 0 002 2h14a2 2 0 002-2V6l-3-4zM3 6h18M16 10a4 4 0 01-8 0" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
    dioramaNodes: [
      { label: "Shopify Storefront API", x: -60, y: -40, z: 40, type: "core" },
      { label: "Dawn Liquid Engine", x: 70, y: -20, z: 20, type: "node" },
      { label: "Headless Astro UI", x: -40, y: 50, z: -30, type: "node" },
      { label: "Sub-Second Cache", x: 50, y: 40, z: -10, type: "node" },
    ],
  },
  {
    id: "ai-agentic-tooling",
    category: "02 // AUTONOMOUS AI SYSTEMS",
    title: "AI Workflows & Crawl4AI Agents",
    badge: "10x Ops Leverage",
    metric: "100%",
    metricLabel: "Automated Data Ingestion",
    description:
      "Custom FastAPI + Crawl4AI scrapers, autonomous agent pipelines (Hermes/OpenCode), and serverless AI tools that automate backend research & client workflows.",
    tags: ["FastAPI", "Crawl4AI", "Python", "OpenAI / Claude API", "Hermes Agent"],
    color: "#06B6D4", // Cyan
    glowClass: "from-cyan-500/20 to-blue-500/5 border-cyan-500/30 text-cyan-400",
    accentHex: "#06B6D4",
    iconSvg: (
      <svg className="w-6 h-6 stroke-cyan-400 fill-none" viewBox="0 0 24 24" strokeWidth="2">
        <rect x="2" y="3" width="20" height="14" rx="2" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M8 21h8M12 17v4M7 8l3 3-3 3M13 14h4" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
    dioramaNodes: [
      { label: "Crawl4AI Engine", x: -50, y: -50, z: 50, type: "core" },
      { label: "FastAPI Gateway", x: 60, y: -30, z: 10, type: "node" },
      { label: "Hermes Agent Subsystems", x: -30, y: 60, z: -20, type: "node" },
      { label: "Vector Search DB", x: 40, y: 30, z: 30, type: "node" },
    ],
  },
  {
    id: "custom-engineering",
    category: "03 // CUSTOM SYSTEMS & ANALYTICS",
    title: "Power BI & Mechatronics Integration",
    badge: "Real-time Telemetry",
    metric: "0.2s",
    metricLabel: "Data Stream Latency",
    description:
      "Engineering-grade web applications, Pine Script trading indicators, and interactive Power BI executive dashboards backed by robust API pipelines.",
    tags: ["Power BI", "Pine Script", "Mechatronics Eng", "REST/GraphQL APIs", "SQL"],
    color: "#A855F7", // Purple
    glowClass: "from-purple-500/20 to-pink-500/5 border-purple-500/30 text-purple-400",
    accentHex: "#A855F7",
    iconSvg: (
      <svg className="w-6 h-6 stroke-purple-400 fill-none" viewBox="0 0 24 24" strokeWidth="2">
        <path d="M18 20V10M12 20V4M6 20v-6" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
    dioramaNodes: [
      { label: "Power BI Engine", x: -70, y: -20, z: 30, type: "core" },
      { label: "Pine Script Quant", x: 50, y: -60, z: 20, type: "node" },
      { label: "Hardware Telemetry", x: -20, y: 50, z: -40, type: "node" },
      { label: "Dashboard Stream", x: 40, y: 40, z: 10, type: "node" },
    ],
  },
];

export default function ScrollServicesWorld() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [activeIdx, setActiveIdx] = useState(0);
  const [scrollProgress, setScrollProgress] = useState(0);

  // Monitor scroll within this pinned 3D world section
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

      // Determine active service island based on scroll depth
      const newIdx = Math.min(
        SERVICE_ISLANDS.length - 1,
        Math.floor(progress * SERVICE_ISLANDS.length)
      );
      setActiveIdx(newIdx);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const activeIsland = SERVICE_ISLANDS[activeIdx];

  // Compute 3D camera flight coordinates based on scroll progress
  const rotX = 25 - scrollProgress * 15; // 25deg -> 10deg tilt
  const rotY = -20 + scrollProgress * 40; // -20deg -> 20deg pan
  const zoomZ = -100 + scrollProgress * 150; // Fly forward into the 3D diorama

  return (
    <SectionWrapper id="services-3d-world" className="relative min-h-[300vh] bg-[#0A0A0C]">
      {/* Sticky 3D Viewport Container */}
      <div ref={containerRef} className="sticky top-0 left-0 w-full h-screen overflow-hidden flex flex-col justify-between p-4 md:p-8">
        
        {/* Atmosphere Grid Background */}
        <div className="absolute inset-0 pointer-events-none opacity-20 bg-[radial-gradient(#10B981_1px,transparent_1px)] [background-size:24px_24px]" />
        <div className="absolute top-0 right-0 w-96 h-96 bg-emerald-500/10 rounded-full blur-[120px] pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-cyan-500/10 rounded-full blur-[120px] pointer-events-none" />

        {/* Section Header */}
        <div className="relative z-20 flex flex-col md:flex-row md:items-end justify-between gap-4 max-w-7xl mx-auto w-full pt-4">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#121215] border border-emerald-500/30 text-emerald-400 text-xs font-mono mb-2">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
              SCROLL 3D DIORAMA WORLD
            </div>
            <h2 className="text-2xl md:text-4xl font-bold text-white tracking-tight">
              Interactive Services & Capabilities
            </h2>
          </div>

          {/* Progress Indicator Dots */}
          <div className="flex items-center gap-3 bg-[#121215]/80 backdrop-blur-md px-4 py-2 rounded-full border border-white/10">
            {SERVICE_ISLANDS.map((island, idx) => (
              <button
                key={island.id}
                onClick={() => {
                  if (!containerRef.current) return;
                  const rect = containerRef.current.getBoundingClientRect();
                  const targetScroll =
                    window.scrollY +
                    rect.top +
                    (idx / SERVICE_ISLANDS.length) * (rect.height - window.innerHeight);
                  window.scrollTo({ top: targetScroll, behavior: "smooth" });
                }}
                className={`transition-all duration-300 rounded-full ${
                  idx === activeIdx
                    ? "w-8 h-2.5 bg-emerald-400 shadow-[0_0_12px_rgba(16,185,129,0.6)]"
                    : "w-2.5 h-2.5 bg-white/20 hover:bg-white/40"
                }`}
                title={island.title}
              />
            ))}
          </div>
        </div>

        {/* Central 3D Canvas / Diorama Scene Area */}
        <div className="relative z-10 w-full flex-1 flex items-center justify-center my-4 perspective-[1200px]">
          
          {/* 3D Rotating Diorama Stage */}
          <div
            className="relative w-full max-w-4xl h-[340px] md:h-[420px] transition-transform duration-200 ease-out transform-style-3d"
            style={{
              transform: `rotateX(${rotX}deg) rotateY(${rotY}deg) translateZ(${zoomZ}px)`,
            }}
          >
            {/* Diorama Base Platform Island */}
            <div className="absolute inset-x-8 bottom-0 h-48 rounded-3xl bg-gradient-to-b from-[#18181C] to-[#0E0E11] border border-white/10 shadow-[0_30px_60px_rgba(0,0,0,0.8)] flex items-center justify-center transform-style-3d">
              {/* Glowing Wireframe Grid on Floor */}
              <div className="absolute inset-0 rounded-3xl opacity-40 bg-[linear-gradient(to_right,#ffffff0a_1px,transparent_1px),linear-gradient(to_bottom,#ffffff0a_1px,transparent_1px)] bg-[size:32px_32px]" />
              
              {/* Central Glowing Platform Ring */}
              <div
                className="w-48 h-48 rounded-full border-2 border-dashed transition-colors duration-500 flex items-center justify-center animate-[spin_20s_linear_infinite]"
                style={{ borderColor: `${activeIsland.accentHex}60` }}
              >
                <div
                  className="w-32 h-32 rounded-full border opacity-50"
                  style={{ borderColor: activeIsland.accentHex }}
                />
              </div>
            </div>

            {/* Floating 3D Service Diorama Nodes */}
            <AnimatePresence mode="wait">
              <motion.div
                key={activeIsland.id}
                initial={{ opacity: 0, scale: 0.8, y: 30 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.8, y: -30 }}
                transition={{ duration: 0.5, ease: "easeOut" }}
                className="absolute inset-0 flex items-center justify-center pointer-events-none transform-style-3d"
              >
                {/* Center Core Node */}
                <div
                  className="relative z-20 p-6 rounded-2xl bg-[#121216]/90 border backdrop-blur-xl shadow-2xl flex flex-col items-center gap-3 transform translate-z-10"
                  style={{ borderColor: `${activeIsland.accentHex}40` }}
                >
                  <div
                    className="p-4 rounded-xl bg-white/5 border border-white/10 shadow-inner"
                    style={{ boxShadow: `0 0 25px ${activeIsland.accentHex}40` }}
                  >
                    {activeIsland.iconSvg}
                  </div>
                  <span className="text-xs font-mono text-white/60 tracking-wider">
                    {activeIsland.category}
                  </span>
                  <h3 className="text-lg font-bold text-white text-center max-w-xs">
                    {activeIsland.title}
                  </h3>
                </div>

                {/* Satellite 3D Diorama Nodes */}
                {activeIsland.dioramaNodes.map((node, i) => (
                  <motion.div
                    key={node.label}
                    initial={{ opacity: 0, x: 0, y: 0 }}
                    animate={{ opacity: 1, x: node.x * 2.2, y: node.y * 1.8 }}
                    transition={{ delay: 0.1 * i, duration: 0.6 }}
                    className="absolute z-10 px-3.5 py-1.5 rounded-lg bg-[#18181E]/95 border border-white/15 backdrop-blur-md shadow-lg flex items-center gap-2 text-xs text-white/80 font-mono"
                    style={{
                      transform: `translate3d(${node.x * 2}px, ${node.y * 1.5}px, ${node.z}px)`,
                    }}
                  >
                    <span
                      className="w-1.5 h-1.5 rounded-full"
                      style={{ backgroundColor: activeIsland.accentHex }}
                    />
                    {node.label}
                  </motion.div>
                ))}
              </motion.div>
            </AnimatePresence>
          </div>
        </div>

        {/* Bottom Floating Info Card & Metrics */}
        <div className="relative z-20 max-w-7xl mx-auto w-full">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeIsland.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.4 }}
              className="grid grid-cols-1 lg:grid-cols-3 gap-4 p-5 rounded-2xl bg-[#121215]/90 border border-white/10 backdrop-blur-xl shadow-2xl"
            >
              {/* Left Column: Category & Description */}
              <div className="lg:col-span-2 space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-mono text-white/50 tracking-wider">
                    {activeIsland.category}
                  </span>
                  <span
                    className="px-2.5 py-0.5 rounded-full text-[11px] font-mono border"
                    style={{
                      color: activeIsland.accentHex,
                      borderColor: `${activeIsland.accentHex}40`,
                      backgroundColor: `${activeIsland.accentHex}10`,
                    }}
                  >
                    {activeIsland.badge}
                  </span>
                </div>
                <p className="text-sm md:text-base text-gray-300 leading-relaxed">
                  {activeIsland.description}
                </p>

                {/* Tech Tags */}
                <div className="flex flex-wrap gap-2 pt-2">
                  {activeIsland.tags.map((tag) => (
                    <span
                      key={tag}
                      className="px-2.5 py-1 rounded-md bg-white/5 border border-white/10 text-xs font-mono text-white/70"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>

              {/* Right Column: Key Metric Highlight */}
              <div className="flex flex-col justify-between p-4 rounded-xl bg-white/[0.03] border border-white/5">
                <div className="text-xs font-mono text-white/50">PERFORMANCE IMPACT</div>
                <div className="my-2">
                  <div
                    className="text-3xl font-extrabold tracking-tight font-mono"
                    style={{ color: activeIsland.accentHex }}
                  >
                    {activeIsland.metric}
                  </div>
                  <div className="text-xs text-gray-400 mt-1">
                    {activeIsland.metricLabel}
                  </div>
                </div>
                <div className="w-full bg-white/10 h-1.5 rounded-full overflow-hidden">
                  <div
                    className="h-full rounded-full transition-all duration-700"
                    style={{
                      width: `${(activeIdx + 1) * 33.33}%`,
                      backgroundColor: activeIsland.accentHex,
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

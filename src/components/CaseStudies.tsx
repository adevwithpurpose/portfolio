"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import SectionWrapper from "@/components/SectionWrapper";

gsap.registerPlugin(ScrollTrigger);

interface ProjectNode {
  id: string;
  tag: string;
  brand: string;
  tagline: string;
  challenge: string;
  solution: string[];
  metrics: { value: string; label: string }[];
  tech: string[];
  type: "ecom" | "n8n" | "ai" | "funnel";
  liveLink?: string;
  visualAsset?: string;
}

const PROJECTS: ProjectNode[] = [
  {
    id: "node-1",
    type: "ecom",
    tag: "Redesign Concept",
    brand: "Luminous Face Yoga",
    tagline: "HTML · CSS · JavaScript · cPanel deployment · Quiet-luxury design",
    challenge:
      "Reshaping a dense course experience into a clearer guided journey to lower user churn and boost premium signups.",
    solution: [
      "Designed a clean high-end aesthetic reflecting quiet luxury B2C design",
      "Created structured grid-based guided courses to ease layout density",
      "Optimized legacy asset compilation for fast load-times on mobile viewports",
    ],
    metrics: [
      { value: "Instant", label: "Mobile Render Speed" },
      { value: "Fluid", label: "Guided Course Journey" },
      { value: "Clean", label: "Quiet-Luxury UI Theme" },
    ],
    tech: ["HTML", "CSS", "JavaScript", "cPanel", "Editorial Design"],
    liveLink: "https://luminous.outafbox.com",
    visualAsset: "/screenshots/luminous.png",
  },
  {
    id: "node-2",
    type: "ecom",
    tag: "Agency Showcase",
    brand: "99ads",
    tagline: "WordPress · PHP · Custom theme · Dynamic portfolio filtering",
    challenge:
      "High-performance website built to turn complex creative services and case studies into a focused, conversion-led B2B lead-generation experience.",
    solution: [
      "Developed custom template layouts optimizing core PHP theme layers",
      "Created dynamic CSS portfolio filtering nodes sorting video ad assets instantly",
      "Engineered clean conversion paths eliminating barrier questions",
    ],
    metrics: [
      { value: "0ms", label: "Filter Latency" },
      { value: "100%", label: "Conversion-led Core UI" },
      { value: "Fast", label: "Asset Loading Engine" },
    ],
    tech: ["WordPress", "PHP", "Tailwind CSS", "Aria Filter API", "Dynamic Search"],
    liveLink: "https://99ads.com",
    visualAsset: "/screenshots/99ads.png",
  },
  {
    id: "node-3",
    type: "ecom",
    tag: "DTC Pet Wellness Store",
    brand: "CalmiCollar",
    tagline: "Shopify · Liquid · CRO landing page · Trust Education",
    challenge:
      "Product-led Shopify experience designed around trust-building education, addressing objections, and a direct path to purchase.",
    solution: [
      "Mapped cart configurations to checkouts to remove shopping blockades",
      "Added customizable objection-handling FAQ tabs inside product templates",
      "Optimized Dawn framework reducing asset sizes for fast mobile response",
    ],
    metrics: [
      { value: "95+", label: "Shopify Speed Index" },
      { value: "⬇ 35%", label: "Objections Drop-off" },
      { value: "Liquid", label: "Optimized Core Build" },
    ],
    tech: ["Shopify Liquid", "Dawn Core", "CRO Funnel Setup", "Vanila JavaScript"],
    liveLink: "https://calmicollar.com",
    visualAsset: "/screenshots/calmicollar.png",
  },
  {
    id: "node-4",
    type: "ecom",
    tag: "Pet Wellness Ecommerce",
    brand: "NuumiPet",
    tagline: "Shopify · Liquid · Wellness-focused information architecture",
    challenge:
      "Ecommerce storefront unifying calming, training, and gut-health products under a warm, editorial dog wellness brand.",
    solution: [
      "Unified diverse catalog lines under a single wellness ecosystem",
      "Wrote custom storytelling blocks emphasizing product quality and trust",
      "Developed optimized collection page flows keeping layout speed pristine",
    ],
    metrics: [
      { value: "92+", label: "Shopify Speed Score" },
      { value: "⬇ 1.8s", label: "Mobile LCP Speed" },
      { value: "Warm", label: "Editorial Commerce UI" },
    ],
    tech: ["Shopify Liquid", "Dawn", "Webpack", "Tailwind CSS", "JavaScript"],
    liveLink: "https://nuumipet.com",
    visualAsset: "/screenshots/nuumi.png",
  },
  {
    id: "node-5",
    type: "ecom",
    tag: "Sleep Products Ecommerce",
    brand: "Amanotte",
    tagline: "Shopify · Liquid · Product-page optimization · 9,700+ reviews",
    challenge:
      "Italian Shopify storefront for premium sleep products, using benefit-led storytelling and social proof to sell comfort and premium transformation.",
    solution: [
      "Statically cached 9,700+ Shopify reviews for fast page rendering",
      "Programmed a clean, hospitality-inspired layout showcasing premium quality",
      "Refactored collection checkouts to decrease user cart abandonment",
    ],
    metrics: [
      { value: "94+", label: "Design Performance Index" },
      { value: "9,700+", label: "Social Proof Reviews" },
      { value: "⬇ 2.2s", label: "Page LCP Latency" },
    ],
    tech: ["Shopify Liquid", "Reviews Caching API", "Conversion Optimization", "Premium UI Styling"],
    liveLink: "https://amanotte.it",
    visualAsset: "/screenshots/amanotte.png",
  },
  {
    id: "node-6",
    type: "ecom",
    tag: "Pet Products Store",
    brand: "FantastiCane",
    tagline: "WordPress · Ecommerce · Promotional UX · accessible design",
    challenge:
      "Ecommerce refresh for an Italian pet brand, presenting complementary wellness products through clear education and offer-led merchandising.",
    solution: [
      "Refactored custom product catalogs to support dynamic promotion blocks",
      "Coded clean, accessible commerce filters with high visual accessibility",
      "Added responsive slider blocks illustrating proper product application",
    ],
    metrics: [
      { value: "2.1s", label: "Time to First Byte (TTFB)" },
      { value: "A++", label: "Accessibility Score" },
      { value: "Bright", label: "Promo-focused Merch UX" },
    ],
    tech: ["WordPress Core", "WooCommerce Engine", "Tailwind", "Responsive Media"],
    liveLink: "https://shop.fantasticane.com",
    visualAsset: "/screenshots/fantasticane.png",
  },
  {
    id: "node-7",
    type: "n8n",
    tag: "Data Pipeline",
    brand: "Ad-Ops Reporting Flow",
    tagline: "n8n.io · Meta Ads API · Google Ads API · Klaviyo API · Slack API",
    challenge:
      "Automated daily gathering of spent and conversion metrics across Meta, Google, Microsoft, and Klaviyo APIs to Google Sheets and client Slack channels.",
    solution: [
      "Integrated ad channel platforms programmatically through custom nodes",
      "Engineered automated spreadsheet validation checking daily values",
      "Despatched daily, weekly, and monthly PDF update digests to client Slack channels",
    ],
    metrics: [
      { value: "100%", label: "Daily Data Sync" },
      { value: "6h/wk", label: "Manual Hours Erased" },
      { value: "0", label: "Human Error Rates" },
    ],
    tech: ["n8n.io Core", "Meta Ads API SDK", "Slack Channel Webhooks", "GSheets API"],
    liveLink: "https://next.theecommarketingcompany.com",
    visualAsset: "/screenshots/99ads.png",
  },
  {
    id: "node-8",
    type: "ai",
    tag: "AI Automation Agent",
    brand: "Autonomous Lead Router",
    tagline: "FastAPI · OpenAI API · ReAct Loop Framework · Webhooks",
    challenge:
      "Inbound developer requests and client requests were processed manually, lagging and missing critical target bids. Built an agent that scans, classifies, and alerts via Slack/WhatsApp.",
    solution: [
      "Crafted an AI router parsing text files, emails, or chat messages",
      "Implemented intent categorization system detecting budget, scope, and urgency",
      "Linked lead validations immediately with custom alerts to Slack & WhatsApp",
      "Built loop logs showing thinking paths so operators can audit outputs",
    ],
    metrics: [
      { value: "< 2s", label: "Triage Classification" },
      { value: "98%", label: "Classification Intent Accuracy" },
      { value: "⬇ 95%", label: "Operator Response Latency" },
    ],
    tech: ["FastAPI", "OpenAI API", "ReAct Loop Framework", "Pinecone", "Webhooks"],
    liveLink: "https://luminous.outafbox.com",
    visualAsset: "/screenshots/luminous.png",
  },
];

export default function CaseStudies({ onEnter }: { onEnter?: () => void }) {
  const [activeNode, setActiveNode] = useState<string>("node-1"); // Default to Luminous Node
  const [tabMode, setTabMode] = useState<"specs" | "visual">("visual"); // Default to visual when load
  const containerRef = useRef<HTMLDivElement>(null);
  const activeProj = PROJECTS.find((p) => p.id === activeNode) || PROJECTS[0];

  // Reset tab mode to visual when switching projects
  const handleNodeSwitch = (id: string) => {
    setActiveNode(id);
    setTabMode("visual");
  };

  // GSAP Entrance
  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        ".control-panel",
        { opacity: 0, scale: 0.98, y: 30 },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 0.8,
          ease: "power2.out",
          scrollTrigger: {
            trigger: containerRef.current,
            start: "top 75%",
          },
        }
      );
    });
    return () => ctx.revert();
  }, []);

  return (
    <SectionWrapper
      id="case-studies"
      className="relative py-24 overflow-hidden border-t border-white/5"
      onEnter={onEnter}
    >
      {/* Background grids */}
      <div className="absolute inset-0 pointer-events-none opacity-20">
        <div className="absolute top-12 left-12 w-64 h-64 rounded-full bg-blue-500/20 blur-[100px]" />
      </div>

      <div className="relative z-10 mx-auto max-w-6xl px-6 w-full" ref={containerRef}>
        {/* Eyebrow Label */}
        <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-blue-500/20 bg-blue-500/5 px-4 py-1.5 text-xs font-medium uppercase tracking-widest text-blue-400/80 backdrop-blur-sm">
          <span className="h-1.5 w-1.5 rounded-full bg-blue-400 animate-pulse" />
          Operations Center &mdash; Project Nodes
        </div>

        {/* Section Heading */}
        <div className="mb-12 max-w-2xl">
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white leading-tight tracking-tight">
            Selected Live Case Studies
          </h2>
          <p className="mt-3 text-zinc-400 text-sm sm:text-base leading-relaxed">
            Direct outcomes built for modern operations. Click a node on the left to boot up its system metrics and interactive workspace.
          </p>
        </div>

        {/* Dashboard Grid Panel - Stretched height */}
        <div className="control-panel grid grid-cols-1 lg:grid-cols-12 gap-6 rounded-2xl border border-white/10 bg-[#070709]/90 shadow-2xl overflow-hidden p-6 animate-in fade-in duration-500 min-h-[580px]">
          
          {/* LEFT SYSTEM MENU (3 Cols - Flush to bottom height matching viewport) */}
          <div className="lg:col-span-4 flex flex-col gap-3 border-b lg:border-b-0 lg:border-r border-white/5 pb-6 lg:pb-0 lg:pr-6 overflow-y-auto select-none custom-scrollbar h-full lg:max-h-[540px]">
            <span className="text-[10px] uppercase font-mono tracking-widest text-zinc-500 mb-2 block sticky top-0 bg-[#070709] py-1 z-10">
              Select active node:
            </span>
            <div className="flex flex-col gap-2">
              {PROJECTS.map((proj) => {
                const isActive = proj.id === activeNode;
                return (
                  <button
                    key={proj.id}
                    onClick={() => handleNodeSwitch(proj.id)}
                    className={`w-full text-left p-3.5 rounded-xl border font-mono transition-all duration-300 flex flex-col gap-1.5 active:scale-[0.98] ${
                      isActive
                        ? "border-blue-500/30 bg-blue-500/10 text-white animate-pulse-subtle"
                        : "border-white/5 bg-[#121215]/20 text-zinc-400 hover:text-zinc-200 hover:border-white/10"
                    }`}
                  >
                    <div className="flex items-center justify-between text-xs">
                      <span className={`text-[10px] ${isActive ? "text-blue-400" : "text-zinc-500"}`}>
                        {proj.id.toUpperCase()}
                      </span>
                      <span className={`h-1.5 w-1.5 rounded-full ${isActive ? "bg-green-400 animate-pulse" : "bg-zinc-600"}`} />
                    </div>
                    <div>
                      <div className="text-sm font-bold tracking-tight text-white">{proj.brand}</div>
                      <div className="text-[10px] text-zinc-500 overflow-hidden text-ellipsis whitespace-nowrap mt-1">
                        {proj.tag}
                      </div>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          {/* RIGHT VIEWPORT (8 Cols - Matches height) */}
          <div className="lg:col-span-8 flex flex-col gap-6 lg:pl-6 text-left h-full">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-white/5 pb-4">
              <div>
                <span className="text-[10px] uppercase font-bold tracking-widest text-blue-400">
                  {activeProj.tag}
                </span>
                <h3 className="text-xl sm:text-2xl font-extrabold text-white mt-1">
                  {activeProj.brand}
                </h3>
                <p className="text-xs sm:text-sm text-zinc-400 font-mono mt-1.5">
                  {activeProj.tagline}
                </p>
              </div>

              {/* View Selector Tabs */}
              <div className="flex items-center gap-1.5 bg-white/[0.03] border border-white/5 rounded-lg p-1 self-start sm:self-center">
                <button
                  onClick={() => setTabMode("specs")}
                  className={`px-3 py-1.5 rounded-md text-xs font-mono transition-all ${
                    tabMode === "specs"
                      ? "bg-blue-500/10 text-blue-400 border border-blue-500/20"
                      : "text-zinc-400 hover:text-white border border-transparent"
                  }`}
                >
                  System Specs
                </button>
                <button
                  onClick={() => setTabMode("visual")}
                  className={`px-3 py-1.5 rounded-md text-xs font-mono transition-all ${
                    tabMode === "visual"
                      ? "bg-blue-500/10 text-blue-400 border border-blue-500/20"
                      : "text-zinc-400 hover:text-white border border-transparent"
                  }`}
                >
                  Visual Interface
                </button>
              </div>
            </div>

            {tabMode === "specs" ? (
              <div className="flex flex-col gap-6 animate-in fade-in duration-300">
                {/* Core Stats Metrics Grid */}
                <div className="grid grid-cols-3 gap-3">
                  {activeProj.metrics.map((met, i) => (
                    <div key={i} className="rounded-xl border border-white/5 bg-white/[0.02] p-3 text-center">
                      <div className="text-lg sm:text-xl font-black text-white">{met.value}</div>
                      <div className="text-[9px] sm:text-[10px] leading-tight text-zinc-500 mt-1 font-mono">{met.label}</div>
                    </div>
                  ))}
                </div>

                {/* Main Project Content Challenge/Solution */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 border-t border-white/5 pt-6">
                  <div>
                    <h4 className="text-xs font-mono uppercase text-zinc-400 mb-2 font-bold tracking-wider">
                      The Problem:
                    </h4>
                    <p className="text-xs sm:text-sm text-zinc-400 leading-relaxed text-left">
                      {activeProj.challenge}
                    </p>
                  </div>

                  <div>
                    <h4 className="text-xs font-mono uppercase text-zinc-400 mb-2 font-bold tracking-wider">
                      System strategy:
                    </h4>
                    <ul className="space-y-2 text-xs sm:text-sm text-zinc-300 text-left">
                      {activeProj.solution.map((sol, i) => (
                        <li key={i} className="flex items-start gap-2">
                          <span className="mt-1.5 h-1.5 w-1.5 bg-blue-500 rounded-full flex-shrink-0" />
                          <span>{sol}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                {/* Custom Interactive Sandbox Widget (Match project type) */}
                <div className="mt-4 rounded-xl border border-white/5 bg-[#0A0A0C] p-4 flex flex-col gap-3">
                  <span className="text-[10px] uppercase font-mono tracking-widest text-zinc-500 flex justify-between items-center">
                    <span>Interactive Simulation:</span>
                    <span className="text-green-500 font-bold">&#10003; Live Environment</span>
                  </span>

                  {activeProj.type === "ecom" && <EcomWidget />}
                  {activeProj.type === "n8n" && <N8nWidget />}
                  {activeProj.type === "ai" && <AiWidget />}
                  {activeProj.type === "funnel" && <FunnelWidget />}
                </div>
              </div>
            ) : (
              /* VISUAL SITE MOCK VIEW */
              <div className="flex flex-col gap-4 animate-in fade-in duration-300">
                {/* Fake Browser Wrapper */}
                <div className="border border-white/10 rounded-xl overflow-hidden bg-[#0A0A0C] shadow-xl group">
                  {/* Browser chrome header */}
                  <div className="flex items-center gap-2 px-4 py-2 border-b border-white/5 bg-[#121215]">
                    <div className="flex gap-1.5">
                      <div className="w-2.5 h-2.5 rounded-full bg-red-500/80" />
                      <div className="w-2.5 h-2.5 rounded-full bg-yellow-500/80" />
                      <div className="w-2.5 h-2.5 rounded-full bg-green-500/80" />
                    </div>
                    <div className="mx-auto text-[10px] font-mono text-zinc-500 lowercase bg-black/40 px-6 py-0.5 rounded border border-white/5 max-w-[200px] sm:max-w-[300px] overflow-hidden text-ellipsis whitespace-nowrap">
                      {activeProj.liveLink || `https://${activeProj.brand.toLowerCase().replace(/\s+/g, "-")}.com`}
                    </div>
                    <span className="text-[9px] font-mono text-zinc-500 ml-auto hidden sm:block animate-pulse">
                      Hover frame to autoscroll (interactive)
                    </span>
                  </div>

                  {/* Scrollable Visual Viewport Container - Increased height to match parent grid */}
                  <div className="relative h-[280px] sm:h-[350px] w-full bg-[#0E0E11] overflow-hidden">
                    {activeProj.visualAsset ? (
                      /* Auto scrolling full page screenshot */
                      /* eslint-disable-next-line @next/next/no-img-element */
                      <img
                        src={activeProj.visualAsset}
                        alt={`${activeProj.brand} full page screenshot preview`}
                        className="absolute top-0 left-0 w-full h-auto transition-transform duration-[12s] ease-in-out transform translate-y-0 group-hover:-translate-y-[calc(100%-280px)] sm:group-hover:-translate-y-[calc(100%-350px)] object-cover"
                      />
                    ) : (
                      /* SVG Fallback Frame */
                      <div className="h-full w-full flex flex-col items-center justify-center p-6 text-center select-none">
                        <svg
                          className="w-12 h-12 text-blue-500/40"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="1.5"
                        >
                          <rect x="3" y="3" width="18" height="18" rx="2" />
                          <circle cx="9" cy="9" r="2" />
                          <path d="m21 15-3.086-3.086a2 2 0 0 0-2.828 0L6 21" />
                        </svg>
                        <p className="text-zinc-500 text-[10px] font-sans mt-2">
                          Visual mapping pipeline pending
                        </p>
                      </div>
                    )}
                  </div>
                </div>

                {/* External Actions */}
                {activeProj.liveLink && (
                  <a
                    href={activeProj.liveLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full text-center py-2.5 rounded-lg bg-blue-500 hover:bg-blue-600 text-xs font-mono text-white font-bold transition-all flex items-center justify-center gap-1.5 shadow-lg shadow-blue-500/10 active:scale-[0.98]"
                  >
                    Open Live Interface Build
                    <svg
                      width="12"
                      height="12"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
                      <polyline points="15 3 21 3 21 9" />
                      <line x1="10" y1="14" x2="21" y2="3" />
                    </svg>
                  </a>
                )}
              </div>
            )}

            {/* Tech tag list */}
            <div className="flex flex-wrap gap-2 border-t border-white/5 pt-4 mt-auto">
              {activeProj.tech.map((t, idx) => (
                <span
                  key={idx}
                  className="rounded-full border border-white/10 bg-white/[0.02] px-2.5 py-0.5 text-[10px] text-zinc-500 font-mono"
                >
                  {t}
                </span>
              ))}
            </div>

          </div>
        </div>
      </div>
    </SectionWrapper>
  );
}

// 1. E-Commerce Speed Widget
function EcomWidget() {
  const [score, setScore] = useState<number>(34);
  const [active, setActive] = useState<boolean>(false);

  const runAudit = () => {
    if (active) return;
    setActive(true);
    setScore(34);
    let count = 34;
    const interval = setInterval(() => {
      count += 2;
      setScore(count);
      if (count >= 96) {
        clearInterval(interval);
        setActive(false);
      }
    }, 30);
  };

  return (
    <div className="flex flex-col sm:flex-row items-center justify-around gap-6 py-2 font-mono">
      <div className="flex flex-col items-center">
        <div className="relative flex items-center justify-center w-28 h-28">
          <svg className="w-full h-full transform -rotate-90" viewBox="0 0 100 100">
            <circle cx="50" cy="50" r="40" stroke="rgba(255,255,255,0.03)" strokeWidth="8" fill="transparent" />
            <circle
              cx="50"
              cy="50"
              r="40"
              stroke={score > 80 ? "#10B981" : score > 50 ? "#F59E0B" : "#EF4444"}
              strokeWidth="8"
              fill="transparent"
              strokeDasharray="251.2"
              strokeDashoffset={251.2 - (251.2 * score) / 100}
              style={{ transition: "stroke-dashoffset 0.1s linear, stroke 0.3s ease" }}
            />
          </svg>
          <div className="absolute flex flex-col items-center justify-center">
            <span className="text-2xl font-extrabold text-white">{score}</span>
            <span className="text-[8px] text-zinc-500">LIGHTHOUSE</span>
          </div>
        </div>
      </div>

      <div className="flex flex-col items-start gap-3 max-w-[280px]">
        <p className="text-[11px] text-zinc-400 leading-snug">
          The optimizations removed rendering blockades, returning a performance index rating of <span className="text-[#10B981] font-bold">96/100</span>.
        </p>
        <button
          onClick={runAudit}
          disabled={active}
          className="w-full py-1.5 px-3 rounded-md bg-blue-500/10 border border-blue-500/30 text-xs text-blue-400 font-bold hover:bg-blue-500/20 active:scale-95 disabled:opacity-50 disabled:active:scale-100 transition-all font-mono"
        >
          {active ? "Auditing Pipeline..." : "Trigger Speed Audit"}
        </button>
      </div>
    </div>
  );
}

// 2. n8n Dynamic Payload Sync Widget
function N8nWidget() {
  const [status, setStatus] = useState<"idle" | "fetching" | "gsheet" | "slack" | "done">("idle");
  const [logs, setLogs] = useState<string[]>([
    "System parked. Click trigger to monitor scheduler execution."
  ]);

  const runSync = async () => {
    if (status !== "idle" && status !== "done") return;
    
    setStatus("fetching");
    setLogs([
      "[n8n Sync started via CRON scheduler]",
      "[fetching] Requesting ad set performance vectors from Meta Ads API...",
      "[fetching] Parsing impressions, CTR metrics, and spent budget from Google Ads SDK...",
      "[fetching] Pulling conversion metrics from Microsoft Graph API..."
    ]);
    
    await new Promise(r => setTimeout(r, 1200));
    setStatus("gsheet");
    setLogs(prev => [
      ...prev,
      "[gsheet] Authenticated successfully with Google Drive Service Account...",
      "[gsheet] Appending structured rows to GSheet [Main-Client-Dashboard] (SheetID: xxx9201a)..."
    ]);

    await new Promise(r => setTimeout(r, 1200));
    setStatus("slack");
    setLogs(prev => [
      ...prev,
      "[slack] Raw matrices verified. Compiling PDF weekly metrics block...",
      "[slack] Connecting to client webhook pipeline...",
      "[slack] Output dispatched format: 'Ad-Ops Digest: Total spend: $14.2K, ROAS: 3.42' to Slack #marketing-pulse."
    ]);

    await new Promise(r => setTimeout(r, 1000));
    setStatus("done");
    setLogs(prev => [
      ...prev,
      "[Success] Workflow execution finished. Pipeline sleeping safely (Exit: 0)."
    ]);
  };

  return (
    <div className="flex flex-col gap-4 font-mono text-left">
      <div className="flex items-center justify-between text-xs border border-white/5 bg-[#121215] p-3 rounded-lg overflow-x-auto whitespace-nowrap scrollbar-none gap-4">
        <div className={`p-2 rounded border transition-colors ${status === "fetching" ? "border-blue-500 bg-blue-500/10 text-white" : "border-white/5 text-zinc-500"}`}>
          AD APIs
        </div>
        <div className="text-zinc-700 font-bold font-sans">&mdash;&rsaquo;</div>
        <div className={`p-2 rounded border transition-colors ${status === "fetching" || status === "gsheet" || status === "slack" ? "border-blue-500 bg-blue-500/10 text-white animate-pulse" : "border-white/5 text-zinc-500"}`}>
          n8n.io Engine
        </div>
        <div className="text-zinc-700 font-bold font-sans">&mdash;&rsaquo;</div>
        <div className={`p-2 rounded border transition-colors ${status === "gsheet" ? "border-green-500 bg-green-500/10 text-white animate-pulse" : "border-white/5 text-zinc-500"}`}>
          Google Sheet
        </div>
        <div className="text-zinc-700 font-bold font-sans">&mdash;&rsaquo;</div>
        <div className={`p-2 rounded border transition-colors ${status === "slack" ? "border-orange-500 bg-orange-500/10 text-white animate-pulse" : "border-white/5 text-zinc-500"}`}>
          Slack Message
        </div>
      </div>

      <div className="bg-black/60 border border-white/5 p-3 rounded-lg h-[120px] overflow-y-auto text-[10px] text-[#A78BFA] flex flex-col gap-1 scrollbar-none">
        {logs.map((log, index) => (
          <div key={index} className="leading-relaxed">
            {log}
          </div>
        ))}
      </div>

      <button
        onClick={runSync}
        disabled={status !== "idle" && status !== "done"}
        className="w-full py-2 rounded-md bg-blue-500/10 border border-blue-500/30 text-xs text-blue-400 font-bold hover:bg-blue-500/20 active:scale-[0.98] transition-all disabled:opacity-50"
      >
        {status !== "idle" && status !== "done" ? "Sync Execution In Progress..." : "Run Test n8n Automation Engine"}
      </button>
    </div>
  );
}

// 3. AI Agent ReAct Router Logger Widget
function AiWidget() {
  const [running, setRunning] = useState<boolean>(false);
  const [step, setStep] = useState<number>(0);
  const logs = [
    { type: "sys", text: "[Agent-System Init] Input: 'Request a cost breakdown for a Headless migration project'" },
    { type: "thought", text: "Thought: The client wishes to get cost pricing. I must check my internal business context first." },
    { type: "action", text: "Action: Scan knowledge-base for 'pricing_structure' and 'headless_cost'" },
    { type: "sys", text: "Observation: Safeer quotes on project values, skipping hourly layers. Re-routing required." },
    { type: "thought", text: "Thought: I need to output pricing structures to Slack notifications as a lead triage, and generate direct email links to client." },
    { type: "action", text: "Action: Submit alert: 'Contact Lead Alert: Headless' and send directly to Safeer Slack" },
    { type: "final", text: "Final Response: [Dispatched request context to Safeer. Triage routing: Successful.]" }
  ];

  const triggerAgent = () => {
    if (running) return;
    setRunning(true);
    setStep(0);
    let count = 0;
    const interval = setInterval(() => {
      count++;
      setStep(count);
      if (count >= logs.length - 1) {
        clearInterval(interval);
      }
    }, 600);
  };

  return (
    <div className="flex flex-col gap-3 font-mono text-left">
      <div className="bg-black/60 border border-white/5 p-3 rounded-lg h-[140px] overflow-y-auto text-[10px] sm:text-xs flex flex-col gap-1.5 scrollbar-none">
        {running ? (
          logs.slice(0, step + 1).map((log, index) => {
            let color = "text-zinc-400";
            if (log.type === "thought") color = "text-amber-400/90";
            if (log.type === "action") color = "text-blue-400";
            if (log.type === "final") color = "text-green-400 font-bold";
            return (
              <div key={index} className={`${color} leading-relaxed`}>
                {log.text}
              </div>
            );
          })
        ) : (
          <span className="text-zinc-500">Agent parked. Load an intent query to test ReAct loop execution.</span>
        )}
      </div>

      <button
        onClick={triggerAgent}
        disabled={running && step < logs.length - 1}
        className="w-full py-2 rounded-md bg-blue-500/10 border border-blue-500/30 text-xs text-blue-400 font-bold hover:bg-blue-500/20 active:scale-[0.98] transition-all disabled:opacity-50"
      >
        {running && step < logs.length - 1 ? "Agent Triaging Prompt..." : "Process Prompt through AI-Agent"}
      </button>
    </div>
  );
}

// 4. Funnel Lead Capture Form Widget
function FunnelWidget() {
  const [activeTab, setActiveTab] = useState<"desktop" | "mobile">("mobile");
  
  return (
    <div className="flex flex-col items-center justify-center p-2 font-mono text-xs w-full">
      <div className="flex items-center gap-2 mb-3 bg-[#121215] border border-white/5 p-1 rounded-md self-start">
        <button
          onClick={() => setActiveTab("mobile")}
          className={`px-2 py-1 rounded transition-colors ${activeTab === "mobile" ? "bg-blue-500/20 text-blue-400" : "text-zinc-500 hover:text-zinc-300"}`}
        >
          mobile view
        </button>
        <button
          onClick={() => setActiveTab("desktop")}
          className={`px-2 py-1 rounded transition-colors ${activeTab === "desktop" ? "bg-blue-500/20 text-blue-400" : "text-zinc-500 hover:text-zinc-300"}`}
        >
          desktop view
        </button>
      </div>

      {activeTab === "mobile" ? (
        <div className="border border-white/10 rounded-xl bg-[#0A0A0C] p-4 w-[180px] text-center shadow-lg animate-in zoom-in-95 duration-200">
          <div className="w-full h-2 rounded bg-white/5 mb-3" />
          <p className="text-[10px] font-bold text-white mb-2">Compare Hernia Belts</p>
          <div className="space-y-1.5 mb-3 text-[8px] text-left">
            <div className="p-1 rounded bg-[#121215] border border-white/5 flex justify-between">
              <span>Comfort Truss</span>
              <span className="text-green-500">&#10003; 0.7s Load</span>
            </div>
            <div className="p-1 rounded bg-white/[0.01] border border-white/5 flex justify-between text-zinc-500">
              <span>Competitor A</span>
              <span>&times; 3.4s Load</span>
            </div>
          </div>
          <button className="w-full py-1 rounded bg-blue-500 text-[8px] font-bold text-white uppercase tracking-wider">
            Order Securely
          </button>
        </div>
      ) : (
        <div className="border border-white/10 rounded-xl bg-[#0A0A0C] p-4 w-[320px] text-center shadow-lg animate-in zoom-in-95 duration-200">
          <div className="flex justify-between items-center mb-3">
            <div className="w-16 h-2 rounded bg-white/5" />
            <div className="flex gap-2">
              <div className="w-8 h-2 rounded bg-white/5" />
              <div className="w-8 h-2 rounded bg-white/5" />
            </div>
          </div>
          <p className="text-[11px] font-bold text-white mb-3">Why Comfort Truss Wins</p>
          <div className="grid grid-cols-3 gap-2 text-[8px] mb-3 text-left">
            <div className="p-2 rounded bg-[#121215] border border-blue-500/20 text-center flex flex-col justify-between">
              <span className="text-white font-bold leading-none mb-1">Flexibility</span>
              <span className="text-blue-400 font-bold">100% Silicone</span>
            </div>
            <div className="p-2 rounded bg-[#121215] border border-blue-500/20 text-center flex flex-col justify-between">
              <span className="text-white font-bold leading-none mb-1">Thickness</span>
              <span className="text-blue-400 font-bold">Ultra-Thin</span>
            </div>
            <div className="p-2 rounded bg-[#121215] border border-blue-500/20 text-center flex flex-col justify-between">
              <span className="text-white font-bold leading-none mb-1">Speed</span>
              <span className="text-blue-400 font-bold">Instant Render</span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

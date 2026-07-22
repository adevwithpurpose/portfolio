"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import SectionWrapper from "@/components/SectionWrapper";
import VideoFacade from "@/components/VideoFacade";

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
  videoUrl?: string;
  posterUrl?: string;
}

const PROJECTS: ProjectNode[] = [
  {
    id: "node-1",
    type: "ecom",
    tag: "Redesign Concept",
    brand: "Luminous Face Yoga",
    tagline: "HTML5 · CSS3 · Vanilla JavaScript · Git · cPanel Deployment",
    challenge:
      "A cluttered and heavy Elementor site layout featuring triple-stacked header navigation, an outdated aqua color scheme, and an unorganized course index that caused severe user friction and high mobile bounce rates.",
    solution: [
      "Engineered a lightweight custom HTML5 frontend featuring a clean quiet luxury glassmorphic style",
      "Streamlined user routing through a simplified, 3-path guided course funnel UI flow",
      "Aggregated visual assets and set up automated GitHub-to-cPanel Webhook updates",
    ],
    metrics: [
      { value: "98/100", label: "Mobile Speed Index" },
      { value: "<1.0s", label: "LCP Load Latency" },
      { value: "0", label: "Cumulative Layout Shift" },
    ],
    tech: ["HTML5", "CSS3", "Vanilla JS", "cPanel Git Hooks", "Responsive Design"],
    liveLink: "https://luminous.outafbox.com",
    visualAsset: "/screenshots/luminous.png",
    videoUrl: "https://player.vimeo.com/video/506888405",
    posterUrl: "/screenshots/luminous.png",
  },
  {
    id: "node-2",
    type: "ecom",
    tag: "Managed Directory Theme",
    brand: "99ads",
    tagline: "WordPress Block Theme · Custom PHP · Coolify · Hetzner VPS",
    challenge:
      "An unmanaged asset library where over a thousand video ad creatives had to be uploaded, sorted, and linked manually, leading to massive operations lag, page bloat, and slow query filters.",
    solution: [
      "Configured a Docker-based WordPress service node on a Hetzner VPS orchestrated via Coolify and Traefik",
      "Programmed a custom ingestion script mapping 1,002 ad assets across 41 brands from Google Drive to custom post fields",
      "Formulated performance-first PHP templates and client-side dynamic AJAX sorting to render assets instantly",
    ],
    metrics: [
      { value: "1,002", label: "Automated Ingested Ads" },
      { value: "0ms", label: "Video Filter Latency" },
      { value: "Docker", label: "Coolify VPS Node" },
    ],
    tech: ["WordPress", "PHP", "Coolify / Docker", "Google Drive API", "AJAX Filtering"],
    liveLink: "https://99ads.com",
    visualAsset: "/screenshots/99ads.png",
    videoUrl: "https://player.vimeo.com/video/506888405",
    posterUrl: "/screenshots/99ads.png",
  },
  {
    id: "node-3",
    type: "ecom",
    tag: "Shopify Speed & CRO",
    brand: "CalmiCollar",
    tagline: "Shopify Dawn · Liquid · CRO Funnel Refactor",
    challenge:
      "A DTC storefront built on third-party page generators (Checkout Champ) that added heavy subscription costs, styled layouts out of sync with Core Shopify theme standards, and high cart abandonment.",
    solution: [
      "Migrated out-of-platform landing templates into native Shopify Dawn using custom Liquid layout sections",
      "Programmed customizable FAQs and collapsible objection-handling tabs directly into Shopify product templates",
      "Kept all customer journeys and checkout processes 100% native to Shopify, eliminating external systems",
    ],
    metrics: [
      { value: "95+", label: "Shopify Speed Index" },
      { value: "0", label: "External App Subscriptions" },
      { value: "100%", label: "Native Checkout Trust" },
    ],
    tech: ["Shopify Liquid", "Dawn OS 2.0", "Checkout CRO", "Script Optimization"],
    liveLink: "https://calmicollar.com",
    visualAsset: "/screenshots/calmicollar.png",
    videoUrl: "https://player.vimeo.com/video/506888405",
    posterUrl: "/screenshots/calmicollar.png",
  },
  {
    id: "node-4",
    type: "ecom",
    tag: "High-CRO Custom Shopify",
    brand: "Nuumipet",
    tagline: "Shopify Dawn · Liquid · Serialized Cart Mutator",
    challenge:
      "A wellness pet storefront using cookie-cutter templates that lacked clear product benefits and suffered from mobile duplication errors when slow-network users double-clicked the Add to Cart button.",
    solution: [
      "Designed and coded flexible custom Liquid sections for index and PDP templates controlled via the Shopify Theme Editor",
      "Programmed client-side JS serialization logic to queue cart actions and prevent multi-click quantity duplicates",
      "Configured metafield-linked purchase anchors to launch targeted checkout steps from single CTA jumps",
    ],
    metrics: [
      { value: "⬇ 1.5s", label: "Mobile LCP Speed" },
      { value: "Queue", label: "Cart Click Serializer" },
      { value: "Dynamic", label: "Metafield Product Specs" },
    ],
    tech: ["Shopify Liquid", "Vanilla JavaScript", "Custom Drawer UI", "Metafields API"],
    liveLink: "https://nuumipet.com",
    visualAsset: "/screenshots/nuumi.png",
    videoUrl: "https://player.vimeo.com/video/506888405",
    posterUrl: "/screenshots/nuumi.png",
  },
  {
    id: "node-5",
    type: "ecom",
    tag: "Shopify Page Speed Fixes",
    brand: "Amanotte",
    tagline: "Shopify OS 2.0 · Dawn Theme · Static Review Caching",
    challenge:
      "An Italian single-product mattress topper store burdened by bulky review app widgets and styling scripts that bloated total weight and drove mobile Largest Contentful Paint (LCP) past 5.2 seconds.",
    solution: [
      "Removed heavy client-side React review widgets, opting to render reviews through raw Shopify Liquid structural grids",
      "Statically cached and rendered 9,700+ reviews directly in the HTML response to bypass third-party script latency",
      "Programmed responsive sliders and quick ATCs optimized for local Italian checkout patterns in mobile viewports",
    ],
    metrics: [
      { value: "9,700+", label: "Reviews cached" },
      { value: "⬇ 1.8s", label: "Mobile LCP Latency" },
      { value: "Dawn", label: "Zero Page-Builder Apps" },
    ],
    tech: ["Shopify Liquid", "Reviews Caching", "Asset Optimization", "Italian Localization"],
    liveLink: "https://amanotte.it",
    visualAsset: "/screenshots/amanotte.png",
    videoUrl: "https://player.vimeo.com/video/506888405",
    posterUrl: "/screenshots/amanotte.png",
  },
  {
    id: "node-6",
    type: "ecom",
    tag: "Content Scrape & Migration",
    brand: "FantastiCane",
    tagline: "WordPress to Shopify · Crawl4AI Pipeline · WCAG Gird",
    challenge:
      "Migrating a complex Italian pet wellness portal with slow database layers (TTFB > 2s) and deep content trees to Shopify without losing SEO indexing.",
    solution: [
      "Engineered automated Crawl4AI scraper scripts to pull, clean, and structure content across 38 legacy URLs",
      "Formulated customized product page promotional blocks and accessibility-focused collections in Shopify Dawn",
      "Mapped a comprehensive 301 redirection matrix, keeping organic search rankings perfectly intact",
    ],
    metrics: [
      { value: "38", label: "Legacy URLs Migrated" },
      { value: "A++", label: "WCAG Accessibility" },
      { value: "100%", label: "SEO Redirect Coverage" },
    ],
    tech: ["Python / Crawl4AI", "Shopify Migration", "WCAG Grid Rules", "301 Redirect Mapping"],
    liveLink: "https://shop.fantasticane.com",
    visualAsset: "/screenshots/fantasticane.png",
    videoUrl: "https://player.vimeo.com/video/506888405",
    posterUrl: "/screenshots/fantasticane.png",
  },
  {
    id: "node-7",
    type: "funnel",
    tag: "Decoupled B2B Platform",
    brand: "TEMCO",
    tagline: "Astro · Tailwind CSS · Coolify Host · Markdown Data",
    challenge:
      "A B2B marketing site operating with a slow, high-maintenance Headless CMS (Directus) database layer that created single points of failure and delayed git commits.",
    solution: [
      "Decoupled the CMS layer and compiled the entire framework into a static Astro structure",
      "Organized case studies into repo-contained, Git-tracked markdown files that rebuild in under 30 seconds",
      "Configured automated pipeline deployments to a Hetzner VPS node via Coolify configuration",
    ],
    metrics: [
      { value: "Zero", label: "CMS DB Dependencies" },
      { value: "100/100", label: "Lighthouse Performance" },
      { value: "<30s", label: "Automated Build Speed" },
    ],
    tech: ["Astro", "Tailwind CSS", "Coolify Node Hosting", "Local Markdown Content"],
    liveLink: "https://next.theecommarketingcompany.com",
    visualAsset: "/screenshots/temco.png",
    videoUrl: "https://player.vimeo.com/video/506888405",
    posterUrl: "/screenshots/temco.png",
  },
  {
    id: "node-8",
    type: "n8n",
    tag: "Workflow Ingestion Manager",
    brand: "n8n Connectors",
    tagline: "n8n REST API · Node CLI · GitLab Sync · Docker",
    challenge:
      "Managing complex automation integration chains inside the n8n remote editor interface without git history, version rollback capabilities, or local lint validation.",
    solution: [
      "Wrote a local-first Node CLI script utility communicating with the n8n API endpoints to manage active nodes",
      "Automated tasks to pull all workflow states, validate JSON objects, compile, and push deployments target remote nodes",
      "Enabled git-level version tracking and automatic syntax verification across 16 active business automation flows",
    ],
    metrics: [
      { value: "16", label: "Active sync JSONs" },
      { value: "Git", label: "Workflow Versioning" },
      { value: "CLI", label: "Integrated Validator" },
    ],
    tech: ["n8n.io API", "Node.js Scripting", "JSON Schema Validation", "Git Pipeline"],
    visualAsset: "/screenshots/n8n-flow.png",
    videoUrl: "https://player.vimeo.com/video/506888405",
    posterUrl: "/screenshots/n8n-flow.png",
  },
];

export default function CaseStudies({ onEnter }: { onEnter?: () => void }) {
  const [activeNode, setActiveNode] = useState<string>("node-1"); // Default to Luminous Node
  const [tabMode, setTabMode] = useState<"specs" | "visual" | "video">("visual"); // Default to visual when load
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
                <p className="text-xs sm:text-sm text-zinc-400 font-mono mt-1.5 flex flex-wrap gap-1.5">
                  {activeProj.tagline.split(" · ").map((t, idx) => (
                    <span key={idx} className="after:content-['·'] last:after:content-none after:ml-1.5 after:text-zinc-600">
                      {t}
                    </span>
                  ))}
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
                  Technical Specs
                </button>
                {activeProj.videoUrl && (
                  <button
                    onClick={() => setTabMode("video")}
                    className={`px-3 py-1.5 rounded-md text-xs font-mono transition-all ${
                      tabMode === "video"
                        ? "bg-blue-500/10 text-blue-400 border border-blue-500/20"
                        : "text-zinc-400 hover:text-white border border-transparent"
                    }`}
                  >
                    System Walkthrough
                  </button>
                )}
                <button
                  onClick={() => setTabMode("visual")}
                  className={`px-3 py-1.5 rounded-md text-xs font-mono transition-all ${
                    tabMode === "visual"
                      ? "bg-blue-500/10 text-blue-400 border border-blue-500/20"
                      : "text-zinc-400 hover:text-white border border-transparent"
                  }`}
                >
                  Visual Mockup
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
                      Legacy Bottleneck (Before):
                    </h4>
                    <p className="text-xs sm:text-sm text-zinc-400 leading-relaxed text-left">
                      {activeProj.challenge}
                    </p>
                  </div>

                  <div>
                    <h4 className="text-xs font-mono uppercase text-zinc-400 mb-2 font-bold tracking-wider">
                      Technical Execution (After):
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
                    <span>
                      {activeProj.type === "ecom" ? "Performance Optimization Metrics:" : "Interactive Simulation:"}
                    </span>
                    <span className="text-green-500 font-bold">
                      {activeProj.type === "ecom" ? "✓ Verified Audited State" : "✓ Live Environment"}
                    </span>
                  </span>

                  {activeProj.type === "ecom" && <EcomSpecsView brand={activeProj.brand} />}
                  {activeProj.type === "n8n" && <N8nWidget />}
                  {activeProj.type === "ai" && <AiWidget />}
                  {activeProj.type === "funnel" && <FunnelWidget />}
                </div>
              </div>
            ) : tabMode === "video" ? (
              <div className="flex flex-col gap-4 animate-in fade-in duration-300 py-4 justify-center items-center h-full">
                <div className="w-full max-w-2xl">
                  <VideoFacade
                    videoUrl={activeProj.videoUrl || ""}
                    posterUrl={activeProj.posterUrl || "/screenshots/placeholder.png"}
                    title={`${activeProj.brand} Solution Walkthrough`}
                  />
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

// 1. E-Commerce Speed & Optimization Audit View
interface EcomSpecsViewProps {
  brand: string;
}

const ECOM_AUDITS: Record<
  string,
  {
    beforeScore: number;
    afterScore: number;
    coreVitalsBefore: string;
    coreVitalsAfter: string;
    fixes: string[];
  }
> = {
  "Luminous Face Yoga": {
    beforeScore: 42,
    afterScore: 98,
    coreVitalsBefore: "FCP: 3.4s | CLS: 0.28",
    coreVitalsAfter: "FCP: 0.6s | CLS: 0.00",
    fixes: [
      "Optimized legacy asset compilation and compressed hero assets",
      "Removed bulky inline fonts and local web font blockades",
      "Built clean, lightweight, asset-optimized quiet luxury CSS variables",
    ],
  },
  "99ads": {
    beforeScore: 35,
    afterScore: 92,
    coreVitalsBefore: "FCP: 4.8s | DB Queries: 120+",
    coreVitalsAfter: "FCP: 0.9s | DB Queries: 18",
    fixes: [
      "Set up dynamic AJAX search queries in custom PHP layout templates",
      "Offloaded video inventory payload processing onto the client-side browser",
      "Leveraged Traefik + Docker caching for static theme and media assets",
    ],
  },
  "CalmiCollar": {
    beforeScore: 61,
    afterScore: 95,
    coreVitalsBefore: "FCP: 2.8s | JS Size: 480KB",
    coreVitalsAfter: "FCP: 0.8s | JS Size: 92KB",
    fixes: [
      "Removed Checkout Champ JS trackers and converted landing pages to native Liquid templates",
      "Applied async deferred script attributes to all marketing trackers in theme layout header",
      "Integrated native Shopify Dawn framework lazy-loading images with custom formats",
    ],
  },
  "Nuumipet": {
    beforeScore: 58,
    afterScore: 94,
    coreVitalsBefore: "FCP: 3.1s | TTI: 6.8s",
    coreVitalsAfter: "FCP: 0.7s | TTI: 1.8s",
    fixes: [
      "Cleaned unused product app codeblocks and legacy page builder leftovers",
      "Created dynamic theme settings in schema to manage inventory checks via liquid server-side variables",
      "Optimized cart drawer interactions with serialized queue controls to prevent state blockades",
    ],
  },
  "Amanotte": {
    beforeScore: 44,
    afterScore: 96,
    coreVitalsBefore: "FCP: 4.1s | Ref Page Size: 3.8MB",
    coreVitalsAfter: "FCP: 0.8s | Ref Page Size: 0.9MB",
    fixes: [
      "Statically cached 9,700+ reviews inside Dawn HTML response scripts",
      "Replaced heavy third-party review widgets with zero-dependency Liquid grids",
      "Custom programmed product galleries to use CSS-only lazy-load lightboxes",
    ],
  },
  "FantastiCane": {
    beforeScore: 38,
    afterScore: 90,
    coreVitalsBefore: "TTFB: 2.1s | Broken Links: 12%",
    coreVitalsAfter: "TTFB: 110ms | Broken Links: 0%",
    fixes: [
      "Scraped and compiled raw data sets from legacy WordPress using Python and Crawl4AI",
      "Constructed clean 301 redirects ledger and handled URL redirection natively",
      "Bypassed heavy WooCommerce plugins to render core collection components under Dawn grids",
    ],
  },
};

function EcomSpecsView({ brand }: EcomSpecsViewProps) {
  const audit = ECOM_AUDITS[brand] || ECOM_AUDITS["Luminous Face Yoga"];

  return (
    <div className="flex flex-col gap-4 py-2 font-mono text-left animate-in fade-in duration-300">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 border border-white/5 bg-[#121215]/50 p-4 rounded-xl">
        {/* Left: Lighthouse Scores */}
        <div className="flex flex-col gap-3 justify-center">
          <div className="flex items-center gap-4">
            <div className="flex flex-col items-center">
              <span className="text-[10px] text-zinc-500 uppercase">Legacy</span>
              <span className="text-xl font-bold text-red-500 bg-red-500/10 px-2 py-0.5 rounded border border-red-500/20">{audit.beforeScore}</span>
            </div>
            <div className="text-zinc-500 text-lg">➔</div>
            <div className="flex flex-col items-center">
              <span className="text-[10px] text-zinc-500 uppercase">Optimized</span>
              <span className="text-xl font-bold text-green-400 bg-green-500/10 px-2 py-0.5 rounded border border-green-500/20">{audit.afterScore}</span>
            </div>
            <div className="flex flex-col">
              <span className="text-xs text-white font-bold">Lighthouse Rating</span>
              <span className="text-[9px] text-[#10B981] font-bold">Verified Production Speed</span>
            </div>
          </div>
          <div className="border-t border-white/5 pt-2 text-[10px] text-zinc-400 space-y-1">
            <div><span className="text-zinc-600">PRE-AUDIT:</span> {audit.coreVitalsBefore}</div>
            <div><span className="text-zinc-600">POST-AUDIT:</span> {audit.coreVitalsAfter}</div>
          </div>
        </div>

        {/* Right: Applied Remediations */}
        <div className="flex flex-col gap-2">
          <span className="text-[10px] text-blue-400 uppercase font-bold tracking-wider">Applied Speed Fixes:</span>
          <ul className="text-[10px] text-zinc-300 space-y-1.5 list-none">
            {audit.fixes.map((fix, idx) => (
              <li key={idx} className="flex items-start gap-1.5">
                <span className="text-green-500 flex-shrink-0">✓</span>
                <span className="leading-snug">{fix}</span>
              </li>
            ))}
          </ul>
        </div>
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

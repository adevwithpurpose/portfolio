"use client";

import { motion, Variants } from "framer-motion";
import SectionWrapper from "@/components/SectionWrapper";

interface SystemCard {
  id: string;
  title: string;
  tag: string;
  description: string;
  pathway: string[];
  tech: string[];
  icon: React.ReactNode;
}

const ADVANCED_SYSTEMS: SystemCard[] = [
  {
    id: "sys-1",
    title: "Ad Campaign Data Pipeline",
    tag: "n8n / Sheet / Slack",
    description: "Weekly ingestion and reporting of Meta/Google ad spend. Normalizes campaign performance vectors, updates Google Sheet records, and logs alerts directly to Slack.",
    pathway: ["Google/Meta API", "n8n Sync", "Google Sheets", "Slack Alert"],
    tech: ["n8n.io", "Google Sheets API", "Meta Graph API", "Slack Webhooks"],
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
      </svg>
    )
  },
  {
    id: "sys-2",
    title: "Bespoke Storefronts",
    tag: "Shopify Dawn / CRO",
    description: "Lightweight storefront components built directly in Shopify Dawn Liquid. Bypasses page builders to optimize layout performance while maintaining merchant control.",
    pathway: ["Figma Mockup", "Tailwind CSS", "Custom Liquid", "Theme Editor"],
    tech: ["Shopify Liquid", "Dawn OS 2.0", "Vanilla JS", "Tailwind CSS"],
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4zM3 6h18M16 10a4 4 0 0 1-8 0" />
      </svg>
    )
  },
  {
    id: "sys-3",
    title: "Web Speed & Tag Tuning",
    tag: "Core Web Vitals / GTM",
    description: "In-depth script execution tuning targeting Core Web Vitals. Deferring marketing pixel script blocks and removing render lockades to restore 95+ PageSpeed index.",
    pathway: ["Diagnostic Audit", "Defer Scripts", "Lighthouse Test", "95+ Mobile Score"],
    tech: ["Google Tag Manager", "Lighthouse CLI", "Scripts Refactor", "Web Vitals"],
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="10" />
        <polyline points="12 6 12 12 16 14" />
      </svg>
    )
  },
  {
    id: "sys-4",
    title: "Technical SEO & AEO Check",
    tag: "Schema / LLM Crawl",
    description: "Configuring schema metadata graphs, semantic tag structures, and hydration controls to ensure optimal scraping by search spiders and modern AI answer engines.",
    pathway: ["Semantic Schema", "SSR Generation", "Bot Crawl", "LLM Indexing"],
    tech: ["Astro SSR", "JSON-LD Graphs", "Robots Check", "AEO Hardening"],
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="11" cy="11" r="8" />
        <line x1="21" y1="21" x2="16.65" y2="16.65" />
        <path d="M11 7v8M8 11h6" />
      </svg>
    )
  },
  {
    id: "sys-5",
    title: "WhatsApp Personal Assistant",
    tag: "WhatsApp API / LLM",
    description: "Dedicated AI assistant layers running on WhatsApp Business. Formulates responses using custom store databases or schedules booking endpoints natively.",
    pathway: ["WhatsApp API", "FastAPI Router", "RAG Database", "Triage Route"],
    tech: ["FastAPI", "WhatsApp API", "Meta APIs", "Vector Database"],
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
      </svg>
    )
  },
  {
    id: "sys-6",
    title: "Ecom Site Migration",
    tag: "WP to Shopify / Python",
    description: "Structured site migration using Crawl4AI to scrape legacy catalogs, formats, and media arrays. Maps entities cleanly to preserve 100% SEO indexing.",
    pathway: ["Legacy Web", "Crawl4AI Scrape", "Shopify Import", "Redirect Map"],
    tech: ["Crawl4AI", "Python Scripts", "301 Redirects", "Shopify API"],
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M17 3L21 7L17 11M3 13V15.5A4.5 4.5 0 0 0 7.5 20H16.5M7 21L3 17L7 13M21 11V8.5A4.5 4.5 0 0 0 16.5 4H7.5" />
      </svg>
    )
  },
  {
    id: "sys-7",
    title: "Internal Sales Dashboard",
    tag: "Sales / Tech Feeds",
    description: "Tailored operations grids tracking CAC thresholds, inventory runrates, and CAC/LTV multipliers. Aggregates data feeds into clear, actionable panels.",
    pathway: ["Raw API data", "FastAPI Parser", "Google BigQuery", "Dashboard Grid"],
    tech: ["Power BI", "FastAPI Node", "SQL Database", "Tailwind UI"],
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M3 3v18h18" />
        <path d="M18.7 8l-5.1 5.2-2.8-2.7L7 14.3" />
      </svg>
    )
  },
  {
    id: "sys-8",
    title: "Self-Hosted Cloud stack",
    tag: "Docker / VPS Node",
    description: "Deployment of private n8n execution nodes and app control panels managed completely through VPS setups. Removes SaaS costs.",
    pathway: ["Hetzner VPS", "Docker Compose", "Coolify Setup", "Secure Proxy"],
    tech: ["Docker Context", "Hetzner Cloud", "Traefik Setup", "Coolify Host"],
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <rect x="2" y="2" width="20" height="8" rx="2" ry="2" />
        <rect x="2" y="14" width="20" height="8" rx="2" ry="2" />
        <line x1="6" y1="6" x2="6.01" y2="6" />
        <line x1="6" y1="18" x2="6.01" y2="18" />
      </svg>
    )
  }
];

interface SystemsShowcaseProps {
  onEnter?: () => void;
}

export default function SystemsShowcase({ onEnter }: SystemsShowcaseProps) {
  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.05,
      },
    },
  };

  const cardVariants: Variants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        type: "spring" as const,
        stiffness: 100,
        damping: 15,
      },
    },
  };

  return (
    <SectionWrapper
      id="systems-showcase"
      className="flex flex-col justify-center py-20 lg:py-24 border-t border-white/5 bg-[#030303]"
      onEnter={onEnter}
    >
      <div className="mx-auto w-full max-w-7xl px-6 relative z-10">
        
        {/* Header Indicator */}
        <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-blue-500/10 bg-blue-500/5 px-3 py-1 font-mono text-[10px] tracking-wider text-blue-400">
          <span className="h-1.5 w-1.5 rounded-full bg-blue-400 animate-pulse" />
          Technical Capabilities / Operations Showcase
        </div>

        {/* Section Heading */}
        <div className="mb-12 max-w-3xl">
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white leading-tight tracking-tight">
            Designed & Built Systems
          </h2>
          <p className="mt-3 text-zinc-400 text-sm sm:text-base leading-relaxed">
            Real solutions designed and deployed to automate manual overhead, secure analytics integrity, and optimize user conversion speeds.
          </p>
        </div>

        {/* Services Showcase Cards Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 select-none"
        >
          {ADVANCED_SYSTEMS.map((system) => (
            <motion.div
              key={system.id}
              variants={cardVariants}
              className="rounded-2xl border border-white/5 bg-[#070709]/80 p-5 shadow-xl hover:border-blue-500/30 hover:bg-[#070709] transition-all duration-350 flex flex-col justify-between group h-full hover:shadow-blue-500/2"
            >
              {/* Higher Card Details */}
              <div className="flex flex-col gap-4">
                
                {/* Header Icon + Tagline */}
                <div className="flex justify-between items-start">
                  
                  {/* Glowing Icon Wrapper */}
                  <div className="relative">
                    <div className="absolute -inset-1 rounded-lg bg-blue-500/10 opacity-0 group-hover:opacity-100 transition-opacity blur-md" />
                    <div className="relative p-2.5 rounded-lg bg-white/[0.02] border border-white/5 text-blue-400/90 group-hover:text-blue-400 group-hover:border-blue-500/20 group-hover:bg-[#121215] transition-all duration-300 flex items-center justify-center">
                      {system.icon}
                    </div>
                  </div>

                  {/* Operational Tag */}
                  <span className="rounded-full border border-white/10 bg-white/[0.01] px-2.5 py-0.5 font-mono text-[9px] text-zinc-500 group-hover:text-blue-400 group-hover:border-blue-500/20 transition-colors">
                    {system.tag}
                  </span>

                </div>

                {/* Title & Description */}
                <div>
                  <h3 className="text-base font-extrabold text-white group-hover:text-blue-300 transition-colors duration-300">
                    {system.title}
                  </h3>
                  <p className="mt-2 text-zinc-400 text-xs leading-relaxed font-sans">
                    {system.description}
                  </p>
                </div>

              </div>

              {/* Lower Section: Action Schema Pipeline */}
              <div className="border-t border-white/5 pt-4 mt-6 flex flex-col gap-3 font-mono">
                
                {/* Flow Schema Badges */}
                <div className="flex flex-wrap items-center gap-1.5">
                  {system.pathway.map((pStep, index) => (
                    <div key={index} className="flex items-center gap-1.5">
                      {index > 0 && (
                        <svg width="6" height="8" viewBox="0 0 6 8" fill="none" className="text-zinc-650 flex-shrink-0">
                          <path d="M1 1L4 4L1 7" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                        </svg>
                      )}
                      <span className="bg-white/[0.02] border border-white/5 text-zinc-450 px-2 py-0.5 rounded text-[8px] font-mono leading-none tracking-tight">
                        {pStep}
                      </span>
                    </div>
                  ))}
                </div>

                {/* Tech Pills */}
                <div className="flex flex-wrap gap-1 border-t border-white/[0.03] pt-2.5">
                  {system.tech.map((tItem, idx) => (
                    <span
                      key={idx}
                      className="rounded border border-transparent bg-white/[0.01] px-1.5 py-0.5 text-[8px] text-zinc-600 font-sans"
                    >
                      {tItem}
                    </span>
                  ))}
                </div>

              </div>

            </motion.div>
          ))}
        </motion.div>

      </div>
    </SectionWrapper>
  );
}

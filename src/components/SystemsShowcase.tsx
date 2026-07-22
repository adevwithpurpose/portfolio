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
  glowClass: string;
  iconGlowClass: string;
  tagClass: string;
}

const ADVANCED_SYSTEMS: SystemCard[] = [
  {
    id: "sys-1",
    title: "Ad Campaign Data Pipeline",
    tag: "n8n / Sheet / Slack",
    description: "Weekly ingestion and reporting of Meta/Google ad spend. Normalizes campaign performance vectors, updates Google Sheet records, and logs alerts directly to Slack.",
    pathway: ["Google/Meta API", "n8n Sync", "Google Sheets", "Slack Alert"],
    tech: ["n8n.io", "Google Sheets API", "Meta Graph API", "Slack Webhooks"],
    glowClass: "group-hover:border-[#FF5447]/30 hover:shadow-[#FF5447]/5",
    iconGlowClass: "bg-[#FF5447]/5 group-hover:border-[#FF5447]/30 group-hover:bg-[#121215]/80 text-[#FF5447]",
    tagClass: "group-hover:text-[#FF5447] group-hover:border-[#FF5447]/30",
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#FF5447" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="6" cy="6" r="3" fill="#FF5447" fillOpacity="0.2" />
        <circle cx="18" cy="18" r="3" fill="#FF5447" fillOpacity="0.2" />
        <path d="M6 9c0 4 12 2 12 6" />
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
    glowClass: "group-hover:border-[#96BF48]/30 hover:shadow-[#96BF48]/5",
    iconGlowClass: "bg-[#96BF48]/5 group-hover:border-[#96BF48]/30 group-hover:bg-[#121215]/80 text-[#96BF48]",
    tagClass: "group-hover:text-[#96BF48] group-hover:border-[#96BF48]/30",
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#96BF48" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z" fill="#96BF48" fillOpacity="0.1" />
        <line x1="3" y1="6" x2="21" y2="6" />
        <path d="M16 10a4 4 0 0 1-8 0" />
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
    glowClass: "group-hover:border-[#F48120]/30 hover:shadow-[#F48120]/5",
    iconGlowClass: "bg-[#F48120]/5 group-hover:border-[#F48120]/30 group-hover:bg-[#121215]/80 text-[#F48120]",
    tagClass: "group-hover:text-[#F48120] group-hover:border-[#F48120]/30",
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#F48120" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
        <polygon points="12 2 4 22 20 22" fill="#F48120" fillOpacity="0.1" />
        <circle cx="12" cy="9" r="3" fill="#F48120" />
        <line x1="12" y1="12" x2="12" y2="22" />
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
    glowClass: "group-hover:border-[#FF5D01]/30 hover:shadow-[#FF5D01]/5",
    iconGlowClass: "bg-purple-500/5 group-hover:border-[#FF5D01]/30 group-hover:bg-[#121215]/80 text-[#FF5D01]",
    tagClass: "group-hover:text-amber-500 group-hover:border-[#FF5D01]/30",
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor">
        <defs>
          <linearGradient id="astroGrad" x1="0%" y1="100%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#FF5D01" />
            <stop offset="100%" stopColor="#7928CA" />
          </linearGradient>
        </defs>
        <path d="M12 2L4 19a1 1 0 0 0 1.5 1.1L12 16l6.5 4.1A1 1 0 0 0 20 19L12 2zm0 6l4.5 9-4.5-3-4.5 3 4.5-9z" fill="url(#astroGrad)" />
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
    glowClass: "group-hover:border-[#25D366]/30 hover:shadow-[#25D366]/5",
    iconGlowClass: "bg-[#25D366]/5 group-hover:border-[#25D366]/30 group-hover:bg-[#121215]/80 text-[#25D366]",
    tagClass: "group-hover:text-[#25D366] group-hover:border-[#25D366]/30",
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor" className="text-[#25D366]">
        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L0 24l6.335-1.662c1.746.953 3.71 1.455 5.703 1.458h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413z" />
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
    glowClass: "group-hover:border-[#3776AB]/30 hover:shadow-[#3776AB]/5",
    iconGlowClass: "bg-blue-500/5 group-hover:border-[#3776AB]/30 group-hover:bg-[#121215]/80 text-sky-400",
    tagClass: "group-hover:text-sky-400 group-hover:border-[#3776AB]/30",
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M12.12 2c-2.34 0-4.2.2-4.2.2S6.07 2.47 5.48 3.22c-.57.75-.56 1.87-.56 1.87v2.35h7.24v.21H2.9C1.72 7.65 1.3 8.84 1.3 10.27c0 1.43.03 3.06.03 3.06s.1 1.76.75 2.37c.65.61 2.06.61 2.06.61h1.25V14.6c0-1.4 1.19-2.63 2.58-2.63h6.36c1.4 0 2.63-1.22 2.63-2.62V3.82c0-1.4-1.14-1.82-2.52-1.82L12.12 2z" fill="#3776AB"/>
        <path d="M11.88 22c2.34 0 4.2-.2 4.2-.2s1.85-.27 2.44-1.02c.57-.75.56-1.87.56-1.87v-2.35H11.84v-.21h9.26c1.18 0 1.6-1.19 1.6-2.62 0-1.43-.03-3.06-.03-3.06s-.1-1.76-.75-2.37c-.65-.61-2.06-.61-2.06-.61h-1.25V9.4c0 1.4-1.19 2.63-2.58 2.63H9.72c-1.4 0-2.63 1.22-2.63 2.62v3.53c0 1.4 1.14 1.82 2.52 1.82l2.27.03z" fill="#FFE873"/>
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
    glowClass: "group-hover:border-[#F2C811]/30 hover:shadow-[#F2C811]/5",
    iconGlowClass: "bg-[#F2C811]/5 group-hover:border-[#F2C811]/30 group-hover:bg-[#121215]/80 text-[#F2C811]",
    tagClass: "group-hover:text-[#F2C811] group-hover:border-[#F2C811]/30",
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
        <rect x="3" y="13" width="4.5" height="8" rx="1" fill="#F2C811" />
        <rect x="9.75" y="7" width="4.5" height="14" rx="1" fill="#F2B211" />
        <rect x="16.5" y="2" width="4.5" height="19" rx="1" fill="#D98A0B" />
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
    glowClass: "group-hover:border-[#2496ED]/30 hover:shadow-[#2496ED]/5",
    iconGlowClass: "bg-[#2496ED]/5 group-hover:border-[#2496ED]/30 group-hover:bg-[#121215]/80 text-[#2496ED]",
    tagClass: "group-hover:text-sky-400 group-hover:border-[#2496ED]/30",
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M13.983 11.078h2.119v-2.00h-2.119v2.00zm-2.00 0h2.008v-2.00H11.98v2.00zm-2.008 0H12.01v-2.00H9.972v2.00zm-1.83 0h1.835v-2.00H8.142v2.00zm9.056-2.228h2.001v-2.007h-2.001v2.007zm-2.00 0h2.008v-2.007H13.2v2.007zm-1.83 0h1.83v-2.007h-1.83v2.007zm-1.83 0h1.83v-2.007h-1.83v2.007zm7.66-2.08h1.87v-2.00h-1.87v2.00z" fill="#2496ED" />
        <path d="M23.99 12.493c-.115-.352-.363-.64-.696-.807-.723-.36-1.523-.543-2.33-.538a6.38 6.38 0 0 0-3.328.913 6.342 6.342 0 0 0-3.11-.908 6.34 6.34 0 0 0-3.111.908 6.342 6.342 0 0 0-3.328-.913c-.08-.002-.158.006-.237.009v-.39H.328v2.793c0 .127.026.25.075.367a14.28 14.28 0 0 0 5.163 6.945c2.392 1.637 5.253 2.502 8.163 2.493h1.002a11.96 11.96 0 0 0 7.747-3.21 11.83 11.83 0 0 0 2.222-3.313 1.055 1.055 0 0 0-.71-.349z" fill="#2496ED" />
      </svg>
    )
  }
];

interface SystemsShowcaseProps {
  onEnter?: () => void;
}

export default function SystemsShowcase({ onEnter }: SystemsShowcaseProps) {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.05,
      },
    },
  };

  const cardVariants = {
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
              className={`rounded-2xl border border-white/5 bg-[#070709]/80 p-5 shadow-xl transition-all duration-350 flex flex-col justify-between group h-full hover:shadow-blue-500/2 ${system.glowClass}`}
            >
              {/* Higher Card Details */}
              <div className="flex flex-col gap-4">
                
                {/* Header Icon + Tagline */}
                <div className="flex justify-between items-start">
                  
                  {/* Glowing Icon Wrapper */}
                  <div className="relative">
                    <div className={`absolute -inset-1 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity blur-md bg-blue-500/10`} />
                    <div className={`relative p-2.5 rounded-lg bg-white/[0.02] border border-white/5 transition-all duration-300 flex items-center justify-center ${system.iconGlowClass}`}>
                      {system.icon}
                    </div>
                  </div>

                  {/* Operational Tag */}
                  <span className={`rounded-full border border-white/10 bg-white/[0.01] px-2.5 py-0.5 font-mono text-[9px] text-zinc-500 transition-colors ${system.tagClass}`}>
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
                      <span className="bg-white/[0.02] border border-white/5 text-zinc-400 px-2 py-0.5 rounded text-[8px] font-mono leading-none tracking-tight">
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

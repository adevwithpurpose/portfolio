"use client";

import { ReactNode } from "react";
import { motion } from "framer-motion";
import SectionWrapper from "@/components/SectionWrapper";
import OpsTheaterVisual from "@/components/OpsTheaterVisual";

// ─── Service Section ───
interface ServiceSectionProps {
  id: string;
  index: number;
  tagline: string;
  title: string;
  regularPrice: string;
  introPrice: string;
  description: string;
  bullets: string[];
  visual: ReactNode;
  accentColor: string;
  bulletColor?: string;
  cardVariant?: "automation" | "agent" | "web";
  onEnter?: () => void;
}

function ServiceSection({
  id,
  index,
  tagline,
  title,
  regularPrice,
  introPrice,
  description,
  bullets,
  visual,
  accentColor,
  bulletColor = "bg-blue-500",
  cardVariant = "web",
  onEnter,
}: ServiceSectionProps) {
  // Direction variants per section type — snappy for scroll-snap
  const textInitial =
    cardVariant === "agent"
      ? { opacity: 0, x: -30 } // Agent: slide from LEFT
      : { opacity: 0, y: 30 }; // Automation/web: slide from BOTTOM
  const textAnimate = { opacity: 1, x: 0, y: 0 };

  const visualInitial =
    cardVariant === "agent"
      ? { opacity: 0, x: 30 } // Visual slides from RIGHT for agent
      : { opacity: 0, y: 30 }; // Slides from BOTTOM for automation/web
  const visualAnimate = { opacity: 1, x: 0, y: 0 };

  // No delays — all elements animate together for instant visibility
  const ANIM_DURATION = 0.2;
  const ANIM_EASE = [0.25, 0.1, 0.25, 1] as const;

  return (
    <SectionWrapper
      id={id}
      className="snap-section flex items-center justify-center py-24"
      onEnter={onEnter}
    >
      <div className="pointer-events-none absolute inset-0 flex items-center justify-center">
        <div
          className={`h-[700px] w-[700px] rounded-full blur-[160px] ${accentColor}`}
        />
      </div>

      <div className="relative z-10 mx-auto grid w-full max-w-6xl grid-cols-1 gap-12 px-6 lg:grid-cols-2 lg:gap-20 lg:px-12">
        {/* Section accent line */}
        <div className="absolute -top-8 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />
        {/* Section bottom divider */}
        <div className="absolute -bottom-8 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/5 to-transparent" />

        {/* Text column */}
        <motion.div
          className="flex flex-col justify-center"
          initial={textInitial}
          whileInView={textAnimate}
          viewport={{ once: true, amount: 0.1 }}
          transition={{ duration: ANIM_DURATION, ease: ANIM_EASE }}
        >
          <motion.span
            className="mb-4 text-sm font-medium uppercase tracking-[0.3em] text-white/40"
            initial={textInitial}
            whileInView={textAnimate}
            viewport={{ once: true, amount: 0.1 }}
            transition={{ duration: ANIM_DURATION, ease: ANIM_EASE }}
          >
            0{index + 1} — {tagline}
          </motion.span>
          <motion.h2
            className="mb-6 text-[clamp(2rem,5vw,3.5rem)] font-black leading-[1.1] tracking-tight text-white"
            initial={textInitial}
            whileInView={textAnimate}
            viewport={{ once: true, amount: 0.1 }}
            transition={{
              duration: ANIM_DURATION,
              ease: ANIM_EASE,
              delay: 0.03,
            }}
          >
            {title}
          </motion.h2>
          <motion.p
            className="mb-8 max-w-lg text-lg leading-relaxed text-zinc-400"
            initial={textInitial}
            whileInView={textAnimate}
            viewport={{ once: true, amount: 0.1 }}
            transition={{
              duration: ANIM_DURATION,
              ease: ANIM_EASE,
              delay: 0.06,
            }}
          >
            {description}
          </motion.p>

          {/* Pricing — clean, premium presentation */}
          <motion.div
            className="mb-6"
            initial={textInitial}
            whileInView={textAnimate}
            viewport={{ once: true, amount: 0.1 }}
            transition={{
              duration: ANIM_DURATION,
              ease: ANIM_EASE,
              delay: 0.09,
            }}
          >
            <div className="flex items-baseline gap-3 mb-1.5">
              <span className="text-[10px] text-zinc-500 uppercase tracking-wider">
                First Project Pilot
              </span>
              <span className="text-sm text-zinc-500">
                {regularPrice}
              </span>
            </div>
            <div className="flex items-baseline gap-3">
              <span className="text-2xl font-black text-green-400">
                {introPrice}
              </span>
              <span className="rounded-full bg-green-500/10 border border-green-500/20 px-2 py-0.5 text-[10px] font-bold text-green-400/80 uppercase tracking-wider">
New clients
              </span>
            </div>
            <p className="mt-2 text-xs text-zinc-500">
A reduced-scope starter build to test fit before a larger engagement
            </p>
          </motion.div>
          <motion.ul
            className="space-y-3"
            initial={textInitial}
            whileInView={textAnimate}
            viewport={{ once: true, amount: 0.1 }}
            transition={{
              duration: ANIM_DURATION,
              ease: ANIM_EASE,
              delay: 0.09,
            }}
          >
            {bullets.map((b) => (
              <motion.li
                key={b}
                className="flex items-center gap-3 text-base text-zinc-300"
                initial={textInitial}
                whileInView={textAnimate}
                viewport={{ once: true, amount: 0.1 }}
                transition={{ duration: ANIM_DURATION, ease: ANIM_EASE }}
              >
                <span
                  className={`h-1.5 w-1.5 flex-shrink-0 rounded-full ${bulletColor}`}
                />
                {b}
              </motion.li>
            ))}
          </motion.ul>
        </motion.div>

        {/* Visual column */}
        <motion.div
          className="flex items-center justify-center overflow-visible py-8"
          initial={visualInitial}
          whileInView={visualAnimate}
          whileHover={{ scale: 1.02 }}
          viewport={{ once: true, amount: 0.1 }}
          transition={{ duration: ANIM_DURATION, ease: ANIM_EASE, delay: 0.05 }}
        >
          {visual}
        </motion.div>
      </div>
    </SectionWrapper>
  );
}

// ─── Services (3 sections) ───
export default function Services({
  onEnter,
}: {
  onEnter?: (index: number) => void;
}) {
  const services = [
    {
      id: "service-1",
      tagline: "Web Development",
      title: "Custom Web Development",
      regularPrice: "Starter website",
      introPrice: "From $750",
      description:
        "Clean landing pages, web apps, and internal tools built around the way your business actually works.",
      bullets: [
        "Custom storefronts, headless builds, and web apps",
        "Performance-first architecture that converts",
        "Full-stack solutions in React, Next.js, APIs, and modern web platforms",
      ],
      visual: <OpsTheaterVisual variant="web" />,
      accentColor: "bg-blue-600/10",
      bulletColor: "bg-blue-500",
      cardVariant: "web" as const,
    },
    {
      id: "service-2",
      tagline: "Automation",
      title: "Intelligent Automation",
      regularPrice: "Starter automation",
      introPrice: "From $500",
      description:
        "Replace repetitive manual work with reliable workflows, alerts, integrations, and operational visibility.",
      bullets: [
        "Replace hours of manual work with automated workflows",
        "Connect your tools — CRM, email, Slack, Airtable, WhatsApp, any API",
        "Monitor, maintain, and iterate — always improving",
      ],
      visual: <OpsTheaterVisual variant="automation" />,
      accentColor: "bg-cyan-500/15",
      bulletColor: "bg-cyan-500",
      cardVariant: "automation" as const,
    },
    {
      id: "service-3",
      tagline: "AI Agents",
      title: "AI Agents & Intelligent Systems",
      regularPrice: "Starter assistant",
      introPrice: "From $900",
      description:
        "AI assistants that classify, draft, route, and support real business workflows with human review where it matters.",
      bullets: [
        "Custom AI agents for customer ops, triage, and workflows",
        "Multi-agent systems that coordinate autonomously",
        "Built, deployed, and maintained end-to-end",
      ],
      visual: <OpsTheaterVisual variant="agent" />,
      accentColor: "bg-violet-600/15",
      bulletColor: "bg-violet-400",
      cardVariant: "agent" as const,
    },
  ];

  return (
    <>
      {services.map((service, i) => (
        <ServiceSection
          key={service.id}
          {...service}
          index={i}
          onEnter={() => onEnter?.(i)}
        />
      ))}
    </>
  );
}

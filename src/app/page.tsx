"use client";

import { useState, useCallback, useRef, useEffect } from "react";
import Hero from "@/components/Hero";
import SocialProof from "@/components/SocialProof";
import Services from "@/components/Services";
import ProcessSection from "@/components/ProcessSection";
import CaseStudies from "@/components/CaseStudies";
import HowIWork from "@/components/HowIWork";
import WhyMeSection from "@/components/WhyMeSection";
import FAQSection from "@/components/FAQSection";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";
import NavigationDots from "@/components/NavigationDots";
import FloatingWhatsAppButton from "@/components/FloatingWhatsAppButton";
import FloatingNodes from "@/components/FloatingNodes";
import ScanLine from "@/components/ScanLine";
import AnimatedGridBackground from "@/components/AnimatedGridBackground";
import { useAnalytics } from "@/lib/useAnalytics";

// Section registry — must match the rendered order
const SECTION_IDS = [
  "hero",
  "social-proof",
  "service-1",
  "service-2",
  "service-3",
  "process",
  "case-studies",
  "how-i-work",
  "why-me",
  "faq",
  "contact",
] as const;

/**
 * Home — Main portfolio page.
 *
 * Conversion-optimized flow:
 * 0. Hero — outcome headline + availability + 1 CTA
 * 1. Social Proof — 3 anonymized testimonials
 * 2-4. Services — outcome-named with baseline pricing
 * 5. Process — "How It Works" 3-step flow
 * 6. Case Studies — 2 detailed stories
 * 7. How I Work — operating principles
 * 8. Why Me vs Agency — comparison table
 * 9. FAQ
 * 10. Contact — Cal.com primary + WhatsApp secondary
 */
export default function Home() {
  const [activeSection, setActiveSection] = useState(0);
  const [showScanLine, setShowScanLine] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);
  const trackedSectionsRef = useRef<Set<number>>(new Set());
  const { trackSectionView, trackCTAClick } = useAnalytics();

  // Scroll progress tracking
  useEffect(() => {
    const handleScroll = () => {
      const totalHeight =
        document.documentElement.scrollHeight - window.innerHeight;
      const progress =
        totalHeight > 0 ? (window.scrollY / totalHeight) * 100 : 0;
      setScrollProgress(progress);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // IntersectionObserver callback — fires when a section enters the viewport
  const handleSectionEnter = useCallback(
    (index: number) => {
      setActiveSection(index);

      // Track each section only once per page load
      if (!trackedSectionsRef.current.has(index)) {
        trackedSectionsRef.current.add(index);
        trackSectionView(SECTION_IDS[index], index);
      }
    },
    [trackSectionView],
  );

  // Dot click — smooth scroll to section + scan line effect
  const handleDotClick = useCallback((index: number) => {
    const id = SECTION_IDS[index];
    const el = document.getElementById(id);
    if (!el) return;

    setShowScanLine(true);
    el.scrollIntoView({ behavior: "smooth" });
    setActiveSection(index);
  }, []);

  // CTA click handler for analytics
  const handleCTAClick = useCallback(
    (ctaName: string) => {
      trackCTAClick(ctaName, "main-page");
    },
    [trackCTAClick],
  );

  return (
    <main className="relative">
      {/* Scroll progress indicator */}
      <div className="fixed top-0 left-0 right-0 z-[100] h-0.5 bg-white/5">
        <div
          className="h-full bg-gradient-to-r from-blue-500 to-cyan-400"
          style={{ width: `${scrollProgress}%` }}
        />
      </div>

      {/* Fixed header — Safeer logo + Book button */}
      <header className="fixed top-2 left-0 right-0 z-[99] flex items-center justify-between px-6 py-3 md:px-8 backdrop-blur-sm">
        {/* Logo */}
        <a
          href="#hero"
          className="text-xl font-black tracking-tight text-white/90 transition-colors hover:text-white"
        >
          Safeer<span className="text-blue-400">.</span>
        </a>
        {/* Book button */}
        <a
          href="https://cal.com/safeer-ahmad/15min"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 rounded-full border border-blue-500/30 bg-blue-500/10 px-4 py-2 text-xs font-semibold text-blue-400 backdrop-blur-sm transition-all duration-200 hover:bg-blue-500/20 hover:text-blue-300"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="14"
            height="14"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <rect width="18" height="18" x="3" y="4" rx="2" ry="2" />
            <line x1="16" x2="16" y1="2" y2="6" />
            <line x1="8" x2="8" y1="2" y2="6" />
            <line x1="3" x2="21" y1="10" y2="10" />
          </svg>
          Book a Call
        </a>
      </header>

      {/* Agentic grid background */}
      <AnimatedGridBackground />

      {/* Background nodes — mouse-reactive floating particles */}
      <FloatingNodes count={12} />

      {/* Scan line overlay — fires on nav dot click */}
      {showScanLine && (
        <div className="pointer-events-none fixed inset-0 z-50">
          <ScanLine onComplete={() => setShowScanLine(false)} />
        </div>
      )}

      {/* Fixed navigation dots — right side */}
      <NavigationDots
        sections={SECTION_IDS}
        activeSection={activeSection}
        onDotClick={handleDotClick}
      />

      {/* Floating WhatsApp button — bottom-right */}
      <FloatingWhatsAppButton />

      {/* Sections — rendered in conversion-optimized order */}
      <Hero onEnter={() => handleSectionEnter(0)} onCTAClick={handleCTAClick} />
      <SocialProof onEnter={() => handleSectionEnter(1)} />
      <Services onEnter={(i) => handleSectionEnter(i + 2)} />
      <ProcessSection onEnter={() => handleSectionEnter(5)} />
      <CaseStudies onEnter={() => handleSectionEnter(6)} />
      <HowIWork onEnter={() => handleSectionEnter(7)} />
      <WhyMeSection onEnter={() => handleSectionEnter(8)} />
      <FAQSection onEnter={() => handleSectionEnter(9)} />
      <Contact onEnter={() => handleSectionEnter(10)} />
      {/* Footer snap section */}
      <section className="snap-section flex min-h-[50vh] items-center justify-center">
        <Footer />
      </section>
    </main>
  );
}

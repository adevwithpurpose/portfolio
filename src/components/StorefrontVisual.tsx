"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";

/**
 * StorefrontVisual — Service 1: Custom Web Development
 *
 * WOW FACTOR: Live storefront "builds itself" in a continuous loop —
 * header → hero → products → metrics appear sequentially, progress bar fills,
 * then resets and rebuilds.
 */
export default function StorefrontVisual() {
  const containerRef = useRef<HTMLDivElement>(null);
  const cardRef = useRef<HTMLDivElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const heroRef = useRef<HTMLDivElement>(null);
  const productsRef = useRef<HTMLDivElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);
  const metricsRef = useRef<HTMLDivElement>(null);
  const progressBarRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Initial state
      gsap.set(
        [
          headerRef.current,
          heroRef.current,
          productsRef.current,
          ctaRef.current,
          metricsRef.current,
        ],
        { opacity: 0, y: 15 },
      );
      gsap.set(progressBarRef.current, {
        scaleX: 0,
        transformOrigin: "left center",
      });

      // Card entrance
      gsap.fromTo(
        cardRef.current,
        { opacity: 0, scale: 0.97 },
        { opacity: 1, scale: 1, duration: 0.25, ease: "power2.out" },
      );

      // Build sequence loop
      const tl = gsap.timeline({ delay: 0.3 });

      tl.to(headerRef.current, {
        opacity: 1,
        y: 0,
        duration: 0.2,
        ease: "power2.out",
      })
        .to(
          heroRef.current,
          { opacity: 1, y: 0, duration: 0.2, ease: "power2.out" },
          "-=0.08",
        )
        .to(
          productsRef.current,
          { opacity: 1, y: 0, duration: 0.2, ease: "power2.out" },
          "-=0.08",
        )
        .to(
          ctaRef.current,
          { opacity: 1, y: 0, duration: 0.15, ease: "power2.out" },
          "-=0.05",
        )
        .fromTo(
          progressBarRef.current,
          { scaleX: 0 },
          { scaleX: 1, duration: 0.5, ease: "power2.inOut" },
          "-=0.1",
        )
        .to(
          metricsRef.current,
          { opacity: 1, y: 0, duration: 0.2, ease: "power2.out" },
          "-=0.15",
        );

      // Hold to admire
      tl.to({}, { duration: 2 });

      // Reset for next loop
      tl.to(
        [
          headerRef.current,
          heroRef.current,
          productsRef.current,
          ctaRef.current,
          metricsRef.current,
        ],
        {
          opacity: 0,
          y: -10,
          duration: 0.15,
          ease: "power2.in",
          stagger: 0.02,
        },
      );
      tl.to(progressBarRef.current, { scaleX: 0, duration: 0.1 });
      tl.to({}, { duration: 0.3 });

      // Loop forever
      tl.eventCallback("onComplete", () => {
        tl.restart();
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <div
      ref={containerRef}
      className="relative mx-auto w-full max-w-lg overflow-hidden"
    >
      {/* Ambient glow */}
      <div className="absolute -inset-8 rounded-2xl bg-blue-600/15 blur-3xl" />

      {/* Browser card */}
      <div
        ref={cardRef}
        className="glass relative z-10 overflow-hidden rounded-xl border border-white/10 bg-white/[0.02]"
        style={{ opacity: 0 }}
      >
        {/* Browser chrome */}
        <div className="flex items-center gap-2 border-b border-white/5 px-5 py-3 bg-white/[0.02]">
          <div className="flex gap-2">
            <div className="h-3 w-3 rounded-full bg-red-500/60" />
            <div className="h-3 w-3 rounded-full bg-yellow-500/60" />
            <div className="h-3 w-3 rounded-full bg-green-500/60" />
          </div>
          <div className="ml-3 flex-1 rounded bg-white/5 px-2.5 py-1 text-xs text-white/25 font-mono">
            yourstore.com
          </div>
        </div>

        {/* Storefront content */}
        <div className="p-5">
          {/* Header / Nav */}
          <div
            ref={headerRef}
            className="mb-4 flex items-center justify-between"
            style={{ opacity: 0 }}
          >
            <div className="flex items-center gap-3">
              <div className="h-8 w-8 rounded-lg bg-gradient-to-br from-blue-500 to-cyan-400" />
              <div className="flex flex-col gap-1">
                <div className="h-2.5 w-20 rounded bg-white/20" />
                <div className="h-1.5 w-12 rounded bg-white/10" />
              </div>
            </div>
            <div className="flex gap-3">
              <div className="h-2 w-10 rounded bg-white/15" />
              <div className="h-2 w-10 rounded bg-white/15" />
              <div className="h-2 w-10 rounded bg-white/15" />
            </div>
          </div>

          {/* Hero section */}
          <div
            ref={heroRef}
            className="mb-4 rounded-lg border border-white/5 bg-white/[0.03] p-4"
            style={{ opacity: 0 }}
          >
            <div className="mb-2 h-4 w-40 rounded bg-white/20" />
            <div className="mb-1 h-2 w-56 rounded bg-white/10" />
            <div className="mb-3 h-2 w-40 rounded bg-white/10" />
            <div className="h-7 w-28 rounded-full bg-gradient-to-r from-blue-500 to-cyan-400 opacity-80" />
          </div>

          {/* Product cards */}
          <div
            ref={productsRef}
            className="mb-4 grid grid-cols-3 gap-2.5"
            style={{ opacity: 0 }}
          >
            {[0, 1, 2].map((i) => (
              <div
                key={i}
                className="rounded-lg border border-white/5 bg-white/[0.03] p-2.5"
              >
                <div className="mb-2 h-9 w-full rounded bg-white/8" />
                <div className="mb-1 h-1.5 w-full rounded bg-white/15" />
                <div className="h-1.5 w-3/4 rounded bg-white/10" />
              </div>
            ))}
          </div>

          {/* CTA row */}
          <div
            ref={ctaRef}
            className="mb-4 flex items-center justify-between"
            style={{ opacity: 0 }}
          >
            <div className="h-7 w-20 rounded-full border border-white/15 bg-white/5" />
            <div className="h-7 w-16 rounded-full bg-white/8" />
          </div>

          {/* Progress / Build bar */}
          <div className="mb-4">
            <div className="mb-1.5 flex items-center justify-between">
              <span className="text-[10px] text-white/30 font-mono">
                Building...
              </span>
              <span className="text-[10px] text-blue-400/60 font-mono">
                98/100
              </span>
            </div>
            <div className="h-1.5 w-full rounded-full bg-white/5 overflow-hidden">
              <div
                ref={progressBarRef}
                className="h-full rounded-full bg-gradient-to-r from-blue-500 to-cyan-400"
                style={{ transformOrigin: "left center" }}
              />
            </div>
          </div>

          {/* Performance metrics */}
          <div
            ref={metricsRef}
            className="grid grid-cols-3 gap-2"
            style={{ opacity: 0 }}
          >
            {[
              { label: "Performance", value: "98", color: "text-green-400" },
              { label: "Accessibility", value: "100", color: "text-green-400" },
              { label: "Conversion", value: "+40%", color: "text-blue-400" },
            ].map((m) => (
              <div
                key={m.label}
                className="rounded-lg border border-white/5 bg-white/[0.03] p-2 text-center"
              >
                <div className={`text-base font-black ${m.color}`}>
                  {m.value}
                </div>
                <div className="text-[8px] text-white/30 mt-0.5">{m.label}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Footer */}
        <div className="flex items-center justify-between border-t border-white/5 px-5 py-2 text-[10px] text-white/20">
          <span className="flex items-center gap-1.5">
            <span className="h-1.5 w-1.5 rounded-full bg-green-400" />
            Live & optimized
          </span>
          <span>Next.js + APIs</span>
        </div>
      </div>
    </div>
  );
}

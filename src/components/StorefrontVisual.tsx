"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";

/**
 * StorefrontVisual — Service 1: Custom Web Development
 *
 * WOW: browser "builds itself" with staggered product assembly, live score
 * tick-up, metric count-up, soft glow pulse on completion, smooth rebuild loop.
 */
export default function StorefrontVisual() {
  const containerRef = useRef<HTMLDivElement>(null);
  const cardRef = useRef<HTMLDivElement>(null);
  const glowRef = useRef<HTMLDivElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const heroRef = useRef<HTMLDivElement>(null);
  const productsRef = useRef<HTMLDivElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);
  const metricsRef = useRef<HTMLDivElement>(null);
  const progressBarRef = useRef<HTMLDivElement>(null);
  const progressLabelRef = useRef<HTMLSpanElement>(null);
  const scoreRef = useRef<HTMLSpanElement>(null);
  const scanRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const productCards = gsap.utils.toArray<HTMLElement>(".sf-product");
      const metricValues = gsap.utils.toArray<HTMLElement>(".sf-metric-value");

      gsap.set(
        [headerRef.current, heroRef.current, ctaRef.current, metricsRef.current],
        { opacity: 0, y: 18 },
      );
      gsap.set(productCards, { opacity: 0, y: 20, scale: 0.92 });
      gsap.set(progressBarRef.current, {
        scaleX: 0,
        transformOrigin: "left center",
      });
      gsap.set(scanRef.current, { xPercent: -120, opacity: 0 });
      if (progressLabelRef.current) progressLabelRef.current.textContent = "0%";
      if (scoreRef.current) scoreRef.current.textContent = "0/100";

      gsap.fromTo(
        cardRef.current,
        { opacity: 0, scale: 0.96, y: 12 },
        { opacity: 1, scale: 1, y: 0, duration: 0.35, ease: "power3.out" },
      );

      const score = { v: 0 };
      const progress = { v: 0 };

      const tl = gsap.timeline({
        delay: 0.25,
        repeat: -1,
        repeatDelay: 0.35,
      });

      // Scan sweep across browser chrome
      tl.fromTo(
        scanRef.current,
        { xPercent: -120, opacity: 0 },
        { xPercent: 120, opacity: 0.55, duration: 0.7, ease: "power2.inOut" },
      )
        .to(scanRef.current, { opacity: 0, duration: 0.15 }, "-=0.1")
        // Build: header → hero
        .to(headerRef.current, {
          opacity: 1,
          y: 0,
          duration: 0.28,
          ease: "power3.out",
        })
        .to(
          heroRef.current,
          { opacity: 1, y: 0, duration: 0.28, ease: "power3.out" },
          "-=0.12",
        )
        // Products cascade
        .to(
          productCards,
          {
            opacity: 1,
            y: 0,
            scale: 1,
            duration: 0.32,
            ease: "back.out(1.6)",
            stagger: 0.1,
          },
          "-=0.08",
        )
        .to(
          ctaRef.current,
          { opacity: 1, y: 0, duration: 0.22, ease: "power2.out" },
          "-=0.1",
        )
        // Progress + score tick
        .to(
          progress,
          {
            v: 98,
            duration: 0.9,
            ease: "power2.inOut",
            onUpdate: () => {
              const n = Math.round(progress.v);
              if (progressLabelRef.current) {
                progressLabelRef.current.textContent =
                  n < 98 ? `Building… ${n}%` : "Optimized";
              }
              if (progressBarRef.current) {
                gsap.set(progressBarRef.current, { scaleX: n / 100 });
              }
            },
          },
          "-=0.05",
        )
        .to(
          score,
          {
            v: 98,
            duration: 0.9,
            ease: "power2.inOut",
            onUpdate: () => {
              if (scoreRef.current) {
                scoreRef.current.textContent = `${Math.round(score.v)}/100`;
              }
            },
          },
          "<",
        )
        // Metrics pop + count-ish flash
        .to(
          metricsRef.current,
          { opacity: 1, y: 0, duration: 0.25, ease: "power2.out" },
          "-=0.2",
        )
        .fromTo(
          metricValues,
          { scale: 0.7, opacity: 0.4 },
          {
            scale: 1,
            opacity: 1,
            duration: 0.35,
            ease: "back.out(1.8)",
            stagger: 0.08,
          },
          "-=0.15",
        )
        // Completion glow pulse
        .to(glowRef.current, {
          opacity: 0.55,
          duration: 0.35,
          ease: "power2.out",
        })
        .to(glowRef.current, {
          opacity: 0.25,
          duration: 0.5,
          ease: "power2.inOut",
        })
        // Hold to admire
        .to({}, { duration: 1.8 })
        // Soft dismantle
        .to(
          [
            headerRef.current,
            heroRef.current,
            ...productCards,
            ctaRef.current,
            metricsRef.current,
          ],
          {
            opacity: 0,
            y: -12,
            duration: 0.22,
            ease: "power2.in",
            stagger: 0.025,
          },
        )
        .to(
          progressBarRef.current,
          { scaleX: 0, duration: 0.18, ease: "power2.in" },
          "-=0.1",
        )
        .add(() => {
          progress.v = 0;
          score.v = 0;
          if (progressLabelRef.current) {
            progressLabelRef.current.textContent = "0%";
          }
          if (scoreRef.current) scoreRef.current.textContent = "0/100";
          gsap.set(productCards, { scale: 0.92, y: 20 });
        });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <div
      ref={containerRef}
      className="relative mx-auto w-full max-w-lg overflow-hidden"
    >
      <div
        ref={glowRef}
        className="absolute -inset-8 rounded-2xl bg-blue-600/20 blur-3xl"
        style={{ opacity: 0.25 }}
      />

      <div
        ref={cardRef}
        className="glass relative z-10 overflow-hidden rounded-xl border border-white/10 bg-white/[0.02]"
        style={{ opacity: 0 }}
      >
        {/* Browser chrome + scan line */}
        <div className="relative flex items-center gap-2 overflow-hidden border-b border-white/5 bg-white/[0.02] px-5 py-3">
          <div
            ref={scanRef}
            className="pointer-events-none absolute inset-y-0 w-1/3 bg-gradient-to-r from-transparent via-cyan-400/25 to-transparent"
          />
          <div className="flex gap-2">
            <div className="h-3 w-3 rounded-full bg-red-500/60" />
            <div className="h-3 w-3 rounded-full bg-yellow-500/60" />
            <div className="h-3 w-3 rounded-full bg-green-500/60" />
          </div>
          <div className="ml-3 flex-1 rounded bg-white/5 px-2.5 py-1 font-mono text-xs text-white/25">
            client-storefront.com
          </div>
        </div>

        <div className="p-5">
          <div
            ref={headerRef}
            className="mb-4 flex items-center justify-between"
            style={{ opacity: 0 }}
          >
            <div className="flex items-center gap-3">
              <div className="h-8 w-8 rounded-lg bg-gradient-to-br from-blue-500 to-cyan-400 shadow-[0_0_18px_rgba(59,130,246,0.45)]" />
              <span className="text-sm font-bold tracking-tight text-white/50">
                NovaBrand
              </span>
            </div>
            <div className="flex gap-3">
              <div className="h-2 w-10 rounded bg-white/15" />
              <div className="h-2 w-10 rounded bg-white/15" />
              <div className="h-2 w-10 rounded bg-white/15" />
            </div>
          </div>

          <div
            ref={heroRef}
            className="mb-4 rounded-lg border border-white/5 bg-white/[0.03] p-4"
            style={{ opacity: 0 }}
          >
            <div className="mb-2 h-4 w-40 rounded bg-white/20" />
            <div className="mb-1 h-2 w-56 rounded bg-white/10" />
            <div className="mb-3 h-2 w-40 rounded bg-white/10" />
            <div className="h-7 w-28 rounded-full bg-gradient-to-r from-blue-500 to-cyan-400 opacity-90 shadow-[0_0_16px_rgba(34,211,238,0.35)]" />
          </div>

          <div ref={productsRef} className="mb-4 grid grid-cols-3 gap-2.5">
            {[
              { name: "Premium Pack", price: "$49.99" },
              { name: "Starter Kit", price: "$29.00" },
              { name: "Pro Bundle", price: "$89.95" },
            ].map((product) => (
              <div
                key={product.name}
                className="sf-product rounded-lg border border-white/5 bg-white/[0.03] p-2.5"
                style={{ opacity: 0 }}
              >
                <div className="mb-2 h-9 w-full rounded bg-gradient-to-br from-white/10 to-white/[0.03]" />
                <div className="mb-1 text-[9px] text-white/35">{product.name}</div>
                <div className="text-[9px] font-medium text-cyan-300/50">
                  {product.price}
                </div>
              </div>
            ))}
          </div>

          <div
            ref={ctaRef}
            className="mb-4 flex items-center justify-between"
            style={{ opacity: 0 }}
          >
            <div className="h-7 w-20 rounded-full border border-white/15 bg-white/5" />
            <div className="h-7 w-16 rounded-full bg-white/8" />
          </div>

          <div className="mb-4">
            <div className="mb-1.5 flex items-center justify-between">
              <span
                ref={progressLabelRef}
                className="font-mono text-[10px] text-white/35"
              >
                0%
              </span>
              <span
                ref={scoreRef}
                className="font-mono text-[10px] text-blue-400/70"
              >
                0/100
              </span>
            </div>
            <div className="h-1.5 w-full overflow-hidden rounded-full bg-white/5">
              <div
                ref={progressBarRef}
                className="h-full rounded-full bg-gradient-to-r from-blue-500 via-cyan-400 to-emerald-400 shadow-[0_0_12px_rgba(34,211,238,0.5)]"
                style={{ transformOrigin: "left center" }}
              />
            </div>
          </div>

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
                <div className={`sf-metric-value text-base font-black ${m.color}`}>
                  {m.value}
                </div>
                <div className="mt-0.5 text-[8px] text-white/30">{m.label}</div>
              </div>
            ))}
          </div>
        </div>

        <div className="flex items-center justify-between border-t border-white/5 px-5 py-2 text-[10px] text-white/20">
          <span className="flex items-center gap-1.5">
            <span className="h-1.5 w-1.5 rounded-full bg-green-400 shadow-[0_0_8px_rgba(74,222,128,0.8)]" />
            Live & optimized
          </span>
          <span>Next.js + APIs</span>
        </div>
      </div>
    </div>
  );
}

"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";

/**
 * StorefrontVisual — Service 1
 * Seamless assemble → score → hold → soft crossfade rebuild.
 * Pause off-screen. Reduced-motion = finished frame.
 */
export default function StorefrontVisual() {
  const containerRef = useRef<HTMLDivElement>(null);
  const cardRef = useRef<HTMLDivElement>(null);
  const glowRef = useRef<HTMLDivElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const heroRef = useRef<HTMLDivElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);
  const metricsRef = useRef<HTMLDivElement>(null);
  const progressBarRef = useRef<HTMLDivElement>(null);
  const progressLabelRef = useRef<HTMLSpanElement>(null);
  const scoreRef = useRef<HTMLSpanElement>(null);
  const scanRef = useRef<HTMLDivElement>(null);
  const stageRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const root = containerRef.current;
    if (!root) return;

    const productCards = gsap.utils.toArray<HTMLElement>(
      root.querySelectorAll(".sf-product"),
    );
    const metricValues = gsap.utils.toArray<HTMLElement>(
      root.querySelectorAll(".sf-metric-value"),
    );

    const showFinished = () => {
      gsap.set(cardRef.current, { opacity: 1, scale: 1, y: 0 });
      gsap.set(stageRef.current, { opacity: 1 });
      gsap.set(
        [headerRef.current, heroRef.current, ctaRef.current, metricsRef.current],
        { opacity: 1, y: 0 },
      );
      gsap.set(productCards, { opacity: 1, y: 0, scale: 1 });
      gsap.set(progressBarRef.current, {
        scaleX: 1,
        transformOrigin: "left center",
      });
      gsap.set([scanRef.current], { opacity: 0 });
      gsap.set(glowRef.current, { opacity: 0.35 });
      if (progressLabelRef.current)
        progressLabelRef.current.textContent = "Optimized";
      if (scoreRef.current) scoreRef.current.textContent = "98/100";
    };

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      showFinished();
      return;
    }

    const score = { v: 0 };
    const progress = { v: 0 };

    const resetStage = () => {
      score.v = 0;
      progress.v = 0;
      if (progressLabelRef.current)
        progressLabelRef.current.textContent = "Building… 0%";
      if (scoreRef.current) scoreRef.current.textContent = "0/100";
      gsap.set(progressBarRef.current, {
        scaleX: 0,
        transformOrigin: "left center",
      });
      gsap.set(productCards, { opacity: 0, y: 18, scale: 0.92 });
      gsap.set(
        [headerRef.current, heroRef.current, ctaRef.current, metricsRef.current],
        { opacity: 0, y: 16 },
      );
      gsap.set(metricValues, { scale: 1, opacity: 1 });
    };

    const ctx = gsap.context(() => {
      gsap.set(cardRef.current, { opacity: 0, scale: 0.97, y: 12 });
      gsap.set(glowRef.current, { opacity: 0.16 });
      gsap.set(scanRef.current, { xPercent: -130, opacity: 0 });
      gsap.set(stageRef.current, { opacity: 1 });
      resetStage();

      const loop = gsap.timeline({ paused: true, repeat: -1 });

      const addBuild = (t: gsap.core.Timeline, scan: boolean) => {
        if (scan) {
          t.fromTo(
            scanRef.current,
            { xPercent: -130, opacity: 0 },
            {
              xPercent: 130,
              opacity: 0.55,
              duration: 0.7,
              ease: "power2.inOut",
            },
          ).to(scanRef.current, { opacity: 0, duration: 0.12 }, "-=0.1");
        }

        t.to(headerRef.current, {
          opacity: 1,
          y: 0,
          duration: 0.3,
          ease: "power3.out",
        })
          .to(
            heroRef.current,
            { opacity: 1, y: 0, duration: 0.3, ease: "power3.out" },
            "-=0.12",
          )
          .to(
            productCards,
            {
              opacity: 1,
              y: 0,
              scale: 1,
              duration: 0.34,
              ease: "back.out(1.55)",
              stagger: 0.1,
            },
            "-=0.1",
          )
          .to(
            ctaRef.current,
            { opacity: 1, y: 0, duration: 0.22, ease: "power2.out" },
            "-=0.1",
          )
          .to(progress, {
            v: 98,
            duration: 1.0,
            ease: "power2.inOut",
            onUpdate: () => {
              const n = Math.round(progress.v);
              if (progressLabelRef.current) {
                progressLabelRef.current.textContent =
                  n < 98 ? `Building… ${n}%` : "Optimized";
              }
              gsap.set(progressBarRef.current, { scaleX: n / 100 });
            },
          })
          .to(
            score,
            {
              v: 98,
              duration: 1.0,
              ease: "power2.inOut",
              onUpdate: () => {
                if (scoreRef.current)
                  scoreRef.current.textContent = `${Math.round(score.v)}/100`;
              },
            },
            "<",
          )
          .to(
            metricsRef.current,
            { opacity: 1, y: 0, duration: 0.26, ease: "power2.out" },
            "-=0.22",
          )
          .fromTo(
            metricValues,
            { scale: 0.75, opacity: 0.4 },
            {
              scale: 1,
              opacity: 1,
              duration: 0.36,
              ease: "back.out(1.7)",
              stagger: 0.08,
            },
            "-=0.16",
          )
          .to(glowRef.current, {
            opacity: 0.46,
            duration: 0.35,
            ease: "power2.out",
          })
          .to(glowRef.current, {
            opacity: 0.28,
            duration: 0.65,
            ease: "sine.inOut",
          })
          // Long finished hold
          .to({}, { duration: 2.8 });
      };

      // Loop body: build → hold → soft cover → reset → (repeat rebuild without zero flash)
      addBuild(loop, true);
      loop
        .to(stageRef.current, {
          opacity: 0,
          duration: 0.32,
          ease: "power2.inOut",
        })
        .add(resetStage)
        .set(stageRef.current, { opacity: 1 });
      addBuild(loop, false);
      loop
        .to(stageRef.current, {
          opacity: 0,
          duration: 0.32,
          ease: "power2.inOut",
        })
        .add(resetStage)
        .set(stageRef.current, { opacity: 1 });
      // After second soft reset, timeline repeats from start which does scan+build again
      // First tween of next cycle starts with empty stage already reset - good
      // But first cycle also has card entrance outside:

      const intro = gsap.timeline({ paused: true });
      intro
        .to(cardRef.current, {
          opacity: 1,
          scale: 1,
          y: 0,
          duration: 0.4,
          ease: "power3.out",
        })
        .add(() => {
          loop.restart();
        });

      let started = false;
      const io = new IntersectionObserver(
        ([entry]) => {
          const on = entry.isIntersecting && entry.intersectionRatio >= 0.28;
          if (on) {
            if (!started) {
              started = true;
              intro.play(0);
            } else if (loop.paused()) {
              loop.play();
            }
          } else {
            loop.pause();
            intro.pause();
          }
        },
        { threshold: [0, 0.28, 0.55] },
      );
      io.observe(root);

      return () => {
        io.disconnect();
        intro.kill();
        loop.kill();
      };
    }, root);

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
        style={{ opacity: 0.16 }}
      />

      <div
        ref={cardRef}
        className="glass relative z-10 overflow-hidden rounded-xl border border-white/10 bg-white/[0.02]"
        style={{ opacity: 0 }}
      >
        <div className="relative flex items-center gap-2 overflow-hidden border-b border-white/5 bg-white/[0.02] px-5 py-3">
          <div
            ref={scanRef}
            className="pointer-events-none absolute inset-y-0 w-1/3 bg-gradient-to-r from-transparent via-cyan-400/30 to-transparent"
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

        <div ref={stageRef} className="p-5">
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

          <div className="mb-4 grid grid-cols-3 gap-2.5">
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
                <div className="mb-1 text-[9px] text-white/35">
                  {product.name}
                </div>
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
                Building… 0%
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
                style={{
                  transformOrigin: "left center",
                  transform: "scaleX(0)",
                }}
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
                <div
                  className={`sf-metric-value text-base font-black ${m.color}`}
                >
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

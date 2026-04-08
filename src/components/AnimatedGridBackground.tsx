"use client";

import { useEffect, useRef } from "react";

/**
 * AnimatedGridBackground — Subtle dot/line grid overlay
 * that gives an "agentic control room" atmosphere.
 *
 * Features:
 * - Animated intersection dots that pulse
 * - Faint grid lines
 * - High-DPI / Retina support
 * - Purely CSS-driven fallback; Canvas for animation
 */
export default function AnimatedGridBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const dpr = window.devicePixelRatio || 1;
    let raf = 0;
    let time = 0;

    const resize = () => {
      const w = window.innerWidth;
      const h = window.innerHeight;
      canvas.width = w * dpr;
      canvas.height = h * dpr;
      canvas.style.width = `${w}px`;
      canvas.style.height = `${h}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };
    resize();
    window.addEventListener("resize", resize);

    const draw = () => {
      const w = window.innerWidth;
      const h = window.innerHeight;
      ctx.clearRect(0, 0, w, h);
      time += 0.005;

      const spacing = 60;
      const cols = Math.ceil(w / spacing) + 1;
      const rows = Math.ceil(h / spacing) + 1;
      const pulse = (Math.sin(time * 2) + 1) / 2; // 0..1

      // Draw faint lines
      ctx.strokeStyle = "rgba(37, 99, 235, 0.04)";
      ctx.lineWidth = 0.5;
      for (let x = 0; x <= cols; x++) {
        ctx.beginPath();
        ctx.moveTo(x * spacing, 0);
        ctx.lineTo(x * spacing, h);
        ctx.stroke();
      }
      for (let y = 0; y <= rows; y++) {
        ctx.beginPath();
        ctx.moveTo(0, y * spacing);
        ctx.lineTo(w, y * spacing);
        ctx.stroke();
      }

      // Animated intersection dots — pulse outward
      for (let x = 0; x <= cols; x++) {
        for (let y = 0; y <= rows; y++) {
          const px = x * spacing;
          const py = y * spacing;
          const phase = (x * 0.3 + y * 0.4 + time) % (Math.PI * 2);
          const alpha = 0.08 + 0.08 * Math.sin(phase);
          const radius = 1 + 0.5 * pulse;

          ctx.beginPath();
          ctx.arc(px, py, radius, 0, Math.PI * 2);
          ctx.fillStyle = `rgba(59, 130, 246, ${alpha})`;
          ctx.fill();
        }
      }

      raf = requestAnimationFrame(draw);
    };

    raf = requestAnimationFrame(draw);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", resize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="pointer-events-none fixed inset-0 z-[1]"
      style={{ opacity: 0.6 }}
    />
  );
}

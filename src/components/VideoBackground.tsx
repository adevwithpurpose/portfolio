"use client";

/**
 * VideoBackground — optional hero video backdrop.
 *
 * SETUP:
 * 1. Place a video file (MP4, loop, muted, ≤5MB) in /public/hero-bg.mp4
 * 2. Uncomment the <video> block below and set autoPlay and loop
 * 3. Remove or disable the CSS animated background in Hero.tsx when using video
 *
 * The CSS animated grid + floating particles in globals.css and Hero.tsx
 * already provide a strong atmospheric effect. Video is an optional layer.
 *
 * RECOMMENDED VIDEO CONTENT:
 * - Abstract workflow/data flow patterns
 * - Network nodes connecting in real-time
 * - Subtle particle systems (dark background, blue/cyan tones)
 * - Must be loopable, muted, and ≤5MB for performance
 *
 * REFERENCE: https://youtu.be/uw6C8Z1XieY
 */
export default function VideoBackground() {
  return (
    <div className="pointer-events-none fixed inset-0 z-[0]">
      {/* Uncomment when you have a video file:
      <video
        autoPlay
        loop
        muted
        playsInline
        className="h-full w-full object-cover opacity-20"
        style={{ filter: "blur(2px) saturate(0.8)" }}
      >
        <source src="/hero-bg.mp4" type="video/mp4" />
      </video>
      */}

      {/* Dark overlay so content remains readable */}
      <div className="absolute inset-0 bg-background/70" />
    </div>
  );
}

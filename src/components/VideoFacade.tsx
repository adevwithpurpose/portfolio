"use client";

import { useState } from "react";

interface VideoFacadeProps {
  videoUrl: string;
  posterUrl: string;
  title: string;
  aspectRatioClassName?: string;
}

export default function VideoFacade({
  videoUrl,
  posterUrl,
  title,
  aspectRatioClassName = "aspect-video"
}: VideoFacadeProps) {
  const [isPlaying, setIsPlaying] = useState(false);

  if (!isPlaying) {
    return (
      <div
        className={`relative w-full rounded-xl overflow-hidden border border-white/5 cursor-pointer group bg-black/60 ${aspectRatioClassName}`}
        onClick={() => setIsPlaying(true)}
      >
        {/* Poster Thumbnail */}
        <img
          src={posterUrl}
          alt={title}
          className="w-full h-full object-cover opacity-50 group-hover:opacity-75 group-hover:scale-[1.01] transition-all duration-300 select-none pointer-events-none"
          loading="lazy"
          fetchPriority="low"
        />

        {/* Glow Play Button in center */}
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="w-12 h-12 rounded-full bg-blue-500/10 border border-blue-500/30 text-blue-400 backdrop-blur-md flex items-center justify-center group-hover:bg-blue-500 group-hover:text-white group-hover:border-blue-500 group-hover:scale-105 transition-all duration-300 shadow-lg shadow-blue-500/10">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
              <polygon points="6 3 20 12 6 21 6 3" />
            </svg>
          </div>
        </div>

        {/* Console-style visual status overlay */}
        <div className="absolute bottom-3 left-3 bg-black/80 backdrop-blur-sm border border-white/5 rounded px-2.5 py-1 font-mono text-[9px] text-zinc-400 group-hover:text-white group-hover:border-blue-500/20 transition-all">
          [▶ WATCH WALKTHROUGH]
        </div>
      </div>
    );
  }

  return (
    <div className={`relative w-full rounded-xl overflow-hidden border border-white/10 bg-black ${aspectRatioClassName}`}>
      <iframe
        src={`${videoUrl}${videoUrl.includes("?") ? "&" : "?"}autoplay=1&muted=0`}
        title={title}
        frameBorder="0"
        allow="autoplay; fullscreen; picture-in-picture"
        allowFullScreen
        className="absolute top-0 left-0 w-full h-full"
      />
    </div>
  );
}

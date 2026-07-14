"use client";

import { useState, useRef, useEffect } from "react";

type OutputLine = {
  id: string;
  type: "command" | "output" | "error";
  content: string;
};

const COMMAND_RESPONSES: Record<string, string[]> = {
  whoami: [
    "safeer_ahmad",
    "ROLE: Senior Web Developer & Automation Engineer",
    "LOCATION: Asia/Karachi",
    "SPECIALTY: Turning manual workflows into automated systems.",
  ],
  stack: [
    "FRONTEND: Next.js, React, Astro, GSAP, Tailwind",
    "CMS/STORE: Shopify (Dawn), WordPress (Elementor/Bricks), TinaCMS",
    "BACKEND: Node.js, FastAPI",
    "AUTOMATION: Crawl4AI, Python, Hermes CLI",
    "DATA: Power BI, Pine Script",
  ],
  ping: [
    "PONG! Availability: 99.9%",
    "Latency: 0.2ms (Direct Access)",
    "Status: Ready for new clients",
  ],
};

export default function HeroTerminal() {
  const [output, setOutput] = useState<OutputLine[]>([
    { id: "init1", type: "output", content: "safeer-os v2.4.0 starting..." },
    { id: "init2", type: "output", content: "Type or click a command to begin" },
  ]);
  const [isTyping, setIsTyping] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [output, isTyping]);

  const runCommand = async (cmd: string) => {
    if (isTyping) return;
    setIsTyping(true);
    
    setOutput(prev => [...prev, { id: Math.random().toString(), type: "command", content: `visitor@safeer-os:~$ ${cmd}` }]);
    
    // Simulate thinking delay
    await new Promise(r => setTimeout(r, 400));
    
    const lines = COMMAND_RESPONSES[cmd] || ["Command not found."];
    
    for (const line of lines) {
      setOutput(prev => [...prev, { id: Math.random().toString(), type: "output", content: line }]);
      await new Promise(r => setTimeout(r, 200));
    }
    
    setIsTyping(false);
  };

  return (
    <div className="w-full max-w-lg mx-auto rounded-xl border border-white/10 bg-[#0c0c0e]/80 shadow-2xl backdrop-blur-md overflow-hidden flex flex-col font-mono text-xs sm:text-sm h-[320px] sm:h-[400px]">
      {/* Header */}
      <div className="flex items-center gap-2 px-4 py-3 border-b border-white/5 bg-[#18181b]/90">
        <div className="flex gap-1.5">
          <div className="w-3 h-3 rounded-full bg-red-500/80" />
          <div className="w-3 h-3 rounded-full bg-yellow-500/80" />
          <div className="w-3 h-3 rounded-full bg-green-500/80" />
        </div>
        <div className="mx-auto text-zinc-500 text-[10px] tracking-widest uppercase ml-[-20px] flex-1 text-center">
          terminal — visitor@safeer-os
        </div>
      </div>
      
      {/* Terminal Output */}
      <div 
        ref={scrollRef}
        className="flex-1 p-5 overflow-y-auto space-y-2 text-zinc-300 text-left scroll-smooth"
      >
        {output.map(line => (
          <div key={line.id} className={line.type === "command" ? "text-blue-400 mt-4 mb-2" : ""}>
            {line.content}
          </div>
        ))}
        {isTyping && <div className="text-zinc-500 animate-pulse mt-2">_</div>}
        {!isTyping && <div className="text-zinc-500 mt-4">visitor@safeer-os:~$ <span className="animate-pulse">_</span></div>}
      </div>
      
      {/* Command Buttons */}
      <div className="p-3 border-t border-white/5 bg-[#18181b]/70 backdrop-blur-lg">
        <div className="flex flex-wrap items-center gap-2">
          {Object.keys(COMMAND_RESPONSES).map(cmd => (
            <button
              key={cmd}
              onClick={() => runCommand(cmd)}
              disabled={isTyping}
              className="px-3 py-1.5 rounded-md bg-white/5 hover:bg-white/10 border border-white/5 text-zinc-400 hover:text-white transition-all disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <span className="text-blue-400 mr-1">$</span>{cmd}
            </button>
          ))}
          <button 
             onClick={() => setOutput([])}
             disabled={isTyping}
             className="px-3 py-1.5 rounded-md bg-transparent hover:bg-white/5 text-zinc-500 hover:text-zinc-300 transition-colors ml-auto text-xs disabled:opacity-50"
          >
            clear
          </button>
        </div>
      </div>
    </div>
  );
}
"use client";

import { useState, useRef, useEffect } from "react";
import VideoFacade from "@/components/VideoFacade";

type OutputLine = {
  id: string;
  type: "command" | "output" | "error";
  content: string | React.ReactNode;
};

type APIMessage = {
  role: "user" | "assistant";
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
  services: [
    "=== SERVICES LOADED ===",
    "1. Shopify & E-Commerce: Headless builds, Dawn optimization to 90+ Lighthouse.",
    "2. Web Development: Next.js, Astro, WordPress (Bricks/Elementor).",
    "3. Automation: AI Agents, n8n workflows, lowering manual hours.",
  ],
  help: [
    "=== AVAILABLE COMMANDS ===",
    "whoami      - Display profile information",
    "stack       - Show technical stack",
    "video       - Launch business systems intro video",
    "services    - Get list of services",
    "clear       - Reset terminal screen",
    "--- Plain English queries ---",
    "Feel free to type questions (e.g. 'How to hire you?' or 'What are your rates?') to talk to Safeer's AI agent."
  ]
};

export default function HeroTerminal() {
  const [output, setOutput] = useState<OutputLine[]>([
    { id: "init1", type: "output", content: "safeer-os v2.4.0 starting..." },
    { id: "init2", type: "output", content: "Type 'help' or click a command to begin. Ask questions to chat with Safeer's AI assistant." },
  ]);
  const [isTyping, setIsTyping] = useState(false);
  const [inputVal, setInputVal] = useState("");
  const [apiHistory, setApiHistory] = useState<APIMessage[]>([]);
  const scrollRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [output, isTyping]);

  const runCommand = async (cmdText: string) => {
    const trimmed = cmdText.trim();
    if (isTyping || !trimmed) return;
    setIsTyping(true);
    setInputVal("");
    
    // Add command input to screen
    setOutput(prev => [
      ...prev, 
      { 
        id: Math.random().toString(), 
        type: "command", 
        content: (
          <span>
            <span className="text-blue-400">visitor@safeer-os:~$</span> {trimmed}
          </span>
        ) 
      }
    ]);
    
    // Simulate thinking delay
    await new Promise(r => setTimeout(r, 400));
    
    const cmdClean = trimmed.toLowerCase();
    
    // Check locally resolved commands first
    if (cmdClean === "clear") {
      setOutput([]);
      setApiHistory([]);
      setIsTyping(false);
      return;
    }

    if (cmdClean === "video" || cmdClean === "intro" || cmdClean === "demo") {
      setOutput(prev => [
        ...prev,
        {
          id: Math.random().toString(),
          type: "output",
          content: "[system]: Establishing asynchronous video stream pipeline..."
        },
        {
          id: Math.random().toString(),
          type: "output",
          content: "[system]: Launching Safeer's interactive media player facade..."
        },
        {
          id: Math.random().toString(),
          type: "output",
          content: (
            <div className="my-4 w-full max-w-md border border-white/5 bg-black/60 rounded-xl overflow-hidden shadow-xl animate-in zoom-in-95 duration-200">
              <VideoFacade
                videoUrl="https://player.vimeo.com/video/506888405" 
                posterUrl="/screenshots/luminous.png" 
                title="Safeer's Intro Explainer Video" 
              />
            </div>
          )
        }
      ]);
      setIsTyping(false);
      return;
    }

    if (COMMAND_RESPONSES[cmdClean]) {
      const lines = COMMAND_RESPONSES[cmdClean];
      for (const line of lines) {
        setOutput(prev => [...prev, { id: Math.random().toString(), type: "output", content: line }]);
        await new Promise(r => setTimeout(r, 100));
      }
    } else {
      // Call external API route for intelligent chat
      try {
        const nextMessages = [...apiHistory, { role: "user" as const, content: trimmed }];
        setApiHistory(nextMessages);

        const res = await fetch("/api/terminal-chat", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ messages: nextMessages })
        });

        if (res.ok) {
          const data = await res.json();
          setOutput(prev => [...prev, { id: Math.random().toString(), type: "output", content: data.text }]);
          setApiHistory(prev => [...prev, { role: "assistant", content: data.text }]);
        } else {
          throw new Error("API call failed");
        }
      } catch (err) {
        console.error("Terminal chat execution error:", err);
        setOutput(prev => [
          ...prev, 
          { 
            id: Math.random().toString(), 
            type: "error", 
            content: "[Terminal Error]: Chat connection failed. Try 'whoami', 'stack', or 'help'." 
          }
        ]);
      }
    }
    
    setIsTyping(false);
    setTimeout(() => {
      inputRef.current?.focus();
    }, 10);
  };

  return (
    <div 
      className="w-full max-w-lg mx-auto rounded-xl border border-white/10 bg-[#0c0c0e]/95 shadow-2xl backdrop-blur-md overflow-hidden flex flex-col font-mono text-xs sm:text-sm h-[400px] sm:h-[480px]" 
      onClick={() => inputRef.current?.focus()}
    >
      {/* Header */}
      <div className="flex items-center gap-2 px-4 py-3 border-b border-white/5 bg-[#18181b]/90">
        <div className="flex gap-1.5">
          <div className="w-3 h-3 rounded-full bg-red-500/80" />
          <div className="w-3 h-3 rounded-full bg-yellow-500/80" />
          <div className="w-3 h-3 rounded-full bg-green-500/80" />
        </div>
        <div className="mx-auto text-zinc-500 text-[10px] tracking-widest uppercase ml-[-20px] flex-1 text-center">
          terminal &mdash; visitor@safeer-os
        </div>
      </div>
      
      {/* Terminal Output */}
      <div 
        ref={scrollRef}
        className="flex-1 p-5 overflow-y-auto space-y-2 text-zinc-300 text-left custom-scrollbar"
      >
        {output.map(line => (
          <div 
            key={line.id} 
            className={line.type === "command" ? "mt-4 mb-2" : "whitespace-pre-line leading-relaxed"}
          >
            {line.content}
          </div>
        ))}
        {isTyping && <div className="text-zinc-500 animate-pulse mt-2">_</div>}
        
        {!isTyping && (
          <form 
             onSubmit={(e) => { e.preventDefault(); runCommand(inputVal); }} 
             className="flex items-center mt-4 text-zinc-500"
          >
             <span className="text-blue-400 font-bold whitespace-nowrap">visitor@safeer-os:~$</span>
             <input
               ref={inputRef}
               type="text"
               value={inputVal}
               onChange={(e) => setInputVal(e.target.value)}
               className="ml-2 flex-1 bg-transparent border-none outline-none text-zinc-300 font-mono caret-zinc-400 min-w-[50px] w-full"
               spellCheck={false}
               autoComplete="off"
               autoFocus
             />
          </form>
        )}
      </div>
      
      {/* Command Buttons */}
      <div className="p-3 border-t border-white/5 bg-[#18181b]/80 backdrop-blur-lg">
        <div className="flex flex-wrap items-center gap-2">
          {["whoami", "stack", "video", "services", "help"].map(cmd => (
            <button
              key={cmd}
              onClick={() => runCommand(cmd)}
              disabled={isTyping}
              className="px-3 py-1.5 rounded-md bg-white/5 hover:bg-white/10 border border-white/5 text-zinc-400 hover:text-white transition-all disabled:opacity-50 disabled:cursor-not-allowed text-xs"
            >
              <span className="text-blue-400 mr-1">$</span>{cmd}
            </button>
          ))}
          <button 
             onClick={() => {
               setOutput([]);
               setApiHistory([]);
             }}
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

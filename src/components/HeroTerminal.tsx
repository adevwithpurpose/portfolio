"use client";

import { useState, useRef, useEffect } from "react";

type OutputLine = {
  id: string;
  type: "command" | "output" | "error";
  content: string | React.ReactNode;
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
  ]
};

export default function HeroTerminal() {
  const [output, setOutput] = useState<OutputLine[]>([
    { id: "init1", type: "output", content: "safeer-os v2.4.0 starting..." },
    { id: "init2", type: "output", content: "Type or click a command to begin. (Hint: Try asking 'how much do you charge?')" },
  ]);
  const [isTyping, setIsTyping] = useState(false);
  const [inputVal, setInputVal] = useState("");
  const scrollRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [output, isTyping]);

  const processText = (text: string) => {
    // Process plain english to canned responses
    const aiText = text.toLowerCase();
    if (aiText.includes("cost") || aiText.includes("price") || aiText.includes("rate") || aiText.includes("how much") || aiText.includes("charge")) {
      return ["I don't charge bloated agency fees. Every project is scoped individually based on the value delivered, not hourly billing. Book a call to get a custom breakdown!"];
    }
    if (aiText.includes("contact") || aiText.includes("book") || aiText.includes("call") || aiText.includes("hire") || aiText.includes("email")) {
      return ["You can reach me at safeer@safeer.dev or click the 'Talk with Safeer' button on the left to book a call directly."];
    }
    if (aiText.includes("experience") || aiText.includes("background") || aiText.includes("who are you") || aiText.includes("about")) {
      return ["I'm a Senior Frontend & Automation Engineer with a background in Mechatronics Engineering. I skip the middleman to work directly with business owners."];
    }
    if (aiText.includes("hello") || aiText.includes("hi ") || aiText === "hi") {
      return ["Hello! I'm Safeer's terminal AI. Ask me about his services, stack, or how to hire him."];
    }
    return ["Command not found or I couldn't understand. Try asking about 'services', 'stack', or 'pricing' instead. Or use standard commands like 'whoami'."];
  };

  const runCommand = async (cmd: string) => {
    if (isTyping || !cmd.trim()) return;
    setIsTyping(true);
    setInputVal("");
    
    setOutput(prev => [...prev, { id: Math.random().toString(), type: "command", content: `visitor@safeer-os:~$ ${cmd}` }]);
    
    // Simulate thinking delay
    await new Promise(r => setTimeout(r, 400));
    
    const lines = COMMAND_RESPONSES[cmd.toLowerCase()] || processText(cmd);
    
    for (const line of lines) {
      setOutput(prev => [...prev, { id: Math.random().toString(), type: "output", content: line }]);
      await new Promise(r => setTimeout(r, 150));
    }
    
    setIsTyping(false);
    setTimeout(() => {
      inputRef.current?.focus();
    }, 10);
  };

  return (
    <div className="w-full max-w-lg mx-auto rounded-xl border border-white/10 bg-[#0c0c0e]/95 shadow-2xl backdrop-blur-md overflow-hidden flex flex-col font-mono text-xs sm:text-sm h-[320px] sm:h-[400px]" onClick={() => inputRef.current?.focus()}>
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
          <div key={line.id} className={line.type === "command" ? "text-blue-400 mt-4 mb-2" : ""}>
            {line.content}
          </div>
        ))}
        {isTyping && <div className="text-zinc-500 animate-pulse mt-2">_</div>}
        
        {!isTyping && (
          <form 
             onSubmit={(e) => { e.preventDefault(); runCommand(inputVal); }} 
             className="flex items-center mt-4 text-zinc-500 whitespace-nowrap"
          >
             <span className="text-blue-400">visitor@safeer-os:~$</span>
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
          {["whoami", "stack", "ping", "services"].map(cmd => (
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

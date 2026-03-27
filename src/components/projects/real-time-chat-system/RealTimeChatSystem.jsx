export default function RealTimeChatSystem() {
  return (
    <div className="grid grid-cols-[3rem_1fr] gap-4 items-start group">
      {/* Timeline Year - Sticky to top */}
      <span className="text-xs font-mono text-neutral-400 mt-1">2024</span>

      <div className="flex flex-col gap-4">
        {/* Title */}
        <h3 className="font-medium text-lg group-hover:underline decoration-neutral-400 underline-offset-4 decoration-1 transition-all cursor-pointer w-fit">
          Real-Time Chat System
        </h3>

        {/* Split: Left (GIF) | Right (Stack/Meta) */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          
          {/* Left: Preview GIF */}
          {/* Replace src with your actual GIF */}
          <div className="aspect-video bg-neutral-100 rounded-sm overflow-hidden border border-neutral-100">
            <img src="https://media.giphy.com/media/3o7aD2saalBwwftBIY/giphy.gif"
              className="w-full h-full object-cover grayscale opacity-80 hover:grayscale-0 hover:opacity-100 transition-all duration-500"
            />
          </div>

          {/* Right: Stack & Metadata */}
          <div className="flex flex-col gap-3 text-sm">
            
            <div className="flex flex-col">
              <span className="text-xs text-neutral-400 uppercase tracking-wider mb-1">Tech Stack</span>
              <span className="text-neutral-700">Go (Golang)</span>
              <span className="text-neutral-700">WebSockets</span>
              <span className="text-neutral-700">Redis Pub/Sub</span>
              <span className="text-neutral-700">Docker</span>
            </div>

            <div className="flex flex-col mt-auto">
              <span className="text-xs text-neutral-400 uppercase tracking-wider mb-1">Repository</span>
              <a href="#" className="underline decoration-neutral-300 underline-offset-2 hover:decoration-black transition-all">
                github.com/karan/chat
              </a>
            </div>

          </div>
        </div>

        {/* Bottom: Description */}
        <p className="text-sm text-neutral-500 leading-relaxed max-w-xl">
          Designed a high-throughput messaging architecture handling 10k+ concurrent connections. 
          Implemented custom binary protocols for reduced latency and utilized Redis for 
          ephemeral message persistence and pub/sub room management.
        </p>
      </div>
    </div>
  );
}
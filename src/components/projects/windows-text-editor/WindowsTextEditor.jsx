import preview from "./image.gif";

export default function WindowsTextEditor() {
  return (
    <div className="grid grid-cols-[3rem_1fr] gap-4 items-start group">
      <span className="text-xs font-mono text-neutral-400 mt-1">2026 JAN</span>

      <div className="flex flex-col gap-4">
        <h3 className="font-medium text-lg group-hover:underline decoration-neutral-400 underline-offset-4 decoration-1 transition-all cursor-pointer w-fit">
          Native Windows Text Editor
        </h3>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          <div className="aspect-video bg-neutral-100 rounded-sm overflow-hidden border border-neutral-100 relative">
            <img 
              src={preview} 
              alt="Editor Preview" 
              className="w-full h-full object-cover"
            />
          </div>

          <div className="flex flex-col gap-3 text-sm">
            
            <div className="flex flex-col">
              <span className="text-xs text-neutral-400 uppercase tracking-wider mb-1">Core Tech</span>
              <span className="text-neutral-700">C++17</span>
              <span className="text-neutral-700">Win32 API (No Frameworks)</span>
              <span className="text-neutral-700">Gap Buffer (Data Structure)</span>
              <span className="text-neutral-700">GDI Rendering</span>
            </div>

            <div className="flex flex-col mt-auto">
              <span className="text-xs text-neutral-400 uppercase tracking-wider mb-1">Repository</span>
              <a href="https://github.com/karan-suthar03/textEditor" target="_blank" rel="noopener noreferrer" className="underline decoration-neutral-300 underline-offset-2 hover:decoration-black transition-all">
                github.com/karan-suthar03/textEditor
              </a>
            </div>

          </div>
        </div>

        <p className="text-sm text-neutral-500 leading-relaxed max-w-xl">
          A lightweight desktop editor built from scratch without GUI libraries. 
          Implemented a <strong>Gap Buffer</strong> data structure to ensure O(1) amortized performance for local insertions and deletions. 
          Features a custom rendering engine using GDI to handle raw Windows messages, line tracking, and viewport scrolling.
        </p>
      </div>
    </div>
  );
}
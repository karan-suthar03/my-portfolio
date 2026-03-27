import { useEffect, useState } from "react";
import image from "./image.png";
import image2 from "./image2.png";

export default function CumminsSoOptimizer() {
  const [showSecondPreview, setShowSecondPreview] = useState(false);

  useEffect(() => {
    const timer = setInterval(() => {
      setShowSecondPreview((t)=>!t);
    }, 3000);

    return () => clearInterval(timer);
  }, []);

  return (
    <div className="grid grid-cols-[3rem_1fr] gap-4 items-start group">
      <span className="text-xs font-mono text-neutral-400 mt-1">2026 JAN</span>

      <div className="flex flex-col gap-4">
        <h3 className="font-medium text-lg group-hover:underline decoration-neutral-400 underline-offset-4 decoration-1 transition-all cursor-pointer w-fit">
          Manufacturing SO Optimizer Suite
        </h3>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          <div className="aspect-video bg-neutral-100 rounded-sm overflow-hidden border border-neutral-100 relative">
            <img
              src={showSecondPreview ? image2 : image}
              alt={showSecondPreview ? "SO Optimizer Preview 2" : "SO Optimizer Preview 1"}
              className="w-full h-full object-cover"
            />
          </div>

          <div className="flex flex-col gap-3 text-sm">
            <div className="flex flex-col">
              <span className="text-xs text-neutral-400 uppercase tracking-wider mb-1">Core Tech</span>
              <span className="text-neutral-700">Python + Tkinter Desktop UI</span>
              <span className="text-neutral-700">Pandas + OpenPyXL</span>
              <span className="text-neutral-700">CSV/XLSX Ingestion Pipeline</span>
              <span className="text-neutral-700">PyInstaller EXE Packaging</span>
            </div>

            <div className="flex flex-col mt-auto">
              <span className="text-xs text-neutral-400 uppercase tracking-wider mb-1">Repository</span>
              <span className="text-neutral-500">
                No public GitHub link available. This project is confidential.
              </span>
            </div>
          </div>
        </div>

        <p className="text-sm text-neutral-500 leading-relaxed max-w-xl">
          Delivered this optimized SO analysis desktop app across two manufacturing departments with similar Excel-heavy
          workflows. In both rollouts, file ingestion improved from ~60-120s to ~1-2s and SO search/comparison improved
          from ~20-30s to near-instant (&lt;1s), delivering roughly 30-60x faster analysis and a production-ready Windows EXE
          replacement for manual spreadsheet operations.
        </p>
      </div>
    </div>
  );
}
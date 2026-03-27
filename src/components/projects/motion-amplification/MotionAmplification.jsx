import image from './image.gif';

export default function MotionAmplification() {
  return (
    <div className="grid grid-cols-[3rem_1fr] gap-4 items-start group">
      <span className="text-xs font-mono text-neutral-400 mt-1">2026 FEB</span>

      <div className="flex flex-col gap-4">
        <h3 className="font-medium text-lg group-hover:underline decoration-neutral-400 underline-offset-4 decoration-1 transition-all cursor-pointer w-fit">
          Video Motion Amplification Studio
        </h3>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          <div className="aspect-video bg-neutral-100 rounded-sm overflow-hidden border border-neutral-100 relative">
            <img
              src={image}
              alt="Motion Amplification Preview"
              className="w-full h-full object-cover"
            />
          </div>

          <div className="flex flex-col gap-3 text-sm">
            <div className="flex flex-col">
              <span className="text-xs text-neutral-400 uppercase tracking-wider mb-1">Core Tech</span>
              <span className="text-neutral-700">Python</span>
              <span className="text-neutral-700">PySide6 + PyQtGraph</span>
              <span className="text-neutral-700">NumPy + SciPy (FFT / Bandpass)</span>
              <span className="text-neutral-700">OpenCV</span>
            </div>

            <div className="flex flex-col mt-auto">
              <span className="text-xs text-neutral-400 uppercase tracking-wider mb-1">Repository</span>
              <a
                href="https://github.com/karan-suthar03/motion-amplification"
                target="_blank"
                rel="noopener noreferrer"
                className="underline decoration-neutral-300 underline-offset-2 hover:decoration-black transition-all"
              >
                github.com/karan-suthar03/motion-amplification
              </a>
            </div>
          </div>
        </div>

        <p className="text-sm text-neutral-500 leading-relaxed max-w-xl">
          Built an interactive desktop workflow to magnify subtle motions in videos using Eulerian-style signal processing.
          The tool supports pixel-level exploration, live FFT inspection, tunable frequency-band selection, and a threaded
          render pipeline that exports amplified MP4 output.
        </p>
      </div>
    </div>
  );
}
export default function CppVideoEditor() {
  return (
    <div className="grid grid-cols-[3rem_1fr] gap-4 items-baseline group">
      <span className="text-xs font-mono text-neutral-400">2023</span>
      <div className="flex flex-col gap-1">
        <h3 className="font-medium group-hover:underline decoration-neutral-400 underline-offset-4 decoration-1 transition-all cursor-pointer">
          C++ Video Editor
        </h3>
        <p className="text-sm text-neutral-500 leading-relaxed">
          Native desktop application built with ImGui. Features a custom rendering pipeline and ffmpeg integration.
        </p>
      </div>
    </div>
  );
}

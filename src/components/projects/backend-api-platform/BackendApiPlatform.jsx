export default function BackendApiPlatform() {
  return (
    <div className="grid grid-cols-[3rem_1fr] gap-4 items-baseline group">
      <span className="text-xs font-mono text-neutral-400">2023</span>
      <div className="flex flex-col gap-1">
        <h3 className="font-medium group-hover:underline decoration-neutral-400 underline-offset-4 decoration-1 transition-all cursor-pointer">
          Backend API Platform
        </h3>
        <p className="text-sm text-neutral-500 leading-relaxed">
          Modular RESTful infrastructure with JWT authentication and automated CI/CD pipelines.
        </p>
      </div>
    </div>
  );
}

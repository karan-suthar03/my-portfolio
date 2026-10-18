// The site's one layout primitive: a narrow date column beside the content.
export default function Row({ when, children }) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-[7.5rem_1fr] gap-1 sm:gap-6 items-start">
      <span className="text-xs font-mono text-neutral-400 dark:text-neutral-500 sm:mt-1">{when}</span>
      <div className="flex flex-col gap-3 min-w-0">{children}</div>
    </div>
  );
}

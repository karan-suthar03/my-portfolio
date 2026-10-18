export default function Section({ title, children }) {
  return (
    <section className="flex flex-col gap-8">
      <h2 className="text-xs font-mono uppercase tracking-widest text-neutral-400 dark:text-neutral-500">
        {title}
      </h2>
      {children}
    </section>
  );
}

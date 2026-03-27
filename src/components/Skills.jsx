const skillRows = [
  {
    label: "Languages",
    value: "JavaScript, TypeScript, Go, C++, Python",
  },
  {
    label: "Frontend",
    value: "React, Next.js, TailwindCSS",
  },
  {
    label: "Backend",
    value: "Node.js, PostgreSQL, Redis, WebSockets",
  },
  {
    label: "DevOps",
    value: "Docker, AWS, CI/CD, Linux",
  },
];

export default function Skills() {
  return (
    <section className="flex flex-col gap-3">
      {skillRows.map((row) => (
        <div
          key={row.label}
          className="grid grid-cols-[6rem_1fr] items-baseline"
        >
          <span className="text-sm text-neutral-400">{row.label}</span>
          <span className="text-sm text-neutral-600">{row.value}</span>
        </div>
      ))}
    </section>
  );
}

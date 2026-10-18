import { profile } from "../data.js";

export default function Header() {
  return (
    <header className="flex flex-col gap-6">
      <div className="flex flex-col gap-1">
        <h1 className="text-3xl font-medium tracking-tight">{profile.name}</h1>
        <p className="text-neutral-500 dark:text-neutral-400">
          {profile.role} <span className="text-neutral-300 dark:text-neutral-600">·</span> {profile.location}
        </p>
      </div>
      <p className="text-neutral-600 dark:text-neutral-300 leading-relaxed max-w-xl">{profile.about}</p>
      <nav className="flex gap-5 text-sm">
        {profile.links.map((link) => (
          <a
            key={link.label}
            href={link.href}
            target={link.href.startsWith("http") ? "_blank" : undefined}
            rel="noopener noreferrer"
            className="underline decoration-neutral-300 dark:decoration-neutral-600 underline-offset-4 hover:decoration-current transition-colors"
          >
            {link.label}
          </a>
        ))}
      </nav>
    </header>
  );
}

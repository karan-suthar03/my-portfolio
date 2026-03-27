const links = [
  { label: "Email", href: "mailto:karan@example.com" },
  { label: "GitHub", href: "#" },
  { label: "LinkedIn", href: "#" },
];

export default function Footer() {
  return (
    <footer className="flex gap-6 text-sm text-neutral-500 pt-8 border-t border-neutral-100">
      {links.map((link) => (
        <a
          key={link.label}
          href={link.href}
          className="hover:text-black transition-colors"
        >
          {link.label}
        </a>
      ))}
    </footer>
  );
}

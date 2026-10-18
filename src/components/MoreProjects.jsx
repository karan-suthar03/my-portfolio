import { moreProjects } from "../data.js";
import Row from "./Row.jsx";
import Section from "./Section.jsx";

export default function MoreProjects() {
  return (
    <Section title="More projects">
      <div className="flex flex-col gap-6">
        {moreProjects.map((p) => (
          <Row key={p.title} when={p.when}>
            <div className="flex flex-col gap-1">
              <h3 className="font-medium">
                {p.repo ? (
                  <a
                    href={p.repo}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="underline decoration-neutral-300 dark:decoration-neutral-600 underline-offset-4 hover:decoration-current"
                  >
                    {p.title}
                  </a>
                ) : (
                  p.title
                )}
              </h3>
              <p className="text-sm text-neutral-500 dark:text-neutral-400 leading-relaxed">{p.text}</p>
              <p className="text-xs font-mono text-neutral-400 dark:text-neutral-500">{p.tech}</p>
            </div>
          </Row>
        ))}
      </div>
    </Section>
  );
}

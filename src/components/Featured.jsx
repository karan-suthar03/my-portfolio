import { featured } from "../data.js";
import Row from "./Row.jsx";
import Section from "./Section.jsx";

function Label({ children }) {
  return <span className="text-xs text-neutral-400 dark:text-neutral-500 uppercase tracking-wider mb-1">{children}</span>;
}

function Preview({ project }) {
  if (project.image) {
    return (
      <div
        className={`aspect-video rounded-sm overflow-hidden border border-neutral-100 dark:border-neutral-800 ${
          project.dark ? "bg-neutral-900" : "bg-neutral-100 dark:bg-neutral-900"
        }`}
      >
        {project.video ? (
          <video
            src={project.video}
            poster={project.image}
            aria-label={project.imageAlt}
            autoPlay
            muted
            loop
            playsInline
            preload="none"
            className="w-full h-full object-cover"
          />
        ) : (
          <img src={project.image} alt={project.imageAlt} loading="lazy" decoding="async" className="w-full h-full object-cover" />
        )}
      </div>
    );
  }
  // No screenshot: show the pitch instead of an empty box.
  return (
    <div className="aspect-video rounded-sm border border-neutral-200 dark:border-neutral-800 bg-neutral-50 dark:bg-neutral-900 p-5 flex items-end">
      <p className="text-sm text-neutral-600 dark:text-neutral-400 leading-relaxed">{project.tagline}</p>
    </div>
  );
}

export default function Featured() {
  return (
    <Section title="Selected work">
      {featured.map((project) => (
        <Row key={project.title} when={project.when}>
          <div className="flex flex-col gap-1">
            <h3 className="font-medium text-lg">{project.title}</h3>
            {project.image && <p className="text-sm text-neutral-500 dark:text-neutral-400">{project.tagline}</p>}
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <Preview project={project} />
            <div className="flex flex-col gap-4 text-sm">
              <div className="flex flex-col">
                <Label>Core tech</Label>
                {project.tech.map((t) => (
                  <span key={t} className="text-neutral-700 dark:text-neutral-300">{t}</span>
                ))}
              </div>
              {project.stats && (
                <div className="flex flex-col">
                  <Label>Results</Label>
                  {project.stats.map((s) => (
                    <span key={s} className="text-neutral-700 dark:text-neutral-300">{s}</span>
                  ))}
                </div>
              )}
              {(project.repo || project.demo) && (
                <div className="flex flex-col mt-auto">
                  <Label>Links</Label>
                  {project.demo && (
                    <a
                      href={project.demo}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="underline decoration-neutral-300 dark:decoration-neutral-600 underline-offset-2 hover:decoration-current w-fit"
                    >
                      Live demo
                    </a>
                  )}
                  {project.repo && (
                    <a
                      href={project.repo}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="underline decoration-neutral-300 dark:decoration-neutral-600 underline-offset-2 hover:decoration-current break-all"
                    >
                      {project.repo.replace("https://", "")}
                    </a>
                  )}
                </div>
              )}
            </div>
          </div>

          <p className="text-sm text-neutral-500 dark:text-neutral-400 leading-relaxed max-w-xl">{project.description}</p>
        </Row>
      ))}
    </Section>
  );
}

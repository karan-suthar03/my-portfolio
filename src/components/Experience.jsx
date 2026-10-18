import { experience } from "../data.js";
import Row from "./Row.jsx";
import Section from "./Section.jsx";

export default function Experience() {
  return (
    <Section title="Experience">
      {experience.map((job) => (
        <Row key={job.when + job.title} when={job.when}>
          <div className="flex flex-col gap-1">
            <h3 className="font-medium">
              {job.title} <span className="text-neutral-400 dark:text-neutral-500 font-normal">· {job.org}</span>
            </h3>
            {job.stack && (
              <p className="text-sm text-neutral-500 dark:text-neutral-400 leading-relaxed">{job.stack}</p>
            )}
          </div>
        </Row>
      ))}
    </Section>
  );
}

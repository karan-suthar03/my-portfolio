import { experience } from "../data.js";
import Row from "./Row.jsx";
import Section from "./Section.jsx";

export default function Experience() {
  return (
    <Section title="Experience">
      {experience.map((job) => (
        <Row key={job.when + job.title} when={job.when}>
          <div className="flex flex-col">
            <h3 className="font-medium">
              {job.title} <span className="text-neutral-400 dark:text-neutral-500 font-normal">· {job.org}</span>
            </h3>
            {job.note && <p className="text-xs text-neutral-400 dark:text-neutral-500">{job.note}</p>}
          </div>
          <ul className="flex flex-col gap-1.5 text-sm text-neutral-600 dark:text-neutral-400 leading-relaxed list-disc pl-4 marker:text-neutral-300 dark:marker:text-neutral-600">
            {job.points.map((point) => (
              <li key={point}>{point}</li>
            ))}
          </ul>
        </Row>
      ))}
    </Section>
  );
}

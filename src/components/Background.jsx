import { education, hackathons, skills } from "../data.js";
import Row from "./Row.jsx";
import Section from "./Section.jsx";

export function Hackathons() {
  return (
    <Section title="Hackathons">
      <div className="flex flex-col gap-3">
        {hackathons.map((h) => (
          <Row key={h.name} when={h.role}>
            <p className="text-sm">
              <span className="font-medium">{h.name}</span>{" "}
              <span className="text-neutral-500 dark:text-neutral-400">· {h.result}</span>
            </p>
          </Row>
        ))}
      </div>
    </Section>
  );
}

export function Skills() {
  return (
    <Section title="Skills">
      <div className="flex flex-col gap-3">
        {skills.map((row) => (
          <Row key={row.label} when={row.label}>
            <p className="text-sm text-neutral-600 dark:text-neutral-300">{row.value}</p>
          </Row>
        ))}
      </div>
    </Section>
  );
}

export function Education() {
  return (
    <Section title="Education">
      {education.map((e) => (
        <Row key={e.degree} when={e.when}>
          <div className="flex flex-col">
            <h3 className="font-medium text-sm">{e.degree}</h3>
            <p className="text-sm text-neutral-500 dark:text-neutral-400">{e.school}</p>
          </div>
        </Row>
      ))}
    </Section>
  );
}

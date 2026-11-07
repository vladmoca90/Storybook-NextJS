import { skills } from "../resume-data";

export default function SkillsComponent() {
  return (
    <section
      className="cv-section scroll-mt-7 border-t-[0.0625rem] py-8 print:py-4"
      id="skills"
      aria-labelledby="skills-title"
    >
      <h2 id="skills-title">Skills & tools</h2>
      <div className="cv-skills mt-7 grid grid-cols-2 gap-x-12 gap-y-[1.625rem] [&_p]:mt-[0.375rem]! max-[43.8125rem]:grid-cols-1 max-[43.8125rem]:gap-[1.375rem] print:grid-cols-2! print:gap-x-[1.5625rem]! print:gap-y-3! [&>div]:print:break-inside-avoid">
        {skills.map((skill) => (
          <div key={skill.label}>
            <p className="cv-subtitle">{skill.label}</p>
            <p>{skill.value}</p>
          </div>
        ))}
      </div>
    </section>
  );
}


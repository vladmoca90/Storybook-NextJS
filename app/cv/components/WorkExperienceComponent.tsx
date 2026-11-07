import { experience } from "../resume-data";

export default function WorkExperienceComponent() {
  return (
    <section
      className="cv-experience grid grid-cols-1 gap-[1.5625rem] min-[68.8125rem]:grid-cols-[11rem_1fr] min-[68.8125rem]:gap-4 print:grid-cols-[7.5rem_1fr] print:gap-[1.125rem] cv-section scroll-mt-7 border-t-[0.0625rem] py-8 print:py-4"
      id="experience"
      aria-labelledby="experience-title"
    >
      <div className="cv-section-title max-[68.8125rem]:flex max-[68.8125rem]:items-center max-[68.8125rem]:justify-between [&_p]:mt-2!">
        <h2 id="experience-title">Work experience</h2>
        <p>2016 — 2026</p>
      </div>
      <div className="cv-timeline ml-[0.3125rem] border-l-[0.0625rem] pl-[2.1875rem] max-[43.8125rem]:pl-6 print:pl-[1.125rem]!">
        {experience.map((job) => (
          <article
            className="cv-job relative pb-8 last:pb-0 before:absolute before:top-[0.6875rem] before:-left-10 before:size-[0.5625rem] before:rounded-full before:content-[''] max-[43.8125rem]:before:-left-[1.8125rem] print:break-inside-avoid print:pb-4 print:before:top-[0.4375rem] print:before:-left-[1.4375rem]!"
            key={job.company}
          >
            <div className="cv-job-heading flex flex-wrap items-baseline justify-between gap-4 max-[43.8125rem]:gap-[0.3125rem]">
              <p className="cv-subtitle mb-4!">{job.company}</p>
              <p>{job.dates}</p>
            </div>
            <p className="cv-job-role">{job.role}</p>
            <p className="cv-job-type mt-[0.3125rem]! mb-[0.625rem]!">
              {job.type}
            </p>
            <ul className="m-0 list-disc pl-[1.125rem]">
              {job.bullets.map((bullet) => (
                <li
                  className="mb-[0.375rem] pl-[0.1875rem] print:mb-[0.1875rem]"
                  key={bullet}
                >
                  {bullet}
                </li>
              ))}
            </ul>
          </article>
        ))}
      </div>
    </section>
  );
}

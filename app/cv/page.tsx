import type { Metadata } from "next";
import { PrintButton } from "./print-button";
import { experience, skills } from "./resume-data";
import "./resume.css";

export const metadata: Metadata = {
  title: "Vlad Mocanu | Frontend Engineer",
  description:
    "Vlad Mocanu — frontend engineer specialising in Next.js, React, TypeScript and accessible web experiences. Experience, skills, education and contact details.",
};

function Arrow() {
  return (
    <svg
      width="1.125rem"
      height="1.125rem"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      aria-hidden="true"
    >
      <path d="M5 12h14m-6-6 6 6-6 6" />
    </svg>
  );
}

export default function CVPage() {
  return (
    <div className="cv-shell min-h-screen [&_h1]:m-0 [&_h2]:m-0 [&_h3]:m-0 [&_p]:m-0">
      <a
        className="cv-skip fixed -top-[6.25rem] left-5 z-10 p-3 focus:top-[0.625rem] print:hidden"
        href="#overview"
      >
        Skip to content
      </a>
      <aside className="cv-sidebar fixed inset-y-0 flex w-[15.3125rem] flex-col border-r-[0.0625rem] px-[2.1875rem] py-8 max-[68.8125rem]:w-[12.8125rem] max-[68.8125rem]:px-6 max-[68.8125rem]:py-7 max-[43.8125rem]:static max-[43.8125rem]:grid max-[43.8125rem]:w-auto max-[43.8125rem]:grid-cols-[1fr_auto] max-[43.8125rem]:items-center max-[43.8125rem]:border-r-0 max-[43.8125rem]:border-b-[0.0625rem] max-[43.8125rem]:py-[1.375rem] print:hidden">
        <a
          href="#overview"
          className="cv-monogram"
          aria-label="Vlad Mocanu, overview"
        >
          VM<span>.</span>
        </a>
        <p className="cv-role mt-3! max-[43.8125rem]:m-0!">Frontend Engineer</p>
        <nav
          className="mt-[3.875rem] flex flex-col gap-[1.0625rem] max-[43.8125rem]:col-span-full max-[43.8125rem]:mt-6 max-[43.8125rem]:flex-row max-[43.8125rem]:flex-wrap max-[43.8125rem]:gap-x-[1.125rem] max-[43.8125rem]:gap-y-3 max-[43.8125rem]:pb-[0.3125rem]"
          aria-label="CV sections"
        >
          {["Overview", "Contact", "Education", "Skills", "Experience"].map(
            (label) => (
              <a
                className="border-l-[0.1875rem] pl-4 max-[43.8125rem]:border-0 max-[43.8125rem]:p-0 max-[43.8125rem]:whitespace-nowrap"
                key={label}
                href={`#${label.toLowerCase()}`}
              >
                {label}
              </a>
            ),
          )}
        </nav>
        <div className="cv-social mt-auto grid gap-[0.625rem] [&_a]:flex [&_a]:items-center [&_a]:gap-2 max-[43.8125rem]:hidden">
          <a
            href="https://www.linkedin.com/in/vlad-mocanu-0a280a3a/"
            target="_blank"
            rel="noreferrer"
          >
            LinkedIn <Arrow />
          </a>
          <a
            href="https://github.com/vladmoca90"
            target="_blank"
            rel="noreferrer"
          >
            GitHub <Arrow />
          </a>
        </div>
      </aside>
      <main
        className="cv-main ml-[15.3125rem] max-w-[93.75rem] px-14 pt-[1.625rem] pb-12 min-[100rem]:mr-auto min-[100rem]:px-[4.375rem] max-[68.8125rem]:ml-[12.8125rem] max-[68.8125rem]:px-[2.1875rem] max-[68.8125rem]:py-[1.625rem] max-[43.8125rem]:m-0 max-[43.8125rem]:px-6 max-[43.8125rem]:pt-5 max-[43.8125rem]:pb-10 print:m-0! print:max-w-none print:p-0!"
        id="overview"
      >
        <div className="cv-toolbar flex justify-end max-[43.8125rem]:mb-[1.375rem] print:hidden">
          <PrintButton />
        </div>
        <header className="cv-hero pb-[2.375rem] print:pb-[0.875rem]">
          <h1>
            Vlad Mocanu<span>.</span>
          </h1>
          <p className="cv-tagline mt-[0.375rem]! max-[43.8125rem]:mt-[0.875rem]! max-[43.8125rem]:max-w-[20.625rem]">
            Thoughtful interfaces. Reliable code.
          </p>
          <p className="cv-intro mt-[1.1875rem]! max-w-[56.875rem] max-[43.8125rem]:mt-5! print:mt-[0.625rem]!">
            Frontend engineer building accessible, responsive web experiences
            with Next.js, React and TypeScript.
          </p>
          <div className="cv-actions mt-[1.5625rem] flex items-center gap-10 max-[43.8125rem]:gap-[1.5625rem] print:hidden">
            <a
              className="cv-primary inline-flex items-center gap-[0.9375rem] rounded-[0.3125rem] px-[1.3125rem] py-2"
              href="mailto:vladmoca90@gmail.com"
            >
              Email me <Arrow />
            </a>
            <a className="cv-text-link border-b-[0.0625rem]" href="#experience">
              View experience
            </a>
          </div>
        </header>
        <section
          className="cv-section scroll-mt-7 border-t-[0.0625rem] py-8 print:py-4 cv-contact grid grid-cols-1 gap-[1.5625rem] min-[68.8125rem]:grid-cols-[13.75rem_1fr] min-[68.8125rem]:gap-[2.1875rem] print:grid-cols-[7.5rem_1fr] print:gap-[1.125rem] max-[43.8125rem]:gap-[1.375rem] print:gap-[1.125rem]!"
          id="contact"
          aria-labelledby="contact-title"
        >
          <h2 id="contact-title">Contact details</h2>
          <div>
            <a className="cv-email border-b-[0.0625rem]" href="mailto:vladmoca90@gmail.com">
              vladmoca90@gmail.com
            </a>
            <a
              className="cv-phone my-4 block print:my-2"
              href="tel:+447455404221"
            >
              07455 404221
            </a>
            <p>British citizen · Right to work in the UK</p>
            <p>Living continuously in the UK since 2016</p>
            <div className="cv-contact-social mt-[0.875rem]">
              <a
                href="https://www.linkedin.com/in/vlad-mocanu-0a280a3a/"
                target="_blank"
                rel="noreferrer"
              >
                LinkedIn: linkedin.com/in/vlad-mocanu-0a280a3a/
              </a>
              <br />
              <a
                href="https://github.com/vladmoca90"
                target="_blank"
                rel="noreferrer"
              >
                GitHub: github.com/vladmoca90
              </a>
            </div>
          </div>
        </section>
        <section
          className="cv-section scroll-mt-7 border-t-[0.0625rem] py-8 print:py-4 cv-education grid grid-cols-1 gap-[1.5625rem] min-[68.8125rem]:grid-cols-[13.75rem_1fr] min-[68.8125rem]:gap-[2.1875rem] print:grid-cols-[7.5rem_1fr] print:gap-[1.125rem] [&_article]:print:break-inside-avoid [&_article+article]:mt-5 [&_article+article]:border-t-[0.0625rem] [&_article+article]:pt-5"
          id="education"
          aria-labelledby="education-title"
        >
          <h2 id="education-title">Education</h2>
          <div>
            <article>
              <div className="cv-job-heading flex flex-wrap items-baseline justify-between gap-4 max-[43.8125rem]:gap-[0.3125rem]">
                <h3>Avantaj Consulting</h3>
                <p>2015</p>
              </div>
              <p className="cv-job-role">IT Development School</p>
              <p>HTML, CSS, JavaScript, jQuery · Average mark: 92.5%</p>
            </article>
            <article>
              <div className="cv-job-heading flex flex-wrap items-baseline justify-between gap-4 max-[43.8125rem]:gap-[0.3125rem]">
                <h3>The University of Birmingham</h3>
                <p>2010 — 2013</p>
              </div>
              <p className="cv-job-role">BSc Environmental Science</p>
            </article>
          </div>
        </section>
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
        <section
          className="cv-experience grid grid-cols-1 gap-[1.5625rem] min-[68.8125rem]:grid-cols-[13.75rem_1fr] min-[68.8125rem]:gap-[2.1875rem] print:grid-cols-[7.5rem_1fr] print:gap-[1.125rem] cv-section scroll-mt-7 border-t-[0.0625rem] py-8 print:py-4"
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
                  <h3 className="mb-4!">{job.company}</h3>
                  <p>{job.dates}</p>
                </div>
                <p className="cv-job-role">{job.role}</p>
                <p className="cv-job-type mt-[0.3125rem]! mb-[0.625rem]!">{job.type}</p>
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
      </main>
    </div>
  );
}

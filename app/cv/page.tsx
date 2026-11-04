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
      width="18"
      height="18"
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
        className="cv-skip fixed -top-[100px] left-5 z-10 p-3 focus:top-[10px] print:hidden"
        href="#overview"
      >
        Skip to content
      </a>
      <aside className="cv-sidebar fixed inset-y-0 flex w-[245px] flex-col border-r px-[35px] py-8 max-[1101px]:w-[205px] max-[1101px]:px-6 max-[1101px]:py-7 max-[701px]:static max-[701px]:grid max-[701px]:w-auto max-[701px]:grid-cols-[1fr_auto] max-[701px]:items-center max-[701px]:border-r-0 max-[701px]:border-b max-[701px]:py-[22px] print:hidden">
        <a
          href="#overview"
          className="cv-monogram"
          aria-label="Vlad Mocanu, overview"
        >
          VM<span>.</span>
        </a>
        <p className="cv-role mt-3! max-[701px]:m-0!">Frontend Engineer</p>
        <nav
          className="mt-[62px] flex flex-col gap-[17px] max-[701px]:col-span-full max-[701px]:mt-6 max-[701px]:flex-row max-[701px]:flex-wrap max-[701px]:gap-x-[18px] max-[701px]:gap-y-3 max-[701px]:pb-[5px]"
          aria-label="CV sections"
        >
          {["Overview", "Contact", "Education", "Skills", "Experience"].map(
            (label) => (
              <a
                className="border-l-[3px] pl-4 max-[701px]:border-0 max-[701px]:p-0 max-[701px]:whitespace-nowrap"
                key={label}
                href={`#${label.toLowerCase()}`}
              >
                {label}
              </a>
            ),
          )}
        </nav>
        <div className="cv-social mt-auto grid gap-[10px] [&_a]:flex [&_a]:items-center [&_a]:gap-2 max-[701px]:hidden">
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
        className="cv-main ml-[245px] max-w-[1500px] px-14 pt-[26px] pb-12 min-[1600px]:mr-auto min-[1600px]:px-[70px] max-[1101px]:ml-[205px] max-[1101px]:px-[35px] max-[1101px]:py-[26px] max-[701px]:m-0 max-[701px]:px-6 max-[701px]:pt-5 max-[701px]:pb-10 print:m-0! print:max-w-none print:p-0!"
        id="overview"
      >
        <div className="cv-toolbar flex justify-end max-[701px]:mb-[22px] print:hidden">
          <PrintButton />
        </div>
        <header className="cv-hero pb-[38px] print:pb-[14px]">
          <h1>
            Vlad Mocanu<span>.</span>
          </h1>
          <p className="cv-tagline mt-[6px]! max-[701px]:mt-[14px]! max-[701px]:max-w-[330px]">
            Thoughtful interfaces. Reliable code.
          </p>
          <p className="cv-intro mt-[19px]! max-w-[910px] max-[701px]:mt-5! print:mt-[10px]!">
            Frontend engineer building accessible, responsive web experiences
            with Next.js, React and TypeScript.
          </p>
          <div className="cv-actions mt-[25px] flex items-center gap-10 max-[701px]:gap-[25px] print:hidden">
            <a
              className="cv-primary inline-flex items-center gap-[15px] rounded-[5px] px-[21px] py-2"
              href="mailto:vladmoca90@gmail.com"
            >
              Email me <Arrow />
            </a>
            <a className="cv-text-link border-b" href="#experience">
              View experience
            </a>
          </div>
        </header>
        <section
          className="cv-section scroll-mt-7 border-t py-8 print:py-4 cv-contact grid grid-cols-1 gap-[25px] min-[1101px]:grid-cols-[220px_1fr] min-[1101px]:gap-[35px] print:grid-cols-[120px_1fr] print:gap-[18px] max-[701px]:gap-[22px] print:gap-[18px]!"
          id="contact"
          aria-labelledby="contact-title"
        >
          <h2 id="contact-title">Contact details</h2>
          <div>
            <a className="cv-email border-b" href="mailto:vladmoca90@gmail.com">
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
            <div className="cv-contact-social mt-[14px]">
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
          className="cv-section scroll-mt-7 border-t py-8 print:py-4 cv-education grid grid-cols-1 gap-[25px] min-[1101px]:grid-cols-[220px_1fr] min-[1101px]:gap-[35px] print:grid-cols-[120px_1fr] print:gap-[18px] [&_article]:print:break-inside-avoid [&_article+article]:mt-5 [&_article+article]:border-t [&_article+article]:pt-5"
          id="education"
          aria-labelledby="education-title"
        >
          <h2 id="education-title">Education</h2>
          <div>
            <article>
              <div className="cv-job-heading flex flex-wrap items-baseline justify-between gap-4 max-[701px]:gap-[5px]">
                <h3>Avantaj Consulting</h3>
                <p>2015</p>
              </div>
              <p className="cv-job-role">IT Development School</p>
              <p>HTML, CSS, JavaScript, jQuery · Average mark: 92.5%</p>
            </article>
            <article>
              <div className="cv-job-heading flex flex-wrap items-baseline justify-between gap-4 max-[701px]:gap-[5px]">
                <h3>The University of Birmingham</h3>
                <p>2010 — 2013</p>
              </div>
              <p className="cv-job-role">BSc Environmental Science</p>
            </article>
          </div>
        </section>
        <section
          className="cv-section scroll-mt-7 border-t py-8 print:py-4"
          id="skills"
          aria-labelledby="skills-title"
        >
          <h2 id="skills-title">Skills & tools</h2>
          <div className="cv-skills mt-7 grid grid-cols-2 gap-x-12 gap-y-[26px] [&_p]:mt-[6px]! max-[701px]:grid-cols-1 max-[701px]:gap-[22px] print:grid-cols-2! print:gap-x-[25px]! print:gap-y-3! [&>div]:print:break-inside-avoid">
            {skills.map((skill) => (
              <div key={skill.label}>
                <h3>{skill.label}</h3>
                <p>{skill.value}</p>
              </div>
            ))}
          </div>
        </section>
        <section
          className="cv-experience grid grid-cols-1 gap-[25px] min-[1101px]:grid-cols-[220px_1fr] min-[1101px]:gap-[35px] print:grid-cols-[120px_1fr] print:gap-[18px] cv-section scroll-mt-7 border-t py-8 print:py-4"
          id="experience"
          aria-labelledby="experience-title"
        >
          <div className="cv-section-title max-[1101px]:flex max-[1101px]:items-center max-[1101px]:justify-between [&_p]:mt-2!">
            <h2 id="experience-title">Work experience</h2>
            <p>2016 — 2026</p>
          </div>
          <div className="cv-timeline ml-[5px] border-l pl-[35px] max-[701px]:pl-6 print:pl-[18px]!">
            {experience.map((job) => (
              <article
                className="cv-job relative pb-8 last:pb-0 before:absolute before:top-[11px] before:-left-10 before:size-[9px] before:rounded-full before:content-[''] max-[701px]:before:-left-[29px] print:break-inside-avoid print:pb-4 print:before:top-[7px] print:before:-left-[23px]!"
                key={job.company}
              >
                <div className="cv-job-heading flex flex-wrap items-baseline justify-between gap-4 max-[701px]:gap-[5px]">
                  <h3>{job.company}</h3>
                  <p>{job.dates}</p>
                </div>
                <p className="cv-job-role">{job.role}</p>
                <p className="cv-job-type mt-[5px]! mb-[10px]!">{job.type}</p>
                <ul className="m-0 list-disc pl-[18px]">
                  {job.bullets.map((bullet) => (
                    <li
                      className="mb-[6px] pl-[3px] print:mb-[3px]"
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

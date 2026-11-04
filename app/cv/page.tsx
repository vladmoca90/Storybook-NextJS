import type { Metadata } from "next";
import { PrintButton } from "./print-button";
import { experience, skills } from "./resume-data";
import "./resume.css";

export const metadata: Metadata = {
  title: "Vlad Mocanu | Frontend Engineer",
  description: "Vlad Mocanu — frontend engineer specialising in Next.js, React, TypeScript and accessible web experiences. Experience, skills, education and contact details.",
};

function Arrow() {
  return <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true"><path d="M5 12h14m-6-6 6 6-6 6" /></svg>;
}

export default function CVPage() {
  return <div className="cv-shell">
    <a className="cv-skip" href="#overview">Skip to content</a>
    <aside className="cv-sidebar">
      <a href="#overview" className="cv-monogram" aria-label="Vlad Mocanu, overview">VM<span>.</span></a>
      <p className="cv-role">Frontend Engineer</p>
      <nav aria-label="CV sections">{["Overview", "Experience", "Skills", "Education", "Contact"].map((label) => <a key={label} href={`#${label.toLowerCase()}`}>{label}</a>)}</nav>
      <div className="cv-social"><a href="https://www.linkedin.com/in/vlad-mocanu-0a280a3a/" target="_blank" rel="noreferrer">LinkedIn <Arrow /></a><a href="https://github.com/vladmoca90" target="_blank" rel="noreferrer">GitHub <Arrow /></a></div>
    </aside>
    <main className="cv-main" id="overview">
      <div className="cv-toolbar"><PrintButton /></div>
      <header className="cv-hero">
        <h1>Vlad Mocanu<span>.</span></h1>
        <p className="cv-tagline">Thoughtful interfaces. Reliable code.</p>
        <p className="cv-intro">Frontend engineer building accessible, responsive web experiences with Next.js, React and TypeScript.</p>
        <div className="cv-actions"><a className="cv-primary" href="mailto:vladmoca90@gmail.com">Email me <Arrow /></a><a className="cv-text-link" href="#experience">View experience</a></div>
      </header>
      <section className="cv-experience cv-section" id="experience" aria-labelledby="experience-title">
        <div className="cv-section-title"><h2 id="experience-title">Experience</h2><p>2016 — 2026</p></div>
        <div className="cv-timeline">{experience.map((job) => <article className="cv-job" key={job.company}>
          <div className="cv-job-heading"><h3>{job.company}</h3><p>{job.dates}</p></div>
          <p className="cv-job-role">{job.role}</p><p className="cv-job-type">{job.type}</p>
          <ul>{job.bullets.map((bullet) => <li key={bullet}>{bullet}</li>)}</ul>
        </article>)}</div>
      </section>
      <section className="cv-section" id="skills" aria-labelledby="skills-title"><h2 id="skills-title">Skills & tools</h2><div className="cv-skills">{skills.map((skill) => <div key={skill.label}><h3>{skill.label}</h3><p>{skill.value}</p></div>)}</div></section>
      <section className="cv-section cv-education" id="education" aria-labelledby="education-title"><h2 id="education-title">Education</h2><div><article><div className="cv-job-heading"><h3>Avantaj Consulting</h3><p>2015</p></div><p className="cv-job-role">IT Development School</p><p>HTML, CSS, JavaScript, jQuery · Average mark: 92.5%</p></article><article><div className="cv-job-heading"><h3>The University of Birmingham</h3><p>2010 — 2013</p></div><p className="cv-job-role">BSc Environmental Science</p></article></div></section>
      <footer className="cv-section cv-contact" id="contact"><h2>Contact</h2><div><a className="cv-email" href="mailto:vladmoca90@gmail.com">vladmoca90@gmail.com</a><a className="cv-phone" href="tel:+447455404221">07455 404221</a><p>British citizen · Right to work in the UK</p><p>Living continuously in the UK since 2016</p><div className="cv-print-social">LinkedIn: linkedin.com/in/vlad-mocanu-0a280a3a/<br />GitHub: github.com/vladmoca90</div></div></footer>
    </main>
  </div>;
}

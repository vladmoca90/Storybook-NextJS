export default function EducationComponent() {
  return (
    <section
      className="cv-section scroll-mt-7 border-t-[0.0625rem] py-8 print:py-4 cv-education grid grid-cols-1 gap-[1.5625rem] min-[68.8125rem]:grid-cols-[13.75rem_1fr] min-[68.8125rem]:gap-[2.1875rem] print:grid-cols-[7.5rem_1fr] print:gap-[1.125rem] [&_article]:print:break-inside-avoid [&_article+article]:mt-5 [&_article+article]:border-t-[0.0625rem] [&_article+article]:pt-5"
      id="education"
      aria-labelledby="education-title"
    >
      <h2 id="education-title">Education</h2>
      <div>
        <article>
          <div className="cv-job-heading flex flex-wrap items-baseline justify-between gap-4 max-[43.8125rem]:gap-[0.3125rem]">
            <p className="cv-subtitle">Avantaj Consulting</p>
            <p>2015</p>
          </div>
          <p className="cv-job-role">IT Development School</p>
          <p>HTML, CSS, JavaScript, jQuery · Average mark: 92.5%</p>
        </article>
        <article>
          <div className="cv-job-heading flex flex-wrap items-baseline justify-between gap-4 max-[43.8125rem]:gap-[0.3125rem]">
            <p className="cv-subtitle">The University of Birmingham</p>
            <p>2010 — 2013</p>
          </div>
          <p className="cv-job-role">BSc Environmental Science</p>
        </article>
      </div>
    </section>
  );
}

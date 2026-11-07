export default function ContactDetailsComponents() {
  return (
    <section
      className="cv-section scroll-mt-7 border-t-[0.0625rem] py-8 print:py-4 cv-contact grid grid-cols-1 gap-[1.5625rem] min-[68.8125rem]:grid-cols-[13.75rem_1fr] min-[68.8125rem]:gap-[2.1875rem] print:grid-cols-[7.5rem_1fr] print:gap-[1.125rem] max-[43.8125rem]:gap-[1.375rem] print:gap-[1.125rem]!"
      id="contact"
      aria-labelledby="contact-title"
    >
      <h2 id="contact-title">Contact details</h2>
      <div className="flex flex-col items-start gap-3">
        <a
          className="cv-email border-b-[0.0625rem]"
          href="mailto:vladmoca90@gmail.com"
        >
          vladmoca90@gmail.com
        </a>
        <a className="cv-phone block" href="tel:+447455404221">
          07455 404221
        </a>
        <p>Right to work: British citizen</p>
        <div className="cv-contact-social">
          LinkedIn:{" "}
          <a
            href="https://www.linkedin.com/in/vlad-mocanu-0a280a3a/"
            target="_blank"
            rel="noreferrer"
          >
            linkedin.com/in/vlad-mocanu-0a280a3a/
          </a>
        </div>
        <div className="cv-contact-social">
          GitHub:{" "}
          <a
            href="https://github.com/vladmoca90"
            target="_blank"
            rel="noreferrer"
          >
            github.com/vladmoca90
          </a>
        </div>
      </div>
    </section>
  );
}

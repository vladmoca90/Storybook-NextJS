import { PrintButton } from "./PrintButton";

export default function HeaderComponent() {
  return (
    <>
        <div className="cv-toolbar flex justify-end max-[43.8125rem]:mb-[1.375rem] print:hidden">
          <PrintButton />
        </div>
        <header className="cv-hero pb-[2.375rem] print:pb-[0.875rem]">
          <h1>Vlad Mocanu</h1>
          <p className="cv-intro mt-[1.1875rem]! max-w-[56.875rem] max-[43.8125rem]:mt-5! print:mt-[0.625rem]!">
            Frontend engineer building accessible, responsive web experiences
            with Next.js, React and TypeScript.
          </p>
        </header>
    </>
  );
}


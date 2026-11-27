'use client';
import { apiBaseUrl } from '@/lib/api';
import { withApiData } from '@/lib/api-client';
const cvUrl = `${apiBaseUrl}/api/cv`;
import HeaderComponent from "./components/HeaderComponent";
import ContactDetailsComponents from "./components/ContactDetailsComponents";
import EducationComponent from "./components/EducationComponent";
import SkillsComponent from "./components/SkillsComponent";
import WorkExperienceComponent from "./components/WorkExperienceComponent";
import "./resume.css";



function CVContent() {
  return (
    <div className="cv-shell min-h-screen [&_h1]:m-0 [&_h2]:m-0 [&_h3]:m-0 [&_p]:m-0">
      <a
        className="cv-skip fixed -top-[6.25rem] left-5 z-10 p-3 focus:top-[0.625rem] print:hidden"
        href="#overview"
      >
        Skip to content
      </a>
      <main
        className="cv-main mx-auto w-full max-w-[93.75rem] px-14 pt-[1.625rem] pb-12 min-[100rem]:px-[4.375rem] max-[68.8125rem]:px-[2.1875rem] max-[68.8125rem]:py-[1.625rem] max-[43.8125rem]:px-6 max-[43.8125rem]:pt-5 max-[43.8125rem]:pb-10 print:m-0! print:max-w-none print:p-0!"
        id="overview"
      >
        <HeaderComponent />
        <ContactDetailsComponents />
        <EducationComponent />
        <SkillsComponent />
        <WorkExperienceComponent />
      </main>
    </div>
  );
}

export default withApiData(CVContent, 'cv', cvUrl);

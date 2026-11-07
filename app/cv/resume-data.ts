export type Experience = {
  company: string;
  role: string;
  dates: string;
  type: string;
  bullets: string[];
};

export const experience: Experience[] = [
  {
    company: "rEvolution World",
    role: "Frontend Engineer",
    dates: "September 2024 - February 2026",
    type: "permanent - redundancy",
    bullets: [
      "Independently developed and maintained Next.js, TypeScript and React Testing Library  applications for global brands including Gulf Oil and AWS, from planning through development, testing, optimisation and ongoing monitoring.",
      "Used Storybook to develop and test components, including responsive states and accessibility checks, before integrating them into client applications such as Gulf Oil and AWS.",
      "Collaborated with designers to translate Figma designs into responsive and WCAG-compliant websites and applications.",
      "Used AI-assisted development tools (Cursor, Codex, ChatGPT) for generating code, debugging, testing and wireframing.",
      "Built and maintained WordPress websites, developing custom themes using HTML, CSS, JavaScript and basic PHP, and managing website content.",
      "Created multilingual and responsive websites, applications and email invitations in Cvent for the Komatsu Formula 1 events.",
      "Created technical documentation for other developers on how to use Cvent, Next applications and Wordpress content.",
      "Built workflows in Azure Logic Apps and Power Apps for the HR department to automate employee onboarding, offboarding, email reminders and data transfer.",
    ],
  },

  {
    company: "Prophet Ltd",
    role: "Frontend Engineer",
    dates: "April 2024 - May 2024",
    type: "short-term contract - individual work - remote role",
    bullets: [
      "Sole frontend engineer responsible for building an events website in Next.js and TypeScript.",
      "Planned the website architecture, including component structure, state management (Redux) and deployment on Vercel.",
      "Tested the project using Jest and checked cross-browser and device compatibility.",
      "Monitored the website after deployment and until the end of the event.",
    ],
  },

  {
    company: "Motors.co.uk",
    role: "Frontend Engineer",
    dates: "May 2018 - March 2024",
    type: "permanent - redundancy",
    bullets: [
      "Built and maintained Next.js and TypeScript applications for an automotive online marketplace.",
      "Developed responsive dashboards and statistics charts in CanvasJS for the business to understand vehicle pricing, stock levels, make and model numbers and market trends.",
      "Collaborated with designers to build client websites in the CMS, translating Figma and Photoshop designs into responsive webpages.",
      "Created website designs for clients using Figma and Photoshop, then implemented them as responsive webpages.",
      "Implemented Google Analytics and Google Tag Manager integrations on client websites and worked directly with stakeholders to understand their business requirements.",
      "Integrated third-party finance services, including iVendi, Codeweavers and Evolution Funding on car details pages and applications.",
      "Participated in code reviews and used Jest, Playwright and BrowserStack for testing and project quality.",
    ],
  },

  {
    company: "Ezekia Group",
    role: "Frontend Developer",
    dates: "January 2018 - March 2018",
    type: "contract",
    bullets: [
      "Helped redesign the company’s website within an Agile team of frontend, backend developers and designers.",
      "Developed responsive, mobile-first pages using HTML5, SCSS, Bootstrap, jQuery and integrated API data.",
      "Created JasmineJS tests and verified across multiple devices and browsers.",
    ],
  },

  {
    company: "Waitrose & Partners",
    role: "E-commerce Frontend Developer",
    dates: "March 2017 - October 2017",
    type: "contract",
    bullets: [
      "Built banners, responsive and promotional pages across Waitrose Florist, Cellar, Gifts, Garden and Groceries.",
      "Used Monetate to implement A/B tests, optimise website content and test responsive behaviour on the main Waitrose website.",
      "Collaborated with designers and developers to translate Photoshop designs into mobile-first, accessible and SEO-friendly pages.",
      "Developed and maintained CMS-driven pages and promotional content using HTML5, CSS3, Bootstrap, jQuery and Photoshop.",
      "Adjusted cross-browser compatibility, layout and interaction issues to ensure a consistent customer experience.",
    ],
  },

  {
    company: "Bio-Techne",
    role: "Frontend Developer",
    dates: "December 2016 - January 2017",
    type: "contract",
    bullets: [
      "Independently developed a mobile and tablet application that presents the products of the company.",
      "Developed using HTML, SCSS, Bootstrap and jQuery, from initial requirements through final delivery.",
      "Tested the application on mobile and tablet devices and fixed all responsive layout issues before release.",
    ],
  },
];

export const skills: { label: string; value: string }[] = [
  {
    label: "Frontend engineering",
    value:
      "Next.js, React 18+, TypeScript 5+ (4 years); Redux / Redux Toolkit, Zustand (1+ year); JavaScript, jQuery (9+ years); REST API integration, Storybook.",
  },

  {
    label: "Styling & layout",
    value:
      "HTML, CSS3, SCSS / LESS, responsive CSS, Tailwind CSS, Ant Design, Bootstrap.",
  },

  {
    label: "UI, UX & data visualisation",
    value: "Figma, Photoshop, CanvasJS, D3.js.",
  },

  {
    label: "Testing & quality",
    value:
      "React Testing Library, Playwright, Jest, JasmineJS, BrowserStack, Bruno, Postman.",
  },

  {
    label: "Performance & accessibility",
    value:
      "Performance optimisation and profiling, React DevTools Profiler, WCAG accessibility, WAVE evaluation tool.",
  },

  {
    label: "Build & deployment",
    value: "Node.js (npm), Yarn, Gulp, Babel, Vercel, Webpack, Vite.",
  },

  {
    label: "CMS & cloud platforms",
    value:
      "WordPress (custom themes, basic PHP), Azure Logic Apps, Power Apps, Cvent, Monetate (A/B testing).",
  },

  { label: "Analytics", value: "Google Analytics, Google Tag Manager." },

  {
    label: "Version control & delivery",
    value: "Git, GitHub, Bitbucket, GitKraken, Jira, Monday.com, Salesforce.",
  },

  {
    label: "Ways of working",
    value:
      "Agile (Scrum, Kanban), project ownership, stakeholder collaboration, code reviews, technical documentation.",
  },

  {
    label: "AI-assisted development",
    value: "GitHub Copilot, Cursor, Codex, ChatGPT, Claude, Gemini.",
  },
];

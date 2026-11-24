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
      "Built and maintained React and TypeScript applications for Gulf Oil and AWS, owning the projects from planning and architecture through release and monitoring.",
      "Collaborated with designers to translate Figma designs into responsive, reusable React components documented in Storybook and checked accessibility against WCAG requirements.",
      "Worked with backend developers regarding API request and response structures and integrated APIs into frontend features.",
      "Created single- and multi-step forms in Next and WordPress by implementing validation, clear error messages and retry options for failed submissions. Tested the behavior with Playwright.",
      "Designed, built and maintained responsive WordPress pages using Elementor and custom themes and coordinated content approvals with stakeholders.",
      "Wrote developer documentation for Next.js applications and WordPress, explaining how teammates could use and maintain each platform.",
    ],
  },

  {
    company: "Prophet Ltd",
    role: "Frontend Engineer",
    dates: "April 2024 - May 2024",
    type: "short-term contract - individual work - remote role",
    bullets: [
      "Owned frontend delivery for a client’s events website as the sole frontend engineer, defining the Next.js architecture, implementing responsive layouts with Tailwind CSS and choosing Redux for state management.",
      "Deployed the site on Vercel and monitored it throughout the event.",
      "Tested with Playwright and checked compatibility across browsers and devices.",
    ],
  },

  {
    company: "Motors.co.uk",
    role: "Frontend Engineer",
    dates: "May 2018 - March 2024",
    type: "permanent - redundancy",
    bullets: [
      "Contributed to migrating Motors.co.uk pages from JavaScript-based React to Next.js and TypeScript by updating the styling and testing existing functionality with Jest, Playwright and BrowserStack.",
      "Built vehicle detail pages, showrooms, finance pages and forms for the main Motors.co.uk platform using Next.js and TypeScript.",
      "Built new reusable and responsive templates for the company’s custom CMS, with shared layouts that could be styled to match each client’s branding.",
      "Integrated third-party finance widgets from iVendi, Codeweavers and Evolution Funding into vehicle pages and finance journeys and implemented validation for single- and multi-step forms.",
      "Monitored production websites and provided on-call support for the automotive marketplace.",
      "Built responsive CanvasJS dashboards to help business users analyse vehicle pricing, stock levels and market trends.",
      "Participated in code reviews and helped maintain code quality and cross-browser compatibility.",
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
    ],
  },

  {
    company: "Waitrose & Partners",
    role: "E-commerce Frontend Developer",
    dates: "March 2017 - October 2017",
    type: "contract",
    bullets: [
      "Built, redesigned and maintained responsive, CMS-driven promotional pages across Waitrose’s online stores using HTML, CSS, Bootstrap and jQuery.",
      "Collaborated with designers and developers to translate Photoshop designs into mobile-first, accessible and SEO-friendly pages.",
    ],
  },

  {
    company: "Bio-Techne",
    role: "Frontend Developer",
    dates: "December 2016 - January 2017",
    type: "contract",
    bullets: [
      "Independently developed and tested a mobile and tablet product catalogue using HTML, SCSS, Bootstrap and jQuery, taking it from initial requirements through testing and delivery.",
    ],
  },
];

export const skills: { label: string; value: string }[] = [
  {
    label: "Frontend",
    value:
      "React, Next.js and TypeScript; Redux, JavaScript, jQuery, REST API integration, Storybook",
  },

  {
    label: "Styling & Design",
    value:
      "HTML5, CSS3, responsive design, SCSS, Tailwind CSS, Bootstrap, Figma, Photoshop",
  },

  {
    label: "Testing tools",
    value: "Playwright, Jest, BrowserStack",
  },

  {
    label: "Performance & Accessibility",
    value: "React DevTools Profiler, WCAG, WAVE",
  },

  {
    label: "Data visualisation",
    value: "CanvasJS",
  },

  {
    label: "Content Management Systems",
    value: "WordPress, Elementor, custom themes, custom CMS platforms",
  },

  {
    label: "Version Control & Collaboration",
    value:
      "Git, Jira, Agile/Scrum/Kanban, code reviews, stakeholder collaboration and technical documentation",
  },

  {
    label: "AI-assisted tools",
    value: "GitHub Copilot, Codex, ChatGPT, Claude",
  },
];

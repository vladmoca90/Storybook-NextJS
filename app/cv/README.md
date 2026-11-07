# Vlad Mocanu CV

Next.js App Router + TypeScript CV, available at `/cv`.

Run `npm run dev` from `miniprojects`, then open http://localhost:3000/cv.
Edit career history and skills in `resume-data.ts`, the introduction in `components/HeaderComponent.tsx`, and the scoped design in `resume.css`. Section markup lives in `components/HeaderComponent.tsx`, `components/ContactDetailsComponents.tsx`, `components/EducationComponent.tsx`, `components/SkillsComponent.tsx`, and `components/WorkExperienceComponent.tsx`. Skills and work experience import their data directly from `resume-data.ts`.

Print CV opens the browser print dialog; select Save as PDF to export. Print styles include the full career history, contact details and social profile URLs. No external services or credentials are required.

The page is rendered on the server; only the print button needs client-side JavaScript. All six positions are preserved from the supplied CV. The generated concept is a visual reference only; original CV facts take precedence over its sample copy.

Layout, responsive breakpoints, borders, radius and spacing use Tailwind utilities in the TSX files. Backgrounds, colours, typography and interaction appearance stay in resume.css. The print page size and physical page margin remain in CSS because they use the @page rule.

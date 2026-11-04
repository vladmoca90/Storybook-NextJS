# Vlad Mocanu CV

Next.js App Router + TypeScript CV, available at `/cv`.

Run `npm run dev` from `miniprojects`, then open http://localhost:3000/cv.
Edit career history and skills in `resume-data.ts`, profile and education in `page.tsx`, and the scoped design in `resume.css`.

Print CV opens the browser print dialog; select Save as PDF to export. Print styles include the full career history, contact details and social profile URLs. No external services or credentials are required.

The page is rendered on the server; only the print button needs client-side JavaScript. All six positions are preserved from the supplied CV. The generated concept is a visual reference only; original CV facts take precedence over its sample copy.

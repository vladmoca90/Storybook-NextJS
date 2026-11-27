import type { Metadata } from 'next';
import CVContent from './CVContent';
export const metadata: Metadata = {
  title: "Vlad Mocanu | Frontend Engineer",
  description:
    "Vlad Mocanu — frontend engineer specialising in Next.js, React, TypeScript and accessible web experiences. Experience, skills, education and contact details.",
};
export default function CVPage() { return <CVContent />; }

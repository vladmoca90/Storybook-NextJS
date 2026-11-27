import type { Metadata } from 'next';
import PharmacyContent from './PharmacyContent';
export const metadata: Metadata = {
  title: "Reading pharmacies | Local pharmacy map",
  description:
    "Explore mapped pharmacies in Reading, Berkshire, and the surrounding area. Search by name, street or postcode and get directions.",
};
export default function ReadingPharmaciesPage() { return <PharmacyContent />; }

'use client';
import { apiBaseUrl } from '@/lib/api';
import { useApiData, withApiData } from '@/lib/api-client';
const pharmaciesUrl = `${apiBaseUrl}/api/reading-pharmacies`;
import PharmacyFinder from "./components/PharmacyFinder";




function PharmacyContent() {
  const snapshot = useApiData('reading-pharmacies');
  const updatedAt = new Intl.DateTimeFormat("en-GB", {
    day: "numeric",
    month: "short",
    year: "numeric",
    timeZone: "UTC",
  }).format(new Date(snapshot.updatedAt));
  return (
    <PharmacyFinder pharmacies={snapshot.pharmacies} updatedAt={updatedAt} />
  );
}

export default withApiData(PharmacyContent, 'reading-pharmacies', pharmaciesUrl);

import type { Metadata } from "next";
import PharmacyFinder from "./components/PharmacyFinder";
import snapshot from "./pharmacies.json";

export const metadata: Metadata = {
  title: "Reading pharmacies | Local pharmacy map",
  description: "Explore mapped pharmacies in Reading, Berkshire, and the surrounding area. Search by name, street or postcode and get directions.",
};

export default function ReadingPharmaciesPage() {
  const updatedAt = new Intl.DateTimeFormat("en-GB", { day: "numeric", month: "short", year: "numeric", timeZone: "UTC" }).format(new Date(snapshot.updatedAt));
  return <PharmacyFinder pharmacies={snapshot.pharmacies} updatedAt={updatedAt} />;
}

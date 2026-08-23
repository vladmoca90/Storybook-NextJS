import type { Metadata } from "next";
import OlympicsPage from "./components/OlympicsPage";

export const metadata: Metadata = {
  title: "2016 Summer Olympics Medal Count",
  description:
    "A D3.js visualization of the top five medal-winning countries.",
};

export default function HomePage() {
  return <OlympicsPage />;
}
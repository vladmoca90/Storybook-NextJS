import type { Metadata } from "next";
import DeparturesBoard from "./DeparturesBoard";

export const metadata: Metadata = { title: "Departures | London Air", description: "Explore ten international airlines on an interactive sample airport departures board." };
export default function Page() { return <DeparturesBoard />; }

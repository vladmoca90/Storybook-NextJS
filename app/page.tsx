import type { Metadata } from "next";
import QuickList from "./quick-list/QuickList";

export const metadata: Metadata = {
  title: "Quick List",
  description: "A simple, friendly list for everything on your mind.",
};

export default function HomePage() {
  return <QuickList />;
}

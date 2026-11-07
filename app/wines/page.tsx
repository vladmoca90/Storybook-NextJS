import type { Metadata } from "next";
import { existsSync } from "node:fs";
import path from "node:path";
import { allWines } from "../data/wines";
import WineShop from "./WineShop";

export const metadata: Metadata = {
  title: "The Wine Edit — Wine Collection",
  description: "Explore seven wines, filter your favourites, and build your wine bag.",
};

export default function WinesPage() {
  const availableImages = allWines.filter((wine) =>
    existsSync(path.join(process.cwd(), "public", "wines", wine.img)),
  ).map((wine) => wine.img);
  return <WineShop availableImages={availableImages} />;
}

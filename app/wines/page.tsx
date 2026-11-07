import type { Metadata } from "next";
import WineShop from "./WineShop";

export const metadata: Metadata = {
  title: "The Wine Edit — Wine Collection",
  description: "Explore seven wines, filter your favourites, and build your wine bag.",
};

export default function WinesPage() {
  return <WineShop />;
}

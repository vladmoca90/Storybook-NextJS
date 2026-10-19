import type { Metadata } from "next";
import DiscountShop from "./DiscountShop";

export const metadata: Metadata = {
  title: "Markdown — Curated Deals",
  description: "A curated collection of beautiful products at better prices.",
};

export default function DiscountsPage() {
  return <DiscountShop />;
}

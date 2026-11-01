import type { ReactNode } from "react";

export type ProductCategory = "Clothing" | "Costumes" | "Accessories";
export type GothicCategory = "All" | ProductCategory;

export type Product = {
  id: number;
  name: string;
  price: number;
  category: ProductCategory;
  description: string;
  sizes: string[];
};

export type GothicSlide = {
  title: ReactNode;
  description: ReactNode;
  image: string;
  cta: string;
  filter: GothicCategory;
  className: string;
};

export type BagItem = {
  product: Product;
  size: string;
  quantity: number;
};

export type ProductImageProps = {
  product: Product;
  className?: string;
};

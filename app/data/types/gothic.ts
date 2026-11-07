import type { ReactNode, RefObject } from "react";

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

export type ShopHeaderProps = {
  browse: (filter: GothicCategory) => void;
  searchOpen: boolean;
  count: number;
  onToggleSearch: () => void;
  openBag: () => void;
};
export type SearchBarProps = {
  query: string;
  onQueryChange: (query: string) => void;
  onClose: () => void;
};
export type HeroCarouselProps = {
  browse: (filter: GothicCategory) => void;
};
export type ProductCardProps = {
  product: Product;
  openProduct: (product: Product) => void;
};
export type ProductCollectionProps = {
  visible: Product[];
  category: GothicCategory;
  onCategoryChange: (category: GothicCategory) => void;
  openProduct: (product: Product) => void;
  onReset: () => void;
};
export type ProductDetailsProps = {
  selected: Product;
  size: string;
  setSize: (size: string) => void;
  addToBag: () => void;
};
export type ShoppingBagProps = {
  bag: BagItem[];
  count: number;
  changeQuantity: (index: number, amount: number) => void;
  onContinue: () => void;
};
export type ShopDialogProps = {
  dialog: RefObject<HTMLDialogElement | null>;
  label: string;
  children: ReactNode;
};

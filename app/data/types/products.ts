export type ProductCategory =
  | "Audio"
  | "Home"
  | "Kitchen"
  | "Lifestyle"
  | "Travel";

export type ProductArtwork =
  | "headphones"
  | "lamp"
  | "camera"
  | "sneakers"
  | "watch"
  | "kettle"
  | "backpack"
  | "speaker"
  | "chair"
  | "bottle";

export type Product = {
  id: number;
  name: string;
  category: ProductCategory;
  price: number;
  discount: number;
  image: ProductArtwork;
  accent: string;
};

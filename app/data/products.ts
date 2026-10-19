import type { Product } from "./types/products";

export const products: Product[] = [
  { id: 1, name: "Cloud Headphones", category: "Audio", price: 189, discount: 25, image: "headphones", accent: "#ec5b3c" },
  { id: 2, name: "Halo Table Lamp", category: "Home", price: 96, discount: 15, image: "lamp", accent: "#f1a23b" },
  { id: 3, name: "Pocket Camera", category: "Lifestyle", price: 349, discount: 30, image: "camera", accent: "#3c7d7a" },
  { id: 4, name: "Drift Sneakers", category: "Lifestyle", price: 128, discount: 20, image: "sneakers", accent: "#4564a7" },
  { id: 5, name: "Daylight Watch", category: "Lifestyle", price: 220, discount: 35, image: "watch", accent: "#8f6baa" },
  { id: 6, name: "Pour-Over Kettle", category: "Kitchen", price: 84, discount: 10, image: "kettle", accent: "#d47252" },
  { id: 7, name: "Weekender Pack", category: "Travel", price: 145, discount: 22, image: "backpack", accent: "#597b57" },
  { id: 8, name: "Pebble Speaker", category: "Audio", price: 119, discount: 18, image: "speaker", accent: "#ba5a7b" },
  { id: 9, name: "Curve Lounge Chair", category: "Home", price: 420, discount: 28, image: "chair", accent: "#ba733e" },
  { id: 10, name: "Trail Bottle", category: "Travel", price: 42, discount: 12, image: "bottle", accent: "#268b94" },
];

export const calculateDiscountAmount = (price: number, discount: number) =>
  price * (discount / 100);

export const calculateSalePrice = (price: number, discount: number) =>
  price - calculateDiscountAmount(price, discount);

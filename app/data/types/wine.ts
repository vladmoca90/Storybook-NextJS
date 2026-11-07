import type { WineCategory } from "./wineCategory";

export interface Wine {
  name: string;
  img: string;
  category: WineCategory;
}

export type WineBag = Record<string, number>;

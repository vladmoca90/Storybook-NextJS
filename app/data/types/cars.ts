export type Car = {
  id: number;
  slug: string;
  make: string;
  model: string;
  trim: string;
  year: number;
  price: number;
  mileage: number;
  fuel: 'Petrol' | 'Diesel' | 'Hybrid' | 'Electric';
  transmission: 'Manual' | 'Automatic';
  body: 'Hatchback' | 'Saloon' | 'SUV' | 'Coupe' | 'Estate';
  colour: string;
  location: string;
  image: string;
  features: string[];
  description: string;
  dealerNote: string;
};

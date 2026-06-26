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

export const cars: Car[] = [
  {
    id: 1,
    slug: 'audi-a3-sportback-s-line',
    make: 'Audi',
    model: 'A3 Sportback',
    trim: 'S line 35 TFSI',
    year: 2021,
    price: 18995,
    mileage: 24100,
    fuel: 'Petrol',
    transmission: 'Automatic',
    body: 'Hatchback',
    colour: 'Daytona Grey',
    location: 'Birmingham',
    image:
      'https://images.unsplash.com/photo-1616422285623-13ff0162193c?auto=format&fit=crop&w=1200&q=80',
    features: ['Virtual cockpit', 'Heated seats', 'Rear camera', 'Apple CarPlay'],
    description:
      'A sharp premium hatchback with a refined cabin, strong motorway manners, and the S line styling package.',
    dealerNote: 'Prepared with a fresh service, MOT, and 12-month warranty option.',
  },
  {
    id: 2,
    slug: 'bmw-3-series-m-sport',
    make: 'BMW',
    model: '3 Series',
    trim: '320i M Sport',
    year: 2020,
    price: 20950,
    mileage: 31800,
    fuel: 'Petrol',
    transmission: 'Automatic',
    body: 'Saloon',
    colour: 'Mineral White',
    location: 'Manchester',
    image:
      'https://images.unsplash.com/photo-1555215695-3004980ad54e?auto=format&fit=crop&w=1200&q=80',
    features: ['M Sport package', 'Navigation', 'Parking sensors', 'Cruise control'],
    description:
      'A composed sport saloon with responsive handling, supportive seats, and a smooth automatic gearbox.',
    dealerNote: 'Two keys, verified mileage, and full digital service history included.',
  },
  {
    id: 3,
    slug: 'mercedes-benz-c-class-amg-line',
    make: 'Mercedes-Benz',
    model: 'C-Class',
    trim: 'C220d AMG Line',
    year: 2019,
    price: 19750,
    mileage: 42600,
    fuel: 'Diesel',
    transmission: 'Automatic',
    body: 'Saloon',
    colour: 'Obsidian Black',
    location: 'Leeds',
    image:
      'https://images.unsplash.com/photo-1616788494707-ec28f08d05a1?auto=format&fit=crop&w=1200&q=80',
    features: ['AMG styling', 'Leather interior', 'Ambient lighting', 'DAB radio'],
    description:
      'An efficient executive saloon with a quiet diesel engine, comfortable ride, and premium interior finish.',
    dealerNote: 'Finance examples available and part exchange welcome.',
  },
  {
    id: 4,
    slug: 'volkswagen-golf-r-line',
    make: 'Volkswagen',
    model: 'Golf',
    trim: 'R-Line eTSI',
    year: 2022,
    price: 21995,
    mileage: 15800,
    fuel: 'Hybrid',
    transmission: 'Automatic',
    body: 'Hatchback',
    colour: 'Moonstone Grey',
    location: 'London',
    image:
      'https://images.unsplash.com/photo-1542282088-fe8426682b8f?auto=format&fit=crop&w=1200&q=80',
    features: ['Digital cockpit', 'Adaptive cruise', 'Lane assist', 'Wireless charging'],
    description:
      'A modern Golf with mild-hybrid efficiency, crisp cabin technology, and everyday usability.',
    dealerNote: 'Low-mileage example with manufacturer warranty remaining.',
  },
  {
    id: 5,
    slug: 'tesla-model-3-long-range',
    make: 'Tesla',
    model: 'Model 3',
    trim: 'Long Range AWD',
    year: 2021,
    price: 25900,
    mileage: 35200,
    fuel: 'Electric',
    transmission: 'Automatic',
    body: 'Saloon',
    colour: 'Pearl White',
    location: 'Bristol',
    image:
      'https://images.unsplash.com/photo-1560958089-b8a1929cea89?auto=format&fit=crop&w=1200&q=80',
    features: ['Dual motor', 'Glass roof', 'Heated seats', 'Autopilot hardware'],
    description:
      'A quick electric saloon with strong real-world range, minimalist cabin design, and excellent running costs.',
    dealerNote: 'Battery health checked and charging cables supplied.',
  },
  {
    id: 6,
    slug: 'ford-puma-st-line',
    make: 'Ford',
    model: 'Puma',
    trim: 'ST-Line X',
    year: 2021,
    price: 15995,
    mileage: 27900,
    fuel: 'Hybrid',
    transmission: 'Manual',
    body: 'SUV',
    colour: 'Desert Island Blue',
    location: 'Cardiff',
    image:
      'https://images.unsplash.com/photo-1494905998402-395d579af36f?auto=format&fit=crop&w=1200&q=80',
    features: ['B&O audio', 'Heated windscreen', 'Megabox boot', 'Sports seats'],
    description:
      'A compact SUV with agile steering, clever boot storage, and efficient mild-hybrid assistance.',
    dealerNote: 'Recently serviced and supplied with a full vehicle inspection.',
  },
  {
    id: 7,
    slug: 'range-rover-evoque-r-dynamic',
    make: 'Land Rover',
    model: 'Range Rover Evoque',
    trim: 'R-Dynamic SE',
    year: 2020,
    price: 28450,
    mileage: 38800,
    fuel: 'Diesel',
    transmission: 'Automatic',
    body: 'SUV',
    colour: 'Firenze Red',
    location: 'Nottingham',
    image:
      'https://images.unsplash.com/photo-1533473359331-0135ef1b58bf?auto=format&fit=crop&w=1200&q=80',
    features: ['Meridian audio', 'Panoramic roof', '360 camera', 'Terrain response'],
    description:
      'A stylish premium SUV with confident road presence, quality materials, and all-weather capability.',
    dealerNote: 'Includes recent tyres, clean history report, and tailored finance options.',
  },
  {
    id: 8,
    slug: 'mini-cooper-s-classic',
    make: 'MINI',
    model: 'Hatch',
    trim: 'Cooper S Classic',
    year: 2019,
    price: 13995,
    mileage: 29750,
    fuel: 'Petrol',
    transmission: 'Manual',
    body: 'Hatchback',
    colour: 'Chili Red',
    location: 'Oxford',
    image:
      'https://images.unsplash.com/photo-1503736334956-4c8f8e92946d?auto=format&fit=crop&w=1200&q=80',
    features: ['Sport mode', 'LED lights', 'Bluetooth', 'Dual-zone climate'],
    description:
      'A characterful hot hatch with lively performance, compact dimensions, and classic MINI design cues.',
    dealerNote: 'Carefully prepared and available for same-day test drive.',
  },
  {
    id: 9,
    slug: 'nissan-qashqai-tekna',
    make: 'Nissan',
    model: 'Qashqai',
    trim: 'Tekna',
    year: 2020,
    price: 16495,
    mileage: 33400,
    fuel: 'Petrol',
    transmission: 'Manual',
    body: 'SUV',
    colour: 'Gun Metallic',
    location: 'Glasgow',
    image:
      'https://images.unsplash.com/photo-1549317661-bd32c8ce0db2?auto=format&fit=crop&w=1200&q=80',
    features: ['Panoramic roof', 'Around-view monitor', 'Keyless entry', 'Blind spot alert'],
    description:
      'A practical family SUV with a high equipment level, comfortable cabin, and sensible ownership costs.',
    dealerNote: 'HPI clear with nationwide delivery available.',
  },
  {
    id: 10,
    slug: 'porsche-718-cayman',
    make: 'Porsche',
    model: '718 Cayman',
    trim: 'PDK',
    year: 2018,
    price: 37995,
    mileage: 22100,
    fuel: 'Petrol',
    transmission: 'Automatic',
    body: 'Coupe',
    colour: 'Racing Yellow',
    location: 'Cambridge',
    image:
      'https://images.unsplash.com/photo-1503376780353-7e6692767b70?auto=format&fit=crop&w=1200&q=80',
    features: ['PDK gearbox', 'Sports exhaust', 'PCM navigation', '20 inch alloys'],
    description:
      'A mid-engined coupe with precise handling, strong performance, and a driver-focused cockpit.',
    dealerNote: 'Specialist inspection completed with Porsche service records.',
  },
];

export const formatPrice = (price: number) =>
  new Intl.NumberFormat('en-GB', {
    style: 'currency',
    currency: 'GBP',
    maximumFractionDigits: 0,
  }).format(price);

export const formatMileage = (mileage: number) =>
  new Intl.NumberFormat('en-GB').format(mileage);

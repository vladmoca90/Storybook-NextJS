import type { Airline } from '@/app/data/types/airlines';
import type { Car } from '@/app/data/types/cars';
import type { Country } from '@/app/data/types/countries';
import type { Currency } from '@/app/data/types/currencies';
import type { Product as GothicProduct, GothicSlide, GothicCategory } from '@/app/data/types/gothic';
import type { CountryMedals, MedalType } from '@/app/data/types/medals';
import type { Person } from '@/app/data/types/people';
import type { Person as DashboardPerson } from '@/app/data/types/dashboard-person';
import type { Product } from '@/app/data/types/products';
import type { Wine } from '@/app/data/types/wine';
import type { ListItem } from '@/app/data/types/quick-list';
import type { Experience } from '@/app/cv/resume-data';
import type { Pharmacy } from '@/app/reading-pharmacies/types';

export interface ApiData {
  airlines: Airline[];
  cars: Car[];
  countries: Country[];
  currencies: Currency[];
  people: Person[];
  dashboard: DashboardPerson[];
  products: Product[];
  wines: Wine[];
  gothic: { products: GothicProduct[]; slides: GothicSlide[]; categories: GothicCategory[] };
  medals: { data: CountryMedals[]; medalTypes: MedalType[]; colors: Record<MedalType, string> };
  cv: { experience: Experience[]; skills: { label: string; value: string }[] };
  'reading-pharmacies': { updatedAt: string; pharmacies: Pharmacy[] };
  'quick-list': ListItem[];
}

export type ApiResponse<T> = {
  body: T;
  path: string;
  query: string;
  cookies: { name: string; value: string }[];
};

// Local URLs are http://localhost:3000/api/<name>. Browser requests follow
// the current origin so deployed sites and alternate development ports work.
export const apiBaseUrl = process.env.NEXT_PUBLIC_API_BASE_URL?.replace(/\/$/, '') ??
  (typeof window === 'undefined' ? 'http://localhost:3000' : window.location.origin);

type Check = (value: unknown) => boolean;
const string: Check = value => typeof value === 'string';
const number: Check = value => typeof value === 'number' && Number.isFinite(value);
const boolean: Check = value => typeof value === 'boolean';
const oneOf = (...values: string[]): Check => value => typeof value === 'string' && values.includes(value);
const array = (check: Check): Check => value => Array.isArray(value) && value.every(check);
const object = (fields: Record<string, Check>): Check => value =>
  typeof value === 'object' && value !== null && !Array.isArray(value) &&
  Object.entries(fields).every(([key, check]) => check((value as Record<string, unknown>)[key]));
const strings = (names: string) => Object.fromEntries(names.split(' ').map(name => [name, string]));
const numbers = (names: string) => Object.fromEntries(names.split(' ').map(name => [name, number]));
const category = oneOf('All', 'Clothing', 'Costumes', 'Accessories');
const medal = oneOf('Gold', 'Silver', 'Bronze');

export const validators: Record<keyof ApiData, Check> = {
  airlines: array(object({ ...strings('airline country flag code flight time destination airport terminal gate color'), status: oneOf('Boarding', 'Gate open', 'On time', 'Delayed') })),
  cars: array(object({ ...strings('slug make model trim colour location image description dealerNote'), ...numbers('id year price mileage'), fuel: oneOf('Petrol', 'Diesel', 'Hybrid', 'Electric'), transmission: oneOf('Manual', 'Automatic'), body: oneOf('Hatchback', 'Saloon', 'SUV', 'Coupe', 'Estate'), features: array(string) })),
  countries: array(object({ ...strings('name code flag capital'), population: number })),
  currencies: array(object({ ...strings('symbol name countryOfOrigin'), ...numbers('marketShare valueInUSD') })),
  people: array(object({ ...strings('id firstName lastName nationality'), age: number })),
  dashboard: array(object({ ...strings('name job nationality'), ...numbers('id age'), maritalStatus: oneOf('single', 'married', 'divorced', 'widowed') })),
  products: array(object({ ...strings('name accent'), ...numbers('id price discount'), category: oneOf('Audio', 'Home', 'Kitchen', 'Lifestyle', 'Travel'), image: oneOf('headphones', 'lamp', 'camera', 'sneakers', 'watch', 'kettle', 'backpack', 'speaker', 'chair', 'bottle') })),
  wines: array(object({ ...strings('name img'), category: oneOf('Red', 'White', 'Green') })),
  gothic: object({ products: array(object({ ...strings('name description'), ...numbers('id price'), category: oneOf('Clothing', 'Costumes', 'Accessories'), sizes: array(string) })), slides: value => Array.isArray(value) && value.length > 0 && array(object({ ...strings('title description image cta className'), filter: category }))(value), categories: array(category) }),
  medals: object({ data: array(object({ country: string, ...numbers('Gold Silver Bronze') })), medalTypes: array(medal), colors: object(strings('Gold Silver Bronze')) }),
  cv: object({ experience: array(object({ ...strings('company role dates type'), bullets: array(string) })), skills: array(object(strings('label value'))) }),
  'reading-pharmacies': object({ updatedAt: value => typeof value === 'string' && Number.isFinite(Date.parse(value)), pharmacies: array(object({ ...strings('id name address postcode phone openingHours sourceUrl'), ...numbers('latitude longitude distance') })) }),
  'quick-list': array(object({ id: number, label: string, completed: boolean })),
};

export function parseApiResponse<K extends keyof ApiData>(key: K, value: unknown): ApiData[K] {
  if (!object({ body: validators[key], path: string, query: string, cookies: array(object(strings('name value'))) })(value)) {
    throw new Error(`Invalid ${key} API response`);
  }
  return (value as ApiResponse<ApiData[K]>).body;
}

export async function fetchApiData<K extends keyof ApiData>(key: K, url: string, signal?: AbortSignal): Promise<ApiData[K]> {
  const response = await fetch(url, { signal, cache: 'no-store' });
  if (!response.ok) throw new Error(`Unable to load ${key} (${response.status})`);
  const payload: unknown = await response.json();
  return parseApiResponse(key, payload);
}

import { airlines } from '@/app/data/airlines';
import { cars } from '@/app/data/cars';
import { countries } from '@/app/data/countries';
import { Currencies } from '@/app/data/currencies';
import { people } from '@/app/data/people';
import { peopleData } from '@/app/data/dashboard';
import { products } from '@/app/data/products';
import { allWines } from '@/app/data/wines';
import { products as gothicProducts, slides, categories } from '@/app/data/gothic';
import { data, colors, medalTypes } from '@/app/data/medals';
import { experience, skills } from '@/app/cv/resume-data';
import snapshot from '@/app/reading-pharmacies/pharmacies.json';
import { items } from '@/app/data/quick-list';
import type { ApiData } from '@/lib/api';

// Only tests and Storybook import fixtures. Production components fetch routes.
export const apiFixtures: ApiData = {
  airlines, cars, countries, currencies: Currencies, people, dashboard: peopleData,
  products, wines: allWines, gothic: { products: gothicProducts, slides, categories },
  medals: { data, colors, medalTypes: [...medalTypes] }, cv: { experience, skills },
  'reading-pharmacies': snapshot, 'quick-list': items,
};

export function fixtureResponse(key: keyof ApiData) {
  return { body: apiFixtures[key], path: `/api/${key}`, query: '', cookies: [] };
}

export const fixtureFetch: typeof fetch = async (input) => {
  const url = new URL(typeof input === 'string' ? input : input instanceof URL ? input.href : input.url, 'http://localhost:3000');
  const key = url.pathname.replace('/api/', '') as keyof ApiData;
  if (!Object.hasOwn(apiFixtures, key)) throw new Error(`Unexpected API request: ${url.pathname}`);
  return {
    ok: true, status: 200,
    json: async () => JSON.parse(JSON.stringify({ ...fixtureResponse(key), query: url.search })),
  } as Response;
};

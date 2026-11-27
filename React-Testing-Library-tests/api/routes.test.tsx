/** @jest-environment node */
import { NextRequest } from 'next/server';
import { parseApiResponse, type ApiData } from '@/lib/api';
import { GET as get0 } from '@/app/api/airlines/route';
import { GET as get1 } from '@/app/api/cars/route';
import { GET as get2 } from '@/app/api/countries/route';
import { GET as get3 } from '@/app/api/currencies/route';
import { GET as get4 } from '@/app/api/cv/route';
import { GET as get5 } from '@/app/api/dashboard/route';
import { GET as get6 } from '@/app/api/gothic/route';
import { GET as get7 } from '@/app/api/medals/route';
import { GET as get8 } from '@/app/api/people/route';
import { GET as get9 } from '@/app/api/products/route';
import { GET as get10 } from '@/app/api/quick-list/route';
import { GET as get11 } from '@/app/api/reading-pharmacies/route';
import { GET as get12 } from '@/app/api/wines/route';
const routes = [['airlines', get0],
['cars', get1],
['countries', get2],
['currencies', get3],
['cv', get4],
['dashboard', get5],
['gothic', get6],
['medals', get7],
['people', get8],
['products', get9],
['quick-list', get10],
['reading-pharmacies', get11],
['wines', get12]] as const;
it.each(routes)('GET /api/%s returns its validated data and request metadata', async (key, get) => {
  const request = new NextRequest(`http://localhost:3000/api/${key}?test=1`, { headers: { cookie: 'example=value' } });
  const response = await get(request);
  const payload = await response.json();
  expect(response.status).toBe(200);
  expect(payload.path).toBe(`/api/${key}`);
  expect(payload.query).toBe('?test=1');
  expect(payload.cookies).toEqual([{ name: 'example', value: 'value' }]);
  expect(() => parseApiResponse(key as keyof ApiData, payload)).not.toThrow();
});

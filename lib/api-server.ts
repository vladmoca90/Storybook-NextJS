import { cache } from 'react';
import { headers } from 'next/headers';
import { fetchApiData } from './api';

// Reading request headers keeps this fetch at request time: there is no HTTP
// server for our own API during a production build.
export const getCars = cache(async () => {
  const requestHeaders = await headers();
  const host = requestHeaders.get('host') ?? 'localhost:3000';
  const protocol = requestHeaders.get('x-forwarded-proto') === 'https' ? 'https' : 'http';
  const origin = process.env.NEXT_PUBLIC_API_BASE_URL ?? `${protocol}://${host}`;
  const carsUrl = `${origin.replace(/\/$/, '')}/api/cars`;
  return fetchApiData('cars', carsUrl);
});

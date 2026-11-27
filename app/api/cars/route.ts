import { NextResponse, NextRequest } from 'next/server';
import { cars } from '@/app/data/cars';

export async function GET(request: NextRequest) {
  return NextResponse.json(
    {
      body: cars,
      path: request.nextUrl.pathname,
      query: request.nextUrl.search,
      cookies: request.cookies.getAll(),
    },
    { status: 200 },
  );
}

// http://localhost:3000/api/cars

import { NextResponse, NextRequest } from 'next/server';
import { Currencies } from '@/app/data/currencies';

export async function GET(request: NextRequest) {
  return NextResponse.json(
    {
      body: Currencies,
      path: request.nextUrl.pathname,
      query: request.nextUrl.search,
      cookies: request.cookies.getAll(),
    },
    { status: 200 },
  );
}

// http://localhost:3000/api/currencies

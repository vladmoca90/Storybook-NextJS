import { NextResponse, NextRequest } from 'next/server';
import { airlines } from '@/app/data/airlines';

export async function GET(request: NextRequest) {
  return NextResponse.json(
    {
      body: airlines,
      path: request.nextUrl.pathname,
      query: request.nextUrl.search,
      cookies: request.cookies.getAll(),
    },
    { status: 200 },
  );
}

// http://localhost:3000/api/airlines

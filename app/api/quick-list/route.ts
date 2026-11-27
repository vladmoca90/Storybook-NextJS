import { NextResponse, NextRequest } from 'next/server';
import { items } from '@/app/data/quick-list';

export async function GET(request: NextRequest) {
  return NextResponse.json(
    {
      body: items,
      path: request.nextUrl.pathname,
      query: request.nextUrl.search,
      cookies: request.cookies.getAll(),
    },
    { status: 200 },
  );
}

// http://localhost:3000/api/quick-list

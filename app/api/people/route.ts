import { NextResponse, NextRequest } from 'next/server';
import { people } from '@/app/data/people';

export async function GET(request: NextRequest) {
  return NextResponse.json(
    {
      body: people,
      path: request.nextUrl.pathname,
      query: request.nextUrl.search,
      cookies: request.cookies.getAll(),
    },
    { status: 200 },
  );
}

// http://localhost:3000/api/people

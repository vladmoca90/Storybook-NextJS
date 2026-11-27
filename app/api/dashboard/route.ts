import { NextResponse, NextRequest } from 'next/server';
import { peopleData } from '@/app/data/dashboard';

export async function GET(request: NextRequest) {
  return NextResponse.json(
    {
      body: peopleData,
      path: request.nextUrl.pathname,
      query: request.nextUrl.search,
      cookies: request.cookies.getAll(),
    },
    { status: 200 },
  );
}

// http://localhost:3000/api/dashboard

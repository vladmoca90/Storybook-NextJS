import { NextResponse, NextRequest } from 'next/server';
import { data, colors, medalTypes } from '@/app/data/medals';

export async function GET(request: NextRequest) {
  return NextResponse.json(
    {
      body: { data, colors, medalTypes },
      path: request.nextUrl.pathname,
      query: request.nextUrl.search,
      cookies: request.cookies.getAll(),
    },
    { status: 200 },
  );
}

// http://localhost:3000/api/medals

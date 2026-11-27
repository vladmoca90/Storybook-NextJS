import { NextResponse, NextRequest } from 'next/server';
import snapshot from '@/app/reading-pharmacies/pharmacies.json';

export async function GET(request: NextRequest) {
  return NextResponse.json(
    {
      body: snapshot,
      path: request.nextUrl.pathname,
      query: request.nextUrl.search,
      cookies: request.cookies.getAll(),
    },
    { status: 200 },
  );
}

// http://localhost:3000/api/reading-pharmacies

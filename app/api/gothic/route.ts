import { NextResponse, NextRequest } from 'next/server';
import { products, slides, categories } from '@/app/data/gothic';

export async function GET(request: NextRequest) {
  return NextResponse.json(
    {
      body: { products, slides, categories },
      path: request.nextUrl.pathname,
      query: request.nextUrl.search,
      cookies: request.cookies.getAll(),
    },
    { status: 200 },
  );
}

// http://localhost:3000/api/gothic

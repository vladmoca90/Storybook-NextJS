import { NextResponse, NextRequest } from 'next/server';
import { products } from '@/app/data/products';

export async function GET(request: NextRequest) {
  return NextResponse.json(
    {
      body: products,
      path: request.nextUrl.pathname,
      query: request.nextUrl.search,
      cookies: request.cookies.getAll(),
    },
    { status: 200 },
  );
}

// http://localhost:3000/api/products

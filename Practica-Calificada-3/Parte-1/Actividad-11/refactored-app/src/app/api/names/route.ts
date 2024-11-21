import { NextResponse } from 'next/server';
import type { ResponseItemType } from '@/types';

export async function GET() {
  const url = 'https://www.usemodernfullstack.dev/api/v1/users';

  try {
    const response = await fetch(url, {
      next: { revalidate: 3600 } // Revalidar cada hora
    });
    
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }

    const data = await response.json() as ResponseItemType[];
    
    return NextResponse.json(data);
  } catch (error) {
    console.error('Error fetching names:', error);
    return NextResponse.json(
      { error: 'Failed to fetch names' },
      { status: 500 }
    );
  }
}
import { NextResponse } from 'next/server';
import { getWorkshopsByCategory } from '@/lib/database';

export async function GET(
  request: Request,
  { params }: { params: Promise<{ category: string }> }
) {
  const { category } = await params;
  try {
    const workshops = await getWorkshopsByCategory(category);
    return NextResponse.json(workshops);
  } catch (error) {
    console.error('Error fetching workshops for category:', category, error);
    return NextResponse.json(
      { error: 'Failed to fetch workshops' },
      { status: 500 }
    );
  }
} 
import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function GET(
  request: Request,
  { params }: { params: { category: string } }
) {
  try {
    const category = params.category.toUpperCase();
    
    const workshops = await prisma.workshop.findMany({
      where: {
        category: category
      },
      orderBy: {
        endDate: 'asc',
      },
    });

    return NextResponse.json(workshops);
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to fetch workshops' },
      { status: 500 }
    );
  }
} 
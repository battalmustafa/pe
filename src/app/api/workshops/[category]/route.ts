import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function GET(
  request: Request,
  { params }: { params: Promise<{ category: string }> }
) {
  const { category } = await params;
  try {
    const categoryUpper = category.toUpperCase();
    
    const workshops = await prisma.workshop.findMany({
      where: {
        category: categoryUpper as any
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
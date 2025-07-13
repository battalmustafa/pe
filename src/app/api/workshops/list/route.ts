import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function GET() {
  try {
    const workshops = await prisma.workshop.findMany({
      select: {
        id: true,
        title: true,
        category: true,
      },
      where: {
        status: 'YAKLASANDA', // Use the string value that matches the enum
      },
      orderBy: {
        startDate: 'asc',
      },
    });

    return NextResponse.json(workshops);
  } catch (error) {
    console.error('Error fetching workshop list:', error);
    return NextResponse.json({ error: 'Failed to fetch workshop list' }, { status: 500 });
  }
} 
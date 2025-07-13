import { NextResponse } from 'next/server';
import { getWorkshopById } from '@/lib/database';

export async function GET(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    
    // Get specific workshop by ID
    const workshop = await getWorkshopById(Number(id));
    
    if (!workshop) {
      return NextResponse.json({ error: 'Workshop not found' }, { status: 404 });
    }
    
    return NextResponse.json(workshop);
  } catch (error) {
    console.error('Error fetching workshop:', error);
    return NextResponse.json({ error: 'Failed to fetch workshop' }, { status: 500 });
  }
} 
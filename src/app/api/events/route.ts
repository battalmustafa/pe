import { NextResponse } from 'next/server';
import { getWorkshops } from '@/lib/database';

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');
    
    if (id) {
      // Get specific workshop by ID
      const workshops = await getWorkshops();
      const workshop = workshops.find(w => w.id === Number(id));
      
      if (!workshop) {
        return NextResponse.json({ error: 'Workshop not found' }, { status: 404 });
      }
      
      // Format to match the calendar component requirements
      const formattedEvent = {
        id: workshop.id,
        title: workshop.title,
        date: workshop.startDate,
        end: workshop.endTime,
        location: workshop.location,
        type: workshop.category === 'ONLINE' ? 'workshop' : 
              workshop.category === 'KONAKLAMALI' ? 'retreat' : 'panel',
        description: workshop.description
      };
      
      return NextResponse.json(formattedEvent);
    }
    
    // Get all workshops
    const workshops = await getWorkshops();

    // Format workshops to match calendar component expectations
    const formattedEvents = workshops.map(workshop => ({
      id: workshop.id,
      title: workshop.title,
      date: workshop.startDate,
      end: workshop.endTime,
      location: workshop.location,
      type: workshop.category === 'ONLINE' ? 'workshop' : 
            workshop.category === 'KONAKLAMALI' ? 'retreat' : 'panel',
      description: workshop.description || `Pınar Eğilmez'in bu etkinliğine katılın.`
    }));

    return NextResponse.json(formattedEvents);
  } catch (error) {
    console.error('Error fetching workshops:', error);
    return NextResponse.json({ error: 'Failed to fetch workshops' }, { status: 500 });
  }
} 
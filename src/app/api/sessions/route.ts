import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

// GET endpoint to retrieve all sessions
export async function GET() {
  try {
    const sessions = await prisma.session.findMany({
      orderBy: {
        date: 'asc',
      },
    });

    // Transform the data for the frontend
    const formattedSessions = sessions.map((session) => ({
      id: session.id,
      title: session.title,
      description: session.description,
      date: session.date,
      duration: session.duration,
      price: session.price,
      capacity: session.capacity,
      bookings: session.bookings,
      createdAt: session.createdAt,
      updatedAt: session.updatedAt,
      // Calculate status based on date
      status: new Date(session.date) > new Date() ? 'upcoming' : 
              (new Date(session.date) <= new Date() && new Date(session.date).setMinutes(new Date(session.date).getMinutes() + session.duration) >= Date.now()) ? 'active' : 'completed'
    }));

    return NextResponse.json(formattedSessions);
  } catch (error) {
    console.error('Error fetching sessions:', error);
    return NextResponse.json({ error: 'Failed to fetch sessions' }, { status: 500 });
  }
}

// POST endpoint to create a new session
export async function POST(request: Request) {
  try {
    const body = await request.json();
    
    // Convert string date to DateTime object
    const date = new Date(body.date);
    
    // Convert price from string to float if needed
    const price = typeof body.price === 'string' ? parseFloat(body.price) : body.price;
    
    // Convert capacity from string to number if provided
    const capacity = body.capacity ? parseInt(body.capacity) : null;
    
    // Convert duration from string to number if needed
    const duration = typeof body.duration === 'string' ? parseInt(body.duration) : body.duration;
    
    // Create the session
    const session = await prisma.session.create({
      data: {
        title: body.title,
        description: body.description || null,
        date: date,
        duration: duration,
        price: price,
        capacity: capacity,
        bookings: body.bookings || 0,
      },
    });
    
    return NextResponse.json(session, { status: 201 });
  } catch (error) {
    console.error('Error creating session:', error);
    return NextResponse.json({ error: 'Failed to create session' }, { status: 500 });
  }
}

// PUT endpoint to update a session by ID
export async function PUT(request: Request) {
  try {
    const body = await request.json();
    const { id, ...updateData } = body;
    
    if (!id) {
      return NextResponse.json({ error: 'Session ID is required' }, { status: 400 });
    }
    
    // Handle date conversion if present
    if (updateData.date) {
      updateData.date = new Date(updateData.date);
    }
    
    // Handle number conversions if present
    if (updateData.price) {
      updateData.price = typeof updateData.price === 'string' ? parseFloat(updateData.price) : updateData.price;
    }
    
    if (updateData.capacity) {
      updateData.capacity = typeof updateData.capacity === 'string' ? parseInt(updateData.capacity) : updateData.capacity;
    }
    
    if (updateData.duration) {
      updateData.duration = typeof updateData.duration === 'string' ? parseInt(updateData.duration) : updateData.duration;
    }
    
    if (updateData.bookings) {
      updateData.bookings = typeof updateData.bookings === 'string' ? parseInt(updateData.bookings) : updateData.bookings;
    }
    
    // Update the session
    const updatedSession = await prisma.session.update({
      where: { id: Number(id) },
      data: updateData,
    });
    
    return NextResponse.json(updatedSession);
  } catch (error) {
    console.error('Error updating session:', error);
    return NextResponse.json({ error: 'Failed to update session' }, { status: 500 });
  }
}

// DELETE endpoint to delete a session by ID
export async function DELETE(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');
    
    if (!id) {
      return NextResponse.json({ error: 'Session ID is required' }, { status: 400 });
    }
    
    // Delete the session
    await prisma.session.delete({
      where: { id: Number(id) },
    });
    
    return NextResponse.json({ message: 'Session deleted successfully' });
  } catch (error) {
    console.error('Error deleting session:', error);
    return NextResponse.json({ error: 'Failed to delete session' }, { status: 500 });
  }
} 
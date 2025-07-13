import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { WorkshopStatus } from '@prisma/client';

// GET endpoint to retrieve all workshops or a specific workshop
export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');
    const category = searchParams.get('category');
    
    if (id) {
      const workshop = await prisma.workshop.findUnique({
        where: { id: Number(id) },
      });
      
      if (!workshop) {
        return NextResponse.json({ error: 'Workshop not found' }, { status: 404 });
      }
      
      return NextResponse.json(workshop);
    }
    
    // Filter by category if provided
    const whereClause = category 
      ? { category: category.toUpperCase() as any } 
      : {};
    
    const workshops = await prisma.workshop.findMany({
      where: whereClause,
      orderBy: {
        startDate: 'asc',
      },
    });

    return NextResponse.json(workshops);
  } catch (error) {
    console.error('Error fetching workshops:', error);
    return NextResponse.json({ error: 'Failed to fetch workshops' }, { status: 500 });
  }
}

// POST endpoint to create a new workshop
export async function POST(request: Request) {
  try {
    const body = await request.json();
    
    // Convert image array to JSON string if it's an array
    const images = Array.isArray(body.images) ? JSON.stringify(body.images) : body.images;
    
    // Convert dates to DateTime objects
    const startDate = new Date(body.startDate);
    const endDate = new Date(body.endDate);
    const startTime = new Date(body.startTime);
    const endTime = new Date(body.endTime);
    
    // Convert capacity from string to number if provided
    const capacity = body.capacity ? parseInt(body.capacity) : null;
    
    // Create the workshop
    const workshop = await prisma.workshop.create({
      data: {
        title: body.title,
        images: images,
        category: body.category,
        startDate: startDate,
        endDate: endDate,
        startTime: startTime,
        endTime: endTime,
        location: body.location,
        description: body.description,
        detailPageHeader: body.detailPageHeader,
        detailPageSection1: body.detailPageSection1,
        detailPageSection2: body.detailPageSection2,
        detailPageSection3: body.detailPageSection3,
        detailPageFooter: body.detailPageFooter,
        capacity: capacity,
        status: body.status,
      },
    });
    
    return NextResponse.json(workshop, { status: 201 });
  } catch (error) {
    console.error('Error creating workshop:', error);
    return NextResponse.json({ error: 'Failed to create workshop' }, { status: 500 });
  }
}

// PUT endpoint to update a workshop by ID
export async function PUT(request: Request) {
  try {
    const body = await request.json();
    const { id, ...updateData } = body;
    
    if (!id) {
      return NextResponse.json({ error: 'Workshop ID is required' }, { status: 400 });
    }
    
    // Handle image conversion if present
    if (updateData.images && Array.isArray(updateData.images)) {
      updateData.images = JSON.stringify(updateData.images);
    }
    
    // Handle date conversions if present
    if (updateData.startDate) {
      updateData.startDate = new Date(updateData.startDate);
    }
    
    if (updateData.endDate) {
      updateData.endDate = new Date(updateData.endDate);
    }
    
    if (updateData.startTime) {
      updateData.startTime = new Date(updateData.startTime);
    }
    
    if (updateData.endTime) {
      updateData.endTime = new Date(updateData.endTime);
    }
    
    if (updateData.capacity) {
      updateData.capacity = typeof updateData.capacity === 'string' ? parseInt(updateData.capacity) : updateData.capacity;
    }
    
    // Update the workshop
    const updatedWorkshop = await prisma.workshop.update({
      where: { id: Number(id) },
      data: updateData,
    });
    
    return NextResponse.json(updatedWorkshop);
  } catch (error) {
    console.error('Error updating workshop:', error);
    return NextResponse.json({ error: 'Failed to update workshop' }, { status: 500 });
  }
}

// DELETE endpoint to delete a workshop by ID
export async function DELETE(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');
    
    if (!id) {
      return NextResponse.json({ error: 'Workshop ID is required' }, { status: 400 });
    }
    
    // Delete the workshop
    await prisma.workshop.delete({
      where: { id: Number(id) },
    });
    
    return NextResponse.json({ message: 'Workshop deleted successfully' });
  } catch (error) {
    console.error('Error deleting workshop:', error);
    return NextResponse.json({ error: 'Failed to delete workshop' }, { status: 500 });
  }
} 
import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

// GET endpoint to retrieve all carousel images
export async function GET() {
  try {
    const carouselDir = path.join(process.cwd(), 'public', 'images', 'carousel');
    
    // Check if the directory exists, if not create it
    if (!fs.existsSync(carouselDir)) {
      fs.mkdirSync(carouselDir, { recursive: true });
    }
    
    // Read all files in the carousel directory
    const files = fs.readdirSync(carouselDir);
    
    // Filter to only include image files
    const imageFiles = files.filter(file => {
      const ext = path.extname(file).toLowerCase();
      return ['.jpg', '.jpeg', '.png', '.gif', '.webp'].includes(ext);
    });
    
    // Create an array of image objects with id, url, and alt
    const images = imageFiles.map((file, index) => ({
      id: `${index + 1}`,
      url: `/images/carousel/${file}`,
      alt: `Carousel image ${index + 1}`
    }));
    
    return NextResponse.json(images);
  } catch (error) {
    console.error('Error fetching carousel images:', error);
    return NextResponse.json({ error: 'Failed to fetch carousel images' }, { status: 500 });
  }
}

// DELETE endpoint to remove an image
export async function DELETE(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const filename = searchParams.get('filename');
    
    if (!filename) {
      return NextResponse.json({ error: 'Filename is required' }, { status: 400 });
    }
    
    const imagePath = path.join(process.cwd(), 'public', 'images', 'carousel', filename);
    
    // Check if file exists
    if (!fs.existsSync(imagePath)) {
      return NextResponse.json({ error: 'Image not found' }, { status: 404 });
    }
    
    // Delete the file
    fs.unlinkSync(imagePath);
    
    return NextResponse.json({ success: true, message: 'Image deleted successfully' });
  } catch (error) {
    console.error('Error deleting carousel image:', error);
    return NextResponse.json({ error: 'Failed to delete carousel image' }, { status: 500 });
  }
} 
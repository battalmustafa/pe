import { NextResponse } from 'next/server';
import { writeFile } from 'fs/promises';
import { mkdir } from 'fs/promises';
import * as path from 'path';
import * as crypto from 'crypto';

export async function POST(request: Request) {
  try {
    const formData = await request.formData();
    const file = formData.get('file') as File;
    
    if (!file) {
      return NextResponse.json({ error: 'No file uploaded' }, { status: 400 });
    }
    
    // Verify that the file is an image
    const validMimeTypes = ['image/jpeg', 'image/png', 'image/gif', 'image/webp'];
    if (!validMimeTypes.includes(file.type)) {
      return NextResponse.json({ error: 'File must be an image (JPEG, PNG, GIF, or WebP)' }, { status: 400 });
    }
    
    // Generate a unique filename to prevent overwrites
    const fileExtension = file.name.split('.').pop();
    const randomId = crypto.randomBytes(16).toString('hex');
    const fileName = `carousel_${randomId}.${fileExtension}`;
    
    // Create path to save file
    const uploadDir = path.join(process.cwd(), 'public', 'images', 'carousel');
    
    // Ensure directory exists
    await mkdir(uploadDir, { recursive: true });
    
    // Convert file to Buffer
    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);
    
    // Save file to disk
    const filePath = path.join(uploadDir, fileName);
    await writeFile(filePath, buffer);
    
    return NextResponse.json({ 
      success: true, 
      message: 'Image uploaded successfully',
      fileName: fileName,
      url: `/images/carousel/${fileName}`
    });
  } catch (error) {
    console.error('Error uploading carousel image:', error);
    return NextResponse.json({ error: 'Failed to upload carousel image' }, { status: 500 });
  }
}

export const config = {
  api: {
    bodyParser: false,
  },
}; 
import { NextResponse } from "next/server";
import { promises as fs } from "fs";
import path from "path";

// Ensure the upload directory exists
const uploadDir = path.join(process.cwd(), "public/images/workshop");

async function ensureDir(dirPath: string) {
  try {
    await fs.mkdir(dirPath, { recursive: true });
  } catch (error) {
    console.error("Error creating directory:", error);
  }
}

export async function POST(req: Request) {
  try {
    await ensureDir(uploadDir);
    const formData = await req.formData();
    const file = formData.get("file") as File;
    if (!file) {
      return NextResponse.json({ error: "No file uploaded" }, { status: 400 });
    }

    // Generate a unique filename
    const fileName = `${Date.now()}_${Math.floor(Math.random() * 1000)}_${file.name}`;
    const filePath = path.join(uploadDir, fileName);

    // Save the file
    const buffer = Buffer.from(await file.arrayBuffer());
    await fs.writeFile(filePath, buffer);

    // Return the URL for the saved file
    const url = `/images/workshop/${fileName}`;
    return NextResponse.json({ url, fileName });
  } catch (error) {
    console.error("Error uploading file:", error);
    return NextResponse.json({ error: "Failed to upload file" }, { status: 500 });
  }
} 
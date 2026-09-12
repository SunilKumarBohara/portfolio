import { NextResponse } from "next/server";
import { getSession } from "@/lib/auth";
import { getMediaItems, saveMediaItem, deleteMediaItem } from "@/lib/db";
import { MediaItem } from "@/types";
import fs from "fs";
import path from "path";

export async function GET(req: Request) {
  const session = getSession();
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { searchParams } = new URL(req.url);
  const search = searchParams.get("search")?.toLowerCase();

  let media = getMediaItems();
  if (search) {
    media = media.filter(
      (m) =>
        m.filename.toLowerCase().includes(search) ||
        m.altText?.toLowerCase().includes(search) ||
        m.title?.toLowerCase().includes(search)
    );
  }

  return NextResponse.json(media);
}

export async function POST(req: Request) {
  const session = getSession();
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const contentType = req.headers.get("content-type") || "";

    // If updating Image SEO details via JSON
    if (contentType.includes("application/json")) {
      const body = await req.json();
      if (!body.id) {
        return NextResponse.json({ error: "Media ID required" }, { status: 400 });
      }

      const mediaList = getMediaItems();
      const existing = mediaList.find((m) => m.id === body.id);
      if (!existing) {
        return NextResponse.json({ error: "Media not found" }, { status: 404 });
      }

      const updated: MediaItem = {
        ...existing,
        altText: body.altText ?? existing.altText,
        title: body.title ?? existing.title,
        caption: body.caption ?? existing.caption,
        description: body.description ?? existing.description,
      };

      saveMediaItem(updated);
      return NextResponse.json(updated);
    }

    // Multipart file upload
    const formData = await req.formData();
    const file = formData.get("file") as File | null;
    if (!file) {
      return NextResponse.json({ error: "No file provided" }, { status: 400 });
    }

    // Validate file type
    const validMimeTypes = [
      "image/jpeg",
      "image/png",
      "image/webp",
      "image/svg+xml",
      "image/gif",
      "image/avif",
    ];
    if (!validMimeTypes.includes(file.type)) {
      return NextResponse.json(
        { error: "Unsupported file type. Only JPG, PNG, WEBP, SVG, GIF, AVIF are allowed." },
        { status: 400 }
      );
    }

    // Size limit: 10MB
    if (file.size > 10 * 1024 * 1024) {
      return NextResponse.json({ error: "File exceeds 10MB limit" }, { status: 400 });
    }

    const uploadsDir = path.join(process.cwd(), "public", "uploads");
    if (!fs.existsSync(uploadsDir)) {
      fs.mkdirSync(uploadsDir, { recursive: true });
    }

    const ext = path.extname(file.name) || ".jpg";
    const cleanName = path
      .basename(file.name, ext)
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-");
    const uniqueFilename = `${cleanName}-${Date.now()}${ext}`;
    const filePath = path.join(uploadsDir, uniqueFilename);

    const bytes = await file.arrayBuffer();
    fs.writeFileSync(filePath, Buffer.from(bytes));

    const mediaItem: MediaItem = {
      id: `media_${Date.now()}`,
      filename: uniqueFilename,
      url: `/uploads/${uniqueFilename}`,
      mimeType: file.type,
      size: file.size,
      altText: cleanName.replace(/-/g, " "),
      title: cleanName.replace(/-/g, " "),
      caption: "",
      description: "",
      createdAt: new Date().toISOString(),
    };

    saveMediaItem(mediaItem);
    return NextResponse.json(mediaItem);
  } catch (err: any) {
    return NextResponse.json({ error: err.message || "Failed to process media" }, { status: 500 });
  }
}

export async function DELETE(req: Request) {
  const session = getSession();
  if (!session || session.role === "author") {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { searchParams } = new URL(req.url);
  const id = searchParams.get("id");
  if (!id) {
    return NextResponse.json({ error: "Media ID required" }, { status: 400 });
  }

  const item = getMediaItems().find((m) => m.id === id);
  if (item && item.url.startsWith("/uploads/")) {
    const localFile = path.join(process.cwd(), "public", item.url);
    if (fs.existsSync(localFile)) {
      try {
        fs.unlinkSync(localFile);
      } catch (e) {
        console.error("Error deleting local file:", e);
      }
    }
  }

  deleteMediaItem(id);
  return NextResponse.json({ success: true });
}

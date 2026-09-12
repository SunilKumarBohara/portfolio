import { NextResponse } from "next/server";
import { getSession } from "@/lib/auth";
import { getTags, saveTag, deleteTag } from "@/lib/db";
import { Tag } from "@/types";

export async function GET() {
  const tags = getTags();
  return NextResponse.json(tags);
}

export async function POST(req: Request) {
  const session = getSession();
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const body = await req.json();
    if (!body.name) {
      return NextResponse.json({ error: "Tag name required" }, { status: 400 });
    }

    const slug =
      body.slug?.trim() ||
      body.name
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, "-")
        .replace(/(^-|-$)+/g, "");

    const newTag: Tag = {
      id: body.id || `tag_${Date.now()}`,
      name: body.name,
      slug,
      createdAt: new Date().toISOString(),
    };

    saveTag(newTag);
    return NextResponse.json(newTag);
  } catch (err: any) {
    return NextResponse.json({ error: err.message || "Failed to save tag" }, { status: 500 });
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
    return NextResponse.json({ error: "Tag ID required" }, { status: 400 });
  }

  deleteTag(id);
  return NextResponse.json({ success: true });
}

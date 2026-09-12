import { NextResponse } from "next/server";
import { getSession } from "@/lib/auth";
import { getPostById, savePost, deletePost } from "@/lib/db";
import { BlogPost } from "@/types";

export async function GET(
  req: Request,
  { params }: { params: { id: string } }
) {
  const session = getSession();
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const post = getPostById(params.id);
  if (!post) {
    return NextResponse.json({ error: "Post not found" }, { status: 404 });
  }

  return NextResponse.json(post);
}

export async function PUT(
  req: Request,
  { params }: { params: { id: string } }
) {
  const session = getSession();
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const existing = getPostById(params.id);
    if (!existing) {
      return NextResponse.json({ error: "Post not found" }, { status: 404 });
    }

    // Role check for author
    if (session.role === "author" && existing.authorName !== session.name && existing.authorName !== session.username) {
      return NextResponse.json({ error: "Forbidden" }, { status: 403 });
    }

    const body = await req.json();

    const slug =
      body.slug?.trim() ||
      body.title
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, "-")
        .replace(/(^-|-$)+/g, "");

    const updated: BlogPost = {
      ...existing,
      ...body,
      id: params.id,
      slug,
      readingTime: `${Math.max(1, Math.ceil((body.content || existing.content || "").split(/\s+/).length / 200))} min read`,
    };

    savePost(updated);
    return NextResponse.json(updated);
  } catch (err: any) {
    return NextResponse.json({ error: err.message || "Failed to update post" }, { status: 500 });
  }
}

export async function DELETE(
  req: Request,
  { params }: { params: { id: string } }
) {
  const session = getSession();
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const existing = getPostById(params.id);
  if (!existing) {
    return NextResponse.json({ error: "Post not found" }, { status: 404 });
  }

  if (session.role === "author") {
    return NextResponse.json({ error: "Forbidden: Authors cannot delete posts" }, { status: 403 });
  }

  deletePost(params.id);
  return NextResponse.json({ success: true });
}

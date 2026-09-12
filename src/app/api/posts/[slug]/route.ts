import { NextResponse } from "next/server";
import { getPostBySlug, savePost } from "@/lib/db";

export async function GET(
  req: Request,
  { params }: { params: { slug: string } }
) {
  const post = getPostBySlug(params.slug);
  if (!post || (post.status && post.status !== "published")) {
    return NextResponse.json({ error: "Post not found" }, { status: 404 });
  }

  // Increment view count
  post.views = (post.views || 0) + 1;
  savePost(post);

  return NextResponse.json(post);
}

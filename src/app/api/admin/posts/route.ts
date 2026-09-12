import { NextResponse } from "next/server";
import { getSession } from "@/lib/auth";
import { getPosts, savePost, deletePost } from "@/lib/db";
import { BlogPost } from "@/types";

export async function GET(req: Request) {
  const session = getSession();
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { searchParams } = new URL(req.url);
  const search = searchParams.get("search")?.toLowerCase();
  const status = searchParams.get("status");
  const category = searchParams.get("category");

  let posts = getPosts();

  // Filter for authors who can only see/edit their own posts if author role
  if (session.role === "author") {
    posts = posts.filter((p) => p.authorName === session.name || p.authorName === session.username);
  }

  if (search) {
    posts = posts.filter(
      (p) =>
        p.title.toLowerCase().includes(search) ||
        p.content.toLowerCase().includes(search) ||
        p.slug.toLowerCase().includes(search)
    );
  }

  if (status && status !== "all") {
    posts = posts.filter((p) => (p.status || "published") === status);
  }

  if (category && category !== "all") {
    posts = posts.filter((p) => p.category === category || p.categoryId === category);
  }

  return NextResponse.json(posts);
}

export async function POST(req: Request) {
  const session = getSession();
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const body = await req.json();
    if (!body.title) {
      return NextResponse.json({ error: "Title is required" }, { status: 400 });
    }

    const slug =
      body.slug?.trim() ||
      body.title
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, "-")
        .replace(/(^-|-$)+/g, "");

    const newPost: BlogPost = {
      id: body.id || `post_${Date.now()}`,
      title: body.title,
      slug,
      content: body.content || "",
      excerpt: body.excerpt || "",
      category: body.category || "SEO",
      categoryId: body.categoryId,
      date: body.date || new Date().toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" }),
      readingTime: body.readingTime || `${Math.max(1, Math.ceil((body.content || "").split(/\s+/).length / 200))} min read`,
      tags: Array.isArray(body.tags) ? body.tags : [],
      featuredImage: body.featuredImage || "/og-image.png",
      status: body.status || "draft",
      seoTitle: body.seoTitle || body.title,
      metaDescription: body.metaDescription || body.excerpt,
      focusKeyword: body.focusKeyword || "",
      canonicalUrl: body.canonicalUrl || "",
      ogTitle: body.ogTitle || body.title,
      ogDescription: body.ogDescription || body.excerpt,
      ogImage: body.ogImage || body.featuredImage || "/og-image.png",
      authorName: session.name || "Sunil Kumar Bohara",
      views: body.views || 0,
    };

    savePost(newPost);
    return NextResponse.json(newPost);
  } catch (err: any) {
    return NextResponse.json({ error: err.message || "Failed to create post" }, { status: 500 });
  }
}

// Bulk Actions
export async function PATCH(req: Request) {
  const session = getSession();
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const { ids, action, value } = await req.json();
    if (!Array.isArray(ids) || ids.length === 0) {
      return NextResponse.json({ error: "Post IDs required" }, { status: 400 });
    }

    const posts = getPosts();
    for (const id of ids) {
      const post = posts.find((p) => p.id === id);
      if (!post) continue;

      if (action === "status") {
        post.status = value;
        savePost(post);
      } else if (action === "delete") {
        deletePost(id);
      } else if (action === "category") {
        post.category = value;
        savePost(post);
      }
    }

    return NextResponse.json({ success: true });
  } catch (err: any) {
    return NextResponse.json({ error: err.message || "Bulk action failed" }, { status: 500 });
  }
}

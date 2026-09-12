import { NextResponse } from "next/server";
import { getPosts, getCategories } from "@/lib/db";

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const category = searchParams.get("category");
  const tag = searchParams.get("tag");
  const search = searchParams.get("search")?.toLowerCase();

  let posts = getPosts().filter((p) => p.status === "published" || !p.status);

  if (category && category !== "all") {
    posts = posts.filter(
      (p) =>
        p.category.toLowerCase() === category.toLowerCase() ||
        p.slug.toLowerCase().includes(category.toLowerCase())
    );
  }

  if (tag) {
    posts = posts.filter((p) => p.tags?.some((t) => t.toLowerCase() === tag.toLowerCase()));
  }

  if (search) {
    posts = posts.filter(
      (p) =>
        p.title.toLowerCase().includes(search) ||
        p.excerpt.toLowerCase().includes(search) ||
        p.content.toLowerCase().includes(search)
    );
  }

  return NextResponse.json(posts);
}

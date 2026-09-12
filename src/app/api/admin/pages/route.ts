import { NextResponse } from "next/server";
import { getSession } from "@/lib/auth";
import { getPages, savePage } from "@/lib/db";
import { CMSPage } from "@/types";

export async function GET() {
  const pages = getPages();
  return NextResponse.json(pages);
}

export async function POST(req: Request) {
  const session = getSession();
  if (!session || session.role === "author") {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const body = await req.json();
    if (!body.title || !body.slug) {
      return NextResponse.json({ error: "Title and slug are required" }, { status: 400 });
    }

    const page: CMSPage = {
      id: body.id || `page_${Date.now()}`,
      title: body.title,
      slug: body.slug,
      content: body.content || "",
      status: body.status || "published",
      seoTitle: body.seoTitle,
      metaDescription: body.metaDescription,
      updatedAt: new Date().toISOString(),
    };

    savePage(page);
    return NextResponse.json(page);
  } catch (err: any) {
    return NextResponse.json({ error: err.message || "Failed to save page" }, { status: 500 });
  }
}

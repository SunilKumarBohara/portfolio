import { NextResponse } from "next/server";
import { getSession } from "@/lib/auth";
import { getCategories, saveCategory, deleteCategory } from "@/lib/db";
import { Category } from "@/types";

export async function GET() {
  const categories = getCategories();
  return NextResponse.json(categories);
}

export async function POST(req: Request) {
  const session = getSession();
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const body = await req.json();
    if (!body.name) {
      return NextResponse.json({ error: "Category name required" }, { status: 400 });
    }

    const slug =
      body.slug?.trim() ||
      body.name
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, "-")
        .replace(/(^-|-$)+/g, "");

    const newCategory: Category = {
      id: body.id || `cat_${Date.now()}`,
      name: body.name,
      slug,
      description: body.description || "",
      image: body.image,
      createdAt: new Date().toISOString(),
    };

    saveCategory(newCategory);
    return NextResponse.json(newCategory);
  } catch (err: any) {
    return NextResponse.json({ error: err.message || "Failed to save category" }, { status: 500 });
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
    return NextResponse.json({ error: "Category ID required" }, { status: 400 });
  }

  deleteCategory(id);
  return NextResponse.json({ success: true });
}

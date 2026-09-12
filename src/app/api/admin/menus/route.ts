import { NextResponse } from "next/server";
import { getSession } from "@/lib/auth";
import { getMenus, saveMenus } from "@/lib/db";
import { MenuItem } from "@/types";

export async function GET() {
  const menus = getMenus();
  return NextResponse.json(menus);
}

export async function POST(req: Request) {
  const session = getSession();
  if (!session || session.role === "author") {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const body = await req.json();
    if (!Array.isArray(body)) {
      return NextResponse.json({ error: "Array of menu items required" }, { status: 400 });
    }

    saveMenus(body as MenuItem[]);
    return NextResponse.json({ success: true, menus: body });
  } catch (err: any) {
    return NextResponse.json({ error: err.message || "Failed to update menus" }, { status: 500 });
  }
}

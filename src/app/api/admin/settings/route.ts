import { NextResponse } from "next/server";
import { getSession } from "@/lib/auth";
import { getSettings, saveSettings } from "@/lib/db";
import { SiteSettings } from "@/types";

export async function GET() {
  const settings = getSettings();
  return NextResponse.json(settings);
}

export async function POST(req: Request) {
  const session = getSession();
  if (!session || session.role !== "super_admin") {
    return NextResponse.json({ error: "Unauthorized. Super Admin required." }, { status: 401 });
  }

  try {
    const body = await req.json();
    saveSettings(body as SiteSettings);
    return NextResponse.json({ success: true, settings: body });
  } catch (err: any) {
    return NextResponse.json({ error: err.message || "Failed to update settings" }, { status: 500 });
  }
}

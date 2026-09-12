import { NextResponse } from "next/server";
import { getSession } from "@/lib/auth";
import { getAdminStats } from "@/lib/db";

export async function GET() {
  const session = getSession();
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const stats = getAdminStats();
  return NextResponse.json(stats);
}

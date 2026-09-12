import { NextResponse } from "next/server";
import { getSession, hashPassword } from "@/lib/auth";
import { getUsers, saveUser, deleteUser } from "@/lib/db";
import { User } from "@/types";

export async function GET() {
  const session = getSession();
  if (!session || session.role !== "super_admin") {
    return NextResponse.json({ error: "Unauthorized. Super Admin required." }, { status: 401 });
  }

  // Sanitize password hashes out of response
  const users = getUsers().map((u) => {
    const { passwordHash, ...rest } = u;
    return rest;
  });

  return NextResponse.json(users);
}

export async function POST(req: Request) {
  const session = getSession();
  if (!session || session.role !== "super_admin") {
    return NextResponse.json({ error: "Unauthorized. Super Admin required." }, { status: 401 });
  }

  try {
    const body = await req.json();
    if (!body.username || !body.email || (!body.password && !body.id)) {
      return NextResponse.json({ error: "Username, email, and password required" }, { status: 400 });
    }

    const users = getUsers();
    const existing = body.id ? users.find((u) => u.id === body.id) : null;

    if (!existing && users.some((u) => u.username.toLowerCase() === body.username.toLowerCase())) {
      return NextResponse.json({ error: "Username already exists" }, { status: 400 });
    }

    const passwordHash = body.password ? hashPassword(body.password) : existing?.passwordHash || "";

    const user: User = {
      id: body.id || `usr_${Date.now()}`,
      name: body.name || body.username,
      email: body.email,
      username: body.username,
      passwordHash,
      role: body.role || "editor",
      avatar: body.avatar || "/og-image.png",
      createdAt: existing?.createdAt || new Date().toISOString(),
    };

    saveUser(user);

    const { passwordHash: _, ...safeUser } = user;
    return NextResponse.json(safeUser);
  } catch (err: any) {
    return NextResponse.json({ error: err.message || "Failed to save user" }, { status: 500 });
  }
}

export async function DELETE(req: Request) {
  const session = getSession();
  if (!session || session.role !== "super_admin") {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { searchParams } = new URL(req.url);
  const id = searchParams.get("id");
  if (!id) {
    return NextResponse.json({ error: "User ID required" }, { status: 400 });
  }

  if (id === session.id) {
    return NextResponse.json({ error: "Cannot delete your own super admin account" }, { status: 400 });
  }

  deleteUser(id);
  return NextResponse.json({ success: true });
}

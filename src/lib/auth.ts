import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { cookies } from "next/headers";
import { User, UserRole } from "@/types";
import { getUserById } from "./db";

const JWT_SECRET = process.env.JWT_SECRET || "sunil_bohara_seo_cms_secret_key_2026_safe_jwt";
const TOKEN_NAME = "sunil_admin_token";

export interface SessionUser {
  id: string;
  username: string;
  name: string;
  email: string;
  role: UserRole;
}

export function hashPassword(password: string): string {
  return bcrypt.hashSync(password, 10);
}

export function comparePassword(password: string, hash: string): boolean {
  return bcrypt.compareSync(password, hash);
}

export function createToken(payload: SessionUser): string {
  return jwt.sign(payload, JWT_SECRET, { expiresIn: "7d" });
}

export function verifyToken(token: string): SessionUser | null {
  try {
    return jwt.verify(token, JWT_SECRET) as SessionUser;
  } catch (err) {
    return null;
  }
}

export function getSession(): SessionUser | null {
  try {
    const cookieStore = cookies();
    const token = cookieStore.get(TOKEN_NAME)?.value;
    if (!token) return null;
    return verifyToken(token);
  } catch {
    return null;
  }
}

export function checkRole(requiredRole: UserRole): boolean {
  const session = getSession();
  if (!session) return false;
  if (session.role === "super_admin") return true;
  if (requiredRole === "editor" && session.role === "editor") return true;
  if (requiredRole === "author" && (session.role === "editor" || session.role === "author")) return true;
  return false;
}

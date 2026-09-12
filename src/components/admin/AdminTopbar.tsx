"use client";

import React from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import {
  Menu,
  Plus,
  Globe,
  LogOut,
  User as UserIcon,
  ShieldCheck,
  Bell,
} from "lucide-react";

interface AdminTopbarProps {
  user?: {
    name: string;
    username: string;
    role: string;
  } | null;
  onToggleSidebar: () => void;
}

export default function AdminTopbar({ user, onToggleSidebar }: AdminTopbarProps) {
  const router = useRouter();

  const handleLogout = async () => {
    try {
      await fetch("/api/auth/logout", { method: "POST" });
      router.push("/admin/login");
      router.refresh();
    } catch (err) {
      console.error("Logout error:", err);
    }
  };

  return (
    <header className="sticky top-0 z-30 h-16 bg-[#0a0c10]/90 backdrop-blur-xl border-b border-white/10 px-4 sm:px-6 flex items-center justify-between">
      {/* Left items: Mobile toggle & Quick Add */}
      <div className="flex items-center gap-3">
        <button
          onClick={onToggleSidebar}
          className="lg:hidden p-2 rounded-xl bg-surface-200 border border-white/10 text-gray-300 hover:text-white"
          aria-label="Toggle Menu"
        >
          <Menu className="w-5 h-5" />
        </button>

        <Link
          href="/admin/posts/new"
          className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-brand-green/10 border border-brand-green/40 text-brand-green hover:bg-brand-green hover:text-surface-300 transition-all text-xs font-mono font-semibold shadow-glow-sm"
        >
          <Plus className="w-3.5 h-3.5" />
          <span>New Post</span>
        </Link>

        <Link
          href="/"
          target="_blank"
          className="hidden md:inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-surface-200/80 hover:bg-surface-100 text-gray-300 hover:text-white text-xs font-mono border border-white/5 transition-all"
        >
          <Globe className="w-3.5 h-3.5 text-brand-cyan" />
          <span>View Site</span>
        </Link>
      </div>

      {/* Right User & Actions */}
      <div className="flex items-center gap-3">
        {/* User Info Badge */}
        {user && (
          <div className="flex items-center gap-2.5 px-3 py-1.5 rounded-xl bg-surface-200/90 border border-white/10">
            <div className="w-7 h-7 rounded-lg bg-gradient-to-tr from-brand-green/20 to-brand-cyan/20 border border-brand-green/30 flex items-center justify-center text-brand-green">
              <UserIcon className="w-3.5 h-3.5" />
            </div>
            <div className="text-left hidden sm:block">
              <div className="text-xs font-bold text-white font-display leading-none">
                {user.name}
              </div>
              <span className="text-[10px] font-mono text-brand-cyan uppercase">
                {user.role.replace("_", " ")}
              </span>
            </div>
          </div>
        )}

        {/* Logout Button */}
        <button
          onClick={handleLogout}
          className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-red-500/10 hover:bg-red-500/20 border border-red-500/30 text-red-400 hover:text-red-300 text-xs font-mono transition-all"
          title="Sign out of CMS"
        >
          <LogOut className="w-3.5 h-3.5" />
          <span className="hidden sm:inline">Logout</span>
        </button>
      </div>
    </header>
  );
}

"use client";

import React, { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  FileText,
  PlusCircle,
  FolderTree,
  Tags,
  Image,
  Layers,
  MenuSquare,
  Users,
  Settings,
  ChevronDown,
  Sparkles,
  ExternalLink,
} from "lucide-react";
import { cn } from "@/lib/utils";

interface AdminSidebarProps {
  userRole?: string;
  isOpen: boolean;
  onClose?: () => void;
}

export default function AdminSidebar({ userRole = "super_admin", isOpen, onClose }: AdminSidebarProps) {
  const pathname = usePathname();
  const [postsOpen, setPostsOpen] = useState(true);

  const isActive = (path: string) => {
    if (path === "/admin" && pathname === "/admin") return true;
    if (path !== "/admin" && pathname.startsWith(path)) return true;
    return false;
  };

  const isSuperAdmin = userRole === "super_admin";
  const isEditor = userRole === "super_admin" || userRole === "editor";

  return (
    <>
      {/* Mobile Backdrop */}
      {isOpen && (
        <div
          onClick={onClose}
          className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40 lg:hidden"
        />
      )}

      <aside
        className={cn(
          "fixed top-0 bottom-0 left-0 z-50 w-64 bg-[#0a0c10] border-r border-white/10 flex flex-col transition-transform duration-300 lg:translate-x-0",
          isOpen ? "translate-x-0" : "-translate-x-full"
        )}
      >
        {/* Sidebar Brand */}
        <div className="p-4 border-b border-white/10 flex items-center justify-between">
          <Link href="/admin" className="flex items-center gap-2.5 group">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-tr from-brand-green to-brand-cyan p-[1px]">
              <div className="w-full h-full rounded-lg bg-surface-300 flex items-center justify-center font-bold text-brand-green text-sm font-mono">
                W
              </div>
            </div>
            <div>
              <span className="text-sm font-black tracking-wider text-white font-display">
                SUNIL<span className="text-brand-green"> CMS</span>
              </span>
              <span className="text-[10px] block font-mono text-gray-500 uppercase -mt-0.5">
                WordPress Suite
              </span>
            </div>
          </Link>
        </div>

        {/* Sidebar Navigation */}
        <div className="flex-1 overflow-y-auto py-4 px-3 space-y-1 font-sans text-xs">
          {/* Dashboard */}
          <Link
            href="/admin"
            onClick={onClose}
            className={cn(
              "flex items-center gap-3 px-3 py-2.5 rounded-xl font-medium transition-all",
              isActive("/admin") && pathname === "/admin"
                ? "bg-brand-green/15 text-brand-green border border-brand-green/30 font-semibold"
                : "text-gray-400 hover:text-white hover:bg-white/5"
            )}
          >
            <LayoutDashboard className="w-4 h-4 text-brand-cyan" />
            <span>Dashboard</span>
          </Link>

          {/* Posts Menu with Submenu */}
          <div className="space-y-0.5 pt-1">
            <button
              onClick={() => setPostsOpen(!postsOpen)}
              className={cn(
                "w-full flex items-center justify-between px-3 py-2.5 rounded-xl font-medium transition-all text-left",
                pathname.startsWith("/admin/posts") || pathname.startsWith("/admin/categories") || pathname.startsWith("/admin/tags")
                  ? "text-white bg-white/5"
                  : "text-gray-400 hover:text-white hover:bg-white/5"
              )}
            >
              <div className="flex items-center gap-3">
                <FileText className="w-4 h-4 text-brand-green" />
                <span>Posts</span>
              </div>
              <ChevronDown
                className={cn(
                  "w-3.5 h-3.5 text-gray-500 transition-transform duration-200",
                  postsOpen && "rotate-180"
                )}
              />
            </button>

            {postsOpen && (
              <div className="pl-6 space-y-1 pt-1">
                <Link
                  href="/admin/posts"
                  onClick={onClose}
                  className={cn(
                    "flex items-center gap-2 px-3 py-2 rounded-lg transition-all",
                    pathname === "/admin/posts"
                      ? "text-brand-green font-semibold bg-brand-green/10"
                      : "text-gray-400 hover:text-white hover:bg-white/5"
                  )}
                >
                  <FileText className="w-3.5 h-3.5" />
                  <span>All Posts</span>
                </Link>
                <Link
                  href="/admin/posts/new"
                  onClick={onClose}
                  className={cn(
                    "flex items-center gap-2 px-3 py-2 rounded-lg transition-all",
                    pathname === "/admin/posts/new"
                      ? "text-brand-green font-semibold bg-brand-green/10"
                      : "text-gray-400 hover:text-white hover:bg-white/5"
                  )}
                >
                  <PlusCircle className="w-3.5 h-3.5" />
                  <span>Add New</span>
                </Link>
                {isEditor && (
                  <>
                    <Link
                      href="/admin/categories"
                      onClick={onClose}
                      className={cn(
                        "flex items-center gap-2 px-3 py-2 rounded-lg transition-all",
                        pathname === "/admin/categories"
                          ? "text-brand-green font-semibold bg-brand-green/10"
                          : "text-gray-400 hover:text-white hover:bg-white/5"
                      )}
                    >
                      <FolderTree className="w-3.5 h-3.5" />
                      <span>Categories</span>
                    </Link>
                    <Link
                      href="/admin/tags"
                      onClick={onClose}
                      className={cn(
                        "flex items-center gap-2 px-3 py-2 rounded-lg transition-all",
                        pathname === "/admin/tags"
                          ? "text-brand-green font-semibold bg-brand-green/10"
                          : "text-gray-400 hover:text-white hover:bg-white/5"
                      )}
                    >
                      <Tags className="w-3.5 h-3.5" />
                      <span>Tags</span>
                    </Link>
                  </>
                )}
              </div>
            )}
          </div>

          {/* Media Library */}
          <Link
            href="/admin/media"
            onClick={onClose}
            className={cn(
              "flex items-center gap-3 px-3 py-2.5 rounded-xl font-medium transition-all",
              isActive("/admin/media")
                ? "bg-brand-green/15 text-brand-green border border-brand-green/30 font-semibold"
                : "text-gray-400 hover:text-white hover:bg-white/5"
            )}
          >
            <Image className="w-4 h-4 text-brand-cyan" />
            <span>Media Library</span>
          </Link>

          {/* Pages */}
          {isEditor && (
            <Link
              href="/admin/pages"
              onClick={onClose}
              className={cn(
                "flex items-center gap-3 px-3 py-2.5 rounded-xl font-medium transition-all",
                isActive("/admin/pages")
                  ? "bg-brand-green/15 text-brand-green border border-brand-green/30 font-semibold"
                  : "text-gray-400 hover:text-white hover:bg-white/5"
              )}
            >
              <Layers className="w-4 h-4 text-brand-green" />
              <span>Pages</span>
            </Link>
          )}

          {/* Navigation Menus */}
          {isEditor && (
            <Link
              href="/admin/menus"
              onClick={onClose}
              className={cn(
                "flex items-center gap-3 px-3 py-2.5 rounded-xl font-medium transition-all",
                isActive("/admin/menus")
                  ? "bg-brand-green/15 text-brand-green border border-brand-green/30 font-semibold"
                  : "text-gray-400 hover:text-white hover:bg-white/5"
              )}
            >
              <MenuSquare className="w-4 h-4 text-brand-cyan" />
              <span>Menus</span>
            </Link>
          )}

          {/* Users Management */}
          {isSuperAdmin && (
            <Link
              href="/admin/users"
              onClick={onClose}
              className={cn(
                "flex items-center gap-3 px-3 py-2.5 rounded-xl font-medium transition-all",
                isActive("/admin/users")
                  ? "bg-brand-green/15 text-brand-green border border-brand-green/30 font-semibold"
                  : "text-gray-400 hover:text-white hover:bg-white/5"
              )}
            >
              <Users className="w-4 h-4 text-brand-green" />
              <span>Users & Roles</span>
            </Link>
          )}

          {/* Website Settings */}
          {isSuperAdmin && (
            <Link
              href="/admin/settings"
              onClick={onClose}
              className={cn(
                "flex items-center gap-3 px-3 py-2.5 rounded-xl font-medium transition-all",
                isActive("/admin/settings")
                  ? "bg-brand-green/15 text-brand-green border border-brand-green/30 font-semibold"
                  : "text-gray-400 hover:text-white hover:bg-white/5"
              )}
            >
              <Settings className="w-4 h-4 text-brand-cyan" />
              <span>Settings</span>
            </Link>
          )}
        </div>

        {/* View Public Website */}
        <div className="p-3 border-t border-white/10">
          <Link
            href="/"
            target="_blank"
            className="flex items-center justify-between px-3 py-2 rounded-xl bg-surface-200/80 hover:bg-surface-100 text-xs font-mono text-gray-300 hover:text-brand-green border border-white/5 transition-all"
          >
            <span className="flex items-center gap-2">
              <Sparkles className="w-3.5 h-3.5 text-brand-green" />
              <span>Visit Website</span>
            </span>
            <ExternalLink className="w-3.5 h-3.5" />
          </Link>
        </div>
      </aside>
    </>
  );
}

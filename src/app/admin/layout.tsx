"use client";

import React, { useState, useEffect } from "react";
import { usePathname, useRouter } from "next/navigation";
import { ToastProvider } from "@/components/ui/Toast";
import AdminSidebar from "@/components/admin/AdminSidebar";
import AdminTopbar from "@/components/admin/AdminTopbar";
import { Loader2 } from "lucide-react";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const router = useRouter();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [user, setUser] = useState<{ id: string; name: string; username: string; role: string } | null>(null);
  const [checkingAuth, setCheckingAuth] = useState(true);

  const isLoginPage = pathname === "/admin/login";

  useEffect(() => {
    if (isLoginPage) {
      setCheckingAuth(false);
      return;
    }

    const checkSession = async () => {
      try {
        const res = await fetch("/api/auth/me");
        if (res.ok) {
          const data = await res.json();
          if (data.authenticated) {
            setUser(data.user);
          } else {
            router.push("/admin/login");
          }
        } else {
          router.push("/admin/login");
        }
      } catch (err) {
        router.push("/admin/login");
      } finally {
        setCheckingAuth(false);
      }
    };

    checkSession();
  }, [pathname, isLoginPage, router]);

  if (isLoginPage) {
    return <ToastProvider>{children}</ToastProvider>;
  }

  if (checkingAuth) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center text-gray-400 gap-3">
        <Loader2 className="w-6 h-6 animate-spin text-brand-green" />
        <span className="text-xs font-mono">Authenticating session...</span>
      </div>
    );
  }

  return (
    <ToastProvider>
      <div className="min-h-screen bg-[#07090e] text-gray-100 flex flex-col selection:bg-brand-green selection:text-black">
        {/* Sidebar */}
        <AdminSidebar
          userRole={user?.role}
          isOpen={sidebarOpen}
          onClose={() => setSidebarOpen(false)}
        />

        {/* Main Admin Area */}
        <div className="flex-1 flex flex-col lg:pl-64 transition-all duration-300">
          <AdminTopbar
            user={user}
            onToggleSidebar={() => setSidebarOpen(!sidebarOpen)}
          />

          <main className="flex-1 p-4 sm:p-6 lg:p-8 max-w-7xl w-full mx-auto">
            {children}
          </main>
        </div>
      </div>
    </ToastProvider>
  );
}

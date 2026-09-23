"use client";

import React from "react";
import { usePathname } from "next/navigation";
import CustomCursor from "@/components/ui/CustomCursor";
import Navbar from "@/components/ui/Navbar";
import Footer from "@/components/ui/Footer";
import SmoothScrollProvider from "@/components/ui/SmoothScrollProvider";

export default function LayoutWrapper({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname() || "";
  const isAdmin = pathname.startsWith("/admin");
  const isPromptStudio = pathname.startsWith("/prompt-studio");

  if (isAdmin || isPromptStudio) {
    return (
      <>
        <CustomCursor />
        <main className="relative min-h-screen">{children}</main>
      </>
    );
  }

  return (
    <SmoothScrollProvider>
      <CustomCursor />
      <Navbar />
      <main className="relative">{children}</main>
      <Footer />
    </SmoothScrollProvider>
  );
}

"use client";

import React from "react";
import { usePathname } from "next/navigation";
import CustomCursor from "@/components/ui/CustomCursor";
import Navbar from "@/components/ui/Navbar";
import Footer from "@/components/ui/Footer";

export default function LayoutWrapper({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname() || "";
  const isAdmin = pathname.startsWith("/admin");

  if (isAdmin) {
    return <main className="relative min-h-screen">{children}</main>;
  }

  return (
    <>
      <CustomCursor />
      <Navbar />
      <main className="relative">{children}</main>
      <Footer />
    </>
  );
}

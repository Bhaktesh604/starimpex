"use client";
import React from "react";
import Navbar from "@/app/(admin)/admin/ui/Navbar";
import { usePathname } from "next/navigation";
import { links } from "@/utils/links";
import HeaderAdmin from "@/app/(admin)/admin/ui/HeaderAdmin";

const RenderHeader = () => {
  const pathname = usePathname();

  if (pathname === links.ADMIN_LOGIN) {
    return <HeaderAdmin />;
  } else {
    return <Navbar />;
  }
};

export default RenderHeader;

"use client";

import { usePathname } from "next/navigation";
import Footer from "@/sections/Footer";

const ConditionalFooter = () => {
  const pathname = usePathname();
  
  // Daftar halaman yang tidak menampilkan footer
  const hiddenFooterPages = ['/login', '/register', '/forgot-password'];
  
  // Jika halaman saat ini ada dalam daftar hiddenFooterPages, jangan render footer
  if (hiddenFooterPages.includes(pathname)) {
    return null;
  }
  
  return <Footer />;
};

export default ConditionalFooter;

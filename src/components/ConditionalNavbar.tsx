"use client";

import { usePathname } from "next/navigation";
import Navbar from "@/components/Navbar";

const ConditionalNavbar = () => {
  const pathname = usePathname();
  
  // Daftar halaman yang tidak menampilkan navbar
  const hiddenNavbarPages = ['/dashboard'];
  
  // Jika halaman saat ini ada dalam daftar hiddenNavbarPages, jangan render navbar
  // Atau jika halaman dimulai dengan /dashboard (untuk nested routes)
  if (hiddenNavbarPages.includes(pathname) || pathname.startsWith('/dashboard')) {
    return null;
  }
  
  return <Navbar />;
};

export default ConditionalNavbar;

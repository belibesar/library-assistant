"use client";

import { usePathname } from "next/navigation";
import Footer from "@/sections/Footer";

const ConditionalFooter = () => {
  const pathname = usePathname();
  
  const hiddenFooterPages = ['/login', '/register', '/forgot-password', '/dashboard'];
  
  if (hiddenFooterPages.includes(pathname) || pathname.startsWith('/dashboard')) {
    return null;
  }
  
  return <Footer />;
};

export default ConditionalFooter;

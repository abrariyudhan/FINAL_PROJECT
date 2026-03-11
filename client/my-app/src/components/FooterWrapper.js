"use client";

import { usePathname } from "next/navigation";
import { AppFooter } from "./Footer";
import { FooterAuth } from "./FooterAuth";

export function FooterWrapper() {
  const pathname = usePathname();
  
  // Path yang tidak ada footer sama sekali
  const noFooterPaths = ["/login", "/register"];
  
  // Path yang pakai AppFooter (full footer)
  const appFooterPaths = ["/"];
  
  // Path yang pakai SimpleFooter (authenticated pages)
  const authenticatedPaths = ["/dashboard", "/chat"];
  
  // Cek apakah tidak ada footer
  if (noFooterPaths.includes(pathname)) {
    return null;
  }
  
  // Cek apakah homepage → AppFooter
  if (appFooterPaths.includes(pathname)) {
    return <AppFooter />;
  }
  
  // Cek apakah halaman authenticated atau subpath-nya
  const isAuthenticatedPage = authenticatedPaths.some(path => 
    pathname.startsWith(path)
  );
  
  if (isAuthenticatedPage) {
    // Fixed position footer khusus untuk /chat
    const isFixed = pathname.startsWith("/chat");
    return (
      <div className={isFixed ? "fixed bottom-0 left-0 right-0 z-40" : ""}>
        <FooterAuth />
      </div>
    );
  }
  
  // Default: tidak ada footer
  return null;
}
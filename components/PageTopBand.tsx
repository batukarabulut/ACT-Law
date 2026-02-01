"use client";

import { usePathname } from "next/navigation";

/**
 * Ana sayfa dışında, navbar altında koyu bir bant gösterir.
 * Böylece şeffaf navbar her zaman koyu arka plan üzerinde kalır.
 */
export default function PageTopBand() {
  const pathname = usePathname();
  const isHomePage = pathname === "/" || pathname === "/en";

  if (isHomePage) return null;

  return (
    <div
      className="-mt-20 pt-20 min-h-20 bg-black border-b border-white/5"
      aria-hidden="true"
    />
  );
}

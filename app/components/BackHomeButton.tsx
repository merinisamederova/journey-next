"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Home } from "lucide-react";

export default function BackHomeButton() {
  const pathname = usePathname();

  if (pathname === "/") {
    return null;
  }

  return (
    <Link
      href="/"
      className="fixed bottom-5 left-5 z-50 inline-flex items-center gap-2 rounded-full bg-white/95 px-4 py-3 text-sm font-semibold text-gray-900 shadow-lg ring-1 ring-gray-200 backdrop-blur transition hover:bg-green-600 hover:text-white"
      aria-label="Back to main page"
    >
      <Home size={18} aria-hidden="true" />
      Main
    </Link>
  );
}

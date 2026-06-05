"use client";

import Link from "next/link";
import { useState } from "react";
import Image from "next/image";

export type HeaderTourLink = {
  href: string;
  label: string;
};

const fallbackTours: HeaderTourLink[] = [
  { href: "/tours/issyk-kul-3-days", label: "Issyk-Kul Lake 3 Days" },
  { href: "/tours/kel-suu", label: "Kel-Suu Lake Expedition" },
  { href: "/tours/14-days-kyrgyzstan", label: "14 Days Across Kyrgyzstan" },
  { href: "/tours/summits-of-kyrgyzstan", label: "Summits of Kyrgyzstan" },
  { href: "/tours/song-kul", label: "4-day Horseback Adventure To Song-kul Lake" },
  {
    href: "/tours/song-kul-chon-kemin",
    label: "3-day Adventure To Song-kul Lake And Chon-kemin Valley",
  },
];

type HeaderProps = {
  tourLinks?: HeaderTourLink[];
};

export default function Header({ tourLinks = fallbackTours }: HeaderProps) {
  const [open, setOpen] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const closeMenu = () => setMenuOpen(false);

  return (
    <header className="fixed top-0 left-0 w-full z-50 bg-white/90 backdrop-blur-md shadow-sm">
      <div className="max-w-7xl mx-auto px-4 md:px-6 py-3 flex items-center justify-between">
        
        {/* LOGO */}
        <Link href="/" className="flex items-center gap-2 md:gap-3">
          <Image
            src="/logo.jpg"
            alt="Journey Kyrgyzstan"
            width={36}
            height={36}
            className="w-8 h-8 md:w-9 md:h-9"
          />
          <span className="font-bold text-base md:text-lg text-black">
            Journey Kyrgyzstan
          </span>
        </Link>

        {/* DESKTOP NAV */}
        <nav className="hidden md:flex items-center gap-8 font-medium text-black">

          <Link href="/" className="nav-link">Main</Link>
          <Link href="/about" className="nav-link">About Us</Link>

          {/* TOURS */}

          <div
            className="relative flex items-center"
            onMouseEnter={() => setOpen(true)}
            onMouseLeave={() => setOpen(false)}
          >
            <Link href="/tours" className="nav-link flex items-center gap-1 cursor-pointer text-black">
    Tours
    <span className="text-xs"></span>
  </Link>

  {/* Dropdown */}
  <div
    className={`absolute left-0 top-full w-80 transition-all duration-300 ${
      open
        ? "opacity-100 translate-y-0 pointer-events-auto"
        : "opacity-0 -translate-y-2 pointer-events-none"
    }`}
  >

    {/* invisible bridge */}
    <div className="h-3"></div>

    <div className="bg-white rounded-2xl shadow-xl p-4">

      <ul className="space-y-2 text-sm">
        {tourLinks.map((tour) => (
          <li key={tour.href}>
            <Link href={tour.href} className="dropdown-link">
              {tour.label}
            </Link>
          </li>
        ))}
      </ul>

    </div>
  </div>

</div>

          <Link href="/cars" className="nav-link flex items-center h-full text-black">
  Our Cars
</Link>
          <Link href="/gallery" className="nav-link flex items-center h-full text-black">
  Our Gallery
</Link>
          <Link href="/reviews" className="nav-link flex items-center h-full text-black">
  Reviews
</Link>

        </nav>

        {/* BURGER */}
        <button
          type="button"
          aria-label="Toggle navigation menu"
          aria-expanded={menuOpen}
          className="md:hidden flex flex-col gap-1 p-2 -mr-2"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          <span className="w-6 h-0.5 bg-black"></span>
          <span className="w-6 h-0.5 bg-black"></span>
          <span className="w-6 h-0.5 bg-black"></span>
        </button>
      </div>

      {/* MOBILE MENU */}
      {menuOpen && (
        <div className="md:hidden bg-white shadow-lg px-6 py-6 text-black font-medium">

          <nav className="flex flex-col gap-4">
            <Link href="/" onClick={closeMenu}>Main</Link>
            <Link href="/about" onClick={closeMenu}>About Us</Link>
            <Link href="/cars" onClick={closeMenu}>Our Cars</Link>
            <Link href="/gallery" onClick={closeMenu}>Our Gallery</Link>
            <Link href="/reviews" onClick={closeMenu}>Reviews</Link>
          </nav>

          {/* Tours */}
          <div className="mt-5 pt-5 border-t">
            <Link href="/tours" onClick={closeMenu} className="mb-2 block font-semibold">
              Tours
            </Link>
            <ul className="space-y-3 text-sm">
              {tourLinks.map((tour) => (
                <li key={tour.href}>
                  <Link href={tour.href} onClick={closeMenu}>
                    {tour.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

        </div>
      )}
    </header>
  );
}








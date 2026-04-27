"use client";

import Link from "next/link";
import { useState } from "react";
import Image from "next/image";

export default function Header() {
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
            <span className="nav-link flex items-center gap-1 cursor-pointer text-black">
    Tours
    <span className="text-xs"></span>
  </span>

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

        <li><Link href="/tours/issyk-kul-3-days" className="dropdown-link">Issyk-Kul Lake 3 Days</Link></li>

        <li><Link href="/tours/kel-suu" className="dropdown-link">Kel-Suu Lake Expedition</Link></li>

        <li><Link href="/tours/14-days-kyrgyzstan" className="dropdown-link">
          14 Days Across best places of Kyrgyzstan
        </Link></li>

        <li><Link href="/tours/summits-of-kyrgyzstan" className="dropdown-link">
          Summits of Kyrgyzstan
        </Link></li>

        <li><Link href="/tours/song-kul" className="dropdown-link">
          4-day Horseback Adventure To Song-kul Lake
        </Link></li>

        <li><Link href="/tours/song-kul-chon-kemin" className="dropdown-link">
          3-day Adventure To Song-kul Lake And Chon-kemin Valley
        </Link></li>

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
          </nav>

          {/* Tours */}
          <div className="mt-5 pt-5 border-t">
            <p className="mb-2 font-semibold">Tours</p>
            <ul className="space-y-3 text-sm">
              <li>
                <Link href="/tours/issyk-kul-3-days" onClick={closeMenu}>
                  Issyk-Kul Lake 3 Days
                </Link>
              </li>
              <li>
                <Link href="/tours/kel-suu" onClick={closeMenu}>
                  Kel-Suu Lake Expedition
                </Link>
              </li>
              <li>
                <Link href="/tours/14-days-kyrgyzstan" onClick={closeMenu}>
                  14 Days Across Kyrgyzstan
                </Link>
              </li>
              <li>
                <Link href="/tours/summits-of-kyrgyzstan" onClick={closeMenu}>
                  Summits of Kyrgyzstan
                </Link>
              </li>
              <li>
                <Link href="/tours/song-kul" onClick={closeMenu}>
                  4-day Horseback Adventure To Song-kul Lake
                </Link>
              </li>
              <li>
                <Link href="/tours/song-kul-chon-kemin" onClick={closeMenu}>
                  3-day Song-Kul and Chon-Kemin
                </Link>
              </li>
            </ul>
          </div>

        </div>
      )}
    </header>
  );
}








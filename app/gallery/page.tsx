"use client";

import Image from "next/image";
import { useState } from "react";

export default function GalleryPage() {
  const images = [
    "/g1.webp",
    "/g2.jpg",
    "/g3.jpg",
    "/g4.jpg",
    "/g5.jpg",
    "/g6.jpg",
    "/g7.jpg",
    "/g8.jpg",
    "/g9.jpg",
    "/g10.jpg",
    "/g11.jpg",
    "/g12.jpg",
  ];

  const [selected, setSelected] = useState<string | null>(null);

  return (
    <main className="bg-white min-h-screen pt-20">

      {/* TITLE */}
      <section className="text-center py-16 px-6">
        <h1 className="text-3xl md:text-5xl font-bold text-black mb-4">
          Our Gallery
        </h1>

        <p className="text-black-400 max-w-xl mx-auto">
          Explore unforgettable moments from our journeys across Kyrgyzstan.
        </p>
      </section>


      {/* GRID */}
      <section className="max-w-7xl mx-auto px-4 pb-16">

        <div className="columns-2 md:columns-3 gap-4 md:gap-6 space-y-4">

          {images.map((src, i) => (
            <button
              key={i}
              type="button"
              className="relative overflow-hidden rounded-xl group cursor-pointer break-inside-avoid w-full mb-4 text-left"
              onClick={() => setSelected(src)}
            >
              <Image
                src={src}
                alt="Gallery"
                width={500}
                height={500}
                className="w-full h-auto object-cover group-hover:scale-110 transition duration-700"
              />

              {/* overlay */}
              <span className="absolute inset-0 bg-black/10 group-hover:bg-black/40 transition duration-500"></span>
            </button>
          ))}
        </div>

      </section>

      {selected && (
        <div
          className="fixed inset-0 z-[60] bg-black/80 p-4 flex items-center justify-center"
          onClick={() => setSelected(null)}
        >
          <button
            type="button"
            aria-label="Close gallery image"
            className="absolute right-4 top-4 text-white text-3xl leading-none"
            onClick={() => setSelected(null)}
          >
            ×
          </button>

          <div className="relative w-full max-w-5xl h-[75vh]">
            <Image
              src={selected}
              alt="Selected gallery image"
              fill
              className="object-contain"
            />
          </div>
        </div>
      )}

    </main>
  );
}

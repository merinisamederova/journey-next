"use client";

import Image from "next/image";
import { ChevronLeft, ChevronRight, X } from "lucide-react";
import { useEffect, useState } from "react";

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
  "/slide16.jpeg",
];

export default function GalleryPage() {
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);
  const selected = selectedIndex === null ? null : images[selectedIndex];

  function closeImage() {
    setSelectedIndex(null);
  }

  function showPrevious() {
    setSelectedIndex((current) =>
      current === null ? current : (current - 1 + images.length) % images.length,
    );
  }

  function showNext() {
    setSelectedIndex((current) =>
      current === null ? current : (current + 1) % images.length,
    );
  }

  useEffect(() => {
    if (selectedIndex === null) {
      return;
    }

    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") {
        closeImage();
      }

      if (event.key === "ArrowLeft") {
        showPrevious();
      }

      if (event.key === "ArrowRight") {
        showNext();
      }
    }

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [selectedIndex]);

  return (
    <main className="bg-white min-h-screen pt-16">
      <section className="text-center py-10 md:py-12 px-6">
        <h1 className="text-3xl md:text-5xl font-bold text-black mb-4">
          Our Gallery
        </h1>

        <p className="text-black-400 max-w-xl mx-auto">
          Explore unforgettable moments from our journeys across Kyrgyzstan.
        </p>
      </section>

      <section className="max-w-7xl mx-auto px-4 pb-16">
        <div className="columns-2 md:columns-3 gap-4 md:gap-6 space-y-4">
          {images.map((src, index) => (
            <button
              key={src}
              type="button"
              className="relative overflow-hidden rounded-xl group cursor-pointer break-inside-avoid w-full mb-4 text-left focus:outline-none focus:ring-2 focus:ring-green-600 focus:ring-offset-4"
              onClick={() => setSelectedIndex(index)}
            >
              <Image
                src={src}
                alt={`Kyrgyzstan tour gallery image ${index + 1}`}
                width={500}
                height={500}
                className="w-full h-auto object-cover group-hover:scale-110 transition duration-700"
              />

              <span className="absolute inset-0 bg-black/10 group-hover:bg-black/40 transition duration-500" />
            </button>
          ))}
        </div>
      </section>

      {selected && (
        <div
          className="fixed inset-0 z-[60] bg-black/80 p-4 flex items-center justify-center"
          onClick={closeImage}
        >
          <button
            type="button"
            aria-label="Close gallery image"
            className="absolute right-4 top-4 z-20 inline-flex h-11 w-11 items-center justify-center rounded-full bg-white/15 text-white hover:bg-white/25"
            onClick={closeImage}
          >
            <X aria-hidden="true" />
          </button>

          <button
            type="button"
            aria-label="Previous gallery image"
            className="absolute left-4 top-1/2 z-20 inline-flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full bg-white/15 text-white hover:bg-white/25"
            onClick={(event) => {
              event.stopPropagation();
              showPrevious();
            }}
          >
            <ChevronLeft aria-hidden="true" />
          </button>

          <div
            className="relative w-full max-w-5xl h-[75vh]"
            onClick={(event) => event.stopPropagation()}
          >
            <Image
              src={selected}
              alt="Selected gallery image"
              fill
              className="object-contain"
            />
          </div>

          <button
            type="button"
            aria-label="Next gallery image"
            className="absolute right-4 top-1/2 z-20 inline-flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full bg-white/15 text-white hover:bg-white/25"
            onClick={(event) => {
              event.stopPropagation();
              showNext();
            }}
          >
            <ChevronRight aria-hidden="true" />
          </button>
        </div>
      )}
    </main>
  );
}

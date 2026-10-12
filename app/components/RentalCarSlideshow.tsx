"use client";

import Image from "next/image";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useState } from "react";

type RentalCarSlideshowProps = {
  images: string[];
  alt: string;
  contain?: boolean;
};

export default function RentalCarSlideshow({
  images,
  alt,
  contain = false,
}: RentalCarSlideshowProps) {
  const [activeIndex, setActiveIndex] = useState(0);
  const activeImage = images[activeIndex];

  const showPrevious = () => {
    setActiveIndex((current) => (current === 0 ? images.length - 1 : current - 1));
  };

  const showNext = () => {
    setActiveIndex((current) => (current === images.length - 1 ? 0 : current + 1));
  };

  return (
    <div className="relative h-64 overflow-hidden bg-gray-200 md:h-72">
      <Image
        src={activeImage}
        alt={alt}
        fill
        className={contain ? "object-contain p-2" : "object-cover"}
      />

      {images.length > 1 && (
        <>
          <button
            type="button"
            aria-label="Previous car photo"
            onClick={showPrevious}
            className="absolute left-3 top-1/2 inline-flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full bg-white/90 text-gray-900 shadow transition hover:bg-white"
          >
            <ChevronLeft size={22} strokeWidth={1.8} />
          </button>
          <button
            type="button"
            aria-label="Next car photo"
            onClick={showNext}
            className="absolute right-3 top-1/2 inline-flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full bg-white/90 text-gray-900 shadow transition hover:bg-white"
          >
            <ChevronRight size={22} strokeWidth={1.8} />
          </button>

          <div className="absolute bottom-3 left-1/2 flex -translate-x-1/2 gap-2 rounded-full bg-black/40 px-3 py-2">
            {images.map((image, index) => (
              <button
                key={image}
                type="button"
                aria-label={`Show photo ${index + 1}`}
                onClick={() => setActiveIndex(index)}
                className={`h-2.5 w-2.5 rounded-full transition ${
                  index === activeIndex ? "bg-white" : "bg-white/45 hover:bg-white/75"
                }`}
              />
            ))}
          </div>
        </>
      )}
    </div>
  );
}

import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { tours } from "../data/tours";

const extraTours = [
  {
    slug: "14-days-kyrgyzstan",
    title: "14 Days Across Kyrgyzstan",
    subtitle:
      "A complete private journey through Chon-Kemin, Song-Kul, Tash-Rabat, Kel-Suu, Issyk-Kul and Karakol. This route is designed for travelers who want mountain lakes, Silk Road history, yurt camps and flexible 4x4 travel in one program.",
    heroImage: "/14.jpg",
  },
  {
    slug: "summits-of-kyrgyzstan",
    title: "Summits of Kyrgyzstan",
    subtitle:
      "Custom mountain programs for hiking, trekking and alpine objectives in Kyrgyzstan. Routes are planned around season, weather, group level and safety with professional guides and transport support.",
    heroImage: "/5.jpg",
  },
];

export const metadata: Metadata = {
  title: "Private Tours in Kyrgyzstan",
  description:
    "Browse private Kyrgyzstan tours with mountain lakes, yurt stays, horseback riding, 4x4 routes, local guides and custom travel planning.",
  alternates: {
    canonical: "/tours",
  },
  openGraph: {
    title: "Private Tours in Kyrgyzstan | Journey Kyrgyzstan",
    description:
      "Browse private Kyrgyzstan tours with mountain lakes, yurt stays, horseback riding, 4x4 routes and local guides.",
    url: "/tours",
    images: ["/2.jpg"],
  },
};

export default function ToursPage() {
  const allTours = [...tours, ...extraTours];

  return (
    <main className="bg-white pt-24">
      <section className="bg-gray-100 py-12 md:py-16 text-center">
        <div className="max-w-3xl mx-auto px-6">
          <h1 className="text-3xl md:text-5xl font-bold mb-4">
            Private Tours in Kyrgyzstan
          </h1>
          <p className="text-gray-600 text-lg">
            Choose a ready-made route or use it as a starting point for a custom
            private tour across Kyrgyzstan.
          </p>
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-6 py-14 md:py-16">
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {allTours.map((tour) => (
            <Link
              key={tour.slug}
              href={`/tours/${tour.slug}`}
              className="group overflow-hidden rounded-xl bg-white shadow transition hover:-translate-y-1 hover:shadow-xl focus:outline-none focus:ring-2 focus:ring-green-600 focus:ring-offset-4"
            >
              <div className="relative h-56 overflow-hidden">
                <Image
                  src={tour.heroImage}
                  alt={tour.title}
                  fill
                  className="object-cover transition duration-500 group-hover:scale-105"
                />
              </div>
              <div className="p-5">
                <h2 className="text-xl font-bold">{tour.title}</h2>
                <p className="mt-3 text-sm leading-relaxed text-gray-600">
                  {tour.subtitle}
                </p>
                <span className="mt-4 inline-block text-sm font-semibold text-green-700 group-hover:underline">
                  View tour -&gt;
                </span>
              </div>
            </Link>
          ))}
        </div>
      </section>
    </main>
  );
}

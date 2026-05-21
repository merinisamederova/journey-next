import type { Metadata } from "next";
import { notFound } from "next/navigation";
import TourPage from "../../components/TourPage";
import { getTour } from "../../data/tours";

export const metadata: Metadata = {
  title: "Song-Kul 4-Day Horseback Adventure",
  description:
    "A 4-day horseback tour to Song-Kul Lake with yurt camps, Kilemche Valley, alpine pastures, local shepherds and nomadic culture.",
  alternates: {
    canonical: "/tours/song-kul",
  },
  openGraph: {
    title: "Song-Kul 4-Day Horseback Adventure | Journey Kyrgyzstan",
    description:
      "A 4-day horseback tour to Song-Kul Lake with yurt camps, Kilemche Valley, alpine pastures, local shepherds and nomadic culture.",
    url: "/tours/song-kul",
    images: ["/horse.jpg"],
  },
};

export default function SongKulTour() {
  const tour = getTour("song-kul");

  if (!tour) {
    notFound();
  }

  return <TourPage {...tour} />;
}

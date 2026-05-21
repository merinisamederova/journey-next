import type { Metadata } from "next";
import { notFound } from "next/navigation";
import TourPage from "../../components/TourPage";
import { getTour } from "../../data/tours";

export const metadata: Metadata = {
  title: "Song-Kul and Chon-Kemin 3-Day Tour",
  description:
    "A private 3-day Kyrgyzstan tour combining Song-Kul Lake, Chon-Kemin National Park, Burana Tower, yurt stay and optional horse riding.",
  alternates: {
    canonical: "/tours/song-kul-chon-kemin",
  },
  openGraph: {
    title: "Song-Kul and Chon-Kemin 3-Day Tour | Journey Kyrgyzstan",
    description:
      "A private 3-day Kyrgyzstan tour combining Song-Kul Lake, Chon-Kemin National Park, Burana Tower, yurt stay and optional horse riding.",
    url: "/tours/song-kul-chon-kemin",
    images: ["/3.jpg"],
  },
};

export default function SongKulChonKeminTour() {
  const tour = getTour("song-kul-chon-kemin");

  if (!tour) {
    notFound();
  }

  return <TourPage {...tour} />;
}

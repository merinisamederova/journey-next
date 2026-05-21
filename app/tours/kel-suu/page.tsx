import type { Metadata } from "next";
import { notFound } from "next/navigation";
import TourPage from "../../components/TourPage";
import { getTour } from "../../data/tours";

export const metadata: Metadata = {
  title: "Kel-Suu Lake 3-Day Expedition",
  description:
    "A private 3-day expedition to Kel-Suu Lake with Song-Kul, Kok-Kiya Valley, yurt stays, remote mountain landscapes and horse riding.",
  alternates: {
    canonical: "/tours/kel-suu",
  },
  openGraph: {
    title: "Kel-Suu Lake 3-Day Expedition | Journey Kyrgyzstan",
    description:
      "A private 3-day expedition to Kel-Suu Lake with Song-Kul, Kok-Kiya Valley, yurt stays, remote mountain landscapes and horse riding.",
    url: "/tours/kel-suu",
    images: ["/kel1.webp"],
  },
};

export default function KelSuuTour() {
  const tour = getTour("kel-suu");

  if (!tour) {
    notFound();
  }

  return <TourPage {...tour} />;
}

import type { Metadata } from "next";
import { notFound } from "next/navigation";
import TourPage from "../../components/TourPage";
import { getTour } from "../../data/tours";

export const metadata: Metadata = {
  title: "Issyk-Kul Lake 3-Day Tour",
  description:
    "A private 3-day Issyk-Kul tour from Bishkek with Cholpon-Ata, Karakol, Jety-Oguz, Barskoon waterfalls and Skazka Canyon.",
  alternates: {
    canonical: "/tours/issyk-kul-3-days",
  },
  openGraph: {
    title: "Issyk-Kul Lake 3-Day Tour | Journey Kyrgyzstan",
    description:
      "A private 3-day Issyk-Kul tour from Bishkek with Cholpon-Ata, Karakol, Jety-Oguz, Barskoon waterfalls and Skazka Canyon.",
    url: "/tours/issyk-kul-3-days",
    images: ["/2.jpg"],
  },
};

export default function IssykKulThreeDaysTour() {
  const tour = getTour("issyk-kul-3-days");

  if (!tour) {
    notFound();
  }

  return <TourPage {...tour} />;
}

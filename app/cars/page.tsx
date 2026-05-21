
import type { Metadata } from "next";
import OurCars from "../components/OurCars";

export const metadata: Metadata = {
  title: "Car Hire in Kyrgyzstan",
  description:
    "Private car hire and 4x4 transport in Kyrgyzstan for tours, transfers and custom routes with Journey Kyrgyzstan.",
  alternates: {
    canonical: "/cars",
  },
  openGraph: {
    title: "Car Hire in Kyrgyzstan | Journey Kyrgyzstan",
    description:
      "Private car hire and 4x4 transport in Kyrgyzstan for tours, transfers and custom routes.",
    url: "/cars",
    images: ["/car1.jpg"],
  },
};

export default function CarsPage() {
  return (
    <main className="pt-16">
      <OurCars />
    </main>
  );
}

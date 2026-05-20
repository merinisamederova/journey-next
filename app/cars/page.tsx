
import type { Metadata } from "next";
import OurCars from "../components/OurCars";

export const metadata: Metadata = {
  title: "Car Hire in Kyrgyzstan",
  description:
    "Private car hire and 4x4 transport in Kyrgyzstan for tours, transfers and custom routes with Journey Kyrgyzstan.",
};

export default function CarsPage() {
  return (
    <main className="pt-16">
      <OurCars />
    </main>
  );
}

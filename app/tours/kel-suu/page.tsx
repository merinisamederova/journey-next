import { notFound } from "next/navigation";
import TourPage from "../../components/TourPage";
import { getTour } from "../../data/tours";

export default function KelSuuTour() {
  const tour = getTour("kel-suu");

  if (!tour) {
    notFound();
  }

  return <TourPage {...tour} />;
}

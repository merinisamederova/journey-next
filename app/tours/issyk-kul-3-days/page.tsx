import { notFound } from "next/navigation";
import TourPage from "../../components/TourPage";
import { getTour } from "../../data/tours";

export default function IssykKulThreeDaysTour() {
  const tour = getTour("issyk-kul-3-days");

  if (!tour) {
    notFound();
  }

  return <TourPage {...tour} />;
}

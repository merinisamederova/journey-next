import { notFound } from "next/navigation";
import TourPage from "../../components/TourPage";
import { getTour } from "../../data/tours";

export default function SongKulTour() {
  const tour = getTour("song-kul");

  if (!tour) {
    notFound();
  }

  return <TourPage {...tour} />;
}

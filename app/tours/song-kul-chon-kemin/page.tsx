import { notFound } from "next/navigation";
import TourPage from "../../components/TourPage";
import { getTour } from "../../data/tours";

export default function SongKulChonKeminTour() {
  const tour = getTour("song-kul-chon-kemin");

  if (!tour) {
    notFound();
  }

  return <TourPage {...tour} />;
}

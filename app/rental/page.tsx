import type { Metadata } from "next";
import Image from "next/image";
import BookingForm from "../components/BookingForm";
import EquipmentRentalCard from "../components/EquipmentRentalCard";
import RentalCarSlideshow from "../components/RentalCarSlideshow";
import {
  CalendarDays,
  CarFront,
  CircleGauge,
  MessageCircle,
  TentTree,
} from "lucide-react";

const rentalCars = [
  {
    name: "Toyota 4Runner 4x4",
    description:
      "A strong mountain-ready SUV with a roof box, suitable for luggage, road trips and routes outside the city.",
    images: ["/rental-toyota-4runner.jpeg", "/rental-toyota-4runner-angle.jpeg"],
    containImages: false,
  },
  {
    name: "Toyota Sequoia V8 4x4",
    description:
      "A spacious full-size SUV with a comfortable cabin for long-distance routes and private group travel.",
    images: [
      "/rental-toyota-sequoia-side.jpeg",
      "/rental-toyota-sequoia-roofbox.jpeg",
      "/rental-toyota-sequoia.jpeg",
    ],
    containImages: true,
  },
];

export const metadata: Metadata = {
  title: "Car & Equipment",
  description:
    "Rent 4x4 cars, vans, camping tents, chairs, tables and travel equipment in Kyrgyzstan with Journey Kyrgyzstan.",
  alternates: {
    canonical: "/rental",
  },
  openGraph: {
    title: "Car & Equipment | Journey Kyrgyzstan",
    description:
      "Rent 4x4 transport and camping equipment for independent routes, private tours and mountain travel in Kyrgyzstan.",
    url: "/rental",
    images: ["/rental-toyota-4runner.jpeg"],
  },
};

export default function RentalPage() {
  return (
    <main className="pt-16">
      <section className="relative overflow-hidden bg-gray-900 text-white">
        <Image
          src="/20.jpg"
          alt="Mountain route in Kyrgyzstan"
          fill
          priority
          className="object-cover"
        />
        <div className="absolute inset-0 bg-black/55"></div>
        <div className="absolute inset-0 bg-gradient-to-r from-black/55 via-black/20 to-black/45"></div>

        <div className="relative z-10 mx-auto grid min-h-[500px] w-full max-w-6xl gap-10 px-6 py-20 md:grid-cols-[1.1fr_0.9fr] md:items-center">
          <div>
          <p className="mb-3 text-sm font-semibold uppercase tracking-wide text-green-300">
            Rental services
          </p>
          <h1 className="max-w-3xl text-4xl font-bold md:text-6xl">
            Car & Equipment
          </h1>
          <p className="mt-5 max-w-2xl text-base leading-relaxed text-gray-100 md:text-xl">
            Rent reliable 4x4 transport and practical camping equipment for
            mountain routes, overnight stops and independent travel.
          </p>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <a
              href="#rental-booking"
              className="inline-flex items-center justify-center gap-2 rounded-xl bg-green-600 px-7 py-4 font-semibold text-white transition hover:bg-green-700"
            >
              <CalendarDays size={20} strokeWidth={1.8} />
              Book rental
            </a>
            <a
              href="https://wa.me/996703367477"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 rounded-xl bg-white/15 px-7 py-4 font-semibold text-white ring-1 ring-white/25 transition hover:bg-white/25"
            >
              <MessageCircle size={20} strokeWidth={1.8} />
              Ask availability
            </a>
          </div>
          </div>

          <div className="rounded-2xl bg-black/35 p-6 shadow-sm ring-1 ring-white/15 backdrop-blur-sm md:p-8">
            <p className="text-sm font-semibold uppercase tracking-wide text-green-300">
              Available rental options
            </p>
            <div className="mt-6 grid gap-4">
              <div className="rounded-xl bg-white/10 p-5">
                <CarFront className="mb-4 text-green-300" size={30} strokeWidth={1.8} />
                <h2 className="text-xl font-semibold">Cars</h2>
                <p className="mt-2 text-sm leading-relaxed text-gray-200">
                  4x4 SUVs, spacious cars and vans for routes across Kyrgyzstan.
                </p>
              </div>
              <div className="rounded-xl bg-white/10 p-5">
                <TentTree className="mb-4 text-green-300" size={30} strokeWidth={1.8} />
                <h2 className="text-xl font-semibold">Equipment</h2>
                <p className="mt-2 text-sm leading-relaxed text-gray-200">
                  Tents, chairs, tables and simple outdoor travel gear.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-white py-16 md:py-20">
        <div className="mx-auto max-w-6xl px-6">
          <div className="mb-10 max-w-3xl">
            <p className="mb-3 text-sm font-semibold uppercase tracking-wide text-green-700">
              Available cars
            </p>
            <h2 className="text-3xl font-bold text-gray-900 md:text-4xl">
              Choose a 4x4 for your route
            </h2>
            <p className="mt-4 leading-relaxed text-gray-600">
              Reliable SUVs for mountain roads, airport transfers, day trips
              and multi-day private routes across Kyrgyzstan.
            </p>
          </div>

          <div className="grid gap-8 md:grid-cols-2">
            {rentalCars.map((car) => (
              <article
                key={car.name}
                className="overflow-hidden rounded-2xl bg-gray-50 shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-xl"
              >
                <RentalCarSlideshow
                  images={car.images}
                  alt={car.name}
                  contain={car.containImages}
                />
                <div className="p-6 md:p-8">
                  <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-full bg-green-100 text-green-700">
                    <CarFront size={24} strokeWidth={1.8} />
                  </div>
                  <h3 className="mb-3 text-2xl font-bold text-gray-900">
                    {car.name}
                  </h3>
                  <p className="leading-relaxed text-gray-600">
                    {car.description}
                  </p>
                </div>
              </article>
            ))}
          </div>

          <div className="mt-8 grid gap-8 md:grid-cols-[0.9fr_1.1fr] md:items-center">
            <div className="overflow-hidden rounded-2xl bg-gray-50 shadow-sm">
              <div className="relative h-72 bg-gray-200">
                <Image
                  src="/rental-sequoia-interior.jpeg"
                  alt="Toyota Sequoia interior"
                  fill
                  className="object-contain p-2"
                />
              </div>
            </div>
            <div className="rounded-2xl bg-gray-50 p-6 shadow-sm md:p-8">
              <p className="mb-3 text-sm font-semibold uppercase tracking-wide text-green-700">
                Interior comfort
              </p>
              <h3 className="text-2xl font-bold text-gray-900">
                Spacious cabin for long trips
              </h3>
              <p className="mt-4 leading-relaxed text-gray-600">
                Comfortable seating and roomy interiors make these cars suitable
                for long routes, family travel and mountain transfers.
              </p>
            </div>
          </div>

          <div className="mt-8 grid gap-8 md:grid-cols-[1fr_1.1fr] md:items-start">
            <article className="rounded-2xl bg-gray-50 p-6 shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-xl md:p-8">
              <div>
                <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-full bg-green-100 text-green-700">
                  <CarFront size={24} strokeWidth={1.8} />
                </div>
                <h2 className="mb-3 text-2xl font-bold text-gray-900">
                  Car rental prices
                </h2>
                <div className="grid gap-3 text-sm text-gray-700">
                  <div className="rounded-xl bg-white p-4">
                    From USD 110 per day
                  </div>
                  <div className="rounded-xl bg-white p-4">
                    Final price depends on rental duration
                  </div>
                  <div className="rounded-xl bg-white p-4">
                    Seasonal rates may vary
                  </div>
                </div>
              </div>
            </article>

            <EquipmentRentalCard />
          </div>
        </div>
      </section>

      <section className="bg-gray-100 py-16 md:py-20">
        <div className="mx-auto grid max-w-6xl gap-8 px-6 md:grid-cols-[0.9fr_1.1fr] md:items-center">
          <div>
            <p className="mb-3 text-sm font-semibold uppercase tracking-wide text-green-700">
              How to book
            </p>
            <h2 className="text-3xl font-bold md:text-4xl">
              Tell us your dates, route and group size
            </h2>
            <p className="mt-4 leading-relaxed text-gray-600">
              We will confirm available cars, suitable equipment and a clear
              rental plan before your trip starts.
            </p>
            <a
              href="#rental-booking"
              className="mt-6 inline-flex items-center gap-2 rounded-xl bg-green-600 px-6 py-3 font-semibold text-white transition hover:bg-green-700"
            >
              <CalendarDays size={18} strokeWidth={1.8} />
              Open booking form
            </a>
          </div>

          <div className="grid gap-4 sm:grid-cols-3">
            <div className="rounded-xl bg-white p-5 shadow-sm">
              <CalendarDays className="mb-4 text-green-700" size={28} strokeWidth={1.8} />
              <h3 className="font-semibold text-gray-900">Dates</h3>
              <p className="mt-2 text-sm text-gray-600">Share your travel dates.</p>
            </div>
            <div className="rounded-xl bg-white p-5 shadow-sm">
              <CircleGauge className="mb-4 text-green-700" size={28} strokeWidth={1.8} />
              <h3 className="font-semibold text-gray-900">Route</h3>
              <p className="mt-2 text-sm text-gray-600">Send your planned route.</p>
            </div>
            <div className="rounded-xl bg-white p-5 shadow-sm">
              <MessageCircle className="mb-4 text-green-700" size={28} strokeWidth={1.8} />
              <h3 className="font-semibold text-gray-900">Confirm</h3>
              <p className="mt-2 text-sm text-gray-600">We reply with availability.</p>
            </div>
          </div>
        </div>
      </section>

      <div id="rental-booking" className="scroll-mt-24">
        <BookingForm
          tour="Car & Equipment Rental"
          tourSlug="rental"
          eyebrow="Rental booking"
          title="Book car or equipment"
          description="Send your rental request with dates, route and equipment needs. We will confirm availability and details on WhatsApp."
          messagePlaceholder="Tell us which car or equipment you need, your route and pickup dates"
        />
      </div>
    </main>
  );
}

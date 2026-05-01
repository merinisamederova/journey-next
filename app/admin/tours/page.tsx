import Link from "next/link";
import { tours } from "../../data/tours";

const manualTours = [
  {
    slug: "kel-suu",
    title: "Kel-Suu Lake Expedition (3 Days)",
    status: "Manual page",
    href: "/tours/kel-suu",
  },
  {
    slug: "song-kul",
    title: "4-Day Horseback Adventure to Song-Kul Lake",
    status: "Manual page",
    href: "/tours/song-kul",
  },
  {
    slug: "14-days-kyrgyzstan",
    title: "14 Days Across Kyrgyzstan",
    status: "Manual page",
    href: "/tours/14-days-kyrgyzstan",
  },
  {
    slug: "summits-of-kyrgyzstan",
    title: "Summits of Kyrgyzstan",
    status: "Manual page",
    href: "/tours/summits-of-kyrgyzstan",
  },
];

export default function AdminToursPage() {
  return (
    <main className="min-h-screen bg-gray-100 pt-24">
      <section className="max-w-7xl mx-auto px-6 py-10">
        <div className="mb-8">
          <p className="text-sm font-semibold uppercase tracking-wide text-green-700">
            Admin preview
          </p>
          <h1 className="text-3xl md:text-4xl font-bold mt-2">Tours content</h1>
          <p className="text-gray-600 mt-3 max-w-3xl">
            This is the first admin foundation: tours are collected into a clear
            content structure so they can be moved into Sanity or another CMS
            without rewriting the frontend.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-4 mb-8">
          <div className="bg-white rounded-xl p-5 shadow-sm">
            <p className="text-sm text-gray-500">Structured tours</p>
            <p className="text-3xl font-bold mt-2">{tours.length}</p>
          </div>
          <div className="bg-white rounded-xl p-5 shadow-sm">
            <p className="text-sm text-gray-500">Manual pages left</p>
            <p className="text-3xl font-bold mt-2">{manualTours.length}</p>
          </div>
          <div className="bg-white rounded-xl p-5 shadow-sm">
            <p className="text-sm text-gray-500">Booking backend</p>
            <p className="text-lg font-semibold mt-3 text-green-700">WhatsApp API route ready</p>
            <p className="text-sm text-gray-500 mt-2">
              Add WhatsApp Cloud API env vars on Vercel to auto-send leads into WhatsApp.
            </p>
          </div>
        </div>

        <div className="grid md:grid-cols-3 gap-4 mb-8">
          <a href="/admin/bookings" className="bg-white rounded-xl p-5 shadow-sm hover:shadow-md transition">
            <p className="text-sm text-gray-500">Admin</p>
            <p className="text-lg font-semibold mt-2">Bookings</p>
          </a>
          <a href="/admin/availability" className="bg-white rounded-xl p-5 shadow-sm hover:shadow-md transition">
            <p className="text-sm text-gray-500">Admin</p>
            <p className="text-lg font-semibold mt-2">Availability</p>
          </a>
          <a href="/admin/reviews" className="bg-white rounded-xl p-5 shadow-sm hover:shadow-md transition">
            <p className="text-sm text-gray-500">Admin</p>
            <p className="text-lg font-semibold mt-2">Reviews</p>
          </a>
        </div>

        <div className="grid gap-5">
          {tours.map((tour) => (
            <article key={tour.slug} className="bg-white rounded-xl p-5 shadow-sm">
              <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4">
                <div>
                  <h2 className="text-xl font-bold">{tour.title}</h2>
                  <p className="text-gray-600 mt-2 max-w-3xl">{tour.subtitle}</p>
                  <div className="flex flex-wrap gap-2 mt-4 text-xs">
                    <span className="rounded-full bg-gray-100 px-3 py-1">/{tour.slug}</span>
                    <span className="rounded-full bg-gray-100 px-3 py-1">{tour.days.length} days/steps</span>
                    {tour.mapQuery && (
                      <span className="rounded-full bg-green-100 text-green-800 px-3 py-1">
                        Google map ready
                      </span>
                    )}
                  </div>
                </div>

                <Link
                  href={`/tours/${tour.slug}`}
                  className="shrink-0 rounded-lg bg-green-600 px-4 py-2 text-sm font-semibold text-white hover:bg-green-700"
                >
                  View page
                </Link>
              </div>
            </article>
          ))}
        </div>

        <div className="mt-10">
          <h2 className="text-2xl font-bold mb-4">Still hardcoded</h2>
          <div className="grid md:grid-cols-2 gap-4">
            {manualTours.map((tour) => (
              <article key={tour.slug} className="bg-white rounded-xl p-5 shadow-sm">
                <p className="text-sm text-gray-500">{tour.status}</p>
                <h3 className="font-bold mt-2">{tour.title}</h3>
                <Link href={tour.href} className="inline-block mt-4 text-green-700 font-semibold">
                  View page
                </Link>
              </article>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}

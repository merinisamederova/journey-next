import { tours } from "../../data/tours";
import { availabilitySlots } from "../../data/availability";

const manualTours = [
  "kel-suu",
  "song-kul",
  "14-days-kyrgyzstan",
  "summits-of-kyrgyzstan",
];

export default function AdminAvailabilityPage() {
  const hasSupabase =
    Boolean(process.env.SUPABASE_URL) &&
    Boolean(process.env.SUPABASE_SERVICE_ROLE_KEY);

  const tourSlugs = [
    ...tours.map((tour) => tour.slug),
    ...manualTours,
  ];

  return (
    <main className="min-h-screen bg-gray-100 pt-24">
      <section className="max-w-6xl mx-auto px-6 py-10">
        <div className="mb-8">
          <p className="text-sm font-semibold uppercase tracking-wide text-green-700">
            Admin preview
          </p>
          <h1 className="text-3xl md:text-4xl font-bold mt-2">Availability</h1>
          <p className="text-gray-600 mt-3 max-w-3xl">
            Availability is now prepared for Supabase. After running
            <span className="font-semibold"> supabase/availability.sql</span>,
            the calendar API will read real dates from the database.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-5 mb-8">
          <div className="bg-white rounded-xl p-5 shadow-sm">
            <p className="text-sm text-gray-500">Storage status</p>
            <p className={`text-xl font-bold mt-3 ${hasSupabase ? "text-green-700" : "text-yellow-700"}`}>
              {hasSupabase ? "Supabase configured" : "Using local fallback"}
            </p>
          </div>

          <div className="bg-white rounded-xl p-5 shadow-sm">
            <p className="text-sm text-gray-500">Demo dates in code</p>
            <p className="text-3xl font-bold mt-2">{availabilitySlots.length}</p>
          </div>

          <div className="bg-white rounded-xl p-5 shadow-sm">
            <p className="text-sm text-gray-500">Expected table</p>
            <p className="text-xl font-bold mt-3">availability</p>
          </div>
        </div>

        <div className="bg-white rounded-xl p-5 shadow-sm">
          <h2 className="text-xl font-bold mb-4">Tour slugs</h2>
          <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-3">
            {tourSlugs.map((slug) => (
              <span key={slug} className="rounded-lg bg-gray-100 px-3 py-2 text-sm">
                {slug}
              </span>
            ))}
          </div>
        </div>

        <div className="mt-6 rounded-xl bg-white p-5 shadow-sm">
          <h2 className="text-xl font-bold mb-3">How to change dates</h2>
          <p className="text-gray-600">
            Open Supabase table editor, choose the
            <span className="font-semibold"> availability</span> table, then add
            or edit rows with tour_slug, date, seats and status.
          </p>
        </div>
      </section>
    </main>
  );
}

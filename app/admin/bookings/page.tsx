const bookingFields = [
  "tour",
  "tour_slug",
  "name",
  "contact",
  "preferred_date",
  "people",
  "message",
  "status",
  "source",
  "created_at",
];

export default function AdminBookingsPage() {
  const hasSupabase =
    Boolean(process.env.SUPABASE_URL) &&
    Boolean(process.env.SUPABASE_SERVICE_ROLE_KEY);

  return (
    <main className="min-h-screen bg-gray-100 pt-24">
      <section className="max-w-6xl mx-auto px-6 py-10">
        <div className="mb-8">
          <p className="text-sm font-semibold uppercase tracking-wide text-green-700">
            Admin preview
          </p>
          <h1 className="text-3xl md:text-4xl font-bold mt-2">Bookings</h1>
          <p className="text-gray-600 mt-3 max-w-3xl">
            Booking storage is prepared for Supabase. Once the environment
            variables and database table are configured, every tour form request
            will be saved with status <span className="font-semibold">new</span>.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-5 mb-8">
          <div className="bg-white rounded-xl p-5 shadow-sm">
            <p className="text-sm text-gray-500">Storage status</p>
            <p className={`text-xl font-bold mt-3 ${hasSupabase ? "text-green-700" : "text-yellow-700"}`}>
              {hasSupabase ? "Supabase configured" : "Supabase env vars missing"}
            </p>
          </div>

          <div className="bg-white rounded-xl p-5 shadow-sm">
            <p className="text-sm text-gray-500">Expected table</p>
            <p className="text-xl font-bold mt-3">bookings</p>
          </div>
        </div>

        <div className="bg-white rounded-xl p-5 shadow-sm">
          <h2 className="text-xl font-bold mb-4">Stored fields</h2>
          <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-3">
            {bookingFields.map((field) => (
              <span key={field} className="rounded-lg bg-gray-100 px-3 py-2 text-sm">
                {field}
              </span>
            ))}
          </div>
        </div>

        <div className="mt-6 rounded-xl bg-white p-5 shadow-sm">
          <h2 className="text-xl font-bold mb-3">Next setup step</h2>
          <p className="text-gray-600">
            Create the Supabase table using the SQL file in
            <span className="font-semibold"> supabase/bookings.sql</span>, then
            add <span className="font-semibold">SUPABASE_URL</span> and
            <span className="font-semibold"> SUPABASE_SERVICE_ROLE_KEY</span> to
            Vercel environment variables.
          </p>
        </div>
      </section>
    </main>
  );
}
